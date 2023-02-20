---
description: This recipe explains how build re-usable page components using Directus Many-to-Any (M2A) relationships.
tags: []
skill_level:
directus_version: 9.21.4
author_override:
author: Bryant Gillespie
---

# Create Re-Usable Page Components

> {{ $frontmatter.description }}

:::tip Author: {{$frontmatter.author}}

<!-- **Skill Level:** {{$frontmatter.skill_level}}\ -->

**Directus Version:** {{$frontmatter.directus_version}}

<!-- **Tags:** {{$frontmatter.tags.join(", ")}} -->

:::

## Explanation

Many websites are made of common, repeating sections or groups of content. This enables your content team create unique
page layouts without having to use development resources whenever a new page layout is needed.

A common example when this is needed is in webpage or blog-page design. You often have a **Hero** section to grab
attention, a **Cards** area for more content suggestions, and a **Rich Text** section containing most of the page's
written text.

:::details Toggle Open to See Wireframe

![Sample Page](/headlesscms/sample-page.png)

:::

In the world of headless CMS's and no-code/low-code infrastructure, tools like "block editors" and "page builders" let
content teams define distinct content formats and combine as needed to build out unique pages.

In Directus, you can configure an [M2A relationship](/configuration/data-model/relationships.md) with a **Builder**
[Interface](/configuration/data-model) to achieve this.

To get started, let's break down what's in each page section in the example above:

**Hero**

<!-- Insert image here -->

- `headline` - short text that grabs attention (string)
- `content` - longer text that explains the product or service (string)
- `buttons` - group of buttons that link out (array of objects)
  - `label` - call to action like Learn More (string)
  - `href` - URL to link to (string)
  - `variant` - type of button like 'default', 'primary’, or 'outline' (string)
- `image` - supporting image (file)

**Card Group**

<!-- Insert image here -->

- `headline` - short text that describes the section (string)
- `content` - supporting text (textarea)
- `card` - array of objects

  - `image` - featured image of a blog post or content (file)
  - `content` - text summary of a blog post or content (string)

**Rich Text**

 <!-- Insert image here -->

- `headline` - short text that describes the content (string)
- `content` - rich text / HTML content (string)

It's important to note what you need

## The Recipe

:::tip Requirements

You’ll need an understanding of [M2A relationships](/configuration/data-model/relationships.md) in Directus.

:::

### Create Your Collections

:::tip

To keep things organized, we recommend that you namespace each collection in the M2A with a prefix like `block`.

:::

