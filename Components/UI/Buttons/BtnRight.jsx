import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
const BtnRight = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <FontAwesomeIcon icon={faAngleRight} onClick={props.onClick} />
    </button>
  );
};
export default BtnRight;
