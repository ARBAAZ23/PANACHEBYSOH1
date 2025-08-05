import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import reviews from '../assets/review';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const product = products.find(item => item._id === productId);
    setProductData(product || null);
    setCurrentImageIndex(0);
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading product...
      </div>
    );
  }

  const images = Array.isArray(productData.image) ? productData.image : [productData.image];

  return (
    <section className="min-h-screen bg-[#f9f9f9] px-4 py-10 sm:px-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-xl overflow-hidden p-6 sm:p-10">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
          {/* Thumbnails */}
          <div className="flex md:flex-col flex-row gap-3 overflow-auto max-h-[500px]">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-24 object-cover rounded-md cursor-pointer border transition-all ${
                  currentImageIndex === index
                    ? 'border-gray-900 ring-2 ring-gray-700'
                    : 'border-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
            <img
              src={images[currentImageIndex]}
              alt={productData.name}
              className="w-full h-full object-cover transition duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{productData.name}</h1>

          <p className="text-2xl text-orange-600 font-semibold">${productData.price}</p>

          <p className="text-gray-500 text-sm">
            <span className="font-medium">Category:</span> {productData.category}
          </p>

          {productData.productDetails && (
            <div className="bg-gray-100 rounded-md p-4 text-sm text-gray-700 border border-gray-200 space-y-2">
              {productData.productDetails.map((detail, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="font-medium">Color:</span> {detail.color}</p>
                  <p><span className="font-medium">Fabric:</span> {detail.fabric}</p>
                  <p><span className="font-medium">Cut:</span> {detail.cut}</p>
                  <p><span className="font-medium">Slip:</span> {detail.slip}</p>
                  <p><span className="font-medium">Dupatta:</span> {detail.dupatta}</p>
                  <p><span className="font-medium">Trouser:</span> {detail.trouser}</p>
                </div>
              ))}
            </div>
          )}

          {/* Size Selection */}
          {productData.size && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Select Size:</p>
              <div className="flex gap-3 flex-wrap">
                {productData.size.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-gray-600 leading-relaxed">
            Experience timeless elegance with our newest collection piece. Perfectly tailored from premium satin fabric with a wide-leg pant, this outfit brings unmatched comfort and graceful style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition duration-200"
              onClick={() => addToCart(productData._id, selectedSize)}
            >
              Add to Cart
            </button>
            <button className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-lg transition duration-200">
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-900">{review.name}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            <div className="flex items-center mt-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.168 3.602a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.158 2.293a1 1 0 00-.364 1.118l1.168 3.602c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.158 2.293c-.784.57-1.838-.197-1.539-1.118l1.168-3.602a1 1 0 00-.364-1.118L2.95 9.029c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.168-3.602z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product;
