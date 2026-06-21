
import React, {useMemo} from 'react';
import notesData from '../store/notesData';



const NotesGrid = () => {
    const notes = useMemo(() => notesData, []);
    return (
        <section className="p-6 max-w-7xl mx-auto" data-testid="notes-grid" aria-labelledby="notes-grid-title">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                data-testid="notes-grid-container"
                role="list"
                aria-label="Learning topics grid">
                {notesData.map((card) => (
                    <article
                        key={card.id}
                        className={`${card.bgColor} rounded-3xl p-6 flex flex-col items-center text-center shadow-sm border border-black/5 transition-transform duration-300 hover:scale-[1.02]`}
                        data-testid="notes-grid-card"
                        role="listitem"
            aria-label={`${card.title} topic card`}
                    >

                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                            <img
                                src={card.iconUrl}
                                alt={`${card.title} icon`}
                                className="w-6 h-6 invert-[23%] sepia([93%]) saturate([2948%]) hue-rotate([215deg]) brightness([99%]) contrast([103%])"
                                data-testid="notes-grid-card-icon"
                                loading="lazy"
                decoding="async"
                            />
                        </div>


                        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-3" data-testid="notes-grid-card-title">
                            {card.title}
                        </h3>

                        <span className="bg-white text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm border border-gray-100 mb-6 inline-block" data-testid="notes-grid-card-status"  aria-label={`${card.status} status`}>
                            {card.status}
                        </span>


                        <ul className="w-full space-y-3.5 text-left pl-2 mt-auto" data-testid="notes-grid-card-items" role="list">
                            {card.items.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-4 text-gray-700 font-medium text-base leading-tight group cursor-pointer"
                                    data-testid="notes-grid-card-item"
                                    role="listitem"
                                >

                                    <svg
                                        className="w-5 h-5 text-gray-800 flex-shrink-0 transition-colors group-hover:text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>

                                    <span className="group-hover:text-gray-900 transition-colors" data-testid="notes-grid-card-item-text">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default NotesGrid;