import React from 'react';

class ShoppingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
        }
    }


    render() {
        const show = this.props.show;
        if (show) {
            return (
                <div>
    
                </div>
            );
        } else {
            return null;
        }
    }
} export default ShoppingList;