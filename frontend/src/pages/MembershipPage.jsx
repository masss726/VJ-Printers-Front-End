import React, { useState } from 'react';

function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'silver',
      name: 'Silver Member',
      price: '₹99/year',
      color: 'from-gray-400 to-gray-600',
      icon: '⭐',
      benefits: [
        '🎁 Birthday Gift - Free Keychain',
        '10% Discount on all orders',
        'Free shipping on orders above ₹299',
        'Priority customer support',
        'Exclusive access to new products',
        'Birthday month special offers'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Member',
      price: '₹299/year',
      color: 'from-yellow-400 to-yellow-600',
      icon: '✨',
      benefits: [
        '🎁 Birthday Gift - Free T-Shirt',
        '20% Discount on all orders',
        'Free shipping on all orders',
        '24/7 priority customer support',
        'Early access to sales & launches',
        'Monthly surprise rewards',
        'Free personalization on 2 items/month'
      ],
      popular: true
    },
    {
      id: 'platinum',
      name: 'Platinum Member',
      price: '₹499/year',
      color: 'from-purple-400 to-pink-600',
      icon: '💎',
      benefits: [
        '🎁 Birthday Gift - Free Mug Set',
        '30% Discount on all orders',
        'Free Express shipping everywhere',
        'Dedicated account manager',
        'Exclusive VIP events & previews',
        'Weekly special offers',
        'Unlimited free personalization',
        'Complimentary product replacement guarantee'
      ]
    }
  ];

  const currentPlan = 'Silver Member';
  const renewalDate = 'March 15, 2025';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Membership Plans</h1>
          <p className="text-lg text-gray-600">Choose the perfect plan and enjoy exclusive benefits</p>
        </div>

        {/* Current Membership Status */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#004E89] text-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-100 mb-2">Current Plan</p>
              <h2 className="text-3xl font-bold mb-4">{currentPlan}</h2>
              <p className="text-yellow-300 font-semibold">Renews on {renewalDate}</p>
            </div>
            <div className="text-right flex flex-col justify-center">
              <p className="text-6xl font-bold mb-2">⭐</p>
              <p className="text-gray-100">You have saved ₹1,250 this year!</p>
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 cursor-pointer ${plan.popular ? 'md:scale-105' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 text-sm font-bold">
                  Most Popular
                </div>
              )}

              {/* Card Content */}
              <div className={`bg-gradient-to-br ${plan.color} text-white p-8 h-40`}>
                <div className="text-5xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold">{plan.price}</p>
              </div>

              {/* Benefits */}
              <div className="bg-white p-6">
                <ul className="space-y-3 mb-6">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-lg">✅</span>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full font-bold py-3 px-6 rounded-lg transition ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7B801] text-gray-900 hover:shadow-lg'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {selectedPlan === plan.id ? '✅ Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Silver</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Gold</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Platinum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Price</td>
                    <td className="px-6 py-4 text-center">₹99/year</td>
                    <td className="px-6 py-4 text-center">₹299/year</td>
                    <td className="px-6 py-4 text-center">₹499/year</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Discount</td>
                    <td className="px-6 py-4 text-center">10%</td>
                    <td className="px-6 py-4 text-center">20%</td>
                    <td className="px-6 py-4 text-center">30%</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Free Shipping Limit</td>
                    <td className="px-6 py-4 text-center">₹299+</td>
                    <td className="px-6 py-4 text-center">All Orders</td>
                    <td className="px-6 py-4 text-center">Express Free</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Birthday Gift</td>
                    <td className="px-6 py-4 text-center">Keychain</td>
                    <td className="px-6 py-4 text-center">T-Shirt</td>
                    <td className="px-6 py-4 text-center">Mug Set</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Priority Support</td>
                    <td className="px-6 py-4 text-center">✅</td>
                    <td className="px-6 py-4 text-center">✅</td>
                    <td className="px-6 py-4 text-center">✅ 24/7</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Personalization</td>
                    <td className="px-6 py-4 text-center">Standard</td>
                    <td className="px-6 py-4 text-center">2/month Free</td>
                    <td className="px-6 py-4 text-center">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="pb-6 border-b">
              <h3 className="font-bold text-lg text-gray-900 mb-2">❓ Can I upgrade or downgrade anytime?</h3>
              <p className="text-gray-600">Yes! You can upgrade or downgrade your plan anytime. Changes take effect immediately.</p>
            </div>

            <div className="pb-6 border-b">
              <h3 className="font-bold text-lg text-gray-900 mb-2">❓ What happens after my membership expires?</h3>
              <p className="text-gray-600">You'll still be able to shop, but won't get membership discounts. You can renew anytime.</p>
            </div>

            <div className="pb-6 border-b">
              <h3 className="font-bold text-lg text-gray-900 mb-2">❓ Is my birthday gift automatic?</h3>
              <p className="text-gray-600">Yes! During your birthday month, we'll send you a free gift. Just pay shipping.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">❓ Can I gift a membership to someone?</h3>
              <p className="text-gray-600">Yes! You can purchase a membership as a gift and we'll send them the code.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipPage;


