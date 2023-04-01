<script lang="ts">
  import { writable } from 'svelte/store';

  import Work from "./Work.svelte";
  import Projects from "./Projects.svelte";
  import Skills from "./Skills.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { Tab, TabGroup } from '@skeletonlabs/skeleton';

  const tabSet  = writable(0);
</script>

<div class="container">
  <div class="flex flex-row">
    <div class="col col-sm-12 col-md-4">
      <Sidebar />
    </div>
    <div class="col col-sm-12 col-md-8">
      <TabGroup>
        {#each ["Work", "Projects", "Skills"] as tab, index}
          <Tab bind:group={$tabSet} name={tab.toLowerCase()} value={index}></Tab>
        {/each}

        <svelte:fragment slot="panel">
          {#if $tabSet === 0}
          <Work />
          {:else if $tabSet === 1}
          <Projects />
          {:else if $tabSet === 2}
          <Skills />
          {/if}
        </svelte:fragment>
      </TabGroup>
    </div>
  </div>
</div>
