type Tweet = { id: string; text: string };

interface TweetsProps {
  tweets: Tweet[];
}

export default function Tweets({ tweets }: TweetsProps) {
  return (
    <section>
      {tweets.map((tweet) => (
        <article key={tweet.id}>
          <p>{tweet.text}</p>
        </article>
      ))}
    </section>
  );
}
