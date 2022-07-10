import {useState, useEffect} from 'react';
import Recomendations from '../UI/Recomendations/Recomendations';
import Card from '../UI/Card/Card';
import BtnRed from '../UI/Buttons/BtnRed';
import classes from './Search.module.css';
import {async} from '@firebase/util';
const Search = () => {
  let api_key = 'a91ae0cd304a8451a56aa5198ff1fa0a';
  const [movie, setMovie] = useState('');
  const [results, setResults] = useState({});
  const inputHandler = (event) => {
    setMovie(event.target.value);
  };
  async function fetchData(value) {
    const request = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${value}&page=1&include_adult=false`,
    );
    const data = await request.json();
    setResults(data);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    fetchData(movie);
    console.log(results);
  };
  return (
    <Card className={classes.card}>
      <div className={classes.content}>
        <h1>Find out you movie</h1>
        <form onSubmit={submitHandler}>
          <input onChange={inputHandler} type="text" placeholder="Find out your movie" />
          <BtnRed className={classes.btn}>Search</BtnRed>
        </form>
      </div>
      {results && <Recomendations recommendations={results} />}
    </Card>
  );
};
export default Search;
