"use client";

import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

// Extend window with google maps - using any to bypass type checking
declare global {
    interface Window {
        google: any;
    }
}

interface Location {
    name: string;
    lat: number;
    lng: number;
    type: 'venue' | 'airport';
    info?: string;
}

export default function TransportationMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    const locations: Location[] = [
        {
            name: "Pałac Bogaczów",
            lat: 51.7833,
            lng: 15.5000,
            type: 'venue',
            info: "Wedding Venue"
        },
        {
            name: "Berlin Brandenburg (BER)",
            lat: 52.3667,
            lng: 13.5033,
            type: 'airport',
            info: "BER - 2h to 2.5h to the city"
        },
        {
            name: "Wrocław (WRO)",
            lat: 51.1027,
            lng: 16.8858,
            type: 'airport',
            info: "WRO - Approx. 2h to the city"
        },
        {
            name: "Poznań (POZ)",
            lat: 52.4210,
            lng: 16.8263,
            type: 'airport',
            info: "POZ - 1h 30m to 1h 45m to the city"
        },
        {
            name: "Dresden (DRS)",
            lat: 51.1328,
            lng: 13.7671,
            type: 'airport',
            info: "DRS - Approx. 2.5h to the city"
        },
        {
            name: "Warsaw Chopin (WAW)",
            lat: 52.1657,
            lng: 20.9671,
            type: 'airport',
            info: "WAW - Connect to IEG"
        },
        {
            name: "Zielona Góra-Babimost (IEG)",
            lat: 52.1385,
            lng: 15.7986,
            type: 'airport',
            info: "IEG - Local airport, 34 km from city center"
        }
    ];

    useEffect(() => {
        // Load Google Maps script
        const loadGoogleMaps = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&libraries=places`;
                script.async = true;
                script.defer = true;
                script.onload = initMap;
                document.head.appendChild(script);
            } else if (window.google) {
                initMap();
            }
        };

        const initMap = () => {
            if (!mapRef.current || mapInstanceRef.current) return;

            // Center on Zielona Góra with zoom to show all airports
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 51.9356, lng: 15.5062 },
                zoom: 6,
                styles: [
                    {
                        "elementType": "geometry",
                        "stylers": [{ "color": "#f5f5f5" }]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#616161" }]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [{ "color": "#f5f5f5" }]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#bdbdbd" }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#eeeeee" }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#757575" }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#e5e5e5" }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#ffffff" }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#757575" }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#dadada" }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#616161" }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#c9c9c9" }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#9e9e9e" }]
                    }
                ],
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: true,
            });

            mapInstanceRef.current = map;

            // Add markers
            locations.forEach((location) => {
                let icon: any;

                if (location.type === 'venue') {
                    // Gold heart for venue
                    icon = {
                        path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
                        fillColor: '#d4af37',
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 2,
                        scale: 1.2,
                        anchor: new window.google.maps.Point(12, 21),
                    };
                } else {
                    // Blue plane for airports
                    const scale = location.name.includes('IEG') ? 0.8 : 1.0; // Smaller for IEG
                    icon = {
                        path: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
                        fillColor: '#4A90E2',
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 1.5,
                        scale: scale,
                        anchor: new window.google.maps.Point(12, 12),
                    };
                }

                const marker = new window.google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map: map,
                    title: location.name,
                    icon: icon,
                });

                // Info window for tooltip
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                        <div style="padding: 8px; font-family: 'DM Sans', sans-serif;">
                            <strong style="color: #1a233a; font-size: 14px;">${location.name}</strong>
                            ${location.info ? `<br/><span style="color: #666; font-size: 12px;">${location.info}</span>` : ''}
                        </div>
                    `,
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        };

        loadGoogleMaps();
    }, []);

    return (
        <section className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-navy/5">
            <div ref={mapRef} className="w-full h-full" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gold/20 flex items-center gap-3">
                <div className="p-2 bg-gold/10 rounded-full">
                    <MapPin className="text-gold w-5 h-5" />
                </div>
                <p className="text-navy font-bold text-sm">Venue & Travel Hubs</p>
            </div>
        </section>
    );
}
