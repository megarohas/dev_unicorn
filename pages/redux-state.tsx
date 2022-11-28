import { useSelector } from "react-redux";
import Link from "next/link";
import { Spacer, ModuleTitle, Code } from "../components/layout/layout_sc";

const codeStyle = {
  background: "#ebebeb",
  width: "100%",
  padding: 10,
  border: "1px solid grey",
  marginBottom: 10,
};

const ShowReduxState = () => {
  const state = useSelector((state) => state);

  return (
    <>
      <ModuleTitle>Redux State</ModuleTitle>
      <Spacer />
      <Code>{JSON.stringify(state, null, 4)}</Code>
      <Spacer />
      <Link href="/">
        <a>Go Back Home</a>
      </Link>
    </>
  );
};

export default ShowReduxState;
