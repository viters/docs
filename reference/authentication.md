---
description: API documentation on authentication in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { useLocalStorage } from '@vueuse/core';
const pref = useLocalStorage('pref', 'REST');
</script>

# Authentication

> All data within the platform is private by default. The
> [public role](/configuration/users-roles-permissions#configure-permissions) can be configured to expose data without
> authentication, or you can pass an access token to the API to access private data.

---

## Access Tokens

There are two types of tokens that can be used to authenticate within Directus.

**Temporary Tokens (JWT)** are returned by the [login](#login) endpoint/mutation. These tokens have a relatively short
expiration time, and are thus the most secure option to use. The tokens are returned with a `refresh_token` that can be
used to retrieve a new access token via the [refresh](#refresh) endpoint/mutation.

**Static Tokens** can be set for each platform user, and never expire. They are less secure, but quite useful for
server-to-server communication. They are saved as plain-text within `directus_users.token`.

Once you have your access token, there are two ways to pass it to the API, via the `access_token` query parameter, or in
the request's Authorization Header.

### Query Parameter

```
?access_token=<token>
```

### Authorization Header

```
Authorization: Bearer <token>
```

---

## Get Current Token

Gets the current token (JS-SDK only).

::: warning Async

Reading the token is an asynchronous getter. This makes sure that any currently active `refresh` calls are being awaited
before the current token is returned.

:::

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
// Not Currently Available for REST
```

</template>
<template #graphql>

```graphql

# Not Currently Available for GraphQL

```

</template>
<template #js-sdk>

```ts
const token = await directus.auth.token;
```

</template>

</SnippetToggler>

## Login

Retrieve a temporary access token and refresh token.

### Request

`email` **string**\
 Required. Email address of the user you're retrieving the access token for.

`password` **string**\
Required. Password of the user.

`otp` **string**\
Optional. The user's one-time-password (if MFA is enabled).

`mode` **string**\
Optional. Whether to retrieve the refresh token in the JSON response, or in a `httpOnly` `secure` cookie. One of `json`,
`cookie`. Defaults to `json`.

### Returns

`access_token` **string**\
Temporary access token to be used in follow-up requests.

`expires` **integer**\
How long before the access token will expire. Value is in milliseconds.

`refresh_token` **string**\
The token that can be used to retrieve a new access token through [`/auth/refresh`](#refresh). Note: if you used `cookie`
as the mode in the request, the refresh token won't be returned in the JSON.

::: tip Expiry Time

The token's expiration time can be configured via the `ACCESS_TOKEN_TTL`
[environment variable](/self-hosted/config-options#general).

:::

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
POST /auth/login/:provider
```

```json
{
	"email": "admin@example.com",
	"password": "d1r3ct5us"
}
```

</template>

<template #graphql>

```
POST /graphql/system
```

```graphql
mutation {
	auth_login(email: "admin@example.com", password: "d1r3ctu5") {
		access_token
		refresh_token
	}
}
```

</template>

<template #js-sdk>

```js
// With Credentials
await directus.auth.login({
	email: 'admin@example.com',
	password: 'd1r3ctu5',
});
```

```js
// With Static Token
await directus.auth.static('static_token');
```

</template>

</SnippetToggler>

---

## Refresh Auth Token

Retrieve a new access token using a refresh token.

### Request

`refresh_token` **string**\
Required. The refresh token to use. If you have the refresh token in a cookie through [`/auth/login`](#login), you don't
have to submit it here.

`mode` **string**\
Required. Whether to retrieve the refresh token in the JSON response, or in a `httpOnly` `secure` cookie. One of `json`,
`cookie`.

### Returns

`access_token` **string**\
Temporary access token to be used in follow-up requests.

`expires` **integer**\
How long before the access token will expire. Value is in milliseconds.

`refresh_token` **string**\
The token that can be used to retrieve a new access token through [`/auth/refresh`](#refresh). Note: if you used `cookie`
as the mode in the request, the refresh token won't be returned in the JSON.

:::tip SDK Refresh Tokens

The SDK will handle token refreshes automatically. However, you can also handle this behavior manually by setting
[`autoRefresh`](/reference/sdk.md#customize-auth) to `false`.

:::

::: tip Developing Locally

If you're developing locally, you might not be able to refresh your auth token automatically in all browsers. This is
because the default auth configuration requires secure cookies to be set, and not all browsers allow this for localhost.
You can use a browser which does support this such as Firefox, or
[disable secure cookies](/self-hosted/config-options#security).

:::

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
POST /auth/refresh
```

```json
{
	"refresh_token": "gmPd...8wuB",
	"mode": "json"
}
```

</template>

<template #graphql>

```
POST /graphql/system
```

```graphql
mutation {
	auth_refresh(refresh_token: "abc...def", mode: json) {
		access_token
		refresh_token
	}
}
```

</template>

<template #js-sdk>

```js
await directus.auth.refresh();
```

</template>

</SnippetToggler>

---

## Logout

Invalidate the refresh token thus destroying the user's session.

### Request

`refresh_token` **string**\
Required. The refresh token to invalidate. If you have the refresh token in a cookie through [`/auth/login`](#login), you
don't have to submit it here.

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
POST /auth/logout
```

```json
{
	"refresh_token": "gmPd...8wuB"
}
```

</template>

<template #graphql>

```
POST /graphql/system
```

```graphql
mutation {
	auth_logout(refresh_token: "gmPd...8wuB")
}
```

</template>

<template #js-sdk>

```js
await directus.auth.logout();
```

</template>

</SnippetToggler>

---

## Request Password Reset

Request a password reset email to be sent to the given user. Uses the
[Reset a Password](/reference/authentication.md#reset-a-password) endpoint.

### Request

`email` **string**\
Required. Email address of the user you're requesting a password reset for.

`reset_url` **string**\
Optional. The `reset_url` option provides a custom reset url which the link in the email will lead to. The reset token will
be passed as a parameter.

:::tip

By default, the address defined on `PUBLIC_URL` in the `.env` file is used for the reset password page link sent by
email. You must configure the `PASSWORD_RESET_URL_ALLOW_LIST`
[environment variable](/self-hosted/config-options#security) to enable this feature.

:::

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
POST /auth/password/request
```

```json
{
	"email": "admin@example.com"
}
```

</template>

<template #graphql>

```
POST /graphql/system
```

```graphql
mutation {
	auth_password_request(email: "admin@example.com")
}
```

</template>

<template #js-sdk>

```js
await directus.auth.password.request('admin@example.com', 'https://myapp.com');
```

</template>

</SnippetToggler>

---

## Reset a Password

The [request a password reset](/reference/authentication.md#request-password-reset) endpoint sends an email with a link
to the admin app (or a custom route) which in turn uses this endpoint to allow the user to reset their password.

### Request

`token` **string**\
Required. The password reset token. The token passed in this parameter gets sent in an email to the user when using [request a password reset](/reference/authentication.md#request-password-reset).

`password` **string**\
Required. New password for the user.

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK' ]"
	label="API"
	>

<template #rest>

```
POST /auth/password/reset
```

```json
{
	"token": "eyJh...KmUk",
	"password": "d1r3ctu5"
}
```

</template>

<template #graphql>

```
POST /graphql/system
```

```graphql
mutation {
	auth_password_reset(token: "eyJh...KmUk", password: "d1r3ctu5")
}
```

</template>
<template #js-sdk>

```js
await directus.auth.password.reset('eyJh...KmUk', 'd1r3ctu5');
```

</template>

</SnippetToggler>

---

## List Auth Providers

Lists all the configured auth providers.

::: tip Configuring auth providers

To learn more about setting up auth providers, see
[Configuring Auth Providers](/self-hosted/config-options#authentication).

:::

### Returns

`data` **array**\
An array of configured auth providers.

`disableDefault` **boolean**\
Sets whether or not the default authentication provider is disabled.

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
GET /auth
```

```json
{
	"data": [
		{
			"name": "GitHub",
			"driver": "oauth2",
			"icon": "github"
		},
		{
			"name": "Google",
			"driver": "openid",
			"icon": "google"
		},
		{
			"name": "Okta",
			"driver": "openid"
		}
	],
	"disableDefault": false
}
```

</template>

<template #graphql>

```graphql

# Not currently available for GraphQL

```

</template>

<template #js-sdk>

```js
// Not Currently Available for JS-SDK
```

</template>

</SnippetToggler>

---

## Login Using SSO Providers

Will redirect to the configured SSO provider for the user to login.

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
GET /auth/login/:provider
```

</template>

<template #graphql>

```graphql

# Not currently available for GraphQL

```

</template>

<template #js-sdk>

```js
// Not Currently Available for JS-SDK
```

</template>

</SnippetToggler>
