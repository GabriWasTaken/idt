import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PokemonsList from "./components/PokemonsList";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PokemonsList />} />
            <Route path="/:id" element={<PokemonDetail />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
