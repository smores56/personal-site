<script lang="ts">
  export let items: string[];
</script>

<ul>
  {#each items as item}
    <li><i>{item}</i></li>
  {/each}
</ul>
