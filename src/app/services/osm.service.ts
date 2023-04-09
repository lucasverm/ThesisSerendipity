import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OsmService {

  constructor(private router: Router, private http: HttpClient) { }

  getMapData$(lat: Number = 51.05349346, lon: Number = 3.71974349, around: Number = 2200): Observable<any> {
    let data = `[out: json];
    (
      //Amenity: 
      node[amenity = bar](around: ${around}, ${lat}, ${lon}); node[amenity = biergarten](around: ${around}, ${lat}, ${lon});
    node[amenity = cafe](around: ${around}, ${lat}, ${lon});
    node[amenity = fast_food](around: ${around}, ${lat}, ${lon});
    node[amenity = food_court](around: ${around}, ${lat}, ${lon});
    node[amenity = ice_cream](around: ${around}, ${lat}, ${lon});
    node[amenity = pub](around: ${around}, ${lat}, ${lon});
    node[amenity = restaurant](around: ${around}, ${lat}, ${lon});
    //Amenity: Entertainment, Arts & culture
    node[amenity = arts_centre](around: ${around}, ${lat}, ${lon});
    node[amenity = casino](around: ${around}, ${lat}, ${lon});
    node[amenity = cinema](around: ${around}, ${lat}, ${lon});
    node[amenity = community_centre](around: ${around}, ${lat}, ${lon});
    node[amenity = conference_centre](around: ${around}, ${lat}, ${lon});
    node[amenity = events_venue](around: ${around}, ${lat}, ${lon});
    node[amenity = exhibition_centre](around: ${around}, ${lat}, ${lon});
    node[amenity = fountain](around: ${around}, ${lat}, ${lon});
    node[amenity = gambling](around: ${around}, ${lat}, ${lon});
    node[amenity = music_venue](around: ${around}, ${lat}, ${lon});
    node[amenity = nightclub](around: ${around}, ${lat}, ${lon});
    node[amenity = planetarium](around: ${around}, ${lat}, ${lon});
    node[amenity = public_bookcase](around: ${around}, ${lat}, ${lon});
    node[amenity = social_centre](around: ${around}, ${lat}, ${lon});
    node[amenity = studio](around: ${around}, ${lat}, ${lon});
    node[amenity = theatre](around: ${around}, ${lat}, ${lon});
    //Historic
    node[historic](around: ${around}, ${lat}, ${lon});
    //Leisure
    node[leisure](around: ${around}, ${lat}, ${lon});
    //Shop
    node[shop](around: ${around}, ${lat}, ${lon});
    //Sport
    node[sport](around: ${around}, ${lat}, ${lon});
    //tourism
    node[tourism](around: ${around}, ${lat}, ${lon});
  
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

  getJsonData(): Observable<any> {
    return this.http.get<any>('./assets/data/data.json');
  }

  getJsonTestData(): Observable<any> {
    return this.http.get<any>('./assets/data/test_data.json');
  }

  getSimilarityBetweenMainCategories() {
    const data = new Map<string, Map<string, number>>();

    const amenity = new Map<string, number>();
    amenity.set('amenity', 1);
    amenity.set('historic', 0.12574850299401196);
    amenity.set('leisure', 0.17482517482517482);
    amenity.set('shop', 0.4396039603960396);
    amenity.set('tourism', 0.14432989690721648);

    const historic = new Map<string, number>();
    amenity.set('amenity', 0.12574850299401196);
    amenity.set('historic', 1.0);
    amenity.set('leisure', 0.132);
    amenity.set('shop', 0.1839080459770115);
    amenity.set('tourism', 0.16853932584269662);

    const leisure = new Map<string, number>();
    amenity.set('amenity', 0.17482517482517482);
    amenity.set('historic', 0.132);
    amenity.set('leisure', 1.0);
    amenity.set('shop', 0.3728813559322034);
    amenity.set('tourism', 0.1991150442477876);

    const shop = new Map<string, number>();
    amenity.set('amenity', 0.4396039603960396);
    amenity.set('historic', 0.1839080459770115);
    amenity.set('leisure', 0.3728813559322034);
    amenity.set('shop', 1.0);
    amenity.set('tourism', 0.21710526315789474);

    const tourism = new Map<string, number>();
    amenity.set('amenity', 0.14432989690721648);
    amenity.set('historic', 0.16853932584269662);
    amenity.set('leisure', 0.1991150442477876);
    amenity.set('shop', 0.21710526315789474);
    amenity.set('tourism', 1.0);

    data.set('amenity', amenity);
    data.set('historic', historic);
    data.set('leisure', leisure);
    data.set('shop', shop);
    data.set('tourism', tourism);
    return data;
  }
}