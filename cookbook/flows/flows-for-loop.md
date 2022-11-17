---
title: Flows For-Loop
description:
  When most flows begin, they pass the trigger's payload to the data chain, then execute one time. Here's how to execute
  a flow once for each element in a payload's array.
tags: ['for-loops']
skill_level:
directus_version:
author_override:
author: Eron Powell
---

# {{$frontmatter.title}}

> {{ $frontmatter.description }}

:::tip Author: {{$frontmatter.author}}

**Skill Level:** {{$frontmatter.skill_level}}\
**Directus Version:** {{$frontmatter.directus_version}}\
**Tags:** {{$frontmatter.tags.join(", ")}}

:::

## Explanation

<!--
See the VitePress docs to learn about its markdown options:
https://vitepress.vuejs.org/guide/markdown
-->

Sometimes you may have an array of data you'd like to iterate over and run operations on, one-by-one. However, you may
have noticed that each operation in a flow executes just one time. Because of this, you can't create a "for-loop" within
a flow's operations.

However, to achieve a "for-loop", you can instead use the
[trigger flow](/configuration/flows/operations.md#trigger-flow) operation to pass the data into an
[another flow](/configuration/flows/triggers.md#another-flow) trigger. When this type of trigger receives an array as a
Payload, the flow runs for each item in the array individually.

## The Recipe

:::tip Requirements

You'll need a flow that contains an array of data. Please also read the documentation on the
[trigger flow](/configuration/flows/operations.md#trigger-flow) operation as well as the
[another flow](/configuration/flows/triggers.md#another-flow) trigger.

:::

<video autoplay playsinline muted loop controls>
	<source src="" type="video/mp4" />
</video>

<!--
VIDEO IS OPTIONAL: delete if not needed
-->

### Configure the Starting Flow

1. To begin you'll need an array of data on your data chain.
2. Add a [trigger flow](/configuration/flows/operations.md#trigger-flow) operation.
3. Under **Payload**, be sure to add the desired array.
4. Save and exit the flow.

### Configure the "For-Loop" Flow

Once your starting flow is configured as desired, follow these steps.

1. [Create a flow](/configuration/flows.md#create-a-flow) using the
   [another flow](/configuration/flows/triggers.md#another-flow) trigger.
2. [Configure operations](/configuration/flows.md#configure-an-operation) as desired.

## Final Tips

Once your for-loop is configured, you can process the data several ways.

First, you could let the "for-loop" flow process each element in the **Payload**, without returning them.

Second, you could also configure a **Response Body** in the trigger of your "for-loop" flow. When you do this, the
**Response Body** you defined is pushed to a new array. After the flow runs on each element, the new array is appended
under the [trigger flow](/configuration/flows/operations.md#trigger-flow) operation in the starting flow.

Third, you could continue to use the [trigger flow](/configuration/flows/operations.md#trigger-flow) operation and the
[another flow](/configuration/flows/triggers.md#another-flow) trigger to chain even more flows together.
