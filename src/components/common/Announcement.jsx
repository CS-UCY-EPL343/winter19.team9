import React, {Component} from 'react';

class Announcement extends Component {
    onSlickRemove = () => {
        this.props.slickRemove(this.props.id);
    };

    render() {
        return (
            !this.props.isAdder ?
            <div className = { 'ann-card' }
                 onClick = { this.onSlickRemove }
            >
                <div className = "ann-data">
                    <h5 className = "card-title">
                        { this.props.title }
                    </h5>
                    <p className = "card-text">
                        { this.props.message }
                    </p>
                </div>
                <i className = "fa fa-minus-circle ann-img" />
            </div>
                                :
            <div className = "ann-card"
                 onClick = { this.props.slickAdd }
            >
                <i className = "fa fa-plus-circle ann-img-plus" />
            </div>
        );
    }
}

export default Announcement;