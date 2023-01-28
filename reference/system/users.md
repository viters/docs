---
description: REST and GraphQL API documentation on the Users collection in Directus.
readTime: 9 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Users

> Directus Users are the individual accounts that let you authenticate into the API and App. Each user belongs to a Role
> which defines its granular Permissions. [Learn more about Users](/getting-started/glossary#users).

---

## The User Object

`id` **uuid**\
Primary key of the user.

`first_name` **string**\
First name of the user.

`last_name` **string**\
Last name of the user.

`email` **string**\
Email address of the user.

`password` **hash**\
Password of the user.

`location` **string**\
Location of the user.

`title` **string**\
Title of the user.

`description` **string**\
Description of the user.

`tags` **array**\
Tags for the user.

`avatar` **many-to-one**\
Avatar file. Many-to-one to [files](/reference/files).

`language` **string**\
Language the Admin App is rendered in. See [our Crowdin page](https://locales.directus.io) for all available languages and
translations.

`theme` **string**\
One of `auto`, `light`, `dark`.

`tfa_secret` **string**\
When TFA is enabled, this holds the secret key for it.

`status` **string**\
Status of the user. One of `draft`, `invited`, `active`, `suspended`, `archived`.

`role` **uuid**\
Role of the user. Many-to-one to [roles](/reference/system/roles).

`token` **string**\
Static access token for the user.

`last_access` **date**\
Last time the user accessed the API.

`last_page` **string**\
Last page in the app the user used.

`provider` **string**\
What auth provider was used to register this user.

`external_identifier` **string**\
Primary key of the user in the third party authentication provider, if used.

`auth_data` **json**\
Required data about the user as provided by the third party auth provider, if used.

`email_notifications` **boolean**\
When this is enabled, the user will receive emails for notifications.

```json
{
	"id": "0bc7b36a-9ba9-4ce0-83f0-0a526f354e07",
	"first_name": "Admin",
	"last_name": "User",
	"email": "admin@example.com",
	"password": "**********",
	"location": "New York City",
	"title": "CTO",
	"description": null,
	"tags": null,
	"avatar": null,
	"language": "en-US",
	"theme": "auto",
	"tfa_secret": null,
	"status": "active",
	"role": "653925a9-970e-487a-bfc0-ab6c96affcdc",
	"token": null,
	"last_access": "2021-02-05T10:18:13-05:00",
	"last_page": "/settings/roles/653925a9-970e-487a-bfc0-ab6c96affcdc"
}
```

---

## List Users

List all users that exist in Directus.

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

No options available.

### Returns

An array of up to [limit](/reference/query#limit) [user objects](#the-user-object). If no items are available, data will
be an empty array.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /users
SEARCH /users
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	users: [directus_users]
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
GET /users
SEARCH /users
```

</template>
<template #graphql>

```graphql
query {
	users {
		first_name
		last_name
		email
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Retrieve a User

List an existing user by primary key.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns the requested [user object](#the-user-object).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /users/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	users_by_id(id: ID!): directus_users
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
GET /users/72a1ce24-4748-47de-a05f-ce9af3033727
```

</template>
<template #graphql>

```graphql
query {
	users_by_id(id: "72a1ce24-4748-47de-a05f-ce9af3033727") {
		first_name
		last_name
		email
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Retrieve the Current User

Retrieve the currently authenticated user.

### Query Parameters

Supports all [global query parameters](/reference/query).

<!--
### Request

No options available.
-->

### Returns

Returns the [user object](#the-user-object) for the currently authenticated user.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /users/me
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	users_me: directus_users
}
```

</template>
<template #js-sdk>

```js
await directus.users.me.read();

// OR

await directus.users.me.read(query);
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
GET /users/me
```

</template>
<template #graphql>

```graphql
query {
	users_me {
		email
	}
}
```

</template>
<template #js-sdk>

```js
await directus.users.me.read();

// OR

await directus.users.me.read({
	fields: ['last_access'],
});
```

</template>
</SnippetToggler>

---

## Update the Current User

Update the authenticated user.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`user_data` **Required**

- **Type** — `Object`
- **Description** — A partial [user object](#the-user-object) with the fields and values to be updated.

### Returns

Returns the updated [user object](#the-user-object) for the authenticated user.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /users/me
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_users_me(data: user_data!): directus_users
}
```

</template>
<template #js-sdk>

```js
await directus.users.me.update(user_data);

// Supports optional query:

await directus.users.me.update(user_data, query);
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
// PATCH /users/me

{
	"email": "new.email@example.com"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_users_me(data: { email: "new.email@example.com" }) {
		email
	}
}
```

</template>
<template #js-sdk>

```js
await directus.users.me.update({ first_name: 'Admin' });

// Supports optional query:

await directus.users.me.update({ first_name: 'Admin' }, { fields: ['last_access'] });
```

</template>
</SnippetToggler>

---

## Create a User

Create a new user

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`user_data` **Required**

- **Type** — `Object`
- **Description** — A partial [user object](#the-user-object). Note that `email` and `password` are required to
  authenticate with the default authentication provider.

### Returns

Returns the [user object](#the-user-object) for the created user.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /users
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_users_item(data: user_data!): directus_users
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
// POST /users

{
	"email": "another@example.com",
	"password": "d1r3ctu5",
	"role": "c86c2761-65d3-43c3-897f-6f74ad6a5bd7"
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_users_item(
		data: { email: "another@example.com", password: "d1r3ctu5", role: "c86c2761-65d3-43c3-897f-6f74ad6a5bd7" }
	) {
		email
		role
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Create Multiple Users

Create multiple new users

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`directus_users` **Required**

- **Type** — `Array`
- **Description** — An array of partial [user object](#the-user-object). Note that `email` and `password` are required
  to authenticate with the default authentication provider.

### Returns

Returns the [user objects](#the-user-object) for the created users.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /users
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_users_items(data: [directus_users!]!): [directus_users]
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
// POST /users

[
	{
		"email": "admin@example.com",
		"password": "p455w0rd",
		"role": "c86c2761-65d3-43c3-897f-6f74ad6a5bd7"
	},
	{
		"email": "another@example.com",
		"password": "d1r3ctu5",
		"role": "c86c2761-65d3-43c3-897f-6f74ad6a5bd7"
	}
]
```

</template>
<template #graphql>

```graphql
mutation {
	create_users_items(
		data: [
			{ email: "admin@example.com", password: "p455w0rd", role: "c86c2761-65d3-43c3-897f-6f74ad6a5bd7" }
			{ email: "another@example.com", password: "d1r3ctu5", role: "c86c2761-65d3-43c3-897f-6f74ad6a5bd7" }
		]
	) {
		email
		role
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Update a User

Update an existing user.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`id` **Required**

- **Type** — `String`
- **Description** — Primary key (a uuid) of the user to update.

`user_data` **Required**

- **Type** — `Object`
- **Description** — A partial [user object](#the-user-object) with the fields and values to be updated.

### Returns

Returns the [user object](#the-user-object) for the updated user.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /users/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_users_item(id: ID!, data: user_data!): directus_users
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
// PATCH /users/72a1ce24-4748-47de-a05f-ce9af3033727

{
	"title": "CTO"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_users_item(id: "72a1ce24-4748-47de-a05f-ce9af3033727", data: { title: "CTO" }) {
		first_name
		last_name
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

---

## Update Multiple Users

Update multiple existing users.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`keys` **Required**

- **Type** — `Array`
- **Description** — Array of primary keys of the users you'd like to update.

`data` **Required**

- **Type** — `Object`
- **Description** — Any of [the user object](#the-user-object)'s properties.

### Returns

Returns the [user objects](#the-user-object) for the updated users.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /users
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_users_items(ids: [ID!]!, data: update_directus_users_input!): [directus_users]
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
// PATCH /users

{
	"keys": ["72a1ce24-4748-47de-a05f-ce9af3033727", "9c3d75a8-7a5f-41a4-be0a-1488fd974511"],
	"data": {
		"title": "CTO"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_users_items(
		ids: ["72a1ce24-4748-47de-a05f-ce9af3033727", "9c3d75a8-7a5f-41a4-be0a-1488fd974511"]
		data: { title: "CTO" }
	) {
		first_name
		last_name
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Delete a User

Delete an existing user.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /users/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_users_item(id: ID!): delete_one
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
DELETE /users/72a1ce24-4748-47de-a05f-ce9af3033727
```

</template>
<template #graphql>

```graphql
mutation {
	delete_users_item(id: "72a1ce24-4748-47de-a05f-ce9af3033727") {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Delete Multiple Users

Delete multiple existing users.

### Request

An array of user primary keys

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /users
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_users_items(ids: [ID!]!): delete_many
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
// Request
["653925a9-970e-487a-bfc0-ab6c96affcdc", "c86c2761-65d3-43c3-897f-6f74ad6a5bd7"]
```

</template>
<template #graphql>

```graphql
mutation {
	delete_users_items(ids: ["72a1ce24-4748-47de-a05f-ce9af3033727", "9c3d75a8-7a5f-41a4-be0a-1488fd974511"]) {
		ids
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Invite a New User

Invite a new user by email.

### Request

`email` **Required**

- **Type** — `String`
- **Description** — User email to invite.

`role` **Required**

- **Type** — `String`
- **Description** —Primary key of the Role assigned to the new user.

`invite_url` **Optional**

- **Type** — `String`
- **Description** — Provide a custom invite url which the link in the email will lead to. The invite token will be
  passed as a parameter. You need to configure the
  [`USER_INVITE_URL_ALLOW_LIST` environment variable](/self-hosted/config-options#security) to enable this feature.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /users/invite
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	users_invite(email: String!, role: String!, invite_url: String): Boolean
}
```

</template>
<template #js-sdk>

```js
await directus.users.invites.send(email, role, invite_url);
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
// POST /users/invite

{
	"email": "another@example.com",
	"role": "c86c2761-65d3-43c3-897f-6f74ad6a5bd7"
}
```

</template>
<template #graphql>

```graphql
mutation {
	users_invite(email: "another@example.com", role: "c86c2761-65d3-43c3-897f-6f74ad6a5bd7")
}
```

</template>
<template #js-sdk>

```js
await directus.users.invites.send('admin@example.com', 'fe38136e-52f7-4622-8498-112b8a32a1e2');
```

</template>
</SnippetToggler>

---

## Accept User Invite

Accept your invite. The [invite user endpoint](#invite-a-new-user) sends the email a link back to the Admin App.

This link includes a token, which is then used to activate the invited user.

### Request

`token` **Required**

- **Type** — `String`
- **Description** — an "accept invite" token.

`password` **Required**

- **Type** — `String`
- **Description** — A password for the user.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /users/invite/accept
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	users_invite_accept(token: String!, password: String!): Boolean
}
```

</template>
<template #js-sdk>

```js
await directus.users.invites.accept(token, password);
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
// POST /users/invite/accept

{
	"token": "eyJh...KmUk",
	"password": "d1r3ctu5"
}
```

</template>
<template #graphql>

```graphql
mutation {
	users_invite_accept(token: "eyJh...KmUk", password: "d1r3ctu5")
}
```

</template>
<template #js-sdk>

```js
await directus.users.invites.accept('<accept-token>', 'n3w-p455w0rd');
```

</template>
</SnippetToggler>

---

## Generate Two-Factor Authentication Secret

Generates a secret and returns the URL to be used in an authenticator app.

### Request

`password` **Required**\
The user's password.

### Returns

`secret` **string**\
OTP secret to be saved in the authenticator app.

`otpauth_url` **string**\
`otpauth://` formatted URL. Can be rendered as QR code and used in most authenticator apps.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /users/me/tfa/generate
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	users_me_tfa_generate(password: String!): users_me_tfa_generate_data
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
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
// POST /users/me/tfa/generate

{
	"password": "d1r3ctu5"
}
```

</template>
<template #graphql>

```graphql
mutation {
	users_me_tfa_generate(password: "d1r3ctu5") {
		secret
		otpauth_url
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Enable Two-Factor Authentication

Adds a TFA secret to the user account.

### Request

`secret` **Required**\
The TFA secret from tfa/generate.

`otp` **Required**\
OTP generated with the secret, to recheck if the user has a correct TFA setup

### Returns

Empty response.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /users/me/tfa/enable
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	users_me_tfa_enable(otp: String!, secret: String!): Boolean
}
```

</template>
<template #js-sdk>

```js
await directus.users.tfa.enable(otp, secret);
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
// POST /users/me/tfa/enable
{
	"otp": "123456",
	"secret": "3CtiutsNBmY3szHE"
}
```

</template>
<template #graphql>

```graphql
mutation {
	users_me_tfa_enable(otp: "123456", secret: "3CtiutsNBmY3szHE")
}
```

</template>

<template #js-sdk>

```js
await directus.users.tfa.enable('my-password');
```

</template>

</SnippetToggler>

---

## Disable Two-Factor Authentication

Disables two-factor authentication by removing the OTP secret from the user.

### Request

`otp` **Required**

- **Type** — `String`
- **Description** — One-time password generated by the authenticator app.

### Returns

Empty response.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /users/me/tfa/disable
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	users_me_tfa_disable(otp: String!): Boolean
}
```

</template>
<template #js-sdk>

```js
await directus.users.tfa.disable(otp);
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
// POST /users/me/tfa/disable

{
	"otp": "859014"
}
```

</template>
<template #graphql>

```graphql
mutation {
	users_me_tfa_disable(otp: "591763")
}
```

</template>
<template #js-sdk>

```js
await directus.users.tfa.disable('591763');
```

</template>

</SnippetToggler>
