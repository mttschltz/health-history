<script lang="ts">
  import { base } from "$app/paths";
  import { derived } from "svelte/store";

  const { data } = $props();
  const people = derived(data.people, ($people) => {
    return $people.items.sort((a, b) => a.fullName.localeCompare(b.fullName));
  });
  $effect(() => {
    // you could set the metadata either here or in +page.ts
    data.metadata.title = "Health History";
    data.metadata.headline = `Health History`;
  });
</script>

<h2>Everyone</h2>
<ul>
  {#each $people as person}
    <li>
      <a href={`${base}/person/${person.id}`}>{person.fullName}</a>
    </li>
  {/each}
</ul>
