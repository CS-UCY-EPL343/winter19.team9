import React, {Component} from 'react';

class Timetable extends Component {
    render() {
        return (
            <div>
                <div id="timeTableHeading">Weekly Schedule</div>
                <div className="row">
                    <div className="timetable">
                        <div className="week-names">
                            <div>monday</div>
                            <div>tuesday</div>
                            <div>w/day</div>
                            <div>thursday</div>
                            <div>friday</div>
                            <div>saturday</div>
                            <div className="weekend">sunday</div>
                        </div>
                        <div className="time-interval">
                            <div>8:00 - 10:00</div>
                            <div>10:00 - 12:00</div>
                            <div>12:00 - 14:00</div>
                            <div>14:00 - 16:00</div>
                            <div>16:00 - 18:00</div>
                            <div>18:00 - 20:00</div>
                        </div>
                        <div className="content">
                            <div>
                                <div className="accent-blue-gradient">Class D</div>
                            </div>
                            <div/>
                            <div/>
                            <div/>
                            <div>
                                <div className="accent-gunmetal-gradient">Class B</div>
                            </div>
                            <div/>
                            <div className="weekend"/>
                            <div/>
                            <div/>
                            <div/>
                            <div>
                                <div className="accent-red2-gradient">Practise</div>
                            </div>
                            <div/>
                            <div/>
                            <div className="weekend"/>
                            <div>
                                <div className="accent-red-gradient">Yoga Class</div>
                            </div>
                            <div/>
                            <div>
                                <div className="accent-grey-gradient">Class A</div>
                            </div>
                            <div/>
                            <div/>
                            <div/>
                            <div className="weekend"/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div className="weekend"/>
                            <div>
                                <div className="accent-blue-gradient">Zumba Class</div>
                            </div>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div className="weekend"/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div className="weekend"/>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Timetable;