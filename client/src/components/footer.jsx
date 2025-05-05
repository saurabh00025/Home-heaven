import { Link } from 'react-router-dom';
import images from '../images';

const Footer = () => {
  return (
    <div className=" py-8" style = {{background: '#f2e9e9'}}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Footer Column 1 */}
        <div className="footer-col-1">
          <h3 className="text-lg font-semibold mb-4">Download Our App</h3>
          <p className="mb-4">Download our app for Android and iOS mobile phones</p>
          <div className="app-logo flex space-x-4">
            <Link>
              <img src={images.playStore} alt="Play Store" className="w-36 h-12" />
            </Link>
            <Link to="#">
              <img src={images.youtube} alt="YouTube" className="w-36 h-12" />
            </Link>
            <Link to="#">
              <img src={images.playStore} alt="App Store" className="w-36 h-12" />
            </Link>
          </div>
        </div>

        {/* Footer Column 2 */}
        <div className="footer-col-2 flex items-center justify-center">
          <Link to = "/">
          <img src={images.logo} alt="Logo" className="rounded-full" style={{ height: 100 }} />
          </Link>
        </div>

        {/* Footer Column 3 */}
        <div className="footer-col-3">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul>
            <li className="mb-2"><Link to="#" className="text-black hover:text-white transition">Coupons</Link></li>
            <li className="mb-2"><Link to="#" className="text-black hover:text-white transition">Blog Post</Link></li>
            <li className="mb-2"><Link to="#" className="text-black hover:text-white transition">Return Policy</Link></li>
            <li><Link to="#" className="text-black hover:text-white transition">Join Affiliate</Link></li>
          </ul>
        </div>

        {/* Footer Column 4 */}
        <div className="footer-col-4">
          <h3 className="text-lg font-semibold mb-4">Follow us</h3>
          <ul className="flex space-x-4">
          <li><Link to="#" className="text-4xl text-gray-500 hover:text-white transition"><i className="fab fa-facebook-f"></i></Link></li>
          <li><Link to="#" className="text-4xl text-gray-500 hover:text-white transition"><i className="fab fa-twitter"></i></Link></li>
          <li><Link to="https://www.instagram.com/saurabh_maurya10/" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-500 hover:text-white transition"><i className="fab fa-instagram"></i></Link></li>
          <li><Link to="#" className="text-4xl text-gray-500 hover:text-white transition"><i className="fab fa-youtube"></i></Link></li>
        </ul>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="my-8 border-gray-700" />

      {/* Copyright */}
      <p className="copyright text-sm text-center">Copyright 2020 All rights reserved.</p>
    </div>
  );
};

export default Footer;
