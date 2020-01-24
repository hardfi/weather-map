import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {GOOGLE_API_KEY} from '../../const/creds';
import './MapContainer.scss';

export class MapContainer extends React.Component {
  render() {
    let icon, coords, temp;
    if (!!this.props.weather) {
      coords = this.props.weather.coord;
      coords['lng'] = coords.lon;
      temp = Math.round(this.props.weather.main.temp);
      icon = `${process.env.PUBLIC_URL}/icons/${this.props.weather.weather[0].icon}.png`;

      return (
        <Map google={this.props.google}
             zoom={9}
             initialCenter={coords}
             className='MapContainer'
             center={coords}>
          <Marker
            position={coords}
            label={{fontWeight: 'bold', fontSize: '18px', text: `${temp} \u00b0C`}}
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
