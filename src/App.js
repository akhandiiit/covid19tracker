import react from 'react';

import styles from './App.module.css';
import {Cards, Chart, CountryPicker} from './components';
import { fetchData, fetchDailyData } from './api';
import coronaImg from './images/covid19_logo.png';

import React, { Component } from 'react'



class App extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:{},
             country:'',
        }
    }
  
    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data : fetchedData});
        
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        console.log(fetchedData);
        this.setState({data : fetchedData, country: country});
    }

    render() {
       const { data , country } = this.state;
        return (
            <div className={styles.container}>
                
                <img src={coronaImg} className={styles.image}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange} />
                <Cards data={data}/>
                <Chart data={data} country={country}/>
                {console.log(data)}
                
            </div>
        )
    }
}

export default App;