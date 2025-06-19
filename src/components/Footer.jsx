import React, { useState } from 'react';
import { AiOutlineInstagram, AiOutlineMail } from 'react-icons/ai';
import {
  FaFacebookF,
  FaGithub,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: <AiOutlineInstagram size={20} />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaTiktok size={20} />, href: 'https://tiktok.com', label: 'TikTok' },
    { icon: <FaTwitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaFacebookF size={20} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaGithub size={20} />, href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <footer className="bg-primary border-t border-secondary/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <h3 className="text-xl font-bold text-primary">Crypto Tracker</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Stay updated with real-time cryptocurrency prices, market trends, and portfolio tracking. 
              Your trusted source for crypto information.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-lg text-gray-600 dark:text-gray-400 hover:text-accent hover:bg-secondary/80 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-primary mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-left">
                  Help Center
                </button>
              </li>
              <li>
                <button className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-left">
                  API Status
                </button>
              </li>
              <li>
                <button className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-left">
                  Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-primary mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-left">
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-left">
                  Careers
                </button>
              </li>
              <li>
                <button className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-left">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-secondary/20">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-bold text-primary mb-2">Stay Updated</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get the latest crypto news and market updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors duration-200 font-semibold"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-green-500 text-sm mt-2">Successfully subscribed!</p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2024 Crypto Tracker. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Theme:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

