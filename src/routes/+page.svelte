<script>
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
    }
</script>

<div class="wrap">
    <aside class="sidebar">
        <div class="brand">
            <span class="wordmark">Golly's<br><b>Garden</b></span>
        </div>
        <p class="tagline">a digital garden of games<br>&amp; little web experiments</p>
        <nav>

        </nav>
    </aside>
</div>

<style>
    .wrap{
        position:relative; 
        z-index:1; 
        display:grid; 
        grid-template-columns:268px 1fr;
        max-width:1240px; 
        margin:0 auto; 
        min-height:100vh
    }
    h1, h2, h3 {
        font-family: var(--pixel);
        font-size: 64px;
    }

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
        font-size:48px; 
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

    }
</style>