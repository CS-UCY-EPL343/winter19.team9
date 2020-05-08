# Fitness Factory Nicosia WebApp

This web application is a website developed for the company Fitness Factory Nicosia. The web application currently 
supports both front-end and back-end functionality. 

#### Deployment link: 
[https://ffnfinal-21fa1.web.app/](https://ffnfinal-21fa1.web.app/)
##### The web application is also responsive and operates normally on mobile devices

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
 purposes. See deployment for notes on how to deploy the project on a live system.

### User Instructions

#### Prerequisites
```
The user must have access to a basic web browser program to access the web application. He will also need to install 
Node.js and the npm commands in order to proceed with deploying the website locally as well as executing the respective
npm scripts (further explained later on in the Readme)
```

#### Instructions about our WebApp:

**Home Page** <br/>
This is the front page of the web application that presents helpful information about 
the company, such as the services provided by the company and some general announcements about the gym.
The user can access the homepage at any time by clicking the home label of the 
navigation bar or by clicking the logo of the company in any page <br/><br/>
**About** <br/>
This page is responsible for visualizing information about the coaches and the owners of the company.
Moreover, the page hosts the contact us section of the web application, where the clients can communicate with 
the gym staff by completing a simple form and leaving a message. Furthermore, in this page a user can find out 
all the contact information of the company and a map, which shows the location of the gym is provided.
The user is able to visit this page by clicking to the about label of the navigation bar. <br/><br/>
**Classes** <br/>
This page is responsible for visualizing the classes provided by the gym. The user can read a brief description
of every class in order to choose the class of his choice.The user is able to visit this page by clicking to the 
class label of the navigation bar. <br/><br/>

**Log-in/Sign-up** <br/>
The login modal appears, when the user clicks the Log-in/Register label of the navigation bar. In this modal a user 
that has already created an account can sign-in to the system by completing with his credentials the username and
password fields or by clicking one of the social media account sign-in options provided(google account, facebook 
and twitter). If the user doesn't have an account she/he can create a new account by clicking the sign-up option.
By clicking the sign-up option a new page appears, which shows a form which the user has to fill with his unique
information and credentials in order to create his own account in the system. 
<br/><br/>
**Profile User** <br/>
This profile is responsible for visualizing the users unique profile and its only available after the user sign-in to
the system using his credentials. From this page the user has the ability view his personal messages by clicking the 
messages option, add/edit his profile picture by hovering and clicking the current profile picture,
view personal announcements and events by clicking the available options and edit his profile from a modal that allows 
him to change the information saved in the system about him by clicking the available option. 
He/she can view his/her weekly schedule and enroll or unenroll from the available classes.
<br/><br/>
**Profile Admin** <br/>
This profile will provide the admin with the ability to search their clients, based on their name. Information 
regarding the client chosen will be then displayed (Profile Pic, Name, Surname, Username). They will also have the 
ability to message the client directly, update their current announcements, add more or delete existing ones.
<br/><br/>
**Profile Coach** <br/>
This profile will provide the admin with the ability to search their clients, based on their name. He will be able to 
message the client and alter their announcements (similarly to the Admin Profile). They will also be able to view their 
weekly schedule (classes and Personal Training sessions) and following their selection of a user they will able to 
alter their personal schedule by adding more personal training sessions with the client, or delete existing ones.
<br/><br/>
**Dashboard** <br/>
This dashboard is available only to personnel with administrative authorization. This will allow the owner of the gym,
to glympse through statistics regarding the web application, such as server usage at that time, most visited pages, etc.
They can also view information from the dataabase, such as information about the clients' age statistical analysis, 
information about their personnel and their daily routine information (classes and PT handled by the coach). This set
of information will allow the admin to understand the current state of their businness, in a minimal and comprehensive 
way.
<br/><br/>

## Testing Phase

Basic static tests were implemented by our development team in order to ensure the uninterrupted and correct web 
application's operation. There are both automated and unit tests.
 <pre>
 -> src <br/> &nbsp&nbsp&nbsp-> test <br/> &nbsp&nbsp&nbsp&nbsp&nbsp-> Automated <br/> &nbsp&nbsp&nbsp&nbsp&nbsp-> Unit
 </pre>
 ##### The above is directory representation for the files used for both automated and unit tests.

### Future Intentions

We currently do not have plans to further work in this repository, however due to the nature of the MIT License, the 
prospect of future work will lie in the hands of the community.

## Deployment

At the current state the website has been deployed to a firebase project (for hosting), firebase function (backend API),
and a MySQL database hosted on Microsoft Azure. However local deployment of the project can be achieved (if the interested
party has means of supporting a database server).
<br/>
In the api folder of our github repository there is a **database.js** file. By filling in the following information <br/>

<pre>
    conn = mysql.createConnection({
      host    : '',
      user    : '',
      password: '',
      database: '',
    });
</pre>
in the fist few lines. After this is completed running the program can be achieved with the following npm scripts.


In the src folder of our github repository there is a **repository.js** file. By filling in the following information <br/>
<pre>
const BASE_URL = 'http://{personal_ip}:5000'; 
</pre>
In order to run the backend server on the Android App as well.


<pre>
"scripts": {
    "start": "react-scripts start",<br/>
    "build": "react-scripts build",<br/>
    "dev": "concurrently \"cd api && npm run start\" \"npm run start\",<br/>
    "eject": "react-scripts eject"<br/>
    "test": "react-scripts test ./src/test/Unit/* --env=jest-environment-jsdom-sixteen",<br/>
    "mocha": "mocha src/test/Automated/*.test.js"
  }
  </pre>

```
    "start": "react-scripts start",
    This command/script is used to start the necessary scripts required for normal
    web application's operation with the necessary react features in place.
```
```
    "build": "react-scripts build",
    This command/script is used to combine the necessary scripts required for normal
    web application's operation.
```
```
    "run": "concurrently \"cd api && npm run start\" \"npm run start\",
    This command/script is used in order to run both the start script for the normal web app operation, as well as the 
    backend server (running on localhost:5000) (API).
```
```
    "eject": "react-scripts eject"<br/>
    This command/script calls the create-react-app which encapsulates all of the npm modules 
    it is using internally, so that your package.json will be very clean and simple without 
    you having to worry about it.
```
```
    "test": "react-scripts test",
    This command/script is used in order to run the unit tests implemented.
```
```
    "mocha": "mocha src/test/Automated/*.test.js",
    This command/script is used in order to run the automated tests.
```

## Built With

* [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Express.js](https://expressjs.com/) - A Node.js web application framework for API implementation

## Tested With

* [Selenium Web Driver for Node.js](https://www.npmjs.com/package/selenium-webdriver/) - Selenium is a browser 
automation library, mainly used for automated testings.
* [Jest.js](https://jestjs.io/) - Jest is a JavaScript Testing Framework for unit testing purposes.
* [Mocha.js](https://mochajs.org/) - Mocha is a JavaScript Testing Framework for asynchronous testing purposes.
* [Chai.js](https://www.chaijs.com/) - Chai is a BDD / TDD assertion library for node optimal for test driven 
 development.
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - React Testing Library builds 
on top of DOM Testing Library by adding APIs for working with React components.

##### Note: Currently there is a sql file in our repository which will be used for building the web application's database.
## Contributing

This web application is being developed within the constraints of a university course subject. Hence, the development 
team is fixed, and the web application development was strictly private. Now that the web app has been launched with an 
MIT License the development and future expansion of this project is not limited by any constrains.

## Versioning

We (the development team) are able to access version iterations or iterative development stages based on 
our github branches/commits.

## Authors

* **Andreas Loizou** - *Initial work* - [aloizo03](https://github.com/aloizo03)
* **Panagiotis Melios** - *Initial work* - [pmelio01](https://github.com/pmelio01)
* **Andreas Paraskeva** - *Initial work* - [aparas01](https://github.com/aparas01)
* **Antonis Poullis** - *Initial work* - [poullis](https://github.com/poullis)
* **Loizos Siakallis** - *Initial work* - [lsiaka01](https://github.com/lsiaka01)
* **Yiannis Sophocleous** - *Initial work* - [isopho01](https://github.com/isopho01)


See also the list of [contributors](https://github.com/CS-UCY-EPL343/winter19.team9/graphs/contributors) who participated in this project.

## License

At the current state of the development process there is no licensing approval or request.

## Acknowledgments

* Inspiration: [Bootstrap Templates](https://getbootstrap.com/docs/4.3/examples/) and several [Codepen](https://codepen.io/) examples.
