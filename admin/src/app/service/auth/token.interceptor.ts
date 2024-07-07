import { HttpErrorResponse, HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { User } from '../../interface/auth.interface';
import { UserService } from '../user.service';
import { LoaderService } from '../loader.service';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = new LoaderService();
  loaderService.showLoadingSpinner(); 
  const localToken = localStorage.getItem('token');
  const userService = inject(UserService);
  let user: User | null = null;
  const userStr = localStorage.getItem('user');
  user = userStr ? JSON.parse(userStr) : null;
  let id: number | null = null;
  let tenantId: number | null = null;

  if (user) {
    id = user.id;
    tenantId = user.tenantId;
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localToken}`,
    },
    params: new HttpParams({ fromString: req.params.toString() })
      .set('userId', String(id))
      .set('tenantId', String(tenantId))
  });
  return next(authReq).pipe(
    finalize(() => {
      loaderService.hideLoadingSpinner(); 
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status==401){
        userService.logOut();
      }
      return throwError(()=> error);
    })
  )
};
