import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './Recomendations.module.css';
const Recommendations = ({recommendations}) => {
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
      <ul>
        {results.map((movie) => {
          if (movie.title === 'Il re del bosco: il porcino') {
            return;
          } else {
            return (
              <Link key={movie.id} href={`/main-page/${movie.id}`}>
                <li>
                  {' '}
                  <Image
                    quality={85}
                    width={300}
                    height={500}
                    src={original_img_url.split(' ') + movie.poster_path}
                    alt={movie.original_title}
                    placeholder="blur"
                    objectFit="contain"
                    blurDataURL
                    unoptimized
                    loader={() => {
                      return `${original_img_url.split(' ') + movie.poster_path}`;
                    }}
                  />
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </section>
  );
};
export default React.memo(Recommendations);
