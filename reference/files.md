---
description: REST and GraphQL API documentation for file access and management in Directus.
readTime: 10 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Files

> Every file managed by the platform is uploaded to the configured storage adapter, and its associated metadata is
> tracked within the `directus_files` system collection. Any requested file transformations are handled on the fly, and
> are only saved to storage.

---

## How to Access a File

The location of your actual file originals is based on the project's configuration, but you can consistently access them
via the API using the following URL.

```txt
example.com/assets/<file-id>
example.com/assets/1ac73658-8b62-4dea-b6da-529fbc9d01a4
```

::: tip SEO

You can provide an optional filename after the UUID to optimize for SEO, for example:

```txt
example.com/assets/<file-id>/<filename>
example.com/assets/1ac73658-8b62-4dea-b6da-529fbc9d01a4/directus-logo.png
```

This optional filename is also used in the Content-Disposition header when the `?download` query parameter is used.

:::

::: warning Direct File Access

While you may _technically_ be able to expose your storage adapters root file system and access your raw files through
there, it is recommended that you always use the Directus API. This is the only way that you can take advantage of file
permissions and other built-in features.

:::

![Original File](https://cdn.directus.io/docs/v9/reference/files/original-20220216A.jpg) _Original File Used — 602KB and
1800x1200_

---

## How to Download a File

To download an asset with the correct filename, you need to add the `?download` query parameter to the request and the
`download` attribute to your anchor tag. This will ensure the appropriate
[Content-Disposition](https://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html) headers are added. Without this, the
download will work on the _same_ domain, however it will have the file's "id" as the filename for cross-origin requests.

### Example

```html
<a href="https://your-directus.com/assets/<file-id>?download" target="_blank" download="Your File.pdf">Download</a>
```

---

## How to Request a Thumbnail

Fetching thumbnails is as easy as adding a `key` query parameter to the original file's URL. In the Admin App, you can
configure different asset presets that control the output of any given image. If a requested thumbnail doesn't yet
exist, it is dynamically generated and immediately returned.

### Preset Transformations

- **`key`** — This **key** of the [Storage Asset Preset](/configuration/project-settings#files-thumbnails), a shortcut
  for the below parameters

### Custom Transformations

Alternatively, if you have "Storage Asset Transform" set to all, you can use the following parameters for more fine
grained control:

- **`fit`** — The **fit** of the thumbnail while always preserving the aspect ratio, can be any of the following
  options:
  - `cover` — Covers both width/height by cropping/clipping to fit
  - `contain` — Contain within both width/height using "letterboxing" as needed
  - `inside` — Resize to be as large as possible, ensuring dimensions are less than or equal to the requested width and
    height
  - `outside` — Resize to be as small as possible, ensuring dimensions are greater than or equal to the requested width
    and height
- **`width`** — The **width** of the thumbnail in pixels
- **`height`** — The **height** of the thumbnail in pixels
- **`quality`** — The optional **quality** of the thumbnail (`1` to `100`)
- **`withoutEnlargement`** — Disable image up-scaling
- **`format`** — What file format to return the thumbnail in. One of `jpg`, `png`, `webp`, `tiff`

### Advanced Transformations

For even more advanced control over the file generation, Directus exposes
[the full `sharp` API](https://sharp.pixelplumbing.com/api-operation) through the `transforms` query parameter. This
parameter accepts a two-dimensional array with the format `[Operation, ...arguments]`.

<!-- ### Cover vs Contain

For easier comparison, both of the examples below were requested at `200` width, `200` height, and `75` quality. The
`cover` thumbnail forces the dimensions, trimming the outside edges as needed. The `contain` thumbnail always maintains
its aspect ratio, shrinking the image to fit _within_ the dimensions and adding "letterboxing" as needed.

| Cover                                                       | Contain                                                         |
|-------------------------------------------------------------|-----------------------------------------------------------------|
| ![Cover](../assets/200-200-cover-75.jpg)<br>_8KB • 200x200_ | ![Contain](../assets/200-200-contain-75.jpg)<br>_6KB • 200x133_ |

::: tip Aspect Ratio

Images are never stretched or distorted even when changing the aspect ratio.

::: -->

### Quality vs File Size

The quality parameter can be any integer from `0-100`. Qualities closer to `0` have lower file sizes, but also poor
image quality due to compression artifacts. Values closer to `100` have larger file sizes, but better image quality.
Below are four possible qualities (200x200 cover) to visually compare the balance between compression and file size.

| 25%                                                                                             | 50%                                                                                             | 75%                                                                                             | 100%                                                                                               |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![25%](https://cdn.directus.io/docs/v9/reference/files/200-200-cover-25-20220216A.jpg)<br>_4KB_ | ![50%](https://cdn.directus.io/docs/v9/reference/files/200-200-cover-50-20220216A.jpg)<br>_6KB_ | ![75%](https://cdn.directus.io/docs/v9/reference/files/200-200-cover-75-20220216A.jpg)<br>_8KB_ | ![100%](https://cdn.directus.io/docs/v9/reference/files/200-200-cover-100-20220216A.jpg)<br>_38KB_ |

### Preset

```txt
example.com/assets/<file-id>?key=<key>
```

### Custom

```txt
example.com/assets/<file-id>?fit=<fit>&width=<width>&height=<height>&quality=<quality>
example.com/assets/1ac73658-8b62-4dea-b6da-529fbc9d01a4?fit=cover&width=200&height=200&quality=80
```

### Advanced

```txt
?transforms=[
	["blur", 45],
	["tint", "rgb(255, 0, 0)"],
	["expand", { "right": 200, "bottom": 150 }]
]
```

---

## The File Object

`id` **uuid**\
Primary key of the file

`storage` **string**\
Storage adapter used for the file.

`filename_disk` **string**\
Name of the file as saved on the storage adapter.

`filename_download` **string**\
Preferred filename when file is downloaded.

`title` **string**\
Title for the file.

`type` **string**\
Mimetype of the file.

`folder` **many-to-one**\
What (virtual) folder the file is in. Many-to-one to [folders](/reference/system/folders).

`uploaded_by` **many-to-one**\
Who uploaded the file. Many-to-one to [users](/reference/system/users).

`uploaded_on` **datetime**\
When the file was uploaded.

`modified_by` **many-to-one**\
Who updated the file last. Many-to-one to [users](/reference/system/users).

`filesize` **number**\
Size of the file in bytes.

`width` **number**\
If the file is a(n) image/video, it's the width in px.

`height` **number**\
If the file is a(n) image/video, it's the height in px.

`duration` **number**\
If the file contains audio/video, it's the duration in milliseconds.

`description` **string**\
Description of the file.

`location` **string**\
Location of the file.

`tags` **array**\
Tags for the file.

`metadata` **object**\
Any additional metadata Directus was able to scrape from the file. For images, this includes EXIF, IPTC, and ICC information.

```json
{
	"id": "4f4b14fa-a43a-46d0-b7ad-90af5919bebb",
	"storage": "local",
	"filename_disk": "4f4b14fa-a43a-46d0-b7ad-90af5919bebb.jpeg",
	"filename_download": "paulo-silva-vSRgXtQuns8-unsplash.jpg",
	"title": "Paulo Silva (via Unsplash)",
	"type": "image/jpeg",
	"folder": null,
	"uploaded_by": "0bc7b36a-9ba9-4ce0-83f0-0a526f354e07",
	"uploaded_on": "2021-02-04T11:37:41-05:00",
	"modified_by": null,
	"modified_on": "2021-02-04T11:37:42-05:00",
	"filesize": 3442252,
	"width": 3456,
	"height": 5184,
	"duration": null,
	"description": null,
	"location": null,
	"tags": ["photo", "pretty"],
	"metadata": {
		"icc": {
			"version": "2.1",
			"intent": "Perceptual",
			"cmm": "lcms",
			"deviceClass": "Monitor",
			"colorSpace": "RGB",
			"connectionSpace": "XYZ",
			"platform": "Apple",
			"creator": "lcms",
			"description": "c2",
			"copyright": ""
		}
	}
}
```

---

## Get Files

List all files that exist in Directus.

### Query Parameters

Supports all [global query parameters](/reference/query).

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

### Returns

An array of up to [limit](/reference/query#limit) [file objects](#the-file-object). If no items are available, data will
be an empty array.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /files
SEARCH /files
```

</template>

<template #graphql>

```txt
POST /graphql/system
```

```graphql
type Query {
	files: [directus_files]
}
```

</template>

<template #js-sdk>

```js

// const collection = directus.items('directus_files');
const collection = directus.files;

// The JS-SDK provides two methods to GET items.

// GET items by query
await collection.readByQuery(
	query // Required:  a query parameter object
);

// GET items by primary keys
await articles.readMany(
	ids_array, // Required: an array of primary keys
	query,     // Optional: a query parameter object
});
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
GET /files
SEARCH /files
```

</template>
<template #graphql>

```graphql
query {
	files {
		id
		filename_disk
	}
}
```

</template>
<template #js-sdk>

```js
const files = directus.files;

// READ BY QUERY
await files.readByQuery({
	search: 'Directus Logo',
	filter: {
		date_published: {
			_gte: '$NOW',
		},
	},
});

// READ ALL
await files.readByQuery({
	// By default API limits results to 100.
	// With -1, it will return all results,
	// but it may lead to performance degradation
	// for large result sets.
	limit: -1,
});

// READ MULTIPLE
await files.readMany(['d17c10aa-0bad-4864-9296-84f522c753e5', 'b6123925-2fc0-4a30-9d86-863eafc0a6e7'], {
	fields: ['title'],
});
```

</template>

</SnippetToggler>

---

## Get a File

Retrieve a single file by primary key.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns a [file object](#the-file-object) if a valid primary key was provided.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```txt
GET /files/:id
```

</template>

<template #graphql>

```txt
POST /graphql/system
```

```graphql
type Query {
	files_by_id(id: ID!): directus_files
}
```

</template>

<template #js-sdk>

```js
// const files = directus.items('directus_files');
const files = directus.files;

await files.readOne(
	id, // A primary key
	query // Optional: a query parameter
);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```txt
GET /files/0fca80c4-d61c-4404-9fd7-6ba86b64154d
```

</template>

<template #graphql>

```graphql
query {
	files_by_id(id: "0fca80c4-d61c-4404-9fd7-6ba86b64154d") {
		id
		filename_disk
	}
}
```

</template>

<template #js-sdk>

```js
const files = directus.files;

await files.readOne(15, { fields: ['title'] });
```

</template>

</SnippetToggler>

## Upload a File

Uploads/creates a new file.

To upload a file, use `multipart/form-data` as the encoding type. The file contents need to be provided in a part called
`file`. All other properties of [the file object](#the-file-object) can be provided as parts as well, except
`filename_disk` and `filename_download`.

Alternatively, you can use `application/json` with JSON request body to associate metadata to a file that already exists
in the storage. The `type` property will be required to specify the mimetype of that file.

::: tip Order Matters

Be sure to define the non-file properties _first_. This ensures that the file metadata is associated with the correct
file.

:::

You can upload multiple files at a time by repeating the payload with different contents:

```
--__X_BOUNDARY__
Content-Disposition: form-data; name="title"

Example
--__X_BOUNDARY__
Content-Disposition: form-data; name="file"; filename="paulo-silva-vSRgXtQuns8-unsplash.jpg"
Content-Type: image/jpeg

// binary data

--__X_BOUNDARY__
Content-Disposition: form-data; name="title"

Another Title
--__X_BOUNDARY__
Content-Disposition: form-data; name="file"; filename="mae-mu-GFhqNX1gE9E-unsplash.jpg"
Content-Type: image/jpeg

// binary data
```

In JavaScript, this can be achieved using the native `FormData` class:

```js
import axios from 'axios';

const fileInput = document.querySelector('input[type="file"]');
const formData = new FormData();

formData.append('title', 'My First File');
formData.append('file', fileInput.files[0]);

await axios.post('/files', formData);
```

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns the [file object](#the-file-object) for the uploaded file, or an array of [file objects](#the-file-object) if
multiple files were uploaded at once.

```txt
POST /files
```

```
// Request

Content-Type: multipart/form-data; charset=utf-8; boundary=__X_BOUNDARY__
Content-Length: 3442422

--__X_BOUNDARY__
Content-Disposition: form-data; name="file"; filename="paulo-silva-vSRgXtQuns8-unsplash.jpg"
Content-Type: image/jpeg

ÿØÿàJFIFHHÿâICC_PROFILElcmsmntrRGB XYZ Ü)9acspAPPLöÖÓ-lcms
descü^cprt\wtpthbkpt|rXYZgXYZ¤bXYZ¸rTRCÌ@gTRCÌ@bTRCÌ@descc2textIXXYZ öÖÓ-XYZ 3¤XYZ o¢8õXYZ b·ÚXYZ $ ¶ÏcurvËÉckö?Q4!ñ)2;FQw]íkpz±|¬i¿}ÓÃé0ÿÿÿÛ
```

### JS-SDK Browser

To upload a file from a browser you will need to send a `multipart/form-data` as body:

```js
/* index.js */
import { Directus } from 'https://unpkg.com/@directus/sdk@latest/dist/sdk.esm.min.js';

const directus = new Directus('https://example.directus.app', {
	auth: {
		// You can use a static token for auth.
		// You can also use email and password.
		// For details, see the next comment
		staticToken: 'STATIC_TOKEN',
	},
});

// If you want to use email and password,
// remove the staticToken above and use this
// await directus.auth.login({ email, password })

const form = document.querySelector('#upload-file');

if (form && form instanceof HTMLFormElement) {
	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const form = new FormData(event.target);
		await directus.files.createOne(form);
	});
}
```

```html
<!-- index.html -->
<head></head>
<body>
	<form id="upload-file">
		<input type="text" name="title" />
		<input type="file" name="file" />
    	<button>Send</button>
	</form>
	<script src="/index.js" type="module"></script>
</body>
</html>
```

### JS-SDK NodeJS

From a NodeJS environment, you'll have to override the headers to ensure the correct boundary is set:

```js
import { Directus } from 'https://unpkg.com/@directus/sdk@latest/dist/sdk.esm.min.js';

const directus = new Directus('https://example.directus.app', {
	auth: {
		// You can use a static token for auth.
		// You can also use email and password.
		// For details, see the next comment
		staticToken: 'STATIC_TOKEN',
	},
});

// If you want to use email and password,
// remove the staticToken above and use this
// await directus.auth.login({ email, password })

const form = new FormData();
form.append("file", fs.createReadStream("./to_upload.jpeg"));

const fileId = await directus.files.createOne(form, {}, {
  requestOptions: {
    headers: {
      ...form.getHeaders()
    }
  }
);
```

---

## Import a File

Import a file from the web

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`file_object` **Required**

- **Type** — `String`
- **Description** — An object containing the file `url` **Required** and `data` **Optional** to add. See the next two
  options for details:

  `url` **Required**

  - **Type** — `String`
  - **Description** — The URL to download the file from.

  `data` **Optional**

  - **Type** — `Object`
  - **Desctription** — Any of [the file object](#the-file-object)'s properties.

### Returns

Returns the [file object](#the-file-object) for the imported file.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```txt
POST /files/import
```

</template>

<template #graphql>

```txt
POST /graphql/system
```

```graphql
type Mutation {
	import_file(url: String!, data: create_directus_files_input!): directus_files
}
```

</template>

<template #js-sdk>

```js
await directus.files.import({
	url: url_string, // Required: a string for the file path URL
	data: data_object, // Optional: An object containing custom data
});
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// POST /files/import

{
	"url": "https://source.unsplash.com/random",
	"data": {
		"title": "Example"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	import_file(url: "https://source.unsplash.com/random", data: { title: "Example" }) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// Example of importing a file from a URL
await directus.files.import({
	url: 'http://www.example.com/example-image.jpg',
});

// Example of importing file with custom data
await directus.files.import({
	url: 'http://www.example.com/example-image.jpg',
	data: {
		title: 'My Custom File',
	},
});
```

</template>

</SnippetToggler>

---

## Update a File

Update an existing file, and/or replace it's file contents.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

You can either submit a JSON object consisting of a partial [file object](#the-file-object) to update the file meta, or
send a multipart/form-data request to replace the file contents on disk. See [Upload a File](#upload-a-file) for more
information on the structure of this `multipart/form-data` request.

### Returns

Returns the [file object](#the-file-object) for the updated file.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```txt
PATCH /files/:id
```

</template>

<template #graphql>

```txt
POST /graphql/system
```

```graphql
type Mutation {
	update_files_item(id: ID!, data: update_directus_files_input!): directus_files
}
```

</template>

<template #js-sdk>

```js
// const files = directus.items('directus_files');
const files = directus.files;

await files.updateOne(
	primary_key, // The primary key
	data, // An object { "field": "value"} to update items
	query // Optional: a query parameter
);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// PATCH /files/0fca80c4-d61c-4404-9fd7-6ba86b64154d

{
	"title": "Example"
}
```

</template>

<template #graphql>

```graphql
mutation {
	update_files_item(id: "0fca80c4-d61c-4404-9fd7-6ba86b64154d", data: { title: "Example" }) {
		id
		title
	}
}
```

</template>
<template #js-sdk>

```js
// const files = directus.items('directus_files');
const files = directus.files;

await files.updateOne(
	42,
	{
		title: 'An updated title',
	},
	{
		fields: ['title'],
	}
);
```

</template>

</SnippetToggler>

---

## Update Multiple Files

Update multiple files at the same time.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`keys` **Required**\
Array of primary keys of the files you'd like to update.

`data` **Required**\
Any of [the file object](#the-file-object)'s properties.

### Returns

Returns the [file objects](#the-file-object) for the updated files.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```txt
PATCH /files
```

</template>

<template #graphql>

```txt
POST /graphql/system
```

```graphql
type Mutation {
	update_files_items(ids: [ID!]!, data: update_directus_files!): [directus_files]
}
```

</template>

<template #js-sdk>

```js
// const files = directus.items('directus_files');
const files = directus.files;

await files.updateOne(
	primary_key, // The primary key
	data, // An object { "field": "value"} to update items
	query // Optional: a query parameter
);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// PATCH /files

{
	"keys": ["b6123925-2fc0-4a30-9d86-863eafc0a6e7", "d17c10aa-0bad-4864-9296-84f522c753e5"],
	"data": {
		"tags": ["cities"]
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_files_items(
		ids: ["b6123925-2fc0-4a30-9d86-863eafc0a6e7", "d17c10aa-0bad-4864-9296-84f522c753e5"]
		data: { tags: ["cities"] }
	)
}
```

</template>
<template #js-sdk>

```js
// const files = directus.items('directus_files');
const files = directus.files;

await files.updateOne(
	42,
	{
		title: 'An updated title',
	},
	{
		fields: ['title'],
	}
);
```

</template>

</SnippetToggler>

---

## Delete a File

Delete an existing file.

::: danger Destructive

This will also delete the file from disk.

:::

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Empty response.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```txt
DELETE /files/:id
```

</template>

<template #graphql>

```txt
POST /graphql/system
```

```graphql
type Mutation {
	delete_files_item(id: ID!): delete_one
}
```

</template>

<template #js-sdk>

```js
// const files = directus.items('files');
const files = directus.files;

await files.deleteOne(primary_key);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```txt
DELETE /files/0fca80c4-d61c-4404-9fd7-6ba86b64154d
```

</template>

<template #graphql>

```graphql
mutation {
	delete_files_item(id: "0fca80c4-d61c-4404-9fd7-6ba86b64154d") {
		id
	}
}
```

</template>

<template #js-sdk>

```js
// const files = directus.items('files');
const files = directus.files;

await files.deleteOne('0fca80c4-d61c-4404-9fd7-6ba86b64154d');
```

</template>

</SnippetToggler>

---

## Delete Multiple Files

Delete multiple files at once.

::: danger Destructive

This will also delete the files from disk.

:::

### Request

`ids` **Required**

- **Type** — `Array`
- **Description** — Array of file primary keys

### Returns

Empty response.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```txt
DELETE /files
```

</template>

<template #graphql>

```txt
POST /graphql/system
```

```graphql
type Mutation {
	delete_files_items(ids: [ID!]!): delete_many
}
```

</template>

<template #js-sdk>

```js
// const files = directus.items('directus_files');
const files = directus.files;

await files.deleteMany(ids);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// DELETE /files

["d17c10aa-0bad-4864-9296-84f522c753e5", "b6123925-2fc0-4a30-9d86-863eafc0a6e7"]
```

</template>

<template #graphql>

```graphql
mutation {
	delete_files_items(ids: ["d17c10aa-0bad-4864-9296-84f522c753e5", "b6123925-2fc0-4a30-9d86-863eafc0a6e7"]) {
		ids
	}
}
```

</template>
<template #js-sdk>

```js
// const files = directus.items('directus_files');
const files = directus.files;

await files.deleteMany(['d17c10aa-0bad-4864-9296-84f522c753e5', 'b6123925-2fc0-4a30-9d86-863eafc0a6e7']);
```

</template>

</SnippetToggler>
