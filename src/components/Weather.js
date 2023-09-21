import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import Button from '@mui/material/Button';


export default function Weather() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Kotulpur");
  const [change, setChange] = useState("metric");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=${change}&appid=562b09ff6368aa10a4f8753b036aa5f5`;
      const respons = await fetch(url);
      const resJson = await respons.json();
      setCity(resJson.main);
    }
    fetchApi();
  }, [search,change]);

  return (

    <>
      <div className="main_div">
        <div className="sub_div">
          <div className="user_input">
            <input type="text" placeholder="enter city name"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <Button variant="contained" size="medium" style={{'display':city?'block':'none'}}
            onClick={()=>{
              (change==='metric')?setChange('imperial'):setChange('metric')
            }}
            >
              &deg;{(change==='metric')?'F':'C'}
            </Button>
          </div>

          {
            !city ? (
              <p className='error'>Data is Not found</p>
            ) : <>
              <div className="fetch_data">
                <div className="city_name">
                  <p ><FilterDramaIcon fontSize="large" /></p>
                  <p>{search},IN</p>
                </div>
                <div className="city_temperature">
                  <p>{city.temp}&deg;{(change==='metric')?'C':'F'}</p>
                </div>
              </div>
              <div className="card">
                <div className="cards">
                  <div className='img_icon'>
                    <p><ArrowUpwardIcon /></p>
                    <p>Max</p>
                  </div>

                  <h1>{city.temp_max}</h1>
                </div>
                <div className="cards">
                  <div className='img_icon'>
                    <p><ArrowDownwardIcon /></p>
                    <p>Min</p>
                  </div>
                  <h1>{city.temp_min}</h1>

                </div>
                <div className="cards">

                  <div className='img_icon'>
                    <p><SentimentSatisfiedAltIcon /></p>
                    <p>Feels like</p>
                  </div>
                  <h1>{city.feels_like}</h1>
                </div>
                <div className="cards">
                  <div className='img_icon'>
                    <p><WaterDropIcon /></p>
                    <p>Humidity</p>
                  </div>
                  <h1>{city.humidity}</h1>
                </div>
              </div>
            </>
          }



        </div>
      </div>
    </>
  )
}
