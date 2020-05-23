import React from 'react';

import Menu from './components/Menu';
import Days from './components/Days';
import Day from './components/Day';
import Meal from './components/Meal';
import Recipe from './components/Recipe';
import ShoppingList from './components/ShoppingList';
import { cacheMeal } from './util/APIUtil';
import {convertIngredientsIgnoreSpoons} from './util/ConversionUtil';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

const dishTypes = ['breakfast', 'lunch', 'dinner'];

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
    console.log("recipe: ", recipe);
    recipe.extendedIngredients = convertIngredientsIgnoreSpoons(recipe.extendedIngredients);
    return recipe;
  }

  generateMeal = (dayId, dishType) => {
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

  skipMeal = (dayId, dishType) => {
    let days = [...this.state.days];
    var index = days.findIndex(day => day.id === dayId);
    console.log(days[index].meals)
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
