import React, {Component} from 'react';
// noinspection ES6CheckImport
import {Route, Router, Switch} from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import Home from './components/pages/Home';
import AboutUs from './components/pages/AboutUs';
import ProfileUser from './components/pages/ProfileUser';
import ProfileCoach from './components/pages/ProfileCoach';
import ProfileAdmin from './components/pages/ProfileAdmin';
import Classes from './components/pages/Classes';
import ScrollToTop from './components/common/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';
import forgotPassword from "./components/pages/ForgotPassword";
import VerifyEmail from "./components/pages/VerifyEmail";
import ResetPassword from "./components/pages/ResetPassword";
import history from './history';
import {getUserLevel, isAuthenticated} from './repository';
import UIDashboard from './components/pages/UIDashboard';
import Tabletop from 'tabletop';
import Spinner from './components/Spinner';
import NotFound from './components/common/NotFound';
import SignInUpModal from "./components/common/SignInUpModal";
import LoginAndroid from "./components/pages/LoginAndroid";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLevel: undefined,
            stylesheetData: {},
            loading: true,
        };
        this.setUserLevel = this.setUserLevel.bind(this);
    };

    componentDidMount() {
        // Persist on state
        if (isAuthenticated()) {
            getUserLevel().then(level => this.setUserLevel(level));
        }

        // noinspection JSUnusedGlobalSymbols
        Tabletop.init({
            key: process.env.REACT_APP_TABLETOP_API_KEY,
            callback: googleData => {
                this.setState({stylesheetData: this.readStylesheetInfo(googleData)},
                    () => {
                        this.setState({loading: false});
                    });
            },
            simpleSheet: false,
        });
    }

    readStylesheetInfo(data) {
        const home = data['Home'];
        const classes = data['Classes'];
        const about = data['About'];
        const footer = data['Footer'];
        const jsonData = {};

        // Home
        const jsonHome = {'carousel': [], 'services': []};
        home.columnNames.forEach(col => {
            if (col.includes('carousel')) {
                jsonHome['carousel'].push({
                    'label': home.elements[0][col],
                    'text': home.elements[1][col],
                    'src': home.elements[2][col],
                });
            }
            if (col.includes('services')) {
                jsonHome['services'].push({
                    'title': home.elements[0][col],
                    'message': home.elements[1][col],
                    'icon': home.elements[2][col],
                });
            }
        });

        // Classes
        const jsonClasses = {'classes': [], 'timetable': {}};
        classes.columnNames.forEach(col => {
            if (col.includes('class')) {
                jsonClasses['classes'].push({
                    'title': classes.elements[0][col],
                    'text': classes.elements[1][col],
                    'src': classes.elements[2][col],
                });
            }
            if (col.includes('timetable')) {
                jsonClasses['timetable'] = {'src': classes.elements[0][col]};
            }
        });

        // About
        const jsonAbout = {'coach': [], 'contact': {}};
        about.columnNames.forEach(col => {
            if (col.includes('coach')) {
                jsonAbout['coach'].push({
                    'name': about.elements[0][col],
                    'text': about.elements[1][col],
                    'src': about.elements[2][col],
                });
            }
            if (col.includes('contact')) {
                jsonAbout['contact']['address'] = about.elements[0][col];
                jsonAbout['contact']['phone'] = about.elements[1][col];
                jsonAbout['contact']['email'] = about.elements[2][col];
                jsonAbout['contact']['facebook'] = about.elements[3][col];
                jsonAbout['contact']['instagram'] = about.elements[4][col];
            }
        });

        // Footer
        const jsonFooter = {'social': {}, 'about-us': {}, 'about-club': []};
        footer.columnNames.forEach(col => {
            if (col.includes('social')) {
                jsonFooter['social']['text'] = footer.elements[0][col];
                jsonFooter['social']['facebook'] = footer.elements[1][col];
                jsonFooter['social']['instagram'] = footer.elements[2][col];
            }
            if (col.includes('about-us')) {
                jsonFooter['about-us']['address'] = footer.elements[0][col];
                jsonFooter['about-us']['email'] = footer.elements[1][col];
            }
            if (col.includes('about-club')) {
                for (let index of footer.elements) {
                    if (index['about-club']) {
                        jsonFooter['about-club'].push(index['about-club']);
                    }
                }
            }
        });

        jsonData['Home'] = jsonHome;
        jsonData['Class'] = jsonClasses;
        jsonData['About'] = jsonAbout;
        jsonData['Footer'] = jsonFooter;

        return jsonData;
    }

    setUserLevel = (userLevel) => {
        this.setState({userLevel});
    };

    render() {
        return (
            <>
                {
                    this.state.loading ?
                        <Spinner/>
                        :
                        <Router history={history}>
                            <PageWrapper userLevel={this.state.userLevel}
                                         setUserLevel={this.setUserLevel}
                                         stylesheetData={this.state.stylesheetData}
                            >
                                <ScrollToTop/>
                                <Switch>
                                    <Route exact
                                           path="/"
                                           component={(props) => <Home {...props}
                                                                       userLevel={this.state.userLevel}
                                                                       stylesheetData={this.state.stylesheetData}
                                           />}
                                    />
                                    <Route path="/about"
                                           component={(props) => <AboutUs {...props}
                                                                          userLevel={this.state.userLevel}
                                                                          stylesheetData={this.state.stylesheetData}
                                           />}
                                    />
                                    <Route path="/classes"
                                           component={(props) => <Classes {...props}
                                                                          userLevel={this.state.userLevel}
                                                                          stylesheetData={this.state.stylesheetData}
                                           />}
                                    />

                                  <Route exact
                                         path="/loginAndroid"
                                         component={(props) => <LoginAndroid {...props}
                                                                             setUserLevel={this.setUserLevel}
                                                                             userLevel={this.state.userLevel}
                                                                             stylesheetData={this.state.stylesheetData}
                                         />}
                                  />

                                    <Route exact path="/forgotPassword" component={forgotPassword}/>
                                    <Route exact path="/verifyEmail/:id" component={VerifyEmail}/>
                                    <Route exact path={"/resetPassword/:id"} component={ResetPassword}/>

                                    <PrivateRoute path="/user/profile"
                                                  component={ProfileUser}
                                                  userLevel={this.state.userLevel}
                                    />
                                    <PrivateRoute path="/coach/profile"
                                                  component={ProfileCoach}
                                                  userLevel={this.state.userLevel}
                                    />
                                    <PrivateRoute path="/admin/profile"
                                                  component={ProfileAdmin}
                                                  userLevel={this.state.userLevel}
                                    />
                                    <PrivateRoute path="/admin/dashboard"
                                                  component={UIDashboard}
                                                  userLevel={this.state.userLevel}
                                    />
                                    <Route component={NotFound}/>
                                </Switch>
                            </PageWrapper>

                        </Router>


                }
            </>
        );
    }
}

export default App;
