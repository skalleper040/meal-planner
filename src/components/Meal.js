import React from 'react';
import Recipe from './Recipe';

class Meal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showRecipe: false
        }

        this.showRecipe = this.showRecipe.bind(this);
        this.toggleSkip = this.toggleSkip.bind(this);
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

    render() {
        const disabled = this.props.meal.disabled;
        if (disabled) {
            return (
                <li className="list-group-item p-4">
                    <button
                        className="btn btn-lg btn-outline-secondary w-100"
                        onClick={() => this.props.skipMeal(this.props.id, this.props.dishType)}>
                        Eat
                        </button>
                </li>
            );
        } else {
            return (
                <li className="list-group-item p-4">
                    <Recipe
                        units={this.props.units}
                        show={this.state.showRecipe}
                        handleShow={this.showRecipe}
                        meal={this.props.meal} />
                    <h6 className="text-center my-2">
                        {this.props.meal.recipe.title}
                    </h6>
                    <div className="btn-group w-100 my-2">
                        <button
                            className="btn btn-sm btn-dark"
                            onClick={() => this.props.skipMeal(this.props.id, this.props.dishType)}>
                            Skip
                            </button>
                        <button
                            className="btn btn-sm btn-info"
                            onClick={this.showRecipe}>
                            Recipe
                            </button>
                        <button
                            className="btn btn-sm btn-success"
                            onClick={() => this.props.generateMeal(this.props.id, this.props.dishType)}>
                            Hit
                            </button>
                    </div>
                </li>
            );
        }
    }
}

export default Meal;
