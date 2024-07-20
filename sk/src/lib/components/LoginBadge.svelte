<script lang="ts">
  import { onDestroy } from "svelte";
  import { authModel, client } from "../pocketbase";
  import { alerts } from "./Alerts.svelte";
  import { goto } from "$app/navigation";

  const { signupAllowed = true } = $props();
  async function logout() {
    client.authStore.clear();
    goto("/", {
      invalidateAll: true,
    });
  }
  const unsubscribe = client.authStore.onChange((token, model) => {
    if (model) {
      const { name, username } = model;
      alerts.success(`Signed in as ${name || username || "Admin"}`, 5000);
    } else {
      alerts.success(`Signed out`, 5000);
    }
  }, false);
  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if $authModel}
  <div class="flex items-center gap-x-4">
    <span>{$authModel?.name ?? $authModel?.username ?? $authModel?.email}</span>
    <button class="btn preset-tonal-primary" onclick={logout}>Sign Out</button>
  </div>
{/if}

<style lang="scss">
</style>
