const WhatIWriteAbout = () => {
  const topics = [
    { name: "Backend", image: "./undraw_server-cluster_7ugi.svg" },
    { name: "Performance", image: "./undraw_cloudflare-dev_nf79.svg" },
    { name: "Vitest", image: "./undraw_fixing-bugs_1ytu.svg" },
    { name: "Agile Development", image: "./undraw_code-contribution_8k0x.svg" },
  ];

  const checklist = [

    "React & Component Architecture",
    "Performance Optimization (Lighthouse 78 → 99)",
    "Vitest & Testing Strategies",
    " Node.js & Fullstack APIs",
    "Scalable Web Application Design",
    "Real-world project development"
  ];

  return (
    <section className="w-full bg-white md:py-24 " data-testid="what-about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative">


          <div className="grid grid-cols-2 gap-4 order-2 md:order-1" data-testid="what-about-topics">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl  shadow-sm flex flex-col items-center justify-center aspect-square text-center hover:shadow-md transition-shadow"
                data-testid={`what-about-topic-${index}`}
              >
                <img
                  src={topic.image}
                  alt={topic.name}
                  className="w-16 h-16 object-contain mb-3"
                  data-testid={`what-about-topic-image-${index}`}
                />

              </div>
            ))}
          </div>


          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white"  data-testid="what-about-divider" />


          <div className="order-1 md:order-2 flex flex-col justify-center "  data-testid="what-about-content">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight items-center" data-testid="what-about-title">
              What do I write about?
            </h2>

            <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed items-center" data-testid="what-about-description">
          I write about modern frontend engineering and fullstack development,
focused on building performant and testable web applications.

Most content comes from real projects where I explore React architecture,
Node.js APIs, performance optimization, and Vitest testing workflows.
            </p>

            <ul className="mt-6 space-y-3" data-testid="what-about-checklist">
              {checklist.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 font-medium"
                  data-testid={`what-about-checklist-item-${index}`}
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-md  text-blue-600 text-md shrink-0"> ✓ </span>
                  <span data-testid={`what-about-checklist-item-text-${index}`}>{item}</span>

                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatIWriteAbout;