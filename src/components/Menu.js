import React from 'react';
import { NavLink } from "react-router-dom";

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
                            <NavLink className="btn btn-outline-secondary" to="/" exact>Meal-planner</NavLink>
                        </li>
                        <li className="nav-item m-1">
                            <NavLink className="btn btn-outline-secondary" to="/shopping-list" exact>Shopping-list</NavLink>
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