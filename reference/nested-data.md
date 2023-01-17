## Relational Data Overview

With the default syntax, Directus endpoints let you manipulate one collection, and provide access only to the fields
that you explicitly define. However, the API also lets you access and manage one collection's data from the other. In
other words, for a given endpoint, you can `READ`, **link** and **unlink**, as well as `CREATE` and `UPDATE` items from
related collections.

By default, relational fields return the related items' foreign key or array of foreign keys:

```json
{
	"id": 1,
	"title": "memes",
	"related_item": 1, // the foreign key of one related item
	"different_related_items": [1, 2] // foreign keys from related items
}
```

However, the API lets us access and manage the related items:

```json
{
	"id": 1,
	"title": "memes",
	"related_item": {
		"id": 1,
		"description": "this item is nested "
	},
	"related_item": [
		{
			"id": 1,
			"description": "this item is nested"
		},
		{
			"id": 2,
			"description": "this item is also nested"
		}
	]
}
```

You can also access and manage deeply nested items:

```json
{
	"id": 1,
	"title": "memes",
	"related_item": {
		"id": 1,
		"description": "this item is nested ",
		"deeply_related_item": {
			"id": 1,
			"description": "this is a deeply nested item"
		}
	}
}
```

Due to the way its presented in JSON, we often call the data from related collections **nested relational items**. The
process to access and manage nested relational items varies, depending on whether the relationship links one item or an
array of items.

## M2O & O2O

