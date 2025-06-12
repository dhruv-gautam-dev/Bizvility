import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Top 10 Marketing Strategies for Local Businesses",
      excerpt: "Discover effective marketing strategies that can help your local business grow and attract more customers...",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: "Sarah Johnson",
      date: "March 15, 2025",
      category: "Marketing"
    },
    {
      title: "How to Optimize Your Business Directory Listing",
      excerpt: "Learn the best practices for creating an engaging and effective business directory listing that attracts potential customers...",
      image: "https://images.pexels.com/photos/935979/pexels-photo-935979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: "Michael Smith",
      date: "March 12, 2025",
      category: "Tips & Tricks"
    },
    {
      title: "The Future of Local Business in the Digital Age",
      excerpt: "Explore how technology is shaping the future of local businesses and what you need to know to stay competitive...",
      image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: "Emily Chen",
      date: "March 10, 2025",
      category: "Industry Trends"
    }
  ];

  return (
    <div className="pt-20">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-blue-100">Insights, tips, and news for local businesses</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <article key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">{post.category}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                
                <button className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Marketing', 'Tips & Tricks', 'Industry Trends', 'Success Stories', 'Technology', 'Customer Service', 'Business Growth', 'Local News'].map((category, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900">{category}</h3>
                <p className="text-sm text-gray-500 mt-1">12 articles</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;