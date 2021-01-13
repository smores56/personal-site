<script lang="ts">
  import { resumeRoute, route } from "../route";
  import Link from "../components/Link.svelte";

  export let menuOpen: boolean;
  export let toggleMenu: () => void;

  function clickMenuButton(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  }
</script>

<style>
  .page-nav {
    background: #a1cfff;
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
    <a class="mobile-menu-toggle" on:click={clickMenuButton} />
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
