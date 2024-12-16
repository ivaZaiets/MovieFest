import { StrictMode } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import WatchList from "./pages/WatchList";
import "./styles/index.scss";

const Root = () => {
  return (
    <Provider store={store}>
      <StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="movies">
                <Route path=":movieId" element={<MoviePage />} />
              </Route>
              <Route path="watchlist" element={<WatchList />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </Router>
      </StrictMode>
    </Provider>
  );
};

export default Root;
