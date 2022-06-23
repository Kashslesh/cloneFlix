import React from 'react';
import Card from '../../../Components/UI/Card/Card';
import Layout from '../../../Components/Layout/Layout';
import classes from './Movie.module.css';
let api_key = 'a91ae0cd304a8451a56aa5198ff1fa0a';
let original_img_url = 'https://image.tmdb.org/t/p/original';
export async function getServerSideProps({params}) {
  let movie_detail_http = 'https://api.themoviedb.org/3/movie';
  const request = await fetch(`${movie_detail_http}/${params.id}?api_key=${api_key}`);
  const data = await request.json();
  const img = original_img_url.slice(' ') + data.backdrop_path;
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      movie: data,
      img: img,
    },
  };
}

const MovieInfo = ({movie, img}) => {
  console.log(movie);
  if (!movie) {
    return <h2>Page is empty</h2>;
  } else {
    return (
      <Layout>
        <section style={{backgroundImage: `url(${img})`}} className={classes['section-main']}>
          <p>{movie.title}</p>
        </section>
        <section></section>
      </Layout>
    );
  }
};
export default MovieInfo;
