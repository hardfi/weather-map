import React from 'react';
import MapContainer from '../components/MapContainer/MapContainer';
import {Header} from '../components/Header/Header';
import {Sidebar} from '../components/Sidebar/Sidebar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: '',
      currentLocation: ''
    }
  }

  handleWeatherUpdate = (weather) => {
    this.setState({
      weather: weather,
    });
  };

  render() {
    return (
      <div className='container'>
        <div className="row">
          <Header/>
        </div>
        <div className="row main-content">
          <div className="col">
            <Sidebar onWeatherUpdate={this.handleWeatherUpdate} weather={this.state.weather}/>
          </div>
          <div className="map-main">
            <MapContainer weather={this.state.weather} />
          </div>
        </div>
        <ToastContainer/>
      </div>
    )
  }
}
