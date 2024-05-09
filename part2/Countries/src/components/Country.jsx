import Weather from './Weather'
const Header = ({ header }) => <h2>{header}</h2>
const BasicData =(props)=>{
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

const Country = ({ country, show=true,weatherData=[]}) => {
  console.log('weatherData::: ', weatherData);
  return (
    <>
      { show &&
        <div>
          <Header header={country.name.common}></Header>
          <BasicData capital={country.capital[0]}
            area={country.area}
            languages={country.languages}
            flag={country.flags.png}
          ></BasicData>
          <Weather capital={country.capital[0]}
              weatherData={weatherData}
          />
        </div>
      }
    </>
  )
}

export default Country