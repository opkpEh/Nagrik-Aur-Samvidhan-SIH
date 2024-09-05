import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const videos = [
  { id: 1, src: '/path/to/video1.mp4', title: 'Story 1' },
  { id: 2, src: '/path/to/video2.mp4', title: 'Story 2' },
  { id: 3, src: '/path/to/video3.mp4', title: 'Story 3' },
  // Add more video objects as needed
];

const Story = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const video = document.getElementById('storyVideo');
    if (video) {
      isPlaying ? video.pause() : video.play();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Storyboard</h1>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="aspect-w-16 aspect-h-9"
              >
                <video
                  id="storyVideo"
                  src={videos[currentIndex].src}
                  className="w-full h-full object-cover rounded-lg"
                  loop
                  playsInline
                />
              </motion.div>
            </AnimatePresence>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>
          <h2 className="text-xl font-semibold mt-4 text-center">{videos[currentIndex].title}</h2>
        </div>
        <div className="bg-gray-50 px-8 py-4">
          <div className="flex justify-center space-x-2">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;