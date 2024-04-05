import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <div className="overflow-hidden h-[100rem]">
      <Header />

      <section className="mt-[10rem]">
        <MoviesContainerPage />
      </section>
    </div>
  );
};

export default Home;
