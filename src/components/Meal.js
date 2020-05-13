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

    toggleSkip() {
        let disabled = this.state.disabled;
        this.setState({
            disabled: !disabled,
            meal: {}
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.meal !== this.state.meal) {
            this.props.saveMeal(this.state.dishType, this.state.meal, this.state.disabled);
        }
    }

    render() {
        const disabled = this.state.disabled;
        if (disabled) {
            return (
                <div className="flex-column bg-secondary w-100 p-0 m-0 rounded">
                    <div className="p-2 m-0">
                        Skipped
                    </div>
                    <div className="p-2 m-0 btn-group">
                        <button className="btn btn-sm btn-info" onClick={this.toggleSkip}>Eat</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex-column w-100 p-0 m-0 rounded">
                    <Recipe show={this.state.showRecipe} handleShow={this.showRecipe} meal={this.state.meal}></Recipe>
                    <div className="p-2 m-0">
                        {this.state.meal.title}
                    </div>
                    <div className="p-2 m-0 btn-group">
                        <button className="btn btn-sm btn-info" onClick={this.toggleSkip}>Skip</button>
                        <button className="btn btn-sm btn-info" onClick={this.showRecipe}>Recipe</button>
                        <button className="btn btn-sm btn-success" onClick={this.getRandomRecipe}>Hit</button>
                    </div>
                </div>
            );
        }
    }
}

export default Meal;
