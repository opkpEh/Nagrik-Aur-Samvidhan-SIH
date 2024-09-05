import React, { useState, useEffect } from 'react';
import { BookOpen, GamepadIcon, User, Search, Bell,Star, Menu, X, ChevronRight, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState(null);

  const handleRecommendChange = (value) => {
    setRecommend(recommend === value ? null : value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#BFDBFE] p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#4F46E5] hover:text-[#6D28D9]"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#4F46E5] mb-3">Product Customer Feedback</h2>
          <p className="text-[#4F46E5] text-base mb-5">Thank you for taking time to provide feedback. We appreciate hearing from you and will review your comments carefully.</p>
        </div>
        
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-[#4F46E5] text-lg font-semibold mb-2">Would you recommend it to your friends and colleagues?</p>
            <div className="flex justify-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={recommend === true}
                  onChange={() => handleRecommendChange(true)}
                  className="mr-2 w-4 h-4 text-[#6D28D9] border-[#6D28D9] rounded focus:ring-[#6D28D9]"
                />
                <span className="text-[#4F46E5] text-base">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={recommend === false}
                  onChange={() => handleRecommendChange(false)}
                  className="mr-2 w-4 h-4 text-[#6D28D9] border-[#6D28D9] rounded focus:ring-[#6D28D9]"
                />
                <span className="text-[#4F46E5] text-base">No</span>
              </label>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-[#4F46E5] text-lg font-semibold mb-2">Overall satisfaction:</p>
            <div className="flex justify-center items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  fill={star <= rating ? "#6D28D9" : "none"}
                  color={star <= rating ? "#6D28D9" : "#4F46E5"}
                  onClick={() => setRating(star)}
                  className="cursor-pointer mr-1"
                />
              ))}
              <span className="text-[#4F46E5] text-base ml-2">
                {rating === 0 ? "Select" : `${rating} star${rating !== 1 ? 's' : ''}`}
              </span>
            </div>
          </div>
          
          <div>
            <p className="text-[#4F46E5] text-lg font-semibold mb-2 text-center">Your review:</p>
            <textarea
              className="w-full p-2 border border-[#D8B4FE] rounded text-base focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent"
              rows="4"
              placeholder="Share your experience..."
            ></textarea>
          </div>
          
          <div>
            <p className="text-[#4F46E5] text-lg font-semibold mb-2 text-center">Suggestions for improvement:</p>
            <textarea 
              className="w-full p-2 border border-[#D8B4FE] rounded text-base focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent" 
              rows="3"
            ></textarea>
          </div>
          
          <div className="text-center">
            <p className="text-[#4F46E5] text-lg font-semibold mb-2">Is this feedback shared by others?</p>
            <div className="flex justify-center space-x-6">
              <label className="flex items-center">
                <input type="radio" name="share" className="mr-2 w-4 h-4 text-[#6D28D9] border-[#6D28D9] focus:ring-[#6D28D9]" />
                <span className="text-[#4F46E5] text-base">Yes</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="share" className="mr-2 w-4 h-4 text-[#6D28D9] border-[#6D28D9] focus:ring-[#6D28D9]" />
                <span className="text-[#4F46E5] text-base">No</span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First Name" className="p-2 border border-[#D8B4FE] rounded text-base focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent" />
            <input placeholder="Last Name" className="p-2 border border-[#D8B4FE] rounded text-base focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent" />
          </div>
          
          <input placeholder="Email: myname@example.com" className="w-full p-2 border border-[#D8B4FE] rounded text-base focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent" />
        </div>
        
        <button className="w-full bg-[#6D28D9] text-white py-2 rounded hover:bg-[#4F46E5] transition-colors mt-5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6D28D9]">
          Submit Feedback
        </button>
      </div>
    </div>
  );
};


const quotes = [
  "Justice is the constant and perpetual will to allot to every man his due. - Justinian I",
  "The law is reason, free from passion. - Aristotle",
  "Equal justice under law is not merely a caption on the facade of the Supreme Court building, it is perhaps the most inspiring ideal of our society. - Lewis Powell Jr.",
  "Justice cannot be for one side alone, but must be for both. - Eleanor Roosevelt"
];

const LandingPage = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Nagrik Aur Samwidhan</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {['Home', 'Learn', 'Play', 'About'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="hover:text-blue-400 transition-colors text-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
            </div>
            <Bell className="h-6 w-6 text-blue-400 cursor-pointer" />
            <User className="h-6 w-6 text-blue-400 cursor-pointer" />
          </nav>
          <motion.button
            className="md:hidden text-blue-400"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black bg-opacity-90 backdrop-filter backdrop-blur-lg py-4 px-6 absolute w-full z-40"
          >
            <nav className="flex flex-col space-y-4">
              {['Home', 'Learn', 'Play', 'About'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-blue-400 transition-colors text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Master the Constitution Through Immersive Learning
          </h2>
          <p className="text-xl mb-8 text-gray-300">Embark on a journey through interactive experiences and cutting-edge technology</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              onClick={()=> navigate('/articles')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center"
            >
              Start Learning <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
            <motion.button
            onClick={()=> navigate('/play')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center"
            >
              Play Now <GamepadIcon className="ml-2 h-5 w-5" />
            </motion.button>
          </div>
        </motion.section>
        <FeedbackForm isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Quote Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6 rounded-lg text-center mb-16"
        >
          <p className="text-lg italic">"{quotes[quoteIndex]}"</p>
        </motion.div>

        {/* Features Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Experience the Future of Constitutional Education
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GamepadIcon, title: "Gamified Learning", description: "Engage with immersive games that make understanding the Constitution an adventure." },
              { icon: BookOpen, title: "AI-Powered Insights", description: "Gain deep understanding with our advanced AI-driven analysis and explanations." },
              { icon: User, title: "Personalized Journey", description: "Embark on a tailored learning path that adapts to your progress and interests." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-400 border-opacity-30"
              >
                <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2 text-blue-300">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-6 rounded-lg shadow-2xl mb-16"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Revolutionize Your Constitutional Knowledge?</h3>
          <p className="text-xl mb-8">Join the ranks of informed citizens shaping the future of democracy</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold transition-colors text-lg shadow-md hover:shadow-lg"
          >
            Begin Your Journey
          </motion.button>
        </motion.section>

        {/* Constitution Modules */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Explore Our Futuristic Learning Modules
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Fundamental Rights",
              "Directive Principles",
              "Union Government",
              "State Government",
              "Judiciary System",
              "Constitutional Amendments"
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-400 border-opacity-30"
              >
                <h4 className="text-xl font-semibold mb-2 text-purple-300">{module}</h4>
                <p className="text-gray-300 mb-4">Dive deep into {module.toLowerCase()} with cutting-edge interactive lessons.</p>
                <motion.a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                  whileHover={{ x: 5 }}
                >
                  Explore Module <ChevronRight className="ml-1 h-4 w-4" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg py-12 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-lg font-bold mb-4 text-blue-400">About Us</h5>
            <p className="text-sm text-gray-300">Nagrik Aur Samwidhan is at the forefront of constitutional education, leveraging cutting-edge technology to empower citizens.</p>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              {['Home', 'Learn', 'Play', 'About', 'Contact'].map((item) => (
                <li key={item}><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4 text-blue-400">Resources</h5>
            <ul className="space-y-2 text-sm">
              {['Blog', 'FAQ', 'Support', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4 text-blue-400">Connect With Us</h5>
            <p className="text-sm text-gray-300 mb-2">Email: info@nagrikaursamwidhan.com</p>
            <p className="text-sm text-gray-300 mb-4">Phone: +91-1234567890</p>
            {/* <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                <a key={platform} href="#" className="text-blue-400 hover:text-purple-400 transition-colors">
                  {platform}
                </a>
              ))}
            </div> */}
            <div>
              <button onClick={() => setIsOpen(true)} className='w-32 rounded-xl h-10 text-lg bg-gradient-to-r from-blue-600 to-purple-600 font-bold'>Feedback</button>
              

            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; 2024 Nagrik Aur Samwidhan. Empowering the future of constitutional knowledge.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-[#800020] text-[#F5F5DC] p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        >
          <ArrowUpCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default LandingPage;