import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import classes from './Carousel.module.css';

const Carousel = (props) => {
  const {genres, results} = props.movies;

  let img_url = 'https://image.tmdb.org/t/p/w500';

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    accessibility: true,
    slidesToShow: 6,
    slidesToScroll: 4,
  };
  return (
    <section className={classes.carousel}>
      <article>
        <h2>{genres.name || 'Action'}</h2>
      </article>
      <Slider {...settings}>
        {results.map((movie) => (
          <Link key={movie.id} href={`/main-page/${movie.id}`}>
            <figure>
              <Image
                quality={85}
                width={300}
                height={500}
                src={img_url.split(' ') + movie.poster_path}
                alt={movie.original_title}
                placeholder="blur"
                objectFit="contain"
                blurDataURL
                unoptimized
                loader={() => {
                  return `${img_url.split(' ') + movie.poster_path}`;
                }}
              />
              <figcaption>{movie.title}</figcaption>
            </figure>
          </Link>
        ))}
      </Slider>
    </section>
  );
};

export default React.memo(Carousel);
