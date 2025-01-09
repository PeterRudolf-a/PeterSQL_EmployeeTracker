# PeterSQL_EmployeeTracker

## Description

This is an employee tracker for businesses to view and manage departments, roles and employees to organize and plan their business.

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Issues](#issues)
- [Video Walkthrough](#videowalkthrough)
- [Questions](#questions)

## Installation

To install, click the code button to clone the repository.


## Usage
You will need to set up the .env for your settings
DB_NAME=employees_db
DB_USER=your user
DB_PASSWORD=your password

Then enter psql -U yourusername in the terminal.
Enter \i ./db/schema.sql
Enter \i ./db/seeds.sql

This sets up the database and tables, and adds some sample data.

Exit psql.

In the terminal: npm i, then type npm run build. Then run npm run start.


## Issues
The client runs twice.
Output tables are not formatted cleanly.
Tables and other logs in the terminal get cut off.

## Video Walkthrough


## Questions

Link to my GitHub profile: https://github.com/PeterRudolf-a. If you have any questions, you can contact me at peterrudolf249@gmail.com.