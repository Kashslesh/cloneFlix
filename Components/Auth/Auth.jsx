import {useState, useEffect} from 'react';
import {AuthActions} from '../../store/AuthSlices';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import classes from './Auth.module.css';
const Auth = () => {
  //  async function()  {
  //   const fetchMoviesFunction = async (url, key, id) => {
  //     let page = Math.floor(Math.random() * 3) + 1;
  //     const request = await fetch(`${url}api_key=${key}&with_genres=${id}&page=${page}`);
  //     const data = await request.json();
  //     // const dataStr = JSON.stringify(data);
  //     return data;
  //   };
  //   let api_key = 'a91ae0cd304a8451a56aa5198ff1fa0a';

  //   let img_url = 'https://image.tmdb.org/t/p/w500';
  //   let original_img_url = 'https://image.tmdb.org/t/p/original';
  //   let genres_list_http = 'https://api.themoviedb.org/3/genre/movie/list?';
  //   let movie_genres_http = 'https://api.themoviedb.org/3/discover/movie?';
  //   let movie_detail_http = 'https://api.themoviedb.org/3/movie';

  //   const fetchRequest = await fetch(`${genres_list_http}api_key=${api_key}`);
  //   let fetchGenres = await fetchRequest.json();
  //   // let test = await fetchMoviesFunction(movie_genres_http, api_key, fetchGenres.genres[0].id);
  // };
  
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isEmailHasError, setIsEmailHasError] = useState(
    'Please enter a valid email or phone number.',
  );
  const [isPasswordHasError, setIsPasswordHasError] = useState(
    'Your password must contain between 4 and 60 characters.',
  );
  const [confirmationError, setConfiramtionError] = useState(
    'Confirmation of password not must be empty',
  );
  const [checked, setChecked] = useState(false);
  const [isDirtyEmail, setIsDirtyEmail] = useState(false);
  const [isDirtyPaswword, setIsDirtyPassword] = useState(false);
  const [isDirtyConfirmation, setIsDirtyConfiramtion] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const test = useSelector((state) => state.auth.isLogined);

  const resetFunction = () => {
    setEmail('');
    setConfirmation('');
    setPassword('');
  };
  const toggleHandler = () => {
    setIsSignIn((prevState) => !prevState);
  };
  const blurHandler = (event) => {
    if (event.target.name === 'email') {
      setIsDirtyEmail(true);
    }
    if (event.target.name === 'password') {
      setIsDirtyPassword(true);
    }
    if (event.target.name === 'confirmation') {
      setIsDirtyConfiramtion(true);
    }
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(event.target.value).toLowerCase())) {
      setIsEmailHasError('Email is not correct');
    } else {
      setIsEmailHasError('');
    }
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 4 || event.target.value.length > 60) {
      setIsPasswordHasError('Your password must contain between 4 and 60 characters');

      if (!event.target.value) {
        setIsPasswordHasError('Password is empty');
      }
    } else {
      setIsPasswordHasError('');
    }
  };
  const confirmationHandler = (event) => {
    setConfirmation(event.target.value);
    if (password !== event.target.value) {
      setConfiramtionError('Password and confirmation have to be seam');
      if (!event.target.value) {
        setConfiramtionError('Confirmation of password not must be empty');
      }
    } else {
      setConfiramtionError('');
    }
  };
  const checkedHandler = () => {
    setChecked(!checked);
  };
  let storeLocal;
  useEffect(() => {
    if (isSignIn) {
      if (!localStorage.getItem('user')) {
        return;
      }
      storeLocal = JSON.parse(localStorage.getItem('user'));
      setEmail(storeLocal.email);
      setPassword(storeLocal.password);
      setChecked(true);
    } else {
      localStorage.removeItem('user');
      resetFunction();
    }
  }, [isSignIn]);
  useEffect(() => {
    if (isSignIn) {
      if (isEmailHasError || isPasswordHasError) {
        setFormIsValid(false);
      } else {
        setFormIsValid(true);
      }
    } else {
      if (isEmailHasError || isPasswordHasError || confirmationError) {
        setFormIsValid(false);
      } else {
        setFormIsValid(true);
      }
    }
  }, [isEmailHasError, isPasswordHasError, confirmationError]);
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      if (!isSignIn) {
        dispatch(AuthActions.signUp({email, password}));
        setIsSignIn(true);
        resetFunction();
      } else {
        dispatch(AuthActions.logIn({email, password}));
        resetFunction();
        router.push('/main-page');
      }
      if (checked) {
        localStorage.setItem('user', JSON.stringify({email, password}));
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <h2>{!isSignIn ? 'Sign up' : 'Sign In'}</h2>
        <form onSubmit={submitHandler}>
          <input
            value={email}
            onBlur={blurHandler}
            onChange={emailHandler}
            name="email"
            type="email"
            placeholder="Email"
          ></input>
          {isDirtyEmail && isEmailHasError && (
            <span className={classes.errors}>
              <br />
              {isEmailHasError}
            </span>
          )}
          <input
            onChange={passwordHandler}
            value={password}
            onBlur={blurHandler}
            name="password"
            type="password"
            placeholder="Password"
          ></input>
          {isDirtyPaswword && isPasswordHasError && (
            <span className={classes.errors}>
              <br />
              {isPasswordHasError}
            </span>
          )}
          <br />
          {!isSignIn && (
            <label>
              <input
                onChange={confirmationHandler}
                value={confirmation}
                onBlur={blurHandler}
                name="confirmation"
                type="password"
                placeholder="Confirmation"
              ></input>
              {isDirtyConfirmation && confirmationError && (
                <span className={classes.errors}>
                  <br />
                  {confirmationError}
                </span>
              )}
              <br />
            </label>
          )}
          <br />
          <button disabled={!formIsValid} type="submit">
            {!isSignIn ? 'Sign up' : 'Sign In'}
          </button>
          <div className={classes.checkbox}>
            <label>
              <input onChange={checkedHandler} checked={checked} type="checkbox" />
              <span>Remember Me</span>
            </label>
            <p>Need help?</p>
          </div>
          <label htmlFor="toggle" className={classes.lien}>
            New to Cloneflix?
            <span id="toggle" className={classes.toggle} onClick={toggleHandler}>
              {' '}
              Sign up now.
            </span>
          </label>
        </form>
      </div>
    </div>
  );
};
export default Auth;
