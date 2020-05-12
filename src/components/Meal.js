import React from 'react';

class Meal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dishType: this.props.dishType,
            ingredients: {},
            disabled: false
        }

        this.toggleSkip = this.toggleSkip.bind(this);
    }

    toggleSkip() {
        let disabled = this.state.disabled;
        this.setState({
            disabled: !disabled
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
                    <div className="p-2 m-0">
                        {this.state.dishType}
                    </div>
                    <div className="p-2 m-0 btn-group">
                        <button className="btn btn-sm btn-info" onClick={this.toggleSkip}>Skip</button>
                        <button className="btn btn-sm btn-success" onClick={this.toggleSkip}>Hit</button>
                    </div>
                </div>
            );
        }
    }
}

export default Meal;
