<script setup lang="ts">
    import { ref, watch } from "vue";
    import { simplify } from "mathjs";
    import GraphCanvas from "./components/GraphCanvas.vue"
    import GraphPlotter from "./components/GraphPlotter.vue"
    import { useRoute } from 'vue-router';

    let expressions = [
        "x",
        "2x",
        "x*x",
        "sin(x)",
    ];

    let index = 0;

    const userExpression = ref(null);
    const testExpression = ref(expressions[index]);

    let equal = false;

    const nextButton = ref(null);

    const nextExpression = () => {
        if (equal) {
            index += 1;
            testExpression.value = expressions[index % expressions.length];
            userExpression.value = null;
            reCheck();
        }
    };

    const reCheck = () => {
        try {
            const expr1 = simplify(String(userExpression.value));
            const expr2 = simplify(String(testExpression.value));
            equal = expr1.toString() === expr2.toString();
        } catch {
            equal = false;
        }
    };

    watch(() => userExpression.value, reCheck);
</script>

<template>
    <div class="container">
        <h1 v-bind:class="{ hidden: equal}">📉 Match the blue expression!</h1>
        <h1 v-bind:class="{ hidden: !equal}">✅ Correct!</h1>
        <!--<GraphCanvas :width="600" :height="500" :expression="expression" />-->
        <div class="graph-container">
            <GraphPlotter
                :width="600"
                :height="600"
                :expression="String(testExpression)"
                color="#3886c2"
            />
            <GraphPlotter
                :width="600"
                :height="600"
                :expression="String(userExpression)"
                color="#c33"
            />
        </div>
        <form @submit.prevent="nextExpression()" class="input-container">
            <label id="expression-label" for="expression-input">y = </label>
            <input
                id="expression-input"
                v-model="userExpression"
                placeholder="..."
            />
            <button
                id="next-button"
                ref="nextButton"
                type="submit"
                v-bind:class="{ hidden: !equal }"
                @click="nextExpression()"
            >
                Next
            </button>
        </form>
    </div>
</template>

<style scoped>
h1 {
    font-size: 2rem;
}

.hidden {
    display: none;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.graph-container {
    position: relative;
    width: 600px;
    height: 600px;
}

.graph-container > * {
    position: absolute;
    top: 0;
    left: 0;
}

.input-container {
    font-size: 1.3rem;
    color: #c33;
}

.input-container input {
    font-size: inherit;
    background: #333;
    border: none;
    border-radius: 5px;
    outline: none;
    padding: 10px;
}

#next-button {
    background-color: #33cc33;
    padding: 0.5rem 1rem;
    margin: 1px 1px 1px 10px ;
    border-radius: 5px;
}
</style>
