---
title: Build Content With M2A
description: This recipe demonstrates how to use an M2A relationship to build content dynamically.
image:
tags: []
skill_level: Intermediate
directus_version: 9.18.1
one_click_cloud_install:
author_override:
---

# {{$frontmatter.title}}

> {{$frontmatter.description}}

:::tip Authors: [{{$frontmatter.author}}]()

**Skill Level:** {{$frontmatter.skill_level}}\
**Directus Version:** {{$frontmatter.directus_version}}\
**Tags:** {{$frontmatter.tags.join(", ")}}

:::

## Explanation

<!--
See the VitePress docs to learn about its markdown options:
https://vitepress.vuejs.org/guide/markdown
-->

Directus provides a special m2a Interface which makes it quick and easy to build data and content. This Interface is
handy whenever you have a category of content made from varying types of sub-content. To demonstrate this with a recipe,
let's imagine a personal portfolio site with three pages:

- A `Resume` page composed of:
  - `text` noting your education, work experience, and skills.
  - `user` details, such as your email, phone number, and linkedin profile.
- A `Portfolio` page composed of:
  - `text` describing work projects
  - `images` to optionally support some work projects
  - `video` to optionally support other work projects
- An `About` page composed of:
  - `text` to talk about your life, hobbies, or career goals.
  - `images` to show off your life and hobbies
  - `video` where you let your personality shine.
  - `user` details such as your headshot or even address coordinates for a map.

Despite the fact that all three pages are unique, they're made of the same basic types of content: `text`, `images`,
`video`, and `directus_user` details.

Let's look at how to implement this.

## The Recipe

:::tip Requirements

You'll need a basic understanding of [data models](/configuration/data-model.md) and
[permissions](/configuration/users-roles-permissions.md) in Directus.

:::

<video autoplay playsinline muted loop controls>
	<source src="" type="video/mp4" />
</video>

<!--
VIDEO IS OPTIONAL: delete if not needed
-->

### Create the Initial Collections

1. [create collections](/configuration/data-model/collections.md#create-a-collection) and
   [add fields](/configuration/data-model/fields.md#create-a-field-advanced) as follows:

```
text
- id
- text_content (a standard input field with a Markdown Interface)
```

```
videos
- video_url (a standard input field)
```

:::tip

In Directus, your `user` and `images` collections already exist. They are the built-in
[system collections](/configuration/data-model/collections.html#system-collections): `directus_files` and
`directus_users`.

:::

### Configure Permissions

For this here "personal portfolio" recipe, we'll want public read permissions for all our m2a content.

1. Set permissions as follows:

- `text` —

### Configure an M2A

Now we need to create a `pages` collection, which will contain our M2A relationship.

1. Create the `pages` collection.

```
pages
- id
- title (a standard input field to store the page title)
- page_content (an M2A with a content builder Interface)
```

2. [Configure the field](/configuration/data-model/fields.md#configure-a-field) `pages.page_content` so its related to:
   - `text`
   - `videos`
   - `directus_users`
   - `directus_files`

At this point, our basic configurations are done and we're ready to build content.

### Build and Display Content

1. [Create an item](/app/content/items.md#create-an-item) in the

## Final Tips
