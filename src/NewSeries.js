import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import api from "./Api";

const statuses = {
  watched: "Assistido",
  watching: "Assistindo",
  toWatch: "Assistir"
};

class NewSeries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      isLoading: false,
      redirect: false
    };
    this.saveSeries = this.saveSeries.bind(this);
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

  saveSeries() {
    const newSeries = {
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      photo: this.refs.photo.value,
      comments: this.refs.comment.value
    };
    api.saveSeries(newSeries).then(res => {
      this.setState({
        redirect: "/series/" + this.refs.genre.value
      });
    });
  }

  render() {
    return (
      <section className="intro-section" style={{ marginTop: 110 }}>
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <h2 className="mb-4 text-center">NOVA SERIE</h2>
        <div className="card mt-2">
          <form className="px-4 py-3">
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  ref="name"
                  className="form-control"
                  name="name"
                  id="name"
                />
              </div>
              <div className="form-group col-md-4">
                <div className="mt-5 text-center">
                  <label className="mr-2" htmlFor="status">
                    Status:
                  </label>
                  <select ref="status" id="status">
                    {Object.keys(statuses).map(key => (
                      <option key={key} value={key}>
                        {statuses[key]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="photo">Link/Foto:</label>
                <input
                  type="text"
                  ref="photo"
                  className="form-control"
                  name="photo"
                  id="photo"
                />
              </div>
              <div className="form-group col-md-4">
                <div className="mt-5 text-center">
                  <label className=" mr-2" htmlFor="genre">
                    Genêro:
                  </label>
                  <select ref="genre" id="genre">
                    {this.state.genres.map(key => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Comentários:</label>
              <textarea ref="comment" className="form-control" />
            </div>

            <button
              type="button"
              className="btn btn-block btn-success"
              onClick={this.saveSeries}
            >
              Salvar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default NewSeries;
