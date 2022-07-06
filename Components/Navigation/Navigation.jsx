import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../../store/FirebaseStore';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay} from '@fortawesome/free-solid-svg-icons';
import {faGrip} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {faTv} from '@fortawesome/free-solid-svg-icons';

import {faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import classes from './Navigation.module.css';
const Navigation = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const logOut = async () => {
    await signOut(auth);
    setUser({});
    router.push('/signin');
  };
  return (
    <aside className={classes.navigation}>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <figure>
                <FontAwesomeIcon icon={faCirclePlay} size="2x" />
              </figure>
            </Link>
          </li>
          <li>
            <Link href="/main-page">
              <figure>
                <FontAwesomeIcon icon={faGrip} size="2x" />
              </figure>
            </Link>
          </li>
          <li>
            <Link href="/">
              <figure>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
              </figure>
            </Link>
          </li>
          <li>
            <Link href="/">
              <figure>
                <FontAwesomeIcon icon={faCalendarDays} size="2x" />
              </figure>
            </Link>
          </li>
          <li>
            <Link href="/">
              <figure>
                <FontAwesomeIcon icon={faTv} size="2x" />
              </figure>
            </Link>
          </li>
          {user ? (
            <li>
              <figure>
                <FontAwesomeIcon onClick={logOut} icon={faDoorOpen} size="2x" />
              </figure>
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>
    </aside>
  );
};
export default Navigation;
