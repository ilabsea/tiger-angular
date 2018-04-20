import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.css'],
})

export class StoryPreviewComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  items = [
    { title: 'Slide 1' },
    { title: 'Slide 2' },
    { title: 'Slide 3' },
  ]

  addSlide() {
    this.items.push({
      title: `Slide 4`
    });
  }

  dataSource: any=[1];
  loading: boolean = true;
  story_id: string = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = false;
  }

}
