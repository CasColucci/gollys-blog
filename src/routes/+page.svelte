<script>
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
    }
</script>

<h1>Golly's Blog</h1>
<button id="theme-toggle" aria-label="Toggle theme" onclick={toggleTheme}>Toggle Theme</button>

<style>
    h1, h2, h3 {
        font-family: 'SpicyRice', serif;
        font-size: 64px;
    }
</style>