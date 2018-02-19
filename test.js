var handle = require('./postcss-ns').handle;
var assert = require('assert');

describe('postcss-ns', function()
{
	function test(name, selector, result)
	{
		it(name, function()
		{
			const node = { selector: selector };
			handle(node);
			assert.equal(node.selector, result);
		});
	}

	test(
		'simple-class',
		'ns:a .ns-b',
		'.a-b');
	test(
		'simple-id',
		'ns:a #ns-b',
		'#a-b');
	test(
		'both',
		'ns:a #ns-b.ns-c',
		'#a-b.a-c');
	test(
		'twice',
		'ns:a .ns-b .ns-c',
		'.a-b .a-c');
	test(
		'several selectors',
		'ns:a .ns-b div, ns:a .ns-c span',
		'.a-b div, .a-c span');
	test(
		'bare+join',
		'ns:a .ns.b, .ns.c',
		'.a.b, .a.c');
});