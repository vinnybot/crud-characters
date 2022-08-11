import React, {useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faPencil } from '@fortawesome/free-solid-svg-icons'
import './Character.css';

function Character(props) {

const[editMode, setEditMode] = useState(false);
const[agentName, setAgentName] = useState("");
const[country, setCountry] = useState("");
const[role, setRole] = useState("");

  useEffect(() => {
  setAgentName(props.character.agentName);
  setCountry(props.character.setCountry);
  setRole(props.character.role);
    }, []);

    const saveCharacter = () => {
      setEditMode(false);
      const updatedCharacter = {agentName:agentName, country:country, id:props.character.id, image:props.character.image, role:role};
      props.updateCharacter(updatedCharacter);
    }


    return(
    <div className='card'>
        <img src={props.character.image} alt='Character' className='card-img-top mx-auto' />
        {!editMode && <ul className='list-group list-group-flush'>
          <li className='list-group-item text-center'>{props.character.agentName}</li>
          <li className='list-group-item text-center'>{props.character.country}</li>
          <li className='list-group-item text-center'>{props.character.role}</li>
          <button type='button' className='btn btn-danger' onClick={() => props.removeCharacter(props.character)}>Delete Character <FontAwesomeIcon icon={ faWarning} /></button>
          <button type='button' className='btn btn-warning' onClick={() => setEditMode(true)}>Edit <FontAwesomeIcon icon={faPencil} /></button>
        </ul>
        }
        {editMode &&
        <ul className='list-group list-group-flush'>
        <li className='list-group-item text-center'><input type='text' className="form-control" value={agentName} onChange={(evt) => setAgentName(evt.currentTarget.value)} /></li>
        <li className='list-group-item text-center'><input type='text' className="form-control" value={country} onChange={(evt) => setCountry(evt.currentTarget.value)} /></li>
        <li className='list-group-item text-center'><input type='text' className="form-control" value={role} onChange={(evt) => setRole(evt.currentTarget.value)} /></li>
        <li className='list-group-item'><button id='btnSave' className='btn btn-secondary' onClick={saveCharacter}>Save</button></li>
      </ul>
        }
    </div>
)};

export default Character;