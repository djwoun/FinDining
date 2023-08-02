import { NextPage } from "next";
import HelloWorld from "../../components/HelloWorld";
import { getHelloWorld } from "../../server/actions/HelloWorld";

interface Props {
  helloWorld: string;
}

const Hello: NextPage<Props> = ({ helloWorld }) => {
  return (
    <>
      <HelloWorld />
      <h5>{helloWorld}</h5>
    </>
  );
}

export async function getStaticProps() {
  try {
    const helloWorld: string | void = await getHelloWorld(2);
    
    return {
      props: {
        helloWorld: JSON.parse(JSON.stringify(helloWorld)) as string
      },
      revalidate: 1
    }
  } catch (error) {
    return {
      props: {},
      revalidate: 1
    };
  }
}

export default Hello;