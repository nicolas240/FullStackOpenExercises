import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [best, setBest] =useState({best:0, votes:0})

  const [points, setPoints]=useState(Array(8).fill(0))

  const changeAnec =()=>{
    console.log(selected)
    return ()=>{setSelected(Math.floor(Math.random()*8))
    }
  }

  const handleVote=()=> {
    let copy=[...points]
    copy[selected]+=1
    setPoints(copy)
    console.log(best)
    console.log(copy[selected])
    if(copy[selected]>best['votes']){
      setBest({best:selected,votes:copy[selected]})
    }
    console.log(best)
  }

  return (
    <div>
      <Anecdote title={'Anecdote of the day'} 
        anecdote={anecdotes[selected]} 
        votes={points[selected]}
      ></Anecdote>
      <Button handle={()=>handleVote()} text={'vote'}></Button>
      <Button handle={changeAnec()} text={'next anecdote'}></Button>
      <Anecdote
        title={'Anecdote with most votes'} 
        anecdote={anecdotes[best['best']]} 
        votes={best['votes']}
      ></Anecdote>
    </div>
  )
}

const Anecdote =(props)=>{
  return(
    <>
      <h1>{props.title}</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </>
  )
}

const Button = (props)=>{
  return (
    <button onClick={props.handle}>
      {props.text}
    </button>
  )
}

export default App