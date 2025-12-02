"# 🎁 VJ Printers - Personalized Gift Shop E-Commerce Platform

A modern, Amazon-like e-commerce platform for personalized gifts built with **React**, **Tailwind CSS**, and **Vite**.

## ✨ Features

- **Modern UI/UX** - Beautiful, responsive design inspired by Amazon
- **Product Customization** - Full design studio for personalizing products
- **Multiple Product Categories** - Mugs, T-shirts, phone cases, frames, pillows, hoodies, and more
- **Membership System** - Silver, Gold, and Platinum tiers with exclusive benefits
- **Smart Checkout** - Coupon support, multiple payment methods, address management
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Tailwind CSS** - Modern utility-first CSS framework
- **Fast Performance** - Optimized with Vite

## 📦 Product Categories

- ☕ Photo Mugs
- 👕 T-Shirts & Apparel
- 📱 Phone Cases
- 🖼️ Photo Frames
- 🛏️ Pillows & Home Decor
- 🧥 Hoodies
- 🎁 Gift Sets
- ⌨️ Tech Accessories

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser and visit:**
```
http://localhost:5173
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CategoryGrid.jsx      # Product categories showcase
│   │   ├── ProductCustomizer.jsx # Customization tools
│   │   ├── ColorPicker.jsx       # Color selection
│   │   ├── TextCustomizer.jsx    # Text input & styling
│   │   ├── MugViewer.jsx         # 3D preview
│   │   └── ProductPreview.jsx    # Product display
│   ├── pages/
│   │   ├── HomePage.jsx          # Landing page with hero section
│   │   ├── DesignerPage.jsx      # Product customization page
│   │   ├── CheckoutPage.jsx      # Cart & checkout
│   │   └── MembershipPage.jsx    # Membership plans
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # Entry point
│   └── styles.css                # Global styles + Tailwind
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── vite.config.js                # Vite configuration
└── package.json                  # Dependencies
```

## 🎨 Color Scheme (VJ Printers Brand)

- **Primary Orange**: `#FF6B35`
- **Secondary Blue**: `#004E89`
- **Accent Yellow**: `#F7B801`

## 📄 Key Pages

### 🏠 Home Page
- Hero section with call-to-action
- Product categories grid
- Best sellers showcase
- Trust badges with statistics
- Feature highlights
- Membership promotions

### 🎨 Designer Page
- Product selection sidebar
- Customization tools (text, colors, fonts)
- Live preview area
- Quantity selector with pricing
- Add to cart functionality

### 💳 Checkout Page
- Order summary
- Promo code support (Try: `VJ50` for 10% discount)
- Delivery address form
- Multiple payment methods (UPI, Card, Wallet, COD)
- Price breakdown with automatic free shipping

### 👑 Membership Page
- Three membership tiers (Silver, Gold, Platinum)
- Birthday gift benefits
- Discount tiers (10%, 20%, 30%)
- Comparison table
- FAQ section

## 🌐 Technologies Used

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **PostCSS & Autoprefixer** - CSS processing

## 🔧 Customization

### Adding New Products
Edit the `CATEGORIES` array in `src/components/CategoryGrid.jsx` or products array in `src/pages/DesignerPage.jsx`

### Changing Colors
Update the color variables in:
- `tailwind.config.js` - Theme colors
- `src/styles.css` - CSS variables
- Component inline styles

### Modifying Tailwind Config
Edit `tailwind.config.js` to customize:
- Color scheme
- Typography
- Spacing
- Responsive breakpoints

## 💡 Features to Implement

- [ ] Backend integration (API endpoints)
- [ ] User authentication
- [ ] Shopping cart persistence
- [ ] Payment gateway integration
- [ ] 3D product preview
- [ ] Image editor integration
- [ ] Order history
- [ ] Real-time notifications

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is part of the VJ Printers e-commerce platform.

## 👥 Support

For issues or questions, please reach out to the development team.

---

**Built with ❤️ for personalized gifts**" 
