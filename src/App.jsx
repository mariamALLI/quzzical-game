import { useState} from 'react'
import './App.css'
import Quiz from './Quiz'
import Startquiz from './Startquiz'

function App() {
 const [quiz, setQuiz] = useState(false)
  


    function revealQuiz(){
      console.log('clicked')
      setQuiz(true)
    
    }
    

  return (
    quiz ?
     <Quiz/>
     : 
     <Startquiz 
     startquiz={revealQuiz}
     />
  )
}

export default App


/*
  // const quizID = data.id    
  // console.log(quizID)
  // const question = data.question.text
  // // console.log(question)
  // const answer = data.correctAnswer
  // // console.log(answer)
  // const incorrectAns1 = data.incorrectAnswers[0]
  // // console.log(incorrectAns1)
  // const incorrectAns2 = data.incorrectAnswers[1]
  // // console.log(incorrectAns2) 
  // const incorrectAns3 = data.incorrectAnswers[2]
  // // console.log(incorrectAns3);
*/ 