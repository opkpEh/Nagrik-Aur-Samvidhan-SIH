import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomButton = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={`p-2 bg-black/30 hover:bg-black/50 rounded-full transition-all ${className}`}
  >
    {children}
  </button>
);

// Use a static glob import
const videoModules = import.meta.glob('../assets/stories/**/*.mp4');

const StoryboardPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoSrc, setVideoSrc] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { storyId } = location.state || {};

  useEffect(() => {
    if (!storyId) {
      setError("No story ID provided");
      return;
    }

    const loadVideos = async () => {
      try {
        const storyVideos = Object.keys(videoModules)
          .filter(path => path.includes(`/stories/${storyId}/`))
          .map((path, index) => ({
            id: index + 1,
            src: path,
            title: `Story ${index + 1}`,
          }));

        if (storyVideos.length === 0) {
          setError(`No videos found for story ID: ${storyId}`);
          return;
        }

        setVideos(storyVideos);
      } catch (error) {
        console.error('Error loading video list:', error);
        setError("Failed to load video list");
      }
    };

    loadVideos();
  }, [storyId]);

  const loadVideo = useCallback(async () => {
    if (videos.length === 0) return;

    const videoPath = videos[currentIndex].src;
    try {
      const module = await videoModules[videoPath]();
      setVideoSrc(module.default);
    } catch (error) {
      console.error('Error loading video:', error);
      setError("Failed to load video");
    }
  }, [currentIndex, videos]);

  useEffect(() => {
    loadVideo();
  }, [loadVideo]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.error('Play failed:', e));
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsPlaying(true);
        nextSlide();
      };

      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('ended', handleEnded);

      videoElement.play().catch(e => console.error('Autoplay failed:', e));

      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [videoSrc]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="relative" style={{ width: '562px', height: '508px' }}>
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-contain"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Overlay controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top bar */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Interactive Storyboard</h1>
            <CustomButton onClick={toggleInfo}>
              <Info className="h-5 w-5 text-white" />
            </CustomButton>
          </div>

          {/* Center controls */}
          <div className="flex justify-between items-center">
            <CustomButton onClick={prevSlide}>
              <ChevronLeft className="h-6 w-6 text-white" />
            </CustomButton>
            <CustomButton onClick={nextSlide}>
              <ChevronRight className="h-6 w-6 text-white" />
            </CustomButton>
          </div>

          {/* Bottom bar */}
          <div className="flex justify-between items-center">
            <CustomButton onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
            </CustomButton>
            <div className="flex space-x-1">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  className={`w-6 h-6 text-xs rounded-full ${
                    index === currentIndex ? 'bg-white text-black' : 'bg-black/30 text-white'
                  } hover:bg-white/50 transition-colors`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info overlay */}
        {showInfo && videos[currentIndex] && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-xs">
              <h2 className="text-xl font-bold mb-2">{videos[currentIndex].title}</h2>
              <p className="mb-3 text-sm">This is where you can add more information about the current video.</p>
              <button
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition-colors"
                onClick={toggleInfo}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryboardPage;