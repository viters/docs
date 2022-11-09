---
title: Configure User Registration
description: This recipes explains how to enable new users to self-register their own account in Directus.
image:
tags: []
skill_level:
directus_version:
one_click_cloud_install:
author_override:
---

# {{$frontmatter.title}}

> {{ $frontmatter.description }}

## Explanation

<!--
See the VitePress docs to learn about its markdown options:
https://vitepress.vuejs.org/guide/markdown
-->

## The Recipe

:::tip Requirements

:::

<video autoplay playsinline muted loop controls>
	<source src="" type="video/mp4" />
</video>

<!--
VIDEO IS OPTIONAL: delete if not needed
-->

### Public Permissions

- Public
  - Gets create permissions for users collection
  - Custom Access Permissions: Public must create users with username, password, etc...

Here, you may need to add some details about the expected result before moving on to Part 2 (if you have a part 2).

### New User Permissions

- New User
  - users: custom update permissions on $CURRENT_USER so user can change name and password.
  - Set permissions for other collections
    - show one collection, using custom access permissions
    - Repeat as desired

## Final Tips
