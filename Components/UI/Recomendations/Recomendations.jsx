import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import imageFake from '../../../public/Assets/movie-error.png';
import Fade from 'react-reveal/Slide';
import config from 'react-reveal/globals';

import classes from './Recomendations.module.css';
const Recommendations = ({recommendations}) => {
  config({ssrFadeout: true});
  const {results} = recommendations;
  let original_img_url = 'https://image.tmdb.org/t/p/original';
  if (!results) {
    return <p>Not found</p>;
  }
  return (
    <section className={classes.recommendations}>
      <div>
        <h2>More Like This</h2>
      </div>
      <Fade bottom>
        <ul>
          {results.map((movie) => {
            let imgSrs;
            if (movie.title === 'Il re del bosco: il porcino') {
              return;
            }
            if (movie.backdrop_path === null && movie.poster_path === null) {
              imgSrs = imageFake;
            } else {
              imgSrs = original_img_url.slice(' ') + movie.poster_path;
            }
            return (
              <Link key={movie.id} href={`/main-page/${movie.id}`}>
                <li>
                  {' '}
                  <Image
                    quality={85}
                    width={300}
                    height={500}
                    src={imgSrs}
                    alt={movie.original_title}
                    placeholder="blur"
                    objectFit="contain"
                    blurDataURL
                    unoptimized
                    loader={() => {
                      return `${imgSrs}`;
                    }}
                  />
                </li>
              </Link>
            );
          })}
        </ul>
      </Fade>
    </section>
  );
};
export default React.memo(Recommendations);
