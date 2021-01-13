<script lang="ts">
  import ContactInfo from "./ContactInfo.svelte";
</script>

<section>
  <p>
    I'm a full-stack software developer based in Atlanta, Georgia. I love
    learning new tools, languages, and techniques, but primarily work in Rust
    (though I've got plenty of experience in lots of areas).
  </p>
  <p>
    I graduated in 2019 from Georgia Tech with a B.S. in Computer Science
    earning Highest Honors. I had concentrations in intelligence and
    systems/architecture, and my favorite courses were OS Design and Compilers
    and Interpreters.
  </p>
  <p>
    I also sing and play music on the side, and love music theory. I can talk
    for hours about software, music, movies, and games.
  </p>
  <div class="display-md-up">
    <ContactInfo />
  </div>
  <div class="display-md-down align-center">
    <ContactInfo />
  </div>
</section>
