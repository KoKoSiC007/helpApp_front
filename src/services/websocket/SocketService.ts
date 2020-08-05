export default class SocketService {
    private url: string = 'ws://localhost:5000/ws'
    private socket: WebSocket;
    constructor() {
        this.socket = new WebSocket(this.url);
        this.socket.onclose = this.onClose;
        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
    }

    public onMessage(call: any){
        this.socket.onmessage = call;
    }

    public send(data: string){
        this.socket.send(data);
    }

    public onError(error: any){
        console.error(error);
    }
    public onOpen(data: any){
        console.warn("Connection established");
    }
    public onClose(data: any){
        console.warn("Connection closed");
    }
}
