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
            <nav className="navbar navbar-light navbar-expand-md bg-light justify-content-between">
                <ul className="navbar-nav">
                    <li className="nav-item m-1">
                        <button
                            className={this.props.showDays ? "btn btn-outline-secondary active" : "btn btn-outline-secondary"}
                            onClick={this.props.toggleShow}>
                            Meal-planner
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button
                            className={this.props.showShoppingList ? "btn btn-outline-secondary active" : "btn btn-outline-secondary"}
                            onClick={this.props.toggleShow}>
                            Shopping-list
                        </button>
                    </li>
                </ul>
                <form className="form-inline">
                    <label htmlFor="unitSelect" className="mr-2">Units</label>
                    <select
                        id="unitSelect"
                        className="form-control form-control-sm"
                        onChange={this.handleChangeUnits}
                        value={this.props.units}>
                        <option value="metric">Metric</option>
                        <option value="us">US</option>
                    </select>
                </form>
            </nav >
        );
    }
} export default Menu;