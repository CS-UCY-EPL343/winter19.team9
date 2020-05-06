import React, {Component} from 'react';

class MessagesNewModalForm extends Component {
    render() {
        // noinspection JSUnresolvedVariable
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="ann-modal-to"
                           className="col-form-label"
                           style={{color: '#D90429'}}
                    >To:</label>
                    <select id="ann-modal-to"
                            name="contact"
                            className="form-control"
                            placeholder="Select recipient..."
                            required
                            onChange={this.props.handleChange}
                    >
                        <option value=''>
                            Select recipient...
                        </option>
                        {this.props.recipients.map((rec, index) => {
                            // noinspection JSUnresolvedVariable
                            return <option key={index}
                                           value={rec.AccountID}
                            >
                                {`${rec.CoachName} ${rec.Surname} - ${rec.level.toUpperCase()}`}
                            </option>;
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ann-modal-title"
                           className="col-form-label"
                           style={{color: '#D90429'}}
                    >Title:</label>
                    <input type="text"
                           className="form-control"
                           id="ann-modal-title"
                           placeholder="Enter a title..."
                           name="title"
                           value={this.props.title}
                           required
                           onChange={this.props.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ann-modal-message"
                           className="col-form-label"
                           style={{color: '#D90429'}}
                    >Message:</label>
                    <textarea className="form-control"
                              id="ann-modal-message"
                              placeholder="Enter a message..."
                              name="message"
                              value={this.props.message}
                              required
                              onChange={this.props.handleChange}
                    />
                </div>
            </form>
        );
    }
}

export default MessagesNewModalForm;