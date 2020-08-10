

import * as React from 'react';

import { IGenericWebpartState, ISaveEntry, IChartData,} from '../IGenericWebpartState';
  import { IUser, IPivot, IMyPivots, IMyIcons, IMyFonts, ILink, IChartSeries, ICharNote } from '../IReUsableInterfaces';


import { IGenericWebpartProps } from '../IGenericWebpartProps';

import * as strings from 'GenericWebpartWebPartStrings';

import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';

import stylesC from './chartsPage.module.scss';

export interface ISelectedUser { key: string | number | undefined; text: string; }

export interface IDataOptions {
  chartAllDetails?: boolean;
  chartTrace?: boolean;
  chartChanges?: boolean;  
  chartWarnings?: boolean;  
  chartErrors?: boolean;  
  chartItems?: boolean;
}

export function create1SeriesCharts(series: IChartSeries, thisType: ChartType, dataOptions: IDataOptions){

  // set the options
  const lineOptions: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales:  { yAxes:[{ticks:{beginAtZero: true}}] },
    title: {
      display: true,
      text: series.title,
    },
    legend: {
      display: false
   },
  };

  // set the options
  const doughnutOptions: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    //scales:  { yAxes:[{ticks:{beginAtZero: true}}] },
    title: {
      display: true,
      text: series.title,
    },
    legend: {
      display: false  //legend must be false until I can properly size the chart
    },
  };

  let chartOptions: Chart.ChartOptions = null;
  if ( thisType === ChartType.Bar ) { chartOptions = lineOptions; }
  else if ( thisType === ChartType.Doughnut ) { chartOptions = doughnutOptions; }
  else if ( thisType === ChartType.Line ) { chartOptions = lineOptions; }
  else if ( thisType === ChartType.HorizontalBar ) { chartOptions = lineOptions; }
  

  if ( !series ) {
    return null;
  } else {


    let theseValues  = !series || series.sums == null  || dataOptions == null || !dataOptions.chartTrace ? null :  series.sums.map(
      (x) => {
        //console.log('x.toFixed', typeof x, x);
        if (typeof x == 'string') {
          return x;
        } else if ( !x || x == null ) {
          return null;
        } else {
          return x.toFixed(1);
        }
      }
    ).join(' ');

    let theseChanges  = !series || series.changeNotes == null || dataOptions == null || !dataOptions.chartChanges ? null :  
        series.changeNotes.map( x => { return <li>{x}</li>; } );

    let theseWarnings  = !series || series.warnNotes == null || dataOptions == null || !dataOptions.chartWarnings ? null :  
        series.warnNotes.map( x => { return <li>{x}</li>; } );

    let theseErrors  = !series || series.errorNotes == null || dataOptions == null || !dataOptions.chartErrors ? null :  
        series.errorNotes.map( x => { return <li>{x}</li>; } );
    

      //console.log('theseChanges', theseChanges);
    let r = Math.random().toString(36).substring(7);
  
    return (
      <div style={{ }}>
          <ChartControl 
          ref={ r }
          type={ thisType }
          data={{
              labels: series.labels,
              datasets: [{
              //label: series.title,
              data: series.sums
              }]
          }}
          options={ chartOptions } />
  
          <div>{ theseValues }</div>
          <div>{ theseChanges }</div>
          <div>{ theseWarnings }</div>
          <div>{ theseErrors }</div>
          
      </div>
  
    );

  }


}


