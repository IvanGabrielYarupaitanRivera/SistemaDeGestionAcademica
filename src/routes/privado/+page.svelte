<script lang="ts">
	let { data } = $props();
	let { user } = $derived(data);
</script>

<h2>Bienvenido: {user?.email}</h2>
