---
title: Create a Content Hierarchy with Tree View
description:
tags: []
skill_level:
directus_version:
one_click_cloud_install:
author_override:
---

# {{$frontmatter.title}}

> {{ $frontmatter.description }}

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

In site navigation, documentation, and many other cases, it is common to have a hierarchy of content or data. That is: a
parent item, with child items.

![Parent Child Hierarchy](image.webp)

If you're working with markdown files or an SSG, content hierarchies are created easily with files and folders.

If your content is in a database, you can create a hierarchy of nested items with a recursive o2m relationship.

In Directus, there is a special o2m alias field called Tree View, which lets us create this type of recursive
relationship. For this recipe, we will create a super simple documentation hierarchy. Here's the general outline:

- Use Tree View to create a recursive relationship in a collection called `docs`.
- Add `parent` <-> `child` items to the collection, using that recursive relationship.
- Give the Public role read permissions on `docs` , so users can access them.

After that, we'll point out some following steps you may wish to take to make your content hierarchy easier to work with
in a frontend.

## The Recipe

:::tip Requirements

You'll need to be familiar with [Permissions](/configuration/users-roles-permissions.md).

:::

<!-- <video autoplay playsinline muted loop controls>
	<source src="" type="video/mp4" />
</video> -->

<!--
VIDEO IS OPTIONAL: delete if not needed
-->

1. [Create a collection](/configuration/data-model/collections.md#create-a-collection) and
   [add fields](/configuration/data-model/fields.md#create-a-field-standard) as follows:

```
docs
- id
- title (a STRING input field. Used to represent the item in the hierarchy)
- parent_id (a foreign key field to hold menu.id, creates the m2o)
- children (a Tree View o2m alias field, related to docs, with parent_id as the foreign key, and o2m Interface)
- sort (optional: an INTEGER input field. We can use this to custom sort item order)
- content (optional: a text input field with a Markdown interface)
```

2. Configure public [read permissions](/configuration/users-roles-permissions/permissions.md#configure-permissions) for
   the `docs` collection.

3. Create nested items on the `docs` collection as desired.

   To create top-level parent items, [create an item](/app/content/items.md#create-an-item) as usual.\
   To create a nested child, [edit the parent item](/app/content/items.md#edit-an-item) and click **Create New** or **Add
   Existing**.\
   For this recipe, we created the following items, for demo purposes.

   - `App Overview`
   - `Configuration`
     - `Flows`
     - `Data Model`
       - `Collections`
       - `Fields`

4. Optional: [manually sort items](/app/content/collections.md#manually-sort-items) into desired order.

## Final Tips

Now that your nested content is created, you'll need to access it. There are two key points to consider.

### Fetch Nested Data

With a basic `get items` api call, such as `your-project.app/items/docs/`, your data will return flat, not nested. In
other words, it will produce:

:::details

```
"data": ["flat data goes here."]
```

:::

To fix this, you could write an algorithm that iterates through each item in the data array and re-nests it. But that's
a bit of a hassle. Instead, we can add parameters on the Directus API call to nest it for us.

<!--
[Directus API](/reference/items.md)
[query parameters](/reference/query.md)
-->

- fields
- filter
- deep

### Create Relative Paths

Nested content by itself is nice, but it would be helpful if we could create a path for each item, to use in frontend
navigation. One way to do this is to use [flows](/configuration/flows.md) to create a path dynamically. To do this,
you'd need to:

- add a `path` field to the `docs` collection and configure it so edits are turned off on the item detail page.
- [configure a flow](/configuration/flows.md#configure-a-flow) with an `Event Hook` trigger, which runs on
  `items.create` and `items.update` for the `docs` collection.
- add operations to the flow to read the parent's path of the item presently being created or updated, append the
  present item's name, write the new path into the present item's `path` field value, then finally update the paths of
  its children _(if it has any children)_.

:::tip

In this recipe, for the sake simplicity, we created a `content` field directly in the `docs` collection, but you could
just as easily use a relational link to another collection of content or even to markdown files.

:::
