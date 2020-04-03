import React, {Component} from 'react';
import  {useState} from 'react';

import "../assets/styles/PersonalTrainingTimetable.css"
// import "../assets/styles/Timetable.css"
import {
    getClasses, getPersonalTraining,
    getUserID,
    insertPT, postuserData,
    getClassSchedule,
    getClassName
} from "../../repository";
class EnrolledClassSchedule extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            refID: '',
            refIDs: [],
            trainingScheduleRet: [],
            flag: false,
            Coach_ID: '',
            User_ID: '',
            classSchedule: [],
            cIDs: [],
            cNames: [],
            ClassID : '',
            Name: '',
            ClassColors : ["#ff6666","#00cc99","#ffcc66","#9966ff","#66ccff","#ccff99","#ff9900"]
        };
        this.StateSetter = this.StateSetter.bind(this);
    }

    StateSetter(x, y, z) {
        this.setState({refIDs: x});
        this.setState({cIDs: y});
        this.setState({Names: z}, () => {
            console.log(this.state.Names);
        });
    }

    componentDidMount() {
        getUserID().then(response => {
            console.log(response);
            this.setState(
                {User_ID: response.User_ID}, () => {

                    // Gets the Class Name, ID, TimeCode and DayCode Based on the user's ID
                    //
                    getClassSchedule(this.state.User_ID).then(response => {
                        this.setState({classSchedule: response}, () => {
                            console.log("Class Schedule obtained! Here it comes!");
                            console.log(this.state.classSchedule);
                            let ret = this.state.classSchedule.slice(0);
                            let refID;
                            //console.log("Let's go to the mall");
                            //this.setState({Coach_ID: this.props.coachID, User_ID: this.props.userID});

                            (async ()=>{
                                console.log('foo');
                                let x = this.state.refIDs;
                                let y = this.state.cIDs;
                                let z = this.state.cNames;
                                const items = ret.map((item, key) => {
                                        if (item.TimeCode < 10) {
                                            this.setState({refID: item.DayCode + ".0" + item.TimeCode});
                                            refID = item.DayCode + ".0" + item.TimeCode;
                                        } else {
                                            this.setState({refID: item.DayCode + "." + item.TimeCode});
                                            refID = item.DayCode + "." + item.TimeCode;
                                        }
                                        if (!x.includes(refID)) {
                                            x.push(refID);
                                            y.push(item.ClassID);
                                            z.push(item.Name);
                                            const node = document.getElementById(refID);
                                            node.className = 'blackBackSelected';
                                            node.textContent = item.Name;
                                            console.log(item.Name);
                                        }
                                    }
                                );
                                await this.StateSetter(x, y, z);
                            })();
                        });
                    });
                });
        });


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
                prevProps.DayCode !== this.props.DayCode
                || prevProps.TimeCode !== this.props.TimeCode
                || prevProps.flag !== this.props.flag
        ) {

            let refID;
            console.log(this.props.DayCode + this.props.TimeCode + this.props.flag);

            if (this.props.TimeCode < 10) {
                this.setState({refID: this.props.DayCode + ".0" + this.props.TimeCode});
                refID = this.props.DayCode + ".0" + this.props.TimeCode;
            } else {
                this.setState({refID: this.props.DayCode + "." + this.props.TimeCode});
                refID = this.props.DayCode + "." + this.props.TimeCode;
            }

            this.setState({flag: this.props.flag});
            console.log(this.props.flag);

            // Create a new array based on current state:
            let x = this.state.refIDs.slice(0);
            let y = this.state.cIDs.slice(0);
            let z = this.state.Names.slice(0);

            if (!x.includes(refID) && this.props.flag === true) {
                // (async ()=>{
                    x.push(refID);
                    y.push(this.props.ClassID);
                    // getClassName(this.props.ClassID).then(response => {
                    //     console.log("Here comes the class name");
                    //     console.log(response);
                    //     z.push(response);
                    // });
                    z.push(this.props.Name);
                //     await
                    this.StateSetter(x, y, z);
                    // const node = this.myRef.current;
                    const node = document.getElementById(refID);
                    node.className = 'blackBackSelected';
                    node.textContent = this.props.Name;
                // })();

            } else {
                if (x.includes(refID) && this.props.flag === false) {
                    // (async ()=>{
                        // let x = this.state.refIDs.slice(0);
                        // let y = this.state.cIDs.slice(0);
                        // let z = this.state.Names.slice(0);
                        const newList = this.state.refIDs.slice(0);
                        newList.splice(this.state.refIDs.indexOf(refID), 1);
                        const newList2 = this.state.cIDs.slice(0);
                        newList2.splice(this.state.refIDs.indexOf(refID), 1);
                        const newList3 = this.state.cNames.slice(0);
                        // getClassName(this.props.ClassID).then(response => {
                        //     this.setState({cName:response});
                        // });

                        newList3.splice(this.state.refIDs.indexOf(refID), 1);
                        // this.setState({refIDs: newList});
                        // this.setState({cIDs: newList2});
                        // this.setState({cNames : newList3});
                    //     await
                        this.StateSetter(newList, newList2, newList3);
                    const node = document.getElementById(refID);
                    node.className = '';
                    node.textContent = '';
                    // })();
                }
            }
            
        }
    }

    render() {
        return (
            <div>
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
                            <div>8:00 - 09:00</div>
                            <div>09:00 - 10:00</div>
                            <div>10:00 - 11:00</div>
                            <div>11:00 - 12:00</div>
                            <div>12:00 - 13:00</div>
                            <div>13:00 - 14:00</div>
                            <div>14:00 - 15:00</div>
                            <div>15:00 - 16:00</div>
                            <div>16:00 - 17:00</div>
                            <div>17:00 - 18:00</div>
                            <div>18:00 - 19:00</div>
                            <div>19:00 - 20:00</div>
                        </div>
                        <div className="content" ref = {this.myRef}>

                            {[...Array(6).keys()].map(x => (x + 1.01).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}

                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.02).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.03).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{console.log(this.state.cIDs[this.state.refIDs.indexOf(x)])}*/}
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>

                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.04).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.05).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}

                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.06).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.07).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.08).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.09).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        //                                         style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.10).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        //                                         style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.11).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        //                                         style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.12).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        // style={{
                                        //     backgroundColor: this.state.refIDs.includes(x) ? '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString() : '#993333',
                                        // }}
                                        // className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index}
                                        id={x}>
                                        {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/}
                                    </div>
                                )}
                            <div className="weekend"/>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default EnrolledClassSchedule;