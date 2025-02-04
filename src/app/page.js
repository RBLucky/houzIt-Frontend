import NavBar from "./components/NavBar"
import SearchBar from "./components/SearchBar";

const Home = () => {
  return (
    <>
      <NavBar/>
      <SearchBar/>
      <main>
        <article></article>
        <article className="listings"></article>
      </main>
    </>
  );
}


export default Home;