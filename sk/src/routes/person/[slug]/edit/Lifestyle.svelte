<script lang="ts">
  import type {
    PersonLifestyleRecord,
    PersonLifestyleResponse,
  } from "$lib/pocketbase/generated-types";
  import { PersonLifestyleLifestyleOptions } from "$lib/pocketbase/generated-types";
  import { client, save } from "$lib/pocketbase";
  import { activityStore } from "$lib/components/Spinner.svelte";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import { alertSuccess } from "$lib/components/alert";

  let {
    lifestyle,
    writeAccess,
  }: {
    lifestyle: PersonLifestyleResponse | PersonLifestyleRecord;
    writeAccess: boolean;
  } = $props();
  let isCreate = $derived.by(() => {
    return !("id" in lifestyle);
  });
  let originalDetails = $state(lifestyle.details);
  let expandDetails = $state(!!lifestyle.details);
  const hasChanged = $derived.by(() => lifestyle.details !== originalDetails);
  let error = $state("");

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";
    // TODO: Remove
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      lifestyle = await save<PersonLifestyleResponse>(
        "person_lifestyle",
        lifestyle
      );
      originalDetails = lifestyle.details;
      expandDetails = !!lifestyle.details;
      if (isCreate) {
        alertSuccess("Lifestyle created.");
      } else {
        alertSuccess("Lifestyle updated.");
      }
    } catch {
      if (isCreate) {
        error = "Error creating lifestyle. Please try again.";
      } else {
        error = "Error saving lifestyle. Please try again.";
      }
    }
  }

  const store = activityStore<SubmitEvent>((e) => onsubmit(e));

  function lifestyleTitle(
    lifestyle: PersonLifestyleResponse | PersonLifestyleRecord
  ) {
    switch (lifestyle.lifestyle) {
      case PersonLifestyleLifestyleOptions.smoking:
        return "Smoker";
      case PersonLifestyleLifestyleOptions.alcohol:
        return "Heavy drinker";
      case PersonLifestyleLifestyleOptions.drugs:
        return "Drug use";
      case PersonLifestyleLifestyleOptions.job:
        return "Unhealthy job";
      case PersonLifestyleLifestyleOptions.weight:
        return "Weight concerns";
      case PersonLifestyleLifestyleOptions.other:
        return "Other";
    }
  }
</script>

<form
  class={`card ${isCreate ? "preset-outlined-secondary-100-900" : "preset-filled-secondary-100-900"} border-secondary-200-800 block overflow-hidden border p-2`}
  onsubmit={store.run}
>
  <div class="flex flex-col items-start gap-3">
    {#if error}
      <div>
        <span class="card preset-filled-error-100-900 p-2">{error}</span>
      </div>
    {/if}
    <div class="flex w-full items-center justify-between">
      <span class="badge preset-filled-primary-500"
        >{lifestyleTitle(lifestyle)}</span
      >
      {#if client.authStore.isValid}
        <div>
          <div class="flex items-center gap-3">
            {#if !expandDetails}
              {#if lifestyle.details}
                <button
                  class="btn"
                  type="button"
                  disabled={!writeAccess}
                  onclick={() => (expandDetails = true)}>Edit details</button
                >
              {:else}
                <button
                  class="btn italic"
                  type="button"
                  disabled={!writeAccess}
                  onclick={() => (expandDetails = true)}>Provide Details</button
                >
              {/if}
            {/if}
            {#if hasChanged}
              <span class="badge preset-filled-warning-500 mr-2"
                >Unsaved changes</span
              >
            {/if}
            {#if $store}
              <button class="btn preset-filled" type="submit" disabled={$store}>
                <ProgressRing size="size-7" />
              </button>
            {:else if isCreate}
              <button
                class="btn preset-filled"
                type="submit"
                disabled={!writeAccess || $store}
              >
                Add
              </button>
            {:else if hasChanged}
              <button class="btn preset-filled" type="submit" disabled={$store}>
                Update
              </button>
            {:else}
              <span class="pr-4 text-2xl">✅</span>
            {/if}
          </div>
        </div>
      {/if}
    </div>
    {#if expandDetails}
      <label class="label">
        <textarea
          class="textarea rounded-3xl"
          rows="3"
          value={lifestyle.details}
          oninput={(e) =>
            (lifestyle = { ...lifestyle, details: e.currentTarget.value })}
          placeholder="Details of lifestyle issues"
          disabled={!writeAccess || $store}
        ></textarea>
      </label>
    {/if}
  </div>
</form>
