
// Sample Transaction Data
export const transactions = [
  {
    id: "t1",
    date: "2023-06-28",
    amount: 15.99,
    merchant: "Netflix",
    category: "Entertainment",
    isSubscription: true
  },
  {
    id: "t2",
    date: "2023-06-27",
    amount: 9.99,
    merchant: "Spotify",
    category: "Music",
    isSubscription: true
  },
  {
    id: "t3",
    date: "2023-06-26",
    amount: 12.99,
    merchant: "Amazon Prime",
    category: "Shopping",
    isSubscription: true
  },
  {
    id: "t4",
    date: "2023-06-25",
    amount: 45.23,
    merchant: "Grocery Store",
    category: "Food",
    isSubscription: false
  },
  {
    id: "t5",
    date: "2023-06-24",
    amount: 11.99,
    merchant: "Hulu",
    category: "Entertainment",
    isSubscription: true
  },
  {
    id: "t6",
    date: "2023-06-23",
    amount: 7.99,
    merchant: "Disney+",
    category: "Entertainment",
    isSubscription: true
  },
  {
    id: "t7",
    date: "2023-06-22",
    amount: 19.99,
    merchant: "Fitness App",
    category: "Health",
    isSubscription: true
  },
  {
    id: "t8",
    date: "2023-06-21",
    amount: 35.67,
    merchant: "Restaurant",
    category: "Food",
    isSubscription: false
  },
  {
    id: "t9",
    date: "2023-06-20",
    amount: 9.99,
    merchant: "Microsoft OneDrive",
    category: "Software",
    isSubscription: true
  },
  {
    id: "t10",
    date: "2023-06-19",
    amount: 14.99,
    merchant: "HBO Max",
    category: "Entertainment",
    isSubscription: true
  }
];

// Sample Subscription Data
export const subscriptions = [
  {
    id: "s1",
    name: "Netflix",
    amount: 15.99,
    frequency: "monthly",
    lastCharged: "2023-06-28",
    nextCharge: "2023-07-28",
    category: "Entertainment",
    risk: "low" as const
  },
  {
    id: "s2",
    name: "Spotify",
    amount: 9.99,
    frequency: "monthly",
    lastCharged: "2023-06-27",
    nextCharge: "2023-07-27",
    category: "Music",
    risk: "low" as const
  },
  {
    id: "s3",
    name: "Amazon Prime",
    amount: 12.99,
    frequency: "monthly",
    lastCharged: "2023-06-26",
    nextCharge: "2023-07-26",
    category: "Shopping",
    risk: "low" as const
  },
  {
    id: "s4",
    name: "Hulu",
    amount: 11.99,
    frequency: "monthly",
    lastCharged: "2023-06-24",
    nextCharge: "2023-07-24",
    category: "Entertainment",
    risk: "medium" as const
  },
  {
    id: "s5",
    name: "Disney+",
    amount: 7.99,
    frequency: "monthly",
    lastCharged: "2023-06-23",
    nextCharge: "2023-07-23",
    category: "Entertainment",
    risk: "low" as const
  },
  {
    id: "s6",
    name: "Fitness App",
    amount: 19.99,
    frequency: "monthly",
    lastCharged: "2023-06-22",
    nextCharge: "2023-07-22",
    category: "Health",
    risk: "high" as const
  },
  {
    id: "s7",
    name: "Microsoft OneDrive",
    amount: 9.99,
    frequency: "monthly",
    lastCharged: "2023-06-20",
    nextCharge: "2023-07-20",
    category: "Software",
    risk: "low" as const
  },
  {
    id: "s8",
    name: "HBO Max",
    amount: 14.99,
    frequency: "monthly",
    lastCharged: "2023-06-19",
    nextCharge: "2023-07-19",
    category: "Entertainment",
    risk: "medium" as const
  },
  {
    id: "s9",
    name: "New York Times",
    amount: 17.99,
    frequency: "monthly",
    lastCharged: "2023-06-15",
    nextCharge: "2023-07-15",
    category: "News",
    risk: "high" as const
  },
  {
    id: "s10",
    name: "Adobe Creative Cloud",
    amount: 52.99,
    frequency: "monthly",
    lastCharged: "2023-06-10",
    nextCharge: "2023-07-10",
    category: "Software",
    risk: "low" as const
  },
  {
    id: "s11",
    name: "YouTube Premium",
    amount: 11.99,
    frequency: "monthly",
    lastCharged: "2023-06-05",
    nextCharge: "2023-07-05",
    category: "Entertainment",
    risk: "medium" as const
  },
  {
    id: "s12",
    name: "Meditation App",
    amount: 12.99,
    frequency: "monthly",
    lastCharged: "2023-06-03",
    nextCharge: "2023-07-03",
    category: "Health",
    risk: "high" as const
  }
];
