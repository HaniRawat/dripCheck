import { useState, useEffect } from 'react';
import { Location, Weather } from '../types';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // This would normally be in an environment variable
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export const useWeather = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user's location if available
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Could not get your location. Please enter your city manually.');
        }
      );
    }
  }, []);

 

  const fetchWeatherData = async () => {
    if (!location) return;
    
    try {
      setLoading(true);
      const response = await fetch(
        `${WEATHER_API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Could not fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data when location is available
  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const findLocationByCity = async (cityName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${GEO_API_URL}?q=${encodeURIComponent(cityName)}&limit=1&appid=${WEATHER_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setLocation({
          lat: data[0].lat,
          lon: data[0].lon,
          city: cityName
        });
        setError(null);
        return true;
      } else {
        setError('City not found. Please check the spelling and try again.');
        return false;
      }
    } catch (err) {
      console.error('Error finding location by city:', err);
      setError('Could not find the city. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    weather,
    loading,
    error,
    findLocationByCity
  };
};