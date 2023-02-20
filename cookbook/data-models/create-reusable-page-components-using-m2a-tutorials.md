Mapping your data model

- Creating individual page blocks
- Creating your page collection
- Building pages with blocks
- Fetching page data from the API
- Working with your front-end

---

**Create a single component for each individual page_builder collection.**

- Hero
- Gallery
- Article

---

**Create a dynamic route that does the following:**

- Imports your page builder components.
- Calls your `pages` collection via the API. Add a filter rule to match the requested page’s `slug`.
- Maps all the possible `page.pages_blocks.collection` names to your page block components.
- Loops through the `page.blocks` array and passes the correct data (props) that each page_builder component needs to
  render properly.

---

### Study the API Response

To prevent frustration when building your front-end, it’s important you understand the structure of the JSON data that
Directus returns for Many To Any (M2A) relationships.

- Complete your page builder data model inside Directus.
- Add some content.
- Test your API calls.

---

### Check Your Permissions

If you notice you aren't receiving the data that you expect,
[check the Permissions settings](/configuration/users-roles-permissions/permissions.html#permissions) for your Public or
chosen role. You'll have to enable Read access for each collection using in the Pages > Blocks Many-To-Any field.

---

### Use Typescript

We recommend adding types for each of your different collections to your frontend framework.

---

### Organize Your Data Model with Folders

Consider using [data model folders](/configuration/data-model/collections.html#create-a-folder) to keep things nicely
organized and your collections easy to find.

![Data Model Folders](/headlesscms/reusable-page-components-folders.png)

---

### Use Translations for Collection Names

When [setting up Collections](/configuration/data-model/collections.html#collection-setup) within your data model, use
the Collection Naming Translations to create names that easier for the Data Studio users to understand.

![Collection Naming Translations](/headlesscms/reusable-page-components-translations.png)

For example:

- `block_richtext` becomes `Rich Text`
- `block_hero` becomes `Hero` or `Hero Block`
- `block_cardgroup` becomes `Card Group`

---

---
