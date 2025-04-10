'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/data/products.json';
import ImageSlider from '@/components/ImageSlider';

export default function Home() {
  const featuredProducts = productsData.products.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ImageSlider />

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Pieces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 md:h-56 lg:h-64">
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
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    {product.dimensions && typeof product.dimensions === 'object' ? 
                      `${product.dimensions.length}"L x ${product.dimensions.width}"W x ${product.dimensions.height}"H` : 
                      product.dimensions}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <Link
                      href="/products"
                      className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Antony's Sawmill</h2>
              <p className="text-gray-600 mb-6">
                For over three decades, Antony's Sawmill has been crafting exceptional furniture that combines traditional
                woodworking techniques with contemporary design. Our master craftsmen take pride in selecting the finest
                materials and paying meticulous attention to detail in every piece we create.
              </p>
              <Link
                href="/about"
                className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
              >
                Learn More About Us →
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px]"
            >
              <Image
                src="/workshop.jpg"
                alt="Antony's Sawmill Workshop"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow-xl"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/placeholder.svg';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
