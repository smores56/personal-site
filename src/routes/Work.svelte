<script lang="ts">
  import { allJobs } from "./data";
  import ToolList from "$lib/components/ToolList.svelte";
</script>

{#each allJobs as job}
  <div class="card">
    <header class="card-header">
      <b>{job.company}</b>,
      <br />
      {job.location}

      <i class="align-right">
        {job.startedAt}
        to
        <br />
        {job.left}
      </i>
    </header>

    <section class="p-4">
      <p>{job.description}</p>
      <div class="flex flex-row" class:columns-2={job.accomplishments.length > 0}>
        <div>
          <span class:visible={job.accomplishments.length > 0}>
            My main accomplishments:
          </span>
          <ul>
            {#each job.accomplishments as accomplishment}
              <li><i>{accomplishment}</i></li>
            {/each}
          </ul>
        </div>
        {#if job.accomplishments.length > 0}
          <div>
            <span>My daily responsibilities:</span>
              {#each job.responsibilities as responsibility}
                <li><i>{responsibility}</i></li>
              {/each}
          </div>
        {/if}
      </div>
      <p>
        Tools used:
        <ToolList tools={job.tools} />
      </p>
    </section>
  </div>
{/each}
