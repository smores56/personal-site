<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
  import { beforeNavigate } from "$app/navigation";

  let menuOpen: boolean = false;

  beforeNavigate(() => {
    menuOpen = false;
  });

  const routes: [string, string][] = [
    ["/", "Resume"],
    ["/sudoku", "Sudoku"],
    ["/reviews", "Reviews"],
    ["/recipes", "Recipes"],
    ["/keyboards", "Keyboards"],
  ];
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">(icon)</svelte:fragment>
  Sam Mohr
  <svelte:fragment slot="trail">
    <ul>
      {#each routes as [link, name]}
        <li><a href={link}>{name}</a></li>
      {/each}
    </ul>
    <!--
    <span class="mobile-menu-toggle" on:click={() => (menuOpen = !menuOpen)} />
    {#if menuOpen}
      <div class="mobile-menu-background" on:click={() => (menuOpen = false)} />
    {/if}
    <ul
      class="mobile-menu menu"
      style={`display: ${menuOpen ? 'block' : 'none'}`}>
      <li>
        <Link
          to={resumeRoute('work')}
          className={$route.page === 'resume' ? 'active' : ''}>
          Resume
        </Link>
      </li>
      <li>
        <Link to={{ page: 'sudoku' }}>Sudoku</Link>
      </li>
      <li>
        <Link
          to={{ page: 'reviews' }}
          className={$route.page === 'reviews' ? 'active' : ''}>
          Reviews
        </Link>
      </li>
      <li>
        <Link
          to={{ page: 'recipes' }}
          className={$route.page === 'recipes' ? 'active' : ''}>
          Recipes
        </Link>
      </li>
    </ul>
    -->
  </svelte:fragment>
</AppBar>
