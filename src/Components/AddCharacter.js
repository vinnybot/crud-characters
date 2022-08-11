import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import './AddCharacter.css';


function AddCharacter(props) {
const[agentName, setAgentName] = useState("");
const[selectedFile, setSelectedFile] = useState();
const[country, setCountry] = useState("");
const[role, setRole] = useState("");

const doWork = () => {
    const newCharacter = {"id":nanoid(), "agentName":agentName, "image":URL.createObjectURL(selectedFile), "country":country, "role":role};
    props.addCharacter(newCharacter);
}

const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
}

return (
    <div className='row mt-5' id='addCharacter'>
        <h3>Add Character</h3>
        <div className='col-md-3'>
            <label htmlFor='txtFirstName' className='form-label'>Agent Name</label>
            <input type='text' id='txtFirstName' placeholder='Jett' className='form-control' onChange={(evt) => setAgentName(evt.currentTarget.value)} value={agentName} />
        </div>
        <div className='col-md-3'>
            <label htmlFor='txtCountry' className='form-label'>Country</label>
            <input type='text' id='txtCountry' placeholder='South Korea' className='form-control' onChange={(evt) => setCountry(evt.currentTarget.value)} value={country} />
        </div>
        <div className='col-md-3'>
            <label htmlFor='txtCountry' className='form-label'>Agent Role</label>
            <input type='text' id='txtRole' placeholder='Duelist' className='form-control' onChange={(evt) => setRole(evt.currentTarget.value)} value={role} />
        </div>
        <div className='col-md-3'>
        <label htmlFor='fileUpload' className='form-label'>Character Image</label>
        <input type='file' name='file' id='fileUpload' onChange={imageUpdate}/>
        </div>

        <div className='col-md-3'>
        <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork}>Add Character <FontAwesomeIcon icon={faPerson} /></button>
        </div>
    </div>
);

}

export default AddCharacter;