import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

function MapComponent() {
    return (
        <APIProvider apiKey="AIzaSyCBFTgzfd9EZt3CgRkBIwab3oSGPzgMWN8">
            <Map
                center={{ lat: 28.1235, lng: -15.4366 }}
                zoom={12}
                style={{ width: '100%', height: '400px' }}
            />
        </APIProvider>
    );
}

export default MapComponent;
