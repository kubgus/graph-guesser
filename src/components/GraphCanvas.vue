<script lang="ts">
import { ref, onMounted, watch } from "vue";

export default {
    name: "GraphCanvas",
    props: {
        expression: {
            type: String,
            required: true,
        },
        width: {
            type: Number,
            default: 300,
        },
        height: {
            type: Number,
            default: 300,
        },
        color: {
            type: String,
            default: 'red'
        }
    },
    setup(props) {
        const canvas = ref(null);

        const drawGraph = () => {
            const ctx = canvas.value.getContext("2d");
            ctx.clearRect(0, 0, props.width, props.height);

            // Draw coordinate axes (centered)
            ctx.strokeStyle = '#ccc';
            ctx.beginPath();
            // horizontal axis
            ctx.moveTo(0, props.height / 2);
            ctx.lineTo(props.width, props.height / 2);
            // vertical axis
            ctx.moveTo(props.width / 2, 0);
            ctx.lineTo(props.width / 2, props.height);
            ctx.stroke();

            // Compile the expression into a function of x.
            let fn;
            try {
              fn = new Function('x', 'return ' + props.expression);
            } catch (error) {
              console.error('Invalid expression:', error);
              return;
            }

            // Draw the graph
            ctx.strokeStyle = props.color;
            ctx.beginPath();
            const scale = 20; // pixels per unit; adjust as needed

            for (let pixelX = 0; pixelX < props.width; pixelX++) {
              // Convert pixel coordinate to x-value (centered at canvas center)
              const x = (pixelX - props.width / 2) / scale;
              let y;
              try {
                y = fn(x);
              } catch (error) {
                // Skip invalid function values
                continue;
              }
              // Convert the computed y-value to canvas pixel coordinates
              const pixelY = props.height / 2 - y * scale;

              if (pixelX === 0) {
                ctx.moveTo(pixelX, pixelY);
              } else {
                ctx.lineTo(pixelX, pixelY);
              }
            }
            ctx.stroke();
        };

        onMounted(() => {
            // Set canvas dimensions
            canvas.value.width = props.width;
            canvas.value.height = props.height;
            drawGraph();
        });

        watch(() => props.expression, drawGraph);

        return { canvas };
    },
}
</script>

<template>
    <canvas ref="canvas"></canvas>
</template>
