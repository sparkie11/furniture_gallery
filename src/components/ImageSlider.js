'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import productsData from '@/data/products.json';

const categoryRows = [
  {
    title: 'Featured Collections',
    items: productsData.products ? productsData.products.slice(0, 4) : []
  }
];

const categories = productsData.categories ? productsData.categories.map(category => ({
  title: category,
  items: productsData.products ? productsData.products.filter(product => product.category === category) : []
})) : [];

const allRows = [...categoryRows, ...categories];

export default function ImageSlider() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrollPositions, setScrollPositions] = useState({});
  const rowRefs = useRef([]);

  const handleScroll = (rowIndex, e) => {
    const newScrollPositions = { ...scrollPositions };
    newScrollPositions[rowIndex] = e.target.scrollLeft;
    setScrollPositions(newScrollPositions);
  };

  const scrollRow = (rowIndex, direction) => {
    const row = rowRefs.current[rowIndex];
    if (row) {
      const scrollAmount = direction * (row.clientWidth * 0.8);
      row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {allRows.map((row, rowIndex) => (
        <div key={rowIndex} className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8 px-4">
            <h2 className="text-3xl font-bold text-gray-900">{row.title}</h2>
            <div className="flex gap-4">
              <button
                onClick={() => scrollRow(rowIndex, -1)}
                className="p-3 rounded-full bg-gray-900/10 hover:bg-gray-900/20 transition-colors backdrop-blur-sm"
                aria-label="Previous"
              >
                <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollRow(rowIndex, 1)}
                className="p-3 rounded-full bg-gray-900/10 hover:bg-gray-900/20 transition-colors backdrop-blur-sm"
                aria-label="Next"
              >
                <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              ref={el => rowRefs.current[rowIndex] = el}
              onScroll={e => handleScroll(rowIndex, e)}
              className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 px-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {row.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative flex-none group"
                  onHoverStart={() => setHoveredItem(`${rowIndex}-${index}`)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/products/${item.id}`} className="block">
                    <div className="w-full max-w-sm overflow-hidden rounded-xl bg-gray-100 shadow-md hover:shadow-lg transition-shadow">
                      <div className="aspect-[16/9] relative">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
                        {item.description && (
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        )}
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500">{item.category}</span>
                          <span className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700">
                            View Details
                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}