const calculateReadTime = (content) => {
  const wordsPerMinute = 200;

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(
    1,
    Math.ceil(wordCount / wordsPerMinute)
  );

  return `${minutes} min read`;
};

module.exports=calculateReadTime;