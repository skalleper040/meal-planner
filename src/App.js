import React from 'react';

import Menu from './components/Menu';
import Days from './components/Days';
import ShoppingList from './components/ShoppingList';
import { cacheRecipes } from './util/APIUtil'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import Recipes from './util/recipes.json'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      days: [],
      isLoading: true,
      fetchError: false,
      units: 'metric'
    }
    this.saveDays = this.saveDays.bind(this);
    this.changeUnits = this.changeUnits.bind(this);
  }

  async componentDidMount() {
    await cacheRecipes()
      .then(result => {
        if (!result) {
          this.setState({
            fetchError: true
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
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

  saveRecipesToLs() {
    localStorage.setItem("breakfast-meals", JSON.stringify(Recipes))
    localStorage.setItem("lunch-meals", JSON.stringify(Recipes))
    localStorage.setItem("dinner-meals", JSON.stringify(Recipes))
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container p-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
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
                  units={this.state.units}
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
