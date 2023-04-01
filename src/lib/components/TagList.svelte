<script lang="ts">
  export let tags: string[];
  export let selected: string[];
  export let toggle: (tag: string) => void;
  export let rightAlign: boolean = false;
</script>

<span class:justify-end={rightAlign}>
  {#each tags as tag}
    <span
      class="chip hover:cursor-pointer {selected.includes(tag) ? 'variant-filled' : 'variant-soft'}"
      on:click={() => toggle(tag)}
    >
      {tag}
  	</span>
  {/each}
</span>
