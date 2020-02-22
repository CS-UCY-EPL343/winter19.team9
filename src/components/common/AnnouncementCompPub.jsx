import React, {Component} from 'react';
import '../assets/styles/AnnouncmentsPrivate.css'

class AnnouncementCompPub extends Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover = () => {
        this.setState({hover: !this.state.hover});
    };


    render() {
        let dataStyle;
        let imgStyle;
        if (this.props.level <= 1) {
            dataStyle = {display: 'block'};
            imgStyle = {display: 'none'};
        }
        return (
                    <div className={'ann-card'}
                         onMouseOver={this.toggleHover}
                         onMouseOut={this.toggleHover}
                    >
                        <div className="ann-data" style={dataStyle}>
                            <h5 className="card-title">
                                {this.props.title}
                            </h5>
                            <p className="card-text">
                                {this.props.message}
                            </p>
                        </div>
                        {this.props.level >= 2
                        &&
                        <i className="fa fa-minus-circle ann-img"
                           style={imgStyle}
                        />}
                    </div>
        );
    }
}

export default AnnouncementCompPub;