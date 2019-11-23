import React, {Component} from 'react';

class BmiCalc extends Component {
    render() {
        return (
            <div className="col-lg-4 col-md-12 col-sm-12">
                <form className="form" id="backBox" onSubmit="return validateForm()">
                    <h3 id="bmiHeading"><b>B</b>ody <b>M</b>ass <b>I</b>ndex</h3>

                    <div className="row-one">
                        <input type="text" className="text-input" id="age" autoComplete="off"
                               placeholder="Age"
                               required/>
                        <div className="row centerGender">
                            <div className="col-small-6">

                                <label className="container bmi-container">
                                    <input type="radio" name="radio" id="f"/>
                                    <p className="text">Female</p>
                                    <span className="checkmark"/>
                                </label>
                            </div>
                            <div className="col-small-6">

                                <label className="container bmi-container">
                                    <input type="radio" name="radio" id="m"/>
                                    <p className="text">Male</p>
                                    <span className="checkmark"/>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row-two">
                        <input type="text" className="text-input" id="height" autoComplete="off"
                               placeholder="Height (cm)"
                               required/>
                        <input type="text" className="text-input" id="weight" autoComplete="off"
                               placeholder="Weight (kg)"
                               required/>
                    </div>
                    <button type="button" id="submitBMI">Submit</button>
                </form>

            </div>
        );
    }
}

export default BmiCalc;