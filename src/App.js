import React from 'react';

import Menu from './components/Menu';
import Days from './components/Days';
import ShoppingList from './components/ShoppingList';
import { cacheRecipes } from './util/APIUtil'

import './App.css';

import Recipes from './util/recipes.json'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDays: true,
      showShoppingList: false,
      days: [],
      isLoading: true,
      fetchError: false,
      units: 'metric'
    }
    this.saveDays = this.saveDays.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
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


  toggleShow() {
    this.setState({
      showDays: !this.state.showDays,
      showShoppingList: !this.state.showShoppingList
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
        <div className="container p-4 bg-light">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container p-4">
          <Menu
            units={this.state.units}
            changeUnits={this.changeUnits}
            toggleShow={this.toggleShow}
            showDays={this.state.showDays}
            showShoppingList={this.state.showShoppingList} />
          <Days
            units={this.state.units}
            show={this.state.showDays}
            saveDays={this.saveDays} />
          <ShoppingList
            units={this.state.units}
            show={this.state.showShoppingList}
            days={this.state.days} />
        </div>
      );
    }
  }
}

export default App;
