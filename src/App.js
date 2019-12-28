import React from 'react';
import './App.css';
import './weather-icons-master/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component'; 
import Form from './app_component/form.component'; 

//api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key= "41bbc2c9754b93081bb2eb98a2f7abe8";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    
    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-stormshower",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    };
  }

  //demo test 
  // demo = async(e) =>{
   
  //     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
  //     const response = await api_call.json();
  //     console.log(response);
  //     alert(response.sys.country);
  //   }
     //demo test

  get_WeatherIcon(icons,rangeId){
    switch(true){
      case rangeId>=200 && rangeId<=232:
        this.setState({icon:this.weatherIcon.Thunderstorm});
        break;
      case rangeId>=300 && rangeId<=321:
        this.setState({icon:this.weatherIcon.Drizzle});
        break;
      case rangeId>=500 && rangeId<=531:
        this.setState({icon:this.weatherIcon.Rain});
        break;
      case rangeId>=600 && rangeId<=622:
        this.setState({icon:this.weatherIcon.Snow});
        break;
      case rangeId>=701 && rangeId<=781:
        this.setState({icon:this.weatherIcon.Atmosphere});
        break;
      case rangeId===800:
        this.setState({icon:this.weatherIcon.Clear});
        break;
      case rangeId>=801 && rangeId<=804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon:this.weatherIcon.Clouds});

    }
  }  
  getWeather = async(e) =>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response = await api_call.json();
      console.log(response);
      
    if(response.name && response.sys.country){
      this.setState({
          city: response.name,
          country: response.sys.country,
          celsius: Math.floor(response.main.temp - 273.15),
          temp_max: Math.floor(response.main.temp_max - 273.15),
          temp_min: Math.floor(response.main.temp_min - 273.15),
          description: response.weather[0].description,
          error: false
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
      
    }else{
      this.setState({error:true});
    }
  };

  render(){
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error}/>
        <Weather 
          city={this.state.city} 
          country={this.state.country}
          celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
          />
      </div>
    );
  }
}


export default App;
