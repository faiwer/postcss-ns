function walk(list, cb)
{
	if(!list)
		return;

	list.forEach(function(node)
	{
		switch(node.type)
		{
			case 'rule':
				cb(node);
				break;

			case 'atrule':
				walk(node.nodes, cb);
				break;

			default: break;
		}
	});
}

function handle(node)
{
	if(!/\bns:/.test(node.selector))
		return;

	var match = node.selector.match(/ns:([\.\w\d_:-]+)/);
	var ns = match && match[1];
	if(!ns)
		throw new Error('empty css-namespace');

	node.selector = node.selector
		.replace(/\bns:([\.\w\d_:-]+)\s*/g, '')
		.replace(/(\.|#)ns(\b|$)/g, `$1${ns}$2`);
}

module.exports = function(options)
{
	return function(css)
	{
		walk(css.nodes, handle);
	};
};

module.exports.handle = handle;