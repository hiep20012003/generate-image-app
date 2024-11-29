import WebSocket from "ws";
import fs from "fs";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import dotenv from "dotenv";
dotenv.config();
import * as comfyApi from "../apis/comfyEndpointApi.js";

const COMFY_UI_TEXT_PORT = process.env.COMFY_UI_TEXT_PORT || 8188;
const COMFY_UI_SKETCH_PORT = process.env.COMFY_UI_SKETCH_PORT || 8189;
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
    prompt_style: "minimal, serene, natural materials",
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
    this.sessions = {}; // Lưu trữ thông tin phiên với UUID làm key
    this.workflow = {
      text2image: JSON.parse(
        fs.readFileSync("./workflows/workflow_api_text2image.json", "utf8"),
      ),
      sketch2image: JSON.parse(
        fs.readFileSync("./workflows/workflow_api_sketch2image.json", "utf8"),
      ),
    };
  }

  async connect(clientId, port) {
    try {
      if (!clientId) clientId = uuidv4(); // Tạo UUID mới nếu không có
      if (!this.sessions[clientId]) {
        this.sessions[clientId] = {};
      }
      if(!this.sessions[clientId][port]) {
        let ws = new WebSocket(`ws://${COMFY_UI_ADDRESS}:${port}/ws`);

        this.sessions[clientId][port] = {ws, isLoading: false};
        ws.on("open", () => {
          console.log(`WebSocket connected for client: ${clientId}`);
        });

        ws.on("close", () => {
          console.log(`WebSocket closed for client: ${clientId}`);
          delete this.sessions[clientId]; // Xóa phiên khi đóng
        });

        ws.on("message", (message) => this.handleMessage(clientId, message));
      }
      return clientId; // Trả về clientId để sử dụng
      }
      catch (error) {
        console.error(error);
      }
  }

  handleMessage(clientId, message) {
    const session = this.sessions[clientId];
    if (!session) return;

    try {
      const parsedMessage = JSON.parse(message);
      const ws = session.ws;

      if (parsedMessage.type === "progress") {
        const { value, max } = parsedMessage.data;
        console.log(`Client ${clientId} progress: ${value}/${max}`);
        session.isLoading = value === max; // Cập nhật trạng thái
      } else if (parsedMessage.type === "status") {
        const { queue_remaining } = parsedMessage.data.status.exec_info;
        if (queue_remaining === 0 && session.isLoading) {
          console.log(`Client ${clientId}: Generation completed`);
        }
      }
    } catch (error) {
      console.error(`Error handling message for client ${clientId}:`, error);
    }
  }

  async destroy(clientId) {
    const session = this.sessions[clientId];
    if (session) {
      session.ws.close();
      delete this.sessions[clientId];
      console.log(`Session destroyed for client: ${clientId}`);
    }
  }

  arrayBufferToBase64(buffer) {
    const base64Image = buffer.toString("base64");
    return `data:image/png;base64,${base64Image}`;
  }

  async generateImageByText(req, res) {
    const { client_id,...inputs} = req.body;
    try {
      await this.connect(client_id, COMFY_UI_TEXT_PORT);
      const prompt = await this.promptImageByText(
        this.workflow.text2image,
        inputs,
      );
      const {
        prompt_id
      } = await this.getQueuePrompt(COMFY_UI_TEXT_PORT ,prompt, client_id);
      await this.trackProgress( client_id, COMFY_UI_TEXT_PORT ,prompt, prompt_id);
      const history = await this.getHistory(COMFY_UI_TEXT_PORT, prompt_id);
      const images = await this.getImages(COMFY_UI_TEXT_PORT,history);
      return res.json({ img: Object.values(images)[0][0] });
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
    const {client_id,...inputs} = req.body;
    try {
      await this.connect(client_id, COMFY_UI_SKETCH_PORT);
      const buffer = Buffer.from(
        String(inputs.image.image).split(",")[1],
        "base64",
      );
      const result = await this.uploadImage(COMFY_UI_SKETCH_PORT,buffer, inputs.image.name);
      const prompt = await this.promptImageBySketch(
        this.workflow.sketch2image,
        inputs,
      );
      const {
        prompt_id,
      } = await this.getQueuePrompt(COMFY_UI_SKETCH_PORT,prompt, client_id);
      await this.trackProgress(client_id, COMFY_UI_SKETCH_PORT, prompt, prompt_id);
      const history = await this.getHistory(COMFY_UI_SKETCH_PORT,prompt_id);
      const images = await this.getImages(COMFY_UI_SKETCH_PORT,history);
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

  async getQueuePrompt(port, prompt, client_id) {
    try {
      const { data } = await comfyApi.getQueuePrompt(port, prompt, client_id);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getHistory(port,prompt_id) {
    try {
      const { data } = await comfyApi.getHistory(port,prompt_id);
      return data[prompt_id];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getImage(port,filename, subfolder, type) {
    try {
      const params = new URLSearchParams({
        filename: filename,
        subfolder: subfolder,
        type: type,
      });
      const { data } = await comfyApi.getView(port,params.toString());
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getImages(port,history) {
    const output = {};
    try {
      for (const nodeId in history.outputs) {
        const nodeOutput = history.outputs[nodeId];
        if (nodeOutput.images) {
          const arr = [];
          for (const image of nodeOutput.images) {
            const imageData = await this.getImage(port,
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
  async uploadImage(port,buffer, filename, imageType = "input", overwrite = false) {
    const formData = new FormData();
    formData.append("image", buffer, {
      filename: filename,
      contentType: "image/png",
    });
    formData.append("type", "input");
    formData.append("overwrite", overwrite.toString().toLowerCase());

    try {
      const { data } = await comfyApi.uploadImage(port,formData);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async trackProgress(clientId, port, prompt, promptId) {
    const session = this.sessions[clientId][port];
    // if (!session) throw new Error(`No active session for client: ${clientId}`);
    if (!session) console.log('error');
    const ws = session.ws;
    session.isLoading = true;

    return new Promise((resolve, reject) => {
      const messageHandler = (message) => {
        try {
          const out = Buffer.isBuffer(message)
            ? JSON.parse(message.toString())
            : JSON.parse(message);

          if (out.type === "progress") {
            const { value, max } = out.data;
            console.log(`Client ${clientId} progress: ${value}/${max}`);
            if (value === max) {
              session.isLoading = true;
            }
          }

          if (out.type === "status") {
            const { queue_remaining } = out.data.status.exec_info;
            if (queue_remaining === 0 && session.isLoading) {
              console.log(`Client ${clientId}: Process completed`);
              ws.off("message", messageHandler); // Gỡ handler khi hoàn thành
              resolve("success");
            }
          }
        } catch (error) {
          reject(error);
          ws.off("message", messageHandler); // Gỡ handler khi lỗi
        }
      };

      ws.on("message", messageHandler);
    });
  }

}

export default ComfyUIController;
