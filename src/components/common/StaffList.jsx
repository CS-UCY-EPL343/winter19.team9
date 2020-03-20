import React, {Component}      from 'react';
import {getAdmins, getCoaches} from '../../repository';
import adminAvatar
                               from '../assets/img/logos/fitnessFactoryLogo.png';

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coaches: [],
      admins : [],
    };
  }

  componentDidMount() {
    // TODO get image when done
    getCoaches().then(response => {
      this.setState({
        coaches: response.map(c => {
          Object.defineProperty(c, 'Name',
              Object.getOwnPropertyDescriptor(c, 'CoachName'));
          delete c['CoachName'];
          return c;
        }),
      });
    });
    getAdmins().then(response => this.setState({admins: response}));
  }

  render() {
    // noinspection DuplicatedCode
    return (
        <div className = "row staff">
          <div className = "col-md-6">
            <div className = "box">
              <h3>Admins:</h3>
              { this.state.admins.map((admin, index) => {
                const timestamp = admin.Bdate.split(/[T.]+/)[0];
                const gender = admin.Gender === 1 ? 'Male': 'Female';
                return (
                    <div className = "admin" key={index}>
                      <div className = "img">
                        <img className = "img-responsive"
                             src = {adminAvatar}
                             alt = "admin"
                        />
                      </div>
                      <div className = "info">
                        <h3>{admin.Name} {admin.Surname}</h3>
                        <p>
                          Username: {admin.username}<br/>
                          Email: {admin.Email}<br/>
                          BDate: {timestamp}<br/>
                          Gender: {gender}
                        </p>
                      </div>
                    </div>
                );
              }) }
            </div>
          </div>
          <div className = "col-md-6">
            <div className = "box">
              <h3>Coaches:</h3>
              { this.state.coaches.map((coach, index) => {
                const timestamp = coach.Bdate.split(/[T.]+/)[0];
                const gender = coach.Gender === 1 ? 'Male': 'Female';
                return (
                    <div className = "admin" key={index}>
                      <div className = "img">
                        <img className = "img-responsive"
                             src = {adminAvatar}
                             alt = "admin"
                        />
                      </div>
                      <div className = "info">
                        <h3>{coach.Name} {coach.Surname}</h3>
                        <p>
                          Username: {coach.username}<br/>
                          Email: {coach.Email}<br/>
                          BDate: {timestamp}<br/>
                          Gender: {gender}
                        </p>
                      </div>
                    </div>
                );
              }) }
            </div>
          </div>
        </div>
    );
  }
}

export default StaffList;