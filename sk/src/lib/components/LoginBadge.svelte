<script lang="ts">
  import { onDestroy } from "svelte";
  import { authModel, client } from "../pocketbase";
  import { goto } from "$app/navigation";
  import { alertSuccess } from "$lib/components/alert";

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
      alertSuccess(`Signed in as ${name || username || "Admin"}`);
    } else {
      alertSuccess(`Signed out`);
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
