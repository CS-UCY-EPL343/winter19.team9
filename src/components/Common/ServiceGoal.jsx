import React, { Component } from 'react';

class ServiceGoal extends Component {
    render() {
        return (
            <div className = { 'col-xl-3 col-lg-6 col-md-6' }>
                <div className = { 'service-box' }>
                    <div className = { 'service-box-icon' }>
                        <i className = {this.props.icon} />
                    </div>
                    <div className = { 'service-box-content' }>
                        <h1 className = { 'service-box-title' }>{this.props.title}</h1>
                        <p>{this.props.message}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceGoal;