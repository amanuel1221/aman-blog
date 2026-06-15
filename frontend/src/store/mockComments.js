const mockComments = [
  {
    _id: "comment_1",
    content: "This step-by-step breakdown of the token payload flow clarifies exactly where to intercept headers safely. Thanks for sharing!",
    author: { _id: "user_dev_michael", name: "Michael K." },
    post: "6668742ba3bc891122334401", 
    parentComment: null, // Top-level comment
    likes: ["user_amanuel_123"],
    dislikes: [],
    createdAt: "2026-06-11T12:22:00.000Z"
  },
  {
    _id: "reply_1_to_comment_1",
    content: "Completely agree! Intercepting them at the Axios/Fetch client middleware layer keeps the components clean.",
    author: { _id: "user_frontend_elias", name: "Elias Tesfaye" },
    post: "6668742ba3bc891122334401",
    parentComment: "comment_1", // Links back to comment_1 as a reply!
    likes: ["user_dev_michael"],
    dislikes: [],
    createdAt: "2026-06-11T14:05:00.000Z"
  },
  {
    _id: "comment_2",
    content: "Are you using cookie-based token delivery or handling local storage storage vectors for your refresh rotations?",
    author: { _id: "user_guest_88", name: "Sara Jenkins" },
    post: "6668742ba3bc891122334401",
    parentComment: null,
    likes: [],
    dislikes: [],
    createdAt: "2026-06-12T15:40:00.000Z"
  }
];

export default mockComments;