import React from 'react';
import '../App.css';

class Recipe extends React.Component {

    constructor(props) {
        super(props);
    }

    createIngredients = () => {
        return (
            <ul>
                {this.props.meal.extendedIngredients.map((ingredient, i) => (
                    <li key={i}>{ingredient.measures.metric.amount}{ingredient.measures.metric.unitShort} {ingredient.name}</li>
                ))}
            </ul>
        );
    }

    createInstructions = () => {
        return (
            <ul>
                {this.props.meal.analyzedInstructions[0].steps.map((instruction, i) => (
                    <li key={i}>{instruction.step}</li>
                ))}
            </ul>
        );
    }

    render() {
        const show = this.props.show;
        if (show) {
            return (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.meal.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleShow}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        Ingredients
                                    </div>
                                    <div className="row">
                                        {this.createIngredients()}
                                    </div>
                                    <div className="row">
                                        Instructions
                                    </div>
                                    <div className="row">
                                        {this.createInstructions()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

} export default Recipe;
