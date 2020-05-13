import React from 'react';
import { Card, CardContent, Typography, Grid} from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cn from 'classnames'

const Cards = ({data:{confirmed, recovered, lastUpdate, deaths }}) => {
    if(!confirmed){
        return 'loading...';
    }
    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
              <Grid item component ={Card} xs={12} md={4} className={cn(styles.card, styles.infected)}>
                 <CardContent>
                    <Typography variant="h4" color="textSecondary" gutterBottom>INFECTED</Typography>
                    <Typography variant="h3">
                        <CountUp start={0} end={confirmed.value} separator=',' />
                    </Typography>     
                 </CardContent>
              </Grid>
              <Grid item component={Card} xs={12} md={4} className={cn(styles.card, styles.active)}>
                <CardContent>
                    <Typography variant="h4" color="textSecondary" gutterBottom>ACTIVE CASES</Typography>
                    <Typography variant="h3">
                        <CountUp start={0} end={confirmed.value - (recovered.value + deaths.value)} separator=',' />
                    </Typography>
                </CardContent>
              </Grid>
              <Grid item component ={Card} xs={12} md={4} className={cn(styles.card, styles.recovered)}>
                 <CardContent>
                    <Typography variant="h4" color="textSecondary" gutterBottom>RECOVERED</Typography>
                    <Typography variant="h3">
                        <CountUp start={0} end={recovered.value} separator=',' />
                    </Typography>
                 </CardContent>
              </Grid>
              <Grid item component ={Card} xs={12} md={4} className={cn(styles.card, styles.deaths)}>
                 <CardContent>
                    <Typography variant="h4" color="textSecondary" gutterBottom>DEATHS</Typography>
                    <Typography variant="h3">
                        <CountUp start={0} end={deaths.value} separator=',' />
                    </Typography>
                 </CardContent>
              </Grid>
              
            </Grid>
            <Grid container spacing={3} justify="center" >
              <Grid item component={Card} xs={12} md={3} className={styles.update}>
                <CardContent>
                    <Typography variant="h5" color="textSecondary" gutterBottom>Last Update</Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toLocaleTimeString()}</Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                </CardContent>
               </Grid>
            </Grid>
        </div>
    )
}

export default Cards;
