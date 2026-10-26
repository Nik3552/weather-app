import { Component, inject, signal, output } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { WeatherInterface } from '../../models/weather.model.ts/weather.model.ts-module';

@Component({
  imports: [FormsModule],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search {
  private weatherService = inject(WeatherService);

  weatherDataEvent = output<WeatherInterface>();
  errorEvent = output<string>();

  cityName: string = "";

  cityData: any;
  latitude: number = 0;
  longitude: number = 0;

  weathreData: any;

  weatherDataToDisplsay = signal<WeatherInterface>({
    city: "", 
    date: "",
    humidity: 0,
    windSpeed: 0,
    currentTemp: 0,
    weatherCode: ""
  })

  fethcCityData(){
    this.weatherService.getCity(this.cityName).subscribe({
      next: (city) =>{
        
      this.cityData = city;
      
      if(!this.cityData.results){
        this.weatherDataToDisplsay.set({
          city: "",
          date: "",
          humidity: 0,
          windSpeed: 0,
          currentTemp: 0,
          weatherCode: "",
        })
        this.weatherDataEvent.emit(this.weatherDataToDisplsay());
        this.errorEvent.emit("The city name is incorrect!")
        return;
      }

      this.errorEvent.emit("");
      console.log("1: ", this.cityData);

      this.latitude = this.cityData.results[0].latitude;
      this.longitude = this.cityData.results[0].longitude
      
      this.weatherDataToDisplsay.update(data => ({...data, city: this.cityName}));

      // getWeather
      this.weatherService.getWeather(this.latitude, this.longitude).subscribe({
        next: (weather) => {
          this.weathreData = weather;
        
          if(!this.weathreData.latitude){
            this.weatherDataToDisplsay.set({
              city: "",
              date: "",
              humidity: 0,
              windSpeed: 0,
              currentTemp: 0,
              weatherCode: "",
            })
            this.weatherDataEvent.emit(this.weatherDataToDisplsay());
            this.errorEvent.emit("The city name is incorrect!")
            return;
          }

          this.weatherDataToDisplsay.update(data => ({...data, 
            date: this.weathreData.current.time,
            humidity: this.weathreData.current.relative_humidity_2m,
            windSpeed: this.weathreData.current.wind_speed_10m,
            currentTemp: this.weathreData.current.temperature_2m,
            weatherCode: this.weathreData.daily.weather_code[0].toString(),
          }));

          console.log("2: ", this.weathreData);
          this.weatherDataEvent.emit(this.weatherDataToDisplsay());
          },
        error: (err: any) => {
          console.error("An error has occured");
          this.errorEvent.emit("An error occured on the server side!")
        }
      },)
      },
      error: (err: any) => {
        console.error("An error has occured");
        this.errorEvent.emit("An error occured on the server side!")
      }
    });
  }
}
