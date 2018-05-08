import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ChartService } from './../../services/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAdmin = this.authService.isAdmin();
  loading: boolean = true;
  dataSource: any[] = [1];
  stories: any[] = [{id: '', title: 'All Stories'}];
  selectedStory: any = '';
  times: any[] = [
    { period: 7,
      unit: 'days',
      label: '7 days'
    },
    {
      period: 30,
      unit: 'days',
      label: '30 days'
    },
    {
      period: 12,
      unit: 'months',
      label: '1 year'
    },
    {
      period: 'lifetime',
      unit: '',
      label: 'Lifetime'
    }
  ];
  selectedTime: any;
  lineChartData: Array<any> = [{ data: [], label: 'Story Downloads' }];
  lineChartLabels: Array<any> = [];
  lineChartOptions: any = { responsive: true };
  totalDownload: number;
  totalRead: number;

  constructor(
    private authService: AuthService,
    private chartService: ChartService,
  ) { }

  ngOnInit() {
    this.selectedTime = this.times[0];
    this._getData();
  }

  _getData() {
    this.chartService.getAll()
      .subscribe(result => {
        console.log(result);
        this.dataSource = result['data'];
        this.stories = this.stories.concat(result['meta']['stories']);
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

    this.totalDownload = data.map(o => o.story_downloads).reduce(function(a, b) { return a + b; });
    this.totalRead = data.map(o => o.story_reads).reduce(function(a, b) { return a + b; });
  }

  filterData() {
    this.chartService.getAll({story_id: this.selectedStory, time: this.selectedTime})
      .subscribe(result => {
        this._setChartData(result['data']);
      });
  }
}
