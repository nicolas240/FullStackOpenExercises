import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sets ={
    'good': setGood,
    'neutral': setNeutral,
    'bad': setBad
  }

const handleClick =(type)=>{
  if(type==='good'){
    return ()=>{
      sets[type](good+1)
    }
  }else if (type==='neutral'){
    return ()=>{
      sets[type](neutral+1)
    }
  }else{
    return ()=>{
      sets[type](bad+1)
    }
  }
  
  
}

  return (
    <>
      <div>
        <FeedbackHeader>
        </FeedbackHeader>
        <Button handle={handleClick('good')} text={'good'}></Button>
        <Button handle={handleClick('neutral')} text={'neutral'}></Button>
        <Button handle={handleClick('bad')} text={'bad'}></Button>           
      </div>
      <StaticsHeader>
      </StaticsHeader>
      <Statistic count ={good} type='good'></Statistic>
      <Statistic count ={neutral} type='neutral'></Statistic>
      <Statistic count ={bad} type='bad'></Statistic>
    </>
  )
}
//--FeedBack--
const FeedbackHeader = ()=>{
  return (
    <>
      <h1>Give us feedback</h1>
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

//--Statics
const StaticsHeader=()=>{
  return (
    <>
      <h1>Statistics</h1>
    </>
  )
}

const Statistic = (props)=>{
  return (
    <p>
      {props.type} {props.count}
    </p>
  )
}
export default App