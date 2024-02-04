import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Aside from "./components/Aside/Aside";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Main />
        <Aside />
      </div>
    </div>
  );
}

export default App;
