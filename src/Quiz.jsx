// import { useState, useEffect } from 'react'

// function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   console.log(selectedAnswers)

//   useEffect(() => {
//     fetch('https://the-trivia-api.com/v2/questions')
//       .then((response) => response.json())
//       .then((data) => {
//         const mixedQuestions = data.map((question) => {
//           const incorrectAnswers = data
//             .filter((item) => item.id !== question.id)
//             .map((item) => item.correctAnswer)
//             .slice(0, 3);

//           return {
//             ...question,
//             incorrectAnswers,
//             mixedAnswers: [
//               ...incorrectAnswers,
//               question.correctAnswer,
//             ].sort(() => Math.random() - 0.5),
//           };
//         });

//         setQuestions(mixedQuestions);
//         console.log(mixedQuestions)
//       });
//   }, []);

//   function handleAnswerClick(questionId, answerIndex) {
//     setSelectedAnswers((prevSelectedAnswers) => ({
//       ...prevSelectedAnswers,
//       [questionId]: answerIndex,
//     }));

//     const question = questions.find((q) => q.id === questionId);
//     if (question.mixedAnswers[answerIndex] === question.correctAnswer) {
//       // Change color to green
//       document.getElementById(questionId).style.backgroundColor = 'green';
//     } else {
//       // Change color to red
//       document.getElementById(questionId).style.backgroundColor = 'red';
//     }
//   }

//   return (
//     <section>
//         <div>
//         {questions.slice(0, 5).map((question) => (
//             <div key={question.id}>
//             <h3>{question.question.text}</h3>
//             {question.mixedAnswers.map((answer, index) => (
//                 <button
//                   id={question.id}
//                   key={index}
//                   onClick={() => handleAnswerClick(question.id, index)}
//                 >
//                     {answer}
//                 </button>
//             ))}
//             </div>
//         ))}
//         </div>
//     </section> 
//   );
// }

// export default Quiz;


// const Quiz = () => {
//   const [questions, setQuestions] = useState([]);
//   const [score, setScore] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   console.log(questions)

//   useEffect(() => {
//     const fetchQuestions = async () => {
//     const res = await fetch('https://the-trivia-api.com/v2/questions')
//     const data = await res.json()
//     setQuestions(data);
//     };

//     fetchQuestions();
//   }, []);

//   const handleAnswerClick = (isCorrect) => {
//     if (isCorrect) {
//       setScore(score + 1);
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       alert(`Your final score is: ${score}`);
//     }
//   };

//   return (
//     <div>
//       {questions.length > 6 && (
//         <div>
//           <h2>{questions[currentQuestionIndex].question.text}</h2>
//           {questions[currentQuestionIndex].incorrectAnswers.map((answer, index) => (
//             <button
//               key={index}
//               onClick={() => handleAnswerClick(false)}
//             >
//               {answer}
//             </button>
//           ))}
//           {questions[currentQuestionIndex].correctAnswer && (
//             <button
//               onClick={() => handleAnswerClick(true)}
//             >
//               {questions[currentQuestionIndex].correctAnswer}
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;


import { useState, useEffect, useRef } from 'react';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const buttonRefs = useRef([]);
  useEffect(() => {
    fetch('https://the-trivia-api.com/v2/questions')
      .then((response) => response.json())
      .then((data) => {
        const mixedQuestions = data.map((question) => {
          const incorrectAnswers = data
            .filter((item) => item.id !== question.id)
            .map((item) => item.correctAnswer)
            .slice(0, 3);
  
          return {
            ...question,
            incorrectAnswers,
            mixedAnswers: [
              ...incorrectAnswers,
              question.correctAnswer,
            ].sort(() => Math.random() - 0.5),
          };
        });
  
        setQuestions(mixedQuestions);
  
        // Initialize buttonRefs.current with the correct length and null values
        buttonRefs.current = Array(mixedQuestions.length).fill().map(() => Array(4).fill(null));
      });
  }, []);
  
  function handleAnswerClick(questionId, answerIndex) {
    const question = questions.find((q) => q.id === questionId);
    const answer = question.mixedAnswers[answerIndex];

    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answerIndex,
    }));

    if (answer === question.correctAnswer) {
      // Change color to purple
      buttonRefs.current[questions.indexOf(question)][answerIndex].style.backgroundColor = 'purple';
      buttonRefs.current[questions.indexOf(question)][answerIndex].disabled = true;
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

      correctButton.style.backgroundColor = 'purple';
      correctButton.disabled = true;
    }
  }

  return (
    <section>
      <div>
        {questions.slice(0, 5).map((question, index) => (
          <div key={question.id}>
            <h3>{question.question.text}</h3>
            {question.mixedAnswers.map((answer, answerIndex) => (
              <button
                ref={(node) => (buttonRefs.current[index][answerIndex] = node)}
                id={question.id}
                key={answerIndex}
                value={answerIndex}
                onClick={() => handleAnswerClick(question.id, answerIndex)}
              >
                {answer}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Quiz;