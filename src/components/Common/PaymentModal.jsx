import React, {Component} from 'react';
import '../assets/styles/PaymentStyle.css'
import jccLogo from '../assets/img/logos/jccLogo.svg';
import paypalLogo from '../assets/img/logos/paypalLogo.svg';

class PaymentModal extends Component {
    render() {
        return (
            <div id={'payment-modal'} className={'text-center'}>
                <h4>Subscription Options</h4>
                <div id={'subscription-options'}>
                    <div className="option-group">
                        <div className="option-container">

                            <input className="option-input" defaultChecked id="option-1" type="radio" name="options"/>
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
                    <div className="option-group">
                        <div className="option-container">

                            <input className="option-input" defaultChecked id="p-option-1" type="radio" name="options"/>
                            <input className="option-input" id="p-option-2" type="radio" name="options"/>


                            <label className="option" htmlFor="p-option-1">
                                <span className="option__indicator"/>
                                <span className="option__label"><img src={jccLogo} alt={'Jcc Logo'}/></span>
                            </label>

                            <label className="option" htmlFor="p-option-2">
                                <span className="option__indicator"/>
                                <span className="option__label"><img src={paypalLogo} alt={'Jcc Logo'}/></span>
                            </label>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PaymentModal;