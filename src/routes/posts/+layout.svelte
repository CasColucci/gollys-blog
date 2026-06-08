<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';

    let { children } = $props();
</script>

<article class="post">
    <a href="/">← Back Home</a>
    {@render children()}
    <Footer />
</article>

<style>
    .post {
        max-width: 720px;
        margin: 0 auto;
        padding: 40px 52px 80px;
        font-family: var(--serif);
        font-size: 18px;
        line-height: 1.7;
        color: var(--ink);
    }
</style>
