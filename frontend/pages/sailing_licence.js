import { Page } from "../components/Page"
import { Article } from "../components/Article"
import { Alert } from "react-bootstrap";

// export const NUDGE_BOOK_LINK =
//   "https://www.amazon.co.uk/Nudge-Improving-Decisions-Health-Happiness/dp/0141040017/ref=sr_1_1?dchild=1&keywords=nudge&qid=1628957465&sr=8-1";
// export const HABIT_BOOK_LINK =
//   "https://www.amazon.com/Power-Habit-What-Life-Business/dp/081298160X";

export default function SailingLicence() {
  const articleId = 3;
  const RYA_COURSE_WEBSITE = "https://www.firstclasssailing.com/rya-courses";
  const ICC_WEBSITE = "https://www.rya.org.uk/knowledge/abroad/icc/icc-apply";
  const RADIO_LICENCE_WEBSITE =
    "https://www.firstclasssailing.com/rya-courses/vhf-radio-course";
  const INSURANCE_WEBSITE = "https://www.schomacker.de/en/";
  return (
    <Page>
      <Article heading={"From zero to skipper"} articleId={articleId}>
        <Alert variant="secondary">
          TLDR (with external links);
          <ol>
            <li>
              <a href={RYA_COURSE_WEBSITE}>Get the RYA Day Skipper licence</a>
            </li>
            <li>
              <a href={ICC_WEBSITE}>Get it internationally certified</a>
            </li>
            <li>
              <a href={RADIO_LICENCE_WEBSITE}>Get a radio licence</a>
            </li>
            <li>
              <a href={INSURANCE_WEBSITE}>Buy insurance</a>
            </li>
          </ol>
        </Alert>
        <p>
          I love sailing and I recommend it to everyone! Here&#39;s a short guide on
          everything you need to be able to become a licenced skipper and rent
          boats anywhere in the world!
        </p>
        <h2 id="licence">Get the RYA Day Skipper licence</h2>
        <p>
          The Day Skipper licence permits you to skipper a small yacht by day
          (as supposed to sailing at night). The course consits of two parts -
          theory and practical. Here&#39;s a <a href={RYA_COURSE_WEBSITE}>link</a>{" "}
          to the website I used to book all my courses.
        </p>
        <p>
          The theory can be done through classroom lessons or via a
          self-learning online tool. I went for classroom lessons - there were
          2hr classes every Monday after work for about 8 weeks. It was really
          interesting to learn more about the wind, tide, maps and sailing! The
          theory is completed with a theory exam (which most people pass).
        </p>
        <p>
          The practical is a 5 day course where an experience skipper shows you
          the ropes and helps you practice all the common manouvers - parking,
          adjusting the sails, navigating, man-over-board. I managed to do mine
          over a weekend + a bank holiday weekend (so I didn&#39;t need to take any
          extra holiday). I did my course in Southampton, sailing to the Isle of
          Wight. The most exciting part was when our propellor got entangled
          with a mooring bouys line during strong tide, effectively trapping our
          boat. We had to wait till the tide weakend and our brave skipper dove
          under the boat and managed to unwind the tangled mooring line, freeing
          our prop! Note to self - always sail with at least one experience
          sailer!
        </p>
        <h2 href="#international">Get the licence internationally certified</h2>
        <p>
          <i>
            The ICC (or to give it its full title International Certificate for
            Operators of Pleasure Craft) is a certificate which is intended to
            provide evidence of competence when requested by officials in
            foreign countries. It was historically known as the International
            Certificate of Competence.
          </i>{" "}
          Here&#39;s the <a href={ICC_WEBSITE}>link</a> to the RYA application for
          an ICC. Alternatively, you can pay about £40 pounds for a RYA
          Membership for 1 year and request for an ICC (included in your
          membership). You end up getting a shiny certificate that&#39;s much more
          impressive than the Day Skipper licence itself.
        </p>
        <h2 href="#radio">Get a radio licence</h2>
        <p>
          When sailing, at least one person on-board should be have a radio
          licence - typically this is the skipper. Its a{" "}
          <a href={RADIO_LICENCE_WEBSITE}>1 day course </a>
          with the test on the following day.
        </p>
        <h2 href="#insurance">Buy insurance!</h2>
        <p>
          I highly recommend this to avoid having (unexpectedly) expensive
          holidays when you rent a yacht. There are many kinds of insurance but
          the two that you need to cover the basics are:
        </p>
        <ul>
          <li>
            <b>Charter deposit</b> - if the yacht is damaged during the sailing
            trip, the charter company can keep the deposit you paid to rent the
            boat. This insurance guarantees that you don&#39;t lose this deposit if
            that should happen.
          </li>
          <li>
            <b>Skiller Liability</b> - this provides supplementary cover, in the
            case that the charter deposit is insufficient to cover any incidents
            - eg colliding with another yacht etc.
          </li>
        </ul>
        Here&#39;s a <a href={INSURANCE_WEBSITE}>link</a> to the insurance company I
        last used - they were great and handled my claim with ease (saving me
        about £1000 for scratching our yacht during parking)
      </Article>
    </Page>
  );
}
