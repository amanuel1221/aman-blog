const WhyReadMyBlog = () => {
    const features = [
        {
            title: "Real Engineering Work",
            desc: "Learn from real projects, not tutorials.",
           
        },
        {
            title: "Performance Focus",
            desc: "How I optimize applications from 78 → 99 Lighthouse score.",
            
        },
        {
            title: "Testing Mindset",
            desc: "Practical Vitest strategies used in real applications.",
          
        },
        {
            title: "Fullstack Thinking",
            desc: "Building complete systems using frontend + backend.",
            
        },
    ];

    return (
        <section className="w-full bg-white py-16 md:py-24 ">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">


                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Why Read My Blog
                </h2>


                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Learn froThis blog is based on real engineering experience from building fullstack applications.

Every post is practical — focused on solving real problems in React, Node.js, performance optimization, and testing.m practical experiences, real projects, and lessons from my software engineering journey.
                </p>


                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                         
                            <h3 className="font-semibold text-gray-900">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyReadMyBlog;