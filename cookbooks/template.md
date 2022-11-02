---
title: The Recipe Template
description:
  This is the recipe on how to create recipes in the Directus Cookbook. Typically, you want this description to be be a
  clear, catchy, cool, 2-4 line explanation of your recipe.
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

Recipes are how we show off a nifty configuration, integration, or use-case for Directus. What you're reading right now
is the _recipes template_. It is written using the recipe template itself. Keep following along to see how to purpose,
write, and submit new ideas to the cookbooks.

There are three key parts to to a recipe:

- **Explanation** — Explain what the recipe is for, in conceptual terms. In this section, you want to fully prep the
  user for what's to come in your recipe. The goal is that before they even begin the [How To Guide](#how-to-guide)
  below, users should have a general idea of what the recipe is, what the general steps are and whether it might be
  right for their project.
- **How To Guide** — Lays out explicit steps of the recipe. While some light explanation regarding a specific step in
  the recipe is okay here, you want to try to keep this section task-oriented.
- **Final Tips** — Final thoughts, tips, warnings, possibilities, _and beyond!_ This is your chance to tie up any
  loose-ends or answer any questions that would be harder to address in the previous two sections, when the reader isn't
  100% sure about the details of your recipe.

Let's take a look at how to get your recipe written and submitted to the docs.

:::warning Keep it Modular

The explanation should be about 1-5 paragraphs. If you feel like your explanation _needs_ to be longer, you might have
_multiple separate recipes_ on your hands, and you should separate them. Or you may be explaining things that are in the
docs, in which case you can use links.

:::

## How-To Guide

:::tip Requirements

To submit recipes, you'll need to fork the docs repo. For details, see our guide on
[running locally](contributing/running-locally.html).

:::

<!--
<video autoplay playsinline muted loop controls>
	<source src="" type="video/mp4" />
</video>
-->

### Create an Issue

If the cookbooks were filled with dozens of recipes showing how to do the exact same thing, it would be a cumbersome
developer experience. In other cases, one's recipe might actually be an "overly hacky" or side-effect riddled way to
handle something. To help avoid these two issues, follow these steps before putting fingers to the keyboard.

1. Search through the Cookbooks to see if your recipe already exists.
2. Go to the docs repo and [open an issue](https://github.com/directus/docs/issues).
3. Outline the purpose of your recipe clearly.

From here, a Directus Core team member will review and reply on the issue. We may have questions or suggestions to go
over before we greenlight the idea. Remember, we don't want to limit recipes. We just want to avoid redundant or
dangerous solutions. If you're unsure if your recipe meets the guidelines, submit an issue anyway and we'll find out if
its a viable recipe together.

### Make a PR for your Recipe

Once your issue has been approved by the Directus Core team, follow these steps.

1. Fork the [docs repo](https://github.com/directus/docs/) and pull it.
2. Copy the document you're currently reading, located at `docs/cookbooks/template.md`.
3. Paste the file and rename it under the desired recipe section.
4. Go into `docs/.vitepress/config.js` to add the sidebar links to the relevant section. For details, see the VitePress
   documentation on [sidebars](https://vitepress.vuejs.org/guide/theme-sidebar).
5. Create your recipe as desired, following the template guidelines.
6. Open a PR on the Directus [docs repo](https://github.com/directus/docs/) and reference your issue.
7. When your PR is ready, switch from `Draft` to `Ready for Review`. A Directus Core team member will look over your
   work, and if needed, provide last-minute edit requests.
8. Make final edits as requested.

If everything looks good, we'll merge your recipe!

## Final Tips

A couple key points to remember when writing recipes.

### Redundant Recipes

If your recipe is similar to another existing recipe, its probably in one of three categories:

- Its a 1:1 mapping of an existing recipe _(perhaps with different naming conventions)_.
- Its a superset or a subset of an existing recipe.
- It solves the same problem as an existing recipe, but in a different way.

In the first case, your recipe is more likely _(but not certain)_ to get rejected, however we'll still review it for
consideration. In the other two cases, your recipe may need to be modified, but its much more likely _(but not certain)_
to be accepted.

### About This Template

We created this template is to provide a clear scope and style for all recipes. This makes things easier and more
consistent for readers, contributors, and the Directus Core team.

That said.... _it is kinda nice to break the rule sometimes._

If there's a clear, distinct reason that your recipe should deviate from this template, feel free to make some
modifications. You can also tag the team member that approved your GitHub issue and share your draft before you get too
carried away. In the end, we reserve the right to ask you to re-edit your recipe to fit the template before we merge
your PR.

<!-- @TODO
### Media
Two potential strategies:
- Directus
- Continue embedding in GitHub
-->
