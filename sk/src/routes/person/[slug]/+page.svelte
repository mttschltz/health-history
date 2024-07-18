<script lang="ts">
  import ImgModal from "$lib/pocketbase/ImgModal.svelte";
  import { client } from "$lib/pocketbase/index.js";
  import { base } from "$app/paths";

  const { data } = $props();
  const record = $derived(data.record);
  const birthMother = $derived(record.expand?.birthMother);
  const birthFather = $derived(record.expand?.birthFather);
  $effect(() => {
    data.metadata.title =
      data.metadata.headline = `${record.fullName}'s family`;
  });
</script>

<article>
  <div class="flex flex-row items-center gap-3">
    <div>Mother</div>
    {#if birthMother}
      <div>
        <a href={`${base}/person/${birthMother.id}`} class="btn variant-filled"
          >{birthMother.fullName}</a
        >
      </div>
    {:else}
      <p>Unknown</p>
    {/if}
  </div>
  <div class="flex flex-row items-center gap-3">
    <div>Father</div>
    {#if birthFather}
      <div>
        <a href={`${base}/person/${birthFather.id}`} class="btn variant-filled"
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
</article>
