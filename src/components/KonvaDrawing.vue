<template>
  <div>
    <v-stage :config="stageConfig">
      <v-layer>
        <v-rect
          :config="rectConfig"
          @click="changeColor"
          :stroke="rectStroke"
          :strokeWidth="3"
        />
      </v-layer>
    </v-stage>
    <button @click="changeColor">Change Color</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stageConfig: {
        width: 400,
        height: 400,
      },
      rectConfig: {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        fill: "green",
      },
      rectStroke: "black", // Border color
    };
  },
  methods: {
    changeColor() {
      // Toggle between green and blue
      this.rectConfig.fill =
        this.rectConfig.fill === "green" ? "blue" : "green";
    },
  },
};
</script>
