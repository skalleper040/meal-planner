import React from 'react';

class Ingredient extends React.Component {
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
        const amount = (this.props.units === 'metric' ? this.props.ingredient.measures.metric.amount : this.props.ingredient.measures.us.amount)
        const unit = (this.props.units === 'metric' ? this.props.ingredient.measures.metric.unitShort : this.props.ingredient.measures.us.unitShort)

        return (
            <button
                className={"list-group-item list-group-item-action " + (this.state.active ? "list-group-item-secondary" : "")}
                key={this.props.ingredient.name}
                onClick={this.handleClick}
                >
                {amount} {unit} {this.props.ingredient.name}
            </button>
        );
    }
} export default Ingredient;