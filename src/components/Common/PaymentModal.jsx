import React, {Component} from 'react';
import '../assets/styles/PaymentStyle.css'
import jccLogo from '../assets/img/logos/jccLogo.svg';
import paypalLogo from '../assets/img/logos/paypalLogo.svg';

class PaymentModal extends Component {
    onChange(value) {
        console.log(value);
    }

    render() {
        return (
            <div id={'payment-modal'} className={'text-center'}>

                <div id={'subscription-options'}>
                    <h4>Subscription Options</h4>
                    <div className="option-group">
                        <div className="option-container">

                            <input className="option-input" id="option-1" type="radio" name="options" defaultChecked/>
                            <input className="option-input" id="option-2" type="radio" name="options"/>

                            <label className="option" htmlFor="option-1">
                                <span className="option__indicator"/>
                                <span className="option__label">&euro;50<sub>per month</sub></span>
                            </label>

                            <label className="option" htmlFor="option-2">
                                <span className="option__indicator"/>
                                <span className="option__label">&euro;400<sub>per 3 months</sub></span>
                            </label>

                        </div>
                    </div>
                    <div className="option-group">
                        <div className="option-container">

                            <input className="option-input" id="option-3" type="radio" name="options"/>
                            <input className="option-input" id="option-4" type="radio" name="options"/>

                            <label className="option" htmlFor="option-3">
                                <span className="option__indicator"/>
                                <span className="option__label">&euro;500<sub>per 6 months</sub></span>
                            </label>

                            <label className="option" htmlFor="option-4">
                                <span className="option__indicator"/>
                                <span className="option__label">&euro;900<sub>per year</sub></span>
                            </label>

                        </div>
                    </div>
                </div>

                <div id={'payment-options'}>
                    <h4>Payment Options</h4>

                    <div className="container">
                        <div className="row radio-tile-group justify-content-center">

                            <div className="input-container">
                                <input id="walk" className="radio-button" type="radio" name="radio" defaultChecked/>
                                <div className="radio-tile">
                                    <div className="icon walk-icon">
                                        <img src={jccLogo} alt={'JCC Logo'}/>
                                    </div>
                                    <label htmlFor="walk" className="radio-tile-label"/>
                                </div>
                            </div>

                            <div className="input-container">
                                <input id="bike" className="radio-button" type="radio" name="radio"/>
                                <div className="radio-tile">
                                    <div className="icon bike-icon">
                                        <img src={paypalLogo} alt={'PayPal Logo'}/>
                                    </div>
                                    <label htmlFor="bike" className="radio-tile-label"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="CheckoutButton" className="btn btn-primary"
                        type="submit"><i className="fa fa-lock"/> CHECKOUT
                </button>
            </div>

        );
    }
}

export default PaymentModal;