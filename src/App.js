import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import React, {useState, useEffect} from 'react';
import AddCharacter from './Components/AddCharacter';
import _ from 'lodash';
import Character from './Components/Character';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



function App() {

  const[allCharacters, setAllCharacters] = useState(null);
  const[searchResults, setSearchResults] = useState(null);
  const[keywords, setKeywords] = useState("");
  const[country, setCountry] = useState("");
  const[role, setRole] = useState("");

  useEffect(() => {
    if (localStorage) {
      const charactersInLocalStorage = JSON.parse(localStorage.getItem('characters'));

      if(charactersInLocalStorage) {
        saveCharacters(charactersInLocalStorage);
      }
      else {
        saveCharacters(characters); 
      }
    }
  }, []);

  const saveCharacters = (characters) => {
    setAllCharacters(characters);
    setSearchResults(characters);
  }

  const addCharacter = (newCharacter) => {
    const updatedCharacters = [...allCharacters, newCharacter];
    saveCharacters(updatedCharacters);
  }

  const searchCharacters = () => {
    let keywordsArray = [];

    if(keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if (country) {
      keywordsArray.push(country.toString());
    }


  if(keywordsArray.length > 0) {
    const searchResults = allCharacters.filter(character => {
      for(const word of keywordsArray) {
        if (character.agentName.toLowerCase().includes(word) ||
        character.country.toLowerCase().includes(word)) {
          return true;
        }
      }
      return false;
    });
    setSearchResults(searchResults);
  }else {
    setSearchResults(allCharacters);
  }

  }

  const removeCharacter = (characterToDelete) => {
    const updatedCharactersArray = allCharacters.filter(character => character.id !== characterToDelete.id);
    saveCharacters(updatedCharactersArray);
  }

  const updateCharacter = (updatedCharacter) => {
    const updatedCharactersArray = allCharacters.map(character => character.id === updatedCharacter.id ? {...character,...updatedCharacter } : character);
    saveCharacters(updatedCharactersArray);
    
  }
  const characters = [{
    id:nanoid(),
    agentName: "Fade",
    image: 'images/character5.png',
    country: "Turkey",
    role: "Initiator",
  }, {
    id:nanoid(),
    agentName: "Phoenix",
    image: 'images/character3.png',
    country: "United Kingdom",
    role: "Duelist",
  }, {
    id:nanoid(),
    agentName: "Reyna",
    image: 'images/character2.png',
    country: "Mexico",
    role: "Duelist",
  }, {
    id:nanoid(),
    agentName: "Jett",
    image: 'images/character4.png',
    country: "South Korea",
    role: "Duelist",
  }, {
    id:nanoid(),
    agentName: "Cypher",
    image: 'images/character1.png',
    country: "Morocco",
    role: "Sentinel",
  }];

  return (
    <div className='container'>
      <div className='row' id='allCharacters'>
        <h3>Valorant Roster</h3>
        {searchResults && searchResults.map((character) =>
        (
        <div className='col-lg-2' key={character.id}>
          <Character character={character} removeCharacter={removeCharacter} updateCharacter={updateCharacter} />
      </div>)
        )}
      </div>
      <AddCharacter addCharacter={addCharacter} />
      <div className='row mt-4' id='searchCharacters'>
        <h3>Character Search</h3>
          <div className='col-md-4'>
            <label htmlFor='txtKeywords'>Search by Name</label>
            <input type='text' className='form-control' placeholder='Agent' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} />
          </div>
          <div className='col-md-4'>
          <label htmlFor='txtKeywords'>Search by Country</label>
            <select value={country} onChange={evt => setCountry(evt.currentTarget.value)} className='form-select'>
              <option value="">Select Country</option>
              {_(allCharacters).map(character => character.country).sort().uniq().map(country => <option key={country} value={country}>{country}</option>).value()}
            </select>
          </div>
          <div className='col-md-4'>
            <button type='button' className='btn btn-primary' onClick={searchCharacters}>Search Characters <FontAwesomeIcon icon={ faSearch} /></button>
          </div>
      </div>
    </div>
  );
}

export default App;
