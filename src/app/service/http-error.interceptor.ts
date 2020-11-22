import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from "@angular/core";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    count = 0;

    constructor(private toastr: ToastrService, private spinner: NgxSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.reportProgress) {
            this.count++;
            this.spinner.show();
        }
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent || (error.error && error.error.message)) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    // window.alert(errorMessage);

                    this.toastr.error(errorMessage, '', {
                        timeOut: 10000
                    });
                    return throwError(errorMessage);
                }),
                finalize(() => {
                    if (request.reportProgress) {
                        this.count--;
                        if (this.count === 0) { this.spinner.hide(); }
                    }
                }),
            );
    }
}
