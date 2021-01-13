<script lang="ts">
  import { allJobs } from "../../data";
  import ToolList from "../../components/ToolList.svelte";
  import UnorderedList from "../../components/UnorderedList.svelte";
</script>

<style>
  p.panel-title {
    margin-bottom: 0;
  }
</style>

{#each allJobs as job}
  <div class="panel">
    <div class="panel-head">
      <p class="panel-title display-lg-down">
        <b>{job.company}</b>,
        <br />
        {job.location}
      </p>
      <i class="align-right display-lg-down">
        {job.startedAt}
        to
        <br />
        {job.left}
      </i>

      <p class="panel-title display-lg-up">
        <b>{job.company}</b>,
        {job.location}
      </p>
      <i class="align-right display-lg-up">
        from
        {job.startedAt}
        to
        {job.left}
      </i>
    </div>
    <div class="panel-body">
      <p>{job.description}</p>
      {#if job.accomplishments.length === 0}
        <UnorderedList items={job.responsibilities} />
      {:else}
        <div class="row">
          <div class="col-sm-6">
            <span>My main accomplishments:</span>
            <br />
            <UnorderedList items={job.accomplishments} />
          </div>
          <div class="col-sm-6">
            <span>My daily responsibilities:</span>
            <br />
            <UnorderedList items={job.responsibilities} />
          </div>
        </div>
      {/if}
      <p>
        Tools used:
        <ToolList tools={job.tools} />
      </p>
    </div>
  </div>
{/each}
