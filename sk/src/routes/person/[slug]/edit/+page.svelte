<script lang="ts">
  import { alerts } from "$lib/components/Alerts.svelte";
  import { activityStore } from "$lib/components/Spinner.svelte";
  import { client, save, authModel } from "$lib/pocketbase";
  import {
    type PersonResponse,
    type PersonLifestyleResponse,
    PersonLifestyleLifestyleOptions,
    type PersonLifestyleRecord,
    PersonConditionConditionOptions,
    type PersonConditionRecord,
    type PersonConditionResponse,
  } from "$lib/pocketbase/generated-types.js";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import deepEq from "fast-deep-equal";
  import Lifestyle from "./Lifestyle.svelte";
  import Condition from "./Condition.svelte";

  const writeAccess = $derived(!!$authModel?.writeAccess);

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

  // Conditions
  const heartConditions = [
    PersonConditionConditionOptions["heart-attack"],
    PersonConditionConditionOptions["heart-disease"],
    PersonConditionConditionOptions["high-blood-pressure"],
    PersonConditionConditionOptions["high-cholesterol"],
    PersonConditionConditionOptions["stroke"],
  ];
  const commonConditions = [
    PersonConditionConditionOptions["diabetes-type-1"],
    PersonConditionConditionOptions["diabetes-type-2"],
    PersonConditionConditionOptions["cancer"],
    PersonConditionConditionOptions["mental-illness"],
    PersonConditionConditionOptions["neuro"],
    PersonConditionConditionOptions["osteoporosis"],
  ];
  const lessCommonConditions = [
    PersonConditionConditionOptions["genetic-disorder"],
    PersonConditionConditionOptions["liver"],
    PersonConditionConditionOptions["lung"],
  ];
  const existingConditions = $state(data.conditions);
  const groupHeart: (PersonConditionRecord | PersonConditionResponse)[] =
    $derived.by(() => {
      return heartConditions.map((t) => {
        const existing = existingConditions.find((c) => c.condition === t);
        if (existing) {
          return existing;
        } else {
          return {
            condition: t,
            person: person.id,
          } satisfies PersonConditionRecord;
        }
      });
    });

  const groupCommon: (PersonConditionRecord | PersonConditionResponse)[] =
    $derived.by(() => {
      return commonConditions.map((t) => {
        const existing = existingConditions.find((c) => c.condition === t);
        if (existing) {
          return existing;
        } else {
          return {
            condition: t,
            person: person.id,
          } satisfies PersonConditionRecord;
        }
      });
    });

  const groupLessCommon: (PersonConditionRecord | PersonConditionResponse)[] =
    $derived.by(() => {
      return lessCommonConditions.map((t) => {
        const existing = existingConditions.find((c) => c.condition === t);
        if (existing) {
          return existing;
        } else {
          return {
            condition: t,
            person: person.id,
          } satisfies PersonConditionRecord;
        }
      });
    });

  const groupExtras: (PersonConditionRecord | PersonConditionResponse)[] =
    $derived.by(() => {
      const extraConditions: (
        | PersonConditionRecord
        | PersonConditionResponse
      )[] = [];

      // Collect conditions for types that are not in groups
      let allConditionTypes: PersonConditionConditionOptions[] = Object.values(
        PersonConditionConditionOptions
      ).filter(
        (option) =>
          option !== PersonConditionConditionOptions.other &&
          option !== PersonConditionConditionOptions["birth-defect"] &&
          option !== PersonConditionConditionOptions["stillbirth-miscarriage"]
      );
      let ungroupedConditionTypes = allConditionTypes.filter(
        (t) =>
          !heartConditions.includes(t) &&
          !commonConditions.includes(t) &&
          !lessCommonConditions.includes(t)
      );
      const ungroupedConditions = ungroupedConditionTypes.map((t) => {
        const existing = existingConditions.find((c) => c.condition === t);
        if (existing) {
          return existing;
        } else {
          return {
            condition: t,
            person: person.id,
          } satisfies PersonConditionRecord;
        }
      });
      extraConditions.push(...ungroupedConditions);

      // Collect conditions that no longer have a type (i.e. we've removed it
      // from the collection but rows with the value still exist).
      let removedExistingConditions = existingConditions.filter(
        (c) =>
          !allConditionTypes.includes(c.condition) &&
          c.condition !== PersonConditionConditionOptions.other
      );
      extraConditions.push(...removedExistingConditions);

      // Put existing 'other' conditions at the end
      const otherConditions = existingConditions.filter(
        (c) => c.condition === PersonConditionConditionOptions.other
      );
      extraConditions.push(...otherConditions);

      // Add a new 'other' condition at the very end
      extraConditions.push({
        condition: PersonConditionConditionOptions.other,
        person: person.id,
      } satisfies PersonConditionRecord);

      return extraConditions;
    });
</script>

<h1 class="h1">{data.title}</h1>
<h2 class="h3 mt-8">General Details</h2>
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
      disabled={!writeAccess || $store}
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
      disabled={!writeAccess || $store}
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
      disabled={!writeAccess || $store}
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
      disabled={!writeAccess || $store}
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

<h2 class="h3 mt-8">Lifestyle</h2>
<div class="flex flex-col gap-2">
  {#each lifestyles as lifestyle ("id" in lifestyle ? lifestyle.id : lifestyle.lifestyle)}
    <Lifestyle {lifestyle} {writeAccess} />
  {/each}
</div>

<h2 class="h3 mt-8">Conditions</h2>
<div class="flex flex-col gap-2">
  <h3 class="h4 mt-2">Heart, Cardiovascular</h3>
  {#each groupHeart as condition ("id" in condition ? condition.id : condition.condition)}
    <Condition {condition} {writeAccess} />
  {/each}
  <h3 class="h4 mt-4">Common</h3>
  {#each groupCommon as condition ("id" in condition ? condition.id : condition.condition)}
    <Condition {condition} {writeAccess} />
  {/each}
  <h3 class="h4 mt-4">Other</h3>
  {#each groupLessCommon as condition ("id" in condition ? condition.id : condition.condition)}
    <Condition {condition} {writeAccess} />
  {/each}
  {#each groupExtras as condition ("id" in condition ? condition.id : condition.condition)}
    <Condition {condition} {writeAccess} />
  {/each}
</div>
