import { Page } from "../components/Page"
import { Article } from "../components/Article"
import { Alert } from "react-bootstrap";
import { InsultRoulette } from "../components/InsultRoulette.js";

export default function SpanishSlangPage() {
  const articleId = 2;
  return (
    <Page>
      <Article
        heading={"Sound like a native - Spanish slang"}
        articleId={articleId}
      >
        <p>
          Native speakers use informal words and phrases <i>all the time</i>. So
          here are some phrases I learnt while spending time with my partner&#39;s
          family! Hope this helps you on your Spanish-learning journey!
        </p>
        <Alert variant="secondary">
          This article is a follow-up of{" "}
          <Alert.Link href="/articles">
            Learning Spanish in my free time
          </Alert.Link>
          . Maybe have a read?
        </Alert>
        <ol>
          <li>
            <a href="#slang">Common slang and phrases</a>
          </li>
          <li>
            <a href="#insults">Mild insults</a>
          </li>
          <li>
            <a href="#sayings">Fun sayings</a>
          </li>
          <li>
            <a href="#bonus">Bonus phrases</a>
          </li>
        </ol>
        <h2 id="slang">Common slang and phrases</h2>

        <p>Here are some of the most popular slang/phrases.</p>

        <p>
          <b>🆒 Que chulo/commo mola/guay (how cool)</b> = Cool! You hear this{" "}
          <i>all the time</i> in conversation <i>Que chulo!</i>
        </p>

        <p>
          <b>🕶️ Tio/Tia (uncle/aunt)</b> Just like you would use <i>dude</i> in
          English.{" "}
        </p>

        <p>
          <b>😜 Que morro (how cheeky)</b> = I don&#39;t have a good example for
          this, but apparently I&#39;m quite cheeky.
        </p>

        <p>
          <b>🍑 Quinto culo (fifth buttock)</b> = In the middle of nowhere/far
          away. eg When you explain where your Spanish partner&#39;s family live{" "}
          <i>Esta en el quinto culo</i>.
        </p>

        <p>
          <b>🥚 Pisando huevos (stepping on eggs/balls)</b> = Going extremely
          slowly. Eg the car in front of you is going at a snails pace, you
          might retort <i>Este coche esta pisando huevos.</i>
        </p>

        <p>
          <b>🥛 Cagando leche (crapping milk)</b> = Going very fast. Eg{" "}
          <i>Este coche esta cagando leche.</i>{" "}
        </p>

        <p>
          <b>👊🏼 Da una leche (give a milk)</b> = Hit something/someone.
        </p>

        <p>
          <b>👵 En el año catapún (From the year of the catapún?)</b> = Aaages
          ago. Eg whenever Abuela teaches me a (ancient, unused) phrase, my
          partner usually snorts and says{" "}
          <i>&#34;No apprendes eso, es del año catapún&#34;.</i>{" "}
        </p>

        <p>
          <b>🤪 Perdiendo la olla (losing the pot)</b> = You are losing the
          plot/ you are getting confused.
        </p>

        <p>
          <b>🐐 Como una cabra (like a goat)</b> = Someone was &#34;being nuts&#34;.
          Similarly, <i>Cabrearse</i> (to become a goat) means to get
          upset/pissed off.
        </p>

        <h2 id="insults">Mild insults</h2>
        <p>
          You can easily find or Google Translate your choice of insults, but it
          shows extra class if you can use the milder ones. Here&#39;s a choice
          platter of mild insults.{" "}
        </p>
        <InsultRoulette />

        <h2 id="sayings">Fun sayings</h2>
        <p>
          These are sayings I learnt from my partner&#39;s family (Extra points if
          you can guess which ones are from La Abuela/grandma).{" "}
        </p>
        <p>
          <b>🤪 Cada loca, su tema</b> = Every crazy person has their theme.{" "}
        </p>
        <p>
          <b>🐞 Bicho malo, nunca muere</b> = Bad creepy crawlers never die.
          Undesirable people never leave. E.g. you have a bad boss and they
          never leave the company.{" "}
        </p>
        <p>
          <b>🐱 El Gato escaldado, del agua fria huye</b> = The burnt cat runs
          away from cold water. Meaning: Once burnt, twice shy.{" "}
        </p>
        <p>
          <b>🐑 Oveja que bala, bocada se pierda</b> = The bleating sheep loses
          a mouthfull. If there&#39;s hardly any chatting over a meal, this phrase
          can be said.{" "}
        </p>
        <p>
          <b>🐂 Torrero que duda, cornada segura!</b> = The Bullfighter who
          doubts, is one who will surely be skewered! Don&#39;t doubt it, just do
          it.{" "}
        </p>
        <p>
          <b>⛵ Donde hay patron, no mandan marineros</b> = Where there is a
          captain, the sailers don&#39;t make orders. When there is a boss/leader,
          the minions don&#39;t make the orders.{" "}
        </p>
        <p>
          <b>
            🔨 A dios rogando y con el mazo dando (Praying to God and hitting
            with the hammer)
          </b>{" "}
          = You have to take action yourself, even while you&#39;re praying to God
          for help.{" "}
        </p>

        <h2 id="bonus">Bonus phrases</h2>
        <p>Extra phrases if you&#39;re craving for more juicy titbits.</p>
        <p>
          <b>Estas commo un tren (you&#39;re like a train) </b> = You&#39;re hot. Eg
          When I met La Abuela for the first time, my partner thought this was a
          great line to tell her.
        </p>
        <p>
          <b>🌈 Estoy flipando en colores (I&#39;m flipping in colours)</b> =
          Exclamation of surprise/astonishment. Eg a cousin of my partner
          actually said this to me (with her jaw dropping) when we met for the
          first time and I spoke Spanish to her all casual like.{" "}
        </p>
        <p>
          <b>Tirarse del plano</b> = Dive into. Eg if there was some delicious
          pudding, you might say Eg{" "}
          <i>Voy a tirarse del plano a este postre.</i>{" "}
        </p>
        <p>
          <b>🪰 Ponerse de mosca (to become a fly)</b> = Get enraged.{" "}
        </p>
        <p>
          <b>Si eres guapo, y eres rico, que mas quieres Frederico!</b> = If
          you&#39;re handsome and you&#39;re rich, what more do you need Frederico!?{" "}
        </p>
      </Article>
    </Page>
  );
}
