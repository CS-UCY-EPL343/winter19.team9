# Fitness Factory Nicosia WebApp

This web application is a prototype version of an on going website development for the 
company Fitness Factory Nicosia. At the current state, the web application just serves as 
an indication of the interface of the website in development, however most of the functionality is lacking.
As stated this is an indication of the final product's interface, hence changes might apply during the 
progression of the development process.

####Deployment link: 
[https://cs-ucy-epl343.github.io/winter19.team9/](https://cs-ucy-epl343.github.io/winter19.team9/)
##### The web application is also responsive and operates normally on mobile devices

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### User Instructions

#### Prerequisites
```
The user must have access to a basic web browser program to access the web application. 
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
all the contact information of the company and also a map, which shows the location of the gym is provided.
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
**ProfileUser** <br/>
This profile is responsible for visualizing the users unique profile and its only available after the user sign-in to
the system using his credentials. From this page the user has the ability view his personal messages by clicking the 
messages option, add/edit his profile picture by hovering and clicking the current profile picture,
view personal announcements and events by clicking the available options and edit his profile from a modal that allows 
him to change the information saved in the system about him by clicking the available option. Moreover, the user can 
renew his membership from the modal that allows him to choose the subscription option and payment method of his choice.
When he clicks the checkout button in the final version of the web application he will be able to pay via paypal or jcc 
after redirection from the webapp to paypal's or jcc's web page.      
<br/><br/>



## Testing Phase

Basic static tests were implemented by our development team in order to ensure the uninterrupted and correct 
web application's operation. These consists of several checks on the interface of the web application as well 
as javascript checks after the user input on our forms.

### Future Intentions

For a more comprehensive and thorough checking, in the future development for the functionality of our web 
application, automated error checking implementations will be used in each major update of the project.

## Deployment

At the current state a github pages basic deployment will be used in order to test and visualize the web 
application's interface.
<pre>
"scripts": {
    "predeploy": "npm run build",<br/>
    "deploy": "gh-pages -d build",<br/>
    "start": "react-scripts start",<br/>
    "build": "react-scripts build",<br/>
    "test": "react-scripts test",<br/>
    "eject": "react-scripts eject"<br/>
  }
  </pre>
```
    "predeploy": "npm run build",
    This command/script performs a compilation before the deployment of the web 
    application. This is also includes the deploy feature in it.
    
```

```
    "deploy": "gh-pages -d build",
    This command/script is used to deploy our web application through github pages
    option with also the corresponding react configurations in order to be able to 
    view the web application on the go
```
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
    "test": "react-scripts test",
    This command/script is used in order to run the necessary react error checkings to 
    ensure that our web application will run normally.
```
```
    "eject": "react-scripts eject"<br/>
    This command/script calls the create-react-app which encapsulates all of the npm modules 
    it is using internally, so that your package.json will be very clean and simple without 
    you having to worry about it.
```

## Login Information
```
    Username:           Password:
    coach               1234
    admin               1234
    user                1234
```

## Built With

* [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces

### Future additions

* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [SQL Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) -
 Used to build and access our database for back-end operations of our web application.

#####Note: Currently there is an sql file in our repository which will be used for building the web application's database.
## Contributing

This web application is being developed within the constraints of a university course subject. Hence the development 
team is fixed and the web application development is strictly private.

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
