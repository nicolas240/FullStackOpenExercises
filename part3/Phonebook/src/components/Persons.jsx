const Header = ({ header }) => <h2>{header}</h2>
const Person =({person,handleConfirm})=>{
  return <>
    <p>{person.name} {person.number} 
      <button onClick={handleConfirm}>delete</button>
    </p>
  </>
}

const Content = ({ persons,handleConfirm }) => 
  <>
    {persons.map(
      person=> 
        <Person key={person.id}
          person={person}
          handleConfirm={(e)=>handleConfirm(e,person)}
        />
    )}
  </>

const Persons = ({ numbers, handleDelete }) => {
  const handleConfirm=(e,element)=>{
    e.stopPropagation()
    let message=`Delete ${element.name} ?`
    if(window.confirm(message)){
      handleDelete(element.id)
    }
  }
  return (
    <>
      <Header header='Numbers'></Header>
      <Content persons={numbers}
        handleConfirm={handleConfirm}
      ></Content>
    </>
  )
}

export default Persons