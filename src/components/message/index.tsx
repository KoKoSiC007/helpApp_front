import React, {Component} from "react";
import Ticket from "../../models/Ticket";
import SocketService from "../../services/websocket/SocketService";
import './index.scss'
interface IState {
    search: string
    isEmpty: boolean,
    messages: string[]
    tickets: Ticket[]
}
class MessageList extends Component<any, IState>{
    private socketService: SocketService | undefined;
    constructor(props: any) {
        super(props);
        this.state = {
            search: '',
            isEmpty: true,
            messages: [],
            tickets: []
        }
    }
    componentDidMount() {
        this.socketService = new SocketService();
        this.socketService.onMessage(this.onMessageHandler.bind(this));
    }

    render() {
        let messages: any[] = []
        for (let message of this.state.messages){
            messages.push(<label>{message}<br/></label>);
        }
        return (
        <div>
            <input onChange={this.onChangeIn.bind(this)} placeholder="Введите сообщения"/>
            <button onClick={this.sendMessage.bind(this)}>Отослать</button>
            <div  className="message__container">
                {messages}
            </div>
        </div>)
    }

    public onChangeIn(event: any){
        event.preventDefault();
        this.setState({search: event.target.value});
    }
    public onMessageHandler(data: any){
        this.setState({messages: [...this.state.messages, data.data]})
    }
    public sendMessage(){
        this.socketService?.send(this.state.search);
    }
}

export default MessageList;
