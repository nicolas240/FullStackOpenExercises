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

  const states=[
    {text:'good', value: good},
    {text: 'neutral', value: neutral},
    {text: 'bad', value: bad},
    {text: 'all', value: all},
    {text: 'average', value: average},
    {text: 'positive', value: positive}
  ]

  const handleClick =(type)=>{
    let allSum =all+1
    if(type==='good'){
      return ()=>{
        let count =good+1
        sets[type](count)
        setAll(allSum)
        setPositive( count*100/allSum +'%')
        setAverage( (count-bad)/allSum )
      }
    }else if (type==='neutral'){
      return ()=>{
        let count = neutral+1
        sets[type](count)
        setAll(allSum)
        setPositive(good*100/allSum+'%')
        setAverage( (good-bad)/allSum )
      }
    }else{
      return ()=>{
        let count =bad+1
        sets[type](count)
        setAll(allSum)
        setPositive(good*100/allSum+'%')
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
      <div>
        <Statistics data={states}>
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

const Statistics = (props)=>{
  let all
  props.data.forEach(dato => {
    if (dato.text==='all'){
      all=dato.value
    }
  });
  if (all<1){
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
        <TableStatistics data ={props.data}>
        </TableStatistics>
      </>
    )
  }
}

const TableStatistics = (props)=>{
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Text</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((dato, index) => (
            <tr key={index}>
              <td>{dato.text}</td>
              <td>{dato.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App