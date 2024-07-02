import { useState, useEffect, useRef } from 'react';

function TQuiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const buttonRefs = useRef([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch('https://the-trivia-api.com/v2/questions');
    const data = await response.json();
    const mixedQuestions = data.map((question) => {
      const incorrectAnswers = data
        .filter((item) => item.id !== question.id)
        .map((item) => item.correctAnswer)
        .slice(0, 3);

      return {
        ...question,
        incorrectAnswers,
        mixedAnswers: [...incorrectAnswers, question.correctAnswer].sort(() => Math.random() - 0.5),
      };
    });

    setQuestions(mixedQuestions);
    buttonRefs.current = Array(mixedQuestions.length).fill().map(() => Array(4).fill(null));
  };

  function handleAnswerClick(questionId, answerIndex) {
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
        setScore(score)
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
    setGameOver(false);
    fetchQuestions(); // Refetch questions
  }

  return (
    <section>
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
      {
        <div className='scoreflex'>
          {/* <h2>Game Over!</h2> */}
          <h3>You scored {score} / 5 correct answers</h3>
          <button className='playbtn' onClick={playAgain}>Play Again</button>
        </div>
      }
    </section>
  );
}

export default TQuiz;