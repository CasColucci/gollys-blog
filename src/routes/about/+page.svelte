

<script>
    import Footer from "$lib/components/Footer.svelte";
</script>

<main>
    <h1>Hi! I'm <span class="highlight">Golly</span>.</h1>
    <p class="about-lead">Programmer, tinkerer, perpetual project-starter. I like making games and web things, and I'm trying to write up what I learn!</p>
    <div class="about-grid">
        <div class="avatar"><img src="/Avatar.png" alt="My Icon"></div>
        <div class="about-bio">
            <p>Writing, programming, and generally being busy! I love experimenting and seeing what I can do.</p>
            <p>Aside from programming, I love animals and creating things for people to enjoy. I love thinking outside the box.</p>
            <p>If something here is useful, broken, or sparks an idea, feel free to <a href="mailto:golly@zegollygosh.com">say hi</a>!</p>
            <p>(Also this avatar is a picrew done by <a href="https://picrew.me/en/image_maker/112842">viiolaceus</a>!)</p>
        </div>
    </div>

    <div class="nowbox">
        <h3><span class="stagedot stage-growing"></span>/ now growing this season</h3>
        <p class="nowsub">what I'm actively working on, updating whenever it changes (or I remember)</p>
        <div class="nowlist">
            <div class="nowitem"><span class="stagedot stage-seedling"></span><span class="nm">bracket-game</span><span class="ds">: Making a C# and React game where users can run vote-based brackets with their friends in the browser!</span></div>
        </div>
    </div>

    <p class="about-h">Find me elsewhere!</p>
    <div class="biglinks">
        <a href="#" class="biglink">
            <span><span class="bl-t">GitHub</span><br><span class="bl-s">Check out my code, half-finished and otherwise!</span></span>
            <span class="ar">→</span>
        </a>
        <a href="https://cascolucci.com/" class="biglink">
            <span><span class="bl-t">My Freelancing Site</span><br><span class="bl-s">Feel free to contact me about any projects you're working on!</span></span>
            <span class="ar">→</span>
        </a>
        <a href="https://bsky.app/profile/zegollygosh.bsky.social" class="biglink">
            <span><span class="bl-t">BlueSky</span><br><span class="bl-s">Prefer social media? Come join me on BlueSky!</span></span>
            <span class="ar">→</span>
        </a>
        <a href="mailto:golly@zegollygosh.com" class="biglink">
            <span><span class="bl-t">Email</span><br><span class="bl-s">Wanna contact me the old fashioned way? Feel free to reach out!</span></span>
            <span class="ar">→</span>
        </a>
    </div>
    <Footer />
</main>

<style>
    main {
        max-width: 740px;
        margin: 0 auto;
        padding: 6px 0 30px;
    }

    h1 {
        font-family: var(--pixel);
        font-weight: 700;
        font-size: 42px;
        line-height: 1;
        margin: 0 0 18px;
        letter-spacing: .5px;
        .highlight {
            color: var(--accent);
        }
    }

    .about-lead {
        font-family: var(--serif);
        font-size: 24px;
        line-height: 1.45;
        color: var(--ink-2);
        margin: 0 0 36px;
        max-width: 600px;
    }

    .about-grid {
        display: grid;
        grid-template-columns: 210px 1fr;
        gap: 34px;
        align-items: start;
        margin-bottom: 38px;
    }

    .avatar {
        height: 240px;
        border-radius: 14px;
        border: 1.5px solid var(--line);
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .about-bio {
        font-family: var(--mono);
        font-size: 16px;
        color: var(--ink-2);

        p {
            margin: 0 0 16px;
        }

        a {
            color: var(--accent);
            text-decoration: underline;
            text-decoration-color: var(--accent-line);
            text-underline-offset: 3px;
        }
    }

    .nowbox {
        border: 1.5px solid var(--line-2);
        border-radius: 13px;
        padding: 22px 24px;
        margin-bottom: 34px;
        background: var(--card);

        h3 {
            font-family: var(--mono);
            font-size: 14px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--accent);
            margin: 0 0 6px;
            display: flex;
            align-items: center;
            gap: 9px;
        }

        .nowsub {
            font-family: var(--mono);
            font-size: 12px;
            color: var(--ink-3);
            margin: 0 0 16px;
        }
    }

    .nowlist {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .nowitem {
        display: flex;
        align-items: baseline;
        gap: 12px;
        font-family: var(--mono);
        font-size: 14px;
        color: var(--ink);

        .nm {
            font-weight: 700;
        }

        .ds {
            color: var(--ink-2);
            font-size: 14px;
        }
    }

    .about-h {
        font-family: var(--mono);
        font-size: 12px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--ink-3);
        margin: 0 0 16px;
    }

    .biglinks {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .biglink {
        border: 1.5px solid var(--line-2);
        border-radius: 11px;
        padding: 15px 17px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: border-color .12s, background .12s;
    }

    .biglink:hover {
        border-color: var(--accent);
        background: var(--accent-soft);
    }

    .biglink .bl-t {
        font-family: var(--mono);
        font-weight: 700;
        font-size: 14px;
        color: var(--ink);
    }

    .biglink .bl-s {
        font-family: var(--mono);
        font-size: 12px;
        color: var(--ink-3);
    }

    .biglink:hover .ar {
        transform: translateX(3px);
        color: var(--accent);
    }

    .biglink:hover .bl-t {
        color: var(--accent);
    }

    @media(max-width: 880px) {
        main {
            padding: 28px 22px 56px;
        }
        .biglinks {
            grid-template-columns: 1fr;
        }
    }

    @media(max-width: 500px) {
        .about-grid {
            grid-template-columns: 1fr;
        }

        .avatar {
            height: 200px;
        }
    }
</style>