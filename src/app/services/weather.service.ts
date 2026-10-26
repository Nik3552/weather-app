import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class WeatherService {
    private http = inject(HttpClient);
    
    getCity(cityName: string){
        return this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json&utm`)
    }

    getWeather(latitude: number, longitude: number){
        return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&utm_source&daily=weather_code&forecast_days=7`)
    }
}
