import { useState, useEffect, useRef } from 'react';
import Yellow from '../src/assets/Yellow.png';
import Blue from '../src/assets/Blue.png';



function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const buttonRefs = useRef([]);

  useEffect(() => {
    fetch('https://the-trivia-api.com/v2/questions')
     .then((response) => response.json())
     .then((data) => {
        const mixedQuestions = data.map((question) => {
          const incorrectAnswers = data
           .filter((item) => item.id!== question.id)
           .map((item) => item.correctAnswer)
           .slice(0, 3);

          return {
           ...question,
            incorrectAnswers,
            mixedAnswers: [...incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5),
          };
        });

        setQuestions(mixedQuestions);

        // Initialize buttonRefs.current with the correct length and null values
        buttonRefs.current = Array(mixedQuestions.length).fill().map(() => Array(4).fill(null));
      });
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      if (timeLeft === 0) {
        clearInterval(timer);
        setGameOver(true);
      }

      return () => clearInterval(timer);
    }
  }, [timeLeft, gameOver]);

  function handleAnswerClick(questionId, answerIndex) {
    if (gameOver) return;

    const question = questions.find((q) => q.id === questionId);
    const answer = question.mixedAnswers[answerIndex];

    setSelectedAnswers((prevSelectedAnswers) => ({
     ...prevSelectedAnswers,
      [questionId]: answerIndex,
    }));

    if (answer === question.correctAnswer) {
      // Change color to purple
      buttonRefs.current[questions.indexOf(question)][answerIndex].style.backgroundColor = '#94D7A2';
      buttonRefs.current[questions.indexOf(question)][answerIndex].disabled = true;
      setScore(score + 1);
    } else {
      // Change color to pink
      buttonRefs.current[questions.indexOf(question)].forEach((button, index) => {
        if (button === null || button.disabled === true) return;
        button.style.backgroundColor = 'pink';
        button.disabled = true;
      });

      const correctButton = buttonRefs.current[questions.indexOf(question)].find(
        (button) => question.mixedAnswers[button.value] === question.correctAnswer
      );

      correctButton.style.backgroundColor = '#94D7A2';
      correctButton.disabled = true;
    }
  }

  function playAgain() {
    setScore(0);
    setSelectedAnswers([]);
    setTimeLeft(30);
    setGameOver(false);
    fetch('https://the-trivia-api.com/v2/questions')
     .then((response) => response.json())
     .then((data) => {
        const mixedQuestions = data.map((question) => {
          const incorrectAnswers = data
           .filter((item) => item.id!== question.id)
           .map((item) => item.correctAnswer)
           .slice(0, 3);

          return {
           ...question,
            incorrectAnswers,
            mixedAnswers: [...incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5),
          };
        });

        setQuestions(mixedQuestions);

        // Initialize buttonRefs.current with the correct length and null values
        buttonRefs.current = Array(mixedQuestions.length).fill().map(() => Array(4).fill(null));
      });
  }

  return (
    <section>
       <div className="small_ball right">
          <img src={Yellow} alt="yellow shaped blob" />
        </div>
      <div>
        <h2 className='timer'>Time Left: {timeLeft} seconds</h2>
      </div>
      <div>
        {questions.slice(0, 5).map((question, index) => (
          <div key={question.id}>
            <h3>{question.question.text}</h3>
            {question.mixedAnswers.map((answer, answerIndex) => (
              <button className='questionBtn'
                ref={(node) => (buttonRefs.current[index][answerIndex] = node)}
                id={question.id}
                key={answerIndex}
                value={answerIndex}
                onClick={() => handleAnswerClick(question.id, answerIndex)}
              >
                {answer}
              </button>
            ))}
             <div className="line"></div>
          </div>
        ))}
      </div>
      {gameOver && (
        <div className='scoreflex'>
          <h2>Game Over!</h2>
          <h3>Your final score is: {score} / 5</h3>
          <button className='playbtn' onClick={playAgain}>Play Again</button>
        </div>
      )}
      <div className="small_ball left">
       <img src={Blue} alt="blue shaped blob" />
       </div>
   </section>
  );
      }

export default Quiz;