import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let id: number = +next.url[1].path;
      if (isNaN(id) || id < 1) {
        alert("invalid product id");
        this.router.navigate(['/products']);
        return false;
      }
      return true;
  }
  
}
