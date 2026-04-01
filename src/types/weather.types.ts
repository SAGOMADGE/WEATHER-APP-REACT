export type Conditions =
  | "Clouds"
  | "Mist"
  | "Fog"
  | "Rain"
  | "Drizzle"
  | "Snow"
  | "Storm"
  | "Clear";

export type RawWeatherResponse = {
  name: string;
  dt: number;
  visibility: number;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };

  weather: {
    main: string;
    description: string;
  }[];

  wind: {
    speed: number;
  };

  sys: {
    sunrise: number;
    sunset: number;
  };
};

export type MappedWeather = {
  city: string;

  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;

  humidity: number;
  pressure: number;

  condition: Conditions;
  description: string;

  windSpeed: number;
  visibility: number;

  dewPoint: number;
  isNight: boolean;
};
