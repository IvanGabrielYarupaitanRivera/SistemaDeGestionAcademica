### 🧠 Principio KISS (Keep It Simple, Stupid)

````markdown
1. **Componentes Minimalistas**:

```svelte
<!-- ✅ Simple y directo -->
<script>
  let count = $state(0);
  const increment = () => count++;
</script>

<button onclick={increment}>
  Clicks: {count}
</button>

<!-- ❌ Over-engineering innecesario -->
<script>
  import { CounterController, CounterView } from './counter-framework';
  const counter = new CounterController();
</script>

<CounterView {counter} />
```
````

2. **Lógica en Scripts**:

```svelte
<!-- ✅ Lógica separada -->
<script>
	let searchTerm = $state('');
	const filteredItems = $derived(items.filter((item) => item.includes(searchTerm)));
</script>

<!-- ❌ Lógica compleja en template -->
{#each items.filter((i) => i.includes($state(''))) as item}
	...
{/each}
```

3. **Reglas de Oro**:

```markdown
- Mantener componentes bajo 150 líneas de código
- Evitar más de 3 niveles de anidamiento lógico
- Preferir código nativo sobre abstracciones prematuras
- Eliminar código comentado/no usado
- Priorizar `$derived` sobre estado duplicado
```

### 🚀 Core Svelte 5 Patterns

```svelte
<script>
	// Reactividad
	let count = $state(0);
	const double = $derived(count * 2);

	// Efectos
	$effect(() => {
		console.log(count);
		return () => {
			/* cleanup */
		};
	});

	// Props modernas
	let { form, value = $bindable() } = $props();
</script>

<!-- Bindings y Eventos -->
<input bind:value on:keydown={handleKey} />
```

---

### 📝 Formularios SvelteKit (Buenas Prácticas)

```svelte
<script>
	import { enhance } from '$app/forms';
	/** @type {import('./$types').ActionData} */
	let { form } = $props();
</script>

<form use:enhance method="POST">
	<input type="email" name="email" required aria-label="Email" class="input-primary" />

	{#if form?.message}
		<div class:success={form.success} role="alert">
			{form.message}
		</div>
	{/if}
</form>
```

---

### ⚡ Optimizaciones Clave

```svelte
<!-- Gestión de estado complejo -->
<script>
	let user = $state({
		name: 'Ada',
		permissions: $derived(roles.admin)
	});
</script>

<!-- Prefetching -->
<a href="/dashboard" data-sveltekit-preload>Dashboard</a>
```

---

### 🛡️ TypeScript Essentials

```typescript
// app.d.ts
declare global {
	namespace App {
		interface PageData {
			form?: {
				success: boolean;
				message: string;
				errors?: Record<string, string>;
			};
		}
	}
}
```

---

### 🧪 Testing Patterns

```javascript
test('muestra error de email inválido', async () => {
	mockActionResponse({ success: false, message: 'Email inválido' });

	const { findByRole } = render(Component);
	expect(await findByRole('alert')).toHaveTextContent('Email inválido');
});
```

---

### 🔄 Flujo Server-Client

```javascript
// +page.server.js
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		// Validación server-side
		return { success: true, message: 'Éxito!' };
	}
};
```

---

### 🚫 Anti-Patrones

```markdown
- ❌ Usar `export let` para props
- ❌ Mutar estado sin `$state`
- ❌ Validación solo en cliente
- ❌ Mezclar `on:event` y `onevent`
```

---

### 📍 Notas Clave

```markdown
1. Siempre usar `use:enhance` en formularios
2. Priorizar `$derived` sobre `$:`
3. Implementar ARIA en elementos dinámicos
4. Usar tipado estricto para props
5. Limpiar efectos con return function
6. No usar on:click, usar onclick
```
