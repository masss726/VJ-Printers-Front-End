import React, { useState } from 'react';

function CheckoutPage() {
  const [cartItems] = useState([
    { id: 1, name: 'Personalized Mug', price: 299, quantity: 2 },
    { id: 2, name: 'T-Shirt', price: 599, quantity: 1 },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('upi');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponCode === 'VJ50' ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount > 499 ? 0 : 100;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Secure Checkout</h1>
          <p className="text-lg text-gray-600">Review your order and complete your purchase</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Section - Order Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                🛒 Order Summary
              </h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      <p className="text-gray-500 text-sm">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <button className="w-full text-blue-600 hover:text-blue-800 font-semibold text-center transition">
                  ✏️ Edit Cart
                </button>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                🎟️ Promo Code
              </h2>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code (Try: VJ50)" 
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                />
                <button className="bg-[#FF6B35] hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition">
                  Apply
                </button>
              </div>

              {couponCode === 'VJ50' && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-semibold">
                  ✅ Coupon applied! Get 10% discount on this order
                </div>
              )}
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                📍 Delivery Address
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Full Name" className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none" />
                <input type="tel" placeholder="Phone Number" className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none" />
              </div>
              
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none mb-4" />
              
              <textarea placeholder="Street Address" rows="3" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none mb-4"></textarea>
              
              <div className="grid md:grid-cols-3 gap-4">
                <input type="text" placeholder="City" className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none" />
                <input type="text" placeholder="State" className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none" />
                <input type="text" placeholder="PIN Code" className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                💳 Payment Method
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition"
                       style={{borderColor: selectedPayment === 'upi' ? '#FF6B35' : '#d1d5db'}}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="upi"
                    checked={selectedPayment === 'upi'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold flex items-center gap-2">📱 UPI (Recommended)</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition"
                       style={{borderColor: selectedPayment === 'card' ? '#FF6B35' : '#d1d5db'}}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card"
                    checked={selectedPayment === 'card'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold flex items-center gap-2">💳 Credit/Debit Card</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition"
                       style={{borderColor: selectedPayment === 'wallet' ? '#FF6B35' : '#d1d5db'}}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="wallet"
                    checked={selectedPayment === 'wallet'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold flex items-center gap-2">💰 Digital Wallet</span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition"
                       style={{borderColor: selectedPayment === 'cod' ? '#FF6B35' : '#d1d5db'}}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod"
                    checked={selectedPayment === 'cod'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold flex items-center gap-2">📦 Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Section - Price Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Price Details</h2>
              
              <div className="space-y-3 pb-4 border-b-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-[#FF6B35]">₹{total}</span>
              </div>

              {shipping === 0 && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-semibold text-center">
                  ✅ Free Shipping Applied!
                </div>
              )}

              <button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7B801] hover:from-orange-600 hover:to-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 text-lg shadow-lg">
                🛡️ Complete Payment
              </button>

              <div className="text-center text-sm text-gray-500">
                <p>✅ 100% Secure Payment</p>
                <p>🔒 SSL Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
