<script lang="ts">
  const {
    authCollection = "users",
    passwordLogin = true,
    signupAllowed = true,
  } = $props();
  import { client, providerLogin } from "../pocketbase";
  import TabGroup from "./TabGroup.svelte";
  import Tab from "./Tab.svelte";
  import TabContent from "./TabContent.svelte";

  const form = $state({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    admin: false,
  });
  let signup = false;

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    if (signup) {
      await client.collection("users").create({ ...form });
    }
    // signin
    if (form.admin) {
      await client.admins.authWithPassword(form.email, form.password);
    } else {
      await client
        .collection("users")
        .authWithPassword(form.email, form.password);

      // Calling goto() with invalidateAll doesn't work. It seems page.svelte
      // isn't run again after page.ts->load() is called.
      window.location.reload();
      // goto("/", { invalidateAll: true });
    }
  }
  let active = $state("SignIn");
</script>

{#snippet signin()}
  <div class="flex flex-col gap-2">
    <input bind:value={form.email} required type="text" placeholder="email" />
    <input
      bind:value={form.password}
      required
      type="password"
      placeholder="password"
    />
    <!-- <label title="sign-in as admin">
    <input type="checkbox" bind:checked={form.admin} />Admin
    </label> -->
    <div class="self-end">
      <button
        class="btn preset-filled-primary-500"
        type="submit"
        onclick={() => (signup = false)}>Log In</button
      >
    </div>
  </div>
{/snippet}

<form onsubmit={submit}>
  {#if passwordLogin}
    {#if signupAllowed}
      <TabGroup bind:active>
        {#snippet tabs()}
          <Tab key="SignIn">Log In</Tab>
          <Tab key="SignUp">Sign Up</Tab>
        {/snippet}
        <TabContent key="SignIn">
          {@render signin()}
        </TabContent>
        <TabContent key="SignUp">
          <input
            bind:value={form.email}
            required
            type="text"
            placeholder="email"
          />
          <input
            bind:value={form.password}
            required
            type="password"
            placeholder="password"
          />
          <input
            bind:value={form.passwordConfirm}
            required
            type="password"
            placeholder="confirm password"
          />
          <input
            bind:value={form.name}
            required
            type="text"
            placeholder="name / label"
          />
          <input type="hidden" name="register" value={true} />
          <button type="submit" onclick={() => (signup = true)}>Sign Up</button>
        </TabContent>
      </TabGroup>
    {:else}
      <h2 class="h2">Log In</h2>
      {@render signin()}
    {/if}
  {/if}
  {#await client
    .collection("users")
    .listAuthMethods({ $autoCancel: false }) then methods}
    {#each methods.authProviders as p}
      <button
        type="button"
        onclick={() => providerLogin(p, client.collection("users"))}
        >Sign-in with {p.name}</button
      >
    {/each}
  {:catch}
    <!-- pocketbase not working -->
  {/await}
</form>
