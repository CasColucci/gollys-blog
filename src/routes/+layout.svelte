<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	@import '../styles.css';

	body {
		background-color: var(--white);
		color: var(--dark-blue);
	}
</style>