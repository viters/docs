# Slugify Text with Run Script

## Explanation

## The Recipe

Paste the following function into your Run Script operation.

```js
module.exports = async function (data) {
	// Index data to get the string you want to slugify
	// Assign it to the text var below.

	let text = data.opKey.nested_value;
	let slug = text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return slug;
};
```

## Final Tips
