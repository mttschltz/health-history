<script lang="ts">
  import ImgModal from "$lib/pocketbase/ImgModal.svelte";
  import { authModel, client } from "$lib/pocketbase/index.js";
  import { base } from "$app/paths";
  import { PersonSexOptions } from "$lib/pocketbase/generated-types";

  const { data } = $props();
  const person = $derived(data.person);
  const birthMother = $derived(person.expand?.birthMother);
  const birthFather = $derived(person.expand?.birthFather);
  const siblings = $derived(data.siblings);
</script>

<article class="flex flex-col gap-8">
  <div>
    <h1 class="h1">{data.title}</h1>
    <h2 class="h2">Parents</h2>
    <div class="flex flex-col gap-2">
      <div class="flex flex-row items-center gap-3">
        <div class="basis-24">Mother</div>
        {#if birthMother}
          <div>
            <a
              href={`${base}/person/${birthMother.id}`}
              class="btn preset-tonal">{birthMother.fullName}</a
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
            <a
              href={`${base}/person/${birthFather.id}`}
              class="btn preset-tonal">{birthFather.fullName}</a
            >
          </div>
        {:else}
          <p>Unknown</p>
        {/if}
      </div>
    </div>
  </div>
  <div>
    <h2 class="h2">Siblings</h2>
    <div class="flex flex-col gap-2">
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
    {#if siblings.length === 0}
      <p>Unknown</p>
    {/if}
  </div>
  <div class="self-center">
    <a href={`${base}/person/${person.id}/edit`} class="btn preset-filled">
      {#if $authModel?.writeAccess}
        Update health history
      {:else}
        View health history
      {/if}
    </a>
  </div>
</article>
