'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/data/products.json';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const { categories } = productsData;

  useEffect(() => {
    const filteredProducts = selectedCategory === 'all'
      ? productsData.products
      : productsData.products.filter(product => product.category === selectedCategory);
    setProducts(filteredProducts);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Furniture Collection</h1>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/placeholder.svg';
                }}
              />
              {!product.inStock && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm z-10">
                  Out of Stock
                </div>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <Link
                  href={`/products/${product.id}`}
                  className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center group"
                >
                  View Details
                  <svg
                    className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Features:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Dimensions: {typeof product.dimensions === 'object' ? 
                  `${product.dimensions.length}"L x ${product.dimensions.width}"W x ${product.dimensions.height}"H` : 
                  product.dimensions}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}