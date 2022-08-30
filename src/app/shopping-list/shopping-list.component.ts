import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList()
    this.igChangeSub = this.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
  }

  onDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }

}
