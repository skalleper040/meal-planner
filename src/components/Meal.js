import React from 'react';
import Recipe from './Recipe';

class Meal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meal: this.props.meal.meal || {},
            dishType: this.props.dishType,
            disabled: this.props.meal.disabled || false,
            showRecipe: false
        }

        this.showRecipe = this.showRecipe.bind(this);
        this.toggleSkip = this.toggleSkip.bind(this);
        this.getRandomRecipe = this.getRandomRecipe.bind(this);
    }

    componentDidMount() {
        if (this.props.meal.meal === undefined) {
            this.getRandomRecipe()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.saveMeal(this.state.dishType, this.state.meal, this.state.disabled);
        }
    }

    toggleSkip() {
        let disabled = this.state.disabled;
        this.setState({
            disabled: !disabled
        })
    }

    showRecipe() {
        this.setState({
            showRecipe: !this.state.showRecipe
        })
    }

    getRandomRecipe() {
        const dishType = this.state.dishType;
        var recipes = JSON.parse(localStorage.getItem(dishType + "-meals"));
        let recipe = recipes[Math.floor(Math.random() * recipes.length)];
        this.setState({
            meal: recipe
        })
        console.log(recipe);
    }

    render() {
        const disabled = this.state.disabled;
        if (disabled) {
            return (
                <li className="list-group-item p-4">
                    <button className="btn btn-lg btn-outline-secondary w-100" onClick={this.toggleSkip}>Eat</button>
                </li>
            );
        } else {
            return (
                <li className="list-group-item p-4">
                    <Recipe units={this.props.units} show={this.state.showRecipe} handleShow={this.showRecipe} meal={this.state.meal}></Recipe>
                    <h6 className="text-center my-2">{this.state.meal.title}</h6>
                    <div className="btn-group w-100 my-2">
                        <button className="btn btn-sm btn-dark" onClick={this.toggleSkip}>Skip</button>
                        <button className="btn btn-sm btn-info" onClick={this.showRecipe}>Recipe</button>
                        <button className="btn btn-sm btn-success" onClick={this.getRandomRecipe}>Hit</button>
                    </div>
                </li>
            );
        }
    }
}

export default Meal;
