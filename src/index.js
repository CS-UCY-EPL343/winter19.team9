import React              from 'react';
import ReactDOM           from 'react-dom';
import App                from './App';
import Tabletop           from 'tabletop';
import * as serviceWorker from './serviceWorker';

let stylesheetData = {};
Tabletop.init({
  key        : process.env.REACT_APP_TABLETOP_API_KEY,
  callback   : googleData => {
    stylesheetData = readStylesheetInfo(googleData);
    ReactDOM.render(<App stylesheetData = { stylesheetData } />,
        document.getElementById('root'));
  },
  simpleSheet: false,
});

function readStylesheetInfo(data) {
  const home = data['Home'];
  const classes = data['Classes'];
  const about = data['About'];
  const footer = data['Footer'];
  const jsonData = {};

  // Home
  const jsonHome = {'carousel': [], 'services': []};
  home.columnNames.forEach(col => {
    if (col.includes('carousel')) {
      jsonHome['carousel'].push({
        'label': home.elements[0][col],
        'text' : home.elements[1][col],
        'src'  : home.elements[2][col],
      });
    }
    if (col.includes('services')) {
      jsonHome['services'].push({
        'title'  : home.elements[0][col],
        'message': home.elements[1][col],
        'icon'   : home.elements[2][col],
      });
    }
  });

  // Classes
  const jsonClasses = {'classes': [], 'timetable': {}};
  classes.columnNames.forEach(col => {
    if (col.includes('class')) {
      jsonClasses['classes'].push({
        'title': classes.elements[0][col],
        'text' : classes.elements[1][col],
        'src'  : classes.elements[2][col],
      });
    }
    if (col.includes('timetable')) {
      jsonClasses['timetable'] = {'src': classes.elements[0][col]};
    }
  });

  // About
  const jsonAbout = {'coach': [], 'contact': {}};
  about.columnNames.forEach(col => {
    if (col.includes('coach')) {
      jsonAbout['coach'].push({
        'name': about.elements[0][col],
        'text': about.elements[1][col],
        'src' : about.elements[2][col],
      });
    }
    if (col.includes('contact')) {
      jsonAbout['contact']['address'] = about.elements[0][col];
      jsonAbout['contact']['phone'] = about.elements[1][col];
      jsonAbout['contact']['email'] = about.elements[2][col];
      jsonAbout['contact']['facebook'] = about.elements[3][col];
      jsonAbout['contact']['instagram'] = about.elements[4][col];
    }
  });

  // Footer
  const jsonFooter = {'social': {}, 'about-us': {}, 'about-club': []};
  footer.columnNames.forEach(col => {
    if (col.includes('social')) {
      jsonFooter['social']['text'] = footer.elements[0][col];
      jsonFooter['social']['facebook'] = footer.elements[1][col];
      jsonFooter['social']['instagram'] = footer.elements[2][col];
    }
    if (col.includes('about-us')) {
      jsonFooter['about-us']['address'] = footer.elements[0][col];
      jsonFooter['about-us']['email'] = footer.elements[1][col];
    }
    if (col.includes('about-club')) {
      for (let index of footer.columnNames) {
        jsonFooter['about-club'].push(footer.elements[1][index]);
      }
    }
  });

  jsonData['Home'] = jsonHome;
  jsonData['Class'] = jsonClasses;
  jsonData['About'] = jsonAbout;
  jsonData['Footer'] = jsonFooter;

  return jsonData;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
