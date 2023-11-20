import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/store";

import PokemonsList from "./components/PokemonsList";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PokemonsList />} />
              <Route path="/:id" element={<PokemonDetail />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </header>
    </div>
  );
}

export default App;
