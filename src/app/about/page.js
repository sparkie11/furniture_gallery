'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
          <p className="text-xl text-gray-600">Crafting Excellence Since 1985</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px]"
          >
            <img
              src="https://d111111abcdef8.cloudfront.net/workshop-vintage.jpg"
              alt="Antony's Sawmill Historical Workshop"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">Heritage of Craftsmanship</h2>
            <p className="text-gray-600">
              Founded in 1985, Antony's Sawmill began as a small family workshop with a simple mission:
              to create furniture that would stand the test of time. Our founder, Antony Williams,
              learned the art of woodworking from his father and grandfather, carrying forward
              generations of expertise and passion for crafting exceptional pieces.
            </p>
            <p className="text-gray-600">
              Today, we continue to honor those traditional techniques while embracing modern design
              and innovation. Every piece that leaves our workshop carries with it the pride of our
              craftsmen and the legacy of our heritage.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-xl p-8 mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">We select only the finest materials and employ time-tested techniques to ensure every piece meets our exacting standards.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">We're committed to responsible sourcing and sustainable practices to protect our environment for future generations.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">We believe in building lasting relationships with our customers and supporting our local woodworking community.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Craftsmen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                src="https://d111111abcdef8.cloudfront.net/craftsman-1.jpg"
                alt="Master Craftsman"
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">John Smith</h3>
              <p className="text-gray-600">Master Woodworker</p>
            </div>
            <div>
              <img
                src="https://d111111abcdef8.cloudfront.net/craftsman-2.jpg"
                alt="Senior Artisan"
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">Maria Rodriguez</h3>
              <p className="text-gray-600">Senior Artisan</p>
            </div>
            <div>
              <img
                src="https://d111111abcdef8.cloudfront.net/craftsman-3.jpg"
                alt="Design Specialist"
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">David Chen</h3>
              <p className="text-gray-600">Design Specialist</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}