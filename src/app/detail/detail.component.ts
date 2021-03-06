import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Name } from '../../entities/ngrx/name';
import { NameService } from '../name.service';
import { Store } from '@ngrx/store';
import * as namesActions from '../../entities/ngrx/actions';
import { selectAllHeroes, getSelectedHero } from '../../entities/ngrx/reducer';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input()
  hero: Name;

  @Input()
  heros: Name;

  hero$: Observable<Name>;
  heros$: Observable<Name[]>;

  constructor(
    private route: ActivatedRoute,
    private nameService: NameService,
    private location: Location,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getHeros();
  }

  ngOnDestroy(){
    this.hero = null;
  }

  public getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.select(selectAllHeroes).subscribe(heroes=>{
      this.hero = heroes.find(hero => hero.id == id);
    });
  }

  public getHeros(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heros$ = this.store.select(selectAllHeroes);
  }

  public onGoBack(): void {
    this.router.navigate([`/heroes`])
  }

  public onSave(): void {
   this.store.dispatch(new namesActions.UpdateHero(this.hero));
   this.router.navigate([`/heroes`])
  }
}
