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

  const states={
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'all': all,
    'average': average,
    'positive': positive
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

  const getState = (state)=>{
    return states[state]
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
      <div>
        <Statistics get={getState}>
        </Statistics>
      </div>
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

//--Stastistics
const StaticsHeader=()=>{
  return (
    <>
      <h1>Statistics</h1>
    </>
  )
}

const Statistics = ({get})=>{
  if (get('all')<1){
    return (
      <>
        <StaticsHeader>
        </StaticsHeader>
        <p>No feedback given</p>
      </>
    )
  }else{
    return (
      <>
        <StaticsHeader>
        </StaticsHeader>
        <StatisticLine text='good' value ={get('good')} ></StatisticLine>
        <StatisticLine text='neutral' value ={get('neutral')}></StatisticLine>
        <StatisticLine text='bad' value ={get('bad')} ></StatisticLine>
        <StatisticLine text='all' value ={get('all')} ></StatisticLine>
        <StatisticLine text='average' value ={get('average')} ></StatisticLine>
        <StatisticLine text='positive' value ={get('positive')*100 +' %'} ></StatisticLine>
      </>
    )
  }
}

const StatisticLine = (props)=>{
  return (
    <p>
      {props.text} {props.value}
    </p>
  )
}

export default App