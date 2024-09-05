import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Play, Plus, ThumbsUp, RotateCw } from "lucide-react";

export default function InteractiveArticles() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSpinResult, setShowSpinResult] = useState(false);
  const [isWheelLocked, setIsWheelLocked] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const wheelData = [
    { option: "10% Off" },
    { option: "Free eBook" },
    { option: "5 Extra Lives" },
    { option: "Mystery Box" },
  ];

  const articles = [
    {
      id: 1,
      title: "The Art of Mindfulness",
      description:
        "Discover how mindfulness can transform your daily life and improve your mental well-being.",
      image: "/placeholder.svg?height=200&width=300",
      preview:
        "In today's fast-paced world, the practice of mindfulness has become increasingly important. This ancient technique, rooted in Buddhist meditation, has gained widespread popularity for its ability to reduce stress, improve focus, and enhance overall well-being.",
      year: 2023,
      rating: "PG",
      duration: "45m",
      genres: ["Self-help", "Mental Health", "Wellness"],
    },
    {
      id: 2,
      title: "Exploring Deep Space",
      description:
        "Journey through the cosmos and learn about the latest discoveries in space exploration.",
      image: "/placeholder.svg?height=200&width=300",
      preview:
        "As we peer into the vast expanse of the universe, new technologies are revealing incredible secrets about our cosmic neighborhood and beyond. From the discovery of exoplanets to the ongoing exploration of Mars, space science is more exciting than ever.",
      year: 2023,
      rating: "G",
      duration: "60m",
      genres: ["Science", "Astronomy", "Documentary"],
    },
    {
      id: 3,
      title: "Culinary Adventures",
      description:
        "Embark on a global food journey and discover unique flavors from around the world.",
      image: "/placeholder.svg?height=200&width=300",
      preview:
        "From the spicy streets of Bangkok to the aromatic markets of Marrakech, this culinary tour will tantalize your taste buds and expand your culinary horizons. Discover the secrets of authentic cuisines from every corner of the globe.",
      year: 2023,
      rating: "G",
      duration: "30m",
      genres: ["Food", "Travel", "Culture"],
    },
    {
      id: 4,
      title: "The Future of AI",
      description:
        "Explore the cutting-edge developments in artificial intelligence and their potential impact.",
      image: "/placeholder.svg?height=200&width=300",
      preview:
        "Artificial Intelligence is rapidly evolving, reshaping industries and challenging our understanding of technology. From machine learning to neural networks, dive into the world of AI and discover how it's changing our future.",
      year: 2023,
      rating: "PG",
      duration: "50m",
      genres: ["Technology", "Science", "Future"],
    },
  ];

  useEffect(() => {
    if (wheelRef.current) {
      const wheel = wheelRef.current;
      const ctx = wheel.getContext("2d");
      const radius = wheel.width / 2;
      const angleStep = (Math.PI * 2) / wheelData.length;

      ctx.clearRect(0, 0, wheel.width, wheel.height);

      wheelData.forEach((item, index) => {
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(
          radius,
          radius,
          radius,
          index * angleStep,
          (index + 1) * angleStep
        );
        ctx.fillStyle = ["#D8B4FE", "#BFDBFE", "#F9A8D4", "#6D28D9"][index];
        ctx.fill();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(index * angleStep + angleStep / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#4F46E5";
        ctx.font = "bold 14px Arial";
        ctx.fillText(item.option, radius - 10, 5);
        ctx.restore();
      });
    }
  }, []);

  const handleSpinClick = () => {
    if (!isWheelLocked && !mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setRotation(rotation + 1080 + newPrizeNumber * (360 / wheelData.length));
      
      setTimeout(() => {
        setMustSpin(false);
        setShowSpinResult(true);
        setIsWheelLocked(true);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 text-indigo-600">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Continue Reading Section */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Continue Reading</h2>
            <div className="bg-purple-600 text-purple-100 p-6 rounded-lg transition-transform hover:scale-105 relative overflow-hidden group">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Featured Article"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-3">
                  The Art of Mindfulness
                </h3>
                <p className="mb-4 opacity-90">
                  Discover the transformative power of mindfulness in your daily
                  life...
                </p>
                <button className="bg-purple-100 text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center">
                  <Play className="mr-2" size={20} /> Continue Reading
                </button>
              </div>
            </div>
          </div>

          {/* Spin & Win Section */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Spin & Win</h2>
            <div className="relative w-[300px] h-[300px]">
              <motion.canvas
                ref={wheelRef}
                width={300}
                height={300}
                animate={{ rotate: rotation }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="rounded-full"
              />
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-0 h-0 border-t-[15px] border-t-transparent border-r-[30px] border-r-purple-600 border-b-[15px] border-b-transparent"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.button
                  onClick={handleSpinClick}
                  disabled={isWheelLocked || mustSpin}
                  className={`bg-indigo-600 text-purple-100 w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${
                    isWheelLocked || mustSpin
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-opacity-90"
                  } transition-all`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCw size={36} className={mustSpin ? "animate-spin" : ""} />
                </motion.button>
              </div>
            </div>
            {isWheelLocked && (
              <p className="text-center mt-4 text-purple-600">
                Wheel locked. Please try again later.
              </p>
            )}
          </div>
        </div>

        {/* Featured Articles Section */}
        <div className="mt-12 mb-10">
          <h2 className="text-3xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {articles.map((article) => (
              <motion.div
                key={article.id}
                className="bg-blue-100 rounded-lg overflow-hidden shadow-lg cursor-pointer relative group"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredArticle(article)}
                onHoverEnd={() => setHoveredArticle(null)}
                onClick={() => {
                  setSelectedArticle(article);
                  setShowPreview(true);
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm">{article.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-purple-600 text-purple-100 px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Article Preview Modal */}
        <AnimatePresence>
          {showPreview && selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-indigo-600 bg-opacity-80 flex items-start justify-center overflow-y-auto pt-20 z-50"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-purple-100 text-indigo-600 rounded-lg max-w-4xl w-full relative"
              >
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute top-4 right-4 text-indigo-600 hover:text-purple-600 transition-colors"
                >
                  <X size={24} />
                </button>
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
                <div className="p-8">
                  <h2 className="text-4xl font-bold mb-4">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-green-500 font-semibold">
                      {selectedArticle.rating}
                    </span>
                    <span>{selectedArticle.year}</span>
                    <span>{selectedArticle.duration}</span>
                  </div>
                  <p className="text-lg mb-6">{selectedArticle.preview}</p>
                  <div className="flex items-center space-x-4 mb-6">
                    <button className="bg-purple-600 text-purple-100 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center">
                      <Play className="mr-2" size={20} /> Read Now
                    </button>
                    <button className="bg-pink-100 text-indigo-600 p-3 rounded-full hover:bg-opacity-90 transition-colors">
                      <Plus size={24} />
                    </button>
                    <button className="bg-pink-100 text-indigo-600 p-3 rounded-full hover:bg-opacity-90 transition-colors">
                      <ThumbsUp size={24} />
                    </button>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.genres.map((genre, index) => (
                        <span
                          key={index}
                          className="bg-indigo-600 text-purple-100 px-3 py-1 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spin Result Modal */}
        <AnimatePresence>
        {showSpinResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-purple-100 text-indigo-600 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
              <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
              <p className="text-xl mb-6">
                You won: {wheelData[prizeNumber].option}
              </p>
              <p className="mb-6">Read and learn to maintain your streak!</p>
              <button
                onClick={() => setShowSpinResult(false)}
                className="bg-indigo-600 text-purple-100 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}