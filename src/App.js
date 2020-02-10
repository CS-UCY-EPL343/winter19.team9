import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageWrapper from "./components/PageWrapper";
import Home        from "./components/pages/Home";
import AboutUs     from "./components/pages/AboutUs";
import Profile     from "./components/pages/Profile";
import Classes     from "./components/pages/Classes";
import ScrollToTop from "./components/common/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ScrollToTop />
                    <Switch>
                        <PageWrapper>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={AboutUs} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <Route path="/classes" component={Classes} />
                            {/* <Route path="*" component={ NotFound } /> */}
                        </PageWrapper>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
