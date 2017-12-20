import React, { Component } from 'react';
import $ from 'jquery';
import Projects from './Components/Weather';
import Todos from './Components/City';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      weather: [],
      city:[]
    }
  }

  getCity(){
    let API_KEY = 'AIzaSyAIQ1DQlAbEevd6GAfBjFghj-DMUm2MRf0';
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=' + API_KEY,
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({city: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getWeather(){
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=' + API_KEY,
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({weather: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  componentWillMount(){
    this.getCity();
    this.getWeather();
  }

  componentDidMount(){
    this.getWeather();
  }

  handleAddProject(project){
    let city = this.state.city;
    projects.push(city);
    this.setState({projects:projects});
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