export function create1TallSeriesCharts(series: IChartSeries, thisType: ChartType, WebpartRatio: number, dataOptions: IDataOptions, chartClass: null | string){
  // WebpartWidth /( 800 )
  // set the options
  const lineOptions: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: WebpartRatio == null ? false : true, //false = regular works
    aspectRatio: WebpartRatio,
    scales:  { yAxes:[{ticks:{beginAtZero: true}}] },
    title: {
      display: true,
      text: series != null ? series.title : 'Unknown Series',
    },
    legend: {
      display: false
   },
  };

  // set the options
  const doughnutOptions: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: WebpartRatio == null ? false : true, //false = regular works
    aspectRatio: WebpartRatio,
    //scales:  { yAxes:[{ticks:{beginAtZero: true}}] },
    title: {
      display: true,
      text: series != null ? series.title : 'Unknown Series',
    },
    legend: {
      display: false  //legend must be false until I can properly size the chart
    },
  };

  let chartOptions: Chart.ChartOptions = null;
  if ( thisType === ChartType.Bar ) { chartOptions = lineOptions; }
  else if ( thisType === ChartType.Doughnut ) { chartOptions = doughnutOptions; }
  else if ( thisType === ChartType.Line ) { chartOptions = lineOptions; }
  else if ( thisType === ChartType.HorizontalBar ) { chartOptions = lineOptions; }
  

  if ( !series ) {
    return null;
  } else {


    let theseValues  = !series || series.sums == null  || dataOptions == null || !dataOptions.chartTrace ? null :  series.sums.map(
      (x) => {
        //console.log('x.toFixed', typeof x, x);
        if (typeof x == 'string') {
          return x;
        } else if ( !x || x == null ) {
          return null;
        } else {
          return x.toFixed(1);
        }
      }
    ).join(' ');

    let theseChanges  = !series || series.changeNotes == null || dataOptions == null || !dataOptions.chartChanges ? null :  
        series.changeNotes.map( x => { return <li>{x}</li>; } );

    let theseWarnings  = !series || series.warnNotes == null || dataOptions == null || !dataOptions.chartWarnings ? null :  
        series.warnNotes.map( x => { return <li>{x}</li>; } );

    let theseErrors  = !series || series.errorNotes == null || dataOptions == null || !dataOptions.chartErrors ? null :  
        series.errorNotes.map( x => { return <li>{x}</li>; } );
    

      //console.log('theseChanges', theseChanges);
    let r = Math.random().toString(36).substring(7);
  
    return (
      <div className={ chartClass == null ? stylesC.chartHeight400 : chartClass }>
          <ChartControl 
          ref={ r }
          type={ thisType }
          data={{
              labels: series.labels,
              datasets: [{
              //label: series.title,
              data: series.sums
              }]
          }}
          options={ chartOptions } />
  
          <div><p>{ theseValues }</p></div>
          <div>{ theseChanges }</div>
          <div>{ theseWarnings }</div>
          <div>{ theseErrors }</div>
          
      </div>
  
    );

  }


}


export function createMultiSeries1ScaleCharts(chartTitle: string, stackMe: boolean, showLegend: boolean, 
    series: IChartSeries[], selectedIndex: number, thisType: ChartType, WebpartWidth: number, dataOptions: IDataOptions){
//https://codepen.io/natenorberg/pen/WwqRar?editors=0010

  // set the options
  const lineOptions: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: true, //false = regular works
    aspectRatio: WebpartWidth/300,
    scales:  { yAxes:[{ticks:{beginAtZero: true}, stacked: stackMe,}] },
    title: {
      display: chartTitle.length > 0 ? true : false,
      text: chartTitle.length > 0 ? chartTitle : '',
    },
    legend: {
      display: showLegend
   },
  };

    let chartOptions: Chart.ChartOptions = null;
    if ( thisType === ChartType.Bar ) { chartOptions = lineOptions; }
    //else if ( thisType === ChartType.Doughnut ) { chartOptions = doughnutOptions; }
    else if ( thisType === ChartType.Line ) { chartOptions = lineOptions; }
    else if ( thisType === ChartType.HorizontalBar ) { chartOptions = lineOptions; }
    
    if ( !series || series.length === 0 ) {
      return null;
    } else {

      let myDataSets = series.map((s) => {
        return {
          label: s.title,
          data: s.sums,
        };
      });


      let theseValues = !series[selectedIndex] || series[selectedIndex].sums == null ? '' : series[selectedIndex].sums.map(
        (x) => {
          //console.log('x.toFixed', typeof x, x);
          if (typeof x == 'string') {
            return x;
          } else if ( !x || x == null ) {
            return null;
          } else {
            return x.toFixed(1);
          }
        }
      ).join();

      //Added this back to just clear that string value from chart.
      theseValues = null;

      let r = Math.random().toString(36).substring(7);

      return (
        <div style={{  }}>
            <ChartControl 
            type={ thisType }
            ref={ r }
            data={{
                labels: series[ selectedIndex === -1 ? 0 : selectedIndex ].labels,
                datasets: myDataSets
            }}
            options={ chartOptions } />
        <div>{ theseValues }</div>
        </div>
    );
  }
}



export function creatLineChart(parentProps:IGenericWebpartProps , parentState: IGenericWebpartState, series: IChartSeries){

  // set the options
  const options: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales:
    { yAxes:[{ticks:{beginAtZero: true}}] }
  };

  return (
    <div style={{ }}>
        <ChartControl 
        type={ChartType.Line}
        data={{
            labels: series.labels,
            datasets: [{
            label: series.title,
            data: series.sums
            }]
        }}
        options={options} />

    </div>

  );

}
