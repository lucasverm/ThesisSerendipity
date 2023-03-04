import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OsmService {

  constructor(private router: Router, private http: HttpClient) { }

  getMapData$(around: Number = 2200, Xcor: Number = 51.05349346, Ycor: Number = 3.71974349): Observable<any> {
    let data = `[out: json];
    (
      //Amenity: 
      node[amenity = bar](around: ${around}, ${Xcor}, ${Ycor}); node[amenity = biergarten](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = cafe](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = fast_food](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = food_court](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = ice_cream](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = pub](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = restaurant](around: ${around}, ${Xcor}, ${Ycor});
    //Amenity: Entertainment, Arts & culture
    node[amenity = arts_centre](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = casino](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = cinema](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = community_centre](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = conference_centre](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = events_venue](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = exhibition_centre](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = fountain](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = gambling](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = music_venue](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = nightclub](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = planetarium](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = public_bookcase](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = social_centre](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = studio](around: ${around}, ${Xcor}, ${Ycor});
    node[amenity = theatre](around: ${around}, ${Xcor}, ${Ycor});
    //Historic
    node[historic](around: ${around}, ${Xcor}, ${Ycor});
    //Leisure
    node[leisure](around: ${around}, ${Xcor}, ${Ycor});
    //Shop
    node[shop](around: ${around}, ${Xcor}, ${Ycor});
    //Sport
    node[sport](around: ${around}, ${Xcor}, ${Ycor});
    //tourism
    node[tourism](around: ${around}, ${Xcor}, ${Ycor});
  
);
    out;`;
    let body = new URLSearchParams();
    body.set('data', data);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post(`${environment.osmUrl}`, body, options).pipe(
      //tap(d => console.log(`${d}`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  /*
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