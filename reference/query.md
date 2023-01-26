---
description: REST and GraphQL API documentation to run queries in Directus.
readTime: 9 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Global Query Parameters

> Most Directus API Endpoint operations can be manipulated with the following parameters. It is important to understand
> them to get the most out of the platform.

---

## Fields

Choose the fields that are returned in the current dataset.

:::tip GraphQL Native Feature

Choosing fields is a native feature of GraphQL. For more details, see the [GraphQL documentation](https://graphql.org/).

:::

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
?fields=<fieldname>
```

</template>
<template #graphql>

```graphql

# Natively supported in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
// returns the `id` field for each item:
?fields=id
```

</template>
<template #graphql>

```graphql

# Natively supported in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Wildcards

You can also use a wildcard `*` to include all fields at a specific depth.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
// returns all top-level fields
?fields=*
```

</template>
<template #graphql>

```graphql

# Not supported.
# GraphQL requires you to explicitly define each field.
# However, you CAN use wildcards on a filter in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

:::tip

GraphQL forces you to define specific fields, but you can still use the wildcard on other query parameters passed on a
GraphQL call, such as [filters](#filter).

:::

::: tip Performance & Size

While the fields wildcard is very useful for debugging purposes, we recommend only requesting _specific_ fields for
production use. By only requesting the fields you really need, you can speed up the request, and reduce the overall
output size.

:::

### Nested Fields

You can use dot-notation to request nested relational fields.

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
// returns the name field nested under the author field:
?fields=author.name

// This returns all the fields nested under author:
?fields=author.*

// This returns all top-level fields and all second-level relational fields.
?fields=*.*

// You can index as deep as you need.
?fields=*.*.*.*
```

</template>

<template #graphql>

```graphql

# Nested field selection is natively supported in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Multiple Fields

You can use a comma `,` to get multiple fields. This can be combined with `.` to specify nested fields as well.

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
// return top-level `first_name` and `last_name` fields
?fields=first_name,last_name

// You can use multiple fields params
// returns first_name and last_name
?fields[]=first_name,
&fields[]=last_name

// Return all top-level fields
// and second-level relational fields within `images`.
fields=*,images.*


// Return all top-level and second-level relational fields
// and third-level fields within `images.thumbnails`

?fields=*.*,images.thumbnails.*
```

</template>

<template #graphql>

```graphql

# Multiple field selection is natively supported in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Many-To-Any (Union Types)

Seeing that [Many-to-Any (M2A)](/configuration/data-model/relationships.md#many-to-any-m2a) fields have nested data from
multiple collections, it's not always safe / wanted to fetch the same field from every related collection. In M2A
fields, you can use the following syntax to specify exactly which fields to fetch from which related nested collection
type. In GraphQL, this can be achieved using [Union Types](https://graphql.org/learn/schema/#union-types).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
?fields=<m2a-field>:<collection-scope>.<field>
```

</template>
<template #graphql>

```graphql

# Natively supported in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

Let's say we have a collection `pages` with a many-to-any field called `sections` that links to three collections:
`headings`, `paragraphs`, and `videos`.

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
// returns:
// body field from `paragraphs`
// both the title and level fields from headings
// all the fields * from videos

?fields=
	sections.item:headings.title,
	sections.item:headings.level,
	sections.item:paragraphs.body,
	sections.item:videos.*
```

</template>

<template #graphql>

```graphql

# Field querying is natively supported in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Filter

Used to search items in a collection that matches the filter's conditions.

The filter param follows [the Filter Rules spec](/reference/filter-rules), which includes additional information on
logical operators (AND/OR), nested relational filtering, and dynamic variables.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?filter[first_name][_eq]=Rijk

// or

?filter={ "first_name": { "_eq": "Rijk" }}
```

</template>

<template #graphql>

```graphql
query {
	users(filter: { first_name: { _eq: "Rijk" } }) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Examples

Retrieve all items where `first_name` equals "Rijk"

```json
{
	"first_name": {
		"_eq": "Rijk"
	}
}
```

Retrieve all items in one of the following categories: "vegetables", "fruit"

```json
{
	"categories": {
		"_in": ["vegetables", "fruit"]
	}
}
```

Retrieve all items that are published between two dates

```json
{
	"date_published": {
		"_between": ["2021-01-24", "2021-02-23"]
	}
}
```

Retrieve all items where the author's "vip" field is true

```json
{
	"author": {
		"vip": {
			"_eq": true
		}
	}
}
```

::: tip Nested Filters

The above example will filter the _top level_ items based on a condition _in_ the related item. If you're looking to
filter the related items themselves, take a look at [the `deep` parameter](#deep).

:::

---

::: tip Filtering M2A fields in GraphQL

Because attribute names in GraphQL cannot contain the `:` character, you will need to replace it with a double
underscore `__`. For example, instead of using `sections.item:heading` in your filter, you will need to use
`sections.item__heading` (see the full example below).

```graphql
query {
    articles(filter: {
        sections: {
            item__headings: {  # Instead of: item:headings
                title: {
                    _eq: "Section 1"
                }
            }
        }
    }): {
        id
    }
}
```

:::

## Search

The search parameter allows you to perform a search on all string and text type fields within a collection. It's an easy
way to search for an item without creating complex field filters – though it is far less optimized. It only searches the
root item's fields, related item fields are not included.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
?search=<search_value>
```

</template>
<template #graphql>

```graphql
# find all items that mention Directus
query {
	articles(search: "<search_value>") {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// find all items that mention Directus
?search=Directus
```

</template>

<template #graphql>

```graphql
# find all items that mention Directus
query {
	articles(search: "Directus") {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Sort

Defines field(s) to items sort by. Sort order defaults to ascending. A minus sign `-` switches to this descending order.
Fields sort priority is determined by its order in the parameter. Dot-notation has to be used when sorting with values
of nested fields.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Sort by:
// field 1 ascending
// then field2 descending
// then field3.nested_field ascending

?sort=<field1>,-<field2>,<field3.nested_field>

// or

?sort[]=<field1>
&sort[]=<-field2>
&sort[]=-<field3.nested_field>
```

</template>

<template #graphql>

```graphql
# Sort by:
# field 1 ascending
# then field2 descending
# then field3.nested_field ascending

query {
	collection(sort: ["<field1>", "-<field2>", "<field3.nested_field>"]) {
		some_field
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Sort by:
// a sort field ascending
// then date_created descending
// then author.name ascending

?sort=sort,-date_created,author.name

// or

?sort[]=sort
&sort[]=-date_created
&sort[]=-author.name
```

</template>

<template #graphql>

```graphql
# Sort by:
# a sort field ascending
# then date_created descending
# then author.name ascending

query {
	articles(sort: ["sort", "-date_created", "author.name"]) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Limit

Set the maximum number of items that will be returned. The default limit is set to `100`.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?limit=<number>
```

</template>

<template #graphql>

```graphql
query {
	articles(limit: <number>) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Get first 200 items
?limit=200

// Get all items
limit?=-1
```

</template>

<template #graphql>

```graphql
# Get first 200 items
query {
	articles(limit: 200) {
		id
	}
}

# Get all items
query {
	articles(limit: -1) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

:::warning All Items

Depending on the size of your collection, fetching unlimited data may result in degraded performance or timeouts, use
with caution.

:::

---

## Offset

Skip the first `n` items in the response. Can be used for pagination.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Skip first <number> items in the response
?offset=<number>
```

</template>

<template #graphql>

```graphql
# Skip first <number> items in the response
query {
	articles(offset: <number>) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Get items 101-200
?offset=100
```

</template>

<template #graphql>

```graphql
// Get items 101-200
query {
	articles(offset: 100) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

:::tip Why does this get just 100 items?

That's the default for every request. For details, see the [`limit` parameter](#limit).

:::

---

## Page

An alternative to `offset`, the `page` parameter is a way to set `offset` under the hood by calculating `limit * page`.
Page is 1-indexed.

:::tip

The default limit for requests is 100 items. For details, see the [`limit` parameter](#limit).

:::

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Get items <number> * limit
?page=<number>
```

</template>

<template #graphql>

```graphql
# Get items <number> * limit
query {
	articles(page: <number>) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Get items 1-100
?page=1

// Get items 101-200
?page=2
```

</template>

<template #graphql>

```graphql
# Get items 1-100
query {
	articles(page: 1) {
		id
	}
}

# Get items 101-200
query {
	articles(page: 2) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Aggregation & Grouping

Aggregate functions allow you to perform calculations on a set of values, returning a single result. The following
aggregators are available in Directus:

| Name            | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `count`         | Counts how many items there are                               |
| `countDistinct` | Counts how many unique items there are                        |
| `sum`           | Adds together the values in the given field                   |
| `sumDistinct`   | Adds together the unique values in the given field            |
| `avg`           | Get the average value of the given field                      |
| `avgDistinct`   | Get the average value of the unique values in the given field |
| `min`           | Return the lowest value in the field                          |
| `max`           | Return the highest value in the field                         |
| `countAll`      | Equivalent to `?aggregate[count]=*` (GraphQL only)            |

### Grouping

By default, the above aggregators run on the whole dataset. To allow for more flexible reporting, you can add the
`groupBy` parameter to aggregate based on a shared value. This allows you to find things like _"Average rating per
month"_ or _"Total sales of items in the jeans category"_. The `groupBy` parameter allows for grouping on multiple
fields simultaneously. You can also add [Functions](#functions), which enable for aggregate reporting per
year-month-date.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?aggregate[<aggregation_function>]=<field>
&groupBy[]=<field>
&groupBy[]=<function>(<field>)
```

</template>

<template #graphql>

```graphql
query {
	articles_aggregated(groupBy: [ "<field>", "<function>(<field>)" ]) {
		group
		<aggregation_function> {
			<field>
		}
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Get the average revenue per author per publish_year
?aggregate[avg]=revenue
&groupBy[]=author
&groupBy[]=year(publish_date)
```

</template>

<template #graphql>

```graphql
# Get the average cost per author per publish_year
query {
	articles_aggregated(groupBy: ["author", "year(publish_date)"]) {
		group
		avg {
			revenue
		}
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Deep

Deep allows you to set any of the other query parameters on nested relational data.

You can pass one simple parameter.

```json
// Limit the nested related articles to 3:
{
	"related_articles": {
		"_limit": 3
	}
}
```

Or you can pass multiple complex parameters.

```json
// Only get 3 related articles, with only the top-rated comment nested:
{
	"related_articles": {
		"_limit": 3,
		"comments": {
			"_sort": "rating",
			"_limit": 1
		}
	}
}
```

:::tip GraphQL Native

Deep queries is a native feature of [GraphQL](https://graphql.org/). Just pass the desired parameter as you normally
would at the proper depth.

:::

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?deep[<relational_field>][_<parameter>][<nested_field>]<parameter_option>

// OR

?deep={ "<relational_field>": { "_<parameter>": { "<nested_field>": { <parameter_option> }}}}

```

</template>

<template #graphql>

```graphql
# Natively supported in GraphQL.
# You can run a query parameter at any depth.
# Therefore, syntax will vary depending on your parameter and depth.
# Please refer to the query parameter you wish to use.
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// return nested items where translations.language_code is English

?deep[translations][_filter][languages_code][_eq]=en-US

// OR

?deep={ "translations": { "_filter": { "languages_code": { "_eq": "en-US" }}}}
```

</template>

<template #graphql>

```graphql
# return nested items where translations.language_code is English
query {
	some_collection {
		translations(filter: { languages_code: { _eq: "en-US" } }) {
			some_fields
		}
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Aliases

Aliases allow you to rename fields on the fly as well as request the same nested data set multiple times using different
filters.

:::tip GraphQL Native

Aliasing is a native feature of graphQL. For details, see the documentation on
[GraphQL aliases](https://graphql.org/learn/queries/#aliases).

:::

::: warning Nested fields

This is only possible for top level fields. An alias for `field.nested_field` won't work.

:::

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?alias[<alias1>]=<field1>      		// A basic alias
&alias[<alias2>]=<field1>     		// Add multiple aliases
&deep[<alias2>]<query_parameter>	// Use alias in other query params
```

</template>

<template #graphql>

```graphql
query {
	collection {
		alias1 : field1 (<parameter>) {
			some_fields
		}

		alias2 : field1 {
			some_fields
		}
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?alias[all_translations]=translations
&alias[dutch_translations]=translations
&deep[dutch_translations][_filter][code][_eq]=nl-NL
```

</template>

<template #graphql>

```graphql
query {
	articles {
		dutch_translations: translations(filter: { code: { _eq: "nl-NL" } }) {
			id
		}

		all_translations: translations {
			id
		}
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Export

Save the current API response to a file.

Saves the API response to a file. Accepts one of `json`, `csv`, `xml`.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?export=<file_type>
```

</template>

<template #graphql>

```graphql

# Not currently available in GraphQL.

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?export=json
?export=csv
?export=xml
```

</template>

<template #graphql>

```graphql

# Not currently available in GraphQL.

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Functions

Functions allow for "live" modification of values stored in a field. Functions can be used in any query parameter in
which you'd normally supply a field key, including fields, aggregation, and filter.

### DateTime Functions

| Filter    | Description                                              |
| --------- | -------------------------------------------------------- |
| `year`    | Extract the year from a datetime/date/timestamp field    |
| `month`   | Extract the month from a datetime/date/timestamp field   |
| `week`    | Extract the week from a datetime/date/timestamp field    |
| `day`     | Extract the day from a datetime/date/timestamp field     |
| `weekday` | Extract the weekday from a datetime/date/timestamp field |
| `hour`    | Extract the hour from a datetime/date/timestamp field    |
| `minute`  | Extract the minute from a datetime/date/timestamp field  |
| `second`  | Extract the second from a datetime/date/timestamp field  |

### Array Functions

| Filter  | Description                                                       |
| ------- | ----------------------------------------------------------------- |
| `count` | Extract the number of items from a JSON array or relational field |

::: warning GraphQL

Names aren't allowed to include any special characters in GraphQL, preventing the `()` syntax from being used. As an
alternative, the above functions can be used by appending `_func` at the end of the field name, and using the function
name as the nested field.

:::

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Basic Syntax
<function>(<field>)
```

</template>

<template #graphql>

```graphql
query {
	collection(filter: { field_func: { function: { _eq: 2021 } } }) {
		some_fields
		date_published_func {
			weekday
		}
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Use with other fields and other parameters.

?fields=id,title,weekday(date_published)
&filter[year(date_published)][_eq]=2021
```

</template>

<template #graphql>

```graphql
query {
	articles(filter: { date_published_func: { year: { _eq: 2021 } } }) {
		id
		title
		date_published_func {
			weekday
		}
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

---

## Metadata

`meta` allows you to retrieve some additional information about the items in the collection you're fetching. You have
three options:

- `*` is the wildcard to retrieve all metadata.
- `total_count` Returns the total item count of the collection you're querying.
- `filter_count` Returns the item count of the collection you're querying, taking the current filter/search parameters
  into account.

:::tip

[Aggregation & Grouping](#aggregation--grouping) are a more performant and flexible replacement to `metadata`.

:::

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?meta=<option>
```

</template>

<template #graphql>

```graphql

# n/a

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
?meta=total_count

?meta=filter_count

?meta=*
```

</template>

<template #graphql>

```graphql

# n/a

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>
</SnippetToggler>
