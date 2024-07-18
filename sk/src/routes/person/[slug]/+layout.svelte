<script lang="ts">
  import type { Snippet } from "svelte";

  const { data, children } = $props();
  const record = $derived(data.person);
</script>

{@render children()}
