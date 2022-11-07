---
title: About the Cookbook
description: All about the cookbook
image:
tags: [flows, for-loops, api-requests]
skill_level: 3
directus_version: 9.x.x
one_click_cloud_install:
author: Eron Donevan Powell
# author_override:
---

# About the Cookbook

> {{$frontmatter.description}}

<HeaderBlock>
<!--
<template #title>

# About the Cookbook

</template> -->

<template #tags>

#### Tags: {{$frontmatter.tags}}

</template>

<template #skill>

#### Skill Level: {{$frontmatter.skill_level}}

</template>

<template #version>

#### Directus Version: {{$frontmatter.directus_version}}

</template>

<template #author>

#### Author: {{$frontmatter.author}}

</template>

</HeaderBlock>
