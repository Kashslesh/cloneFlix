import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import classes from './Carousel.module.css';

const Carousel = ({movies}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    accessibility: true,
    slidesToShow: 5,
    slidesToScroll: 3,
  };
  return (
    <section className={classes.carousel}>
      <article>
        <h2>Test</h2>
      </article>
      <Slider {...settings}>
        {movies.map(({id, title, image}) => (
          <Link key={id} href={`/${id}`} passHref>
            <figure>
              <Image src={image} alt={image} />
              <figcaption>{title}</figcaption>
            </figure>
          </Link>
        ))}
      </Slider>
    </section>
  );
};
// export async function getStaticProps() {
//   return {
//     props: {
//       moviesObj: movies,
//     },
//     revalidate: 1,
//   };
// }
export default React.memo(Carousel);
