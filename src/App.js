import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import NewSeries from "./NewSeries";
import Series from "./Series";
import EditSeries from "./EditSeries";
import api from "./Api";

//functional-stateless component
const About = () => (
  <section className="intro-section" style={{ marginTop: 110 }}>
    <h2 className="text-center">SOBRE</h2>
  </section>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    api.loadGenres().then(res => {
      this.setState({
        isLoading: false,
        genres: res.data
      });
    });
  }

  renderGenreLink(genre) {
    return (
      <div>
        <Link key={genre} className="dropdown-item" to={`/series/${genre}`}>
          {genre}
        </Link>
        <div class="dropdown-divider" />
      </div>
    );
  }
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light mb-5">
            <a className="navbar-brand page-scroll" href="#page-top">
              <img src="/images/logo.png" height="30" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Series
                  </a>

                  {!this.state.isLoading && (
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      {this.state.genres.map(this.renderGenreLink)}
                    </div>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/new">
                    Nova série
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/series-edit/:id" component={EditSeries} />
          <Route path="/series/:genre" component={Series} />
          <Route exact path="/new" component={NewSeries} />
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
