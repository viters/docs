---
title: Slugify Text
description: This is a recipe to slugify a string of text using the Run Script operation in Directus Flows.
tags: []
skill_level:
directus_version:
author_override:
author: Eron Powell
---

# {{$frontmatter.title}}

> {{ $frontmatter.description }}

:::tip Author: {{$frontmatter.author}}

**Skill Level:** {{$frontmatter.skill_level}}\
**Directus Version:** {{$frontmatter.directus_version}}\
**Tags:** {{$frontmatter.tags.join(", ")}}

:::

## Explanation

In some cases, you may want to take text from a title or other source and slugify it. Here's how you can implement this
in a flow.

## The Recipe

:::tip Requirements

You'll need a string somewhere in your [data chain](/configuration/flows.md#data-chains).

:::

1. Create a [Run Script](/configuration/flows/operations.md#run-script) operation in your flow.
2. Paste the following function into your Run Script operation.

```js
module.exports = async function (data) {
	// Index data to get the string you want to slugify
	// Assign it to the "text" var below.
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

Remember, your function's returned value does not need to be a string. You can append any valid JavaScript onto the data
chain.
