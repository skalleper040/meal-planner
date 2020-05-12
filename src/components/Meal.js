import React from 'react';
import Recipe from './Recipe';

class Meal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meal: {},
            dishType: this.props.dishType,
            disabled: false,
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
                        {this.state.dishType}
                    </div>
                    <div className="p-2 m-0 btn-group">
                        <button className="btn btn-sm btn-info" onClick={this.toggleSkip}>Skip</button>
                        <button className="btn btn-sm btn-info" onClick={this.showRecipe}>Recipe</button>
                        <button className="btn btn-sm btn-success" onClick={this.toggleSkip}>Hit</button>
                    </div>
                </div>
            );
        }
    }
}

export default Meal;
