import React from 'react';

function Ingredient(props) {
    const amount = (props.units === 'metric' ? props.ingredient.measures.metric.amount : props.ingredient.measures.us.amount)
    const unit = (props.units === 'metric' ? props.ingredient.measures.metric.unitShort : props.ingredient.measures.us.unitShort)

    return (
        <li
            className="list-group-item"
            key={props.ingredient.name}>
            {amount} {unit} {props.ingredient.name}
        </li>
    );
} export default Ingredient;