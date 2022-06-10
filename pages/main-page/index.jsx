import Layout from '../../Components/Layout/Layout';
import React from 'react';
import Card from '../../Components/UI/Card/Card';
import Carousel from '../../Components/UI/Carousel/Carousel';

export const getStaticProps = async () => {
  let api_key = 'a91ae0cd304a8451a56aa5198ff1fa0a';

  let img_url = 'https://image.tmdb.org/t/p/w500';
  let original_img_url = 'https://image.tmdb.org/t/p/original';
  let genres_list_http = 'https://api.themoviedb.org/3/genre/movie/list?';
  let movie_genres_http = 'https://api.themoviedb.org/3/discover/movie?';
  let movie_detail_http = 'https://api.themoviedb.org/3/movie';

  const fetchRequest = await fetch(`${genres_list_http}api_key=${api_key}`);
  let fetchGenres = await fetchRequest.json();

  async function getData(url) {
    let page = Math.floor(Math.random() * 3) + 1;
    const arrOfPromises = fetchGenres.genres.map((item) =>
      fetch(`${url}api_key=${api_key}&with_genres=${item.id}&page=${page}`).then((response) =>
        response.json(),
      ),
    );

    return Promise.allSettled(arrOfPromises).then((data) => {
      const listOfMovies = data.map((item) => {
        const data = item.value.results;
        return data;
      });
      return listOfMovies;
    });
  }
  const list = await getData(movie_genres_http);
  console.log(list);

  if (!fetchGenres) {
    return {
      notFound: true,
    };
  }
  return {
    props: {movies: list},
  };
};
const MainPage = ({movies
}) => {
  console.log(movies);
  // const movies = [
  //   {
  //     id: 1,
  //     image:
  //       'https://img4.goodfon.ru/wallpaper/big/0/96/gory-ozero-most-dal-shirokoformatnye-hdr-ultra-hd-voda.jpg',
  //     imageBg: '/images/slide1b.webp',
  //     title: '1983',
  //   },
  //   {
  //     id: 2,
  //     image:
  //       'https://img4.goodfon.ru/wallpaper/big/6/59/reka-osen-reka-v-gorakh-reka-v-lesu-kamni-vodopad-voda-les-h.jpg',
  //     imageBg: '/images/slide2b.webp',
  //     title: 'Russian doll',
  //   },
  //   {
  //     id: 3,
  //     image:
  //       'https://img4.goodfon.ru/wallpaper/big/3/cb/reka-osen-reka-v-gorakh-reka-v-lesu-kamni-vodopad-voda-les-1.jpg',
  //     imageBg: '/images/slide3b.webp',
  //     title: 'The rain',
  //   },
  //   {
  //     id: 4,
  //     image:
  //       'https://img5.goodfon.ru/wallpaper/big/7/e3/sobaka-frantsuzskii-buldog-buldog-kravat-vzgl.jpg',
  //     imageBg: '/images/slide4b.webp',
  //     title: 'Sex education',
  //   },
  //   {
  //     id: 5,
  //     image:
  //       'https://img3.goodfon.ru/wallpaper/big/d/33/wallpaper-4k-roof-bold-lines-mountain-futuristic-look-comfor.jpg',
  //     imageBg: '/images/slide5b.webp',
  //     title: 'Elite',
  //   },
  //   {
  //     id: 6,
  //     image:
  //       'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
  //     imageBg: '/images/slide6b.webp',
  //     title: 'Black mirror',
  //   },
  //   {
  //     id: 6,
  //     image:
  //       'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
  //     imageBg: '/images/slide6b.webp',
  //     title: 'Black mirror',
  //   },
  //   {
  //     id: 6,
  //     image:
  //       'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
  //     imageBg: '/images/slide6b.webp',
  //     title: 'Black mirror',
  //   },
  //   {
  //     id: 6,
  //     image:
  //       'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
  //     imageBg: '/images/slide6b.webp',
  //     title: 'Black mirror',
  //   },
  //   {
  //     id: 6,
  //     image:
  //       'https://img1.goodfon.ru/wallpaper/big/a/91/stick-weapon-actor-gun-martial-artist-film-cinema-fight-man.jpg',
  //     imageBg: '/images/slide6b.webp',
  //     title: 'Black mirror',
  //   },
  // ];
  return (
    <Layout>
      <Card>
        <Carousel movies={movies} />
      </Card>
    </Layout>
  );
};
export default MainPage;
