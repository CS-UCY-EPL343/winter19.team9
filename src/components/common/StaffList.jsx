import React, {Component} from 'react';
import Swal               from 'sweetalert2';
import {
  deleteAdmin,
  getAdmins,
  getCoaches,
  deleteCoach,
  countPT,
  countClasses,
}                         from '../../repository';
import adminAvatar
                          from '../assets/img/logos/fitnessFactoryLogo.png';
import ToggleModal        from './ToggleModal';
import CreateStaffMember  from './CreateStaffMember';

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coaches   : [],
      admins    : [],
      staffType : '',
      modal     : false,
      countTotal: 0,
    };
    this.DeleteCoach = this.DeleteCoach.bind(this);
    this.DeleteAdmin = this.DeleteAdmin.bind(this);
    this.createAdmin = this.createAdmin.bind(this);
    this.createCoach = this.createCoach.bind(this);
    this.addStaffMember = this.addStaffMember.bind(this);
  }

  componentDidMount() {
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

  DeleteAdmin(e) {
    // noinspection JSUnresolvedVariable
    const AdminId = e.target.className.split(' ')[3] === 'admin'
        ? this.state.admins[e.target.className.split(' ')[2]].AccountID
        : this.state.coaches[e.target.className.split(' ')[2]].AccountID;

    Swal.fire({
      title             : 'Are you sure?',
      text              : 'You won\'t be able to revert this!',
      icon              : 'warning',
      showCancelButton  : true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor : '#DD3333',
      confirmButtonText : 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        deleteAdmin(AdminId).then(() => {
          Swal.fire(
              'Account deleted successfully',
              '',
              'success',
          ).then(() => {
            this.setState({
              admins: this.state.admins.filter(
                  admin => admin.AccountID !== AdminId),
            });
          });
        }).catch(() => Swal.fire(
            'Something went wrong',
            'Please try again...',
            'error',
        ));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelled',
            'Your Account is safe :)',
            'error',
        ).then();
      }
    });
  }

  DeleteCoach = (e) => {
    // noinspection JSUnresolvedVariable
    const CoachID = e.target.className.split(' ')[3] === 'admin'
        ? this.state.admins[e.target.className.split(' ')[2]].AccountID
        : this.state.coaches[e.target.className.split(' ')[2]].AccountID;

    Swal.fire({
      title             : 'Are you sure?',
      text              : 'You won\'t be able to revert this!',
      icon              : 'warning',
      showCancelButton  : true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor : '#DD3333',
      confirmButtonText : 'Yes, delete it!',
    }).then(async (result) => {
      let countTotal = 0;
      await countPT(CoachID).then(response => {
        countTotal += response.countTotal;
        return countTotal;
      });
      await countClasses(CoachID).then(response => {
        countTotal += response.countTotal;
        return countTotal;
      });

      if (result.value && countTotal === 0) {
        deleteCoach(CoachID).then(() => {
          Swal.fire(
              'Account deleted successfully',
              '',
              'success',
          ).then(() => {
            this.setState({
              coaches: this.state.coaches.filter(
                  coach => coach.AccountID !== CoachID),
            });
          });
        }).catch(() => Swal.fire(
            'Something went wrong',
            'Please try again...',
            'error',
        ));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelled',
            'Your Account is safe :)',
            'error',
        ).then();
      } else if (countTotal !== 0) {
        Swal.fire(
            'Cancelled',
            'You must go and change the classes and the personal training :)',
            'error',
        ).then();
      }
    });
  }

  createAdmin() {
    this.setState({staffType: 'admin'});
    this.toggleModal();
  }

  createCoach() {
    this.setState({staffType: 'coach'});
    this.toggleModal();
  }

  addStaffMember = (staff, staffType, coaches, admins) => {
    if (staffType === 'admin') {
      admins.push(staff);
      this.setState({admins, coaches});
    } else if (staffType === 'coach') {
      coaches.push(staff);
      this.setState({admins, coaches});
    }
  };

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
                // noinspection JSUnresolvedVariable
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
                      { admin.username !== 'its.giff' ?
                          <button className = "delete-admin"
                          >
                            <i className = { 'fa fa-trash ' + index
                                             + ' admin' }
                               onClick = { this.DeleteAdmin }
                            />
                          </button>
                          :
                          <button className = "delete-admin"
                                  style = { {'pointerEvents': 'none'} }
                                  disabled = { true }
                          >
                            <i className = { 'fa fa-trash slash' + index
                                             + ' admin' }
                            />
                          </button>
                      }
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
                // noinspection JSUnresolvedVariable
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
                      { (coach.username !== ('headcoach01')) ?
                          <button className = "delete-admin"
                          >
                            <i className = { 'fa fa-trash ' + index
                                             + ' coach' }
                               onClick = { this.DeleteCoach }
                            />
                          </button>
                          :
                          <button className = "delete-admin"
                                  style = { {'pointerEvents': 'none'} }
                                  disabled = { true }
                          >
                            <i className = { 'fa fa-trash slash' + index
                                             + ' coach' }
                            />
                          </button>
                      }
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
                <CreateStaffMember staffType = { this.state.staffType }
                                   onSuccess = { this.addStaffMember }
                                   coaches = { this.state.coaches }
                                   admins = { this.state.admins }
                                   toggle = { this.toggleModal }
                /> }
          />
        </div>
    );
  }
}

export default StaffList;