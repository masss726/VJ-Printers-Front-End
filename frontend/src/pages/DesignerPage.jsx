import React, { useState, useRef, useEffect } from 'react';
import ProductCustomizer from '../components/ProductCustomizer.jsx';
import ModelViewer3D from '../components/ModelViewer3D.jsx';

function DesignerPage() {
  const [selectedProduct, setSelectedProduct] = useState('mug');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#FF6B35');

  const products = [
    { id: 'mug', name: '☕ Mug', price: 299, icon: '☕' },
    { id: 'tshirt', name: '👕 T-Shirt', price: 599, icon: '👕' },
    { id: 'phonecase', name: '📱 Phone Case', price: 399, icon: '📱' },
    { id: 'frame', name: '🖼️ Photo Frame', price: 349, icon: '🖼️' },
    { id: 'pillow', name: '🛏️ Pillow', price: 499, icon: '🛏️' },
    { id: 'hoodie', name: '🧥 Hoodie', price: 799, icon: '🧥' },
  ];

  // uploaded image preview state
  const [uploadedImage, setUploadedImage] = useState(null);
  const uploadInputRef = useRef(null);
  const [tintedImage, setTintedImage] = useState(null);

  const [customText, setCustomText] = useState('Your Text Here');
  const [selectedFont, setSelectedFont] = useState('Modern');

  const handleUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // revoke previous object URL if any
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
      setUploadedImage(url);
    }
  };

  // Create a tinted version of the uploaded image using canvas whenever
  // `uploadedImage` or `selectedColor` changes.
  useEffect(() => {
    if (!uploadedImage) {
      setTintedImage(null);
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = uploadedImage;
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      // Draw original image
      ctx.drawImage(img, 0, 0, w, h);
      // Tint using source-atop so color fills only where image pixels exist
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = selectedColor;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      try {
        const dataUrl = canvas.toDataURL('image/png');
        setTintedImage(dataUrl);
      } catch (err) {
        console.error('Failed to create tinted image', err);
        setTintedImage(uploadedImage);
      }
    };
    img.onerror = (err) => {
      console.error('Error loading uploaded image for tinting', err);
      setTintedImage(uploadedImage);
    };

    return () => {
      cancelled = true;
    };
  }, [uploadedImage, selectedColor]);

  // Map products to model files in `public/` (update paths when you add more models)
  const modelMap = {
    mug: '/95f173c3-3c92-4a10-a8cc-2e73c6062475.glb',
    // add other mappings when you have more models, e.g.:
    // tshirt: '/models/tshirt.glb',
    // phonecase: '/models/phonecase.glb',
  };

  const modelUrl = modelMap[selectedProduct] || modelMap.mug;

  const currentProduct = products.find(p => p.id === selectedProduct);
  const totalPrice = (currentProduct?.price || 0) * quantity;
  const discount = totalPrice > 1000 ? Math.floor(totalPrice * 0.1) : 0;
  const finalPrice = totalPrice - discount;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">✨ Design Your Product</h1>
          <p className="text-lg text-gray-600">Choose a product, upload your photo, add text, and create something amazing!</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Left Sidebar - Product Selection & Customization */}
          <div className="md:col-span-2 space-y-6">
            {/* Product Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Product</h2>
              
              <div className="space-y-2 mb-6">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`w-full p-3 rounded-lg text-left font-semibold transition ${
                      selectedProduct === product.id
                        ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7B801] text-gray-900 shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {product.name}
                    <div className="text-xs text-gray-600 mt-1">₹{product.price}</div>
                  </button>
                ))}
              </div>

              {/* Quantity */}
              <div className="border-t pt-4">
                <label className="font-semibold text-gray-900 mb-2 block">Quantity</label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded font-bold"
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-2 border-gray-300 rounded py-1 font-semibold"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Info */}
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-[#FF6B35]">₹{finalPrice}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex gap-2 text-green-600">
                  <span>✅</span>
                  <span>Free Shipping above ₹499</span>
                </div>
                <div className="flex gap-2 text-green-600">
                  <span>✅</span>
                  <span>100% Quality Guaranteed</span>
                </div>
                <div className="flex gap-2 text-green-600">
                  <span>✅</span>
                  <span>Same Day Delivery</span>
                </div>
              </div>
            </div>

            {/* Customizer Tools */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">🎨 Customize</h2>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="font-semibold text-gray-900 mb-2 block text-sm">📸 Upload Image</label>
                <div
                  role="button"
                  onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                  className="relative border-2 border-dashed border-gray-400 rounded-lg p-2 text-center hover:border-[#FF6B35] transition cursor-pointer bg-white"
                >
                  <input
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />

                  {uploadedImage ? (
                      <div className="w-full h-44 rounded-lg overflow-hidden relative">
                        <img
                          src={tintedImage || uploadedImage}
                          alt="Uploaded preview"
                          className="object-contain w-full h-full bg-white"
                          style={{ display: 'block' }}
                        />

                        {/* Text overlay on uploaded preview */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span
                            className="font-bold text-lg text-center"
                            style={{
                              color: '#fff',
                              textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                              fontFamily:
                                selectedFont === 'Classic'
                                  ? 'Georgia, serif'
                                  : selectedFont === 'Artistic'
                                  ? 'Brush Script MT, cursive'
                                  : selectedFont === 'Bold'
                                  ? 'Impact, system-ui, sans-serif'
                                  : 'Inter, system-ui, -apple-system, sans-serif',
                            }}
                          >
                            {customText}
                          </span>
                        </div>
                      </div>
                  ) : (
                    <div className="p-6">
                      <div className="text-2xl mb-1">📁</div>
                      <p className="font-semibold text-gray-900 text-sm">Click to upload</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Input */}
              <div className="mb-4">
                <label className="font-semibold text-gray-900 mb-2 block text-sm">✏️ Custom Text</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter text..."
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF6B35] focus:outline-none text-sm mb-2"
                />
                <textarea
                  placeholder="Add details..."
                  rows="2"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF6B35] focus:outline-none text-sm"
                ></textarea>
              </div>

              {/* Color Selection */}
              <div className="mb-4">
                <label className="font-semibold text-gray-900 mb-2 block text-sm">🎨 Color Options</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Red', hex: '#EF4444' },
                    { name: 'Blue', hex: '#3B82F6' },
                    { name: 'Green', hex: '#10B981' },
                    { name: 'Yellow', hex: '#FBBF24' },
                    { name: 'Black', hex: '#000000' },
                    { name: 'White', hex: '#FFFFFF' },
                    { name: 'Orange', hex: '#FF6B35' },
                    { name: 'Purple', hex: '#A855F7' },
                    { name: 'Pink', hex: '#EC4899' },
                  ].map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.hex)}
                      className={`h-10 rounded-lg border-4 transition transform hover:scale-110 ${
                        selectedColor === color.hex ? 'border-gray-900 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    ></button>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">Selected: {selectedColor}</p>
              </div>

              {/* Font Selection */}
              <div>
                <label className="font-semibold text-gray-900 mb-2 block text-sm">🔤 Font Style</label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF6B35] focus:outline-none text-sm"
                >
                  <option>Modern</option>
                  <option>Classic</option>
                  <option>Artistic</option>
                  <option>Bold</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Model Viewer */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20 relative" style={{ height: '700px' }}>
              <ModelViewer3D modelColor={selectedColor} modelUrl={modelUrl} />

              {/* HTML overlay for live text preview on the 3D view */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <span
                  className="text-2xl md:text-4xl font-bold text-center"
                  style={{
                    color: selectedColor,
                    textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                    fontFamily:
                      selectedFont === 'Classic'
                        ? 'Georgia, serif'
                        : selectedFont === 'Artistic'
                        ? 'Brush Script MT, cursive'
                        : selectedFont === 'Bold'
                        ? 'Impact, system-ui, sans-serif'
                        : 'Inter, system-ui, -apple-system, sans-serif',
                  }}
                >
                  {customText}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7B801] hover:from-orange-600 hover:to-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-lg">
                🛒 Add to Cart
              </button>
              <div className="flex gap-3">
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-4 rounded-lg transition">
                  💾 Save Design
                </button>
                <button className="flex-1 border-2 border-[#004E89] hover:bg-blue-50 text-[#004E89] font-bold py-3 px-4 rounded-lg transition">
                  📥 Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignerPage;