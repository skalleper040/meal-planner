import React from 'react';

import Menu from './components/Menu';
import Days from './components/Days';
import Day from './components/Day';
import Meal from './components/Meal';
import Recipe from './components/Recipe';
import ShoppingList from './components/ShoppingList';
import { cacheMeal } from './util/APIUtil';
import { convertIngredientsIgnoreSpoons } from './util/ConversionUtil';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import _ from "underscore";
import update from 'immutability-helper';

import './App.css';

const dishTypes = ['breakfast', 'lunch', 'dinner'];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      days: JSON.parse(localStorage.getItem("days")) || [],
      isLoading: true,
      fetchError: false,
      units: localStorage.getItem("units") || "metric",
      progress: 10,
      counter: JSON.parse(localStorage.getItem("counter")) || 1
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.days, this.state.days)) {
      localStorage.setItem("days", JSON.stringify(this.state.days))
    }

    if (prevState.counter !== this.state.counter) {
      localStorage.setItem("counter", this.state.counter)
    }

    if (prevState.units !== this.state.units) {
      localStorage.setItem("units", this.state.units)
    }
  }
  async componentDidMount() {

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

  changeUnits = (units) => {
    this.setState({
      units: units
    })
  }

  addDay = () => {
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


  removeDay = (id) => {
    var index = this.state.days.findIndex(day => day.id === id);
    if (index !== -1) {
      this.setState((prevState) => ({
        days: [...prevState.days.slice(0, index), ...prevState.days.slice(index + 1)]
      }));
    }
  }

  getRandomRecipe(dishType) {
    var recipes = JSON.parse(localStorage.getItem(dishType + "-meals"));
    let recipe = recipes[Math.floor(Math.random() * recipes.length)];
    console.log("recipe: ", recipe);
    recipe.extendedIngredients = convertIngredientsIgnoreSpoons(recipe.extendedIngredients);
    return recipe;
  }

  generateMeal = (dayId, dishType) => {
    const index = this.state.days.findIndex(day => day.id === dayId);
    let recipe = this.getRandomRecipe(dishType);
    this.setState((state) =>
      update(state, {
        days: {
          [index]:
          {
            meals: {
              [dishType]: {
                recipe:
                  { $set: recipe }
              }
            }
          }
        }
      }))
  }

  skipMeal = (dayId, dishType) => {
    const index = this.state.days.findIndex(day => day.id === dayId);
    this.setState((state) =>
      update(state, {
        days: {
          [index]:
          {
            meals: {
              [dishType]: {
                disabled:
                  { $set: !this.state.days[index].meals[dishType].disabled }
              }
            }
          }
        }
      }))
  };

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
              <Route component={Recipe}
                path="/recipe/" />
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
                  addDay={this.addDay}>
                  {this.state.days.map((day) =>
                    <Day
                      key={'day' + day.id}
                      id={day.id}
                      removeDay={(id) => this.removeDay(id)}
                    >
                      {Object.entries(day.meals).map((meal) =>
                        <Meal
                          key={day.id + meal[0]}
                          dishType={meal[0]}
                          meal={meal}
                          generateMeal={(dayId, dishType) => this.generateMeal(dayId, dishType)}
                          skipMeal={(dayId, dishType) => this.skipMeal(dayId, dishType)}
                          id={day.id}
                          units={this.state.units}>
                        </Meal>
                      )}
                    </Day>)}
                </Days>}
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
