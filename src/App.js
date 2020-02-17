import React, {Component}              from 'react';
import {Router, Switch, Route}         from 'react-router-dom';
import PageWrapper                     from './components/PageWrapper';
import Home                            from './components/pages/Home';
import AboutUs                         from './components/pages/AboutUs';
import ProfileUser                     from './components/pages/ProfileUser';
import ProfileCoach                    from './components/pages/ProfileCoach';
import ProfileAdmin                    from './components/pages/ProfileAdmin';
import Classes                         from './components/pages/Classes';
import ScrollToTop                     from './components/common/ScrollToTop';
import PrivateRoute                    from './components/PrivateRoute';
// import NotFound                            from
// './components/common/NotFound';
import history                         from './history';
import {getUserLevel, isAuthenticated} from './repository';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLevel: undefined,
        };
        this.setUserLevel = this.setUserLevel.bind(this);
    };

    componentDidMount() {
        const path = localStorage.getItem('path') || '/';
        history.push(path);

        // Persist on state
        if (isAuthenticated()) {
            getUserLevel().then(level => this.setUserLevel(level));
        }
    }

    setUserLevel = (userLevel) => {
        this.setState({userLevel});
    };

    render() {
        return (
            <Router history = { history }>
                <div>
                    <ScrollToTop />
                    <Switch>
                        <PageWrapper userLevel = { this.state.userLevel }
                                     setUserLevel = { this.setUserLevel }
                        >
                            <Route exact
                                   path = "/"
                                   component = { (props) => <Home { ...props }
                                                                  userLevel = { this.state.userLevel }
                                   /> }
                            />
                            <Route exact
                                   path = "/about"
                                   component = { AboutUs }
                            />
                            <Route path = "/classes" component = { Classes } />

                            <PrivateRoute exact
                                          path = "/user/profile"
                                          component = { ProfileUser }
                                          userLevel = { this.state.userLevel }
                            />
                            <PrivateRoute exact
                                          path = "/coach/profile"
                                          component = { ProfileCoach }
                                          userLevel = { this.state.userLevel }
                            />
                            <PrivateRoute exact
                                          path = "/admin/profile"
                                          component = { ProfileAdmin }
                                          userLevel = { this.state.userLevel }
                            />
                            {/*<Route path = "*" component = { NotFound } />*/ }
                        </PageWrapper>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
