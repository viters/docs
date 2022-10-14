## Choose your API

<Reference v-slot="btn" :btnType="`api`">

:::tip

aloha

:::

<div v-if="btn.pref.api == 'REST'">

```
REST
```

</div>

<div v-if="btn.pref.api == 'GraphQL'">

```
GraphQL
```

</div>

<div v-if="btn.pref.api == 'SDK'">

```
SDK
```

</div>

<div v-if="btn.pref.api == 'CLI'">

```
CLI
```

</div>

</Reference>

## Choose your Stack

<Reference v-slot="btn" :btnType="`stack`">

:::tip

aloha

:::

<div v-if="btn.pref.stack == 'JAM'">

```
JAM
```

</div>

<div v-if="btn.pref.stack == 'MEAN'">

```
MEAN
```

</div>

<div v-if="btn.pref.stack == 'MERN'">

```
MERN
```

</div>

<div v-if="btn.pref.stack == 'LAMP'">

```
LAMP
```

</div>

</Reference>
