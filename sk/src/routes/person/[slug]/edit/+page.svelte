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

  const { data } = $props();
  let person = $state(data.person);
  // let fileInput = $state() as HTMLInputElement;
  // let toBeRemoved = $state([]);
  // $effect(() => {
  //   data.metadata.title = data.metadata.headline = `Edit Post: ${person.title}`;
  // });

  // const schema = z.object({
  //   id: z.string().optional().describe("ID"),
  //   title: z.string().trim().min(1, "value required.").describe("Title"),
  //   slug: z
  //     .string()
  //     .trim()
  //     .min(1, "required.")
  //     .refine((s: string) => !s.startsWith("/"), "must not start with a slash.")
  //     .describe("Slug"),
  //   body: z.string().trim().min(1, "required.").describe("Body"),
  // });

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    // const { success, error, data } = schema.safeParse(person);
    // if (success) {
    //   const files = fileInput?.files;
    //   const user = client.authStore.isAdmin ? "" : $authModel?.id;
    person = await save<PersonResponse<PersonExpand>>("person", {
      ...person,
      // files,
      // user,
      // "files-": toBeRemoved,
    });
    alerts.info("Post saved.", 5000);
    history.back();
    // } else {
    //   Object.entries(error.flatten().fieldErrors).forEach(([k, v]) =>
    //     alerts.error(`${k}: ${v}`)
    //   );
    // }
  }
  const store = activityStore<SubmitEvent>((e) => onsubmit(e));
</script>

<form onsubmit={store.run} class="space-y-4">
  <output>ID: {person.id ?? "-"}</output>
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
  <!-- <div data-label="files">
      <FileInput bind:fileInput pasteFile={true} multiple={true} />
    </div> -->
  <!-- <FileField record={person} fieldName="files" bind:toBeRemoved /> -->
  <!-- <div data-label="body">
    <textarea
      bind:value={person.lifestyleIssueDetails}
      placeholder="Details of lifestyle issues"
    ></textarea>
  </div> -->
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
