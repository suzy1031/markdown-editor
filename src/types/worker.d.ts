declare module 'worker-loader!*' {
  class WebPackWorker extends Worker {
    constructor();
  }

  export default WebPackWorker;
}