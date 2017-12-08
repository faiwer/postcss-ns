# PostCSS Namespaces

## Install

1. `npm i --save ` todo
2. add into your `postcss.config.js`:

```js
module.exports =
{
	plugins:
	[
		require('./postcss-ns/postcss-ns')(), // this line
	]
};
```

## Using

Describe your namespace:
```scss
ns:my-prefix {
	/* css */
}
```

Use it
```scss
ns:my-prefix
{
	.ns-suffix { color: red; }
	#ns-suffix { color: red; }

	.ns-s1 .ns-s2,
	.ns-s3.ns-s4
	{ color: red; }
}
```

result:
```css
.my-prefix-suffix { color: red; }
#my-prefix-suffix { color: red; }

.my-prefix-s1 .my-prefix-s2,
.my-prefix-s3.my-prefix-s4
{ color: red; }
```

## Notes

1. You can use `[\d\w-:_]+` as namespace name
2. You can use `.ns-`, `#ns-`, `.ns_`, `#ns_`, `#ns `, `.ns ` in selectors

## How it works

String replace & regular expressions :)