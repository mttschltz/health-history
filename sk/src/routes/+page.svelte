<script lang="ts">
  import { base } from "$app/paths";
  import { LucideDivideCircle } from "lucide-svelte";
  import { derived } from "svelte/store";

  const { data } = $props();
  const people = derived(data.people, ($people) => {
    return $people.items.sort((a, b) => a.fullName.localeCompare(b.fullName));
  });
</script>

<h2 class="h2">Everyone</h2>
<div class="mt-4 flex flex-col gap-2">
  {#each $people as person}
    <div>
      <a class="btn preset-tonal" href={`${base}/person/${person.id}`}
        >{person.fullName}</a
      >
    </div>
  {/each}
</div>
