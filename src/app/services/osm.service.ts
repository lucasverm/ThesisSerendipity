import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OsmService {

  constructor(private router: Router, private http: HttpClient) { }

  /*getDienstById$(id: string): Observable<Dienst> {
    return this.http.get(`${environment.apiUrl}/Dienst/${id}`).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      map(
        (d: any): Dienst => {
          d = Dienst.fromJSON(d);
          return d;
        }
      )
    );
  }

  addDienst$(
    naam: string,
    startDag: number,
    startUur: Date,
    eindDag: number,
    eindUur: Date,
    busChauffeurId: string,
    totaalAantalMinutenStationnement: number,
    onderbrekingen: Onderbreking[]
  ): Observable<Dienst> {
    return this.http
      .post<Dienst>(
        `${environment.apiUrl}/Dienst`,
        { naam, startUur, eindUur, startDag, eindDag, busChauffeurId, totaalAantalMinutenStationnement, onderbrekingen },
        { responseType: "json" }
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        map(
          (d: any): Dienst => {
            d = Dienst.fromJSON(d);
            return d;
          }
        )
      );
  }

  deleteDienst$(d: Dienst): Observable<Dienst> {
    return this.http.delete<Dienst>(`${environment.apiUrl}/Dienst/${d.id}`).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      map(
        (item: any): Dienst => {
          item = Dienst.fromJSON(item);
          return item;
        }
      )
    );
  }

  putDienst$(dienst: Dienst): Observable<Dienst> {
    return this.http
      .put<Dienst>(
        `${environment.apiUrl}/Dienst/${dienst.id}`,
        {
          id: dienst.id,
          naam: dienst.naam,
          startDag: dienst.startDag,
          startUur: dienst.startUur,
          eindDag: dienst.eindDag,
          eindUur: dienst.eindUur,
          busChauffeurId: dienst.busChauffeur.id,
          totaalAantalMinutenStationnement: dienst.totaalAantalMinutenStationnement,
          onderbrekingen: dienst.onderbrekingen,
        },
        { responseType: "json" }
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        map(
          (item: any): Dienst => {
            item = Dienst.fromJSON(item);
            return item;
          }
        )
      );
  }

  getAllDiensten$(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/Dienst/getAll`).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      map((list: any[]): any[] => {
        list = list.map(Dienst.fromJSON);
        return list;
      })
    );
  }*/
}