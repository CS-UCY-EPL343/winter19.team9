import React, {Component}      from 'react';
 import {getAdmins, getCoaches} from '../../repository';
import adminAvatar
                               from '../assets/img/logos/fitnessFactoryLogo.png';
import ToggleModal             from './ToggleModal';
import CreateStaffMember       from './CreateStaffMember';

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coaches  : [],
      admins   : [],
      staffType: '',
      modal    : false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.createAdmin = this.createAdmin.bind(this);
    this.createCoach = this.createCoach.bind(this);
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

  toggleModal = () => {
    this.setState({modal: !this.state.modal});
  };

  handleDelete(e) {
    // noinspection JSUnresolvedVariable
    const selectedStaffId = e.target.className.split(' ')[3] === 'admin'
        ? this.state.admins[e.target.className.split(' ')[2]].AccountID
        : this.state.coaches[e.target.className.split(' ')[2]].AccountID;
    console.log(selectedStaffId);
  }

  createAdmin() {this.setState({staffType: 'admin'}); this.toggleModal();}

  createCoach() {this.setState({staffType: 'coach'}); this.toggleModal();}

  render() {
    // noinspection DuplicatedCode
    return (
        <div className = "row staff">
          <div className = "col-md-6">
            <div className = "box">
              <h3>Admins:</h3>
              <button className = { 'add-admin btn btn-primary btn-xl text-uppercase' }
                      onClick = { this.createAdmin }
              >
                Create New Admin
              </button>
              { this.state.admins.map((admin, index) => {
                const timestamp = admin.Bdate.split(/[T.]+/)[0];
                const gender = admin.Gender === 1 ? 'Male' : 'Female';
                return (
                    <div className = "admin" key = { index }>
                      <div className = "img">
                        <img className = "img-responsive"
                             src = { adminAvatar }
                             alt = "admin"
                        />
                      </div>
                      <div className = "info">
                        <h3>{ admin.Name } { admin.Surname }</h3>
                        <p>
                          Username: { admin.username }<br />
                          Email: { admin.Email }<br />
                          BDate: { timestamp }<br />
                          Gender: { gender }
                        </p>
                      </div>
                      <button className = "delete-admin">
                        <i className = { 'fa fa-trash ' + index
                                         + ' admin' }
                           onClick = { this.handleDelete }
                        />
                      </button>
                    </div>
                );
              }) }
            </div>
          </div>
          <div className = "col-md-6">
            <div className = "box">
              <h3>Coaches:</h3>
              <button className = { 'add-admin btn btn-primary btn-xl text-uppercase' }
                      onClick = { this.createCoach }
              >
                Create New Coach
              </button>
              { this.state.coaches.map((coach, index) => {
                const timestamp = coach.Bdate.split(/[T.]+/)[0];
                const gender = coach.Gender === 1 ? 'Male' : 'Female';
                return (
                    <div className = "admin" key = { index }>
                      <div className = "img">
                        <img className = "img-responsive"
                             src = { adminAvatar }
                             alt = "admin"
                        />
                      </div>
                      <div className = "info">
                        <h3>{ coach.Name } { coach.Surname }</h3>
                        <p>
                          Username: { coach.username }<br />
                          Email: { coach.Email }<br />
                          BDate: { timestamp }<br />
                          Gender: { gender }
                        </p>
                      </div>
                      <button className = "delete-admin">
                        <i className = { 'fa fa-trash ' + index
                                         + ' coach' }
                           onClick = { this.handleDelete }
                        />
                      </button>
                    </div>
                );
              }) }
            </div>
          </div>

          <ToggleModal
              modal = { this.state.modal }
              toggle = { this.toggleModal }
              modalSize = { 'md' }
              modalHeader = { 'Create New Staff' }
              modalBody = {
                <CreateStaffMember staffType={this.state.staffType} /> }
          />
        </div>
    );
  }
}

export default StaffList;