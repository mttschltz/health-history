<script lang="ts">
  import type {
    PersonLifestyleResponse,
    PersonRecord,
    PersonResponse,
  } from "$lib/pocketbase/generated-types";
  import { PersonLifestyleLifestyleOptions } from "$lib/pocketbase/generated-types";
  import { authModel, client, save } from "$lib/pocketbase";
  import { activityStore } from "$lib/components/Spinner.svelte";
  import { alerts } from "$lib/components/Alerts.svelte";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import { updated } from "$app/stores";

  let {
    existingLifestyleTypes,
    person,
  }: {
    existingLifestyleTypes: PersonLifestyleLifestyleOptions[];
    person: PersonResponse;
  } = $props();
  let unsavedLifestyle = $state({
    lifestyle: "",
    details: "",
    person: person.id,
  });
  const hasChanged = $derived.by(
    () => unsavedLifestyle.details !== "" || unsavedLifestyle.lifestyle !== ""
  );

  let lifestyleOptions: PersonLifestyleLifestyleOptions[] = Object.values(
    PersonLifestyleLifestyleOptions
  ).filter(
    (option) =>
      !existingLifestyleTypes.includes(option) ||
      // Always allow 'other'
      option === PersonLifestyleLifestyleOptions.other
  );

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    // TODO: Remove
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const createdLifestyle = await save<PersonLifestyleResponse>(
      "person_lifestyle",
      {
        ...unsavedLifestyle,
      }
    );
    // TODO: Pass up to parent to insert
    alerts.info("Lifestyle created.", 5000);
  }

  const store = activityStore<SubmitEvent>((e) => onsubmit(e));
</script>

<form
  class="card preset-filled-surface-100-900 border-surface-200-800 block max-w-md overflow-hidden border p-2"
  onsubmit={store.run}
>
  <div class="flex flex-col items-start gap-3">
    <select
      class="select rounded-container"
      bind:value={unsavedLifestyle.lifestyle}
      placeholder="Select lifestyle"
    >
      <option value="" disabled selected>Select lifestyle</option>
      {#each lifestyleOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
    <label class="label">
      <textarea
        class="textarea rounded-3xl"
        rows="3"
        bind:value={unsavedLifestyle.details}
        placeholder="Details of lifestyle issues"
        disabled={$store}
      ></textarea>
    </label>
    {#if client.authStore.isValid}
      <div class="self-end">
        {#if hasChanged}
          <span class="badge preset-filled-warning-500 mr-2"
            >Unsaved changes</span
          >
        {/if}
        <button
          class="btn preset-filled self-end"
          type="submit"
          disabled={$store || !hasChanged}
        >
          {#if $store}
            <ProgressRing size="size-7" />
          {:else}
            Save
          {/if}
        </button>
      </div>
    {/if}
  </div>
</form>
