import React from 'react';

import Menu from './components/Menu';
import Days from './components/Days';
import ShoppingList from './components/ShoppingList';
import { cacheRecipes } from './util/APIUtil'

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
    }
    this.saveDays = this.saveDays.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
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
          <nav className="row">
            <Menu toggleShow={this.toggleShow} showDays={this.state.showDays} showShoppingList={this.state.showShoppingList}></Menu>
          </nav>
          <Days show={this.state.showDays} saveDays={this.saveDays}></Days>
          <ShoppingList show={this.state.showShoppingList} days={this.state.days}></ShoppingList>
        </div>
      );
    }
  }
}

export default App;
