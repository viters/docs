---
description:
  This recipe explains how to schedule content to be published for a future date for a statically generated site.
tags: []
skill_level:
directus_version: 9.21.2
author_override:
author: Bryant Gillespie
---

# Scheduling content for static sites

> {{ $frontmatter.description }}

:::tip Author: {{$frontmatter.author}}

<!-- **Skill Level:** {{$frontmatter.skill_level}}\ -->

**Directus Version:** {{$frontmatter.directus_version}}

<!-- **Tags:** {{$frontmatter.tags.join(", ")}} -->

:::

## Explanation

This recipe explains how to schedule content to be published on a future date for a statically generated site (SSG).

We'll be using [Flows](/configuration/flows) to publish articles when the current date matches the published date.

First we'll schedule a flow to run at regular intervals.

Next we'll check the timestamps of items with our content collection. And we'll update those the status of those items
whenever the published date is less than or equal the current timestamp.

Last, we'll kick off a new deployment of your static site at your hosting provider using one of the recipes below.

- [Triggering a static site build at Netlify](/cookbook/flows/trigger-static-site-build-netlify)
- [Triggering a static site build at Vercel](/cookbook/flows/trigger-static-site-build-vercel)

::: info Note

If your site fetches content at runtime or at the time of a page request, please
[follow the recipe for dynamic sites](/cookbook/flows/scheduling-content-dynamic-sites).

:::

<!-- ## Video -->
<!-- Todo -->
<!-- Need access to upload videos first -->

## How To Guide

:::tip Requirements

You’ll need to have already created a collection for your site content like `articles` or `posts` or `pages` with a
field `status` that controls the published state.

:::

### Add a field to control publish date and time

1. Under Settings, go to Data Model.

2. Choose your content [Collection](/configuration/data-model/collections).

3. [Add a new field](/configuration/data-model/fields.html#create-a-field-standard) to your content Collection.

   ![Scheduling Content - Data Model](/public/headlesscms/scheduling-content-publish-date.webp)

   a. Choose **Datetime** for the Type.

   b. For the Key, use something relevant like `date_published`.

   c. Save the Field and your Collection.

### Add some content and set a publish date

4. [Create or update an Item](/app/content/items) inside your Collection

   ![Scheduling Content - Update Content](/public/headlesscms/scheduling-content-create-content-scheduled.webp)

   a. Set the `status` field to `scheduled`

   b. Add a date for the `date_published` field

   c. Add the content for other fields and save the Item

### Create and configure your Flow

5. [Create a new Flow](/configuration/flows#create-a-flow)

   ![Scheduling Content - Flow Setup](/public/headlesscms/scheduling-content-flow-setup.webp)

   Give it a memorable name and short description like `Publish Scheduled Articles`.

6. [Complete the Trigger Setup](/configuration/flows/triggers#triggers)

   ![Scheduling Content - Trigger Setup](/public/headlesscms/scheduling-content-trigger.webp)

   a. For **Type**, Select [Schedule (CRON)](/configuration/flows/triggers#schedule-cron). This will trigger this flow
   at regular intervals of time.

   b. Add your **Interval** in proper CRON syntax.

   **Examples**

   - `* 1 * * * *` - Would trigger this flow every minute
   - `* 15 * * * *` – Would trigger this flow every 15 minutes

### Add an Operation to check the published date and update data

7. [Create a new Operation](/configuration/flows/operations#operations)

   ![Scheduling Content - Update Data Operation](/public/headlesscms/scheduling-content-update-articles.webp)

   a. For the type of Operation, select **Update Item**

   b. **Name** your operation, ie `Update Articles` or similar.

   c. Under **Collection**, choose your content collection ie `Articles` in our example.

   d. Check **Emit Events**

   :::warning

   Emit Events will trigger an `item.update` event in this flow. Be careful when using it in your Flows to avoid
   creating infinite loops where Flows continuously trigger one another.

   :::

   e. Set your **Payload**

   ```json
   {
   	"status": "published"
   }
   ```

   f. Add your filter rule in the **Query** field.

   ```json
   {
   	"filter": {
   		"_and": [
   			{
   				"status": {
   					"_eq": "scheduled"
   				}
   			},
   			{
   				"date_published": {
   					"_lte": "$NOW"
   				}
   			}
   		]
   	}
   }
   ```

   g. Save this Operation

   h. Save your Flow

### Trigger a new build for your static site

In this recipe, we'll terminate the flow here because we'll use a separate flow to trigger the build or deployment
process for your site. This approach helps keep everything modular and easier to maintain.

If you haven't already, you'll want to configure one of the recipes below.

- [Triggering a static site build at Netlify](/cookbook/flows/trigger-static-site-build-netlify)
- [Triggering a static site build at Vercel](/cookbook/flows/trigger-static-site-build-vercel)

We checked Emit Events in the Operation during Step 7. This will emit an `item.update` event which is a trigger for the
Flows in the recipes above.

## Final Tips

**Tips**

- Make sure to test your flow several times to ensure everything is working as expected.
- As you add other collections that are published on your static site or frontend, make sure you update this Flow to
  include those collections in your Trigger.
