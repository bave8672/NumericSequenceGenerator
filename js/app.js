var app = (function () {

    // Numeric Sequence Calculator

    "use strict";

    // Application object containing all logic and globals for app
    // Exposes all business logic for unit testing
    var app = function () {

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


        // Startup function hooks up event handlers
        this.start = function () {

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
                generate(false);
            });

            // Handle lazy loading on scroll
            output_all.addEventListener('scroll', function (event) {
                return lazyCalc(event);
            });
            output_odd.addEventListener('scroll', function (event) {
                return lazyCalc(event);
            });
            output_even.addEventListener('scroll', function (event) {
                return lazyCalc(event);
            });
            output_fizzBuzz.addEventListener('scroll', function (event) {
                return lazyCalc(event);
            });
        };


        //
        //
        // Logic

        // Lazy loading event handler applied to output divs
        // Relies on user input so is tested via UI testing
        function lazyCalc(e) {
            var t = e.target;
            if (t.scrollTop > (t.scrollHeight - t.offsetHeight - 10)) {
                // We have scrolled to the bottom, so calculate more numbers
                generate(true);
            }
        }

        // This is fired when the number is submitted or when a user scolls to the bottom of some results
        // Document is only ever modified here
        // Tested via UI testing
        function generate(lazy) {
            // Test performance
            var t1 = performance.now();

            // Validate input
            errorMessage.innerHTML = "";
            var input = inputField.value;
            var error = validateNumber(input);
            if (error !== "") {
                // There is an error
                errorMessage.innerHTML = error;
                return;
            }

            else if (lazy === false) { // The query is being fired for the first time (no lazy loading)
                // Reset cutoff
                currentCutoff = 0;

                // Generate and set outputs
                resetOutputs();
                updateOutputs();
                output_fib.innerHTML += fibonacci(Number(input));

                // Display performance
                var t = performance.now() - t1;
                notification.innerHTML = "Completed in " + Math.round(t) / 1000 + " seconds";
            }

            else { // lazy loading
                updateOutputs();
            }

            // Private helpers
            function resetOutputs() {
                output_all.innerHTML = "";
                output_odd.innerHTML = "";
                output_even.innerHTML = "";
                output_fizzBuzz.innerHTML = "";
                output_fib.innerHTML = "";
            }
            function updateOutputs() {
                var sequences = getSequences(Number(input), currentCutoff, currentCutoff + lazyCutoff);
                currentCutoff += lazyCutoff;
                output_all.innerHTML += sequences.all + ',';
                output_odd.innerHTML += sequences.odd + ',';
                output_even.innerHTML += sequences.even + ',';
                output_fizzBuzz.innerHTML += sequences.fizzBuzz + ',';
            }
        };

        // Validates that an input is a positive integer
        // Attempts to turn the input into a number and
        // Returns an error message that is empty if validation is passed 
        function validateNumber(input) {
            var number = Number(input);
            if (isNaN(number)
                || number < 1
                || number % 1 !== 0) {
                return "Input must be a positive integer";
            }
            return "";
        }

        this._validateNumber = validateNumber;

        // The output sequences are returned as an object by this function which takes an integer input
        // It cuts of the results to allow lazy loading
        function getSequences(input, start, end) {

            // Store results in arrays
            // This createsa a memory overhead but allows for direct testing
            var all = [];
            var odd = [];
            var even = [];
            var fizzBuzz = [];

            // The sequences require an iterator and therefore can can share one to save processing
            for (var i = start + 1; i <= input && i <= end; i++) {

                all.push(i);

                // A number must be either odd or even
                if (i % 2 === 0) {
                    even.push(i);
                }
                else {
                    odd.push(i);
                }

                fizzBuzz.push(altFizzBuzz(i));
            }

            // Return object containing each sequence as an array
            return {
                'all': all,
                'odd': odd,
                'even': even,
                'fizzBuzz': fizzBuzz,
            };
        }

        this._getSequences = getSequences;


        // Logic for the fizzBuzz sequence
        // Takes a number and returns either that number, C, E or Z
        function altFizzBuzz(number) {
            if (number % 3 === 0
                && number % 5 === 0) {
                return 'Z';
            }
            else if (number % 3 === 0) {
                return 'C';
            }
            else if (number % 5 === 0) {
                return 'E';
            }
            else return number;
        }

        this._altFizzBuzz = altFizzBuzz;


        // Logic for the fibonacci sequence
        // Takes integer input and returns array of all fibonacci numbers up to and including the input
        // Don't need to split this result up into sections because the number of elements is relatively low
        function fibonacci(input) {

            var result = [];
            var f = 1;
            var f1 = 0;
            var f2 = 0;

            while (f < input) {
                result.push(f);
                f2 = f;
                f = f + f1;
                f1 = f2;
            }

            // Remove last entry if we overshot out input
            if (result[result.length - 1] > input) {
                result.pop();
            }

            return result;
        }

        this._fibonacci = fibonacci;

        return this;
    };

    return app;
})();