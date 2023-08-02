import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fin' Dining</title>
        <meta
          name="description"
          content="Fin' Dining enables UTK students to find dining location information quick and easy."
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bitter"></link>
      </Head>
      <h5>Home</h5>
    </>
  );
}

export default Home;