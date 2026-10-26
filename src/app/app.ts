import { Component, signal } from '@angular/core';
import { WeatherInterface } from './models/weather.model.ts/weather.model.ts-module';
import { Header } from './components/header/header';
import { Search } from './components/search/search';
import { WeatherContainer } from './components/weather-container/weather-container';

@Component({
  imports: [Header, Search, WeatherContainer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('weater-app');

  weatherData: WeatherInterface = {
      city: "", 
      date: "",
      humidity: 0,
      windSpeed: 0,
      currentTemp: 0,
      weatherCode: ""
    };

   error: string = ""; 
}
