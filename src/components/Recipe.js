import React from 'react';
import '../App.css';

class Recipe extends React.Component {

    constructor(props) {
        super(props);
    }

    createIngredients = () => {
        return (
            <ul className="list-group list-group-flush">
                {this.props.meal.extendedIngredients.map((ingredient, i) => (
                    <li className="list-group-item" key={i}>{ingredient.measures.metric.amount}{ingredient.measures.metric.unitShort} {ingredient.name}</li>
                ))}
            </ul>
        );
    }

    createInstructions = () => {
        return (
            <ol className="list-group list-group-flush">
                {this.props.meal.analyzedInstructions[0].steps.map((instruction, i) => (
                    <li className="list-group-item" key={i}>{instruction.step}</li>
                ))}
            </ol>
        );
    }

    render() {
        const show = this.props.show;
        if (show) {
            return (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-xl shadow-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.meal.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleShow}>
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <span className="badge badge-primary m-1">
                                            <i className="fa fa-clock-o"></i> {this.props.meal.readyInMinutes}
                                        </span>
                                        <span className="badge badge-primary m-1">
                                            <i className="fa fa-cutlery"></i> {this.props.meal.servings}
                                        </span>
                                        {this.props.meal.vegetarian &&
                                            <span className="badge badge-success m-1">
                                                Vegetarian
                                            </span>}
                                        {this.props.meal.vegan &&
                                            <span className="badge badge-success m-1">
                                                Vegan
                                            </span>}
                                        {this.props.meal.glutenFree &&
                                            <span className="badge badge-success m-1">
                                                Gluten free
                                            </span>}
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4 col-sm-12">
                                            <h6>Ingredients</h6>
                                            {this.createIngredients()}
                                        </div>
                                        <div className="col-lg-8 col-sm-12">
                                            <h6>Instructions</h6>
                                            {this.createInstructions()}
                                        </div>
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
