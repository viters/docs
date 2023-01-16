## Relational Data Overview

With the default syntax, Directus endpoints let you manipulate one collection, and let you access the fields on it that
you explicitly define. When you have a field that points to another collection you can access and manage its data as
well.

In other words, you can **assign**, `CREATE`, `UPDATE`, and **unlink** items from any relationally-linked collection.
You can even modify deeply nested relational data.

The process for managing relational data varies, depending on the relationship type.

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

### Link or Unlink a Nested Item

When you `CREATE` or `UPDATE` an item, you may need to link or unlink an existing item.

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

You can then unlink any relationship by setting the field to `null`.

```json
{
	"featured_article": null
}
```

### Create Nested Item

When you `CREATE` or `UPDATE` an item, you may need to `CREATE` and link a nested relational item on-the-fly. To do
this, submit the data you want to use as an object without specifying a foreign key.

For example, to create and assign a new `videos` item, add the desired field data.

```json
{
	"content_body": "the newsletter body",
	"featured_video": {
		"url": "www.youtube.com/the-new-video"
	}
}
```

With the data provided, Directus will:

- create the new item in `videos`
- assign a value to its `videos.url` field and leave the other values default or `null`
- relationally link the item in `email_newsletters` to the item created in `videos`

### Update Nested Item

To `UPDATE` the nested item, provide a primary key along with the other field updates.

```json
{
	"featured_video": {
		"id": 15,
		"url": "www.youtube.com/updated-url"
	}
}
```

Directus will:

- make sure the item with the specified primary key is now related
- update any other fields passed

## M2M, O2M & M2A

[Many-to-many](/configuration/data-model/relationships.md#many-to-many-m2m),
[one-to-many](/configuration/data-model/relationships.md#one-to-many-o2m) and
[many-to-any](/configuration/data-model/relationships.md#many-to-any-m2a) fields contain an array with related items.
Therefore, nested relational data is managed the same way for all three.

```json
{
	"id": 1,
	"name": "the parent item",
	"children": [1, 2]
}
```

Each element in the `children` array is a foreign key from the related collection.

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

### More on M2A

M2A fields work like "regular" M2M fields, with the exception that the related field can pull in the fields from any of
the related collections. This means the final object of nested items is one level deeper: _the first is for the
collection, and the second is for the items from the collection._

For example, the data under an M2A field will look like this:

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

To get items in an M2A as desired, the [`fields` parameter](/reference/query#fields) comes with a special syntax for
working with M2A.

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

### Manage Nested Items (Basic)

When you `CREATE` or `UPDATE` an item, you can link or unlink existing nested relational items. To do this, simply add
or omit them from the array.

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

When you `CREATE` or `UPDATE` an item, you can also **link**, **unlink**, and `UPDATE` existing items, or `CREATE` new
items from the array on-the-fly. To do this, provide an object instead of a primary key in order to create new items
nested on the fly, or an object with a primary key included to `UPDATE` an existing item.

```json
{
	"children": [
		2, // assign existing item 2 to be a child of the current item
		{
			"name": "A new nested item"
		},
		{
			"id": 149,
			"name": "Assign and update existing item 149"
		}
	]
}
```

This method of managing related items is very useful for smaller relational datasets.

### Manage Nested Items (Detailed)

Alternatively, you can provide an object detailing the changes as follows:

```json
{
	"children": {
		"create": [{ "name": "A new nested item" }],
		"update": [{ "id": 149, "name": "A new nested item" }],
		"delete": [7]
	}
}
```

This is useful if you need to have tighter control on staged changes, or when you're working with a big relational
dataset.

<!--
### REST Syntax

To scope the fields that are returned per collection type, you can use the `<field>:<scope>` syntax in the fields
parameter as follows:

```
GET /items/pages
	?fields[]=sections.item:headings.id
	&fields[]=sections.item:headings.title
	&fields[]=sections.item:paragraphs.body
	&fields[]=sections.item:paragraphs.background_color
```

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

::: tip Updating

Updating records in a many-to-any is identical to the other relationship types.

:::
-->
