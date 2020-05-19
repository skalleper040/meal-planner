import React from 'react';

class RecipeInstruction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            active: !this.state.active
        })
    }
    render() {
        return (
            <button
                className={"list-group-item list-group-item-action " + (this.state.active ? "list-group-item-secondary" : "")}
                key={this.props.i}
                onClick={this.handleClick}>
                {this.props.step}
            </button>
        );
    }
} export default RecipeInstruction;