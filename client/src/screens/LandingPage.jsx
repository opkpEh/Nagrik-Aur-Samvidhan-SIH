import React, { useState, useEffect } from 'react';
import { BookOpen, GamepadIcon, UserIcon, ChevronRightIcon, MenuIcon, XIcon, ArrowUpCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    window.scrollTo({ top: 10, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-y:auto  bg-[#F5F5DC] flex flex-col"> {/* Ensure the height takes full screen and allow flex layout */}
      {/* Header */}
      <header className="bg-[#4B2E2B] text-[#F5F5DC] py-4 px-6 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Nagrik Aur Samwidhan</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">Home</a></li>
              <li><a onClick={() => navigate('/learning')} className="hover:text-[#D2B48C] transition-colors">Learn</a></li>
              <li><a onClick={() => navigate('/play')} className="hover:text-[#D2B48C] transition-colors">Play</a></li>
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">About</a></li>
            </ul>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#4B2E2B] text-[#F5F5DC] py-4 fixed w-full z-40 top-16">
          <ul className="flex flex-col items-center space-y-4">
            <li><a href="#" className="hover:text-[#D2B48C] transition-colors">Home</a></li>
            <li><a onClick={() => navigate('/learning')} className="hover:text-[#D2B48C] transition-colors">Learn</a></li>
            <li><a onClick={() => navigate('/play')} className="hover:text-[#D2B48C] transition-colors">Play</a></li>
            <li><a href="#" className="hover:text-[#D2B48C] transition-colors">About</a></li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-16 overflow-y-auto"> {/* Flex-grow allows the main content to fill available space */}
        {/* Quote Banner */}
        <div className="bg-[#800020] text-[#F5F5DC] py-3 px-6 text-center">
          <p className="text-lg italic">"{quotes[quoteIndex]}"</p>
        </div>

        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#4B2E2B]">Master the Constitution Through Play</h2>
            <p className="text-xl mb-8 text-[#333333]">Engage with interactive games and quizzes to deepen your understanding of the Indian Constitution</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={() => navigate('/learning')} className="bg-[#800020] text-[#F5F5DC] px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center">
                Start Learning <ChevronRightIcon className="ml-2 h-5 w-5" />
              </button>
              <button onClick={() => navigate('/play')} className="bg-[#4B2E2B] text-[#F5F5DC] px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center">
                Play Now <GamepadIcon className="ml-2 h-5 w-5" />
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-[#4B2E2B]">Why Choose Nagrik Aur Samwidhan?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: GamepadIcon, title: "Interactive Games", description: "Engage with fun, educational games that make learning about the Constitution enjoyable." },
                { icon: BookOpen, title: "Comprehensive Learning", description: "Access in-depth materials covering all aspects of the Indian Constitution." },
                { icon: UserIcon, title: "Progress Tracking", description: "Monitor your learning journey with personalized progress tracking and achievements." }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <feature.icon className="h-12 w-12 text-[#800020] mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-[#4B2E2B]">{feature.title}</h4>
                  <p className="text-[#333333]">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-[#D2B48C] py-12 px-6 rounded-lg shadow-lg mb-16">
            <h3 className="text-3xl font-bold mb-4 text-[#4B2E2B]">Ready to Become a Constitution Expert?</h3>
            <p className="text-xl mb-8 text-[#333333]">Join thousands of learners and start your journey today!</p>
            <button className="bg-[#800020] text-[#F5F5DC] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors text-lg shadow-md hover:shadow-lg">
              Sign Up for Free
            </button>
          </section>

          {/* Additional Content to Ensure Scrolling */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-[#4B2E2B]">Explore Our Constitution Modules</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Fundamental Rights",
                "Directive Principles",
                "Union Government",
                "State Government",
                "Judiciary System",
                "Constitutional Amendments"
              ].map((module, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2 text-[#4B2E2B]">{module}</h4>
                  <p className="text-[#333333]">Learn about {module.toLowerCase()} and their importance in the Indian Constitution.</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#333333] text-[#F5F5DC] py-8 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-lg font-bold mb-4">About Us</h5>
            <p>Nagrik Aur Samwidhan is dedicated to educating citizens about the Indian Constitution through interactive and engaging methods.</p>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Quick Links</h5>
            <ul>
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">Learn</a></li>
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">Play</a></li>
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Resources</h5>
            <ul>
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#D2B48C] transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Contact Us</h5>
            <p>Email: info@nagrikaurconsitution.com</p>
            <p>Phone: +91-1234567890</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-[#800020] text-[#F5F5DC] p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        >
          <ArrowUpCircleIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default LandingPage;
