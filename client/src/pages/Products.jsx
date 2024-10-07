
import React from 'react';

const products = [
  {
    id: 1,
    name: 'Shampoo and Conditioner',
    description: 'A gentle shampoo for sensitive pet skin.',
    price: '$20',
    image: '/images/shampoo-conditioner.png',
    backgroundColor: '#f0f8ff', // Light blue background
  },
  {
    id: 2,
    name: 'Detangling Spray',
    description: 'Leave-in conditioner for silky smooth fur.',
    price: '$15',
    image: '/images/detangling-spray.png',
    backgroundColor: '#ffffff', // White background
  },
  {
    id: 3,
    name: 'Toothpaste',
    description: 'Toothpaste for fresh breath and healthy teeth.',
    price: '$10',
    image: '/images/toothpaste.png',
    backgroundColor: '#f0f8ff', // Light blue background
  },
  // Add more products as needed
];

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    // Handle adding the product to the cart (logic to be implemented)
    console.log(`Added ${product.name} to cart!`);
  };

  return (
    <div
      key={product.id}
      className="rounded-lg shadow-md mb-4 w-full flex flex-col bg-gray-800 text-gray-300"
      style={{ backgroundColor: product.backgroundColor }}
    >
      <div className="relative w-full h-120">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      <div className="flex flex-col justify-between p-4 w-full">
        <h2 className="text-4xl font-semibold mb-4 text-cyan-600">{product.name}</h2>
        <p>{product.description}</p>
        <p className="text-xl mt-2 text-cyan-600">Price: {product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <main className="mt-16 pt-20 md:w-5/5 bg-gray-800 text-gray-300">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold mt-8 mb-8 text-center text-cyan-600 shadow-lg">Our Products</h1>
        <ul className="mt-4 space-y-4 w-4/5 flex flex-col items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Products;
