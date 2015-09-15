# Numeric Sequence Calculator

A number gernerating application with QUnit unit tests and Dalek UI tests.

### How To Use

Run the application by opening the index.html file in a browser of your choice.

### How to test

To run unit tests, navigate to /tests/index.html in your browser or open it from the file system.

To run UI tests, do the following:

- Host the webpage on a local server (default in web.config is at http://localhost:54753/)
- Make sure the 'open' address in line 6 of /js/DalekTests.js is the same as that on the local server
- In Terminal on OSX or PowerShell on Windows, navigate to the root of the directory containing the application
- Ensure node.js is installed on your machine (go to https://nodejs.org/en/)
- Make sure Dalek cli is installed:

```
npm install dalek-cli -g
dalek -v
```

- Run the following command:

```
js/DalekTests.js -b chrome
```