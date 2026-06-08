<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../styles.css';
	import { sidebarTagPanel } from '$lib/sidebar.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	function isCurrent(href: string) {
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<title>Golly's Garden</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="wrap">
	<!--========== SIDEBAR ==========-->
	<aside class="sidebar">
		<div class="brand">
			<span class="wordmark">Golly's<br><b>Garden</b></span>
		</div>
		<p class="tagline">a digital garden of games<br>&amp; little web experiments</p>
		<nav>
			<a href="/" class:current={isCurrent('/')}><span class="navicon">~</span>home</a>
			<a href="/about" class:current={isCurrent('/about')}><span class="navicon">@</span>about</a>
			<a href="/rss.xml" class:current={isCurrent('/rss')}><span class="navicon">+</span>rss</a>
		</nav>

		<hr>

		{#if sidebarTagPanel.visible}
			<p class="sectionlabel">Browse by tag</p>
			<div class="tags">
				{#each Object.entries(sidebarTagPanel.counts) as [tag, ct]}
					<button class="tagbtn" class:on={sidebarTagPanel.activeTag === tag} onclick={() => sidebarTagPanel.onSelect(tag)}>
						<span class:on={sidebarTagPanel.activeTag === tag}>{tag}</span>
						<span class="ct">{ct}</span>
					</button>
				{/each}
			</div>
			<hr>
		{/if}

		<div class="elsewhere">
			<p class="sectionlabel">Elsewhere</p>
			<a href="https://github.com/CasColucci">github <span class="arrow">→</span></a>
		</div>
	</aside>

	<!--========== MAIN ==========-->
	{@render children()}
</div>

<style>
	h1, h2, h3 {
		font-family: var(--pixel);
	}

	.wrap {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 268px 1fr;
		max-width: 1240px;
		margin: 0 auto;
		min-height: 100vh;
	}

	/* ========== SIDEBAR ========== */

	.sidebar {
		border-right: 1.5px solid var(--line-2);
		padding: 34px 26px 30px;
		position: sticky; top: 0; align-self: start; height: 100vh;
		display: flex; flex-direction: column;
		background: linear-gradient(180deg, rgba(236,224,200,.5), transparent 38%);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 11px;
		margin-bottom: 7px;
	}

	.wordmark {
		font-family: var(--pixel);
		font-weight: 700;
		font-size: 36px;
		line-height: 1.05;
		letter-spacing: .5px;
		b {
			color: var(--accent);
		}
	}

	.tagline {
		font-family: var(--mono);
		font-size: 12px;
		color: var(--ink-2);
		line-height: 1.45;
		margin: 0 0 26px 1px;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 7px 11px;
		margin-bottom: 24px;

		a {
			font-family: var(--mono);
			font-size: 14px;
			padding: 7px 11px;
			border-radius: 7px;
			display: flex;
			align-items: center;
			gap: 9px;
			color: var(--ink);
			position: relative;
			transition: background .12s, color .12s;

			.navicon {
				color: var(--ink-3);
				font-size: 12px;
				width: 14px;
			}
		}

		.current {
			background: var(--accent-soft);
			color: var(--accent);
			font-weight: 700;
			.navicon {
				color: var(--accent);
			}
		}

		a:hover {
			background: var(--accent-soft);
		}
	}

	hr {
		height: 1.5px;
		background: var(--line);
		margin: 0 2px 22px;
		border: none;
	}

	.sectionlabel {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		color: var(--ink-3);
		margin: 0 0 11px 2px;
	}

	.tags {
		display: flex;
		flex-direction: column;
		gap: 1px;
		margin-bottom: 24px;
	}

	.tagbtn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		font-family: var(--mono);
		font-size: 13px;
		color: var(--ink-2);
		padding: 4px 8px;
		border-radius: 6px;
		cursor: pointer;
		background: none;
		border: none;
		text-align: left;
		width: 100%;
		transition: background .12s, color .12s;

		.on {
			color: var(--accent);
			font-weight: 700;
		}

		.ct {
			font-size: 11px;
			color: var(--ink-3);
		}
	}

	.tagbtn:hover {
		background: var(--accent-soft);
		color: var(--ink);
	}

	.elsewhere {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: auto;

		a {
			font-family: var(--mono);
			font-size: 12px;
			color: var(--ink-2);
			display: flex;
			align-items: center;
			gap: 8px;
		}

		a .arrow {
			color: var(--ink-3);
			transition: transform .12s;
		}

		a:hover {
			color: var(--accent);
			.arrow {
				transform: translateX(3px);
				color: var(--accent);
			}
		}
	}

	/* ========== RESPONSIVENESS =========== */
	@media (max-width: 880px) {

		
		.wrap {
			grid-template-columns: 1fr;
			align-items: start;
			min-height: 0;
		}

		.sidebar {
			position: static;
			height: auto;
			border-right: none;
			border-bottom: 1.5px solid var(--line-2);
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			gap: 14px 22px;
			padding: 20px 22px;
		}

		.tagline, .sectionlabel, .divider, .elsewhere{
			display: none;
		}

		.tags {
			flex-direction: row;
			flex-wrap: wrap;
			margin-bottom: 0;
		}

		.tagbtn {
			width: auto;
		}

		nav {
			flex-direction: row;
			margin: 0;
			gap: 4px;
			flex-wrap: wrap;
		}

		.brand {
			margin: 0;
		}
	}
</style>
