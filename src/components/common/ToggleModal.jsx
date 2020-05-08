import React                                                from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export default class ToggleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isBrowser: false, isAndroid: false};
  }

  // noinspection JSUnresolvedVariable,DuplicatedCode,
  componentDidMount() {
    // Opera 8.0+
    // noinspection JSUnresolvedVariable
    let isOpera = (!!window.opr) || !!window.opera
                  || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    // noinspection JSUnresolvedVariable
    let isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]"
    // noinspection ES6ModulesDependencies
    const {HTMLElement} = window;
    // noinspection ES6ModulesDependencies
    let isSafari = /constructor/i.test(HTMLElement) || (function(p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || (typeof safari !== 'undefined'));
    // Internet Explorer 6-11
    // noinspection JSUnresolvedVariable,PointlessBooleanExpressionJS
    let isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    let isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1 - 79
    // noinspection JSUnresolvedVariable
    let isChrome = !!window.chrome && (!!window.chrome.webstore
                                       || !!window.chrome.runtime);
    // Edge (based on chromium) detection
    // noinspection EqualityComparisonWithCoercionJS
    let isEdgeChromium = isChrome && (navigator.userAgent.indexOf('Edg')
                                      !== -1);
    // Blink engine detection
    let isBlink = (isChrome || isOpera) && !!window.CSS;

    this.setState({
      isBrowser: isOpera || isFirefox || isSafari || isIE || isEdge || isChrome
                 || isEdgeChromium || isBlink,
      isAndroid: navigator.userAgent.match(/Android/i),
    });
  }

  render() {
    let Comp = this.props.modalBody;
    // noinspection JSUnresolvedVariable
    return (
        <div>
          <Modal isOpen = { this.props.modal } toggle = { this.props.toggle }
                 size = { this.props.modalSize || 'lg' }
                 aria-labelledby = "contained-modal-title-vcenter"
                 centered
          >
            <ModalHeader toggle = { this.props.toggle }>{ this.props.modalHeader }</ModalHeader>
            <ModalBody>
              { React.cloneElement(Comp, {
                ...this.props,
              }) }
            </ModalBody>
            {/*{ this.state.isBrowser && !this.state.isAndroid &&*/ }
            <ModalFooter>
              <Button onClick = { this.props.toggle }>{ this.props.btnCancel
                                                        || 'Cancel' }</Button>
            </ModalFooter>
            {/*}*/ }
          </Modal>
        </div>
    );
  }
}
