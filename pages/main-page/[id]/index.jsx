import React from 'react';
import Layout from '../../../Components/Layout/Layout';
import Recommendations from '../../../Components/UI/Recomendations/Recomendations';
import TitleMovie from '../../../Components/UI/TitleMovie/TitleMovie';
import classes from './Movie.module.css';
import imageFake from '../../../public/Assets/movie-error.png';
let api_key = 'a91ae0cd304a8451a56aa5198ff1fa0a';
let original_img_url = 'https://image.tmdb.org/t/p/original';
export async function getServerSideProps({params}) {
  let movie_detail_http = 'https://api.themoviedb.org/3/movie';
  const request = await fetch(`${movie_detail_http}/${params.id}?api_key=${api_key}`);
  const recommendations = await fetch(
    `${movie_detail_http}/${params.id}/recommendations?api_key=${api_key}`,
  );
  const dataRecommendations = await recommendations.json();
  const data = await request.json();
  let img;
  if (data.backdrop_path === null && data.poster_path === null) {
    img = imageFake.src;
  } else if (data.poster_path !== null) {
    img = original_img_url.slice(' ') + data.backdrop_path;
  } else {
    img = original_img_url.slice(' ') + data.poster_path;
  }
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      movie: data,
      img: img,
      recommendation: dataRecommendations,
    },
  };
}

const MovieInfo = ({movie, img, recommendation}) => {
  if (!movie) {
    return <h2>Page is empty</h2>;
  } else {
    return (
      <Layout>
        <section style={{backgroundImage: `url(${img})`}} className={classes['section-main']}>
          <TitleMovie movieInfo={movie} />
        </section>
        <section>
          <Recommendations recommendations={recommendation} />
        </section>
      </Layout>
    );
  }
};
export default MovieInfo;
