<template>
	<div ref="plotContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import functionPlot from 'function-plot';

const props = defineProps({
	expression: {
		type: String,
		required: true
	},
	color: {
		type: String,
		default: 'red'
	},
	// Width and height of the plot
	width: {
		type: Number,
		default: 500
	},
	height: {
		type: Number,
		default: 500
	}
});

const plotContainer = ref(null);

const drawGraph = () => {
	// Clear any existing plot by resetting the innerHTML
	if (plotContainer.value) {
		plotContainer.value.innerHTML = "";
	}

	try {
		functionPlot({
            target: plotContainer.value,
            width: props.width,
            height: props.height,
            grid: true,
            yAxis: { domain: [-7, 7] },
            xAxis: { domain: [-7, 7] },
			disableZoom: true,
            data: [{
                fn: props.expression,
                color: props.color,
                sampler: 'builtIn',
                graphType: 'polyline',
				updateOnMouseMove: false,
            }]
        });
	} catch {}
};

onMounted(() => {
	drawGraph();
});

// Redraw the graph whenever the expression prop changes.
watch(() => props.expression, drawGraph);
</script>

<style scoped>
</style>
