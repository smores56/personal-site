<script>
  import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.css';

  import { AppShell } from '@skeletonlabs/skeleton';
  import Header from "$lib/components/Header.svelte";
</script>

<AppShell>
  <Header slot="pageHeader" />
  <slot />
</AppShell>
