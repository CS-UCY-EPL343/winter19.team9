import React, { Component }             from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import PageWrapper                      from './components/PageWrapper';
import Home                             from './components/Pages/Home';
import Register                         from './components/Pages/Register';
import ScrollToTop                      from './components/Common/ScrollToTop';
import AboutUs                          from './components/Pages/AboutUs';
import Profile                          from './components/Pages/Profile';
import Classes                          from './components/Pages/Classes';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signed_in: false,
            level    : '0'
        };

        this.onSignin = this.onSignin.bind(this);
        this.onSignout = this.onSignout.bind(this);
    }

    onSignin = (level) => {
        console.log('in');
        this.setState({
            signed_in: true,
            level    : level
        })
    };

    onSignout = () => {
        console.log('out');
        this.setState({
            signed_in: false,
            level    : '0'
        })
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <ScrollToTop />
                    <Switch>
                        <PageWrapper { ...this.state } onSignin = { this.onSignin } onSignout = { this.onSignout }>

                            <Route
                                exact = { true }
                                path = "/winter19.team9/"
                                component = { Home }
                            />

                            <Route
                                path = "/winter19.team9/register"
                                component = { Register }
                            />

                            <Route
                                path = "/winter19.team9/about"
                                component = { AboutUs }
                            />

                            <Route
                                path = "/winter19.team9/profile/"
                                render={(props) => <Profile {...props} level={this.state.level} />}
                            />

                            <Route
                                path = "/winter19.team9/classes"
                                component = { Classes }
                            />

                            {/* 404 */ }
                            {/*<Route*/ }
                            {/*    component = { Home }*/ }
                            {/*/>*/ }

                        </PageWrapper>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
