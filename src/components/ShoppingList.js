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
            if (meal !== undefined && meal.extendedIngredients) {
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
                <ul className="list-group-flush">
                    {ingredients.map(ingredient => (
                        <li
                            className="list-group-item"
                            key={ingredient.name}>
                            {ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort} {ingredient.name}
                        </li>
                    ))
                    }
                </ul>
            );
        } else {
            return (
                <div className="alert alert-primary" role="alert">
                    Nothing to shop!
                </div>
            )
        }
    }

    showIngredients() {
        let ingredients = this.state.ingredients;
        if (ingredients.length > 0) {
            return (
                <ul className="list-group-flush">
                    {ingredients.map(ingredient => (
                        <li
                            className="list-group-item"
                            key={ingredient.name}>
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </li>
                    ))
                    }
                </ul>
            );
        } else {
            return (
                <div class="alert alert-primary" role="alert">
                    Nothing to shop!
                </div>
            )
        }
    }

    render() {
        const show = this.props.show;
        if (show) {
            return (
                <main className="row">
                    <article className="col-12 p-4">
                        {this.props.units === 'metric' ? this.showMetricIngredients() : this.showIngredients()}
                    </article>
                </main>
            );
        } else {
            return null;
        }
    }
} export default ShoppingList;