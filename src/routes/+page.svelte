<script>
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
    }

    let count = 8;
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
        <div class="tags" id="tags"></div>

        <hr>

        <div class="elsewhere">
            <p class="sectionlabel">Elsewhere</p>
            <a href="https://github.com/CasColucci">github <span class="arrow">→</span></a>
        </div>
    </aside>

    <!--========== MAIN ==========-->
    <main>
        <header>
            <p class="intro">I'm <b>Golly</b> - I build games and web things, then write up what I learned along the way! Consider everything here a plant; some are just starting to grow, some have been growing for a while, and some may need a little tending.</p>
        </header>

        <div class="ticker">
            <span class="tlabel">NOW TENDING ▸ </span>
            <div class="tending">
                <span class="tend"><span class="stagedot stage-growing"></span><span class="nm">bracket-game</span></span>
            </div>
        </div>

        <section class="index">
            <div class="indexhead">
                <h2>The Index <span class="count" id="count">- { count } entries</span></h2>
            </div>
        </section>
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