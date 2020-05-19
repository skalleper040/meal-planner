import React from 'react';
import Ingredient from './Ingredient';

function IngredientGroup(props) {
    return (
        <article key={props.group[0]} className="card shadow-sm">
            <div className="card-header">
                {props.group[0]}
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {props.group[1].map(ingredient => (
                        <Ingredient key={ingredient.name} ingredient={ingredient} units={props.units} />
                    ))}
                </ul>
            </div>
        </article>
    )
} export default IngredientGroup;
