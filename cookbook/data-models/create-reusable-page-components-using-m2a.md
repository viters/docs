---
description: This recipe explains how build re-usable page components using Directus Many-to-Any (M2A) relationships.
tags: []
skill_level:
directus_version: 9.21.4
author_override:
author: Bryant Gillespie
---

# Create re-usable page components

> {{ $frontmatter.description }}

:::tip Author: {{$frontmatter.author}}

<!-- **Skill Level:** {{$frontmatter.skill_level}}\ -->

**Directus Version:** {{$frontmatter.directus_version}}

<!-- **Tags:** {{$frontmatter.tags.join(", ")}} -->

:::

## Explanation

Many websites are made of common, repeating sections or groups of content.

A common use case when using Directus as a headless CMS’s is creating individual blocks that can be re-used on many
different pages.

This enables your content team create unique page layouts without having to use development resources whenever a new
page layout is needed.

In this recipe, we’ll cover the steps needed to create re-usable page components inside your Directus project. Here’s
the quick outline:

- Mapping your data model
- Creating individual page blocks
- Creating your page collection
- Building pages with blocks
- Fetching page data from the API
- Working with your front-end

## How-To Guide

:::tip Requirements

You’ll need to have either a Directus Cloud project configured and running or a self-hosted instance of Directus up and
running.

:::

### Map out your data model

Before you starting creating Collections inside Directus, it’s helpful to map out your data model (schema) outside of
Directus first.

Consider this sample page below.

![Sample Page](/headlesscms/sample-page.png)

There are three main “blocks” that could be broken down into separate components.

1. A hero block at the top of the page that includes a strong headline, an image, and some copy with a call to action.
2. A block of cards that could link out to blog posts or other content.
3. A block of rich text or HTML content.

Let’s break down our data model for each section.

---

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

---

Now let's create a Collection for each inside Directus.

:::tip

To keep things organized, we recommend that you namespace each collection with a prefix like `block`.

:::

### Create the Rich Text block

1. [Create a new Collection](/configuration/data-model/collections.html#create-a-collection) named `block_richtext` and
   add the following fields.

   ```md
   block_richtext

   - id (uuid)
   - headline (Type: String, Interface: Input)
   - content (Type: Text, Interface: WYSIWYG)
   ```

### Create the Hero block

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

### Create the Card Group block

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

### Create your Pages collection

4. Create a new Collection named `pages` and add the following fields.

   ```md
   pages

   - id (uuid)
   - title (Type: String, Interface: Input)
   - slug (Type: String, Interface: Input, URL Safe: true)
   ```

### Configure a Many-To-Any (M2A) relationship inside the `pages` collection.

5. Create a new Builder (M2A) field inside the `pages` data model.

   ![Many To Any Relationship](/headlesscms/reusable-page-components-m2a-screen.png)

   a. For the **Key**, use `blocks`.

   b. For **Related Collections**, choose the following:

   - Hero
   - Gallery / Cards
   - Article

   c. Save the field. Directus will create a new, hidden
   [junction collection](/configuration/data-model/relationships.html#many-to-any-m2a) for you automatically.

:::tip

If you want more control over the name of the junction table and its fields, use the Continue in Advanced Field Creation
Mode option.

:::

### Create your page content

6. [Create a new item](/app/content/items.html#create-an-item) in the `pages` collection

   <video title="Create Your Page Content" autoplay muted loop controls playsinline>
   <source src="/headlesscms/reusable-page-components-adding-content.mp4"> type="video/mp4" />
   </video>

   a. Enter the page **Title** and **Slug**.

   b. Under the Blocks field, click Create New and choose the collection type to create new blocks. Or click Add
   Existing to re-use existing blocks from other pages. Use the drag handle on the left side of each item to re-order
   blocks.

### Fetching page data from the APIs

Next, you'll want to access these with the API. If you try to use `/items/pages` then `page_content` returns an array of
IDs. Instead, you'll want to add a [field parameter](/reference/query.md#many-to-any-union-types) to get nested
relational data.

:::tip

Study the [Global Query Parameters > Fields > Many-To-Any](/reference/query.html#many-to-any-union-types) to learn how
to properly fetch nested relational M2A data without over-fetching data that you might not need.

:::

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

**Sample Response**

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

### Structuring your front end

We have [integration guides](https://directus.io/guides/) for many popular front-end frameworks. But there are far too
many to cover in this recipe.

Here’s some general advice on how to structure your front end to display page blocks / Many-To-Any (M2A) Relationship
data.

**Create a single component for each individual page_builder collection.**

- Hero
- Gallery
- Article

**Create a dynamic route that does the following:**

- Imports your page builder components.
- Calls your `pages` collection via the API. Add a filter rule to match the requested page’s `slug`.
- Maps all the possible `page.pages_blocks.collection` names to your page block components.
- Loops through the `page.blocks` array and passes the correct data (props) that each page_builder component needs to
  render properly.

## Final Tips

This recipe has quite a few steps and involves several different collections. Here are some helpful tips to consider.

### Spend some time studying the responses from your API.

To prevent frustration when building your front-end, it’s important you understand the structure of the JSON data that
Directus returns for Many To Any (M2A) relationships.

- Complete your page builder data model inside Directus.
- Add some content.
- Test your API calls.

### Check your permissions.

If you notice you aren't receiving the data that you expect,
[check the Permissions settings](/configuration/users-roles-permissions/permissions.html#permissions) for your Public or
chosen role. You'll have to enable Read access for each collection using in the Pages > Blocks Many-To-Any field.

### Use Typescript to help prevent runtime errors.

We recommend adding types for each of your different collections to your frontend framework.

### Use folders to organize your data model.

Consider using [data model folders](/configuration/data-model/collections.html#create-a-folder) to keep things nicely
organized and your collections easy to find.

![Data Model Folders](/headlesscms/reusable-page-components-folders.png)

### Use translations to make collection names friendlier.

When [setting up Collections](/configuration/data-model/collections.html#collection-setup) within your data model, use
the Collection Naming Translations to create names that easier for the Data Studio users to understand.

![Collection Naming Translations](/headlesscms/reusable-page-components-translations.png)

For example:

- `block_richtext` becomes `Rich Text`
- `block_hero` becomes `Hero` or `Hero Block`
- `block_cardgroup` becomes `Card Group`
