import React from 'react';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import config from 'react-reveal/globals';

import classes from './TitleMovie.module.css';
const TitleMovie = ({movieInfo}) => {
  if (movieInfo === undefined) {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <h1>Not found</h1>
        </div>
      </div>
    );
  }
  config({ssrFadeout: true});
  const {title, production_companies, budget, runtime, release_date, genres, overview} = movieInfo;
  return (
    <div className={classes.container}>
      <Fade left big>
        <div className={classes.background}>
          <div className={classes.title}>
            <h1>{title}</h1>
            <div className={classes['description-movie']}>
              <span>{release_date ? release_date.slice(0, 4) : ''}</span>
              <span className={classes['info-spacer']}></span>
              <span>{runtime} minutes</span>
              <span className={classes['info-spacer']}></span>
              <span>{genres ? genres[0]?.name : ''}</span>
              <span className={classes['info-spacer']}></span>
              <span>{budget ? budget + '$' : movieInfo.status}</span>
            </div>
            <h2>{overview}</h2>
            <div className={classes['companies']}>
              <span>Production companies:</span>
              <ul>
                {production_companies
                  ? production_companies.map((item) => <li key={item.id}>{item.name}</li>)
                  : ''}
              </ul>
            </div>
          </div>
        </div>
      </Fade>
      <div className={classes['list-actions']}>
        <div className={classes['container-btn']}>
          <Pulse>
            <div className={classes['wish-list']}>
              <FontAwesomeIcon icon={faCheck} size="4x" />
              <br />
              <label>My list</label>
            </div>
            <div className={classes['container-play-btn']}>
              <div className={classes['play-btn-container']}>
                <FontAwesomeIcon className={classes['play-btn']} icon={faPlay} size="3x" />
                <label>Play</label>
              </div>
            </div>
          </Pulse>
        </div>
      </div>
    </div>
  );
};
export default React.memo(TitleMovie);
