
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

// Sample chatbot conversation
const initialMessages = [
  {
    role: 'bot',
    content: "Hello! I'm your Financial Assistant. I can help you understand your subscription patterns, predict potential overdrafts, and suggest ways to optimize your spending. What would you like to know?",
    timestamp: new Date(Date.now() - 200000).toISOString(),
  },
];

// Sample subscription recommendations
const subscriptionRecommendations = [
  {
    title: "Netflix + Hulu Bundle",
    description: "Save 15% by combining these subscriptions",
    saving: 32,
    risk: "low"
  },
  {
    title: "Overlapping Music Services",
    description: "Spotify and Apple Music have similar content",
    saving: 14.99,
    risk: "medium"
  },
  {
    title: "Unused Fitness App",
    description: "No activity detected in 60+ days",
    saving: 19.99,
    risk: "high"
  }
];

const FinancialChatbot: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Sample quick suggestions
  const suggestions = [
    "What subscriptions am I at risk of forgetting?",
    "When might I overdraft my account?",
    "Which subscriptions are similar to each other?",
    "How can I optimize my subscription spending?"
  ];

  // Scroll to bottom when new messages are added
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;
    
    // Add the user message
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      // Add bot response
      let botMessage = {
        role: 'bot',
        content: "",
        timestamp: new Date().toISOString(),
      };
      
      // Sample response logic
      if (message.toLowerCase().includes('risk') || message.toLowerCase().includes('forget')) {
        botMessage.content = "Based on your transaction history, you have 3 subscriptions at high risk of being forgotten. The most concerning is your Premium News subscription ($15.99/month) which renews on the same day as 4 other services, creating a risk of overdraft. Would you like me to show you a visualization of your subscription clusters?";
      } else if (message.toLowerCase().includes('overdraft')) {
        botMessage.content = "Our prediction model shows a 68% chance of overdraft on July 28th. This is because you have 5 subscriptions ($87.96 total) that renew within 2 days of each other, and your historical account balance tends to be lowest around that time. Would you like to see optimization options?";
      } else if (message.toLowerCase().includes('similar') || message.toLowerCase().includes('overlap')) {
        botMessage.content = "I've detected potential overlap between your entertainment subscriptions. You're currently subscribed to Netflix, Hulu, Disney+, and HBO Max ($58.96/month total). 86% of users with similar profiles typically maintain only 2-3 of these services. Would you like me to analyze content overlap between these services?";
      } else if (message.toLowerCase().includes('optimize') || message.toLowerCase().includes('save')) {
        botMessage.content = "I've identified potential savings of $45.97/month across your subscriptions. This includes unused services, overlapping content, and better bundle options. The highest potential saving comes from your unused fitness subscription ($19.99/month) with no activity in the past 60 days. Would you like to see a breakdown of all savings opportunities?";
      } else {
        botMessage.content = "I've analyzed your subscription patterns and found potential opportunities to optimize your spending. You currently spend $267.94 monthly on 14 different subscriptions, which is 37% higher than users with similar income profiles. Would you like to see specific recommendations for reducing subscription leakage?";
      }
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2"
      >
        <Card className="h-[calc(100vh-14rem)] flex flex-col">
          <CardHeader>
            <CardTitle>Financial Assistant</CardTitle>
            <CardDescription>
              AI-powered insights for your subscription patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[75%]`}>
                      {message.role === 'bot' && (
                        <Avatar className="h-8 w-8 bg-blue-100 border border-blue-200">
                          <Bot size={14} className="text-blue-600" />
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.role === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 px-1">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <Avatar className="h-8 w-8 bg-blue-500">
                          <User size={14} className="text-white" />
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2 max-w-[75%]">
                    <Avatar className="h-8 w-8 bg-blue-100 border border-blue-200">
                      <Bot size={14} className="text-blue-600" />
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={endOfMessagesRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex items-center space-x-2 w-full">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your subscriptions..."
                className="flex-grow"
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
              />
              <Button 
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSend(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
              <span>Top Recommendations</span>
            </CardTitle>
            <CardDescription>
              Smart suggestions based on your patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionRecommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{rec.title}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      rec.risk === 'high' ? 'bg-red-50 text-red-700' :
                      rec.risk === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {rec.risk === 'high' ? 'High Priority' :
                       rec.risk === 'medium' ? 'Medium Priority' :
                       'Suggestion'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{rec.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500">Potential savings</span>
                      <p className="font-medium text-green-600">{formatCurrency(rec.saving)}/mo</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-blue-800">Upcoming Risk Alert</h3>
                  <p className="text-xs text-blue-600 mt-1">
                    5 subscriptions ($87.96 total) will renew within a 48-hour period next week, creating potential overdraft risk.
                  </p>
                  <Button size="sm" className="mt-3 text-xs bg-blue-500 hover:bg-blue-600">
                    View Payment Schedule
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FinancialChatbot;
