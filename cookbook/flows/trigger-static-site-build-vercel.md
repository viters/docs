---
description:
  This recipe explains how to trigger a new build of your static website (hosted at Vercel) whenever a new article is
  published.
tags: []
skill_level:
directus_version: 9.21.2
author_override:
author: Bryant Gillespie
---

# Triggering Static Site Builds with Vercel

> {{ $frontmatter.description }}

:::tip Author: {{$frontmatter.author}}

<!-- **Skill Level:** {{$frontmatter.skill_level}}\ -->

**Directus Version:** {{$frontmatter.directus_version}}

<!-- **Tags:** {{$frontmatter.tags.join(", ")}} -->

:::

## Explanation

When using Directus as a Headless CMS, it is common to pair it with a front-end framework / static site generator like
[Next.js](https://nextjs.org/), [Nuxt.js](https://nuxt.com), [SvelteKit](https://kit.svelte.dev/), or other options.

[Vercel](https://www.vercel.com/) and other similar platforms make it easy to host and deploy your site using static
site generation (SSG) to render your site’s pages during build time, instead of waiting until a certain page is
requested.

This recipe will show you how to trigger a new deployment or build for your site when new content is published or when
existing content changes.

<!-- ## Video -->
<!-- Todo -->
<!-- Need access to upload videos first -->

## How To Guide

:::tip Requirements

You’ll need to have already created a collection for your site content like `articles` or `posts` or `pages` with a
field `status` that controls the published state. You'll also need to have a Vercel account and a site already hosted
with them.

:::

### Create and Configure Your Flow

1. [Create a new Flow](/configuration/flows#create-a-flow)

   Give it a memorable name and short description like `Trigger New Site Build`.

2. [Complete the Trigger Setup](/configuration/flows/triggers#triggers)

   ![Directus Flows - Static Site Build - Trigger](/headlesscms/static-site-build-trigger.webp)

   a. Choose **Event Hook** for the trigger.

   b. For **Type**, Select Action (Non-Blocking).

   This will trigger this flow after the action (ie article updated) has already taken place.

   c. For **Scope**, choose the following:

   - `items.create`
   - `items.update`

   d. For **Collections**, choose any collections that should trigger this flow.

   In this case, we’ll use `Articles` and `Articles Translations`.

### Add an Operation to Check Status Field

> This step is optional but it is recommended to add a Condition operation to prevent un-necessary builds.

3. [Create a new Operation](/configuration/flows/operations#operations)

   ![Directus Flows - Static Site Build - Condition](/headlesscms/static-site-build-condition.webp)

   a. Name your operation, ie `Check Status`, `If Published`, or similar.

   b. Add your Condition Rules

   ```json
   {
   	"$trigger": {
   		"payload": {
   			"status": {
   				"_eq": "published"
   			}
   		}
   	}
   }
   ```

### Configure Vercel Deploy Hook

:::tip

You can learn more about Vercel Deploy Hooks on their documentation.

[https://vercel.com/docs/concepts/git/deploy-hooks](https://vercel.com/docs/concepts/git/deploy-hooks)

:::

4. Copy your Deploy Hook URL from Vercel

   a. Open your Vercel account

   b. Navigate to your site → Settings → Git → Deploy Hooks

   c. **Create a new deploy hook and copy the unique URL.**

### Add Webhook Operation to Your Flow

5. Back inside your Directus Flow, create a new Operation.

   ![Directus Flows - Static Site Build - Webhook](/headlesscms/static-site-build-webhook.webp)

   a. For the type of Operation, select **Webhook / Request URL**

   b. Change **Method** to POST

   c. Paste the Build Hook URL from Vercel into the **URL** field

   d. Save this Operation

   e. Save your Flow

### Publish Your Flow

Great job! Now whenever you update an item in the `articles` collection and the `status` is equal to `published` , your
hosting platform will automatically re-build your site.

## Final Tips

This recipe covers a basic example of triggering a static site build.

It can be used in addition to other Flows recipes to build a robust content approval and publishing workflow for your
sites and projects.

**Tips**

- Make sure to test your flow several times to ensure everything is working as expected.
- As you add other collections that are published on your static site or frontend, make sure you update this Flow to
  include those collections in your Trigger.
