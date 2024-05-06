const Header = ({ course }) => <h2>{course}</h2>
const Total = ({ sum }) => <b>Total of {sum} excercises</b>
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(
      part=> 
        <Part key={part.id}
            part={part}
        />
    )}     
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