import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, RefreshCw, Eye, EyeOff } from 'lucide-react';
import '../styles/InteractiveRightsQuiz.css';
import { quizQuestions } from '../questions/first';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0 && !showResult && !quizCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive, showResult, quizCompleted]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    setIsTimerActive(false);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setIsTimerActive(true);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="quiz-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="quiz-card"
      >
        {!quizCompleted ? (
          <>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
              <p className="progress-text">Question {currentQuestion + 1} of {quizQuestions.length}</p>
            </div>
            <div className="timer-container">
              <span className={`timer ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
                {timeLeft}
              </span>
              <span className="timer-text">seconds left</span>
            </div>
            <h2 className="question-text">{quizQuestions[currentQuestion].question}</h2>
            <div className="options-container">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`option-button ${
                    selectedAnswer === index
                      ? showResult
                        ? index === quizQuestions[currentQuestion].correct
                          ? 'correct'
                          : 'incorrect'
                        : 'selected'
                      : ''
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                >
                  {option}
                  {showResult && index === quizQuestions[currentQuestion].correct && (
                    <CheckCircle className="icon-correct" />
                  )}
                  {showResult && selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && (
                    <XCircle className="icon-incorrect" />
                  )}
                </motion.button>
              ))}
            </div>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="result-container"
              >
                <p className="result-text">
                  {selectedAnswer === quizQuestions[currentQuestion].correct
                    ? "Correct!"
                    : "Incorrect."}
                </p>
                <p className="explanation-text">{quizQuestions[currentQuestion].explanation}</p>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="completion-container"
          >
            <h2 className="completion-title">Quiz Completed!</h2>
            <p className="score-text">Your score: {score} out of {quizQuestions.length}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="restart-button"
              onClick={restartQuiz}
            >
              <RefreshCw className="icon" />
              Restart Quiz
            </motion.button>
          </motion.div>
        )}
        <div className="navigation-container">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="nav-button prev-button"
            onClick={prevQuestion}
            disabled={currentQuestion === 0 || quizCompleted}
          >
            <ChevronLeft className="icon" />
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="nav-button preview-button"
            onClick={togglePreview}
          >
            {showPreview ? (
              <>
                <EyeOff className="icon" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="icon" />
                Show Preview
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="nav-button next-button"
            onClick={nextQuestion}
            disabled={!showResult && !quizCompleted}
          >
            {quizCompleted ? 'Finish' : 'Next'}
            <ChevronRight className="icon" />
          </motion.button>
        </div>
      </motion.div>
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="preview-container"
        >
          <h3 className="preview-title">Quiz Preview</h3>
          {quizQuestions.map((q, index) => (
            <div
              key={index}
              className={`preview-item ${currentQuestion === index ? 'current' : ''}`}
            >
              <p>{q.question}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
