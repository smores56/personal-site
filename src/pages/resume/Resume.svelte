<script lang="ts">
  import { resumeRoute } from "../../route";
  import type { ResumeTab } from "../../route";
  import Link from "../../components/Link.svelte";
  import Work from "./Work.svelte";
  import Projects from "./Projects.svelte";
  import Skills from "./Skills.svelte";
  import Sidebar from "../../components/Sidebar.svelte";

  export let tab: ResumeTab;
</script>

<style>
  .resume-title {
    text-align: center;
    font-size: 60px;
  }

  .tabs-wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .tabs-wrapper li {
    height: 35px;
  }

  .tabs-wrapper::-webkit-scrollbar {
    display: none;
  }
</style>

<div class="container">
  <div class="row row-reverse">
    <div class="col align-center">
      <h1 class="resume-title">Sam Mohr</h1>
    </div>
  </div>
  <div class="row">
    <div class="col col-sm-12 col-md-4">
      <Sidebar />
    </div>
    <div class="col col-sm-12 col-md-8">
      <section>
        <div class="tabs-wrapper">
          <ul class="tabs">
            <li>
              <Link className="tab" to={resumeRoute('work')}>Work</Link>
            </li>
            <li>
              <Link className="tab" to={resumeRoute('projects')}>Projects</Link>
            </li>
            <li>
              <Link className="tab" to={resumeRoute('skills')}>Skills</Link>
            </li>
          </ul>
        </div>
        {#if tab === 'work'}
          <Work />
        {:else if tab === 'projects'}
          <Projects />
        {:else}
          <Skills />
        {/if}
      </section>
    </div>
  </div>
</div>
