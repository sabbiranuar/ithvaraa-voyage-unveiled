
import React from 'react';
import logo from '/lovable-uploads/84eed264-6c40-4c6b-8298-4e5a56cfb8bf.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="Ithvaraa Logo" className="h-16 mb-4" />
            <p className="text-gray-300 mb-6">
              Your journey begins here! Explore Northeast India with authentic experiences and responsible tourism.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Meghalaya</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Assam</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Arunachal Pradesh</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Nagaland</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Sikkim</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for travel tips and exclusive offers.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none flex-1" 
              />
              <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Ithvaraa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
