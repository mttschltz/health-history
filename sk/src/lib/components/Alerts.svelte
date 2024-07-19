<script lang="ts" context="module">
  interface AlertMessage {
    message: string;
    type: string;
    timeout?: number;
    html?: boolean;
  }
  interface Alert {
    message: string;
    type: string;
    timeout?: number;
    html?: boolean;
    class: string;
  }

  let _alerts = $state<Alert[]>([]);
  export const alerts = {
    add({ message, type = "info", timeout = 0, html = false }: AlertMessage) {
      let clss: string;
      switch (type) {
        case "success":
          clss = "preset-filled-success-500";
          break;
        case "error":
          clss = "preset-filled-error-500";
          break;
        case "warning":
          clss = "preset-filled-warning-500";
          break;
        case "info":
        default:
          clss = "preset-filled-surface-500";
          break;
      }
      const alert = { message, type, html, class: clss };
      _alerts = _alerts.concat(alert);
      if (timeout) {
        setTimeout(() => {
          dismiss(alert);
        }, timeout);
      }
    },
    info(message: string, timeout = 0) {
      this.add({ message, type: "info", timeout });
    },
    success(message: string, timeout = 0) {
      this.add({ message, type: "success", timeout });
    },
    warning(message: string, timeout = 0) {
      this.add({ message, type: "warning", timeout });
    },
    error(message: string, timeout = 0) {
      this.add({ message, type: "error", timeout });
    },
  };

  export function errorAlert(message: string) {
    const type = "error";
  }

  function dismiss(alert: Alert) {
    _alerts = _alerts.filter((a) => a !== alert);
  }

  function dismissAll() {
    _alerts = [];
  }
  function onunhandledrejection(e: PromiseRejectionEvent) {
    alerts.error(e.reason.toString());
    const { data = {} } = e.reason.response ?? {};
    for (const [key, value] of Object.entries(data)) {
      alerts.error(`${key}: ${value?.message}`);
    }
  }
</script>

<!-- to display alerts for unhandled promise rejections -->
<svelte:window {onunhandledrejection} />

<article class="flex flex-col gap-1">
  {#each _alerts as alert}
    <div
      class={`card ${alert.class} grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[1fr_auto]`}
    >
      <div>
        {#if alert.type === "success"}
          <p class="font-bold">Success</p>
        {:else if alert.type === "error"}
          <p class="font-bold">Error</p>
        {/if}
        {#if alert.html}
          {@html alert.message}
        {:else}
          {alert.message}
        {/if}
      </div>
      <div class="flex gap-1">
        <button class="btn" onclick={() => dismiss(alert)}>Dismiss</button>
      </div>
    </div>
  {/each}
  {#if _alerts.length > 1}
    <button
      onclick={dismissAll}
      class="btn preset-outlined-primary-500 self-end">Dismiss All</button
    >
  {/if}
</article>

<style></style>
