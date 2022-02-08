
import { useState, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, 
    LineElement, PointElement, Legend, Tooltip, Filler, Title } 
from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement,
    Legend, Tooltip, Filler, Title);

const NeosChart =({dates, neosFrequency})=>{
    //setting chart state
    const [chartData, setChartData] = useState(
        {
           labels: [],
           datasets:[] 
        }
    );

    const options = {   
    
        plugins: {
            title: {
                display: true,
                align: 'start',
                padding: {
                    bottom: 40,
                },

                text: 'Neos This Week',
                font: {
                    size: 18,
                    weight: 'bold',
                },
        
                color: 'rgb(154, 28, 47)',
            },

            tooltip: {
                mode: 'index',
                intersect: false,
            },

            legend:{
                display:false
            },  
        },
 
        scales: {
            x: {
                ticks: {
                    color: "white",
                    font: {
                        size: 12,
                    }
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "white",
                    font: {
                        size: 12,  
                    },
                    minTicksLimit: 6
                },
            }
        }, 

        elements: {
            point:{
                radius: 0
            }
        },
       
    }

    useEffect(()=>{
        if(dates.length!==0 && neosFrequency.length!==0){
            setChartData({
                labels:dates,
                datasets:[
                    {  
                        lineTension: 0.2, 
                        borderColor:'rgb(154, 28, 47)',
                        borderWidth:2,
                        data:neosFrequency
                    }
                ]
            });
        }
    }, 

    [dates, neosFrequency] );

    return(
        <div className="chart-panel">
            <div className='chart-wrapper'>
            <Line
                data={chartData}
                options={options}
            /> 
        </div>

    </div>
      
    )
}

export default NeosChart;