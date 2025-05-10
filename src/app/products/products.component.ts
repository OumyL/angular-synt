import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-products',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone : true
})
export class ProductsComponent implements OnInit{
  products! : any ;
  constructor(private  productService : ProductService) {
  }
  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts():void{
    this.productService.getAllProducts().subscribe({
      next : resp  => {
        this.products = resp;
      },
      error : err => {
        console.log(err);
      }
    });
  }
  handleDelete(product: any) {
    let v = confirm(' etes vous sur de vouloir supprimer?');
    if (v==true){
      this.productService.deleteProduct(product).subscribe({
        next : value => {
          this.getAllProducts();
        },
        error : err => {
          console.log(err);
        }
      });
      this.getAllProducts();
    }
  }
}
