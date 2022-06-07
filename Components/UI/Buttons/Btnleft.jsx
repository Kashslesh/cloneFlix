import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
const BtnLeft = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
};
export default BtnLeft;
