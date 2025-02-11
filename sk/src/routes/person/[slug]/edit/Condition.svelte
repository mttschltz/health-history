<script lang="ts">
  import type {
    PersonConditionRecord,
    PersonConditionResponse,
  } from "$lib/pocketbase/generated-types";
  import { PersonConditionConditionOptions } from "$lib/pocketbase/generated-types";
  import { client, save } from "$lib/pocketbase";
  import { activityStore } from "$lib/components/Spinner.svelte";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import { alertSuccess } from "$lib/components/alert";
  import { localDelay } from "$lib/network/local-delay";

  let {
    condition,
    writeAccess,
  }: {
    condition: PersonConditionResponse | PersonConditionRecord;
    writeAccess: boolean;
  } = $props();
  let isCreate = $derived.by(() => {
    return !("id" in condition);
  });
  let originalDetails = $state(condition.details);
  let expandDetails = $state(!!condition.details);
  const hasChanged = $derived.by(() => condition.details !== originalDetails);
  let error = $state("");

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";
    await localDelay();
    try {
      condition = await save<PersonConditionResponse>(
        "person_condition",
        condition
      );
      originalDetails = condition.details;
      expandDetails = !!condition.details;
      if (isCreate) {
        alertSuccess("Condition created.");
      } else {
        alertSuccess("Condition updated.");
      }
    } catch {
      if (isCreate) {
        error = "Error creating condition. Please try again.";
      } else {
        error = "Error saving condition. Please try again.";
      }
    }
  }

  const store = activityStore<SubmitEvent>((e) => onsubmit(e));

  function conditionTitle(
    condition: PersonConditionResponse | PersonConditionRecord
  ) {
    switch (condition.condition) {
      case PersonConditionConditionOptions["diabetes-type-1"]:
        return "Diabetes Type 1";
      case PersonConditionConditionOptions["diabetes-type-2"]:
        return "Diabetes Type 2";
      case PersonConditionConditionOptions["genetic-disorder"]:
        return "Genetic Disorder";
      case PersonConditionConditionOptions["heart-disease"]:
        return "Heart Disease";
      case PersonConditionConditionOptions["heart-attack"]:
        return "Heart Attack";
      case PersonConditionConditionOptions["high-blood-pressure"]:
        return "High Blood Pressure";
      case PersonConditionConditionOptions["high-cholesterol"]:
        return "High Cholesterol";
      case PersonConditionConditionOptions["mental-illness"]:
        return "Mental Health";
      case PersonConditionConditionOptions["osteoporosis"]:
        return "Osteoporosis";
      case PersonConditionConditionOptions["cancer"]:
        return "Cancer";
      case PersonConditionConditionOptions["stroke"]:
        return "Stroke";
      case PersonConditionConditionOptions["lung"]:
        return "Lung";
      case PersonConditionConditionOptions["neuro"]:
        return "Neurological";
      case PersonConditionConditionOptions["liver"]:
        return "Liver";
      case PersonConditionConditionOptions.other:
        return "Other";
      default:
        return condition.condition;
    }
  }
  function conditionHint(
    condition: PersonConditionResponse | PersonConditionRecord
  ) {
    switch (condition.condition) {
      case PersonConditionConditionOptions["genetic-disorder"]:
        return "E.g. haemophilia, Down syndrome, cystic fibrosis.";
      case PersonConditionConditionOptions["lung"]:
        return "E.g. asthma, COPD";
      case PersonConditionConditionOptions["neuro"]:
        return "E.g. Alzheimer's, dementia";
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
    <div class="flex w-full flex-col">
      <div class="flex w-full items-center justify-between">
        <span class="badge preset-filled-primary-500"
          >{conditionTitle(condition)}</span
        >
        {#if client.authStore.isValid}
          <div>
            <div class="flex items-center gap-3">
              {#if !expandDetails}
                {#if condition.details}
                  <button
                    class="btn"
                    type="button"
                    onclick={() => (expandDetails = true)}
                    disabled={!writeAccess}>Edit details</button
                  >
                {:else}
                  <button
                    class="btn italic"
                    type="button"
                    onclick={() => (expandDetails = true)}
                    disabled={!writeAccess}>Provide Details</button
                  >
                {/if}
              {/if}
              {#if hasChanged}
                <span class="badge preset-filled-warning-500 mr-2"
                  >Unsaved changes</span
                >
              {/if}
              {#if $store}
                <button
                  class="btn preset-filled"
                  type="submit"
                  disabled={$store}
                >
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
                <button
                  class="btn preset-filled"
                  type="submit"
                  disabled={$store}
                >
                  Update
                </button>
              {:else}
                <span class="pr-4 text-2xl">✅</span>
              {/if}
            </div>
          </div>
        {/if}
      </div>
      {#if conditionHint(condition)}
        <div class="pl-2 text-sm">
          {conditionHint(condition)}
        </div>
      {/if}
    </div>
    {#if expandDetails}
      <label class="label">
        <textarea
          class="textarea rounded-3xl"
          rows="3"
          value={condition.details}
          oninput={(e) =>
            (condition = { ...condition, details: e.currentTarget.value })}
          placeholder="Details of condition issues"
          disabled={!writeAccess || $store}
        ></textarea>
      </label>
    {/if}
  </div>
</form>
