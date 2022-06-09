import Layout from '../../Components/Layout/Layout';
import React from 'react';
import Card from '../../Components/UI/Card/Card';
import Carousel from '../../Components/UI/Carousel/Carousel';

export const getStaticProps = async () => {
  const fetchMoviesFunction = async (url, key, id) => {
    let page = Math.floor(Math.random() * 3) + 1;
    const request = await fetch(`${url}api_key=${key}&with_genres=${id}&page=${page}`);
    const data = await request.json();
    // const dataStr = JSON.stringify(data);
    return data;
  };
  let api_key = 'a91ae0cd304a8451a56aa5198ff1fa0a';

  let img_url = 'https://image.tmdb.org/t/p/w500';
  let original_img_url = 'https://image.tmdb.org/t/p/original';
  let genres_list_http = 'https://api.themoviedb.org/3/genre/movie/list?';
  let movie_genres_http = 'https://api.themoviedb.org/3/discover/movie?';
  let movie_detail_http = 'https://api.themoviedb.org/3/movie';

  const fetchRequest = await fetch(`${genres_list_http}api_key=${api_key}`);
  let fetchGenres = await fetchRequest.json();
  let test = await fetchMoviesFunction(movie_genres_http, api_key, fetchGenres.genres[0].id);

  // fetchGenres.genres.forEach((item) => {
  //   fetchMoviesFunction(movie_genres_http, api_key, item.id);
  // });

  // const fetchMoviesListByGenres = async (id, genres) => {
  // const request = fetch(
  //   movie_genres_http +
  //     new URLSearchParams({
  //       api_key: api_key,
  //       with_genres: id,
  //       page: Math.floor(Math.random() * 3) + 1,
  //     }),
  // );
  // genres.forEach(item => {
  // const requestThrowGenres = async()=>{

  //   // fetch(
  //   //   `${movie_genres_http}api_key=${api_key}&with_genres=${item.id}`,
  //   //   );
  //   }
  // const data = await requestThrowGenres.json();
  // return data

  // });
  // https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
  // fetch(
  //   genres_list_http +
  //     new URLSearchParams({
  //       api_key: api_key,
  //     }),
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     data.genres.forEach((item) => {
  //       fetchMoviesListByGenres(item.id, item.name);
  //     });
  //   });
  // let data= null;
  // const fetchMoviesListByGenres = async (id, genres) => {
  //   const request = fetch(
  //     movie_genres_http +
  //       new URLSearchParams({
  //         api_key: api_key,
  //         with_genres: id,
  //         page: Math.floor(Math.random() * 3) + 1,
  //       }),
  //   );

  // };

  //   .catch((err) => {
  //     return {
  //       notFound: true,
  //     };
  //   });

  if (!fetchGenres) {
    return {
      notFound: true,
    };
  }
  return {
    props: {movies: test},
  };
};
const MainPage = () => {
  const movies = [
    {
      id: 1,
      image:
        'https://img4.goodfon.ru/wallpaper/big/0/96/gory-ozero-most-dal-shirokoformatnye-hdr-ultra-hd-voda.jpg',
      imageBg: '/images/slide1b.webp',
      title: '1983',
    },
    {
      id: 2,
      image:
        'https://img4.goodfon.ru/wallpaper/big/6/59/reka-osen-reka-v-gorakh-reka-v-lesu-kamni-vodopad-voda-les-h.jpg',
      imageBg: '/images/slide2b.webp',
      title: 'Russian doll',
    },
    {
      id: 3,
      image:
        'https://img4.goodfon.ru/wallpaper/big/3/cb/reka-osen-reka-v-gorakh-reka-v-lesu-kamni-vodopad-voda-les-1.jpg',
      imageBg: '/images/slide3b.webp',
      title: 'The rain',
    },
    {
      id: 4,
      image:
        'https://img5.goodfon.ru/wallpaper/big/7/e3/sobaka-frantsuzskii-buldog-buldog-kravat-vzgl.jpg',
      imageBg: '/images/slide4b.webp',
      title: 'Sex education',
    },
    {
      id: 5,
      image:
        'https://img3.goodfon.ru/wallpaper/big/d/33/wallpaper-4k-roof-bold-lines-mountain-futuristic-look-comfor.jpg',
      imageBg: '/images/slide5b.webp',
      title: 'Elite',
    },
    {
      id: 6,
      image:
        'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
      imageBg: '/images/slide6b.webp',
      title: 'Black mirror',
    },
    {
      id: 6,
      image:
        'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
      imageBg: '/images/slide6b.webp',
      title: 'Black mirror',
    },
    {
      id: 6,
      image:
        'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
      imageBg: '/images/slide6b.webp',
      title: 'Black mirror',
    },
    {
      id: 6,
      image:
        'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
      imageBg: '/images/slide6b.webp',
      title: 'Black mirror',
    },
    {
      id: 6,
      image:
        'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
      imageBg: '/images/slide6b.webp',
      title: 'Black mirror',
    },
  ];
  return (
    <Layout>
      <Card>
        <Carousel movies={movies} />
      </Card>
    </Layout>
  );
};
export default MainPage;
