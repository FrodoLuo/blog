export {};
declare global {
  interface Window {
    launchLive2d: (canvas: HTMLCanvasElement, options: any) => void;
  }
}
