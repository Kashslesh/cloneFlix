import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import classes from './Carousel.module.css';

const Carousel = (props) => {
  const myLoader = ({src}) => {
    return src.image;
  };
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
        {props.movies.map((item) => (
          <Link key={item.id} href={`/${item.id}`} passHref>
            <figure>
              <Image
                quality={75}
                layout="fill"
                src={item.image}
                alt={item.image}
                placeholder="blur"
                objectFit="contain"
                blurDataURL
                loader={myLoader}
              />
              <figcaption>{item.title}</figcaption>
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
