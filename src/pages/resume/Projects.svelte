<script lang="ts">
  import ToolList from "../../components/ToolList.svelte";
  import { allProjects } from "../../data";
</script>

<style>
  .projects-container {
    margin-top: 30px;
  }
</style>

<div class="projects-container">
  <p>
    Most of my development time outside of work goes towards maintaining
    <a href="https://gleeclub.gatech.edu/glubhub/#/login">GlubHub</a>, the
    official website for the Georgia Tech Glee Club, of which I am the
    webmaster. It manages all events, music, grades, attendance, and whatnot for
    the club, and so it is inaccessible by the public, but you can access the
    public-facing site
    <a href="https://gleeclub.gatech.edu/">here</a>
    to learn about the Georgia Tech Glee Club (and even put in a request for an
    event, if you so desire).
  </p>
  <p>
    The website is written in TypeScript using React (previously Elm),
    and runs on a GraphQL API written in Crystal. Check out the repositories for
    the
    <a href="https://github.com/GleeClub/glubhub_react">frontend</a>
    and the
    <a href="https://github.com/smores56/grease_crystal">backend</a>
    to to learn more about how and why things are written the way they are.
  </p>
  <p>Besides that, here are some of my other side projects:</p>
  {#each allProjects as project}
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">{project.name}</p>
      </div>
      <div class="panel-body">
        <p>{project.description}</p>
        <span>Tools used:
          <ToolList tools={project.toolsUsed} /></span>
      </div>
      <div class="panel-footer">
        <a class="button" href={project.github}>on GitHub</a>
      </div>
    </div>
  {/each}
</div>
