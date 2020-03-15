import React, {Component} from 'react';

class StaffList extends Component {
  render() {
    return (
        <div className = "row staff">
          <div className = "col-md-6">
            <div className = "box">
              <h3>Admins:</h3>
              <div className = "admin">
                <div className = "img">
                  <img className = "img-responsive"
                       src = "https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148906966/small/1501685402/enhance"
                       alt = "admin"
                  />
                </div>
                <div className = "info">
                  <h3>Joge Lucky</h3>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
              <div className = "admin">
                <div className = "img">
                  <img className = "img-responsive"
                       src = "https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907137/small/1501685404/enhance"
                       alt = "admin"
                  />
                </div>
                <div className = "info">
                  <h3>Joge Lucky</h3>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
              <div className = "admin">
                <div className = "img">
                  <img className = "img-responsive"
                       src = "https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907019/small/1501685403/enhance"
                       alt = "admin"
                  />
                </div>
                <div className = "info">
                  <h3>Joge Lucky</h3>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
          <div className = "col-md-6">
            <div className = "box">
              <h3>Coaches:</h3>
              <div className = "admin">
                <div className = "img">
                  <img className = "img-responsive"
                       src = "https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907114/small/1501685404/enhance"
                       alt = "admin"
                  />
                </div>
                <div className = "info">
                  <h3>Joge Lucky</h3>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
              <div className = "admin">
                <div className = "img">
                  <img className = "img-responsive"
                       src = "https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907086/small/1501685404/enhance"
                       alt = "admin"
                  />
                </div>
                <div className = "info">
                  <h3>Joge Lucky</h3>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
              <div className = "admin">
                <div className = "img">
                  <img className = "img-responsive"
                       src = "https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
                       alt = "admin"
                  />
                </div>
                <div className = "info">
                  <h3>Joge Lucky</h3>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default StaffList;