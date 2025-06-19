# 🚀 Crypto Tracker - React Firebase App

A modern, responsive cryptocurrency tracking application built with React, Firebase, and Tailwind CSS. Track real-time crypto prices, manage your portfolio, and stay updated with market trends.

## ✨ Features

### 🔐 Authentication
- **User Registration & Login**: Secure authentication with Firebase Auth
- **Email/Password**: Traditional email and password authentication
- **Protected Routes**: Secure access to user-specific features
- **Session Management**: Persistent login sessions

### 📊 Real-time Data
- **Live Crypto Prices**: Real-time cryptocurrency data from CoinGecko API
- **Market Statistics**: Global market cap, volume, and market dominance
- **Price Charts**: Interactive sparkline charts for price trends
- **24h Changes**: Real-time price change indicators

### 💼 Portfolio Management
- **Watchlist**: Save and track your favorite cryptocurrencies
- **Portfolio Overview**: View your saved coins in one place
- **Firebase Integration**: Secure data storage with Firestore

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Smooth Animations**: Beautiful transitions and hover effects
- **Modern Design**: Clean, professional interface with gradients and cards

### 🔍 Search & Discovery
- **Coin Search**: Find any cryptocurrency quickly
- **Trending Coins**: Discover popular cryptocurrencies
- **Detailed Coin Pages**: Comprehensive information for each coin

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, Custom CSS Variables
- **Backend**: Firebase (Authentication, Firestore)
- **APIs**: CoinGecko API for cryptocurrency data
- **Icons**: React Icons
- **Charts**: React Sparklines

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Crypto-React-Firebase-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase configuration

4. **Configure Firebase**
   - Update the Firebase configuration in `src/firebase.js` with your project details:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Features in Detail

### Home Page
- **Hero Section**: Welcoming interface with app description
- **Market Overview**: Real-time global market statistics
- **Search Functionality**: Find any cryptocurrency
- **Trending Coins**: Popular cryptocurrencies display
- **Feature Highlights**: App benefits and capabilities

### Authentication Pages
- **Modern Design**: Beautiful sign-in and sign-up forms
- **Form Validation**: Client-side validation with helpful error messages
- **Loading States**: Visual feedback during authentication
- **Password Visibility**: Toggle password visibility
- **Responsive Layout**: Works on all device sizes

### Navigation
- **Sticky Header**: Always accessible navigation
- **User Status**: Shows login/logout based on authentication
- **Mobile Menu**: Slide-out menu for mobile devices
- **Theme Toggle**: Easy access to dark/light mode

### Account Page
- **User Dashboard**: Personalized user experience
- **Watchlist Management**: Add/remove coins from watchlist
- **Portfolio Overview**: Track your saved cryptocurrencies

## 🎨 Customization

### Colors & Themes
The app uses CSS custom properties for easy theming. Modify the variables in `src/index.css`:

```css
.dark {
  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #f1f5f9;
  /* ... more variables */
}

.light {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text-primary: #1e293b;
  /* ... more variables */
}
```

### Adding New Features
- **New Components**: Create in `src/components/`
- **New Pages**: Create in `src/pages/`
- **Styling**: Use Tailwind CSS classes and custom CSS

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📊 API Integration

The app uses the CoinGecko API for cryptocurrency data:
- **Base URL**: `https://api.coingecko.com/api/v3/`
- **Endpoints Used**:
  - `/coins/markets` - Market data for cryptocurrencies
  - `/global` - Global market statistics
  - `/coins/{id}` - Detailed coin information

## 🔒 Security Features

- **Firebase Security Rules**: Configure Firestore security rules
- **Input Validation**: Client-side form validation
- **Error Handling**: Graceful error handling throughout the app
- **Protected Routes**: Authentication-required pages

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Other Platforms
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the build folder
- **AWS S3**: Upload build files to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Firebase configuration
3. Ensure all dependencies are installed
4. Check network connectivity for API calls

## 🎯 Future Enhancements

- [ ] Real-time price alerts
- [ ] Portfolio performance charts
- [ ] News integration
- [ ] Social features
- [ ] Advanced filtering
- [ ] Export functionality
- [ ] PWA support

---

**Happy Crypto Tracking! 🚀📈**
