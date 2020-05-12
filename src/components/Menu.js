import React from 'react';

class Menu extends React.Component {

    constructor(props) {
        super(props);
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
                </ul>
            </nav>
        );
    }
} export default Menu;