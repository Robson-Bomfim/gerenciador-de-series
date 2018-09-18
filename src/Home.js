import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <section
          id="intro"
          className="intro-section text-center"
          style={{ marginTop: 150 }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>
                  <img src="images/logo.png" />
                </h1>
                <p>
                  Nunca mais esqueça uma série que você assistiu ou que alguém
                  lhe indicou.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
