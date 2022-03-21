import React from 'react'


function Quiz(props) {
    const{answers,answer,question,state}=props
    let answerArray= [...answers]
    let answerArray2= []


    
    // useEffect(() =>state[1](["bob"]),[])
    
for(let i =0 ;i<4;i++){
    let choosenOne = answerArray[Math.floor(Math.random()*answerArray.length)]
    // answerArray2.push(<p key={answers[i]} onClick={(e)=>guessedAnswer(e,answer)}>{choosenOne}</p>) 
    answerArray2.push(<p key={answers[i]} >{choosenOne}</p>) 

    answerArray = answerArray.filter(item => item !== choosenOne)
}

function aa(e){
    [...e.target.parentElement.children].map(e=>e.style.backgroundColor="white")
    e.target.style.backgroundColor="hsla(120, 70%, 70%,.5)"
    state[1](each=> {
each[[...document.querySelector(".quiz-container").children].indexOf(e.target.parentElement.parentElement)]=e.target.textContent
        return each
    })

}
 
    return (
        <div className='Quiz' >
            <p className='Quiz-p'>{question}</p>
            <div className='Quiz-answers' onClick={aa}>
                {answerArray2 }
                
            </div>
        </div>
    
    )
}

export default Quiz