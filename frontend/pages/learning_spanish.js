import { Page } from "../components/Page"
import { Article } from "../components/Article"
import { Alert } from "react-bootstrap";

export const NUDGE_BOOK_LINK =
  "https://www.amazon.co.uk/Nudge-Improving-Decisions-Health-Happiness/dp/0141040017/ref=sr_1_1?dchild=1&keywords=nudge&qid=1628957465&sr=8-1";
export const HABIT_BOOK_LINK =
  "https://www.amazon.com/Power-Habit-What-Life-Business/dp/081298160X";

export default function LearningSpanishPage() {
  const articleId = 1;

  return (
    <Page>
      <Article
        heading={"Learning Spanish in my free time"}
        articleId={articleId}
      >
        <Alert variant="secondary">
          TLDR; I changed the default language on my phone to Spanish and I
          formed a habit of practicing with spaced-repetition for 15mins
          everyday.
          <br></br>
          <a href={HABIT_BOOK_LINK}>📚 The Power of Habit</a>
          <br></br>
          <a href={NUDGE_BOOK_LINK}>📚 Nudge</a>
          <br></br>
          <a href="https://www.memrise.com/">📱 Memrise</a>
        </Alert>
        <p>
          Learning languages is fun, especially when you learn the funny sayings
          and insults of another culture! Here I share{" "}
          <a href="#hard" className="p-link">
            why I found it hard
          </a>{" "}
          and what I did to{" "}
          <a href="#easier" className="p-link">
            make it easier
          </a>
          . Hope this helps you on your language learning journey!
        </p>
        <h2 id="hard">Its hard work </h2>
        <p>
          Learning a new language takes a long time (years of practice if you
          wish to be fluent). Working towards a long-term goal is hard.
        </p>
        <p>For me, the biggest challenges were:</p>
        <ol>
          <li>
            <b>Prioritizing time regularly to learn.</b> Like everybody else,
            I&#39;m busy with various things everyday. There&#39;s always something else
            to do.
          </li>
          <li>
            {" "}
            <b>The activation energy to actually do it.</b> Its just easier to
            just watch some Netflix. After a day of work, I just want to chill.{" "}
          </li>
        </ol>
        <h2 id="easier"> How I made it easier </h2>
        <p>
          I made learning as automated and easy as possible. These baby steps
          improved my Spanish so that I was comfortable with causal conversation
          within a year. Here&#39;s what I did.
        </p>
        <h3>Using defaults</h3>
        <p>
          <b>I changed my phone&#39;s default language to Spanish</b> (kudos to R
          for this idea). This meant that I was automatically learning and
          practicing Spanish, <b>everytime I used my phone</b>. In the book
          <a href={NUDGE_BOOK_LINK} className="p-link">
            {" "}
            Nudge
          </a>
          , Cass R. Sunstein and Richard H. Thaler (winner of the 2017 Nobel
          Prize in Economics) explain how <b>defaults</b> are a powerful tool in
          decision making. Since they do not require any effort by the decision
          maker, the <i>inaction</i> is an effective <i>nudge</i>. For me, this{" "}
          <b>
            removed the inertia to practice Spanish - by default, I was
            consuming Spanish everyday
          </b>{" "}
          (my phone is still in Spanish today).
        </p>
        <p>
          It might sound like a drastic change, but actually it&#39;s pretty easy to
          use your phone in another language. Most UI&#39;s are well designed these
          days, meaning you can easily guess the meaning of buttons in Apps (eg{" "}
          <i>Buscar aqui</i> on the search bar on Google Maps would be &#34;Search
          here&#34;). I learnt a lot of useful verbs (send, cancel, delete, receive,
          find, make etc) just from having seen them on my phone.
        </p>
        <h3>Forming habits</h3>
        <p>
          <b>
            I built a habit of using{" "}
            <a href="https://www.memrise.com/" className="p-link">
              Memrise
            </a>{" "}
            while commuting everyday
          </b>
          . Back in 2017, I was taking a train to a client&#39;s office everyday.
          For the first 15mins after getting on the train, I would play on
          Memrise.
          <b> Its easy to prioritize just spending 15 mins </b>
          (after which I would go back to reading the BBC or scrolling Twitter).
          And once I made this habit, it was even easier. If you want to learn
          more about how habits can change people and organisations, I highly
          recommend reading{" "}
          <a href={HABIT_BOOK_LINK} className="p-link">
            The Power of Habit
          </a>
          ! The incremental gains of this habit increased my vocab
          significantly.
        </p>{" "}
        <p>
          <b>Memrise is a fantastic app</b>. It uses <b>spaced repetition</b>,
          recordings of native speakers and it taught me phrases used everday in
          Spanish. Its learning algorithm will test you at the right timings to
          train your memory effectively. I cannot recommend it enough (its much
          better than Duolingo!).
        </p>
      </Article>
    </Page>
  );
}
