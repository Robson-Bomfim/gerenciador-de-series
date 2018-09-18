import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "./Api";

const statuses = {
  watched: "Assistido",
  watching: "Assistindo",
  toWatch: "Assistir"
};

class Series extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      series: []
    };
    this.renderSeries = this.renderSeries.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({ isLoading: true });
    api.loadSeriesByGenre(this.props.match.params.genre).then(res => {
      this.setState({
        isLoading: false,
        series: res.data
      });
    });
  }

  deleteSeries(id) {
    api.deleteSeries(id).then(res => this.loadData());
  }

  renderSeries(series) {
    return (
      <div key={series.id} className="col-xs-4 col-md-4 col-lg-4">
        <div class="card">
          <img class="card-img-top" src={series.photo} alt="Card image cap" />
          <div class="card-body bg-light">
            <h4 className="group inner list-group-item-heading text-center">
              {series.name}
            </h4>
            <h6 class="card-subtitle mt-2 text-center">
              {series.genre} / {statuses[series.status]}{" "}
            </h6>
            <div className="row text-center">
              <div className="col-xs-12 col-md-6 mt-3">
                <Link
                  type="button"
                  className="btn btn-success"
                  to={"/series-edit/" + series.id}
                >
                  Editar
                </Link>
              </div>
              <div className="col-xs-12 col-md-6 mt-3">
                <a
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.deleteSeries(series.id)}
                >
                  Excluir
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section className="intro-section" style={{marginTop:110}}>
        <h2 className="text-center">
          SERIES {this.props.match.params.genre.toUpperCase()}
        </h2>
        {this.state.isLoading && <p>Carregando, aguarde...</p>}
        {!this.state.isLoading &&
          this.state.series.length === 0 && (
            <div className="alert alert-info">Nenhuma série cadastrada</div>
          )}
        <div className="container mt-4">
          <div className="row">
            {!this.state.isLoading && this.state.series.map(this.renderSeries)}
          </div>
        </div>
      </section>
    );
  }
}

export default Series;
