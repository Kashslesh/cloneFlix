import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {signIn} from 'next-auth/react';
import classes from './Auth.module.css';
const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailHasError, setIsEmailHasError] = useState(
    'Please enter a valid email or phone number.',
  );
  const [isPasswordHasError, setIsPasswordHasError] = useState(
    'Your password must contain between 4 and 60 characters.',
  );
  const [checked, setChecked] = useState(false);
  const [isDirtyEmail, setIsDirtyEmail] = useState(false);
  const [isDirtyPaswword, setIsDirtyPassword] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const resetFunction = () => {
    setEmail('');
    setPassword('');
  };
  const blurHandler = (event) => {
    if (event.target.name === 'email') {
      setIsDirtyEmail(true);
    }
    if (event.target.name === 'password') {
      setIsDirtyPassword(true);
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
  const checkedHandler = () => {
    setChecked(!checked);
  };
  let storeLocal;
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      return;
    } else {
      storeLocal = JSON.parse(localStorage.getItem('user'));
      setEmail(storeLocal.email);
      setPassword(storeLocal.password);
      setChecked(true);
    }
  }, []);
  useEffect(() => {
    if (isEmailHasError || isPasswordHasError) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [isEmailHasError, isPasswordHasError]);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });
      if (result.ok) {
        router.push('/main-page');
      }
      resetFunction();

      if (checked) {
        localStorage.setItem('user', JSON.stringify({email, password}));
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <h2>Sign In</h2>
        <form onSubmit={submitHandler}>
          <input
            value={email}
            onBlur={blurHandler}
            onChange={emailHandler}
            name="email"
            type="email"
            placeholder="Email"
          />
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
            autoComplete="on"
          />
          {isDirtyPaswword && isPasswordHasError && (
            <span className={classes.errors}>
              <br />
              {isPasswordHasError}
            </span>
          )}

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
            <Link href="/signup" passHref>
              <span>Sign up now.</span>
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
