import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import Link from 'next/link';
import classes from './Auth.module.css';
const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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

  const registration = async (email, password) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  };
  const resetFunction = () => {
    setEmail('');
    setConfirmation('');
    setPassword('');
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
  useEffect(() => {
    if (isEmailHasError || isPasswordHasError) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
    if (isEmailHasError || isPasswordHasError || confirmationError) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [isEmailHasError, isPasswordHasError, confirmationError]);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      resetFunction();
      if (checked) {
        localStorage.setItem('user', JSON.stringify({email, password}));
      }
    }

    try {
      const result = await registration(email, password);
      console.log(result);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <h2>Sign up</h2>
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
            autoComplete="off"
          />
          {isDirtyPaswword && isPasswordHasError && (
            <span className={classes.errors}>
              <br />
              {isPasswordHasError}
            </span>
          )}
          <br />
          <label>
            <input
              onChange={confirmationHandler}
              value={confirmation}
              onBlur={blurHandler}
              name="confirmation"
              type="password"
              autoComplete="off"
              placeholder="Confirmation"
            />
            {isDirtyConfirmation && confirmationError && (
              <span className={classes.errors}>
                <br />
                {confirmationError}
              </span>
            )}
            <br />
          </label>

          <br />
          <button disabled={!formIsValid} type="submit">
            Sign up
          </button>
          <div className={classes.checkbox}>
            <label>
              <input onChange={checkedHandler} checked={checked} type="checkbox" />
              <span>Remember Me</span>
            </label>
            <p>Need help?</p>
          </div>
          <label htmlFor="toggle" className={classes.lien}>
            New to Cloneflix?{' '}
            <Link href="/" passHref>
              <span>Sign in now.</span>
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
