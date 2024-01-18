import Head from "next/head";
import Header from "../components/Header";
import Tweets from "../components/Tweets";
import { useEffect, useState } from "react";
import { getLatestTweets } from "../utils/apiRequest";

export default function Home() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getLatestTweets().then(setTweets);
  }, []);

  return (
    <div>
      <Head>
        <title>YuriYeh UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Tweets tweets={tweets} />
      </main>
    </div>
  );
}
