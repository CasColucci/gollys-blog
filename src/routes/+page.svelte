<script lang="ts">
    import type { PageData } from './$types';
    import type { Post } from './+page.server';

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

    // Build tag list with counts from all posts
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

    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
    }
</script>

<div class="wrap">
    <!--========== SIDEBAR ==========-->
    <aside class="sidebar">
        <div class="brand">
            <span class="wordmark">Golly's<br><b>Garden</b></span>
        </div>
        <p class="tagline">a digital garden of games<br>&amp; little web experiments</p>
        <nav>
            <a href="" class="current"><span class="navicon">~</span>home</a>
            <a href=""><span class="navicon">»</span>posts</a>
            <a href=""><span class="navicon">@</span>about</a>
            <a href=""><span class="navicon">+</span>rss</a>
        </nav>

        <hr>
        
        <p class="sectionlabel">Browse by tag</p>
        <div class="tags">
            {#each Object.entries(tagCounts) as [tag, ct]}
                <button class="tagbtn" class:on={activeTag === tag} onclick={() => setTag(tag)}>
                    <span class:on={activeTag === tag}>{tag}</span>
                    <span class="ct">{ct}</span>
                </button>
            {/each}
        </div>

        <hr>

        <div class="elsewhere">
            <p class="sectionlabel">Elsewhere</p>
            <a href="https://github.com/CasColucci">github <span class="arrow">→</span></a>
        </div>
    </aside>

    <!--========== MAIN ==========-->
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

        <footer>
            <span class="sprout">planted &amp; tended with care · 2026</span>
            <span><a href="#">rss</a> · <a href="#">github</a> · <a href="#">back to top ↑</a></span>
        </footer>
    </main>
</div>

<style>
    h1, h2, h3 {
        font-family: var(--pixel);
    }

    .wrap{
        position:relative; 
        z-index:1; 
        display:grid; 
        grid-template-columns:268px 1fr;
        max-width:1240px; 
        margin:0 auto; 
        min-height:100vh
    }

    /* ========== SIDEBAR ========== */

    .sidebar{
        border-right:1.5px solid var(--line-2);
        padding:34px 26px 30px;
        position:sticky; top:0; align-self:start; height:100vh;
        display:flex; flex-direction:column;
        background:linear-gradient(180deg, rgba(236,224,200,.5), transparent 38%);
    }

    .brand{
        display: flex; 
        align-items: center; 
        gap: 11px; 
        margin-bottom: 7px
    }
    .wordmark{
        font-family: var(--pixel); 
        font-weight: 700; 
        font-size:36px; 
        line-height:1.05; 
        letter-spacing:.5px;
        b {
            color: var(--accent);
        }
    }

    .tagline{
        font-family: var(--mono); 
        font-size: 12px; 
        color: var(--ink-2); 
        line-height: 1.45; 
        margin: 0 0 26px 1px
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

    .tag:hover {
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

        .tend .on {
            background: color-mix(in oklab, var(--accent) 38%, transparent)
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

        .stage-seedling{
            background: #d6c391
        }
        .stage-growing{
            background: #9bb05f
        }
        .stage-evergreen{
            background: #5f8344
        }
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

        .filterrow {
            display: flex;
            gap: 7px;
            flex-wrap: wrap;
        }

        .fchip {
            font-family: var(--mono);
            font-size: 12px;
            color: var(--ink-2);
            border: 1.5px solid var(--line-2);
            background: transparent;
            padding: 4px 11px;
            border-radius: 30px;
            cursor: pointer;
            transition: border-color .12s, color .12s, font-weight .12s, background .12s;
        }

        .fchip:hover {

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
        background:color-mix(in oklab, var(--accent) 6%, transparent)
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

    footer {
        margin-top: 46px;
        padding-top: 22px;
        border-top: 1.5px solid var(--line);
        display: flex;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        font-family: var(--mono);
        font-size: 12px;
        color: var(--ink-3);

        .sprout {
            color: var(--sage);
        }

        a:hover {
            color: var(--accent);
        }
    }

    /* ========== RESPONSIVENESS =========== */
    @media (max-width: 880px) {
        .wrap {
            grid-template-columns: 1fr;
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

        .tagline, .sectionlabel, .divider, .tags, .elsewhere {
            display: none;
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

        main {
            padding: 28px 22px 56px;
        }
    }
</style>