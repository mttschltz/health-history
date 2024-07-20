<script>
  import "../app.css";
  import { authModel } from "../lib/pocketbase";
  import { page } from "$app/stores";
  import Alerts from "$lib/components/Alerts.svelte";
  import LoginBadge from "$lib/components/LoginBadge.svelte";
  import { AppBar } from "@skeletonlabs/skeleton-svelte";
  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import LoginForm from "$lib/components/LoginForm.svelte";

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
      {:else}
        <a href={back ?? "/"}>
          <ArrowLeft size={24} />
        </a>
      {/if}
    </div>
  {/snippet}
  <!-- {#if !title}
    <h1>{title}</h1>
  {/if} -->
  {#snippet trail()}
    <div class="flex flex-col justify-center">
      <LoginBadge signupAllowed={config.signupAllowed}></LoginBadge>
    </div>
  {/snippet}
</AppBar>
<main class="p-4">
  <Alerts></Alerts>
  <!-- <h1 class="h1">{title ?? metadata.headline ?? metadata.title}</h1> -->

  {#if !$authModel}
    <LoginForm signupAllowed={false}></LoginForm>
  {/if}
  {@render children()}
</main>
<footer class="mt-8 p-4">
  Copyright © {config.site?.year}
  {config.site?.copyright}
</footer>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 2rem;
      height: 2rem;
    }
  }
  main {
    flex-grow: 1;
  }
</style>
