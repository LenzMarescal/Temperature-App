//dépendences
import axios from 'axios';
import React, { useState } from 'react';
//Stylesheets
import './styles.scss';
//images
import logonuit from './assets/lune.png';
import logojour from './assets/day.png';

function App() {
  //states:
  const [query, setQuery] = useState('');
  const [meteo, setMeteo] = useState('');
  const [apparence,setApparence]= useState('');
  
  //Axios requests
  const AppelAPI = evt => {
    if (evt.key === "Enter") {
      axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?zip=${query},fr&appid=65d8db7f5c7724e70536eda38b247eae&units=metric`,
        data: query
    })
    .then(function (reponse) {
        //On traite la suite une fois la réponse obtenue 
        setMeteo(reponse.data.main.temp);
        setApparence(reponse.data.weather[0].main);
        console.log(reponse);
    })
    .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
    });
      };
    }


    
//Récuperer la date du jour et returner une date lisible
const donneDate = (d)=>{
  let mois = ["Janvier", "Février", "Mars", "Avril", 
  "Mai", "Juin", "Juillet", "Août", "Septembre", "Novembre","Decembre"];
  let jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", 
  "Jeudi", "Vendredi", "Samedi"];

  let jour = jours[d.getDay()];
  let date = d.getDate();
  let month = mois[d.getMonth()];
  let annee = d.getFullYear();
  return `${jour}  ${date} ${month} ${annee}`;
}

//heure française:
const event = new Date();
const heure = event.toLocaleTimeString('fr-FR');
//heure simple:
const Int = event.getHours();
const darkness = function(heureEnInt){
if (heureEnInt >= 20 || heureEnInt < 8){
  return true;
}
else if(heureEnInt >= 8 && heureEnInt <= 20){
  return false;
 }
}
  return (
    <div className= {(typeof apparence != "undefined") ? 
    ((apparence === "Rain") ? 'app-rain' : (apparence === "Clear") ?
    'app-bleu' : (apparence === "Thunderstorm") ? 
    'app-thunder' : (apparence === "Drizzle") ? 
    'app-drizz' : (apparence === "Snow") ? 
    'app-neige' : (apparence === "Clouds") ? 
    'app-nuage' : 'app') : 'app'}>
      <main className='app-main'>
        <div className='app-main-box'>
          <input type="text" 
            className='app-main-box-search'
             placeholder="Entrez un code postal: _ _ _ _ _"
             onChange={e => setQuery(e.target.value)}
             value={query}
             onKeyPress={AppelAPI}
             />
        </div>  
        <div className='app-main-result'>
          <div className="app-main-result-localisation">
            Votre recherche : {query}
          </div>
          <div className="app-main-result-date">{donneDate(new Date())}</div>
          <div className="app-main-result-date">{heure}</div>
          <img alt={(darkness(Int) === true)? "Cette icône indique qu'il fait nuit" : "Cette icône indique qu'il fait jour"} 
          src={(darkness(Int) === true) ? logonuit : logojour} 
          className="app-main-result-date-logo"/>
        </div>
        <div className="app-main-result-temps">
          <div className="app-main-result-temps-C">
            {Math.round(meteo)} °C
          </div>
          <div className='app-main-result-temps-description'>The sky is : {apparence}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
