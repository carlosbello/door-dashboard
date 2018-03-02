import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RoomList from './components/RoomList';
import IconButton from 'material-ui/IconButton';
import NotificationWc from 'material-ui/svg-icons/notification/wc';
import SyncButton from './components/SyncButton'
import {white} from 'material-ui/styles/colors'

const ROOMS_INFO_API = 'https://desolate-taiga-74953.herokuapp.com/api/doorDashboard';

const mapToLocalStatus = (status = []) =>
    status.map(({roomId = 'Toilet', status = 'in_maintenance', wcList = []}) => ({
        name: roomId,
        isOpen: status === 'allowed',
        doors: wcList.map(({status = 'closed'}) => ({isOpen: status === 'open'}))
    }));

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
        fetch(ROOMS_INFO_API)
            .then(res => res.json())
            .then(json => mapToLocalStatus(json))
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
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Get shit done"
                        iconElementLeft={<IconButton><NotificationWc /></IconButton>}
                        iconElementRight={
                            <SyncButton
                                onClick={() => this.switchAutoUpdate()}
                                autoUpdate={autoUpdate}
                                isLoading={isLoading}
                                color={white}
                            />
                        }
                    />
                    <div className="App-intro">
                        {error
                            ? error
                            : <RoomList rooms={rooms}/>
                        }

                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
