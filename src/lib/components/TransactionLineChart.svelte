<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";
	import dayjs from "dayjs";

	let { transactions } = $props();
	let canvas;

	onMount(() => {
		if (!transactions || transactions.length === 0) return;

		const grouped = {};

		transactions.forEach((t) => {
			const isoDate = t.date.slice(0, 10);
			if (!grouped[isoDate]) {
				grouped[isoDate] = { income: 0, expense: 0 };
			}
			if (t.type === "income") grouped[isoDate].income += t.amount;
			if (t.type === "expense")
				grouped[isoDate].expense += Math.abs(t.amount);
		});

		// Sortierte ISO-Daten
		const sortedIsoDates = Object.keys(grouped).sort(
			(a, b) => new Date(a) - new Date(b),
		);

		// Datenreihen
		const incomeData = sortedIsoDates.map((d) => grouped[d].income);
		const expenseData = sortedIsoDates.map((d) => grouped[d].expense);

		// Labels mit dayjs im "de-CH"-Stil
		const labels = sortedIsoDates.map((date) =>
			dayjs(date).format("DD.MM.YYYY"),
		);

		const ctx = canvas.getContext("2d");
		new Chart(ctx, {
			type: "line",
			data: {
				labels, // ← de-CH Labels!
				datasets: [
					{
						label: "Einnahmen",
						data: incomeData,
						borderColor: "#4caf50",
						tension: 0.3,
					},
					{
						label: "Ausgaben",
						data: expenseData,
						borderColor: "#f44336",
						tension: 0.3,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: "top",
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: "CHF",
						},
					},
					x: {
						title: {
							display: true,
							text: "Datum",
						},
					},
				},
			},
		});
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		max-width: 100%;
		margin: 24px 0;
	}
</style>
