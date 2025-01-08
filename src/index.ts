// import the Cli and connectToDB
import Cli from './classes/Cli.js';
import { connectToDB } from './connection.js';

// Create a new instance of the Cli class and start the CLI.
const cli = new Cli();

// Connect to the database.
connectToDB();

// Display a welcome message and start the CLI.
console.log('--------Employee Tracker--------');
console.log('--------------------------------');
cli.startCli();