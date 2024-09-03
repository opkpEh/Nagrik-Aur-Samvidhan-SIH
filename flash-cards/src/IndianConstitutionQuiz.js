import React, { useState, useEffect } from 'react';
import { Dropdown } from './components/dropdown';
import { Card } from './components/card';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const topics = {
  "Preamble": [
    "The Preamble of the Constitution of India is a brief introductory statement that sets out the guiding principles and purposes of the Constitution. It acts as the preface to the Constitution and lays down the philosophy on which the Constitution is based.",
    "It outlines the core values and ideals that the Constitution aims to promote and protect, including justice, liberty, equality, and fraternity. These ideals reflect the fundamental values on which the Indian state is founded.",
    "The Preamble declares India to be a Sovereign, Socialist, Secular, Democratic Republic. This declaration is crucial in defining India's identity and its commitment to democracy and secularism.",
    "It emphasizes the commitment to ensuring justice – social, economic, and political – to all citizens, which is a cornerstone of the Indian Constitution.",
    "The Preamble serves as a guiding light for the interpretation of the Constitution and its provisions, helping to ensure that laws and policies align with the fundamental values expressed in it."
  ],
  "Fundamental Rights (Part III)": [
    "Fundamental Rights are a set of rights guaranteed by the Constitution of India to all its citizens. These rights are designed to ensure the protection of individual freedoms and liberties.",
    "Right to Equality: This includes the right to equality before the law and equal protection of the laws, prohibiting discrimination on grounds of religion, race, caste, sex, or place of birth.",
    "Right to Freedom: This encompasses several freedoms, including freedom of speech and expression, freedom of assembly, freedom to form associations, freedom of movement, and freedom of residence and settlement.",
    "Right against Exploitation: This right prohibits human trafficking, forced labor, and children working under hazardous conditions, ensuring protection against exploitation.",
    "Right to Constitutional Remedies: This allows individuals to approach the courts to enforce their fundamental rights and seek redressal for violations."
  ],
  "Directive Principles of State Policy (Part IV)": [
    "Directive Principles are guidelines for the framing of laws by the government aimed at establishing a just society.",
    "These principles include aspects related to social and economic welfare, such as promoting the welfare of people and ensuring adequate livelihood.",
    "Though not justiciable, they are fundamental in the governance of the country and serve as a guide for state policy-making.",
    "The Directive Principles reflect the aspirations of the Indian people and the vision of the framers of the Constitution.",
    "They help in guiding the government towards creating a just and equitable society by informing policy and legislative measures."
  ],
  "Fundamental Duties (Part IV A)": [
    "Fundamental Duties are moral obligations placed on citizens to promote a sense of patriotism and uphold the Constitution.",
    "These duties include respecting the Constitution, protecting the sovereignty of the country, and upholding national ideals.",
    "While non-justiciable, they are essential for the moral and ethical development of citizens.",
    "Fundamental Duties complement Fundamental Rights and contribute to the overall development of responsible citizenship.",
    "They remind citizens of their role in contributing to the welfare and progress of the nation."
  ]
};

const IndianConstitutionLearning = () => {
  const [selectedTopic, setSelectedTopic] = useState("Preamble");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState('');

  const currentCards = topics[selectedTopic];

  const handleNavigation = (direction) => {
    setAnimationDirection(direction);
    setTimeout(() => {
      setCurrentCardIndex(prevIndex => {
        const newIndex = direction === 'next'
          ? (prevIndex + 1) % currentCards.length
          : (prevIndex - 1 + currentCards.length) % currentCards.length;
        return newIndex;
      });
      setAnimationDirection('');
    }, 300); // Match the animation duration
  };

  useEffect(() => {
    setCurrentCardIndex(0); // Reset card index when the topic changes
  }, [selectedTopic]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <Dropdown
        options={Object.keys(topics)}
        onChange={(e) => setSelectedTopic(e.target.value)}
        value={selectedTopic}
        className="mb-6"
      />
      <div className="relative w-full max-w-md">
        {/* Stacked background cards */}
        <div className="card-stack">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="stacked-card bg-white rounded-xl shadow-md" 
                 style={{
                   transform: `translateY(${index * 10}px) scale(${1 - index * 0.05}) rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                   zIndex: 3 - index
                 }}>
            </div>
          ))}
        </div>
        
        {/* Main card */}
        <Card className={`relative bg-white rounded-xl shadow-2xl overflow-hidden z-10 w-full h-[400px] transition-transform duration-300 ease-in-out
                          ${animationDirection === 'next' ? 'animate-slide-in-left' : 
                            animationDirection === 'prev' ? 'animate-slide-in-right' : ''}`}>
          <div className="p-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedTopic}</h2>
              <p className="text-lg text-gray-600">{currentCards[currentCardIndex]}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleNavigation('prev')}
                disabled={currentCardIndex === 0}
                className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </button>
              <button
                onClick={() => handleNavigation('next')}
                disabled={currentCardIndex === currentCards.length - 1}
                className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .card-stack {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .stacked-card {
          position: absolute;
          width: 100%;
          height: 100%;
          transition: all 0.3s ease-in-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s forwards;
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(-100%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default IndianConstitutionLearning;
