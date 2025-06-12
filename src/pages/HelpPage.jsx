import React from 'react';
import { Search, MessageSquare, Phone } from 'lucide-react';

const HelpPage = () => {
    const handleContactSupport = () => {
        // In a real application, this would open a support chat or contact form
        console.log('Contacting support');
        alert('Support chat opened');
    };

    return (
        <div className="pt-20">
            <div className="bg-blue-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Help Center</h1>
                    <p className="text-xl text-blue-100">Find answers to your questions</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-4">Search Knowledge Base</h2>
                        <p className="text-gray-600 mb-4">
                            Find answers in our comprehensive knowledge base.
                        </p>
                        <button
                            onClick={handleContactSupport}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            Browse Articles
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-4">Live Chat Support</h2>
                        <p className="text-gray-600 mb-4">
                            Chat with our support team in real-time.
                        </p>
                        <button
                            onClick={handleContactSupport}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            Start Chat
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Phone className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-4">Phone Support</h2>
                        <p className="text-gray-600 mb-4">
                            Call us directly for immediate assistance.
                        </p>
                        <button
                            onClick={handleContactSupport}
                            className="text-blue-600 hover:text-blue-700"
                        >
                            Call Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;