import React from 'react';
import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay} from '@fortawesome/free-solid-svg-icons';
import {faGrip} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {faTv} from '@fortawesome/free-solid-svg-icons';
import {faClapperboard} from '@fortawesome/free-solid-svg-icons';
import classes from './Navigation.module.css';
const Navigation = () => {
  return (
    <aside className={classes.navigation}>
      <nav>
        <ul>
          <Link href="/">
            <li>
              <figure>
                <FontAwesomeIcon icon={faCirclePlay} size="2x" />
              </figure>
            </li>
          </Link>
          <Link href="/main-page">
            <li>
              <figure>
                <FontAwesomeIcon icon={faGrip} size="2x" />
              </figure>
            </li>
          </Link>
          <Link href="/">
            <li>
              <figure>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
              </figure>
            </li>
          </Link>
          <Link href="/">
            <li>
              <figure>
                <FontAwesomeIcon icon={faCalendarDays} size="2x" />
              </figure>
            </li>
          </Link>
          <Link href="/">
            <li>
              <figure>
                <FontAwesomeIcon icon={faTv} size="2x" />
              </figure>
            </li>
          </Link>
          <Link href="/">
            <li>
              <figure>
                <FontAwesomeIcon icon={faClapperboard} size="2x" />
              </figure>
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};
export default Navigation;
