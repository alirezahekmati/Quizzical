
import { useState ,useEffect} from 'react'
import './App.css'
import Quiz from './Component/Quiz'
import Start from './Component/Start'

function App() {
const [start,setStart]=useState(false)
const [data,setData]=useState([])
const [end,setEnd]=useState(false)
const [showGrade,setShowGrade]=useState(false)
const [Grade,setGrade]=useState(0)
const [answerJsx,setAnswerJsx]=useState([])
const [answer,setAnswer]=useState(
  ["😶","😑","😢","😫","😭"])
let quizData =[]
let answerArray =[]
let correctAnswerArray =[]
let finalGrade =[]



function startGame(){
  setStart(true)
  setEnd(false)
}

useEffect(() => {
  async function getQuiz(){
    const respone = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    const data = await respone.json()
    setData(data.results)
  }
  getQuiz()
}, [])

answerArray = data.map(e=> ([...e.incorrect_answers,e.correct_answer]))
correctAnswerArray = data.map(e=>e.correct_answer)
for(let i =0 ;i<data.length;i++){
  quizData.push(<Quiz question={data[i].question} answer={data[i].correct_answer} answers={answerArray[i]} state={[answer,setAnswer]}/>)
}
function checkAnswer(){
  for(let i=0 ;i<correctAnswerArray.length;i++){
    finalGrade.push(correctAnswerArray[i] === answer[i]) 
    console.log("yo1",answerJsx)
    setAnswerJsx(e=> [...e, <p className={`answer-p ${correctAnswerArray[i] === answer[i]}`}>{"your answer: "+answer[i]}  {"correct answer: "+correctAnswerArray[i]}</p>])
    console.log("yo2",answerJsx) 
  }
  setEnd(true)
  setShowGrade(true)
setGrade(finalGrade.filter(e=> e==true).length)
}
function resetGame(){
  setStart(false)
  setShowGrade(false)
  setAnswerJsx([])
  setGrade(0)
  setAnswer(["😶","😑","😢","😫","😭"])
}
console.log("yo3",answerJsx)
  return (
    <div className="App">
      <div className='circle Start-circle-1'></div>
      {showGrade ? answerJsx :(<div className="quiz-container">{start?<>{quizData}</> :  <Start startFunction={startGame}/>}</div>)}
      
       {/* {start? <Quiz question={data[0].question} answer={data[0].correct_answer} answers={answerArray[0]}/> :  <Start startFunction={startGame}/>} */}
      {start &&( end?( <><p>{"correct answer from 5 :" + Grade} </p><button onClick={resetGame}>start again</button></>) : (<button onClick={checkAnswer}>see the resuld </button>))}
      <div className='circle Start-circle-2'></div>
    </div>
  )
}

export default App
