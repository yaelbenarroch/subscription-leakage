
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface NetworkNode {
  id: string;
  group: number;
  value: number;
}

interface NetworkLink {
  source: string;
  target: string;
  value: number;
}

interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

// Sample subscription network data
const networkData: NetworkData = {
  nodes: [
    { id: "Netflix", group: 1, value: 15.99 },
    { id: "Hulu", group: 1, value: 11.99 },
    { id: "Disney+", group: 1, value: 7.99 },
    { id: "HBO Max", group: 1, value: 14.99 },
    { id: "Spotify", group: 2, value: 9.99 },
    { id: "Apple Music", group: 2, value: 9.99 },
    { id: "YouTube Premium", group: 2, value: 11.99 },
    { id: "Amazon Prime", group: 3, value: 14.99 },
    { id: "Instacart+", group: 3, value: 9.99 },
    { id: "DoorDash+", group: 3, value: 9.99 },
    { id: "New York Times", group: 4, value: 4.99 },
    { id: "The Washington Post", group: 4, value: 9.99 },
    { id: "The Athletic", group: 4, value: 7.99 },
    { id: "Fitness App", group: 5, value: 19.99 },
    { id: "Meditation App", group: 5, value: 12.99 },
  ],
  links: [
    { source: "Netflix", target: "Hulu", value: 0.8 },
    { source: "Netflix", target: "Disney+", value: 0.6 },
    { source: "Netflix", target: "HBO Max", value: 0.7 },
    { source: "Hulu", target: "Disney+", value: 0.9 },
    { source: "Spotify", target: "Apple Music", value: 0.85 },
    { source: "Spotify", target: "YouTube Premium", value: 0.4 },
    { source: "Amazon Prime", target: "Instacart+", value: 0.3 },
    { source: "Amazon Prime", target: "DoorDash+", value: 0.2 },
    { source: "Instacart+", target: "DoorDash+", value: 0.5 },
    { source: "New York Times", target: "The Washington Post", value: 0.7 },
    { source: "New York Times", target: "The Athletic", value: 0.4 },
    { source: "The Washington Post", target: "The Athletic", value: 0.4 },
    { source: "Fitness App", target: "Meditation App", value: 0.6 },
  ]
};

// Color scale for different groups
const color = d3.scaleOrdinal()
  .domain(['1', '2', '3', '4', '5'])
  .range(['#4299E1', '#ECC94B', '#48BB78', '#ED8936', '#9F7AEA']);

export const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up the simulation
    const simulation = d3.forceSimulation<NetworkNode, NetworkLink>(networkData.nodes)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(networkData.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(d => Math.sqrt(d.value) * 4));
      
    // Create SVG elements
    const svg = d3.select(svgRef.current);
    
    // Define arrow marker
    svg.append("defs").selectAll("marker")
      .data(["suit"])
      .enter().append("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");
    
    // Add links
    const link = svg.append("g")
      .selectAll("line")
      .data(networkData.links)
      .enter().append("line")
      .attr("stroke", "#ccc")
      .attr("stroke-opacity", d => d.value)
      .attr("stroke-width", d => Math.sqrt(d.value) * 2);
      
    // Add nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(networkData.nodes)
      .enter().append("g")
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);
      
    // Add circles to nodes
    node.append("circle")
      .attr("r", d => Math.sqrt(d.value) * 3)
      .attr("fill", d => color(d.group.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
      
    // Add labels to nodes
    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("font-size", "10px")
      .attr("pointer-events", "none")
      .text(d => d.id);
    
    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);
        
      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });
    
    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // Add zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        svg.selectAll("g").attr("transform", event.transform);
      });
      
    svg.call(zoom as any);
    
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative"
    >
      <div className="absolute top-0 left-0 text-xs text-gray-500 bg-white/80 p-2 rounded">
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#4299E1' }}></span>
          <span>Entertainment</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#ECC94B' }}></span>
          <span>Music</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#48BB78' }}></span>
          <span>Delivery</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#ED8936' }}></span>
          <span>News</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#9F7AEA' }}></span>
          <span>Wellness</span>
        </div>
      </div>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </motion.div>
  );
};

export default NetworkGraph;
