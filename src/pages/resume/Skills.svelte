<script lang="ts">
  import ToolList from "../../components/ToolList.svelte";
  import { proficientLanguages, personalLanguages } from "../../data";
</script>

<style>
  .skills-container {
    margin-top: 30px;
  }
</style>

<div class="skills-container">
  <h5>Programming languages</h5>
  <p>
    I am proficient in
    <ToolList tools={proficientLanguages} />.
  </p>
  <p>
    In addition to these languages, I enjoy learning new languages whenever I
    find one I've not encountered before. I find that learning different
    languages broadens my perspective when tackling problems in popular
    languages. Some such languages are
    <ToolList tools={personalLanguages} />.
  </p>
  <p>
    A great place to look for such languages is
    <a href="https://www.reddit.com/r/ProgrammingLanguages/">
      r/ProgrammingLanguages
    </a>, which is a popular forum for language announcements of all kinds.
  </p>
  <h5>Dev environment</h5>
  <p>
    I run Linux (Pop!_OS 20.10) and blah blah blah. Mention my dotfiles and
    stuff here.
  </p>
</div>
