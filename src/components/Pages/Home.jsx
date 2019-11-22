import React, {Component} from 'react';
// Re-usable components
import CarouselHp from '../Common/CarouselHP';
import Services from '../Common/Services';
// Images
import logo_img from '../../logo.svg';
import ToggleModal from "../Common/ToggleModal";
import PaymentModal from "../Common/PaymentModal";

class Home extends Component {
    render() {
        return (
            <div>
                <CarouselHp/>

                <div id="author">
                    <img src={logo_img} alt={'author'}/>
                </div>

                <Services/>

                <ToggleModal
                    btnClass = { 'nav-link' }
                    btnText = { ['Payment ', <i className = "fas fa-sign-in-alt" key={Math.random()} />] }
                    modalSize = { 'md' }
                    modalHeader = { 'Payment' }
                    modalBody={<PaymentModal/>}
                />
            </div>
        )
    }
}

export default Home;