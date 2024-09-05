import React from 'react';
import { useNavigate } from 'react-router-dom';

// Button component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out ${className || ''}`}
    {...props}
  >
    {children}
  </button>
);

// Card component
const Card = ({ title, description, imageUrl, storyId }) => {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl h-64 w-full overflow-hidden group mb-4">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-[-8px]">{title}</h3>
          <p className="text-sm max-w-md opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-[-8px]">{description}</p>
        </div>
        <Button 
          onClick={() => navigate('/story', { state: { storyId } })} 
          className="self-start opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-[-8px]"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

// Stories component
const Stories = () => {
  const storyCards = [
    {
      id: 1,
      title: "Right to Equality",
      description: "Everyone deserves equal respect and opportunities, regardless of their background or identity. Embracing diversity fosters unity and empowers all individuals to thrive.",
      imageUrl: "/banner/1.jpeg",
      storyId: 's1'
    },
    {
      id: 2, 
      title: "Right against Exploitation",
      description: "The Right against Exploitation ensures freedom from forced labor and human trafficking. It protects individuals from being exploited in any form, upholding their dignity and rights.",
      imageUrl: "/banner/2.jpeg",
      storyId: 's2'
    },
    {
      id: 3,
      title: "Astral Odyssey",
      description: "The Right against Exploitation ensures freedom from forced labor and human trafficking. It protects individuals from being exploited in any form, upholding their dignity and rights.",
      imageUrl: "/banner/1.jpeg",
      storyId: 's3'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 py-8 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8">Learn with Stories</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {storyCards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            storyId={card.storyId}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;