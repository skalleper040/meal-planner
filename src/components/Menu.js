import React from 'react';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeUnits = this.handleChangeUnits.bind(this);
    }


    handleChangeUnits(event) {
        this.props.changeUnits(event.target.value);
    }

    render() {
        return (
            <nav className="w-100">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={this.props.showDays ? "nav-link active" : "nav-link"}
                            onClick={this.props.toggleShow}>
                            Meal-planner
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={this.props.showShoppingList ? "nav-link active" : "nav-link"}
                            onClick={this.props.toggleShow}>
                            Shopping-list
                        </button>
                    </li>
                    <li className="nav-item ml-4">
                        <select className="custom-select" onChange={this.handleChangeUnits} value={this.props.units}>
                            <option value="metric">Metric</option>
                            <option value="us">US</option>
                        </select>
                    </li>
                </ul>
            </nav>
        );
    }
} export default Menu;