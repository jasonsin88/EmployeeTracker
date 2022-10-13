# Employee Tracker

## Description
A command-line application that allows the user to manage their employees. Functionality includes viewing, adding, deleting, and editing employees, their roles, and departments.

## Table of Contents
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Technologies
* [Javascript](https://www.javascript.com/)
* [Node.js](https://nodejs.org/en/)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Console.Table](https://www.npmjs.com/package/console.table)

## Installation
To get started, clone this repository by inputting the following into your terminal:
<br>
```
git clone git@github.com:jasonsin88/EmployeeTracker.git
```
Prior to running the application, make sure that you have Node.js and MySQL installed on your computer

Install dependencies
```
npm i
```

Open up MySQL shell, execute the following commands
```
source db/schema.sql
```
and
```
source db/seed.sql
```

After which, quit MySQL shell and input the following to run the application
```
node server.js
```

## Usage

## License
This project is licensed under MIT <br />
![Github licence](http://img.shields.io/badge/license-MIT-blue.svg)