## Read Relational Data

With the default syntax, Directus endpoints let you manipulate one collection, and only let you access the fields that
you explicitly define. When you have a field or alias field that points to another collection, you can access and manage
its data as well.

To `READ` data from a related collection with:

- REST or the JS-SDK, use [the `fields` parameter](/reference/query#fields)
- [GraphQL](https://graphql.org/learn/), use regular nested queries

You also can modify deeply nested relational data. In other words, you can **assign**, `CREATE`, `UPDATE`, and
**remove** relationally-linked items from any relationally-linked collection, even if the collections have several
degrees of separation.

The process for this varies, depending on the type of relationship used.

## M2O Assign Nested Item

When you `CREATE` or `UPDATE` an item, sometimes you may need to relationally link an existing item. To do this, we
simply set an id on the relational field.

To give an example, let's imagine we have a collection called `email_newsletters`:

```
email_newsletters
- id
- content_body (the content of the newsletter)
- featured_video (M2O to the videos collection)
```

And an M2O-related `videos` collection:

```
videos
- id
- author
- title
- url
- tags
```

To link an existing video, simply assign the `id` of the desired item to the relational field.

```json
{
	"content_body": "the newsletter body",
	"featured_video": 3
}
```

The item from `email_newsletters` will be linked to the item with `videos.id = 3`.

## M2O Create Nested Item

When you `CREATE` or `UPDATE` an item, sometimes you may need to `CREATE` and link a related item. To do this, you can
submit the data you want to use to create the item as an object under the relational field in your collection.

To demonstrate this, let's continue with the example from the [Set Nested M2O](#create-m2o) section. To create a new
`videos` item and assign it on the fly, simply add the nested fields and data desired.

```json
{
	"content_body": "the newsletter body",
	"featured_video": {
		"url": "www.youtube.com/the-new-video"
	}
}
```

Directus will:

- create the new item in `videos`
- assign a value to its `videos.url` field and leave the other values default or `null`
- relationally link the item in `email_newsletters` to the item created in `videos`

## M2O Update Nested Item

When you `CREATE` or `UPDATE` an item, sometimes you may need to `UPDATE` a related item. To do this, simply provide the
primary key along with the other field updates. To demonstrate this, let's continue with the example from the
[Set Nested M2O](#create-m2o) section.

```json
{
	"featured_video": {
		"id": 15,
		"url": "www.youtube.com/updated-url"
	}
}
```

Directus will:

- make sure the item with `video.id` is related
- update any other fields passed

## M2O Remove Nested Item

Sometimes you'll want to _unlink_, or remove the relationship, of a related item.

Since an M2O relationship stores the foreign key on the field itself, you can remove the item by setting the the field
to `null`.

To demonstrate this, let's continue with the example from the [Set Nested M2O](#create-m2o) section.

```json
{
	"featured_article": null
}
```

## O2M & M2M

One-to-Many _(and therefore Many-to-Many and Many-to-Any)_ relationships can be managed in one of two ways:

**Basic**

## Set items for O2M & M2M (Basic)

The API will return one-to-many fields as an array of nested keys or items (based on the `fields` parameter). You can
use this same structure to select what the related items are:

```json
{
	"children": [2, 7, 149]
}
```

You can also provide an object instead of a primary key in order to create new items nested on the fly, or an object
with a primary key included to update an existing item:

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

To remove items from this relationship, simply omit them from the array:

```json
{
	"children": [2, 149]
}
```

This method of updating a one-to-many is very useful for smaller relational datasets.

**"Detailed"**

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

This is useful if you need to have more tightly control on staged changes, or when you're working with a big relational
dataset.

#### Many-to-Any (Union Types)

Many-to-Any fields work very similar to a "regular" many-to-many, with the exception that the related field can pull in
the fields from any of the related collections, for example:

```json
{
	"sections": [
		{
			"collection": "headings",
			"item": {
				/* headings fields */
			}
		},
		{
			"collection": "paragraphs",
			"item": {
				/* paragraphs fields */
			}
		}
	]
}
```

##### REST API

To scope the fields that are returned per collection type, you can use the `<field>:<scope>` syntax in the fields
parameter as follows:

```
GET /items/pages
	?fields[]=sections.item:headings.id
	&fields[]=sections.item:headings.title
	&fields[]=sections.item:paragraphs.body
	&fields[]=sections.item:paragraphs.background_color
```

##### GraphQL

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
