---
description:
  The JS SDK provides an intuitive interface for the Directus API from within a JavaScript-powered project (browsers and
  Node.js). The default implementation uses [Axios](https://npmjs.com/axios) for transport and `localStorage` for
  storing state.
readTime: 14 min read
---

# JavaScript SDK

> The JS SDK provides an intuitive interface for the Directus API from within a JavaScript-powered project (browsers and
> Node.js). The default implementation uses [Axios](https://npmjs.com/axios) for transport and `localStorage` for
> storing state. Advanced customizations are available.

## Installation

```bash
npm install @directus/sdk
```

## Basic Usage

This is the starting point to use the JS SDK. After you've created the `Directus` instance, you can start invoking
methods from it to access your project and data.

```js
import { Directus } from '@directus/sdk';

const directus = new Directus('http://directus.example.com');
```

You can always access data available to the [public role](/configuration/users-roles-permissions.html#directus-roles).

```js
async function publicData() {
	// GET DATA

	// We don't need to authenticate if the public role has access to some_public_collection.
	const publicData = await directus.items('some_public_collection').readByQuery({ sort: ['id'] });

	console.log(publicData.data);
}
```

### Basic Authentication

To access anything that is not available to the
[public role](/configuration/users-roles-permissions.html#directus-roles), you must be
[authenticated](/reference/authentication.md).

```js
async function start() {
	// AUTHENTICATION

	let authenticated = false;

	// Try to authenticate with token if exists
	await directus.auth
		.refresh()
		.then(() => {
			authenticated = true;
		})
		.catch(() => {});

	// Let's login in case we don't have token or it is invalid / expired
	while (!authenticated) {
		const email = window.prompt('Email:');
		const password = window.prompt('Password:');

		await directus.auth
			.login({ email, password })
			.then(() => {
				authenticated = true;
			})
			.catch(() => {
				window.alert('Invalid credentials');
			});
	}

	// GET DATA

	// After authentication, we can fetch data from any collections that the user has permissions to.
	const privateData = await directus.items('some_private_collection').readByQuery({ sort: ['id'] });

	console.log(publicData.data);
}

start();
```

## SDK Methods

The JS-SDK enables you to access and manage data just like the other APIs.

You get an instance of the item handler by providing the collection (and type, in the case of [TypeScript](#typescript))
to the `items` function. The following examples will use an `Article` type.

```js
import { Directus, ID } from '@directus/sdk';
const { Directus } = require('@directus/sdk');

const directus = new Directus('https://example.directus.app');
const articles = directus.items('articles');

// From here, you can invoke methods on const articles.
// This method GETS the article item with ID = 1
await articles.readOne(1);
```

This syntax works for all collections, including system collections. For example:

```js
const directus = new Directus('https://example.directus.app');
const users = directus.("directus_users");
// Now you can invoke methods on users
```

However, system collections also come with their own method:

```js
const directus = new Directus('https://example.directus.app');
const users = directus.users;
// Now you can invoke methods on users
```

For more details, please see the documentation for the desired collection endpoint.

:::tip Before You Begin

The _majority_ of the system collection endpoints inherit from the [items endpoint](/reference/items.md). So if you're
just getting started with the Directus API, that's a great place to start exploring.

:::

### Request Parameter Overrides

You can provide an additional parameter with a `requestOptions` object to override any of the axios request parameters.
For details, see the Axios [Request Config](https://axios-http.com/docs/req_config) documentation.

```js
await articles.createOne(
	{ title: 'example' },
	{ fields: ['id'] },
	{
		requestOptions: {
			headers: {
				'X-My-Custom-Header': 'example',
			},
		},
	}
);
```

## TypeScript

Version >= 4.1

Although it's not required, it is recommended to use TypeScript to have an easy development experience. This allows more
detailed IDE suggestions for return types, sorting, filtering, etc.

To feed the SDK with your current schema, you need to pass it on the constructor.

```ts
import { Directus, ID } from '@directus/sdk';

// Map your collection structure based on its fields.
type Article = {
	id: ID;
	title: string;
	body: string;
	published: boolean;
};

type BlogSettings = {
	display_promotions: boolean;
};

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type MyCollections = {
	articles: Article;
	settings: BlogSettings;

	// You can also extend a Directus collection. The naming has
	// to match a Directus system collection and it will be merged
	// into the system spec. See the next code block for details.
	directus_users: {
		bio: string;
	};
};

// This is how you feed custom type information to the Directus SDK.
const directus = new Directus<MyCollections>('https://example.directus.app');

// ... Start using SDK methods

const post = await directus.items('articles').readOne(1);
// typeof(post) is a partial Article object

const settings = await posts.singleton('settings').read();
// typeof(settings) is a partial BlogSettings object

await directus.items('articles').updateOne({ id: 1, published: 'hello' });
// TypeScript will check for errors...
// Error TS2322: "hello" is not assignable to type "boolean".
// post.published = 'hello';
```

You can also provide type information to extend the Directus system collections.

```ts
import { Directus } from '@directus/sdk';

// Custom fields added to Directus user collection.
type UserType = {
	level: number;
	experience: number;
};

type CustomTypes = {
	/*
	This type will be merged with Directus user type.
	It's important that the naming matches a Directus
	collection name exactly. Typos won't get caught here,
	instead the SDK will assume it's a custom user collection.
	*/
	directus_users: UserType;
};

const directus = new Directus<CustomTypes>('https://example.directus.app');

await directus.auth.login({
	email: 'admin@example.com',
	password: 'password',
});

// typeof me = partial DirectusUser & UserType;
const me = await directus.users.me.read();

me.level = 42;
// OK

me.experience = 'high';
// Error TS2322: Type "string" is not assignable to type "number".
```

## Custom Configuration

The [Basic Usage](#basic-usage) section covered installation and usage of the JS-SDK with default configurations for
`init`. But sometimes you may need to customize these defaults.

### Constructor

```js
import { Directus } from '@directus/sdk';

const directus = new Directus(url, init);
```

### Parameters

#### `url` _required_

- **Type** — `String`
- **Description** — A string that points to your Directus instance. E.g., `https://example.directus.io`
- **Default** — N/A

#### `init` _optional_

- **Type** — `Object`
- **Description** — Defines authentication, storage and transport settings.
- **Default** — The following shows the default values for `init`.

```js
// This is the default init object
const config = {
	auth: {
		mode: 'cookie', // 'json' in Node.js
		autoRefresh: true,
		msRefreshBeforeExpires: 30000,
		staticToken: '',
	},
	storage: {
		prefix: '',
		mode: 'LocalStorage', // 'MemoryStorage' in Node.js
	},
	transport: {
		params: {},
		headers: {},
		onUploadProgress: (ProgressEvent) => {},
		maxBodyLength: null,
		maxContentLength: null,
	},
};
```

## Customize `auth`

Defines how authentication is handled by the SDK. By default, Directus creates an instance of `auth` which handles
refresh tokens automatically.

```js
const auth = {
	mode: 'cookie', // 'json' in Node.js
	autoRefresh: true,
	msRefreshBeforeExpires: 30000,
	staticToken: '',
};
```

### Options

#### `mode`

- **Type** — `String`
- **Description** — Defines the mode you want to use for authentication. It can be `'cookie'` for cookies or `'json'`
  for JWT.
- **Default** — Defaults to `'cookie'` on browsers and `'json'` otherwise.

:::tip

We recommend using cookies when possible to prevent any kind of attacks, mostly XSS.

:::

#### `autoRefresh`

- **Type** — `Boolean`
- **Description** — Determines whether SDK handles refresh tokens automatically.
- **Default** — Defaults to `true`.

#### `msRefreshBeforeExpires`

- **Type** — `Number`
- **Description** — When `autoRefresh` is enabled, this tells how many milliseconds before the refresh token expires and
  needs to be refreshed.
- **Default** — Defaults to `30000`.

#### `staticToken`

- **Type** — `String`
- **Description** - Defines the static token to use. It is not compatible with the options above since it does not
  refresh.
- **Default** — Defaults to `''` (no static token).

### Extend `auth`

It is possible to provide a custom implementation by extending `IAuth`. While this could be useful in certain advanced
situations, it is not needed for most use-cases.

```js
import { IAuth, Directus } from '@directus/sdk';

class MyAuth extends IAuth {
	async login() {
		return { access_token: '', expires: 0 };
	}
	async logout() {}
	async refresh() {
		return { access_token: '', expires: 0 };
	}
	async static() {
		return true;
	}
}

const directus = new Directus('https://example.directus.app', {
	auth: new MyAuth(),
});
```

## Customize `storage`

The storage is used to load and save token information. By default, Directus creates an instance of `storage` which
handles store information automatically.

```js
const storage = {
	prefix: '',
	mode: 'LocalStorage', // 'MemoryStorage' in Node.js
};
```

:::tip Multiple Instances

If you want to use multiple instances of the SDK you should set a different [`prefix`](#prefix) for each one.

:::

::: tip

The axios instance can be used for custom requests by calling:

```ts
await directus.transport.<method>('/path/to/endpoint', {
	/* body, params, ... */
});
```

:::

### Options

#### `prefix`

- **Type** — `String`
- **Description** — Defines the tokens prefix tokens that are saved. This should be fulfilled with different values when
  using multiple instances of SDK.
- **Default** — Defaults to `''` (no prefix).

#### `mode`

- **Type** — `String`
- **Description** — Defines the storage location to be used to save tokens. Allowed values are `LocalStorage` and
  `MemoryStorage`. The mode `LocalStorage` is not compatible with Node.js. `MemoryStorage` is not persistent, so once
  you leave the tab or quit the process, you will need to authenticate again.
- **Default** — Defaults to `LocalStorage` on browsers and `MemoryStorage` on Node.js.

### Extend `storage`

It is possible to provide a custom implementation by extending `BaseStorage`. While this could be useful in certain
advanced situations, it is not needed for most use-cases.

```js
import { BaseStorage, Directus } from '@directus/sdk';

class SessionStorage extends BaseStorage {
	get(key) {
		return sessionStorage.getItem(key);
	}
	set(key, value) {
		return sessionStorage.setItem(key, value);
	}
	delete(key) {
		return sessionStorage.removeItem(key);
	}
}

const directus = new Directus('https://example.directus.app', {
	storage: new SessionStorage(),
});
```

## Customize `transport`

Defines settings you want to customize regarding [Transport](#extend-transport).

By default, Directus creates an instance of `Transport` which handles requests automatically. It uses
[`axios`](https://axios-http.com/) so it is compatible in both browsers and Node.js. With axios, it is also possible to
handle upload progress (a downside of `fetch`).

The configurations within `init.transport` are passed to `axios`. For more details, see
[Request Config](https://axios-http.com/docs/req_config) in the axios documentation.

```js
export default {
	params: {},
	headers: {},
	onUploadProgress: (ProgressEvent) => {},
	maxBodyLength: null,
	maxContentLength: null,
};
```

### Options

#### `params`

- **Type** — `Object`
- **Description** — Defines an object with keys and values to be passed as additional query string.
- **Default** — N/A

#### `headers`

- **Type** — `Object`
- **Description** - Defines an object with keys and values to be passed as additional headers.
- **Default** — N/A

#### `onUploadProgress`

- **Type** — `Function`
- **Description** — Defines a callback function to indicate the upload progress.
- **Default** — N/A

:::tip ProgressEvent Please see the MDN documentation to learn more about the
[ProgressEvent](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent).

:::

#### `maxBodyLength`

- **Type** — `Number`
- **Description** — The maximum body length in bytes. Set `Infinity` for no limit.
- **Default** — N/A

#### `maxContentLength`

- **Type** — `Number`
- **Description** — The maximum content length in bytes. Set `Infinity` for no limit.
- **Default** — N/A

### Extend `Transport`

It is possible to provide a custom implementation by extending `ITransport`. For example, you can customize it to use
different HTTP libraries. While this could be useful in certain advanced situations, it is not needed for most
use-cases.

```js
import { ITransport, Directus } from '@directus/sdk';

class MyTransport extends ITransport {
	buildResponse() {
		return {
			raw: '',
			data: {},
			status: 0,
			headers: {},
		};
	}

	async get(path, options) {
		return this.buildResponse();
	}
	async head(path, options) {
		return this.buildResponse();
	}
	async options(path, options) {
		return this.buildResponse();
	}
	async delete(path, data, options) {
		return this.buildResponse();
	}
	async post(path, data, options) {
		return this.buildResponse();
	}
	async put(path, data, options) {
		return this.buildResponse();
	}
	async patch(path, data, options) {
		return this.buildResponse();
	}
}

const directus = new Directus('https://example.directus.app', {
	transport: new MyTransport(),
});
```

## Server

### Ping the Server

```js
await directus.server.ping();
```

### Get Server/Project Info

```js
await directus.server.info();
```

## Users

```js
directus.users;
```

Same methods as `directus.items("directus_users")`, and:

### Invite a New User

```js
await directus.users.invites.send('admin@example.com', 'fe38136e-52f7-4622-8498-112b8a32a1e2');
```

The second parameter is the role of the user

### Accept a User Invite

```js
await directus.users.invites.accept('<accept-token>', 'n3w-p455w0rd');
```

The provided token is sent to the user's email

### Enable Two-Factor Authentication

```js
await directus.users.tfa.enable('my-password');
```

### Disable Two-Factor Authentication

```js
await directus.users.tfa.disable('691402');
```

### Get the Current User

```js
await directus.users.me.read();
```

Supports optional query:

```js
await directus.users.me.read({
	fields: ['last_access'],
});
```

### Update the Current Users

```js
await directus.users.me.update({ first_name: 'Admin' });
```

Supports optional query:

```js
await directus.users.me.update({ first_name: 'Admin' }, { fields: ['last_access'] });
```

## Utils

### Get a Random String

```js
await directus.utils.random.string();
```

Supports an optional `length` (defaults to 32):

```js
await directus.utils.random.string(50);
```

### Generate a Hash for a Given Value

```js
await directus.utils.hash.generate('My String');
```

### Verify if a Hash is Valid

```js
await directus.utils.hash.verify('My String', '$argon2i$v=19$m=4096,t=3,p=1$A5uogJh');
```

### Sort Items in a Collection

```js
await directus.utils.sort('articles', 15, 42);
```

This will move item `15` to the position of item `42`, and move everything in between one "slot" up.

### Revert to a Previous Revision

```js
await directus.utils.revert(451);
```

Note: The key passed is the primary key of the revision you'd like to apply.

---
