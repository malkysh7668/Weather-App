import React from 'react'
import { Container, Row, Col, Input, Label, Button } from 'reactstrap';
import { connect } from 'react-redux'
import actions from '../Store/Redux/actions'
import $ from 'jquery';


const mapDispatchToProps = (dispatch) => ({
  set_history_user: (searchedCityWeather) => dispatch(actions.setHistoryUser(searchedCityWeather))
})

function mapStateToProps(state) {
  return {
    user: state.UserReducer.user
  };
}

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    const user2 = this.props.user
    this.setCityName = this.setCityName.bind(this)
    this.state = {
      cityName: "",
      defaultId: ""
    }
  }

  setCityName(name) {
    this.setState({ cityName: name, defaultId: "d2207cf9c493aebf95ff1c1df5618902" })
  }
  saveHistory(weatherOfCity) {
    $.ajax({
      url: `http://localhost:5000/saveHistory`,
      method: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        "dateTime": new Date(),
        "userId": this.props.user._id,
        "cityName": weatherOfCity.cityName,
        "country": weatherOfCity.country,
        "description": weatherOfCity.description,
        "temp": weatherOfCity.temp
      }),
      success: function (data) {
        console.log(data)

      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest, " ", textStatus, " ", errorThrown)

      }
    });
  }
  clickHandler() {
    const city_name = this.state.cityName;
    const default_id = this.state.defaultId;
    if (city_name) {
      fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=" + default_id)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result,
            });
            let x = result.main.temp - 273.15
            debugger
            x = Math.round(x)
            x = x + " °c"
            const weatherOfCity = { "cityName": result.name, "temp": x, "country": result.sys.country, "description": result.weather[0].description }
            this.props.set_history_user(weatherOfCity)
            this.saveHistory(weatherOfCity)
            { document.getElementById("city_name").value = "" }
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  render() {
    return (
      <>
          <Label style={{ fontSize: 70 }}>Simple Weather App</Label>
        <div class="d-flex justify-content-center">
          <Input style={{ width: "25%"}} class="d-inline-block" type="text" id="city_name" placeholder="Search by City Name" onChange={(e) => { this.setCityName(e.target.value) }} />
          <Button color="danger" onClick={this.clickHandler.bind(this)}>SUBMIT</Button>{' '}
        </div>
        <br></br>
        <br></br>
        <br></br>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)