1. [Create a new Collection](/configuration/data-model/collections.html#create-a-collection) named `block_richtext` and
   add the following fields.

   ```md
   block_richtext

   - id (uuid)
   - headline (Type: String, Interface: Input)
   - content (Type: Text, Interface: WYSIWYG)
   ```

2. [Create a new Collection](/configuration/data-model/collections.html#create-a-collection) named `block_hero` and add
   the following fields.

   ```md
   block_hero

   - id (uuid)
   - headline (Type: String, Interface: Input)
   - content (Type: Text, Interface: WYSIWYG)
   - buttons (Type: JSON, Interface: Repeater)
     - label (Type: String, Interface: Input)
     - href (Type: String, Interface: Input)
     - variant (Type: String, Interface: Input)
   - image (Type: uuid / single file, Interface: Image)
   ```

3. [Create a new Collection](/configuration/data-model/collections.html#create-a-collection) named `block_cardgroup` and
   add the following fields.

   ```md
   block_cardgroup

   - id (uuid)
   - headline (Type: String, Interface: Input)
   - content (Type: Text, Interface: WYSIWYG)
   - group_type (Type: String, Interface: Radio, Options: ['posts', 'custom'] )
   - posts (Type: M2M, Conditions: group_type === 'posts')
   - cards (Type: M2O, Conditions: group_type === 'custom')
   ```

4. Create a new Collection named `pages` and add the following fields.

   ```md
   pages

   - id (uuid)
   - title (Type: String, Interface: Input)
   - slug (Type: String, Interface: Input, URL Safe: true)
   - blocks (Type: M2A, Interface: Builder, Related to: block_richtext, block_hero, block_richtext and block_card_group)
   ```

### Create Your Page Content

1. [Create a new item](/app/content/items.html#create-an-item) in the `pages` collection, adding content for the hero
   image, cards, and text area as desired.

## Final Tips

Now your collection is built and page content created!

### Quality of Life Improvements

- Consider using [folders](/configuration/data-model/collections.html#create-a-folder) to keep collections organized.
- Use the [Collection Naming Translations](/configuration/data-model/collections.html#collection-setup) to create custom
  collection names.

### Frontend

You'll likely want to fetch this data and display it in a frontend. We have
[integration guides](https://directus.io/guides/) to walk you through this.

### Fetching Page Data

Next, you'll want to access the data via the API. If you try to use `/items/pages` then `page_content` returns the data
flat, as an array of IDs. Instead, you'll want to add a [field parameter](/reference/query.md#many-to-any-union-types)
to get nested relational data. Here's an example using the [JS-SDK](/reference/sdk.md).

**Sample Request**

```javascript
// Write some code here in your front-end framework that gets the slug from the current URL.
const slug = 'the-ultimate-guide-to-rabbits';

// Call the Directus API using the SDK.
const response = await directus.items('pages').readByQuery({
	filter: {
		slug: { _eq: slug },
	},
	fields: ['*', 'blocks.*', 'blocks.item.*', '*.collection'],
	limit: 1,
});

const page = response.data[0];
```

:::details **Toggle Open to See Sample Response**

```json
{
	"data": [
		{
			"id": "079bf3c0-6f73-4725-b4c3-9d1a6cb58a05",
			"status": "published",
			"date_created": "2023-02-08T20:54:15",
			"user_updated": "9fdd1ca5-982e-422d-bced-640e3a98a339",
			"date_updated": "2023-02-13T17:36:38",
			"user_created": "9fdd1ca5-982e-422d-bced-640e3a98a339",
			"title": "The Ultimate Guide to Rabbits",
			"slug": "the-ultimate-guide-to-rabbits",
			"blocks": [
				{
					"id": 1,
					"pages_id": "079bf3c0-6f73-4725-b4c3-9d1a6cb58a05",
					"sort": 1,
					"collection": "block_hero",
					"item": {
						"id": "1fa9065d-39a0-479a-a8ae-9ccd31429c98",
						"headline": "Learn everything about rabbits",
						"content": "This guide will teach you everything you need to know about those wascally wabbits.",
						"buttons": [
							{
								"label": "Learn More",
								"href": "learn-more",
								"variant": "primary"
							}
						],
						"image": "12e02b82-b4a4-4aaf-8ca4-e73c20a41c26"
					}
				},
				{
					"id": 3,
					"pages_id": "079bf3c0-6f73-4725-b4c3-9d1a6cb58a05",
					"sort": 2,
					"collection": "block_cardgroup",
					"item": {
						"id": "52661ac6-f134-4fbf-9084-17cf3fc4e256",
						"headline": "Our Best Blog Posts on Rabbits",
						"content": "Here's the latest and greatest from our rabid writers.",
						"group_type": "posts",
						"cards": [],
						"posts": [1, 2, 3]
					}
				},
				{
					"id": 2,
					"pages_id": "079bf3c0-6f73-4725-b4c3-9d1a6cb58a05",
					"sort": 3,
					"collection": "block_richtext",
					"item": {
						"id": "6c5df396-be52-4b1c-a144-d55b229e5a34",
						"headline": "The Benefits of Rabbits",
						"content": "<p>Rabbits are a great source of environmental benefit. They help to keep grasslands and other ecosystems in check. Rabbits are herbivores, meaning they eat only plants, which helps to keep vegetation in balance. Additionally, rabbits are crucial to the food chain, providing sustenance for predators in their environment.</p>\n<p>Rabbits also help to improve the quality of soil by digging burrows and depositing their waste in them. This helps to aerate the soil, improving its quality and allowing for better plant growth. Additionally, the waste from rabbits is a rich source of nutrients for plants and other animals in the area. This helps to keep the soil healthy and support the overall ecosystem.</p>"
					}
				}
			]
		}
	]
}
```

:::

:::tip Study the API Response

Be sure to test your API calls and understand the structure of the JSON data that Directus returns for Many To Any (M2A)
relationships.

:::
