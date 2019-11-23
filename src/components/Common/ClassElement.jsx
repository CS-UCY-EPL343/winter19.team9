import React from "react";

class ClassElement extends Component{
    render() {
        return(
            <div className="single-classes" id="single-classes">
                <div className="classes-img">
                    <img src={this.props.src} className="rounded-corners" alt=""/>
                </div>
                <div className="classes-text">
                    <h5>{this.props.name}</h5>
                    <p>{this.props.text}</p>
                </div>
            </div>
        );
    }
}