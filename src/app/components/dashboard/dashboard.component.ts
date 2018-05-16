import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartService } from './../../services/chart.service';
import { CustomDateRangeDialogComponent } from '../custom-date-range-dialog/custom-date-range-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  stories: any[] = [{id: '', title: 'All Stories'}];
  selectedStory: any = '';
  times: any[] = [
    { period: 7,
      period_unit: 'days',
      label: 'Last 7 days'
    },
    {
      period: 30,
      period_unit: 'days',
      label: 'Last 30 days'
    },
    {
      period: 90,
      period_unit: 'days',
      label: 'Last 3 months'
    },
    {
      period: 12,
      period_unit: 'months',
      label: 'Last year'
    },
    {
      period: '',
      period_unit: 'custom',
      label: 'Custom Range'
    }
  ];
  selectedTime: any;
  customDate: any = {};
  previousTime: any;
  lineChartData: Array<any> = [{ data: [], label: '' }];
  lineChartLabels: Array<any> = [];
  lineChartOptions: any = { responsive: true };
  totalDownload: number;
  totalRead: number;

  constructor(
    private chartService: ChartService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.selectedTime = this.times[0];
    this.previousTime = this.selectedTime;
    this._getData();
  }

  _getData() {
    this.chartService.getAll()
      .subscribe(result => {
        this.loading = false;
        this._setChartData(result['data']);
      });
  }

  _setChartData(data) {
    this.lineChartData = [
      { data: data.map(o => o.story_downloads), label: 'Downloads' },
      { data: data.map(o => o.story_reads), label: 'Reads' },
    ];

    setTimeout(() => {
      this.lineChartLabels = data.map(o => o.date);
    }, 10);

    this.totalDownload = data.map(o => o.story_downloads).reduce((a, b) => {return a + b});
    this.totalRead = data.map(o => o.story_reads).reduce((a, b) => {return a + b});
  }

  showDialog() {
    let dialogRef = this.dialog.open(CustomDateRangeDialogComponent, {
      width: '500px',
      data: this.customDate
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.customDate = result;
        this.filterData();
        return
      }

      if (!!this.customDate.from) { return; }

      this.customDate = {};
      this.selectedTime = this.previousTime;
    });
  }

  filterDate() {
    if (this.selectedTime.period_unit == 'custom') {
      return this.showDialog();
    }

    this.customDate = {};
    this.previousTime = this.selectedTime;
    this.filterData();
  }

  filterData() {
    let time = Object.assign({}, this.selectedTime, this.customDate);

    this.chartService.getAll({story_id: this.selectedStory, time: time})
      .subscribe(result => {
        this._setChartData(result['data']);
      });
  }
}
