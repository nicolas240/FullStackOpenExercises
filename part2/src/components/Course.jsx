const Header = ({ course }) => <h1>{course}</h1>
const Total = ({ sum }) => <b>Total of {sum} excercises</b>
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />  
    <Part
      part={parts[3]} 
    />     
  </>

const Course = ({ course }) => {
  const sumCourses =()=>
    course.parts.reduce(
      (total, course)=>total+course.exercises,0
    )
  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={sumCourses()}></Total>
    </>
  )
}
  
  export default Course