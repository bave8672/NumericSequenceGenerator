// Unit tests for app logic

var app = new app();

QUnit.test("FizzBuzz", function (assert) {
    assert.equal(app._altFizzBuzz(1), 1);
    assert.equal(app._altFizzBuzz(3), 'C');
    assert.equal(app._altFizzBuzz(5), 'E');
    assert.equal(app._altFizzBuzz(15), 'Z');
    assert.equal(app._altFizzBuzz(9999999991), 9999999991);
    assert.equal(app._altFizzBuzz(100000000), 'E');
    assert.equal(app._altFizzBuzz(999999999999999), 'C');
    assert.equal(app._altFizzBuzz(600000000000000000), 'Z');
});

QUnit.test("Fibonacci", function (assert) {
    assert.deepEqual(app._fibonacci(1000000), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040]);
});

QUnit.test("Sequence generators except fibonacci", function (assert) {
    var seq = app._getSequences(10, 0, 10);
    assert.deepEqual(seq.all, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.deepEqual(seq.fizzBuzz, [1, 2, 'C', 4, 'E', 'C', 7, 8, 'C', 'E']);
    assert.deepEqual(seq.odd, [1,3,5,7,9]);
    assert.deepEqual(seq.even, [2,4,6,8,10]);
    var seq = app._getSequences(10000000000, 1000, 1005);
    assert.deepEqual(seq.all, [1001, 1002, 1003, 1004, 1005]);
});

QUnit.test("Number input validator", function (assert) {
    for (var i = 1; i < 100; i++) {
        var int = Math.round(10000000000 * Math.random()).toString();
        assert.equal(app._validateNumber(int), "");
    }
    assert.equal(app._validateNumber("0"), "Input must be a positive integer");
    assert.equal(app._validateNumber("-1233454563465"), "Input must be a positive integer");
    assert.equal(app._validateNumber(""), "Input must be a positive integer");
    assert.equal(app._validateNumber("456 908098"), "Input must be a positive integer");
    assert.equal(app._validateNumber(")&^%*^%)*)*"), "Input must be a positive integer");
});