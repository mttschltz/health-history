<script lang="ts">
  import ImgModal from "$lib/pocketbase/ImgModal.svelte";
  import { client } from "$lib/pocketbase/index.js";
  import { base } from "$app/paths";
  import { PersonSexOptions } from "$lib/pocketbase/generated-types";

  const { data } = $props();
  const person = $derived(data.person);
  const birthMother = $derived(person.expand?.birthMother);
  const birthFather = $derived(person.expand?.birthFather);
  const siblings = $derived(data.siblings);
  $effect(() => {
    data.metadata.title =
      data.metadata.headline = `${person.fullName}'s family`;
  });
</script>

<article>
  <a href={`${base}/person/${person.id}/edit`} class="btn preset-filled">
    Update health history
  </a>

  <h2 class="h2">Parents</h2>
  <div class="flex flex-row items-center gap-3">
    <div class="basis-24">Mother</div>
    {#if birthMother}
      <div>
        <a href={`${base}/person/${birthMother.id}`} class="btn preset-tonal"
          >{birthMother.fullName}</a
        >
      </div>
    {:else}
      <p>Unknown</p>
    {/if}
  </div>
  <div class="flex flex-row items-center gap-3">
    <div class="basis-24">Father</div>
    {#if birthFather}
      <div>
        <a href={`${base}/person/${birthFather.id}`} class="btn preset-tonal"
          >{birthFather.fullName}</a
        >
      </div>
    {:else}
      <p>Unknown</p>
    {/if}
    <!-- <pre class="body">{record.body}</pre> -->
    <!-- {#each record.files ?? [] as file, index} -->
    <!-- {@const src = client.files.getUrl(record, file)} -->
    <!-- {@const title = `image ${index + 1} for: ${record.title}`} -->
    <!-- <img {src} alt={title} {title} /> -->
    <!-- <ImgModal {record} filename={file} /> -->
    <!-- {/each} -->
  </div>
  <div>
    <h2 class="h2">Siblings</h2>
    {#each siblings as sibling}
      <div class="flex flex-row items-center gap-3">
        {#if sibling.Sex === PersonSexOptions.Male}
          <div class="basis-24">Brother</div>
        {:else if sibling.Sex === PersonSexOptions.Female}
          <div class="basis-24">Sister</div>
        {:else}
          <div class="basis-24">Sibling</div>
        {/if}
        <div>
          <a href={`${base}/person/${sibling.id}`} class="btn preset-tonal"
            >{sibling.fullName}</a
          >
        </div>
      </div>
    {/each}
  </div>
</article>
