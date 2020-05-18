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
      progress: 10,
      counter: 1
    }
    this.changeUnits = this.changeUnits.bind(this);
    this.addDay = this.addDay.bind(this);
    this.removeDay = this.removeDay.bind(this);
    this.generateMeal = this.generateMeal.bind(this);
    this.skipMeal = this.skipMeal.bind(this);
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

  addDay() {
    var day = {
      meals: {
        breakfast: {
          recipe: this.getRandomRecipe("breakfast"),
          disabled: false
        },
        lunch: {
          recipe: this.getRandomRecipe("lunch"),
          disabled: false
        },
        dinner: {
          recipe: this.getRandomRecipe("dinner"),
          disabled: false
        } 
      },
      id: this.state.counter
    }
    this.setState({
      days: [...this.state.days, day],
      counter: this.state.counter + 1
    })
  }

  removeDay(id) {
    var tempDays = this.state.days;
    var index = tempDays.findIndex(day => day.id === id);
    if (index !== -1) {
      tempDays.splice(index, 1);
      this.setState({ days: tempDays });
    }
  }

  getRandomRecipe(dishType) {
    var recipes = JSON.parse(localStorage.getItem(dishType + "-meals"));
    let recipe = recipes[Math.floor(Math.random() * recipes.length)];
    return recipe;
  }

  generateMeal(dayId, dishType) {
    let days = [...this.state.days];
    var index = days.findIndex(day => day.id === dayId);
    let recipe = this.getRandomRecipe(dishType);
    days[index].meals = {
      ...days[index].meals,
      [dishType]: {
        ...days[index].meals[dishType],
        recipe: recipe
      }
    }
    this.setState({
      days: days
    })
  }

  skipMeal(dayId, dishType) {
    let days = [...this.state.days];
    var index = days.findIndex(day => day.id === dayId);
    days[index].meals = {
      ...days[index].meals,
      [dishType]: {
        ...days[index].meals[dishType],
        disabled: !days[index].meals[dishType].disabled
      }
    }
    this.setState({
      days: days
    })
  }

  render() {
    if (this.state.isLoading) {

      return (
        <div className="container p-4">
          <div className="d-flex w-100 bg-light rounded">
            <div className="progress bg-dark">
              <div className="progress-bar progress-bar-animated progress-bar-striped bg-danger" role="progressbar" style={{ width: this.state.progress + 'vw' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
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
                  units={this.state.units}
                  days={this.state.days}
                />}
                path="/shopping-list"
              />
              <Route render={() =>
                <Days
                  days={this.state.days}
                  units={this.state.units}
                  removeDay={this.removeDay}
                  addDay={this.addDay}
                  generateMeal={this.generateMeal}
                  skipMeal={this.skipMeal}
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
