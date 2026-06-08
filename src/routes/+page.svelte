<script lang="ts">
    import type { PageData } from './$types';
    import type { Post } from './+page.server';
    import { sidebarTagPanel } from '$lib/sidebar.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let { data }: { data: PageData } = $props();

    let posts: Post[] = $derived(data.posts);
    let activeTag = $state<string | null>(null);
    let activeProject = $state<string | null>(null);

    let filtered = $derived(
        posts.filter(p => {
            if (activeTag && !p.tags.includes(activeTag)) return false;
            if (activeProject && p.project !== activeProject) return false;
            return true;
        })
    );

    let count = $derived(filtered.length);

    let tagCounts = $derived(
        posts.reduce<Record<string, number>>((acc, p) => {
            for (const t of p.tags) acc[t] = (acc[t] ?? 0) + 1;
            return acc;
        }, {})
    );

    function setTag(tag: string) {
        activeTag = activeTag === tag ? null : tag;
        activeProject = null;
    }

    function setProject(project: string) {
        activeProject = activeProject === project ? null : project;
        activeTag = null;
    }

    function clearFilters() {
        activeTag = null;
        activeProject = null;
    }

    $effect(() => {
        sidebarTagPanel.visible = true;
        sidebarTagPanel.counts = tagCounts;
        sidebarTagPanel.activeTag = activeTag;
        sidebarTagPanel.onSelect = setTag;
        return () => { sidebarTagPanel.visible = false; };
    });
</script>

