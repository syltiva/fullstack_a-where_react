import "./HomeView.css"
import React, { useState, useRef, useCallback } from 'react';
import {
    GoogleMap, 
    useLoadScript,
    Marker, 
    InfoWindow, 
} from "@react-google-maps/api"
import { formatRelative} from 'date-fns'

import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
}   from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList, 
    ComboboxOption,
} from '@reach/combobox'
import "@reach/combobox/styles.css"
import mapStyles from "./mapStyles"

const libraries = ["places"]
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}

const center = {
    lat: 25.761681,
    lng: -80.191788,
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

export const HomeView = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const[markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const onMapClick = useCallback((event) => {
        setMarkers((current) => [
            ...current, 
            {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
        },
    ]);
    }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
    <div>
    <h1>a-where 
    <img 
        style={{
            width: '30px',
            height: '30px'
        }}
        src='https://res.cloudinary.com/syltiva/image/upload/v1639455191/orange-localization-icon-11_xycltq.png'

        /></h1>
        <Search panTo={panTo}/>
        <Locate panTo={panTo} />


        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={13} 
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad = {onMapLoad}
            >
                {markers.map(marker => ( 
                    <Marker 
                        key={marker.time.toISOString()} 
                        position={{ lat: marker.lat, lng: marker.lng}}
                        icon={{
                            url: 'https://res.cloudinary.com/syltiva/image/upload/v1639455191/orange-localization-icon-11_xycltq.png',
                            scaledSize: new window.google.maps.Size(30,30),
                            origin: new window.google.maps.Point(0,0),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                        />
                        ))}

                {selected ? (
                    <InfoWindow 
                        position={{lat: selected.lat, lng: selected.lng}} 
                        onCloseClick={() => setSelected(null)}
                    >
                    <div>
                        <h4>incident taken place</h4>
                        <p>@ {formatRelative(selected.time, new Date())}</p>
                    </div>
                    </InfoWindow>
                    ) : null
                    }
            </GoogleMap>
    </div>
    )
}

function Locate({ panTo }) {
    return (
    <button 
        className="locate" 
        onClick={() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, 
            () => null
        );
    }}
    >
    <img style={{width: "35px", height: "35px"}}
    src="https://res.cloudinary.com/syltiva/image/upload/v1639461470/6535123_thumb_g2noq6.png" alt="you are here"/>
    </button>
    )
}

function Search({panTo}) {
    const {
        ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestions
    } = usePlacesAutoComplete({
        requestOptions: {
            location: {lat: () => 25.761681, lng: () => -80.191788, },
            radius: 200 * 1000,
        }
    })

    return (
        <div className="search">
    <Combobox 
        onSelect={ async (address) => {
            setValue(address, false);
            clearSuggestions()

            try {
                const results = await getGeocode({ address });
                const {lat, lng} = await getLatLng(results[0]);
                panTo({lat, lng});
            }   catch (error) {
                console.log("error!")
            }
            }}
    >
    <ComboboxInput 
        value={value} 
        onChange={(event) => {
        setValue(event.target.value);
    }} 
        disabled = {!ready}
        placeholder= "enter an address"
    />
    <ComboboxPopover>
        <ComboboxList>
        {status === "OK" &&  
            data.map(({id, description}) => (
                <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
    </div>
    )}

export default HomeView;