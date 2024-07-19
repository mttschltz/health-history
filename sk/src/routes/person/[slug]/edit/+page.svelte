<script lang="ts">
  import { alerts } from "$lib/components/Alerts.svelte";
  import FileInput from "$lib/components/FileInput.svelte";
  import Spinner, { activityStore } from "$lib/components/Spinner.svelte";
  import { authModel, client, save } from "$lib/pocketbase";
  import FileField from "$lib/pocketbase/FileField.svelte";
  import type {
    PostsResponse,
    PersonResponse,
  } from "$lib/pocketbase/generated-types.js";
  import z from "zod";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import Lifestyle from "./Lifestyle.svelte";
  import NewLifestyle from "./NewLifestyle.svelte";

  const { data } = $props();
  let person = $state(data.person);
  const lifestyles = $state(data.lifestyles);
  const lifestyleTypes = $derived.by(() => lifestyles.map((l) => l.lifestyle));

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    person = await save<PersonResponse<PersonExpand>>("person", {
      ...person,
    });
    alerts.info("Post saved.", 5000);
    history.back();
  }
  const store = activityStore<SubmitEvent>((e) => onsubmit(e));
</script>

<h2 class="h2">General Details</h2>
<form onsubmit={store.run} class="space-y-4">
  <label class="label">
    <span>Year of Birth</span>
    <input type="text" class="input" bind:value={person.birthYear} />
  </label>
  <label class="label">
    <span>Year of Death</span>
    <input type="text" class="input" bind:value={person.deathYear} />
  </label>
  <label class="label">
    <span>Age at Death</span>
    <input type="text" class="input" bind:value={person.deathAge} />
  </label>
  <label class="label">
    <span>Ethnicity</span>
    <input type="text" class="input" bind:value={person.ethnicity} />
  </label>
  {#if client.authStore.isValid}
    <button class="btn preset-filled" type="submit">
      {#if $store}
        <ProgressRing size="size-7" />
      {:else}
        Save
      {/if}
    </button>
  {:else}
    <div class="card preset-filled-warning-100-900 p-4 text-center">
      <p>Login to Update</p>
    </div>
  {/if}
</form>

<h2 class="h2">Lifestyle</h2>
<!-- TODO: List existing lifestyle issues -->
{#if lifestyles.length > 0}
  <div class="flex flex-col gap-2">
    {#each lifestyles as lifestyle (lifestyle.id)}
      <Lifestyle {lifestyle} />
    {/each}
  </div>
{:else}
  <p>No lifestyle entries found.</p>
{/if}
<button type="button" class="btn preset-outlined mt-2">
  <span>Add lifestyle</span>
  <span>&rarr;</span>
</button>
<NewLifestyle existingLifestyleTypes={lifestyleTypes} {person} />

<!-- TODO: Don't allow editing of the 'type', only details -->
<!-- TODO: Allow creating a new one -->

<h2 class="h2">Conditions</h2>
