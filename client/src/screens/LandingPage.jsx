import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typed from 'react-typed'; 
import { BookOpen, GamepadIcon, User, Search, Flame, ChevronRight, ArrowUpCircle, Star, Play, PauseCircle, MessageSquare, X, Target, Lightbulb, Users, Book, Globe, Award } from 'lucide-react';

const quotes = [
  "The Constitution is the foundation of our nation's laws and liberties.",
  "Understanding the Constitution empowers us to be informed and engaged citizens.",
  "Our Constitution provides the framework for a just and democratic society.",
  "The principles of the Constitution guide our nation's progress and protect our rights."
];

export default function App() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

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

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackText, 'Rating:', rating);
    setFeedbackText('');
    setRating(0);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-tan to-caputMortuum text-jet">
      {/* Quote Popup */}
      <div className="bg-burgundy text-beige py-2 px-4 text-center relative z-50">
        <p className="text-sm italic">{quotes[quoteIndex]}</p>
      </div>

      {/* Header */}
      <header className="bg-caputMortuum bg-opacity-90 backdrop-filter backdrop-blur-lg py-4 px-6 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-8 w-8 text-beige" />
            <h1 className="text-2xl font-bold text-beige">Nagrik Aur Samwidhan</h1>
          </div>
          <nav className="flex items-center space-x-6">
            {['Home', 'Learn', 'Play'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-beige hover:text-tan transition-colors text-lg"
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
                className="bg-burgundy text-beige rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-tan"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-beige" />
            </div>
            <div className="flex items-center space-x-2 text-beige">
              <Flame className="h-6 w-6" />
              <span>7</span>
            </div>
            <User className="h-6 w-6 text-beige cursor-pointer" />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
<<<<<<< HEAD
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="md:w-1/2 pr-8">
              <h2 className="text-5xl font-bold mb-6 text-caputMortuum leading-tight">
                Empower Yourself with Constitutional Knowledge
              </h2>
              <p className="text-xl mb-8 text-jet">Discover the essence of our democracy and your role in shaping the nation's future.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-burgundy text-beige px-8 py-4 rounded-full font-semibold transition-colors text-lg shadow-md hover:shadow-lg"
              >
                Begin Your Journey
              </motion.button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg?height=360&width=640"
                  alt="Constitutional learning journey"
                  className="w-full h-full object-cover"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleVideo}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                  {isPlaying ? (
                    <PauseCircle className="w-20 h-20 text-beige" />
                  ) : (
                    <Play className="w-20 h-20 text-beige" />
                  )}
                </motion.button>
              </div>
            </div>
=======
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
>>>>>>> 9801a5a3d144db9dd9d8c88e831f60383c094c9d
          </div>
        </motion.section>

        {/* Learn and Play Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            { title: 'Learn', icon: Book, color: 'burgundy', description: 'Explore interactive lessons on constitutional principles, rights, and governance structures.' },
            { title: 'Play', icon: GamepadIcon, color: 'caputMortuum', description: 'Test your knowledge with engaging quizzes and games on constitutional topics.' }
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: item.title === 'Learn' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: item.title === 'Learn' ? 0.2 : 0.4 }}
              className={`bg-${item.color} text-beige p-8 rounded-lg shadow-xl flex flex-col justify-between h-full`}
            >
              <div>
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="mb-6">{item.description}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`bg-beige text-${item.color} px-6 py-2 rounded-full font-semibold transition-colors flex items-center self-start`}
              >
                {item.title === 'Learn' ? 'Start Learning' : 'Play Now'} <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 bg-beige p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-4xl font-bold mb-8 text-caputMortuum text-center">About Nagrik Aur Samwidhan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Our Mission', icon: Target, description: 'To democratize constitutional literacy by providing accessible, engaging content for all citizens.' },
              { title: 'Our Approach', icon: Lightbulb, description: 'Interactive learning, simplified content, multilingual support, and expert-curated material.' },
              { title: 'Our Vision', icon: Globe, description: 'A society where every citizen is empowered with knowledge of their constitutional rights and responsibilities.' }
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="bg-burgundy rounded-full p-4 mb-4">
                  <item.icon className="h-12 w-12 text-beige" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-burgundy">{item.title}</h3>
                <p className="text-jet">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 text-caputMortuum text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Comprehensive Curriculum', icon: Book, description: 'Explore a wide range of topics covering all aspects of the Indian Constitution.' },
              { title: 'Interactive Forums', icon: Users, description: 'Engage in discussions, ask questions, and share insights with fellow learners and experts.' },
              { title: 'Personalized Learning', icon: Award, description: 'Tailor your learning experience with customized study plans based on your interests and level.' }
            ].map((feature) => (
              <div key={feature.title} className="bg-beige p-6 rounded-lg shadow-xl">
                <feature.icon className="h-12 w-12 text-burgundy mb-4" />
                <h3 className="text-2xl font-semibold mb-4 text-burgundy">{feature.title}</h3>
                <p className="text-jet">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Feedback Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.8 }}
          className="bg-beige p-8 rounded-lg shadow-2xl mb-16"
        >
          <h3 className="text-3xl font-bold mb-4 text-caputMortuum text-center">Your Feedback Matters</h3>
          <p className="text-xl mb-8 text-jet text-center">Help us improve your learning experience</p>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFeedback(true)}
              className="bg-burgundy text-beige px-8 py-3 rounded-full font-semibold transition-colors text-lg shadow-md hover:shadow-lg flex items-center"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Share Your Thoughts
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFeedback(true)}
              className="bg-caputMortuum text-beige px-8 py-3 rounded-full font-semibold transition-colors text-lg shadow-md hover:shadow-lg flex items-center"
            >
              <Star className="mr-2 h-5 w-5" />
              Rate Your Experience
            </motion.button>
          </div>
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-8 bg-white p-6 rounded-lg shadow-lg relative"
              >
                <button
                  onClick={() => setShowFeedback(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
                <h4 className="text-2xl font-semibold mb-4 text-burgundy">Share Your Feedback</h4>
                <form onSubmit={handleFeedbackSubmit}>
                  <textarea
                    className="w-full p-4 rounded-lg border border-tan focus:outline-none focus:ring-2 focus:ring-burgundy mb-4"
                    rows="4"
                    placeholder="Tell us about your experience..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    required
                  ></textarea>
                  <div className="flex items-center mb-4">
                    <p className="mr-4">Rate your experience:</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-burgundy text-beige px-6 py-2 rounded-full font-semibold transition-colors"
                  >
                    Submit Feedback
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-caputMortuum bg-opacity-90 backdrop-filter backdrop-blur-lg py-12 px-6 text-beige">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-lg font-bold mb-4 text-tan">About Us</h5>
            <p className="text-sm">Nagrik Aur Samvidhan is dedicated to promoting constitutional education and empowering citizens with knowledge of their rights and responsibilities.</p>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4 text-tan">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              {['Home', 'Learn', 'Play', 'About', 'Contact'].map((item) => (
                <li key={item}><a href="#" className="hover:text-tan transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4 text-tan">Resources</h5>
            <ul className="space-y-2 text-sm">
              {['Articles', 'FAQ', 'Support', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}><a href="#" className="hover:text-tan transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4 text-tan">Connect With Us</h5>
            <p className="text-sm mb-2">Email: info@nagrikaursamvidhan.com</p>
            <p className="text-sm mb-4">Phone: +91-1234567890</p>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                <a key={platform} href="#" className="text-tan hover:text-beige transition-colors">
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-burgundy text-center text-sm">
          <p>&copy; 2024 Nagrik Aur Samvidhan. Empowering citizens through constitutional knowledge.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 bg-burgundy text-beige p-4 rounded-full shadow-lg hover:bg-caputMortuum transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ArrowUpCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}