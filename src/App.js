import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';

const FAKE_API_ENDPOINT = 'https://www.mocky.io/v2/5a9837eb2e000072005532a5?mocky-delay=500ms';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            rooms: [],
            error: null,
            autoUpdate: false,
        };
    }

    updateWithDataRetrieved(result) {
        this.setState(state => ({
            ...state,
            isLoading: false,
            rooms: result,
            error: null,
        }));
    }

    updateWithError(error) {
        console.error(error);
        this.setState(state => ({
            ...state,
            isLoading: false,
            rooms: [],
            error: 'Something went wrong',
        }));
    }

    requestRoomStatus() {
        this.setState(state => ({
            ...state,
            isLoading: true,
        }));
        fetch(FAKE_API_ENDPOINT)
            .then(res => res.json())
            .then(
                result =>  this.updateWithDataRetrieved(result),
                error => this.updateWithError(error)
            );
    }

    switchAutoUpdate() {
        const startAutoUpdate = !this.state.autoUpdate;
        this.setState(state => ({
        ...state, autoUpdate: !state.autoUpdate,
        }));
        if (startAutoUpdate) {
            this.updateInterval = setInterval(() => this.requestRoomStatus(), 5000);
        } else {
            clearInterval(this.updateInterval);
        }
    }

    componentDidMount() {
        this.requestRoomStatus();
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    render() {
        const {error, isLoading, rooms, autoUpdate} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Get shit done</h1>
                </header>
                <section>
                    <button onClick={() => this.switchAutoUpdate()}>
                        {isLoading ? "Loading..." : `Autoupdate ${autoUpdate ? 'ON' : 'OFF'}`}
                    </button>

                </section>
                <div className="App-intro">
                    {error
                        ? error
                        : <RoomList rooms={rooms}/>
                    }

                </div>
            </div>
        );
    }
}

export default App;
