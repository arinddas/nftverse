import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';

interface IPFS {
  name: string
  description: string
  image: string
}

@Injectable({
  providedIn: 'root'
})

export class PinataService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  pinJsonToIpfs(data: IPFS): Observable<any> {
    const url: string = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    const headers = {
      headers: {
        pinata_api_key: environment.NFTVerse_PINATA_KEY,
        pinata_secret_api_key: environment.NFTVerse_PINATA_SECRET,
      }
    }
    return this.http.post(url, data, headers)
      .pipe(
        catchError(this.error)
      )
  }

  // Handle Errors 
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
