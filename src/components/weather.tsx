import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaDroplet, FaWind } from "react-icons/fa6";

type WeatherData = {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
}
export const Weather = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchWeatherData = async (cityName: string) => {
        const apiKey = process.env.WEATHER_API_KEY;
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
            setLoading(true);
            setError(null);

            const weatherResponse = await fetch(currentWeatherUrl);
            if (!weatherResponse.ok) {
                throw new Error("City not found! Try another one");
            }
            const weatherData: WeatherData = await weatherResponse.json();
            setWeatherData(weatherData);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const successCallback = async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.WEATHER_API_KEY;
        const reverseGeocodeUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        try {
            setLoading(true);
            const response = await fetch(reverseGeocodeUrl);
            if (!response.ok) {
                throw new Error("Unable to fetch location data");
            }
            const data = await response.json();
            const cityName = data[0].name;
            await fetchWeatherData(cityName);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    }

    const errorCallback = () => {
        setError("Unable to retrieve your location");
        setWeatherData(null);
    }

    // get current location
    useEffect(() => {
        const getUserLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
            } else {
                setError("Geolocation is not supported by this browser.");
                setWeatherData(null);
            }

        };
        getUserLocation();
    }, []);

    return (
        <>
            <section className="bg-neutral-400/25 shadow-xl rounded-xl flex flex-col items-center justify-centera w-96 h-60">
                {loading && (
                    <div className="flex justify-center items-center h-full">
                        <MoonLoader loading size={30} />
                    </div>
                )}
                {error && (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-red-600 font-bold">
                            {error}
                        </p>
                    </div>
                )}
                {!error && weatherData && (
                    <div>
                        {/* Displaying current weather data */}
                        <div className="flex justify-between items-center font-bold">
                            <span className="flex items-center gap-x-2">
                                <FaMapMarkerAlt size={20} />
                                <p className="text-xl">{weatherData.name}</p>
                            </span>

                            <div className="flex flex-col items-center">
                                <img
                                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                    alt="weather icon"
                                />{" "}
                                {/* Weather icon */}
                                <span>
                                    <p className="text-4xl font-bold">
                                        {Math.round(weatherData.main.temp)} °C
                                    </p>
                                </span>
                            </div>
                        </div>

                        <div className="my-5 flex justify-between items-center gap-x-20">
                            {/* Humidity */}
                            <div className="flex items-center gap-x-3">
                                <FaDroplet size={20} />
                                <span>
                                    <p className="text-lg font-bold">
                                        Humidity
                                    </p>
                                    <p className="text-lg text-black/75 font-medium">
                                        {weatherData.main.humidity}%
                                    </p>
                                </span>
                            </div>

                            {/* Wind Speed */}
                            <div className="flex w-1/2 items-center gap-x-3">
                                <FaWind size={20} />
                                <span>
                                    <p className="text-lg font-bold">
                                        Wind Speed
                                    </p>
                                    <p className="text-lg text-black/75 font-medium">
                                        {weatherData.wind.speed} km/h
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
};

