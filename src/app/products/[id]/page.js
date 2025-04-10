'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import productsData from '@/data/products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const product = productsData.products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...inquiryForm,
          subject: `Inquiry about ${product.name}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setInquiryForm({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
              loading="eager"
              onError={(e) => {
                e.target.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((image, index) => (
              <button
                key={index}
                className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 relative"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12.5vw, 8.33vw"
                  className="object-cover object-center"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/placeholder.svg';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex space-x-4 mb-6">
              {['details', 'specifications', 'sustainability'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeTab === 'details' && (
                <div>
                  <p className="text-gray-600">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Dimensions</h3>
                    {typeof product.dimensions === 'object' ? (
                      <>
                        <p>L: {product.dimensions.length}"{product.dimensions.unit ? ` ${product.dimensions.unit}` : ''}</p>
                        <p>W: {product.dimensions.width}"{product.dimensions.unit ? ` ${product.dimensions.unit}` : ''}</p>
                        <p>H: {product.dimensions.height}"{product.dimensions.unit ? ` ${product.dimensions.unit}` : ''}</p>
                      </>
                    ) : (
                      <p>{product.dimensions}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Weight</h3>
                    <p>{product.weight?.value} {product.weight?.unit}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Materials</h3>
                    {product.materials?.map((material, index) => (
                      <div key={index} className="mb-2">
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-gray-600">{material.description}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Assembly</h3>
                    <p>Required: {product.assembly?.required ? 'Yes' : 'No'}</p>
                    <p>Estimated Time: {product.assembly?.estimatedTime}</p>
                    <p>Tools Included: {product.assembly?.toolsIncluded ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              )}

              {activeTab === 'sustainability' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{product.sustainability?.materials}</p>
                  <p className="text-sm text-gray-600">{product.sustainability?.packaging}</p>
                  <p className="text-sm text-gray-600">{product.sustainability?.manufacturing}</p>
                </div>
              )}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
            <ul className="space-y-2">
              {product.careInstructions?.map((instruction, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="text-gray-400 mr-2">•</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          {/* Inquiry Form */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Inquire About This Product</h3>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm">Your inquiry has been sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm">There was an error sending your inquiry. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}