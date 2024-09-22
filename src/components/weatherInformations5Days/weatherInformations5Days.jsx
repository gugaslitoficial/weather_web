import './weatherInformations5Days.css'
import PropTypes from 'prop-types';

function WeatherInformations5Days({ weather5Days }) {
    console.log(weather5Days)

    let dailyForecast = {}

    for(let forecast of weather5Days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()

        if(!dailyForecast[date]) {
            dailyForecast[date] = forecast
        }
    }
    
    const next5DaysForecast = Object.values(dailyForecast).slice(1,6)

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', {weekday: 'long', day: '2-digit'})

        return newDate
    }

    return (
        <div className='weather-container'>
            <h3>Previsão dos Próxmos 5 Dias:</h3>
            <div className='weather-list'>
                {next5DaysForecast.map(forecast => (
                    <div key={forecast.dt} className='weather-item'>
                        <p className='forecast-day'>{convertDate(forecast)}</p>
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}/>
                        <p className='forecast-description'>{forecast.weather[0].description}</p>
                        <p>{Math.round(forecast.main.temp_min)}°C min / {Math.round(forecast.main.temp_max)}°C max</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Validação de props
WeatherInformations5Days.propTypes = {
    weather5Days: PropTypes.shape({
        list: PropTypes.arrayOf(
            PropTypes.shape({
                dt: PropTypes.number.isRequired,
                main: PropTypes.shape({
                    temp_min: PropTypes.number.isRequired,
                    temp_max: PropTypes.number.isRequired
                }).isRequired,
                weather: PropTypes.arrayOf(
                    PropTypes.shape({
                        description: PropTypes.string.isRequired,
                        icon: PropTypes.string.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }).isRequired
};

export default WeatherInformations5Days