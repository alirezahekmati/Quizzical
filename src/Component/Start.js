import React from 'react'

function Start(props) {
    const {startFunction}=props
    return (
        <div className='Start'>
            
            <h1>Quizzical</h1>
            <p>challenge your self</p>
            <button onClick={startFunction}>Start new game</button>
            
        </div>
    )
}

export default Start