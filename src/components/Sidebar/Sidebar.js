import React from 'react';
import {OPEN_WEATHER_CONFIG} from '../../const/creds';
import './Sidebar.scss';
import {Button, TextField} from '@material-ui/core';
import {toast} from 'react-toastify';

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      city: '',
      lat: '',
      lng: ''
    }
  }

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }, () => {
        this.updateWeather();
      }), err => {
        this.setLocationFromStorage();
        console.log(err);
      }
    )
  };

  setLocationFromStorage() {
    let city = JSON.parse(localStorage.getItem('city')) || 'Warsaw';
    this.updateWeather(city);
    this.setState({
        city: city
      }, () => {
        setInterval(() => {
          this.updateWeather(this.state.city);
        }, 1000 * 60 * 15)
      } // weather update every 15 minutes
    )
  }

  updateWeather(city) {
    let url;
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_CONFIG.key}&lang=${OPEN_WEATHER_CONFIG.lang}&units=${OPEN_WEATHER_CONFIG.system}`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&appid=${OPEN_WEATHER_CONFIG.key}&lang=${OPEN_WEATHER_CONFIG.lang}&units=${OPEN_WEATHER_CONFIG.system}`
    }

    fetch(url).then(resp => {
      return resp.json();
    }).then(data => {
      if (!data.name) {
        toast.error("Cannot find this place on OpenWeather!");
      } else {
        this.props.onWeatherUpdate(data);
        this.setState({
          input: '',
          city: data.name
        }, () => this.saveCityToLocalStorage());
      }
    }).catch(err => console.log(err));
  };

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  };

  handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateWeather(this.state.input);
    }
  };

  handleClick = () => {
    this.updateWeather(this.state.input);
  };

  saveCityToLocalStorage() {
    localStorage.setItem('city', JSON.stringify(this.state.city));
  }

  render() {
    const {weather} = this.props;
    if (!!weather) {
      let temp = Math.round(weather.main.temp);
      let pressure = Math.round(weather.main.pressure);
      let speed = Math.round(weather.wind.speed);
      return (
        <div className='weather'>
          <h2>{weather.name}</h2>
          <h3>{weather.weather[0].description}</h3>
          <h3>Temperature: {temp}&#176;C </h3>
          <h3>Pressure: {pressure} hPa</h3>
          <h3>Wind: {speed} m/s</h3>
          <div className='form'>
            <TextField id="standard-basic"
                       label="Enter city or country"
                       onChange={this.handleInput}
                       value={this.state.input}
                       className='input'
                       onKeyPress={e => this.handleEnterKey(e)}/>
            <Button variant="contained" color="primary" onClick={this.handleClick}>Search</Button>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
