<script lang="ts">
  import type { Snippet } from "svelte";

  const { data, children } = $props();
  const record = $derived(data.record);
</script>

{@render children()}
