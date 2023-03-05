import { useState, useEffect } from 'react'
import Die from './Die'
import './App.css'
import Confetti from 'react-confetti'

function App() {
  const [die, setDie] = useState(initializeSet());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)
  
  useEffect(() => {
    const allHeld = die.every(dice => dice.isHeld)
    const firstValue = die[0].value
    const allSameValue = die.every(dice => dice.value === firstValue)
    if(allHeld && allSameValue) {
      console.log("You won!")
      setTenzies(true)
    }
}, [die])
//initializes the numberSet array
  function initializeSet() {
    const numArray = []
      for(let i = 0; i < 10; i++) {
          const num = Math.ceil(Math.random() * 6)
          numArray.push({
            value: num,
            isHeld: false,
            id: 'ID' + i,
          })
      }
      return numArray
    }
    const newGame = () => {
      setDie(initializeSet())
      setTenzies(false)
      setScore(count)
      setCount(0)
    }

  const rollDice = () => {
    setDie(
      die.map((dice) => (
        //updates die object to reroll numbers that are not held
        dice.isHeld == false ? 
        {...dice, value: Math.ceil(Math.random() * 6)} : dice
      ))
    )
    setCount((prev) => prev + 1)
  }
  const holdDice = (id) => {
    setDie(
      die.map((dice) => (
        //updates die object to not equal to isHeld value
        dice.id == id ? 
        {...dice, isHeld: !dice.isHeld} : dice
      ))
    )
  }
    // maps through numberMap and returns it as a component
    const diceMap = die.map(dice => <Die 
      key={dice.id} 
      value={dice.value} 
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
      />
      )
  
  return (
    <div className='App'>
     {tenzies &&  <Confetti width={window.innerWidth}/> }
      <main>
        <h1> Tenzies </h1>
        <p> Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>
        <h3> Roll count: {count} { score != 0 && <span>| Previous Score: {score} </span>} </h3>
        {tenzies && <h1 className="you-won"> You won! 🎉 </h1>}
        { tenzies && count < score && score != 0 && <h3 className='high-score'> New high score 👏 </h3>}
            <div className="dice-container">
              {diceMap}
            </div>
            <button className='roll' onClick={tenzies ? newGame : rollDice}> {tenzies ? "New Game" : "Roll"} </button>
        </main>
      </div>
  )
}

export default App
