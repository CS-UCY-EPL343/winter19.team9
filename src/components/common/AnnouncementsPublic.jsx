import React, {Component} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/AnnouncementsPublic.css';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';
import Announcement from './Announcement';
import AnnouncementModal from './AnnouncementModal';
import {
    getPublicAnnouncements,
    isAuthenticated,
    removeAnnouncement,
    addAnnouncement,
} from '../../repository';

class AnnouncementsPublic extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            modal: false,
            level: 0,
        };
        this.slickAdd = this.slickAdd.bind(this);
        this.slickRemove = this.slickRemove.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    // need to see
    componentDidMount() {
        this._isMounted = true;

        let l = 0;
        if (isAuthenticated()) {
            const level = this.props.userLevel;
            if (level === 'user') {
                l = 1;
            } else if (level === 'coach') {
                l = 2;
            } else if (level === 'admin') {
                l = 3;
            }
        }
        this.setState({level: l});

        getPublicAnnouncements().then(response => {
            if (this._isMounted) {
                this.setState(
                    {announcements: response.data.announcements});
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggle = () => {
        if (this.state.level <= 1) {
            return;
        }

        this.setState({modal: !this.state.modal});
    };

    slickAdd = (Title, Message) => {
        if (this.state.level <= 1) {
            return;
        }

        if (Title === '' || Message === '') {
            alert('Please give correct data.');
            return;
        }

        this.toggle();

        addAnnouncement(Title, Message).then(response => {
            let prevAnn = this.state.announcements.slice(0);
            prevAnn.push(
                {
                    ANNOUNCEMENT_ID: response.data.ANNOUNCEMENT_ID,
                    Title: Title,
                    Message: Message,
                });
            // console.log(announcements);
            this.setState({announcements: prevAnn});
            console.log(prevAnn);
        }).catch(err => alert(err));
    };

    slickRemove = (ANNOUNCEMENT_ID) => {
        if (this.state.level <= 1) {
            return;
        }

        removeAnnouncement(ANNOUNCEMENT_ID).then(() => {
            this.setState({
                announcements: this.state.announcements.filter(
                    ann => ann.ANNOUNCEMENT_ID
                        !== ANNOUNCEMENT_ID),
            });
        }).catch(err => alert(err));

    };

    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            centerPadding: 0,
            centerMode: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };
        return (
            <div id='AnnouncementsPub'>
                <AnimatedOnScroll animationIn="fadeInLeft">
                    <div id="ann-container"
                         className="container-fluid mt-2"
                    >
                        <h1 className="ann-title">Announcements</h1>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="ann-cards">
                                    <Slider {...settings}>
                                        {/*//need to see for public*/}
                                        {this.state.announcements.sort(
                                            function (a, b) {
                                                return b.ANNOUNCEMENT_ID
                                                    - a.ANNOUNCEMENT_ID;
                                            }).map(ann => {
                                            return <Announcement key={ann.ANNOUNCEMENT_ID}
                                                                 isAdder={false}
                                                                 id={ann.ANNOUNCEMENT_ID}
                                                                 title={ann.Title}
                                                                 message={ann.Message}
                                                                 slickRemove={this.slickRemove}
                                                                 level={this.state.level}
                                            />;
                                        })}
                                        {this.state.announcements.length === 0
                                        &&
                                        <Announcement isAdder={true}
                                                      id={0}
                                                      slickAdd={this.toggle}
                                                      level={this.state.level}
                                        />}
                                        {this.state.announcements.length <= 1
                                        &&
                                        <Announcement isAdder={true}
                                                      id={0}
                                                      slickAdd={this.toggle}
                                                      level={this.state.level}
                                        />}
                                        {this.state.announcements.length <= 2
                                        &&
                                        <Announcement
                                            isAdder={true}
                                            id={0}
                                            slickAdd={this.toggle}
                                            level={this.state.level}
                                        />}
                                        {this.state.level <= 1
                                        &&
                                        this.state.announcements.length <= 3
                                        &&
                                        <Announcement
                                            isAdder={true}
                                            id={0}
                                            slickAdd={this.toggle}
                                            level={this.state.level}
                                        />}
                                        {this.state.level >= 2
                                        &&
                                        <Announcement isAdder={true}
                                                      id={0}
                                                      slickAdd={this.toggle}
                                                      level={this.state.level}
                                        />}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedOnScroll>

                <AnnouncementModal onSubmit={this.slickAdd}
                                   toggle={this.toggle}
                                   modal={this.state.modal}
                />
            </div>
        );
    }
}

export default AnnouncementsPublic;