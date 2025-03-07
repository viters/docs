---
description:
  A Team is an organizational system that groups Accounts together as Team Members and provides consolidated billing on
  its nested Projects.
readTime: 10 min read
---

# Cloud Teams

> A Team is an organizational system that groups Accounts together as Team Members and provides consolidated billing on
> its nested Projects.

Teams within the Cloud Dashboard allow individuals to separate or consolidate Projects and payment methods, as well as
manage Projects independently or with other Team Members.

For example, a company can use Teams to organize Projects by department, each with consolidated billing and scoped
access. Similarly, agencies or freelancers with multiple customers can create a Team per client to limit their access
and isolate billing. Teams are free, so create as many as you need to appropriately organize Team Members, Projects and
payment methods.

See the [Overview](/cloud/overview) to learn how Accounts, Teams and Projects interrelate.

## Create a Team

![Create Team](https://cdn.directus.io/docs/v9/cloud/teams/teams-20220322A/create-a-team-20220329A.webp)

To create a Team:

1. Open the Team Menu in the Dashboard Header and click **"Create a Team <span mi icon prmry>add</span>"**.\
   The Create Team page will open.
2. Enter a Team Name and Team Slug, then click **"Save"**.

:::tip Team Name and Team Slug

The Team Name is a text name assigned to a Team, used in the Cloud Dashboard. The Team slug lies within the full URL
`https://directus.cloud/TEAM-SLUG/projects`. These are purely organizational, allowing you to easily remember the Team
and link to specific Cloud Dashboards. They do not impact Cloud Projects or billing and can be
[updated at any time](#update-team-settings).

:::

## Update Team Settings

![Managing a Team](https://cdn.directus.io/docs/v9/cloud/teams/teams-20220322A/managing-a-team-20220225A.webp)

To update Team Settings:

1. Open the Team Menu in the Dashboard Header and select the desired Team.
2. Click **"Settings"** to enter the Team Settings page.
3. Toggle <span mi icon prmry>edit</span> to allow edits.
4. Edit Team Name and Team Slug as desired.
5. Click the **"Save"** button.

## View Team Activity

![View Team Activity](https://cdn.directus.io/docs/v9/cloud/teams/teams-20220322A/view-team-activity-20220322A.webp)

The Team Activity Page displays billing information changes, created and destroyed Projects, Team Members added or
removed, Team Name and Team Slug changes, and any other major Team-oriented activities. To view Team Activity:

1. Open the Team Menu in the Dashboard Header and select the desired Team.
2. Click **"Activity"**.

## View Billing Details

![View Billing Details](https://cdn.directus.io/docs/v9/cloud/teams/teams-20220322A/view-billing-details-20220322A.webp)

Follow these steps to see billing details such as credit available to Team Projects, total active subscriptions and
invoice receipts:

1. Open the Team Menu in the Dashboard Header and select the desired Team.
2. Click **"Billing"** to enter the Billing Details Page.

## Manage Billing

![Manage Billing](https://cdn.directus.io/docs/v9/cloud/teams/teams-20220322A/manage-billing-20220322A.webp)

Since our Community tier is completely free, and our Enterprise tier pricing is individually tailored based on customer
needs, this section will focus on our pay-as-you-go Standard tier. Follow the steps below to change a default payment
method, add or remove additional payment methods or change other billing details:

1. Open the Team Menu in the Dashboard Header and select the desired Team.
2. Click **"Billing"** to enter the Billing Details page.
3. Click **"Manage Billing"** to enter the Stripe payments gateway.
4. Adjust payment methods and details as needed.
5. Click **"Return to Directus Cloud"**.

### Team Billing

Teams are free to create, and they give Team Members access to the same Projects, Project invoices and payment methods.
Each Team has its own separate billing, and each Project within a Team is [calculated](#how-bills-are-calculated) and
[invoiced separately every month](#billing-cycles).

Team Members are SuperAdmins. As such, they have full access to manage billing information and payment methods,
including information provided by other Team Members. When creating Projects in an existing team, you can reuse existing
team credit card on file. Team Members should be highly trusted individuals.

All bills will first be invoiced to the default payment method. You may notice that it is possible to add additional
payment methods, and it may be a good idea to do so, as keeping multiple payment methods on file provides a fail-safe to
help make sure your Project stays running. In the event that there is an issue processing the default payment method,
the other payment methods on file will be attempted. If the bill is not paid, the Nodes will be paused, halting
web-traffic, until a successful payment is made.

::: warning

If the paused Project is never repaid, it will eventually be deleted along with all of its data and assets. For details
on unpaid Projects and refunds, see [Cloud Policies](https://directus.io/cloud-policies)

:::

:::tip Team Metered Usage

You may notice credit on top of the [Billing Page](#view-billing-details). In the _rare event_ your Team receives credit
from the Directus Team, this credit balance will decrease the amount due on the next invoice(s) until all credit is used
up. Then the default payment method will be used.

:::

:::tip Stripe Payment

To handle billing, Directus Cloud uses Stripe, a secure, industry-leading, dynamic international billing service.

:::

### Billing Cycles

Bills are invoiced on a calendar monthly basis, so each new billing period begins after exactly one month. When a
Project is destroyed, the bill is processed immediately. As mentioned in the previous section, bills are invoiced
per-Project; so if a Team has four Standard Projects, it will be charged four times each month.

### How Bills Are Calculated

Project billing is calculated based on the total number of hours that Reserved Nodes are used during the billing period.
Once the [Node Type](/cloud/glossary#nodes) is selected, this applies to all Reserved Nodes.

:::tip Node Pricing

**Standard Tier Nodes:** $0.068493 per hour with a two-node minimum ($0.136986/hr)

:::

This means the monthly prices given for Reserved Nodes, _$100/month for two nodes_, is actually an estimate based on the
cost per hour times the average length of a month (730 hours). So, the pricing shown for two nodes is
`$0.136986 x 730hrs = $100`, however the actual bill will vary slightly each month, based on the actual hours in the
month. Keep in mind that a Standard Project's nodes can be reconfigured at any time. In the end, _you simply pay for the
actual node-hours used by your Project_. For example:

**Hourly Pricing**\
A Project is configured to use two nodes. The Project runs for 3 days and 3.5 hours (75.5 hours total, rounded to 76 hours)
and is then destroyed, costing `2 Nodes @ $0.136986/hr x 76 hrs = $10.41`.

The bill will be ` $10.41` plus Tax/VAT, charged at Project destruction.

**Monthly Node Rates**\
A Project is configured to use two nodes. The Project runs the full month (730 hours). For this billing cycle, the two Reserved
Nodes will cost `2 Nodes @ $0.136986/hr x 730 hrs = $100`.

The monthly bill will be `$100` plus Tax/VAT.

**Pro-rated Changes**\
A Project begins the billing cycle configured to use two nodes. A massive traffic spike is expected from marketing activities
this month and 200 hours into the month, the Project is reconfigured to use five nodes. The first 200 hours run the bill
to `(2 Nodes @ $0.136986/hr x 200hrs) = $27.40`. Then the other 530 hours you run `(5 Nodes @ $0.342466/hr x 530hrs) = $181.51`.

The monthly bill will be `$208.91` plus VAT/Tax.

### Optimize Node Configuration

Remember: _you are never locked-in to a specific Node configuration_. As your needs change for a Project, you can
reconfigure the Node Type as well as the number of Reserved Nodes at any time. To that end, you may want to monitor
overall system traffic and make more-informed decisions on Node reconfiguration. The
[Project Monitor Page](/cloud/projects#monitor-a-project) provides performance analytics, which can be used to help
identify optimal Node configurations for your Project.

:::warning Reserved Nodes

For production-ready Projects of any kind, it is probably a good idea to have one or more than one Reserved Node. If you
do not have the processing power to handle incoming traffic spikes, this can crash your Node!

:::

## Invite Team Members

![Inviting a Team Member](https://cdn.directus.io/docs/v9/cloud/teams/teams-20220322A/inviting-a-team-member-20220225A.webp)

All Team Members can invite new Members via email. Each invitee will be emailed a link to accept the invitation and join
the Team. To invite Team Members:

1. Open the Team Menu in the Dashboard Header and select the desired Team.
2. Click **"Members"** to enter the Members Page.
3. Scroll down to the Invite New Members section.
4. Enter one or more email(s), comma separated.
5. Click **"Send Invites."**

:::tip

Clicking the emailed invitation link does not automatically create an Account for you. Invitees will need to
[create an Account](/cloud/accounts#create-account-and-login) before accepting an invitation to join a Team.

:::

## Manage Team Members

![Removing a Team member](https://cdn.directus.io/docs/v9/cloud/teams/teams-20220322A/leaving-a-team-20220225A.webp)

All Team Members have the ability to remove other Members or invites from a Team. To remove Members or leave a Team
yourself:

1. Open the Team Menu in the Dashboard Header and select the desired Team.
2. Click **"Members"** to enter the Members Page.
3. Click the <span mi icon>exit_to_app</span> or <span mi icon>close</span> button on the desired Member.
4. Click **"Confirm"**.

:::warning

If an Account leaves or is removed from a Team, it will be fully "locked out" of the Team until re-invited by another
Member.

:::

## Destroy a Team

![Destroying a Team](https://cdn.directus.io/docs/v9/cloud/teams/teams-20220322A/destroy-a-team-20220225A.webp)

To destroy a Team:

1. Open the Team Menu in the Dashboard Header and select the desired Team.
2. Click **"Settings"** to enter the Team Settings Page.
3. Scroll down to the "Destroy this Team" section.
4. Toggle <span mi icon dngr>local_fire_department</span> and an input box will appear.
5. Type the Team Name into the input box.
6. Click **"Destroy Team"**.

:::danger

Destroying a Team completely removes all its data from Directus Cloud. This action is permanent and irreversible.
Proceed with caution!

:::

:::tip Teams with Active Projects

To delete a Team, you must first delete any active Projects within it.

:::
