import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Box, Paper, Typography} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import styles from './Dashboard.module.css';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const Dashboard = () => {
    const [statistics] = useState({ total: 12, open: 3, error: 2 });
    // 임시 GGANG DATA
    const [locations] = useState([
        { id: 1, lat: 37.5665, lng: 126.9780, status: '정상', name: '관정 A' },
        { id: 2, lat: 37.5755, lng: 126.9950, status: '오류', name: '관정 B' },
        { id: 3, lat: 37.5600, lng: 126.9700, status: '유지보수 요청', name: '관정 C' },
        { id: 4, lat: 37.5640, lng: 126.9700, status: '모터 정지', name: '관정 D' },
    ]);

    //구글맵 API
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [MapLocation, setMapLocation] = useState({latitude: null, longitude: null});
    const [locationName, setLocationName] = useState(null);
    const mapRef = useRef(null);
    const initMap = useCallback((lati, longi) => {
        new window.google.maps.Map(mapRef.current, {
            center: {lat: lati, lng: longi},
            zoom: 15,
        });
    }, [mapRef]);

    useEffect(() => {
        // 1. 사용자의 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords;
                setMapLocation({latitude, longitude});

                // 2. 위치 정보를 사용하여 지역 이름 가져오기 (Geocoding 서비스 사용)
                const apiKey = 'AIzaSyAnqjIj4j2CqZY_lr6tR7hJ1U8-7wMb1BQ'; // Geocoding 서비스 API 키를 사용해야 합니다.
                const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

                fetch(geocodingApiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        // JSON 응답에서 원하는 지역 이름 추출
                        const addressComponents = data.results[0].address_components;
                        for (let component of addressComponents) {
                            if (component.types.includes('locality')) {
                                setLocationName(component.long_name);
                                break;
                            }
                        }
                    });
            });
        }
    }, []);

    // 구글맵 사용시 마커
    const getColorByStatus = (status) => {
        switch (status) {
            case '정상':
                return '#4CAF50';
            case '오류':
                return '#f44336';
            case '유지보수 요청':
                return '#FF9800';
            case '모터 정지':
                return '#2196F3';
            default:
                return '#000000';
        }
    };

    // leaflet 사용 시 임시 마커
    const icons = {
        '정상': L.divIcon({
            html: `<div style="background:#4CAF50;border-radius:50%;width:20px;height:20px;border:2px solid white;"></div>`,
            className: '', // 기본 Leaflet 스타일 제거
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24],
        }),
        '오류': L.divIcon({
            html: `<div style="background:#f44336;border-radius:50%;width:20px;height:20px;border:2px solid white;"></div>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24],
        }),
        '유지보수 요청': L.divIcon({
            html: `<div style="background:#FF9800;border-radius:50%;width:20px;height:20px;border:2px solid white;"></div>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24],
        }),
        '모터 정지': L.divIcon({
            html: `<div style="background:#2196F3;border-radius:50%;width:20px;height:20px;border:2px solid white;"></div>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24],
        }),
    };

    //날씨 API
    const [WeatherLocation, setWeatherLocation] = useState({ latitude: null, longitude: null });
    const [weather, setWeather] = useState(null);
    const lang = "kr";

    useEffect(() => {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setWeatherLocation({ latitude, longitude });

                // 위치 정보 기반 날씨 정보 (OpenWeatherMap API)
                const apiKey = '47b0239ca9811513fa99a53f1d252c8c'; // OpenWeatherMap API key
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${lang}&appid=${apiKey}&units=metric`;

                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => setWeather(data));
            });
        }
    }, []);

    return (
        <Box className={styles.container}>
            <Sidebar />
            <Box className={styles.main}>
                <Navbar />
                <Box className={styles.content}>
                    <Box className={styles.topSection}>
                        <Paper className={styles.statsCard}>
                            <Typography variant="h6">지하수 통계</Typography>
                            <Typography>Total: {statistics.total}</Typography>
                            <Typography>Open: {statistics.open}</Typography>
                            <Typography>Error: {statistics.error}</Typography>
                        </Paper>

                        <Box className={styles.weatherCard}>
                            <img className={styles.weatherIcon} src="/assets/images/cloudy.png" alt="날씨 아이콘"/>
                            {weather && (
                                <Box className={styles.weatherDetails}>
                                    <Typography>온도: {weather.main.temp}°C</Typography>
                                    <Typography>습도: {weather.main.humidity}%</Typography>
                                    <Typography>날씨: {weather.weather[0].description}</Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {/*/!* leaflet은 google map api 미사용시 임시사용 *!/*/}
                    {/*<Box className={styles.mapWrapper}>*/}
                    {/*    <Paper className={styles.mapCard}>*/}
                    {/*        <MapContainer center={[37.5665, 126.9780]} zoom={14} style={{ height: '100%', width: '100%' }}>*/}
                    {/*            <TileLayer*/}
                    {/*                attribution='&copy; OpenStreetMap contributors'*/}
                    {/*                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                    {/*            />*/}
                    {/*            {locations.map(loc => (*/}
                    {/*                <Marker*/}
                    {/*                    key={loc.id}*/}
                    {/*                    position={[loc.lat, loc.lng]}*/}
                    {/*                    icon={icons[loc.status] || icons['정상']}*/}
                    {/*                >*/}
                    {/*                    <Popup>*/}
                    {/*                        <strong>{loc.name}</strong><br />*/}
                    {/*                        상태: {loc.status}<br />*/}
                    {/*                        날씨: 맑음<br />*/}
                    {/*                        온도: 19°C<br />*/}
                    {/*                        습도: 70%*/}
                    {/*                    </Popup>*/}
                    {/*                </Marker>*/}
                    {/*            ))}*/}
                    {/*        </MapContainer>*/}
                    {/*    </Paper>*/}
                    {/*</Box>*/}
                    <Box className={styles.mapWrapper}>
                        <Paper className={styles.mapCard}>
                            <LoadScript googleMapsApiKey="AIzaSyAnqjIj4j2CqZY_lr6tR7hJ1U8-7wMb1BQ">
                                <GoogleMap
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    center={{ lat: 37.5665, lng: 126.9780 }}
                                    zoom={14}
                                    onLoad={() => setIsMapLoaded(true)}
                                >
                                    {isMapLoaded && locations.map((loc) => (
                                        <Marker
                                            key={loc.id}
                                            position={{ lat: loc.lat, lng: loc.lng }}
                                            onClick={() => setSelectedMarker(loc)}
                                            icon={{
                                                path: window.google.maps.SymbolPath.CIRCLE,
                                                scale: 8,
                                                fillColor: getColorByStatus(loc.status),
                                                fillOpacity: 1,
                                                strokeWeight: 1,
                                                strokeColor: '#fff',
                                            }}
                                        />
                                    ))}

                                    {selectedMarker && (
                                        <InfoWindow
                                            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                                            onCloseClick={() => setSelectedMarker(null)}
                                        >
                                            <div>
                                                <strong>{selectedMarker.name}</strong><br />
                                                상태: {selectedMarker.status}<br />
                                                날씨: 맑음<br />
                                                온도: 19°C<br />
                                                습도: 70%
                                            </div>
                                        </InfoWindow>
                                    )}
                                </GoogleMap>
                            </LoadScript>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;