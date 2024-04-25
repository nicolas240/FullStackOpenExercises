const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  return(
    <>
      <Header course={course}></Header>
      <Content 
        parts ={parts}>
      </Content>
      <Total 
        parts={parts}>
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
        part={props.parts[0].name} 
        exercises={props.parts[0].exercises}>       
      </Part>
      <Part 
        part={props.parts[1].name} 
        exercises={props.parts[1].exercises}>       
      </Part>
      <Part 
        part={props.parts[2].name} 
        exercises={props.parts[2].exercises}>       
      </Part>
    </>
  )
}

const Part =(props)=>{
  return( 
  <><p>{props.part}  {props.exercises}</p>
  </>)
}

const Total = (props)=>{
  return(
    <>
      <p> Number of exercises {
        sumarNumeros(props.parts)}
      </p>
    </>
  )
}

const sumarNumeros = (parts) => {
    let resultado=0
    parts.forEach(part => {
      resultado=resultado+part.exercises
    });
    return resultado;
}

export default App