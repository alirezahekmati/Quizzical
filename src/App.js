
import { useState ,useEffect} from 'react'
import './App.css'
import Quiz from './Component/Quiz'
import Start from './Component/Start'

function App() {
const [start,setStart]=useState(false)
const [end,setEnd]=useState(false)
const [showGrade,setShowGrade]=useState(false)
const [loading,setLoading]=useState(false)
const [data,setData]=useState([])
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
  setLoading(true)
  async function getQuiz(){
    const respone = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    const data = await respone.json()
    setLoading(false)
    setData(data.results)
  }
  getQuiz()
}, [])
console.log("o")
answerArray = data.map(e=> ([...e.incorrect_answers,e.correct_answer]))
correctAnswerArray = data.map(e=>e.correct_answer)
for(let i =0 ;i<data.length;i++){
  quizData.push(<Quiz question={data[i].question} answer={data[i].correct_answer} answers={answerArray[i]} state={[answer,setAnswer]}/>)
}
function checkAnswer(){
  for(let i=0 ;i<correctAnswerArray.length;i++){
    finalGrade.push(correctAnswerArray[i] === answer[i]) 
    setAnswerJsx(e=> [...e, <p className={`answer-p ${correctAnswerArray[i] === answer[i]}`}>{"your answer: "+answer[i]}  {"correct answer: "+correctAnswerArray[i]}</p>])
  }
  setEnd(true)
  setShowGrade(true)
setGrade(finalGrade.filter(e=> e==true).length)
}
function resetGame(){
  async function getQuiz(){
    setLoading(true)
    const respone = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    const data = await respone.json()
    setData(data.results)
    setLoading(false)
  }
  getQuiz()
  setStart(false)
  setShowGrade(false)
  setAnswerJsx([])
  setGrade(0)
  setAnswer(["😶","😑","😢","😫","😭"])
}
  return (
    <div className="App">
      <div className='circle Start-circle-1'></div>
      {showGrade ? answerJsx :(<div className="quiz-container">{start? (loading ? <h1>loading ....</h1> : <>{quizData}</> ):  <Start startFunction={startGame}/>}</div>)}
      {start &&( end?( <><p>{"correct answer from 5 :" + Grade} </p><button onClick={resetGame}>start again</button></>) : (loading===false &&<button onClick={checkAnswer}>see the resuld </button>))}
      <div className='circle Start-circle-2'></div>
    </div>
  )
}

export default App
