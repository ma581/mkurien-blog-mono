import { Page } from "../components/Page"
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head><title>About</title></Head>
      <Page>
        <p>Hi, I&#39;m Manoj.</p>
        <p>
          I&#39;m an engineer and I love learning and problem solving. Here, I share some things I&#39;ve enjoyed learning. This blog takes a lot of inspiration
          from <a href="https://brianlovin.com/">brianlovin.com</a>.
        </p>
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <p>
          🐦 You can also follow me on{" "}
          <a href="https://twitter.com/mshokk">Twitter</a>.
        </p>
        <p>v1.1</p>
      </Page>
    </>
  );
}

