const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercices1 = 10
  const part2 = 'Using props to pass data'
  const exercices2 = 7
  const part3 = 'State of a component'
  const exercices3 = 14
  const parts =[part1, part2, part3];
  const exercices=[exercices1,exercices2,exercices3]
  return (
    <>
      <Header course={course}></Header>
      <Content 
        parts ={parts} exercices={exercices}>
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
      <Part 
        part={props.parts[0]} 
        exercices={props.exercices[0]}>       
      </Part>
      <Part 
        part={props.parts[1]} 
        exercices={props.exercices[1]}>       
      </Part>
      <Part 
        part={props.parts[2]} 
        exercices={props.exercices[2]}>       
      </Part>
    </>
  )
}

const Part =(props)=>{
  return( 
  <><p>{props.part}  {props.exercices}</p>
  </>)
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