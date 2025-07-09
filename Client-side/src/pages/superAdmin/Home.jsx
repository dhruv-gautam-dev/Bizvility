import React from 'react';
import { motion } from 'framer-motion';

const SuperHome = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.pexels.com/photos/2631613/pexels-photo-2631613.jpeg"
            alt="UP university campus"
          />
          <div className="absolute inset-0 bg-indigo-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-8">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to University of UP
          </motion.h1>
          <motion.p
            className="mt-6 text-xl text-gray-300 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering minds, shaping futures, and preserving cultural heritage since 1887.
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '50,000+', label: 'Students' },
              { value: '2,000+', label: 'Faculty Members' },
              { value: '100+', label: 'Research Centers' },
              { value: '150+', label: 'Years of Excellence' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-indigo-50 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-4xl font-bold text-indigo-900">{item.value}</h3>
                <p className="mt-2 text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Programs */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Programs</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'Engineering',
                desc: 'World-class engineering programs with state-of-the-art facilities.',
                img: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg',
              },
              {
                title: 'Management',
                desc: 'Leading business education with industry partnerships.',
                img: 'https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg',
              },
              {
                title: 'Arts & Sciences',
                desc: 'Comprehensive programs in liberal arts and sciences.',
                img: 'https://images.pexels.com/photos/3184658/pexels-photo-3184658.jpeg',
              },
            ].map((program, index) => (
              <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src={program.img}
                  alt={program.title}
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{program.title}</h3>
                  <p className="mt-2 text-gray-600">{program.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Life */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Campus Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              className="w-full h-96 object-cover rounded-lg"
              src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg"
              alt="Campus life"
            />
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Experience the Vibrant Campus Culture</h3>
              <p className="text-gray-600">
                Our campus offers a rich blend of academic excellence and cultural diversity. With modern
                facilities, lush green spaces, and a vibrant community, students find their second home here.
              </p>
              <ul className="space-y-4">
                {[
                  'Modern sports facilities',
                  'Cultural events and festivals',
                  'Student clubs and organizations',
                  'Research opportunities',
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-3">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>University of UP</p>
              <p>Lucknow, Uttar Pradesh</p>
              <p>India 226007</p>
              <p>contact@uoup.edu.in</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'Admissions', 'Academic Programs', 'Research'].map((link, i) => (
                  <li key={i}><a href="#" className="hover:text-indigo-200">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Library', 'Student Portal', 'Career Services', 'Alumni Network'].map((link, i) => (
                  <li key={i}><a href="#" className="hover:text-indigo-200">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2">
                {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((platform, i) => (
                  <li key={i}><a href="#" className="hover:text-indigo-200">{platform}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-indigo-800 pt-8 text-center">
            <p>© 2024 University of UP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuperHome;
