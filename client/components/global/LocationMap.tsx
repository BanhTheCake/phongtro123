import { FC, useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// fix icon not visible in web
L.Icon.Default.imagePath = '/img/';

interface LocationMapProps {
    position: [number, number];
}

const LocationMap: FC<LocationMapProps> = ({ position }) => {
    const [pos, setPos] = useState(position);
    const map = useMap();

    if (!pos) return null;

    useEffect(() => {
        if (pos[0] !== 0 || pos[1] !== 0) return;
        map.locate().on('locationfound', function (e) {
            setPos([e.latlng.lat, e.latlng.lng]);
            map.flyTo(e.latlng, map.getZoom());
        });
    }, [map]);
    return (
        <Marker position={pos}>
            <Popup>BanhTheCake</Popup>
        </Marker>
    );
};

export default LocationMap;
