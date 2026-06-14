import AnimatedNumber from "./AnimatedNumber";

const DevelopmentJourney = () => {
  const stats = [



    { value: 15, label: "Repositories" },
    { value: 10, label: "Projects" },
    { value: 500, label: "GitHub Commits" },
    { value: 99, label: "Focused on Performance & Testing" },
  ];

  return (
    <section className="w-full bg-white py-10 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          My Development Journey
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Building projects, writing code, and continuously learning modern web technologies.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-3xl font-bold text-gray-900">
                <AnimatedNumber value={item.value} />
              </h3>
              <p className="mt-2 text-gray-600 font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DevelopmentJourney;