import WebSocket from "ws";
import fs from "fs";
import FormData from "form-data";
import seedrandom from "seedrandom";
import dotenv from "dotenv";
dotenv.config();
import * as comfyApi from "../apis/comfyEndpointApi.js";

const COMFY_UI_PORT = process.env.COMFY_UI_PORT || 8188;
const COMFY_UI_ADDRESS = process.env.COMFY_UI_ADDRESS || "localhost";

const step = 50;
const loras = {
  neoclassic: {
    lora_name: "neoclassic_interior_lora.safetensors",
    trigger_words: "neoclassic",
    prompt_style: "elegant, classical, ornate, rich textures, symmetrical, vintage",
    clip_skip: 1,
  },
  japanese: {
    lora_name: "japanese_interior_lora.safetensors",
    trigger_words: "Japanese Interior",
    prompt_style: "minimal, serene, natural materials, zen, tatami, shoji screens",
    clip_skip: 1,
  },
  luxury: {
    lora_name: "luxury_interior_lora.safetensors",
    trigger_words: "tfz_poliform",
    prompt_style: "opulent, high-end, sleek, modern, lavish materials, designer furniture",
    clip_skip: 1,
  },
  minimalist: {
    lora_name: "minimalist_interior_lora.safetensors",
    trigger_words: "archminimalist",
    prompt_style: "clean lines, open space, neutral colors, functional, uncluttered, modern",
    clip_skip: 1,
  },
  indochine: {
    lora_name: "indochine_interior_lora.safetensors",
    trigger_words: "indochine",
    prompt_style: "exotic, vibrant, wood, tropical, antique accents, fusion of Eastern and Western elements",
    clip_skip: 1,
  },

}

// const loras = {
//   neoclassic: {
//     lora_name: "neoclassic_interior_lora.safetensors",
//     trigger_words: "neoclassic",
//     prompt_style:
//       "A sophisticated and timeless design with ornate details, symmetrical layouts, luxurious materials, and neutral color palettes. Includes classical furniture and decorative elements.",
//     clip_skip: 1,
//   },
//   japanese: {
//     lora_name: "japanese_interior_lora.safetensors",
//     trigger_words: "Japanese Interior",
//     prompt_style:
//       "A serene and minimalist aesthetic focusing on natural materials like wood and paper, sliding doors, tatami mats, and harmonious color tones inspired by nature.",
//     clip_skip: 1,
//   },
//   luxury: {
//     lora_name: "luxury_interior_lora.safetensors",
//     trigger_words: "tfz_poliform",
//     prompt_style:
//       "High-end and elegant interiors with premium materials such as marble, gold accents, plush fabrics, and designer furniture. Emphasis on grandeur and exclusivity.",
//     clip_skip: 1,
//   },
//   minimalist: {
//     lora_name: "minimalist_interior_lora.safetensors",
//     trigger_words: "archminimalist",
//     prompt_style:
//       "A clean and simple design style with an emphasis on functionality, open spaces, and neutral color schemes. Features minimal decoration and sleek modern furniture.",
//     clip_skip: 1,
//   },
//   indochine: {
//     lora_name: "indochine_interior_lora.safetensors",
//     trigger_words: "indochine",
//     prompt_style:
//       "A unique blend Southeast Asian design.",
//     clip_skip: 1,
//   },
// };
class ComfyUIController {
  constructor() {
    this.workflow = {
      text2image: JSON.parse(
        fs.readFileSync("./workflows/workflow_api_text2image.json", "utf8"),
      ),
      sketch2image: JSON.parse(
        fs.readFileSync("./workflows/workflow_api_sketch2image.json", "utf8"),
      ),
    };
  }

  async connect() {
    this.ws = new WebSocket(`ws://${COMFY_UI_ADDRESS}:${COMFY_UI_PORT}/ws`);
    // this.ws = new WebSocket(`ws://3.236.252.8:8188/ws`);
    this.ws.on("open", async () => {
      try {
        console.log(
          `Open WebSocket to ComfyUI on: http://${COMFY_UI_ADDRESS}:${COMFY_UI_PORT}`,
        );
      } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
      }
    });

