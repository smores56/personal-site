<script lang="ts">
    const controls: [string, string][] = [
    ["1-9", "input a number"],
    ["m", "show mistakes"],
    ["c", "clear square"],
    ["r", "clear selection"],
  ];
</script>

<table class="table table-compact mx-auto p-2">
  <thead>
    <tr class="bg-base-100">
      <th>Key</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {#each controls as [key, description]}
      <tr>
        <td><i>{key}</i></td>
        <td>{description}</td>
      </tr>
    {/each}
  </tbody>
</table>
