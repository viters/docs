---
description: Workflows are a way to add structured stages to the flow of content authoring.
readTime:
---

# Workflows

> Workflows are a way to add structured stages to the flow of content authoring. This enables one to do things like pass
> off work in progress between multiple roles, create multi-signature approvals, build decision trees, _and beyond!_

A workflow is defined with custom access permissions. Basically, you configure each role's custom access permissions on
some collection(s), defining what they can and can't have access to, so that the each role's CRUDS permissions change at
each stage in the workflow. There are an infinite number of possible workflows you could configure. However, to give an
example, we will configure a simple workflow where writers and editors will work together to publish articles.

<!--
Four key parts:
- roles
- custom access permissions
- collection
- field value
 -->

![A Workflow](https://cdn.directus.io/docs/v9/configuration/users-roles-permissions/workflows-20220909/workflows-20220909B.webp)

Our workflow will have three stages, `draft`, `under review`, and `published`, which will be defined in a `status`
field.

| `Draft`                                                                   | `Under Review`                                                                       | `Published`                                                                                      |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Author creates article as `draft`. Then changes status to `under review`. | Author and editor co-edit the article, then change status to `published` when ready. | Editor is now responsible for all future updates to article. Author no longer has update access. |

The whole workflow is managed with custom access permissions. The `author` and `editor` access permissions to the
`articles` collection change conditionally, based on the value of `status`.

![A Workflow](https://cdn.directus.io/docs/v9/configuration/users-roles-permissions/workflows-20220909/workflows-20220909A.webp)

To create a structured workflow for `articles`, follow these steps.

1. First, [create a field](/configuration/data-model/fields.md#create-a-field-standard) to track the article status.
   We'll call this field `status`, but it could be named anything.
2. [Create a field](/configuration/data-model/fields.md#create-a-field-advanced) with a Dropdown Interface. Name it
   `status` and add the stages _(`draft`, `under review` and `published`)_ needed for your content creation process.
3. Next, [create two roles](/configuration/users-roles-permissions/roles.md#create-a-role): `author` and `editor`.
4. Finally, configure
   [custom access permissions](/configuration/users-roles-permissions/permissions.md#configure-custom-permissions) for
   each role based on the value of the `status` field.
   - For the `author` role:
     - Set a filter under **Create > Use Custom > Field Validation** to ensure the author can only create articles with
       a `draft` status.
     - Enable all read permissions.
     - Set a filter under **Update > Use Custom > Item Permissions** to ensure the user can update articles with a
       `draft` or `under review` status.
     - Set a filter under **Update > Use Custom > Field Validation** to ensure the user can only update article status
       to `under review`.
     - Keep delete permissions restricted.
     - Keep shares permissions restricted.
   - For the `editor` role:
     - Keep create permissions restricted.
     - Enable all read permissions.
     - Set a filter under **Update > Use Custom > Item Permissions** to ensure the user can only update articles with an
       `under review` status.
     - Set a filter under **Update > Use Custom > Field Validation** to ensure the user can only update status to
       `published`.
     - Keep delete permissions restricted.
     - Keep shares permissions restricted.

Remember, this is one simple example. You could use any collection or even multiple relationally linked collections, set
more custom access permissions, add more roles, add more stages in your workflow, _and beyond!_

:::tip

Workflows can be further enhanced with custom [Interfaces](/extensions/interfaces.md) as well as
[flows](/configuration/flows.md).

:::
