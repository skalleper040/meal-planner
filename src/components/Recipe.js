import React from 'react';

class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meal: {},
        }
    }

    render() {
        const show = this.props.show;

        if (show) {
            return (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Recept titel</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleShow}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
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
