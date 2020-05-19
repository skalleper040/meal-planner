import React from 'react';

function RecipeInstruction(props) {

    return (
        <li className="list-group-item" key={props.i}>{props.step}</li>
    );
} export default RecipeInstruction;