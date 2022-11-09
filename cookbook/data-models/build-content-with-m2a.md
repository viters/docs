---
title: Build Content With M2A
description: This recipe demonstrates how to use an M2A relationship to build content dynamically.
image:
tags: []
skill_level:
directus_version:
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

## The Recipe

:::tip Requirements

Define the knowledge they need to implement the recipe. Define the pre-existing configurations such as collections,
roles, permssions, flows, etc. that they need to use your recipe.

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
