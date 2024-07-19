<script lang="ts">
  import type { PersonLifestyleResponse } from "$lib/pocketbase/generated-types";
  import { authModel, client, save } from "$lib/pocketbase";
  import { activityStore } from "$lib/components/Spinner.svelte";
  import { alerts } from "$lib/components/Alerts.svelte";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import { updated } from "$app/stores";

  let { lifestyle }: { lifestyle: PersonLifestyleResponse } = $props();
  let originalDetails = $state(lifestyle.details);
  let updatedDetails = $state(lifestyle.details);
  let hasChanged = $derived(() => originalDetails !== updatedDetails);

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    // TODO: Remove
    await new Promise((resolve) => setTimeout(resolve, 2000));
    lifestyle = await save<PersonLifestyleResponse>("person_lifestyle", {
      ...lifestyle,
      details: updatedDetails,
    });
    originalDetails = lifestyle.details;
    updatedDetails = lifestyle.details;
    alerts.info("Lifestyle saved.", 5000);
  }

  const store = activityStore<SubmitEvent>((e) => onsubmit(e));
</script>

<form
  class="card preset-filled-surface-100-900 border-surface-200-800 block max-w-md overflow-hidden border p-2"
  onsubmit={store.run}
>
  <div class="flex flex-col items-start gap-3">
    <span class="badge preset-filled-primary-500">{lifestyle.lifestyle}</span>
    <label class="label">
      <textarea
        class="textarea rounded-3xl"
        rows="3"
        bind:value={updatedDetails}
        placeholder="Details of lifestyle issues"
        disabled={$store}
      ></textarea>
    </label>
    {#if client.authStore.isValid}
      <button
        class="btn preset-filled self-end"
        type="submit"
        disabled={$store || !hasChanged()}
      >
        {#if $store}
          <ProgressRing size="size-7" />
        {:else}
          Update
        {/if}
      </button>
    {/if}
  </div>
</form>
