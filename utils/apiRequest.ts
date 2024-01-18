import axios from "axios";

export function getLatestTweets() {
  return axios
    .get("https://api.twitter.com/1.1/statuses/user_timeline.json", {
      params: {
        screen_name: "yeh_on_ftm",
        count: 5,
      },
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`,
      },
    })
    .then((response) => response.data);
}
