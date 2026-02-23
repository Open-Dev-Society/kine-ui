import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from "@mediapipe/tasks-vision";

export class KineEngine {
  private static instance: KineEngine | null = null;
  private handLandmarker: HandLandmarker | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private isInitialized = false;

  private constructor() { }

  public static getInstance(): KineEngine {
    if (!KineEngine.instance) {
      KineEngine.instance = new KineEngine();
    }
    return KineEngine.instance;
  }

  public async initialize(videoElement: HTMLVideoElement) {
    // Always update the video element reference so navigation works
    this.videoElement = videoElement;

    // Only download and create the HandLandmarker once
    if (this.isInitialized) return;

    // Load Wasm files from unpkg/jsdelivr
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    // Initialize HandLandmarker
    this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
    });

    this.isInitialized = true;
  }

  public detectHands(timeInMs: number): HandLandmarkerResult | null {
    if (!this.handLandmarker || !this.videoElement || this.videoElement.readyState < 2) {
      return null;
    }
    return this.handLandmarker.detectForVideo(this.videoElement, timeInMs);
  }
}

export const engine = KineEngine.getInstance();