<main>
    <header>
        <p class="intro">I'm <b>Golly</b>! I build games and web things, then write up what I learned along the way. Consider everything here a plant; some are just starting to grow, some have been growing for a while, and some may need a little tending.</p>
    </header>

    <div class="ticker">
        <span class="tlabel">NOW TENDING ▸ </span>
        <div class="tending">
            {#each [...new Set(posts.filter(p => p.stage === 'growing' && p.project).map(p => p.project))] as project}
                <button class="tend" class:on={activeProject === project} title="filter posts about {project}" onclick={() => setProject(project)}>
                    <span class="stagedot stage-growing"></span>
                    <span class="nm">{project}</span>
                </button>
            {/each}
        </div>
    </div>

    <section class="index">
        <div class="indexhead">
            <h2>The Index <span class="count">- {count} entries</span></h2>
        </div>
        <hr class="indexrule">

        {#if activeTag || activeProject}
            <div class="filterbanner">
                <span class="lbl">Filtering by </span>
                <span class="val">
                    {activeTag ?? activeProject}
                </span>
                <button class="clear" onclick={clearFilters}>✕ clear</button>
            </div>
        {/if}

        {#if filtered.length === 0}
            <div class="empty">nothing growing here yet, check back later for new sprouts!</div>
        {:else}
            <div class="rows">
                {#each filtered as post}
                    <a class="row" href="/posts/{post.slug}">
                        <span class="rowdate">{post.long}</span>
                        <span>
                            <span class="stagedot stage-{post.stage}"></span>
                            <span class="rowtitle">{post.title}</span>
                            <span class="rowex">{post.excerpt}</span>
                            <span class="rowtags">
                                {#each post.tags as tag}
                                    <span class="rowtag">{tag}</span>
                                {/each}
                            </span>
                        </span>
                    </a>
                {/each}
            </div>
        {/if}
    </section>
    <Footer />
</main>

<style>
    /* ========== MAIN ========== */
    main {
        padding: 40px 52px 70px;
        min-width: 0;
    }

    .intro {
        font-family: var(--serif);
        font-size: 24px;
        line-height: 1.45;
        color: var(--ink);
        max-width: 680px;
        margin: 0;
        font-weight: 400;
        b {
            font-weight: 500;
            color: var(--ink);
            box-shadow: inset 0 -.5em 0 var(--accent-soft);
        }
    }

    .ticker {
        margin: 26px 0 38px;
        background: var(--ink);
        color: var(--paper);
        border-radius: 11px;
        padding: 13px 18px;
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
        box-shadow: 5px 6px 0 rgba(42,37,31,.16);

        .tlabel {
            font-family: var(--mono);
            font-size: 11px;
            letter-spacing: 1.5px;
            color: var(--sage);
            font-weight: 700;
            white-space: nowrap;
        }

        .tending {
            display: flex;
            gap: 18px;
            flex-wrap: wrap;
        }

        .tend {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--mono);
            font-size: 13px;

            .nm {
                color: var(--paper);
            }
        }

        .tend:hover {
            background: rgba(255,250,234,.08);
        }

        .tend:hover .nm {
            color: #fff;
            cursor: pointer;
        }

        .tend.on .nm {
            color: #fff8ee;
        }

        .stagedot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            flex: none;
        }

        .stage-seedling  { background: #d6c391 }
        .stage-growing   { background: #9bb05f }
        .stage-evergreen { background: #5f8344 }
    }

    .indexhead {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 8px;

        h2 {
            font-family: var(--mono);
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--ink-2);
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;

            .count {
                color: var(--ink-3);
                letter-spacing: 0;
            }
        }

    }

    .indexrule {
        height: 1.5px;
        background: var(--line-2);
        margin: 14px 0 4px;
        border: none;
    }

    .filterbanner {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 10px 14px;
        margin: 12px 0 8px;
        border-radius: 9px;
        background: var(--accent-soft);
        border: 1.5px solid var(--accent-line);
        font-family: var(--mono);
        font-size: 14px;
        color: var(--ink);
        flex-wrap: wrap;

        .lbl {
            color: var(--accent);
            letter-spacing: 1.2px;
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 700;
        }

        .val {
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 7px;
        }

        .clear {
            margin-left: auto;
            appearance: none;
            background: none;
            border: none;
            color: var(--ink-2);
            cursor: pointer;
            font: inherit;
            padding: 3px 8px;
            border-radius: 5px;
        }

        .clear:hover {
            background: rgba(0,0,0,.06);
            color: var(--accent);
        }
    }

    .rows {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: grid;
        grid-template-columns: 78px 1fr auto;
        gap: 22px;
        align-items: baseline;
        padding: 12px 12px;
        border-bottom: 1.5px solid var(--line);
        position: relative;
        transition: background .12s;
        color: var(--ink);
        text-decoration: none;
    }

    .row:hover {
        background: color-mix(in oklab, var(--accent) 6%, transparent);
    }

    .rowdate {
        font-family: var(--mono);
        font-size: 12px;
        color: var(--ink-3);
        padding-top: 3px;
        white-space: nowrap;
    }

    .rowtitle {
        font-family: var(--mono);
        font-weight: 700;
        font-size: 16px;
        line-height: 1.3;
        color: var(--ink);
        display: inline;
    }

    .row:hover .rowtitle {
        color: var(--accent);
    }

    .rowtags {
        display: flex;
        gap: 9px;
        margin-top: 9px;
    }

    .rowtag {
        font-family: var(--mono);
        font-size: 12px;
        color: var(--ink-3);
    }

    .rowtag::before {
        content: "#";
        opacity: .6;
    }

    .rowex {
        display: block;
        font-size: 15px;
        line-height: 1.5;
        color: var(--ink-2);
        margin-top: 5px;
        max-width: 560px;
    }

    .stagedot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex: none;
        display: inline-block;
    }

    .stage-seedling  { background: #d6c391 }
    .stage-growing   { background: #9bb05f }
    .stage-evergreen { background: #5f8344 }
    .stage-neglected { background: #d6a866 }

    .empty {
        font-family: var(--mono);
        font-size: 13px;
        color: var(--ink-3);
        padding: 32px 12px;
    }

    /* ========== RESPONSIVENESS =========== */
    @media (max-width: 880px) {
        main {
            padding: 28px 22px 56px;
        }
    }
</style>
