const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercices1 = 10
  const part2 = 'Using props to pass data'
  const exercices2 = 7
  const part3 = 'State of a component'
  const exercices3 = 14
  return (
    <>
      <Header course={course}></Header>
      <Content 
        part1={part1} exercices1={exercices1}
        part2={part2} exercices2={exercices2}
        part3={part3} exercices3={exercices3}>
      </Content>
      <Total 
        exercices1={exercices1}
        exercices2={exercices2}
        exercices3={exercices3}>
      </Total>
    </>
  )
}

const Header = (props)=>{
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props)=>{
  return(
    <>
      <p>
        {props.part1}  {props.exercices1}
      </p>
      <p>
        {props.part2}  {props.exercices2}
      </p>
      <p>
        {props.part3}  {props.exercices3}
      </p>      
    </>
  )
}

const Total = (props)=>{
  return(
    <>
      <p> Number of exercices {
        sumarNumeros(
          props.exercices1,
          props.exercices2,
          props.exercices3
        )}
      </p>
    </>
  )
}

const sumarNumeros = (num1,num2,num3) => {
    return num1+num2+num3;
}

export default App