    this.ws.on("close", async () => {
      try {
        console.log(`Close ComfyUI socket`);
      } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
      }
    });
  }

  async destroy() {
    this.ws.close();
    this.workflow = null;
  }

  arrayBufferToBase64(buffer) {
    const base64Image = buffer.toString("base64");
    const base64ImageURL = `data:image/png;base64,${base64Image}`;
    return base64ImageURL;
  }

  async generateImageByText(req, res) {
    const inputs = req.body;
    try {
      await this.connect();
      const prompt = await this.promptImageByText(
        this.workflow.text2image,
        inputs,
      );
      const {
        data: { prompt_id },
      } = await comfyApi.getQueuePrompt(prompt);
      await this.trackProgress(prompt, prompt_id);
      const history = await this.getHistory(prompt_id);
      const images = await this.getImages(history);
      return res.status(200).json({ img: Object.values(images)[0][0] });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async promptImageByText(prompt, inputs) {
    try {
      const { positive, negative, size, style } = inputs;
      const text2imagePrompt = JSON.parse(JSON.stringify(prompt));
      Object.entries(text2imagePrompt).forEach(([key, value]) => {
        if (value.class_type === "KSampler") {
          const seed = Math.floor(Math.random() * 9e14) + 1e14;
          text2imagePrompt[key]["inputs"]["seed"] = seed;
          text2imagePrompt[key]["inputs"]["steps"] = step;
        }
        if (value.class_type === "EmptyLatentImage") {
          text2imagePrompt[key]["inputs"]["width"] = size?.width ?? 512;
          text2imagePrompt[key]["inputs"]["height"] = size?.height ?? 512;
        }
        if (value.class_type === "CLIPTextEncode") {
          if (value?._meta?.title === "negative") {
            text2imagePrompt[key]["inputs"]["text"] += ", " + negative;
          } else {
            if (loras.hasOwnProperty(style)) {
              text2imagePrompt[key]["inputs"]["text"] +=
                ", " + loras[style]?.trigger_words;
              text2imagePrompt[key]["inputs"]["text"] +=
                ", " + loras[style]?.prompt_style;
            }
            text2imagePrompt[key]["inputs"]["text"] += ", " + positive;
          }
        }
        if (value.class_type === "CR Load LoRA") {
          if (value?._meta?.title === "load lora") {
            if (style === "none") {
              text2imagePrompt[key]["inputs"]["switch"] = "Off";
            } else {
              text2imagePrompt[key]["inputs"]["switch"] = "On";
              text2imagePrompt[key]["inputs"]["lora_name"] =
                loras[style]?.lora_name;
            }
          }
        }
        if (value.class_type === "CLIPSetLastLayer") {
          if (loras.hasOwnProperty(style)) {
            text2imagePrompt[key]["inputs"]["stop_at_clip_layer"] =
              -loras[style]?.clip_skip;
          }
        }
      });
      return text2imagePrompt;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async generateImageBySketch(req, res) {
    const inputs = req.body;
    try {
      await this.connect();
      const buffer = Buffer.from(
        String(inputs.image.image).split(",")[1],
        "base64",
      );
      const result = await this.uploadImage(buffer, inputs.image.name);
      const prompt = await this.promptImageBySketch(
        this.workflow.sketch2image,
        inputs,
      );
      const {
        data: { prompt_id },
      } = await comfyApi.getQueuePrompt(prompt);
      await this.trackProgress(prompt, prompt_id);
      const history = await this.getHistory(prompt_id);
      const images = await this.getImages(history);
      return res.status(200).json({ img: Object.values(images)[0][0] });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async promptImageBySketch(prompt, inputs) {
    try {
      const { positive, negative, size, image, style } = inputs;
      const sketch2imagePrompt = JSON.parse(JSON.stringify(prompt));
      Object.entries(sketch2imagePrompt).forEach(([key, value]) => {
        if (value.class_type === "KSampler") {
          const seed = Math.floor(Math.random() * 9e14) + 1e14;
          sketch2imagePrompt[key]["inputs"]["seed"] = seed;
        }
        if (value.class_type === "CLIPTextEncode") {
          if (value?._meta?.title === "negative") {
            sketch2imagePrompt[key]["inputs"]["text"] += ", " + negative;
          } else {
            if (loras.hasOwnProperty(style)) {
              sketch2imagePrompt[key]["inputs"]["text"] +=
                ", " + loras[style]?.trigger_words;
              sketch2imagePrompt[key]["inputs"]["text"] +=
                ", " + loras[style]?.prompt_style;
            }
            sketch2imagePrompt[key]["inputs"]["text"] += ", " + positive;
          }
        }
        if (value.class_type === "LoadImage") {
          sketch2imagePrompt[key]["inputs"]["image"] = image.name;
        }
        if (value.class_type === "CR Load LoRA") {
          if (value?._meta?.title === "load lora") {
            if (style === "none") {
              sketch2imagePrompt[key]["inputs"]["switch"] = "Off";
            } else {
              sketch2imagePrompt[key]["inputs"]["switch"] = "On";
              sketch2imagePrompt[key]["inputs"]["lora_name"] =
                loras[style]?.lora_name;
            }
          }
        }
        if (value.class_type === "CLIPSetLastLayer") {
          if (loras.hasOwnProperty(style)) {
            sketch2imagePrompt[key]["inputs"]["stop_at_clip_layer"] =
              -loras[style]?.clip_skip;
          }
        }
      });

      return sketch2imagePrompt;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getQueuePrompt(prompt) {
    try {
      const { data } = await comfyApi.getQueuePrompt(prompt);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getHistory(prompt_id) {
    try {
      const { data } = await comfyApi.getHistory(prompt_id);
      return data[prompt_id];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getImage(filename, subfolder, type) {
    try {
      const params = new URLSearchParams({
        filename: filename,
        subfolder: subfolder,
        type: type,
      });
      const { data } = await comfyApi.getView(params.toString());
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getImages(history) {
    const output = {};

    try {
      for (const nodeId in history.outputs) {
        const nodeOutput = history.outputs[nodeId];
        if (nodeOutput.images) {
          const arr = [];
          for (const image of nodeOutput.images) {
            const imageData = await this.getImage(
              image.filename,
              image.subfolder,
              image.type,
            );
            arr.push(this.arrayBufferToBase64(imageData));
          }
          output[nodeId] = arr;
        }
      }
      return output;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async uploadImage(buffer, filename, imageType = "input", overwrite = false) {
    const formData = new FormData();
    formData.append("image", buffer, {
      filename: filename,
      contentType: "image/png",
    });
    formData.append("type", "input");
    formData.append("overwrite", overwrite.toString().toLowerCase());

    try {
      const { data } = await comfyApi.uploadImage(formData);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async trackProgress(prompt, promptId) {
    this.isLoading = 0;

    // Xóa sự kiện message nếu đã tồn tại để tránh đăng ký nhiều lần
    if (this.messageHandler) {
      this.ws.off("message", this.messageHandler);
    }

    // Định nghĩa và gán messageHandler mới
    return new Promise((resolve, reject) => {
      this.messageHandler = (message) => {
        try {
          const out = Buffer.isBuffer(message)
            ? JSON.parse(message.toString())
            : JSON.parse(message);

          if (out.type === "progress") {
            const data = out.data;
            const currentStep = data.value;
            console.log(
              `In K - Sampler -> Step: ${currentStep} of: ${data.max}`,
            );
            if (currentStep === data.max) {
              this.isLoading = 1;
            }
          }

          if (out.type === "status") {
            const { queue_remaining } = out.data.status.exec_info;

            if (queue_remaining === 0 && this.isLoading === 1) {
              console.log("Completed");
              resolve("success"); // Gọi resolve khi hoàn tất
              this.ws.off("message", this.messageHandler); // Gỡ sự kiện sau khi hoàn thành
            }
          }
        } catch (error) {
          reject(error); // Gọi reject nếu có lỗi
        }
      };

      this.ws.on("message", this.messageHandler); // Đăng ký messageHandler
    });
  }
}

export default ComfyUIController;
