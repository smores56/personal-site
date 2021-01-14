<script lang="ts">
  export let pageNumber: number;
  export let pageCount: number;
  export let goToPage: (page: number) => void;
</script>

<style>
  ul.pagination {
    justify-content: center;
    margin-bottom: 25px;
  }

  a {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

<ul class="pagination">
  <li>
    <a
      class={pageNumber === 1 ? 'active' : ''}
      on:click={() => goToPage(1)}>First</a>
  </li>
  {#if pageNumber > 1}
    <li><a on:click={() => goToPage(pageNumber - 1)}>{pageNumber - 1}</a></li>
  {/if}
  <li><a class="active">{pageNumber}</a></li>
  {#if pageNumber < pageCount}
    <li><a on:click={() => goToPage(pageNumber + 1)}>{pageNumber + 1}</a></li>
  {/if}
  <li>
    <a
      class={pageNumber === pageCount ? 'active' : ''}
      on:click={() => goToPage(pageCount)}>Last</a>
  </li>
</ul>
