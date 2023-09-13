import { Component, PLATFORM_ID, Inject, NgZone, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements AfterViewInit, OnDestroy, OnInit {

  private outsidesData = [];
  private insidesData = [];
  private monlesisData = [];
  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone, private weatherService: WeatherService) { }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  refreshData(div: string, data: any[]) {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      const chart = am4core.create(div, am4charts.XYChart);

      chart.paddingRight = 20;

      chart.data = data;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.tooltipText = '{valueY.value}';

      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;

    });
  }

  ngOnInit() {

    this.weatherService.getOutsides().subscribe(list => {
      list.forEach((item) => {
        this.outsidesData.push({ date: new Date(item.time), value: item.temperature });
      });
      this.refreshData('chartoutsidesdiv', this.outsidesData);
    });

    this.weatherService.getInsides().subscribe(list => {
      list.forEach((item) => {
        this.insidesData.push({ date: new Date(item.time), value: item.temperature });
      });
      this.refreshData('chartinsidesdiv', this.insidesData);
    });

    this.weatherService.getMonlesis().subscribe(list => {
      list.forEach((item) => {
        this.monlesisData.push({ date: new Date(item.time), value: item.temperature });
      });
      this.refreshData('chartmonlesisdiv', this.monlesisData);
    });
  }

  ngAfterViewInit() {
    // this.refreshData();
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}

