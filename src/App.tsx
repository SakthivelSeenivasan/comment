/* eslint-disable @typescript-eslint/no-explicit-any */
import NewComment from "./components/NewComment";
import data from "./service/data/data.json";

function App() {
  return (
    <>
      <NewComment comments={data} />
    </>
  );
}

export default App;
