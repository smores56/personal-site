<script lang="ts">
  const globImport = import.meta.glob<{ default: SvelteComponent; metadata: Record<string, any> }>(
  	'./*/+page.md',
  	{ eager: true }
  );

  const allBlogs = Object.entries(globImport).map(
    ([path, { metadata }]) => {
      return {
        url: `./blog/${path.slice(2).split("/")[0]}`,
        title: metadata.title,
        date: new Date(metadata.date),
      };
    })
    .sort((a, b) => a.date < b.date);
</script>

{#each allBlogs as blog}
  <h2><a href={blog.url}>{blog.title}</a></h2>
  <p>Written on: {blog.date}</p>
{/each}