Both the [many-to-one](/configuration/data-model/relationships.md#many-to-one-m2o) and
[one-to-one](/configuration/data-model/relationships.md#one-to-one-o2o) can have _one_ nested item. Therefore, nested
relational data is managed the same way for both.

To give an example, let's imagine we have a collection called `email_newsletters`:

```
email_newsletters
- id
- content_body (the content of the newsletter)
- featured_video (M2O to the videos collection)
```

Each newsletter should have a featured video, which comes from the M2O-related `videos` collection.

```
videos
- id
- author
- title
- url
```

By default, each item in `email_newsletters` will link to just one item from `videos`:

```json
{
	"id": 1,
	"content_body": "the newsletter body",
	"featured_video": 2
}
```

The `featured_video` field contains the foreign key from `videos`.

### View Nested Item

To view the relational data instead of the foreign keys, use the [`fields` parameter](/reference/query#fields).

```json
{
	"id": 1,
	"content_body": "the newsletter body",
	"featured_video": {
		"id": 1,
		"title": "title of video",
		"author": "Ron Donevan",
		"url": "youtube.com/video-title"
	}
}
```

### Manage Nested Item

When you `CREATE` or `UPDATE` an item, you can **link** or **unlink** an existing related item.

For example, imagine we have the following item from `email_newsletter`:

```json
{
	"id": 1,
	"content_body": "the newsletter body",
	"featured_video": 2
}
```

To link another item, simply assign its foreign key.

```json
{
	"featured_video": 3
}
```

Item `id = 1` from `email_newsletters` will now link to the item in `videos` with `id = 3`.

You can also remove any relationship by setting the field to `null`.

```json
{
	"featured_article": null
}
```

To `CREATE` and link a related item on-the-fly, add the data you want to use as an object, without a foreign key. For
example, to create and assign a new `videos` item, add the desired field data.

```json
{
	"content_body": "the newsletter body",
	"featured_video": {
		"url": "www.youtube.com/the-new-video"
	}
}
```

When you create an item like this, Directus will:

- create the new item in the related collection
- set the field values you defined and leave the other fields default or `null`
- relationally link the item

To `UPDATE` the nested item, provide a primary key along with the other field updates.

```json
{
	"featured_video": {
		"id": 15,
		"url": "www.youtube.com/updated-url"
	}
}
```

When you update an item like this, Directus will:

- make sure the item with the specified primary key is now related
- update any other fields passed

## M2M, O2M & M2A

[Many-to-many](/configuration/data-model/relationships.md#many-to-many-m2m),
[one-to-many](/configuration/data-model/relationships.md#one-to-many-o2m) and
[many-to-any](/configuration/data-model/relationships.md#many-to-any-m2a) fields store an array, where each element in
the `children` array is a foreign key from the related collection. Nested relational data is managed the same way for
all three.

```json
{
	"id": 1,
	"name": "the parent item",
	"children": [1, 2]
}
```

### View Nested Items

To view the relational data instead of the foreign keys, use the [the `fields` parameter](/reference/query#fields).

```json
{
	"id": 1,
	"name": "the parent item",
	"children": [
		{
			"id": 1,
			"title": "a nested item"
		},
		{
			"id": 2,
			"title": "another nested item"
		}
	]
}
```

### View Nested M2A Items

On a [many-to-any](/configuration/data-model/relationships.md#many-to-any-m2a) field, the nested relational data is two
levels deep: _the first is for the collection, and the second is for the items from the collection._

For example, the first level will contain collection-level information.

```json
{
	"m2a_children": [
		{
			"id": 1,
			"collection": "headings",
			"item": 10 // item 10 in the headings collection
		},
		{
			"id": 2,
			"collection": "paragraphs",
			"item": 21 // item 21 in the paragraphs collection
		}
	]
}
```

The second level will contain each item you need.

```json
{
	"m2a_children": [
		{
			"id": 1,
			"collection": "headings",
			"item": {
				/* fields from item 10 in headings */
			}
		},
		{
			"id": 1,
			"collection": "paragraphs",
			"item": {
				/* fields from item 21 in paragraphs */
			}
		}
	]
}
```

:::tip

The [`fields` parameter](/reference/query#fields) comes with a special syntax for viewing M2A data.

:::

### Manage Nested Items (Basic)

When you `CREATE` or `UPDATE` an item, you can **link** or **unlink** existing nested relational items. To do this,
simply add or omit foreign keys as desired.

```json
{
	"children": []
}
```

```json
{
	"children": [2, 149]
}
```

```json
{
	"children": [2]
}
```

When you `CREATE` or `UPDATE` an item, you can you can also `CREATE` and `UPDATE` nested relational items within the
array.

- To `CREATE` an item, provide an object without a primary key.
- To `UPDATE` an item, provide an object with a primary key.

```json
{
	"children": [
		2, // assign existing item 2 to be a child of the current item
		{
			"name": "A new nested item" // create new item
		},
		{
			"id": 149, // update item 149
			"name": "Assign and update existing item 149"
		}
	]
}
```

This method of managing related items is very useful for smaller relational datasets. But you have to specify every key
in the array, even for items you don't want to modify or unlink. Once the array starts to contain many items, this could
get difficult to deal with.

### Manage Nested Items (Detailed)

Alternatively, when you `CREATE` or `UPDATE` an item, you can provide an object detailing the changes you'd like to make
to its relational data. This is useful if you need to have tighter control on staged changes, or when you're working
with a big relational dataset.

```json
{
	"children": {
		"create": [{ "name": "A new nested item" }], // creates & links item
		"update": [
			// links item 2 without updating it
			{ "id": 2 },

			// links and updates item 149
			{ "id": 149, "name": "An updated nested item" }
		],
		"delete": [7] // unlinks item 7
	}
}
```

A few things to note from above:

- `create` and `update` require an array of objects, but not primary keys.
- `delete` requires an array of primary keys, but not objects.
- `delete` doesn't `DELETE` the nested item, it deletes _(or unlinks)_ the relationship

<!--
### GraphQL Syntax

In GraphQL, you can use nested fragments on the Union Type to select the fields:

```graphql
query {
	pages {
		sections {
			item {
				... on headings {
					id
					title
				}

				... on paragraphs {
					body
					background_color
				}
			}
		}
	}
}
```
-->
