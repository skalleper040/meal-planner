import React from 'react';

import Menu from './components/Menu';
import Days from './components/Days';
import ShoppingList from './components/ShoppingList';
import { cacheMeal } from './util/APIUtil'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      days: [],
      isLoading: true,
      fetchError: false,
      units: 'metric',
      progress: 10
    }
    this.saveDays = this.saveDays.bind(this);
    this.changeUnits = this.changeUnits.bind(this);
  }

  async componentDidMount() {
    let dishTypes = ['breakfast', 'lunch', 'dinner'];

    for (let i = 0; i < dishTypes.length; i++) {
      await cacheMeal(dishTypes[i])
        .then(result => {
          if (!result) {
            this.setState({
              fetchError: true,
              isLoading: false
            })
            return
          }
          this.setState({
            progress: this.state.progress + 28
          })
        })
    }

    this.setState({
      isLoading: false
    })
  }

  changeUnits(units) {
    this.setState({
      units: units
    })
  }

  saveDays(days) {
    this.setState({
      days: days
    })
  }

  render() {
    const progress = this.state.progress;
    console.log(progress);
    if (this.state.isLoading) {

      return (
        <div className="container p-4">
          <div className="d-flex w-100 bg-light rounded">
            <div className="progress bg-dark">
              <div className="progress-bar progress-bar-animated progress-bar-striped bg-danger" role="progressbar" style={ {width: this.state.progress + 'vw'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.fetchError) {
      return (
        <div className="alert alert-danger">
          <strong>Error!</strong> A problem has been occurred while fetching data.
        </div>
      );
    } else {
      return (
        <div className="container-lg p-4">
          <Router>
            <Menu
              units={this.state.units}
              changeUnits={this.changeUnits} />
            <Switch>
              <Route render={() =>
                <ShoppingList
                  units={this.state.units} d
                  days={this.state.days}
                />}
                path="/shopping-list"
              />
              <Route render={() =>
                <Days
                  days={this.state.days}
                  units={this.state.units}
                  saveDays={this.saveDays}
                />}
                path="/"
              />
            </Switch>
          </Router>
        </div>
      );
    }
  }
}

export default App;
