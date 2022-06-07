import React from 'react';
import Card from '../../Components/UI/Card/Card';
import Layout from '../../Components/Layout/Layout';
// export const getServerSideProps = async (context) => {

//   // let data = 'coucou';
//   // console.log(context.params);
//   // if (!data) {
//   //   return {
//   //     notFound: true,
//   //   };
//   // }
//   return {
//     props: {
//       data,
//     },
//   };
// };

const DetailPage = () => {
  return (
    <Layout>
      <Card>
        <p>Coucou</p>
      </Card>
    </Layout>
  );
};
export default DetailPage;
