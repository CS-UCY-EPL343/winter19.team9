import React, {Component} from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import '../assets/styles/announcementModal.css'

class Announcements extends Component {
    render() {
        return (
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal_background">
                            {/*// <!-- Modal Header -->*/}
                            <div className="modal-header" id="AnnouncementsHeader">
                                <h3>Fewest Announcement</h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                        </div>
                        {/*// <!-- Modal body -->*/}
                        <div className="modal-body">
                            {/*// <!-- Flexbox container for aligning the toasts -->*/}
                            <div aria-live="polite"
                                 aria-atomic="true"
                                 className="d-flex justify-content-center align-items-center"
                                 style="min-height: 200px;"
                            >
                                <div className="Announcements">
                                    <AnimatedOnScroll animationIn="fadeInLeft">
                                        <div id="ann" className="container mt-2">
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="card card-block">

                                                        <h5 className="card-title mt-3 mb-3">Announcement 1</h5>

                                                        <p className="card-text">This is a sample text to show how the
                                                            announcement section in our web app will work.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="card card-block">

                                                        <h5 className="card-title  mt-3 mb-3">Announcement 2</h5>

                                                        <p className="card-text">This is a sample text to show how the
                                                            announcement section in our web app will
                                                            work.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="card card-block">

                                                        <h5 className="card-title  mt-3 mb-3">Announcement 3</h5>

                                                        <p className="card-text">This is a sample text to show how the
                                                            announcement section in our web app will
                                                            work.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12">
                                                    <div className="card card-block">

                                                        <h5 className="card-title  mt-3 mb-3">Announcement 4</h5>

                                                        <p className="card-text">This is a sample text to show how the
                                                            announcement section in our web app will
                                                            work.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedOnScroll>
                                </div>

                            </div>
                        </div>

                        {/*// <!-- Modal footer -->*/}
                        <div className="modal_background">
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Announcements;