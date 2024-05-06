const Header = ({ header }) => <h2>{header}</h2>
const Person =({person})=>{
  return <>
    <p>{person.name} {person.number}</p>
  </>
}

const Content = ({ persons }) => 
  <>
    {persons.map(
      person=> 
        <Person key={person.name}
          person={person}
        />
    )}
  </>

const Numbers = ({ numbers }) => {
  return (
    <>
      <Header header='Numbers'></Header>
      <Content persons={numbers}></Content>
    </>
  )
}

export default Numbers