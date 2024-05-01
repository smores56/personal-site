<script lang="ts">
  import CopyIcon from "~/components/icons/CopyIcon.svelte";

  const { content }: { content: string } = $props();
</script>

<button
  class="btn btn-square btn-sm"
  onclick={() => navigator.clipboard.writeText(content)}
>
  <div data-tip="copy" class="tooltip tooltip-left tooltip-accent">
    <CopyIcon />
  </div >
</button>
