import { MdFacebook } from "react-icons/md";

import {
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandYoutube,
} from "react-icons/tb";
import QuickLinks from "./QuickLinks";

const FooterComponent = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 poppins-extralight">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
          {/* Logo Section */}
          <div className="lg:w-1/5">
            <div className="text-2xl font-tavirs mb-4">ELASTICO.</div>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col gap-y-3">
              <span>Quick Links</span>

              <QuickLinks label={"Shop now"} url={"#"} />
              <QuickLinks label={"About us"} url={"#"} />
              <QuickLinks label={"Contact us"} url={"#"} />
              <QuickLinks label={"FAQ"} url={"#"} />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col gap-y-3">
              <span>Customer care</span>

              <QuickLinks label={"Order status"} url={"#"} />
              <QuickLinks label={"Shipping Info"} url={"#"} />
              <QuickLinks label={"Size Guides"} url={"#"} />
              <QuickLinks label={"Track order"} url={"#"} />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col gap-y-3">
              <span>Stay connected</span>

              <QuickLinks label={"Follow Us"} url={"#"} />
              <QuickLinks label={"Join Community"} url={"#"} />
              <QuickLinks label={"Social Media"} url={"#"} />
              <QuickLinks label={"Newsletter"} url={"#"} />
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="lg:w-1/5 min-w-[280px]">
            <h3 className="text-orange-400  mb-4">Subscribe</h3>
            <p className="text-gray-300 text-sm mb-4">
              Join our newsletter for the latest news and exclusive offers.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
              />
              <button className="w-full bg-orange-400 hover:bg-orange-500 text-black  py-2 px-4 rounded transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright and Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 mb-4 md:mb-0">
              <span className="text-gray-400 text-sm">
                © 2024 ELASTICO. All rights reserved.
              </span>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Settings
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MdFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TbBrandInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TbBrandTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TbBrandLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TbBrandYoutube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
