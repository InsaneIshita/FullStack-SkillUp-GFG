import React, { useState, useEffect } from "react";
interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Galileo", "Tesla"],
    answer: "Einstein",
  },
];

const QuizApp: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option: string) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(10);
    } else {
      setShowResult(true);
    }
  };

  const handleStart = () => {
    setStartQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(10);
  };

  // Inline Style Objects
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #f939bcff, #f0f72cff)",
      padding: "20px",
      color: "white",
    },
    quizBox: {
      background: "white",
      color: "#333",
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
      width: "400px",
      textAlign: "center" as "center",
    },
    questionTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#f939bcff",
      marginBottom: "15px",
    },
    timer: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "red",
      marginBottom: "15px",
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "column" as "column",
      gap: "10px",
    },
    optionButton: {
      padding: "12px 16px",
      fontSize: "1rem",
      background: "#f551c1ff",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "0.3s",
    },
    optionButtonHover: {
      background: "#fa18b2ff",
    },
    resultContainer: {
      textAlign: "center" as "center",
    },
    restartButton: {
      marginTop: "20px",
      padding: "12px 16px",
      fontSize: "1rem",
      background: "#f939bcff",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.quizBox}>

        {!startQuiz && (
          <>
            <h2 style={styles.questionTitle}>Welcome to Random Quiz!</h2>
            <button style={styles.restartButton} onClick={handleStart}>
              Start Quiz
            </button>
          </>
        )}
        {startQuiz && !showResult && (
          <>
            <div style={{ textAlign: "center" }}>
              <h2 style={styles.questionTitle}>{questions[currentQuestion].question}</h2>
              <p style={styles.timer}>Time Left: {timeLeft}s</p>
              <div style={styles.optionsContainer}>
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    style={styles.optionButton}
                    onMouseOver={(e) => (e.currentTarget.style.background =
                      styles.optionButtonHover.background)}
                    onMouseOut={(e) => (e.currentTarget.style.background =
                      styles.optionButton.background)}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Result Screen */}
        {showResult && (
          <>
            <h2 style={styles.questionTitle}>Quiz Completed 🎉</h2>
            <p>
              Your Score: {score} / {questions.length}
            </p>
            <button style={styles.restartButton} onClick={handleStart}>
              Restart Quiz
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default QuizApp;