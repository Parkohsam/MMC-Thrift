import { Cards } from "./Component/Cards.tsx";
import { Home } from "./Component/Home.tsx";
import { NavBar } from "./Component/NavBar.tsx";

const App = () => {
  return (
    <div>
      <NavBar />
      <Home />
      <Cards />
    </div>
  );
};

export default App;
