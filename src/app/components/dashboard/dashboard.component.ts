import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartService } from './../../services/chart.service';
import { TagService } from './../../services/tag.service';
import { AuthService } from './../../services/auth.service';
import { CustomDateRangeDialogComponent } from '../custom-date-range-dialog/custom-date-range-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  loading: boolean = true;
  tags: any[] = [
    {id: '', title: 'All Tags'}
  ];
  selectedTag: any = '';
  apiUrl = environment.apiUrl;
  authToken = this.authService.getCurrentUser().authentication_token;
  times: any[] = [
    { period: 7,
      label: 'Last 7 days'
    },
    {
      period: 30,
      label: 'Last 30 days'
    },
    {
      period: 90,
      label: 'Last 3 months'
    },
    {
      period: 365,
      label: 'Last year'
    },
    {
      period: -1,
      label: 'Custom Range'
    }
  ];
  selectedTime: any;
  fromDate: any;
  toDate: any;
  previousTime: any;
  lineChartData: Array<any> = [{ data: [], label: '' }];
  lineChartLabels: Array<any> = [];
  lineChartOptions: any = { responsive: true };
  totalDownload: number;
  totalRead: number;

  constructor(
    private chartService: ChartService,
    private authService: AuthService,
    private tagService: TagService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.selectedTime = this.times[0];
    this.previousTime = this.selectedTime;
    this.selectedTag = this.tags[0].id;
    this._setFilterDate(this.times[0].period);
    this.loadRefData();
    this.fetchData();
  }

  loadRefData() {
    this.tagService.getAll()
      .subscribe(result => {
        for (let tag of result['tags']) {
          this.tags.push(tag);
        }
      }
  }

  _setFilterDate(numOfDayAgo) {
    this.toDate = new Date();
    this.toDate.setHours(23,59,59,999);
    this.fromDate = new Date(this.toDate.getFullYear(), this.toDate.getMonth(), this.toDate.getDate() - numOfDayAgo)
    this.fromDate.setHours(0,0,0,0);
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

  fromDateParams() {
    return encodeURIComponent(this.fromDateStr() + " " + "00:00:00")
  }

  toDateParams() {
    return encodeURIComponent(this.toDateStr() + " " + "23:59:59")
  }

  fromDateStr() {
    return this.fromDate.toLocaleDateString("km-kh");
  }

  toDateStr() {
    return this.toDate.toLocaleDateString("km-kh");
  }

  showDialog() {
    let dialogRef = this.dialog.open(CustomDateRangeDialogComponent, {
      width: '500px',
      data: { from: this.fromDate, to: this.toDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.fromDate = result.from;
        this.toDate = result.to;
        this.selectedTime = this.times[this.times.length - 1];
        this.fetchData();
        return;
      }

      if (!!this.fromDate) { return; }

      this.selectedTime = this.previousTime;
    });
  }

  downloadUrl() {
    let url = `${this.apiUrl}story_downloads.xlsx?from=${this.fromDateParams()}&to=${this.toDateParams()}&Authorization=${this.authToken}`;
    
    if (!!this.selectedTag) {
      url = `${url}&tag_id=${this.selectedTag}`;
    }

    return url;
  }

  filterDate() {
    if (this.selectedTime.period == -1) {
      return this.showDialog();
    }

    this.previousTime = this.selectedTime;
    this._setFilterDate(this.selectedTime.period);
    this.fetchData();
  }

  tagChanged(event) {
    this.selectedTag = event.value;
    this.fetchData();
  }

  fetchData() {
    let dateRange = Object.assign({}, {from: this.fromDateParams(), to: this.toDateParams()});

    this.chartService.getAll({tag_id: this.selectedTag, dateRange: dateRange})
      .subscribe(result => { 
        this.loading = false;
        this._setChartData(result['data'])
      })
  }
}
