<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";

  const {
    type,
    text,
    id,
  }: {
    type: "success" | "error" | "warning" | "info";
    text: string;
    id: number;
  } = $props();
  console.log("Alert", type, text, id);
</script>

{#if type === "success"}
  <div class="flex flex-col gap-1">
    <div
      class={`card preset-filled-success-500 flex items-center justify-between gap-4 p-4`}
    >
      <span>{text}</span>
      <button
        class="btn"
        onclick={() => {
          toast.pop(id);
        }}>Dismiss</button
      >
    </div>
  </div>
{:else if type === "error"}
  <div class="flex flex-col gap-1">
    <div
      class={`card preset-filled-error-500 flex items-center justify-between gap-4 p-4`}
    >
      <span>{text}</span>
      <button
        class="btn"
        onclick={() => {
          toast.pop(id);
        }}>Dismiss</button
      >
    </div>
  </div>
{:else if type === "warning"}
  <div class="flex flex-col gap-1">
    <div
      class={`card preset-tonal-warning flex items-center justify-between gap-4 p-4`}
    >
      <span>{text}</span>
      <button
        class="btn"
        onclick={() => {
          toast.pop(id);
        }}>Dismiss</button
      >
    </div>
  </div>
{:else}
  <div class="flex flex-col gap-1">
    <div
      class={`card preset-tonal-tertiary flex items-center justify-between gap-4 p-4`}
    >
      <span>{text}</span>
      <button
        class="btn"
        onclick={() => {
          toast.pop(id);
        }}>Dismiss</button
      >
    </div>
  </div>
{/if}
