<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="border p-3">
          <div class="fs-3 fw-bold text-center">Konva Drawing</div>
          <div class="row mt-2">
            <div class="dropdown col-4">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tool:
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a class="dropdown-item" @click="mode = 'brush'">Brush</a>
                </li>
                <li>
                  <a class="dropdown-item" @click="mode = 'eraser'">Eraser</a>
                </li>
              </ul>
            </div>
            <div class="col-4">
              <button class="btn btn-danger" @click="clearCanvas">
                Clear Canvas
              </button>
            </div>
            <div class="col-4">
              <button class="btn btn-primary" @click="exportCanvas">
                Export as Image
              </button>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-10">
              <input
                type="color"
                v-model="brushColor"
                class="form-control mt-3"
                @input="updateBrushColor"
              />
            </div>
          </div>
          <div ref="container" class="drawing-area mt-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Konva from "konva";

export default {
  data() {
    return {
      mode: "brush",
      isPaint: false,
      lastPointerPosition: null,
      brushColor: "#df4b26",
      stage: null,
      layer: null,
      canvas: null,
    };
  },
  mounted() {
    const width = window.innerWidth;
    const height = window.innerHeight - 25;

    // Create Konva Stage and Layer
    this.stage = new Konva.Stage({
      container: this.$refs.container,
      width: width,
      height: height,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    // Create a canvas element and add it to the layer
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.stage.width();
    this.canvas.height = this.stage.height();

    const image = new Konva.Image({
      image: this.canvas,
      x: 0,
      y: 0,
    });
    this.layer.add(image);

    // Get the 2D context
    const context = this.canvas.getContext("2d");
    context.strokeStyle = this.brushColor; // Set the brush color

    // Bind events
    context.lineJoin = "round";
    context.lineWidth = 5;

    // Bind events
    image.on("mousedown touchstart", () => {
      this.isPaint = true;
      this.lastPointerPosition = this.stage.getPointerPosition();
    });

    this.stage.on("mouseup touchend", () => {
      this.isPaint = false;
    });

    this.stage.on("mousemove touchmove", () => {
      if (!this.isPaint) {
        return;
      }
      if (this.mode === "brush") {
        context.globalCompositeOperation = "source-over";
      }
      if (this.mode === "eraser") {
        context.globalCompositeOperation = "destination-out";
      }
      context.beginPath();

      const localPos = {
        x: this.lastPointerPosition.x - image.x(),
        y: this.lastPointerPosition.y - image.y(),
      };
      context.moveTo(localPos.x, localPos.y);
      const pos = this.stage.getPointerPosition();
      const localPos2 = {
        x: pos.x - image.x(),
        y: pos.y - image.y(),
      };
      context.lineTo(localPos2.x, localPos2.y);
      context.closePath();
      context.stroke();

      this.lastPointerPosition = pos;
      this.layer.batchDraw();
    });
  },
  methods: {
    updateBrushColor() {
      // Handle color input changes here if needed
      const context = this.canvas.getContext("2d");
      context.strokeStyle = this.brushColor;
    },
    clearCanvas() {
      // Clear the entire canvas
      const context = this.canvas.getContext("2d");
      context.clearRect(0, 0, this.stage.width(), this.stage.height());
      this.layer.batchDraw();
    },
    exportCanvas() {
      // Export the canvas as an image
      const dataURL = this.canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "canvas_image.png";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>

<style scoped></style>
