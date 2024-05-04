<script lang="ts">
  import Hero from "~/components/Hero.svelte";
  import { formatDate } from "~/utils";
  
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


<Hero title="Scraps of Thought">
  <div class="p-2"><div/>

  {#each allBlogs as blog}
    <h2 class="text-3xl hover:text-info pt-6">
      <a href={blog.url}>{blog.title}</a>
    </h2>

    <p class="pt-2">
      Written on: <i>{formatDate(blog.date)}</i>
    </p>
  {/each}
</Hero>
