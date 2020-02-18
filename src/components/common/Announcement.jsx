import React, {Component} from 'react';
import '../assets/styles/Announcement.css'

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover = () => {
        this.setState({hover: !this.state.hover});
    };

    onSlickRemove = () => {
        if (this.props.level !== -1)
            this.props.slickRemove(this.props.id);
    };

    render() {
        let dataStyle;
        let imgStyle;
        if (this.props.level <= 1) {
            dataStyle = {display: 'block'};
            imgStyle = {display: 'none'};
        }
        return (
            !this.props.isAdder ?
                (
                    <div className={'ann-card'}
                         onClick={this.onSlickRemove}
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
                    </div>)
                :
                (
                    this.props.level <= 1 ?
                        <div className="ann-card-prompt"/>
                        :
                        <div className="ann-card"
                             onClick={this.props.slickAdd}
                        >
                            <i className="fa fa-plus-circle ann-img-plus"/>
                        </div>
                )
        );
    }
}

export default Announcement;