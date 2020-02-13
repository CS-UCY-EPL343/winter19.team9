import React, { Component }      from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import PageWrapper               from './components/PageWrapper';
import Home                      from './components/pages/Home';
import AboutUs                   from './components/pages/AboutUs';
import ProfileUser               from './components/pages/ProfileUser';
import ProfileCoach              from './components/pages/ProfileCoach';
import ProfileAdmin              from './components/pages/ProfileAdmin';
import Classes                   from './components/pages/Classes';
import ScrollToTop               from './components/common/ScrollToTop';
import PrivateRoute              from './components/PrivateRoute';
// import NotFound                            from './components/common/NotFound';
import history                   from './history';

class App extends Component {

    componentDidMount() {
        const path = localStorage.getItem('path') || '/';
        history.push(path);
    }

    render() {
        return (
            <Router history = { history }>
                <div>
                    <ScrollToTop />
                    <Switch>
                        <PageWrapper>
                            <Route exact path = "/" component = { Home } />
                            <Route exact path = "/about" component = { AboutUs } />
                            <Route path = "/classes" component = { Classes } />

                            <PrivateRoute exact
                                          path = "/user/profile"
                                          minLevel = { 'user' }
                                          component = { ProfileUser }
                            />
                            <PrivateRoute exact
                                          path = "/coach/profile"
                                          minLevel = { 'coach' }
                                          component = { ProfileCoach }
                            />
                            <PrivateRoute exact
                                          path = "/admin/profile"
                                          minLevel = { 'admin' }
                                          component = { ProfileAdmin }
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
