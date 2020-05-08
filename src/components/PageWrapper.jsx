import React, {Component} from 'react';
import $                  from 'jquery';
import Navigation         from './common/Navigation';
import Footer             from './common/Footer';

class PageWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isBrowser: false,
      isAndroid: false,
      width    : window.innerWidth,
      height   : window.innerHeight,
    };
  }

  componentDidMount() {
    this.handleClick();

    // Opera 8.0+
    // noinspection JSUnresolvedVariable,DuplicatedCode
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

    this.handleJSCode();
  }

  handleJSCode = () => {
    // -------------------------------------------- Window Change
// ---------------------------------------------------------// Check scrolling
    window.onscroll = function() {
      scrollFunction();
    };

    /**
     * When the user scrolls down 20px from the top of the document, show the
     * button and NavBar Background
     */
    function scrollFunction() {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop
          > 50) {
        if (window.innerWidth > 500) {
          document.getElementById('to-top').style.display = 'block';
          document.getElementById('mainNav').style.backgroundColor = '#353535';
        } else {
          document.getElementById('to-top').style.display = 'none';
          document.getElementById('mainNav').style.backgroundColor =
              'transparent';
        }
      } else {
        document.getElementById('to-top').style.display = 'none';
        document.getElementById('mainNav').style.backgroundColor =
            'transparent';
      }
    }
  };

  handleClick = () => {
    // Scroll to top
    $('#to-top').on('click', function() {
      let hash = $(this).data('hash');
      if (hash) {
        $('html, body').animate({
          scrollTop: $(document.getElementById(hash)).offset().top,
        }, 800, function() {
          window.location.hash = hash;
        });
      }
    });
  };

  render() {
    // noinspection JSCheckFunctionSignatures
    const childrenWithProps = React.Children.map(this.props.children, child =>
        React.cloneElement(child, {userLevel: this.props.userLevel}),
    );
    return (

        <div id = "top-of-page"
             style = { {
               display        : 'flex',
               minHeight      : '100vh',
               flexDirection  : 'column',
               backgroundColor: '#1B1B1B',
             } }
        >
          { this.state.isBrowser && !this.state.isAndroid &&
            <Navigation userLevel = { this.props.userLevel }
                        setUserLevel = { this.props.setUserLevel }
            />
          }
          <div style = { {flex: '1'} }>
            { childrenWithProps }
          </div>
          { this.state.isBrowser && !this.state.isAndroid &&
            <Footer stylesheetData = { this.props.stylesheetData['Footer'] } />
          }

          {/* Back To Top Button */ }
          <button data-hash = "top-of-page"
                  id = "to-top"
                  className = "button"
                  type = "button"
          >Top
          </button>
        </div>
    );
  }
}

export default PageWrapper;