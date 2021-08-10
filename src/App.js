import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieSearch from "./view/MovieSearch";
import MainView from "./view/MainView";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainView />
        </Route>
        <Route path="/movie-search">
          <MovieSearch />
        </Route>
      </Switch>
    </Router>
  );
}
