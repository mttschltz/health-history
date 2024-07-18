<script>
  // By default app.css was before app.scss but it resulted in unwanted CSS
  // selector precendence for stylings of <a> tags (and maybe more), so I
  // reversed them.
  import "../app.scss";
  import "../app.css";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Alerts from "$lib/components/Alerts.svelte";
  import LoginBadge from "$lib/components/LoginBadge.svelte";
  import Nav from "$lib/components/Nav.svelte";

  const { data, children } = $props();

  const metadata = $derived(data.metadata ?? {});
  const config = $derived(data.config ?? {});

  $effect(() => {
    if ($page.error) {
      metadata.title = $page.error.message;
    }
  });
</script>

<svelte:head>
  <title>{metadata.title} | {config.site?.name}</title>
</svelte:head>

<header class="container">
  <a href={`${base}/`} class="logo">
    <img src={`${base}/favicon.svg`} alt="application logo" />
  </a>
  <Nav></Nav>
  <LoginBadge signupallowed={config.signupAllowed}></LoginBadge>
</header>
<main class="container">
  <Alerts></Alerts>
  <h1 class="h1">{metadata.headline ?? metadata.title}</h1>
  {@render children()}
</main>
<footer class="container">
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
