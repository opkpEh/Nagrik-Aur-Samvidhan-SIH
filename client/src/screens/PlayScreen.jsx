import React from 'react';
import { useNavigate } from 'react-router-dom';



const Button = ({ className, onClick, children }) => (
  <button
    className={`px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Card = ({ className, children }) => (
  <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 bg-gradient-to-r from-blue-100 to-purple-100">
    {children}
  </div>
);

const CardTitle = ({ className, children }) => (
  <h2 className={`text-2xl font-bold text-gray-800 ${className}`}>{children}</h2>
);

const CardContent = ({ children }) => (
  <div className="px-6 py-4">
    {children}
  </div>
);

const BookOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const FlashCard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
  </svg>
);

const Brain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const PlayScreen = () => {
  const navigate = useNavigate();



  return (
    <div className="min-h-screen bg-gradient-to-b  from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-3xl mb-12 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          onClick={() => navigate('/stories')}
        >
          <h1 className="text-4xl font-extrabold mb-4">Embark on a Learning Adventure!</h1>
          <p className="text-xl">Explore fascinating stories and expand your knowledge horizons</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-700">
                <FlashCard />
                <span className="ml-3">Flashcards</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600 text-lg">Boost your memory and reinforce key concepts with interactive flashcards</p>
              <Button 
                className="w-full text-lg"
                onClick={() => navigate('/flashcards')}
              >
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Brain />
                <span className="ml-3">Quizzes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600 text-lg">Challenge your understanding and track your progress with engaging quizzes</p>
              <Button 
                className="w-full text-lg"
                onClick={() => navigate('/quiz')}
              >
                Test Your Knowledge
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Learning Journey Starts Here</h2>
          <p className="text-xl text-gray-600">Explore, learn, and grow with our interactive educational tools</p>
        </div>
      </div>
    </div>
  );
};

export default PlayScreen;