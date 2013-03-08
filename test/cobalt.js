var expect = require('expect.js'),
	cobalt = require('../src/cobalt.js');

describe('Cobalt instance', function(){
	it('should be an object', function(){
		expect(cobalt).to.be.an(Object);
	});
});