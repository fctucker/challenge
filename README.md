# Coding Challenge

This is a coding challenge solution for the "In-browser Particle System" defined here: https://www.asymmetrik.com/programming-challenges/

## Live Demo

The solution is hosted live on AWS [here](http://52.7.185.39/).

n.b. ths application was deveoped using Google Chrome.  For best performance, please use Google Chrome.

# Build & Run

To Run the solution on your local machine please follow the instructions below:

1. Install nodejs version 7.10.1
2. Git clone the project `git clone https://github.com/fctucker/challenge.git`
3. On the command line, navigate to the the project and run the following command: `npm install && npm run serve`.  This should automatically open a tab on your browserto the application.  If not, you can navigate to the following URL to view the application: [http://localhost:3000/about](http://localhost:3000/about)

# Description

This project has the aility to simulate rainfall, snowfall, clear skies, and a solar eclipse.  It is designed to be easily extensible to support other forms of particle simulation.  It has the ability to stop, start, and reset simulations as well as change silumation types with graceful transitions. 

# Dependencies

This project is build with the following technoligies:
    
    * Angular 4
    * Sass
    * Nnode JS
    * Bootstrap 2.2.7
    * D3 v4
    * typescript
   
# Adding plugins

If you want to add more simulations for different type of weather, you can add a typscript file under the  `app/weather/pluggins` folder.  Create a class that extends the `Weather` class.  You'll need to code the following methods to integrate with the application:
    * `transitionIn`: Describe the weather for the simulation including the sun, sky, ground, etc.
    * `getName`: Assign an internal name for your weather simulation
    * `getLabel`: Have a user friendly label to be displayed on the app to describe your weather simulation
    * `addParticle` Call the appropirate D3 API to render a particle on the d3 SVG canvas
    * `moveParticles` A method to describe the movement of a particle
    
Furthurmore you will need to register the weather type with the application.  This can be done in `challenge.component.ts` by adding a line similar to the below in the `ngOnInit` method:
`this.driver.addWeatherType(new Rain(this.driver));`