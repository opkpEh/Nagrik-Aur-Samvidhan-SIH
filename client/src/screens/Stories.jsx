import React from 'react';

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
const Card = ({ title, description, imageUrl }) => (
  <div className="relative rounded-2xl h-32 sm:h-40 w-full overflow-hidden group mb-4">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
    <div className="absolute inset-0 flex items-center p-4 sm:p-6">
      <div className="w-full max-w-5xl mx-auto flex justify-between items-center text-white">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 transform transition-transform duration-300 group-hover:translate-x-2">{title}</h3>
          <p className="text-sm sm:text-base max-w-md opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">{description}</p>
        </div>
        <Button className="opacity-0 transform transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[-8px]">
          Start
        </Button>
      </div>
    </div>
  </div>
);

// PlayScreen component
const Stories = () => {
  const storyCards = [
    {
      id: 1,
      title: "The Enchanted Forest",
      description: "Embark on a magical journey through the winding trails of the Enchanted Forest.",
      imageUrl: "/api/placeholder/1920/400"
    },
    {
      id: 2, 
      title: "Pirate's Cove",
      description: "Set sail on the high seas and uncover the hidden treasures of Pirate's Cove.",
      imageUrl: "/api/placeholder/1920/400"
    },
    {
      id: 3,
      title: "Astral Odyssey",
      description: "Explore the mysteries of the cosmos and navigate the Astral Odyssey.",
      imageUrl: "/api/placeholder/1920/400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8">Choose Your Adventure</h1>
      <div className="w-full p-4">
        {storyCards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            imageUrl={'https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg'}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;