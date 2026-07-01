// src/admin/data/mockDashboardData.js

export const dashboardData = {
  stats: {
    totalPosts: 48,
    totalUsers: 1284,
    totalEmails: 1284,
    totalViews: 186420,
    totalLikes: 12964,
    totalComments: 3582,
    totalMessages: 126,
    unreadMessages: 9,
  },

  topPosts: [
    {
      id: 1,
      title: "React Performance Tips",
      views: 24150,
      likes: 1620,
      comments: 243,
      createdAt: "2026-05-12",
    },
    {
      id: 2,
      title: "Mastering Node.js APIs",
      views: 18970,
      likes: 1432,
      comments: 196,
      createdAt: "2026-04-28",
    },
    {
      id: 3,
      title: "Complete MongoDB Guide",
      views: 17830,
      likes: 1245,
      comments: 178,
      createdAt: "2026-03-19",
    },
    {
      id: 4,
      title: "Modern CSS Techniques",
      views: 15910,
      likes: 1084,
      comments: 149,
      createdAt: "2026-02-14",
    },
    {
      id: 5,
      title: "Authentication with JWT",
      views: 14680,
      likes: 972,
      comments: 137,
      createdAt: "2026-01-30",
    },
  ],

  engagementBreakdown: [
    {
      name: "Likes",
      value: 12964,
    },
    {
      name: "Comments",
      value: 3582,
    },
    {
      name: "Views",
      value: 186420,
    },
  ],

  monthlyActivity: [
    {
      month: "Jan",
      posts: 3,
      comments: 120,
      messages: 8,
    },
    {
      month: "Feb",
      posts: 5,
      comments: 180,
      messages: 12,
    },
    {
      month: "Mar",
      posts: 6,
      comments: 260,
      messages: 16,
    },
    {
      month: "Apr",
      posts: 4,
      comments: 320,
      messages: 21,
    },
    {
      month: "May",
      posts: 7,
      comments: 410,
      messages: 27,
    },
    {
      month: "Jun",
      posts: 8,
      comments: 520,
      messages: 42,
    },
  ],

  recentMessages: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      company: "Google",
      message:
        "Hi Amanuel, I really enjoyed your portfolio and would like to discuss a frontend opportunity.",
      status: "Unread",
      createdAt: "2026-06-28",
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael@example.com",
      company: "Microsoft",
      message:
        "We're looking for React developers and would love to connect.",
      status: "Read",
      createdAt: "2026-06-27",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma@example.com",
      company: "Startup Inc.",
      message:
        "Can we schedule a meeting regarding a freelance project next week?",
      status: "Unread",
      createdAt: "2026-06-26",
    },
    {
      id: 4,
      name: "David Smith",
      email: "david@example.com",
      company: "Personal",
      message:
        "Your latest article on MongoDB was very helpful. Great work!",
      status: "Read",
      createdAt: "2026-06-24",
    },
    {
      id: 5,
      name: "Daniel Kim",
      email: "daniel@example.com",
      company: "Freelancer",
      message:
        "I'm interested in collaborating on an open-source React project.",
      status: "Unread",
      createdAt: "2026-06-22",
    },
  ],
};