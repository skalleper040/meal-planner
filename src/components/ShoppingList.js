import React from 'react';

class ShoppingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            ingredients: {}
        }
        this.getIngredients = this.getIngredients.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.getIngredients()
        }
    }

    getIngredients() {
        let meals = [];
        this.props.days.forEach(day => {
            console.log(day)
            Object.entries(day.meals).map((meal) => {
                if (!meal[1].disabled) {
                    meals.push(meal[1].meal)
                }
            })
        });
        console.log(meals)

        let mapIngredients = new Map();

        meals.forEach(meal => {
            if (meal != undefined && meal.extendedIngredients) {
                meal.extendedIngredients.forEach(ingredient => {
                    if (mapIngredients.get(ingredient.name) !== undefined) {
                        let tmpValue = mapIngredients.get(ingredient.name)
                        mapIngredients.set(ingredient.name, { amount: (tmpValue.amount + ingredient.amount), unit: ingredient.unit })
                    } else {
                        mapIngredients.set(ingredient.name, { amount: ingredient.amount, unit: ingredient.unit })
                    }
                })
            }
        })
        console.log(mapIngredients)
        this.setState({
            ingredients: mapIngredients
        })
    }

    showIngredients() {
        return (
            <ul>
                {[...this.state.ingredients.entries()].map(([k,v]) => (
                    <li key={k}>{k} {v.amount} {v.unit}</li>
                ))}
            </ul>
        );
    }
    render() {
        const show = this.props.show;
        if (show) {
            return (
                <main>
                    {this.showIngredients()}
                </main>
            );
        } else {
            return null;
        }
    }
} export default ShoppingList;