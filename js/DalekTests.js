"browsers": ["IE"]

module.exports = {
    'Page title is correct': function (test) {
        test
          .open('http://localhost:54753/')
          .assert.title().is('Google', 'It has title')
          .done();
    }
};