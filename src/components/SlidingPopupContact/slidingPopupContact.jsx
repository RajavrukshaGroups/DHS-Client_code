import React, { useState, useEffect, useRef } from 'react';
import { FiUser, FiMail, FiMessageSquare, FiX } from 'react-icons/fi';
import { CiPhone } from "react-icons/ci";
import toast from 'react-hot-toast';
import { FaPaperPlane } from 'react-icons/fa';

const ContactFormPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "Defence Housing Society web"
  });
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);
  const reopenTimerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-show popup on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(reopenTimerRef.current);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
      setShowButton(true); // Show button after closing
      
      // Set timer to reopen after 10 seconds
      reopenTimerRef.current = setTimeout(() => {
        setShowPopup(true);
        setShowButton(false);
      }, 10000);
    }, 500)6;
  };

  const handleButtonClick = () => {
    // Clear any pending reopen timer when manually opening
    clearTimeout(reopenTimerRef.current);
    setShowPopup(true);
    setShowButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await fetch("https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ 
          name: "", 
          email: "", 
          phone: "", 
          message: "",
          subject: "Thapasihalli"
        });
        handleClose(); // Close the popup after successful submission
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    // <div className="fixed bottom-4 right-4 z-50">
    <div className="fixed bottom-4 short:top-[70px] right-4 z-[9999]"> 
      {/* Contact Button - Only shows after popup is closed */}
      {showButton && !showPopup && !isClosing && (
        <button
          onClick={handleButtonClick}
          className="bg-[#24447c] text-white px-6 py-3 rounded-full shadow-lg hover:bg-sky-700 transition-all duration-300 flex items-center justify-center"
          style={{
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.5)'
          }}
        >
          <FaPaperPlane className="mr-2" />
          Contact Us
        </button>
      )}

      {/* Contact Form Popup */}
      {showPopup && (
        <div 
          ref={popupRef}
          className={`bg-white rounded-xl shadow-xl w-80 overflow-hidden transition-all duration-500 transform ${
            isClosing ? 'animate-slideOut' : 'animate-slideIn'
          }`}
          style={{
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#24447c] to-blue-600">
            <h2 className="text-lg font-semibold text-white">Contact Us</h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="p-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Mobile No</label>
                <div className="relative">
                  <CiPhone className="text-1xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Mobile No"
                    required
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    rows="2"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
              </div>
              
              {/* <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#24447c] text-white py-2 rounded-md hover:bg-sky-700 transition-colors duration-200 flex items-center justify-center ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending....
                  </>
                ) : (
                  <>
                    Submit <FaPaperPlane className="ml-2 " />
                  </>
                )}
              </button> */}
              <button
  type="submit"
  disabled={loading}
  className={`w-full bg-[#24447c] text-white py-2 rounded-md hover:bg-sky-700 transition-colors duration-200 flex items-center justify-center ${
    loading ? 'opacity-75 cursor-not-allowed' : ''
  }`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Sending...
    </>
  ) : (
    <span className="inline-flex items-center gap-2">
      Submit <FaPaperPlane />
    </span>
  )}
</button>

            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .animate-slideOut {
          animation: slideOut 0.5s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactFormPopup;