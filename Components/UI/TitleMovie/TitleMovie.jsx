import React from 'react';
import classes from './TitleMovie.module.css';
const TitleMovie = ({movieInfo}) => {
  if (!movieInfo) {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <h1>Not found</h1>
        </div>
      </div>
    );
  }
  const {title, production_companies, budget, runtime, release_date, genres, overview} = movieInfo;
  return (
    <div className={classes.container}>
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
    </div>
  );
};
export default React.memo(TitleMovie);
