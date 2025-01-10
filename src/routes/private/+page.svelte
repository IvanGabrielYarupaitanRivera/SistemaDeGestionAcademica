<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';

	let { data } = $props();
	let { notes, supabase, user } = $derived(data);

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
		evt.preventDefault();
		if (!evt.target) return;

		const form = evt.target as HTMLFormElement;

		const note = (new FormData(form).get('note') ?? '') as string;
		const user_id = (new FormData(form).get('user_id') ?? '') as string;
		if (!note) return;

		const { error } = await supabase.from('notes').insert({ note, user_id });
		if (error) console.error(error);

		invalidate('supabase:db:notes');
		form.reset();
	};
</script>

<h1 class="mb-4 text-2xl font-bold">Private page for user: {user?.email}</h1>
<h1 class="mb-4 text-2xl font-bold">Private page for user: {user?.id}</h1>

<h2 class="mb-2 text-xl font-semibold">Notes</h2>

<ul class="mb-4 list-inside list-disc">
	{#each notes as note}
		<li class="mb-1">{note.note}</li>
	{/each}
</ul>

<form onsubmit={handleSubmit} class="space-y-4">
	<label class="block">
		<span class="text-gray-700">Add a note</span>
		<input
			name="note"
			type="text"
			class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
		/>
		<input
			name="user_id"
			type="text"
			value={user?.id}
			class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
		/>
	</label>
	<button type="submit" class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		>Enviar</button
	>
</form>
