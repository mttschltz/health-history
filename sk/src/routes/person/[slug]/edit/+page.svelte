<script lang="ts">
  import { alerts } from "$lib/components/Alerts.svelte";
  import { activityStore } from "$lib/components/Spinner.svelte";
  import { client, save } from "$lib/pocketbase";
  import {
    type PersonResponse,
    type PersonLifestyleResponse,
    PersonLifestyleLifestyleOptions,
    type PersonLifestyleRecord,
  } from "$lib/pocketbase/generated-types.js";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import deepEq from "fast-deep-equal";
  import NewLifeStyle from "./NewLifeStyle.svelte";

  const { data } = $props();

  // Person
  let person = $state(data.person);
  let originalPerson = $state(data.person);
  let hasChanged = $derived.by(function () {
    return !deepEq(person, originalPerson);
  });
  let error = $state("");

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";
    // TODO: Remove
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      person = await save<PersonResponse<PersonExpand>>("person", {
        ...person,
      });
      originalPerson = person;
      alerts.info("Details saved.", 5000);
    } catch {
      error = "Error saving details. Please try again.";
    }
  }

  const store = activityStore<SubmitEvent>((e) => onsubmit(e));

  // Lifestyles
  const existingLifestyles = $state(data.lifestyles);
  let lifestyleTypes: PersonLifestyleLifestyleOptions[] = Object.values(
    PersonLifestyleLifestyleOptions
  ).filter((option) => option !== PersonLifestyleLifestyleOptions.other);
  const lifestyles: (PersonLifestyleResponse | PersonLifestyleRecord)[] =
    $derived.by(() => {
      // For each possible lifestyle type (except 'other'), either get the
      // existing lifestyle or create an empty record.
      const values = lifestyleTypes.map((o) => {
        const existing = existingLifestyles.find((l) => l.lifestyle === o);
        if (existing) {
          return existing;
        } else {
          return {
            lifestyle: o,
            person: person.id,
          } satisfies PersonLifestyleRecord;
        }
      });

      // Add existing 'other' lifestyles
      const otherLifestyles = existingLifestyles.filter(
        (l) => l.lifestyle === PersonLifestyleLifestyleOptions.other
      );
      values.push(...otherLifestyles);

      // Add a new 'other' lifestyle
      values.push({
        lifestyle: PersonLifestyleLifestyleOptions.other,
        person: person.id,
      } satisfies PersonLifestyleRecord);
      return values;
    });
  let showNewLifestyle = $state(false);
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
    <input
      type="number"
      class="input"
      value={person.deathYear}
      oninput={(e) =>
        (person = {
          ...person,
          deathYear: parseInt(e.currentTarget.value, 10),
        })}
    />
  </label>
  <label class="label">
    <span>Age at Death</span>
    <input
      type="number"
      class="input"
      value={person.deathAge}
      oninput={(e) =>
        (person = {
          ...person,
          deathAge: parseInt(e.currentTarget.value, 10),
        })}
    />
  </label>
  <label class="label">
    <span>Ethnicity</span>
    <input
      type="text"
      class="input"
      value={person.ethnicity}
      oninput={(e) =>
        (person = {
          ...person,
          ethnicity: e.currentTarget.value,
        })}
    />
  </label>
  {#if error}
    <div>
      <span class="card preset-filled-error-100-900 p-2">{error}</span>
    </div>
  {/if}
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
<div class="flex flex-col gap-2">
  {#each lifestyles as lifestyle ("id" in lifestyle ? lifestyle.id : lifestyle.lifestyle)}
    <NewLifeStyle {lifestyle} />
  {/each}
</div>

<h2 class="h2 mt-8">Conditions</h2>
