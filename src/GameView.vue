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
    const helpExpression = ref("sin(x)");
    const testExpression = ref(expressions[index]);

    let equal = false;

    const nextButton = ref(null);

    const getFinalExpression = (value) => String(value)
        .replace(/pi/g, `(${Math.PI})`);

    const nextExpression = () => {
        if (equal) {
            index = (index + 1) % expressions.length;
            testExpression.value = expressions[index];
            userExpression.value = null;
            reCheck();
        }
    };

    const reCheck = () => {
        try {
            const expr1 = simplify(getFinalExpression(userExpression.value));
            const expr2 = simplify(getFinalExpression(testExpression.value));
            equal = expr1.toString() === expr2.toString();
        } catch {
            equal = false;
        }
    };

    watch(() => userExpression.value, reCheck);
</script>

<template>
    <div class="container">
        <div class="heading-container">
            <h1 v-bind:class="{ hidden: equal}">📉 Match the blue expression!</h1>
            <h1 v-bind:class="{ hidden: !equal}">✅ Correct!</h1>
            <h2>Level: {{ index + 1 }}/{{ expressions.length }}</h2>
        </div>
        <!--<GraphCanvas :width="600" :height="500" :expression="expression" />-->
        <div class="graph-container">
            <GraphPlotter
                :width="600"
                :height="600"
                :expression="getFinalExpression(helpExpression)"
                color="#da1"
            />
            <GraphPlotter
                :width="600"
                :height="600"
                :expression="getFinalExpression(testExpression)"
                color="#3886c2"
            />
            <GraphPlotter
                :width="600"
                :height="600"
                :expression="getFinalExpression(userExpression)"
                color="#c33"
            />
        </div>
        <form @submit.prevent="nextExpression()" class="input-container">
            <label id="expression-label" for="expression-input">riešenie y = </label>
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
        <form @submit.prevent="" class="input-container">
            <label id="help-label" for="help-input">pomocné z = </label>
            <input
                id="help-input"
                v-model="helpExpression"
                placeholder="..."
            />
        </form>
    </div>
</template>

<style scoped>
.heading-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

h1 {
    font-size: 2rem;
    margin: 0;
}

h2 {
    font-size: 1.5rem;
    margin: 0;
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
}

#expression-label {
    color: #c33;
}

#help-label {
    color: #da1;
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
