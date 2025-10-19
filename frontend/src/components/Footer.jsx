import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OT</span>
              </div>
              <div>
                <span className="text-xl font-bold">obagaTeam</span>
                <span className="text-xs text-primary-400 font-medium block -mt-1">.com</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              We transform ideas into exceptional digital experiences. From web development to comprehensive 
              ICT solutions, we're your partners in technological innovation and business growth.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'Twitter', icon: '🐦', url: '#' },
                { name: 'LinkedIn', icon: '💼', url: '#' },
                { name: 'GitHub', icon: '🐙', url: '#' },
                { name: 'Instagram', icon: '📷', url: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Get In Touch</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <span>📧</span>
                <span>hello@obagaTeam.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <span>📞</span>
                <span>+254 748 312 468</span>
              </li>
              <li className="flex items-start space-x-3">
                <span>🏢</span>
                <span>Nairobi, Kenya<br />Ngong Road</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {currentYear} obagaTeam.com. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-primary-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;