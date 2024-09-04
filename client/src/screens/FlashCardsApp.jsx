import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Check } from 'lucide-react';

const topics = ['All', 'Preamble', 'Fundamental Rights', 'Directive Principles', 'Fundamental Duties'];

const flashcardsData = {
  'Preamble': [
    { question: "What are the key elements mentioned in the Preamble of the Indian Constitution?", answer: "The Preamble declares India as a Sovereign, Socialist, Secular, Democratic Republic and aims to secure Justice, Liberty, Equality, and Fraternity for its citizens." },
    { question: "When was the word 'Secular' added to the Preamble?", answer: "The word 'Secular' was added to the Preamble by the 42nd Constitutional Amendment in 1976." },
    { question: "What does 'Sovereign' mean in the context of the Preamble?", answer: "Sovereign means that India is internally supreme and externally free. It is not under the control of any foreign power." },
  ],
  'Fundamental Rights': [
    { question: "How many Fundamental Rights are guaranteed by the Indian Constitution?", answer: "The Indian Constitution originally provided seven fundamental rights. Currently, there are six fundamental rights after the Right to Property was removed from the list." },
    { question: "What is the significance of Article 21?", answer: "Article 21 guarantees the Right to Life and Personal Liberty. It is considered the heart and soul of the Fundamental Rights." },
    { question: "Can Fundamental Rights be suspended?", answer: "Yes, Fundamental Rights can be suspended during a national emergency, except for the rights guaranteed by Articles 20 and 21." },
  ],
  'Directive Principles': [
    { question: "What is the nature of Directive Principles of State Policy?", answer: "Directive Principles are non-justiciable guidelines for the government to create a social and economic democracy." },
    { question: "Which article of the Constitution deals with equal justice and free legal aid?", answer: "Article 39A deals with equal justice and free legal aid." },
    { question: "What does Article 48 of the Directive Principles state?", answer: "Article 48 directs the State to take steps to prohibit the slaughter of cows, calves and other milch and draught cattle." },
  ],
  'Fundamental Duties': [
    { question: "When were the Fundamental Duties added to the Constitution?", answer: "Fundamental Duties were added to the Constitution by the 42nd Amendment in 1976." },
    { question: "How many Fundamental Duties are there in the Indian Constitution?", answer: "Initially, there were 10 Fundamental Duties. In 2002, the 86th Amendment Act added the 11th Duty." },
    { question: "What is one of the Fundamental Duties related to the environment?", answer: "To protect and improve the natural environment including forests, lakes, rivers and wildlife, and to have compassion for living creatures." },
  ],
};

const Flashcard = ({ card, isFlipped, onFlip }) => {
  if (!card) return null;

  return (
    <div className="w-full max-w-md h-96 cursor-pointer" onClick={onFlip}>
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of the card (Question) */}
        <div className="absolute w-full h-full bg-blue-100 border-2 border-purple-600 rounded-lg p-6 flex flex-col justify-center items-center text-center"
             style={{ backfaceVisibility: "hidden" }}>
          <p className="text-indigo-600 text-lg font-semibold">{card.question}</p>
          <p className="text-purple-600 text-sm mt-4">Click to see answer</p>
        </div>

        {/* Back of the card (Answer) */}
        <div className="absolute w-full h-full bg-purple-100 border-2 border-purple-600 rounded-lg p-6 flex flex-col justify-center items-center text-center"
             style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <p className="text-indigo-600 text-lg font-semibold">{card.answer}</p>
          <p className="text-purple-600 text-sm mt-4">Click to see question</p>
        </div>
      </motion.div>
    </div>
  );
};

const FlashCardApp = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    if (selectedTopic === 'All') {
      const allTopicCards = Object.values(flashcardsData).flat();
      setAllCards(allTopicCards);
    } else if (selectedTopic && flashcardsData[selectedTopic]) {
      setAllCards(flashcardsData[selectedTopic]);
    } else {
      setAllCards([]);
    }
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  }, [selectedTopic]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleNextCard = () => {
    if (currentCardIndex < allCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    setSelectedTopic(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-pink-100 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-purple-600 mt-8 mb-16 px-8 py-2">Flashcards</h1>
        <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-6xl mt-20">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicSelect(topic)}
              className="bg-purple-600 text-white px-8 py-6 rounded-lg text-xl font-semibold hover:bg-indigo-600 transition duration-300"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-pink-100 p-8 flex flex-col items-center justify-center"
      >
        <h2 className="text-3xl font-bold text-purple-600 mb-8">Topic Completed!</h2>
        <Check size={64} color="#7C3AED" />
        <button
          onClick={handleReset}
          className="mt-12 bg-indigo-600 px-6 py-3 rounded-full shadow-md hover:bg-purple-600 transition duration-300 text-white flex items-center text-lg"
        >
          <RotateCcw size={24} className="mr-2" />
          Back to Topics
        </button>
      </motion.div>
    );
  }

  const currentCard = allCards[currentCardIndex];

  return (
    <div className="min-h-screen bg-pink-100 p-8 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-purple-600 mb-8">{selectedTopic}</h2>
      <Flashcard card={currentCard} isFlipped={isFlipped} onFlip={handleFlip} />
      <div className="mt-8 flex justify-between items-center w-full max-w-md">
        <button
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          className="bg-purple-600 p-3 rounded-full shadow-md hover:bg-indigo-600 transition duration-300 disabled:opacity-50"
        >
          <ChevronLeft size={24} color="#EDE9FE" />
        </button>
        <span className="text-indigo-600 text-lg font-semibold">
          {currentCardIndex + 1} / {allCards.length}
        </span>
        {currentCardIndex === allCards.length - 1 ? (
          <button
            onClick={handleComplete}
            className="bg-purple-600 px-6 py-2 rounded-full shadow-md hover:bg-indigo-600 transition duration-300 text-white font-semibold"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === allCards.length - 1}
            className="bg-purple-600 p-3 rounded-full shadow-md hover:bg-indigo-600 transition duration-300 disabled:opacity-50"
          >
            <ChevronRight size={24} color="#EDE9FE" />
          </button>
        )}
      </div>
      <button
        onClick={handleReset}
        className="mt-12 bg-indigo-600 px-6 py-3 rounded-full shadow-md hover:bg-purple-600 transition duration-300 text-white flex items-center text-lg"
      >
        <RotateCcw size={24} className="mr-2" />
        Back to Topics
      </button>
    </div>
  );
};

export default FlashCardApp;