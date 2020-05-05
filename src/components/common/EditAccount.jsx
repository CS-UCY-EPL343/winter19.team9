import React, {Component} from 'react';
import {CSVLink}          from 'react-csv';
import '../assets/styles/EditAccountModal.css';
import {logOut, userData} from '../../repository';
import {postuserData}     from '../../repository';
import {deleteUserData}   from '../../repository';
import Swal               from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import Spinner            from '../Spinner';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file           : '',
      imagePreviewUrl: '',
      username       : '',
      Email          : '',
      Name           : '',
      Surname        : '',
      password       : '',
      confirmPassword: '',
      image          : '',
      flag           : '1',
      csvData        : [],
      Bdate          : '',
      Age            : '',
      dataPT         : [],
      classes        : [],
      loading        : true,
      Medical_History: '',
      Phone_Number   : '',
    };
    this.onValueInput = this.onValueInput.bind(this);
  }

  handleSubmit = () => {
    const {password, confirmPassword} = this.state;
    // perform all neccassary validations
    if (password !== confirmPassword) {
      Swal.fire(
          'Passwords don\'t match',
          '',
          'error',
      ).then();
      return 0;
    } else {
      return 1;
    }

  };

  refreshPage() {
    window.location.reload(false);
  }

  deleted = () => {
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
        deleteUserData().then(() => {
          Swal.fire(
              'Public Announcement deleted successfully',
              '',
              'success',
          ).then(() => {
            logOut();
            window.location.replace('/');
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
  };
  fillCSV = (
      name, surname, email, medical_history, phone_number, username, password,
      bdate, age, PT, classes) => {
    // console.log(name);
    //
    // this.state.csvData =[
    //     ["firstname", "lastname", "email","username","password"]];
    // console.log("THIS IS THE COACH: \n");
    // console.log(PT[0].c);
    let day = '';
    let x = '';
    let time = '';
    let coach = '';
    let classname = '';
    let array = [
      ['Personal Information'], [],
      [
        'Firstname',
        'Lastname',
        'Email',
        'username',
        'password',
        'Phone Number',
        ' Date of Birth',
        'Age',
      ],
      [name, surname, email, username, password, phone_number, bdate, age], [],
      ['Medical History'], [],
      [medical_history],
      ['Personal Training Schedule'], [],
      ['Day', 'Time', 'Coach'],

    ];

    for (let i = 0; i < PT.length; i++) {
      x = PT[i];
      for (let myKey in x) {
        if (myKey === 'Day') {
          // noinspection JSUnfilteredForInLoop
          if (x[myKey] === 1) {
            day = 'Monday';
          } else { // noinspection JSUnfilteredForInLoop
            if (x[myKey] === 2) {
              day = 'Tuesday';
            } else { // noinspection JSUnfilteredForInLoop
              if (x[myKey] === 3) {
                day = 'Wednesday';
              } else { // noinspection JSUnfilteredForInLoop
                if (x[myKey] === 4) {
                  day = 'Thursday';
                } else { // noinspection JSAssignmentUsedAsCondition,JSUnfilteredForInLoop
                  if (x[myKey] === 6) {
                    day = 'Saturday';
                  } else {
                    day = 'Sunday';
                  }
                }
              }
            }
          }
        } else if (myKey === 'Time') {
          // noinspection DuplicatedCode,JSUnfilteredForInLoop
          if (x[myKey] === 1) {
            time = '8:00 - 09:00';
          } else { // noinspection JSUnfilteredForInLoop
            if (x[myKey] === 2) {
              time = '9:00 - 10:00';
            } else { // noinspection JSUnfilteredForInLoop
              if (x[myKey] === 3) {
                time = '10:00 - 11:00';
              } else { // noinspection JSUnfilteredForInLoop
                if (x[myKey] === 4) {
                  time = '11:00 - 12:00';
                } else { // noinspection JSUnfilteredForInLoop
                  if (x[myKey] === 5) {
                    time = '12:00 - 13:00';
                  } else { // noinspection JSUnfilteredForInLoop
                    if (x[myKey] === 6) {
                      time = '13:00 - 14:00';
                    } else { // noinspection JSUnfilteredForInLoop
                      if (x[myKey] === 7) {
                        time = '14:00 - 15:00';
                      } else { // noinspection JSUnfilteredForInLoop
                        if (x[myKey] === 8) {
                          time = '15:00 - 16:00';
                        } else { // noinspection JSUnfilteredForInLoop
                          if (x[myKey] === 9) {
                            time = '16:00 - 17:00';
                          } else { // noinspection JSUnfilteredForInLoop
                            if (x[myKey] === 10) {
                              time = '17:00 - 18:00';
                            } else { // noinspection JSUnfilteredForInLoop
                              if (x[myKey] === 11) {
                                time = '18:00 - 19:00';
                              } else {
                                time = '19:00 - 20:00';
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else if (myKey === 'CoachName') {
          // noinspection JSUnfilteredForInLoop
          coach = x[myKey];
        }

      }
      array.push([day, time, coach]);
    }

    array.push([], ['Enrolled Classes Schedule'], [],
        ['Day', 'Time', 'ClassName']);
    for (let i = 0; i < classes.length; i++) {
      x = classes[i];
      for (let myKey in x) {
        if (myKey === 'DayCode') {
          // noinspection JSUnfilteredForInLoop
          if (x[myKey] === 1) {
            day = 'Monday';
          } else { // noinspection JSUnfilteredForInLoop
            if (x[myKey] === 2) {
              day = 'Tuesday';
            } else { // noinspection JSUnfilteredForInLoop
              if (x[myKey] === 3) {
                day = 'Wednesday';
              } else { // noinspection JSUnfilteredForInLoop
                if (x[myKey] === 4) {
                  day = 'Thursday';
                } else { // noinspection JSUnfilteredForInLoop
                  if (x[myKey] === 5) {
                    day = 'Friday';
                  } else { // noinspection JSUnfilteredForInLoop
                    if (x[myKey] === 6) {
                      day = 'Saturday';
                    } else {
                      day = 'Sunday';
                    }
                  }
                }
              }
            }
          }
        } else if (myKey === 'TimeCode') {
          // noinspection DuplicatedCode,JSUnfilteredForInLoop
          if (x[myKey] === 1) {
            time = '8:00 - 09:00';
          } else { // noinspection JSUnfilteredForInLoop
            if (x[myKey] === 2) {
              time = '9:00 - 10:00';
            } else { // noinspection JSUnfilteredForInLoop
              if (x[myKey] === 3) {
                time = '10:00 - 11:00';
              } else { // noinspection JSUnfilteredForInLoop
                if (x[myKey] === 4) {
                  time = '11:00 - 12:00';
                } else { // noinspection JSUnfilteredForInLoop
                  if (x[myKey] === 5) {
                    time = '12:00 - 13:00';
                  } else { // noinspection JSUnfilteredForInLoop
                    if (x[myKey] === 6) {
                      time = '13:00 - 14:00';
                    } else { // noinspection JSUnfilteredForInLoop
                      if (x[myKey] === 7) {
                        time = '14:00 - 15:00';
                      } else { // noinspection JSUnfilteredForInLoop
                        if (x[myKey] === 8) {
                          time = '15:00 - 16:00';
                        } else { // noinspection JSUnfilteredForInLoop
                          if (x[myKey] === 9) {
                            time = '16:00 - 17:00';
                          } else { // noinspection JSUnfilteredForInLoop
                            if (x[myKey] === 10) {
                              time = '17:00 - 18:00';
                            } else { // noinspection JSUnfilteredForInLoop
                              if (x[myKey] === 11) {
                                time = '18:00 - 19:00';
                              } else {
                                time = '19:00 - 20:00';
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else if (myKey === 'Name') {
          // noinspection JSUnfilteredForInLoop
          classname = x[myKey];
        }

      }
      array.push([day, time, classname]);
    }

    return array;

    // return   this.state.csvData =[
    //     ["Firstname", "Lastname", "Email","username","password"," Date of
    // Birth","Age"],
    // [name,surname,email,username,password,bdate,age,PT[0].CoachName],
    // ["Personal Training"], ["Day", "Time", "Coach"]  ];
  };

  componentDidMount() {
    // const {name,surname,email,username,password} = '';
    userData()
        .then(response => {
          console.log(response);
          this.setState(response);
          this.setState({confirmPassword: response.password});
        }).then(() => this.setState({loading: false}));
    //this.props.showUrl(this.props.location.pathname)
    //this.fillCSV(name,surname,email,username,password);

  }

  onValueInput = (e) => {
    // if (e.target.value.length === 0) {
    //   this.setState({flag: '0'});
    // } else {
    //   this.setState({flag: '1'});
    // }

    this.setState({[e.target.name]: e.target.value});
  };

  Test = () => {
    //console.log(this.state.Name);
    // if (this.state.flag === '0') {
    //   Swal.fire(
    //       'Please fill in all boxes',
    //       '',
    //       'error',
    //   ).then();
    // }
    if (this.handleSubmit()) {
      postuserData(this.state)
          .then(() => {
            Swal.fire(
                'Saved Changes',
                '',
                'success',
            ).then();
          }).catch(() => Swal.fire(
          'Something went wrong',
          'Please try again...',
          'error',
      ));
    } else {
      Swal.fire(
          'Passwords do not match',
          'Please try again...',
          'error',
      ).then();
    }

  };
  onSubmit = (e) => {
    e.preventDefault();

    if ((this.state.noValidate === 1) || !(
        this.state.Name.match(new RegExp('[a-zA-Z ]+')) &&
        this.state.Email.match(
            new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')) &&
        this.state.Surname.match(new RegExp('^ *[a-zA-Z0-9]+.')) &&
        this.state.username.match(new RegExp('^ *[a-zA-Z0-9]+.')))) {
      Swal.fire(
          'Please fill all the fields Correctly',
          '',
          'error',
      ).then();
      return;
    }
    this.Test();
  };
  checkPhoneNo = (number) => {
    if (number === '0') {
      this.setState({Phone_Number: ''});

    }
    return this.state.Phone_Number;
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();

    // noinspection
    // TypeScriptValidateTypes,TypeScriptValidateJSTypes,JSValidateTypes
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file           : file,
        imagePreviewUrl: reader.result,
      });

    };
    if (file.size > 5000000) {
      alert('Maximum File Size must be 5Mb!');
      return;
    }
    //let x = this.state.imagePreviewUrl;
    // let byteString = x.split(',')[1];

    // let blob = base64ToBlob(byteString, 'image/jpg');

    reader.readAsDataURL(file);
  }

  render() {

    let imageURL = 'data:image/png;base64,' + new Buffer(this.state.image,
        'binary').toString('base64');

    let $imagePreview = null;
    if (this.state.image !== '') {
      $imagePreview = (<img src = { imageURL } alt = { 'Profile Avatar' } />);
    }
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<img src = { this.state.imagePreviewUrl }
                            alt = { 'Profile Avatar' }
      />);
    }

    return (
        <div className = "container" id = "EditModal">
          { this.state.loading ?
              <Spinner style = { {
                'height'         : '250px',
                'backgroundColor': 'transparent',
              } }
              /> :
              <AnimatedOnScroll animationIn = "slideInDown">
                <div className = "text-center">
                  <div className = "avatar-upload">
                    <div className = "avatar-edit">
                      <input type = 'file'
                             id = "imageUpload"
                             accept = ".png, .jpg, .jpeg"
                             onChange = { (e) => this._handleImageChange(e) }

                      />
                      <label htmlFor = "imageUpload" />
                    </div>
                    <div className = "avatar-preview">
                      <div id = "imagePreview">{ $imagePreview }</div>
                    </div>
                  </div>

                </div>
                <form className = "form-horizontal needs-validation"
                      noValidate = "novalidate"
                      onSubmit = { this.onSubmit }
                >
                  <h3>Personal info</h3>
                  <div className = "form-group">
                    <label className = "col-lg-6 control-label">First
                                                                name:</label>
                    <input className = "form-control first-name-field"
                           name = { 'Name' }
                           onChange = { this.onValueInput }
                           type = "text"
                           defaultValue = { this.state.Name }
                           required = "required"
                           pattern = "[a-zA-Z ]+"
                    /> <span className = "message" />
                  </div>
                  <div className = "form-group">
                    <label className = "col-lg-6 control-label">Last
                                                                name:</label>
                    <input className = "form-control last-name-field"
                           name = { 'Surname' }
                           onChange = { this.onValueInput }
                           type = "text"
                           defaultValue = { this.state.Surname }
                           required = "required"
                           pattern = "[a-zA-Z ]+"
                    /> <span className = "message" />
                  </div>

                  <div className = "form-group">
                    <label className = "col-lg-3 control-label">Email:</label>
                    <input className = "form-control email-field"
                           name = { 'Email' }
                           onChange = { this.onValueInput }
                           type = "text"
                           defaultValue = { this.state.Email }
                           required = "required"
                           pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    /> <span className = "message" />
                  </div>
                  <div className = "form-group">
                    <label className = "col-md-6 control-label">Phone
                                                                Number:</label>
                    <input className = "form-control tel-field"
                           name = { 'Phone_Number' }
                           onChange = { this.onValueInput }
                           type = "text"
                           defaultValue = { this.checkPhoneNo(
                               this.state.Phone_Number) }
                           pattern = "[0-9]{8}|[0-9]{11}"
                        //required = "required"
                    /> <span className = "message" />
                  </div>

                  <div className = "form-group">
                    <label className = "col-md-3 control-label">Username:</label>
                    <input className = "form-control username-field"
                           name = { 'username' }
                           onChange = { this.onValueInput }
                           type = "text"
                           defaultValue = { this.state.username }
                           pattern = "[a-zA-Z0-9 ]+"
                           required = "required"
                    /> <span className = "message" />
                  </div>
                  <div className = "form-group">
                    <label className = "col-md-3 control-label">Password:</label>
                    <input className = "form-control"
                           name = { 'password' }
                           onChange = { this.onValueInput }
                           type = "password"
                           defaultValue = { this.state.password }
                           required = "required"
                    />
                  </div>
                  <div className = "form-group">
                    <label className = "col-md-6 control-label">Confirm
                                                                password:</label>
                    <input className = "form-control"
                           name = { 'confirmPassword' }
                           onChange = { this.onValueInput }
                           type = "password"
                           defaultValue = { this.state.confirmPassword }
                           required = "required"
                    />
                  </div>
                  <div className = "form-group">
                    <label className = "col-lg-6 control-label">Add Medical
                                                                History:</label>
                    <textarea maxLength = "400"
                              className = "form-control last-name-field"
                              name = { 'Medical_History' }
                              onChange = { this.onValueInput }
                              defaultValue = { this.state.Medical_History }
                              pattern = "[a-zA-Z ]+"

                    /> <span className = "message" />
                  </div>
                  <div className = "form-group" id = "buttons">
                    <label className = "col-md-12 control-label" id = "savel">
                      <input type = "submit"
                             className = "btn btn-primary"
                             defaultValue = "Save Changes"
                             id = "save"
                      />
                    </label>
                    <label className = "col-md-12 control-label" id = "resetl">
                      <input onClick = { this.refreshPage }
                             type = "reset"
                             className = "btn btn-default"
                             value = "Reset"
                             id = "reset"
                      />
                      <input type = "button"
                             className = "btn btn-default"
                             defaultValue = "Delete Account"
                             id = "delete"
                             onClick = { this.deleted }
                      />

                    </label>

                    <label id = "csv">
                      <CSVLink data = { this.fillCSV(this.state.Name,
                          this.state.Surname, this.state.Email,
                          this.state.Medical_History, this.state.Phone_Number,
                          this.state.username, this.state.password,
                          this.state.Bdate, this.state.Age, this.props.dataPT,
                          this.props.classes) }
                      >Download my Data</CSVLink>
                    </label>
                  </div>
                </form>
              </AnimatedOnScroll>
          }
        </div>
    );
  }
}

export default EditAccount;