import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {useSession, signOut} from 'next-auth/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay} from '@fortawesome/free-solid-svg-icons';
import {faGrip} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {faTv} from '@fortawesome/free-solid-svg-icons';

import {faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import classes from './Navigation.module.css';
const Navigation = () => {
  const {data: session, status} = useSession();

  const logoutHandler = async () => {
    await signOut();
  };
  return (
    <aside className={classes.navigation}>
      <nav>
        <ul>
          <li>
            <Link href="/" passHref>
              <figure>
                <FontAwesomeIcon icon={faCirclePlay} size="2x" />
              </figure>
            </Link>
          </li>
          <li>
            <Link href="/main-page" passHref>
              <figure>
                <FontAwesomeIcon icon={faGrip} size="2x" />
              </figure>
            </Link>
          </li>
          <li>
            <Link href="/search" passHref>
              <figure>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
              </figure>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <figure>
                <FontAwesomeIcon icon={faCalendarDays} size="2x" />
              </figure>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <figure>
                <FontAwesomeIcon icon={faTv} size="2x" />
              </figure>
            </Link>
          </li>
          {status === 'authenticated' && (
            <li>
              <Link href="/" passHref>
                <figure>
                  <FontAwesomeIcon onClick={logoutHandler} icon={faDoorOpen} size="2x" />
                </figure>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};
export default Navigation;
