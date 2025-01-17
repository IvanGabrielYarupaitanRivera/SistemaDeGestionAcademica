<script>
	import Header from './components/HeaderPrivado/Header.svelte';
	import Hero from './components/HeroPrivado/Hero.svelte';
	import Main from './components/MainPrivado/Main.svelte';

	let { data } = $props();
</script>

<Header />
<Hero />
<Main />
