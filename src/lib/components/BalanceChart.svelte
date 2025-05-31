<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { formatCurrency } from '$lib/utils/format.js';

	let { accounts } = $props();

	let canvas;

	onMount(() => {
		if (!accounts || accounts.length === 0) return;

		const ctx = canvas.getContext('2d');
		new Chart(ctx, {
			type: 'pie',
			data: {
				labels: accounts.map(acc => acc.name),
				datasets: [
					{
						label: 'Vermögensverteilung',
						data: accounts.map(acc => acc.balance),
						backgroundColor: [
							'#6A7B8D',
							'#2A2E35',
							'#A0B1C2',
							'#D0D9E0',
							'#8796A1'
						]
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom'
					},
					tooltip: {
						callbacks: {
							label: (ctx) => {
								const value = ctx.parsed;
								return `CHF ${formatCurrency(value)}`;
							}
						}
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		max-width: 500px;
		height: auto;
		display: block;
		margin: 0 auto 24px;
	}
</style>
