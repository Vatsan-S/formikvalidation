import { Chart } from 'chart.js';
import React from 'react';

const Graphcard = ({value}) => {
    new Chart({
        type:'bar',
        data:{
            labels:value.map(ele=>ele),
            datasets:''
        }
    })
    return (
        <canvas id='chart' className='graphCard'>
            {value.map((ele)=>console.log(ele))}
        </canvas>
    );
};

export default Graphcard;