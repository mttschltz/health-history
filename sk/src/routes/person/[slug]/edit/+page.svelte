<script lang="ts">
  import { alerts } from "$lib/components/Alerts.svelte";
  import FileInput from "$lib/components/FileInput.svelte";
  import Spinner, { activityStore } from "$lib/components/Spinner.svelte";
  import { authModel, client, save } from "$lib/pocketbase";
  import FileField from "$lib/pocketbase/FileField.svelte";
  import type {
    PostsResponse,
    PersonResponse,
    PersonLifestyleResponse,
  } from "$lib/pocketbase/generated-types.js";
  import z from "zod";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import Lifestyle from "./Lifestyle.svelte";
  import NewLifestyle from "./NewLifestyle.svelte";
  import deepEq from "fast-deep-equal";

  const { data } = $props();

  // Person
  let person = $state(data.person);
  let originalPerson = $state(data.person);
  let hasChanged = $derived.by(function () {
    return !deepEq(person, originalPerson);
  });

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    person = await save<PersonResponse<PersonExpand>>("person", {
      ...person,
    });
    originalPerson = person;
    alerts.info("Post saved.", 5000);
    history.back();
  }

  const store = activityStore<SubmitEvent>((e) => onsubmit(e));

  // Lifestyles
  const lifestyles = $state(data.lifestyles);
  const lifestyleTypes = $derived.by(() => lifestyles.map((l) => l.lifestyle));
  let showNewLifestyle = $state(false);

  function addLifestyle(lifestyle: PersonLifestyleResponse) {
    lifestyles.push(lifestyle);
    showNewLifestyle = false;
  }
</script>

<h2 class="h2 mt-8">General Details</h2>
<form onsubmit={store.run} class="flex flex-col space-y-4">
  <label class="label">
    <span>Year of Birth</span>
    <input
      type="number"
      class="input"
      value={person.birthYear}
      oninput={(e) =>
        (person = {
          ...person,
          birthYear: parseInt(e.currentTarget.value, 10),
        })}
    />
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
    <div class="self-end">
      {#if hasChanged}
        <span class="badge preset-filled-warning-500 mr-2">Unsaved changes</span
        >
      {/if}
      <button class="btn preset-filled" type="submit" disabled={!hasChanged}>
        {#if $store}
          <ProgressRing size="size-7" />
        {:else}
          Save
        {/if}
      </button>
    </div>
  {:else}
    <div class="card preset-filled-warning-100-900 p-4 text-center">
      <p>Login to Update</p>
    </div>
  {/if}
</form>

<h2 class="h2 mt-8">Lifestyle</h2>
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

{#if !showNewLifestyle}
  <button
    type="button"
    class="btn preset-outlined mt-2"
    onclick={() => (showNewLifestyle = true)}
  >
    <span>Add lifestyle</span>
    <span>&rarr;</span>
  </button>
{/if}

{#if showNewLifestyle}
  <div class="mt-2">
    <NewLifestyle
      existingLifestyleTypes={lifestyleTypes}
      {person}
      {addLifestyle}
    />
  </div>
{/if}

<!-- TODO: Don't allow editing of the 'type', only details -->
<!-- TODO: Allow creating a new one -->

<h2 class="h2 mt-8">Conditions</h2>
