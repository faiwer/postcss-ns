function walk(list, cb)
{
	for(const node of list)
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
}

function handle(node)
{
	if(!/\bns:/.test(node.selector))
		return;

	const match = node.selector.match(/ns:([\.\w\d_:-]+)/);
	const ns = match && match[1];
	if(!ns)
		throw new Error('empty css-namespace');

	node.selector = node.selector
		.replace(/\bns:([\.\w\d_:-]+)\s*/, '')
		.replace(/(\.|#)ns([-_\s]|$)/g, `$1${ns}$2`);
}

module.exports = function(options)
{
	return function(css)
	{
		walk(css.nodes, handle);
	};
};