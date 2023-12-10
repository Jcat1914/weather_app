import './App.css';
import Navbar from './components/navbar';
import { useEffect, useRef, useState } from 'react';

const base_url = "https://api.openweathermap.org/data/2.5/weather"
const appId = "fc4a927e73d50f53de7e121c2947a7dd"
const city = "San Marcos"

function App() {
  const [temp, setTemp] = useState(27)//will trigger a render everytime its value changes
  const [name, setName] = useState(27)
  const [cities, setCities] = useState([
    'Jinotepe', 'Managua', 'Granada', 'Diriamba'
  ]);
  const newCityRef = useRef();

  const cityRef = useRef();
  const [_city, setCity] = useState(city)

  function SearchCity() {
    setCity(cityRef.current.value);
  }
  function addCity() {
    setCities([...cities, newCityRef.current.value]);
  }

  async function getCityTemp(signal) {

    try {
      const response = await fetch(`${base_url}?q=${_city}&appid=${appId}&units=metric`, { signal })//fetch will make a request to a server. Fetch also returns the response of the server. The response is an object
      const data = await response.json()//Javascript Object
      const { main: { temp }, name } = data
      setTemp(temp)
      setName(name)
    } catch (e) {
      alert(e)
    }
  }
  useEffect(function () {
    const abortController = new AbortController()//I created an abort controller object
    const abortSignal = abortController.signal
    getCityTemp(abortSignal)
    return function () {
      //this is a cleanup function
      abortController.abort()//the fetch request will be aborted
    }

  }, [_city, cities])//I will execute the callback only the first this component is rendered.
  return (
    <>
      <Navbar />
      <select name='cities' ref={cityRef} onChange={SearchCity} key={'cities'} defaultValue={'-'}>
        <option value={'-'}>-</option>
        {cities.map((city) => (
          <option value={city}>{city}</option>
        ))}
      </select>
      <br />
      <input placeholder='Add City' ref={newCityRef}></input>
      <button onClick={addCity}>Add City</button>

      <p>{name}</p>
      <p>{temp}</p>
    </>
  );
}


export default App;



