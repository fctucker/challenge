# Coding Challenge

This is a coding challenge solution for the "In-browser Particle System" defined here: https://www.asymmetrik.com/programming-challenges/

## Live Demo

The solution is hosted live on AWS [here](http://52.7.185.39/).

Please note that this application was developed using Google Chrome.  For best performance, please use Google Chrome.

# Build & Run

To run the solution on your local machine please follow the instructions below:

1. Install nodejs version 7.10.1
2. Git clone the project `git clone https://github.com/fctucker/challenge.git`
3. On the command line, navigate to the the project and run the following command: `npm install && npm run start`.  This should automatically open a tab in your browser to the application.  You can also navigate to the following URL to view the application while it is running: [http://localhost:3000](http://localhost:3000)

# Description

This project has the ability to simulate rainfall, snowfall, clear skies, and a solar eclipse.  It is designed to be easily extensible to support other forms of particle simulation.  It has the ability to stop, start, and reset simulations as well as change simulation types with graceful transitions. 

# Dependencies

This project is build with the following technologies:
    
    * Angular 4
    * Sass
    * Nodejs
    * Bootstrap 3.3.7
    * D3v4
    * Typescript
    * SystemJS
   
# Adding Plugins

If you want to add more simulations for different types of weather, you can add a typescript file in the  `app/weather/plugins` folder.  Create a class that extends the `Weather` abstract class.  You will need to code the following methods to integrate with the application:
    
    * `transitionIn`: Describe the weather for the simulation including the sun, sky, ground, etc.
    * `getName`: Assign an internal name for your weather simulation
    * `getLabel`: Have a user friendly label to be displayed in the app to describe your weather simulation
    * `addParticle`: Call the appropirate D3 APIs to render a particle on the d3 SVG canvas
    * `moveParticles`: A method to describe the movement of a particle
    
Furthurmore you will need to register the new weather type with the application.  This can be done in `src/challenge.component.ts` by adding a line similar to the below in the `ngOnInit` method:
`this.driver.addWeatherType(new Rain(this.driver));`