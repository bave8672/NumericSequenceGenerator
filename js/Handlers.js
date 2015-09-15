//
//
// Input elements
var inputField = document.getElementById('numberInput');
var displayButton = document.getElementById('displayButton');

//
//
// Output elements
var errorMessage = document.querySelector('.error.numberInput-error');
var notification = document.querySelector('.notification');

var output_all = document.querySelector('.output.seq1.all');
var output_odd = document.querySelector('.output.seq2.odd');
var output_even = document.querySelector('.output.seq3.even');
var output_fizzBuzz = document.querySelector('.output.seq4.fizzBuzz');
var output_fib = document.querySelector('.output.seq5.fib');

//
//
// Fixed Globals
var lazyCutoff = 10000; // Cutoff for results, after which they will be calculated lazily


// Session state variables
var currentInput; // Current user input number
var currentCutoff = 0; // Current number of numbers calculated lazily

//
//
// Event Handlers

// Allow user to submit via enter key
inputField.addEventListener('keyup', function (event) {
    // Cancel page refresh if enter button is pressed
    if (event.keyCode == 13) {
        generate(false);
        event.preventDefault();
    }
});

// Submit via the button enabled as well
displayButton.addEventListener('click', function (event) {
    app.generate(false);
});

// Handle lazy loading on scroll
output_all.addEventListener('scroll', function (event) {
    return app.lazyCalc(event);
});
output_odd.addEventListener('scroll', function (event) {
    return app.lazyCalc(event);
});
output_even.addEventListener('scroll', function (event) {
    return app.lazyCalc(event);
});
output_fizzBuzz.addEventListener('scroll', function (event) {
    return app.lazyCalc(event);
});