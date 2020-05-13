import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api';
import { Line, Doughnut } from 'react-chartjs-2'
import styles from './Chart.module.css';

const Chart = ({ data:{confirmed, deaths, recovered} , country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
       const fetchAPI = async () =>{
           const dailyData = await fetchDailyData();
           setDailyData(dailyData);
       }

       fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
         ?( <Line
             data={{
              labels: dailyData.map(({ date }) => date),
              datasets:[{
                  data: dailyData.map(({confirmed}) => confirmed),
                  label: 'Infected',
                  borderColor: '#3333ff',
                  backgroundColor: 'rgba(5, 5, 220, 0.5)',
                  hoverBackgroundColor: 'blue',
                  fill: true,
              }, 
                {
                  data: dailyData.map(({deaths}) => deaths),
                  label: 'Deaths',
                  borderColor: 'red',
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  hoverBackgroundColor:'red',
                  fill: true,
                },
                {
                    data: dailyData.map(({deathsInChina}) => deathsInChina),
                    label: 'Deaths in China',
                    borderColor: 'Orange',
                    backgroundColor: 'rgba(250, 5, 5, 0.5)',
                    hoverBackgroundColor:'orange',
                    fill: true,
                  },
            ],
             }}
            />) : null
    );

    const pieChart = 
        (confirmed ? <Doughnut 
            data = {{
                labels: ['Active', 'Deaths', 'Recovered'],
                datasets: [{
                    backgroundColor: [ '#ff8000','#ff0000','#00ff00',],
                    data: [(confirmed.value-(recovered.value + deaths.value)), deaths.value, recovered.value,]
                }],

            }}
        /> : null)
    

    

    return(
        <div className={styles.container}>{country ? pieChart : lineChart}</div>
    )
}

export default Chart;
