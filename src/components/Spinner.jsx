import React             from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync}          from '@fortawesome/free-solid-svg-icons';
import './assets/styles/Spinner.css';

// noinspection JSUnresolvedVariable
export default props =>
    <div className = { `${ props.spinning
        ? 'spinner-fadeIn'
        : 'spinner-fadeOut' } d-flex justify-content-center w-25 mx-auto` }
         style = { {height: '60vh', paddingTop: '25vh'} }
    >
      <FontAwesomeIcon className = { 'w-25 mx-auto' }
                       icon = { faSync }
                       size = { props.size }
                       spin = { props.spinning }
      />
    </div>