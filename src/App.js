import React, { Component }               from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components
import PageWrapper                        from './components/PageWrapper';
import Home                               from './components/Pages/Home';
import Register                           from './components/Pages/Register';
import ScrollToTop                        from './components/Common/ScrollToTop';

class App extends Component {
    render() {
        return (
            <Router>
                <PageWrapper>

                    <Route
                        exact = { true }
                        path = "/"
                        component = { Home }
                    />

                    <Route
                        path = "/register"
                        component = { Register }
                    />

                </PageWrapper>

                <ScrollToTop />
            </Router>
        );
    }
}

export default App;
