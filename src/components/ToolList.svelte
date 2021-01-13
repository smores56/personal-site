<script lang="ts">
  import type { Tool } from "../models";

  export let tools: Tool[];
</script>

<span>
  {#each tools as tool, index}
    <a
      href={tool.url}>{tool.name}</a>{index < tools.length - 2 ? ', ' : index === tools.length - 2 ? ', and ' : ''}
  {/each}
</span>
