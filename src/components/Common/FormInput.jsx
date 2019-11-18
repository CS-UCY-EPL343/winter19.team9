import React, { Component } from 'react';

class FormInput extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { type: 'text', pattern: '.{1,}', required: '', max: '', min: '', classType: '' }
    }

    render() {
        return (
            <div className = "form-group">
                <label htmlFor = { this.props.id }>
                    <b>
                        { this.props.label }
                        { this.props.required && <span style = { { color: 'red' } }>*</span> }
                    </b>
                </label>
                <input type = { this.props.type }
                       className = { this.props.classType }
                       id = { this.props.id }
                       placeholder = { this.props.placeholder }
                       name = { this.props.id }
                       pattern = { this.props.pattern }
                       required = { this.props.required }
                />
                <div className = "valid-feedback">{ this.props.valid }</div>
                <div className = "invalid-feedback">{ this.props.invalid }</div>
            </div>
        );
    }
}

export default FormInput;