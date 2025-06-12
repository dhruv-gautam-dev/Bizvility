import React from 'react';

const PressPage = () => {
    return (
        <div className="pt-20">
            <div className="bg-blue-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-8">Press & Media</h1>
                    <h2 className="text-2xl font-semibold mb-6">Latest Press Releases</h2>
                </div>
            </div>

            <div className='container mx-auto px-4 py-8'>
                <section className="mb-12">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Placeholder for press releases - to be connected to actual data */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-lg shadow-md p-6">
                                <p className="text-sm text-gray-500 mb-2">January {item}, 2024</p>
                                <h3 className="text-xl font-semibold mb-3">Press Release Title {item}</h3>
                                <p className="text-gray-600 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <button className="text-blue-600 hover:text-blue-800 font-medium">
                                    Read More →
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Media Resources</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Media Kit</h3>
                                <p className="text-gray-600 mb-4">
                                    Download our media kit containing logos, brand guidelines, and high-resolution images.
                                </p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Download Media Kit
                                </button>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Press Contact</h3>
                                <p className="text-gray-600 mb-2">For media inquiries, please contact:</p>
                                <p className="font-medium">press@company.com</p>
                                <p className="font-medium">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6">In the News</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="border-b border-gray-200 pb-6 last:border-0">
                                <p className="text-sm text-gray-500 mb-2">Featured in Publication {item}</p>
                                <h3 className="text-xl font-semibold mb-3">Article Title {item}</h3>
                                <p className="text-gray-600 mb-4">
                                    "Quote or excerpt from the article that highlights our company's achievements or milestones."
                                </p>
                                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Read Full Article →
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PressPage;