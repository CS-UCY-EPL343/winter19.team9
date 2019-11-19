import React, {Component} from 'react';

class TeamMember extends Component {
    render() {
        return (
            <li className={this.props.className}>
                <div className="timeline-image">
                    <img className="rounded-circle img-fluid" src={this.props.src} alt=""/>
                </div>
                <div className="timeline-panel">
                    <div className="timeline-heading">
                        <h4>{this.props.name}</h4>
                    </div>
                    <div className="timeline-body">
                        <p className="text-muted">{this.props.text}</p>
                    </div>
                </div>
            </li>
        );
    }
}

export default TeamMember;