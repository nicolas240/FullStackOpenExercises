const Header = ({ header }) => <h2>{header}</h2>
const BasicData =(props)=>{
  console.log('props.lenguages::: ', props.languages);
  console.log('props::: ', props);
  console.log('props.flag::: ', props.flag);
  return <div>
    <p>capital {props.capital}</p>
    <p>area {props.area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.values(props.languages).map( (l,i)=>
        <li key={i}>{l}</li>
      )}
    </ul>
    <img src={props.flag} ></img>
  </div>
}

const Country = ({ country }) => {
  console.log('country::: ', country);
  return (
    <>
      <Header header={country.name.common}></Header>
      <BasicData capital={country.capital[0]}
        area={country.area}
        languages={country.languages}
        flag={country.flags.png}
      ></BasicData>
    </>
  )
}

export default Country