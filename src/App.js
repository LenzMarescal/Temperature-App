import axios from 'axios';
import React, { useState } from 'react';


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?zip=${query},fr&appid=65d8db7f5c7724e70536eda38b247eae&units=metric`,
        data: query
    })
    .then(function (reponse) {
        //On traite la suite une fois la réponse obtenue 
        setWeather(reponse.data.main.temp)
        console.log(reponse);
    })
    .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
    });
      };
    }


const dateBuilder = (d)=>{
  let months = ["December", "January", "February", "March", "April", 
  "May", "June", "July", "August", "September", "November"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
  "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}  ${date} ${month} ${year}`;

}

  return (
    <div className={(typeof weather != "undefined") ? ((weather > 15) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" 
            className="search-bar"
             placeholder="Entrez un code postal"
             onChange={e => setQuery(e.target.value)}
             value={query}
             onKeyPress={search}
             />
        </div>  
        <div className="location-box">
          <div className="location">
            {query}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather)} °C
          </div>
        </div>
      </main>
             

    </div>
  );
}

export default App;
