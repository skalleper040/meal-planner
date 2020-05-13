import React from 'react';

class ShoppingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            ingredients: {},
        }
        this.getIngredients = this.getIngredients.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (prevProps.units !== this.props.units) {
                return;
            }
            else {
                this.getIngredients()
            }
        }
    }

    getIngredients() {
        let meals = [];
        let ingredients = [];
        this.props.days.forEach(day => {
            Object.entries(day.meals).map((meal) => {
                if (!meal[1].disabled) {
                    meals.push(meal[1].meal)
                }
            })
        });

        meals.forEach(meal => {
            if (meal != undefined && meal.extendedIngredients) {
                meal.extendedIngredients.forEach(ingredient => {
                    let oldIngredient = ingredients.find(i => i.name === ingredient.name);
                    if (oldIngredient !== undefined) {
                        oldIngredient.amount += ingredient.amount;
                        oldIngredient.measures.metric.amount += ingredient.measures.metric.amount;
                        oldIngredient.measures.us.amount += ingredient.measures.us.amount;
                    } else {
                        ingredients.push(ingredient)
                    }
                })
            }
        })

        this.setState({
            ingredients: ingredients
        })
    }

    showMetricIngredients() {
        let ingredients = this.state.ingredients;
        if (ingredients.length > 0) {
            return (
                <ul>
                    {ingredients.map(ingredient => (
                        <li key={ingredient.name}>{ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort} {ingredient.name}</li>
                    ))
                    }
                </ul>
            );
        } else {
            return "Nothing to shop"
        }
    }

    showIngredients() {
        let ingredients = this.state.ingredients;
        if (ingredients.length > 0) {
            return (
                <ul>
                    {ingredients.map(ingredient => (
                        <li key={ingredient.name}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                    ))
                    }
                </ul>
            );
        } else {
            return "Nothing to shop"
        }
    }

    render() {
        const show = this.props.show;
        if (show) {
            return (
                <main>
                    {this.props.units === 'metric' ? this.showMetricIngredients() : this.showIngredients()}
                </main>
            );
        } else {
            return null;
        }
    }
} export default ShoppingList;