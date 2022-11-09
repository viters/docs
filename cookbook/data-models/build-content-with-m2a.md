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

Directus provides a special m2a Interface which makes it quick and easy to build data and content

The M2A content builder Interface is handy whenever you have a category of content composed of multiple types of
sub-content in a non-uniform way. To demonstrate this in our recipe, lets imagine a personal portfolio site with three
pages:

- a `Resume` page composed of:
  - `text` noting your education, work experience, and skills.
  - `user` details, such as your email, phone number, and linkedin profile.
- a `Portfolio` page composed of:
  - `text` describing work projects
  - `images` to optionally support some work projects
  - `video` to optionally support other work projects
- an `About` page composed of:
  - `text` to talk about your life, hobbies, or career goals.
  - `images` to show off your life and hobbies
  - `video` something with you speaking, to let your personality shine.
  - `user` details such as your headshot or even address coordinates for a map.

Though all three pages are unique in purpose, length, and structure, but they're all composed of the same basic
sub-components:

- `text`
- `images`
- `video`
- `user`

## The Recipe

:::tip Requirements

Define the knowledge they need to implement the recipe. Define the pre-existing configurations such as collections,
roles, permissions, flows, etc. that they need to use your recipe.

:::

<video autoplay playsinline muted loop controls>
	<source src="" type="video/mp4" />
</video>

<!--
VIDEO IS OPTIONAL: delete if not needed
-->

### Create your Collections

1. Create your collections.
   - `title`
   - `images`
   - `videos (a URL field)`
   - `text_content`
2. Create an M2A relationship.

### Configure Permissions

You'll need to be sure each collection has access permissions. In our case, we want public read permissions for our m2a
content.

### Configure an M2A

- create m2a
- add collections
- other configurations

## Final Tips
