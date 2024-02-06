import Post from "./Post/Post";
import "./Main.scss";

const Main = () => {
  return (
    <main className="main">
      <section className="main__posts">
        <Post />
      </section>
    </main>
  );
};

export default Main;
