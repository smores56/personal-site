<script lang="ts">
  import ToolList from "$lib/components/ToolList.svelte";
  import { proficientLanguages, personalLanguages } from "./data";
</script>

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
  I currently run
  <a href="https://pop.system76.com/">Pop!_OS 20.10</a>
  (an Ubuntu-based Linux distro) on all of my machines. I use
  <a href="https://github.com/alacritty/alacritty">Alacritty</a>
  as my terminal emulator,
  <a href="http://kakoune.org/">Kakoune</a>
  as my text editor, and
  <a href="https://en.wikipedia.org/wiki/Tmux">tmux</a>
  as my session manager/terminal multiplexer. All of my configuration for
  these tools (in addition to everything else I use) can be found in my
  <a href="https://github.com/smores56/dotfiles">dotfiles repo</a>.
</p>
