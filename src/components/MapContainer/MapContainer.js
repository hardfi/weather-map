import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {GOOGLE_API_KEY} from '../../const/creds';
import './MapContainer.scss';

export class MapContainer extends React.Component {
  render() {
    const {weather, google} = this.props;
    if (!!weather) {
      const {coord} = weather;
      const temp = Math.round(weather.main.temp);
      const icon = `${process.env.PUBLIC_URL}/icons/${weather.weather[0].icon}.png`;
      coord['lng'] = coord.lon;
      return (
        <Map google={google}
             zoom={9}
             initialCenter={coord}
             className='MapContainer'
             center={coord}>
          <Marker
            position={coord}
            label={{fontWeight: 'bold', fontSize: '18px', text: `${temp}\u00b0C`}}
            icon={{
              url: icon,
            }}/>
        </Map>
      );
    } else {
      return null;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(MapContainer)
