<script>
  import "../app.css";
  import { authModel } from "../lib/pocketbase";
  import { page } from "$app/stores";
  import Alerts from "$lib/components/Alerts.svelte";
  import LoginBadge from "$lib/components/LoginBadge.svelte";
  import { AppBar } from "@skeletonlabs/skeleton-svelte";
  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import LoginForm from "$lib/components/LoginForm.svelte";
  import { HomeIcon } from "lucide-svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const { data, children } = $props();

  const metadata = $derived(data.metadata ?? {});
  const config = $derived(data.config ?? {});

  const title = $derived($page.data.title);
  const back = $derived($page.data.back);
  const isHome = $derived(!title);

  $effect(() => {
    if ($page.error) {
      metadata.title = $page.error.message;
    }
  });
</script>

<svelte:head>
  <title
    >{title
      ? `${metadata.title} ${config.site?.name}`
      : config.site?.name}</title
  >
</svelte:head>

<AppBar>
  {#snippet lead()}
    <div class="flex flex-col justify-center">
      {#if isHome}
        {config.site?.name}
      {:else if !!back && back !== "/"}
        <a href={back ?? "/"}>
          <ArrowLeft size={24} />
        </a>
      {:else}
        <a href={"/"} class="flex gap-2">
          <HomeIcon size={24} /><span>Home</span>
        </a>
      {/if}
    </div>
  {/snippet}
  {#snippet trail()}
    <div class="flex flex-col justify-center">
      <LoginBadge signupAllowed={config.signupAllowed}></LoginBadge>
    </div>
  {/snippet}
</AppBar>
<main class="m-4 max-w-lg">
  {#if $authModel}
    {@render children()}
  {:else}
    <LoginForm signupAllowed={false}></LoginForm>
  {/if}
</main>
<footer class="mt-8 p-4">
  Copyright © {config.site?.year}
  {config.site?.copyright}
</footer>

<SvelteToast
  options={{
    duration: 5000,
  }}
/>

<style>
</style>
