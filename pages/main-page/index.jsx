import Layout from '../../Components/Layout/Layout';
import React from 'react';
import Card from '../../Components/UI/Card/Card';
import Carousel from '../../Components/UI/Carousel/Carousel';

export const getServerSideProps = async () => {
  let api_key = 'a91ae0cd304a8451a56aa5198ff1fa0a';

  let original_img_url = 'https://image.tmdb.org/t/p/original';
  let genres_list_http = 'https://api.themoviedb.org/3/genre/movie/list?';
  let movie_genres_http = 'https://api.themoviedb.org/3/discover/movie?';

  const fetchRequest = await fetch(`${genres_list_http}api_key=${api_key}`);
  const fetchGenres = await fetchRequest.json();

  async function getData(url) {
    let page = Math.floor(Math.random() * 3) + 1;
    const arrOfPromises = fetchGenres.genres.map((item) =>
      fetch(`${url}api_key=${api_key}&with_genres=${item.id}&page=${page}`).then((response) =>
        response.json(),
      ),
    );

    const results = Promise.allSettled(arrOfPromises).then((data) => {
      const listOfMovies = data.map((item) => {
        const data = item.value;
        return data;
      });

      return listOfMovies;
    });

    return results;
  }
  const listMovies = await getData(movie_genres_http);
  const dataList = listMovies.map((movie, i) => {
    let data = movie;
    data.genres = fetchGenres.genres[i];
    return data;
  });
  if (!dataList) {
    return {
      notFound: true,
    };
  }
  return {
    props: {movies: dataList},
  };
};
const MainPage = ({movies}) => {
  return (
    <Layout>
      {movies.map((item) => (
        <Card key={item.genres.id}>
          <Carousel movies={item} />
        </Card>
      ))}
    </Layout>
  );
};
export default MainPage;
