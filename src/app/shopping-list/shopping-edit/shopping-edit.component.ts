import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') sLForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.sLForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onSubmit(form: NgForm) {
    console.log(form)
    const value = form.value

    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredients(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
