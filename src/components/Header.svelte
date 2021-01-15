<script lang="ts">
  import { onDestroy } from "svelte";
  import { resumeRoute, route } from "../route";
  import Link from "../components/Link.svelte";

  let menuOpen: boolean = false;

  const unsubscribe = route.subscribe(() => {
    menuOpen = false;
  });

  onDestroy(unsubscribe);
</script>

<style>
  .page-nav {
    background: #a1cfff;
  }

  ul.mobile-menu {
    position: absolute;
    top: 15px;
    right: 30px;
    z-index: 10;
  }

  .mobile-menu-toggle {
    color: #fafafa;
  }

  div.mobile-menu-background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.25);
  }
</style>

<nav class="page-nav">
  <div class="nav-container">
    <div class="nav-logo">
      <Link to={resumeRoute('work')}>Sam Mohr</Link>
    </div>
    <ul class="nav-links">
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
  </div>
</nav>
