import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const sets ={
    'good': setGood,
    'neutral': setNeutral,
    'bad': setBad
  }

  const handleClick =(type)=>{
    let allSum =all+1
    if(type==='good'){
      return ()=>{
        let count =good+1
        sets[type](count)
        setAll(allSum)
        setPositive(count/allSum)
        setAverage( (count-bad)/allSum )
      }
    }else if (type==='neutral'){
      return ()=>{
        let count = neutral+1
        sets[type](count)
        setAll(allSum)
        setPositive(good/allSum)
        setAverage( (good-bad)/allSum )
      }
    }else{
      return ()=>{
        let count =bad+1
        sets[type](count)
        setAll(allSum)
        setPositive(good/allSum)
        setAverage( (good-count)/allSum )
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
      <Statistic count ={all} type='all'></Statistic>
      <Statistic count ={average} type='average'></Statistic>
      <Statistic count ={positive +' %'} type='positive'></Statistic>
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