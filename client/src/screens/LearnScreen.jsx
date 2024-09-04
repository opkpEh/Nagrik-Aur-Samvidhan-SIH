import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Shield, Users, Home, Briefcase, Scale, Feather, ChevronDown, ChevronUp } from 'lucide-react';

const modules = [
  { 
    title: "Right to Equality",
    icon: Users, 
    color: "from-blue-500 to-blue-700",
    description: "Explore the constitutional guarantee of equality before the law and prohibition of discrimination.",
    articles: ["Article 14: Equality before law", "Article 15: Prohibition of discrimination", "Article 16: Equality of opportunity in public employment", "Article 17: Abolition of untouchability", "Article 18: Abolition of titles"],
    keyPoints: ["Ensures equal treatment under the law", "Prohibits discrimination based on religion, race, caste, sex, or place of birth", "Provides for affirmative action for disadvantaged groups", "Abolishes untouchability and forbids its practice", "Prohibits the state from conferring any title except military or academic distinctions"]
  },
  { 
    title: "Right to Freedom", 
    icon: Feather, 
    color: "from-green-500 to-green-700",
    description: "Learn about the six fundamental freedoms guaranteed to all citizens of India.",
    articles: ["Article 19: Freedom of speech and expression, assembly, association, movement, residence, and profession", "Article 20: Protection in respect of conviction for offenses", "Article 21: Protection of life and personal liberty", "Article 21A: Right to education", "Article 22: Protection against arrest and detention"],
    keyPoints: ["Guarantees freedom of speech, assembly, association, movement, residence, and profession", "Protects against ex-post-facto laws and double jeopardy", "Ensures right to life and personal liberty", "Provides for free and compulsory education for children aged 6-14", "Safeguards rights of arrested and detained persons"]
  },
  { 
    title: "Right against Exploitation", 
    icon: Shield, 
    color: "from-red-500 to-red-700",
    description: "Understand the constitutional safeguards against exploitation and forced labor.",
    articles: ["Article 23: Prohibition of traffic in human beings and forced labor", "Article 24: Prohibition of employment of children in factories, etc."],
    keyPoints: ["Prohibits human trafficking and forms of forced labor", "Bans the employment of children below 14 years in hazardous jobs", "Aims to protect vulnerable sections of society from economic and physical exploitation"]
  },
  { 
    title: "Right to Freedom of Religion", 
    icon: Home, 
    color: "from-yellow-500 to-yellow-700",
    description: "Dive into the principles of secularism and religious freedom in India.",
    articles: ["Article 25: Freedom of conscience and free profession, practice and propagation of religion", "Article 26: Freedom to manage religious affairs", "Article 27: Freedom as to payment of taxes for promotion of any particular religion", "Article 28: Freedom as to attendance at religious instruction or religious worship in certain educational institutions"],
    keyPoints: ["Guarantees freedom to profess, practice, and propagate any religion", "Allows religious denominations to manage their own affairs", "Prohibits taxation for religious promotion", "Protects individuals from forced religious instruction in certain institutions"]
  },
  { 
    title: "Cultural and Educational Rights", 
    icon: BookOpen, 
    color: "from-purple-500 to-purple-700",
    description: "Explore the rights of minorities to preserve their culture and establish educational institutions.",
    articles: ["Article 29: Protection of interests of minorities", "Article 30: Right of minorities to establish and administer educational institutions"],
    keyPoints: ["Protects the right of minorities to conserve their language, script, and culture", "Allows minority groups to establish and administer their own educational institutions", "Ensures state aid to minority educational institutions without discrimination"]
  },
  { 
    title: "Right to Constitutional Remedies", 
    icon: Scale, 
    color: "from-indigo-500 to-indigo-700",
    description: "Learn about the right to approach the Supreme Court for the enforcement of Fundamental Rights.",
    articles: ["Article 32: Right to Constitutional Remedies"],
    keyPoints: ["Empowers citizens to approach the Supreme Court directly for enforcement of Fundamental Rights", "Allows the Supreme Court to issue writs for enforcing Fundamental Rights", "Dr. B.R. Ambedkar called this right 'the heart and soul of the Constitution'"]
  },
];

const ModuleCard = ({ module, isOpen, toggleOpen }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${module.color} rounded-lg shadow-lg overflow-hidden mb-8`}
    >
      <div className="p-6 bg-black bg-opacity-30">
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={toggleOpen}>
          <div className="flex items-center">
            <module.icon className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-semibold">{module.title}</h2>
          </div>
          {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
        </div>
        <p className="text-gray-200 mb-4">{module.description}</p>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Key Articles:</h3>
                <ul className="list-disc list-inside mb-4">
                  {module.articles.map((article, index) => (
                    <li key={index} className="mb-1">{article}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-semibold mb-2">Key Points:</h3>
                <ul className="list-disc list-inside">
                  {module.keyPoints.map((point, index) => (
                    <li key={index} className="mb-1">{point}</li>
                  ))}
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transition-colors shadow-md hover:bg-gray-100"
              >
                Start In-Depth Learning
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function LearnScreen() {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Fundamental Rights Modules
        </h1>
        <p className="text-xl text-gray-300">
          Explore the cornerstone of Indian democracy through our interactive learning modules
        </p>
      </header>

      <div className="max-w-3xl mx-auto">
        {modules.map((module, index) => (
          <ModuleCard
            key={module.title}
            module={module}
            isOpen={openModule === index}
            toggleOpen={() => toggleModule(index)}
          />
        ))}
      </div>

      <footer className="mt-16 text-center text-gray-400">
        <p>&copy; 2024 Nagrik Aur Samwidhan. Empower yourself with knowledge of your rights.</p>
      </footer>
    </div>
  );
}