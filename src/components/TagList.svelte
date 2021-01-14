<script lang="ts">
  export let tags: string[];
  export let selected: string[];
  export let toggle: (tag: string) => void;
  export let rightAlign: boolean = false;
</script>

<style>
  ul.tags li {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  ul.tags li:hover {
    cursor: pointer;
    background: #aeaeae;
  }

  ul.tags li.tag-green:hover {
    cursor: pointer;
    background: #6ccf70;
  }

  ul.tags.right {
    justify-content: end;
  }
</style>

<ul class={`tags ${rightAlign ? 'right' : ''}`}>
  {#each tags as tag}
    <li
      class={`tag tag-rounded${selected.includes(tag) ? ' tag-green' : ''}`}
      on:click={() => toggle(tag)}>
      {tag}
    </li>
  {/each}
</ul>
