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

  getStatigJsonLdMapDataOsm() {
    return [ {
  "@id" : "http://ThesisLucasVermeulen.be/%26%20Other%20Stories",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535011"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722155"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "& Other Stories"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27T%20Dreupelkot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Groentenmarkt 12"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562737"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223415"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'T Dreupelkot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27T%20cafeetse",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057684"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7230808"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'T cafeetse"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Einde%20der%20Beschaving",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565441"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209311"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Einde der Beschaving"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Fabriekske",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564591"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6913965"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Fabriekske"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Floere%20Foefke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0595128"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7185744"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Floere Foefke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Fondueloft",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0583034"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270395"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Fondueloft"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Galgenhuisje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560284"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220492"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Galgenhuisje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Genoegen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395431"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256113"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Genoegen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Gouden%20Hoofd",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052815"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7383333"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Gouden Hoofd"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Gouden%20Mandeken",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Pensmarkt 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556149"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213257"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Gouden Mandeken"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 33 88"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Helse%20Stoofke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0575508"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256513"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Helse Stoofke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Hoekske",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661039"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268286"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Hoekske"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Hoeksken",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0641472"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7286556"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Hoeksken"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Hoogtepunt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0438345"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243234"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Hoogtepunt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Kanon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Meerseniersstraat 17"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0574567"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7244777"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Kanon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Klaverblad",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579392"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7233846"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Klaverblad"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Klokhuys",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Corduwaniersstraat 65"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579992"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7234983"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Klokhuys"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Koningshuis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 39"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0587194"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243453"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Koningshuis"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 468 02 05 84"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Moorken",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0392091"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7233787"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Moorken"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Oud%20Clooster",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zwartezustersstraat 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521608"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7191195"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Oud Clooster"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Paradijs%20van%20Wenemaar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Veerleplein 3"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564668"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212971"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Paradijs van Wenemaar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Pleintje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0402923"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7132064"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Pleintje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Poortje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567836"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7412481"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Poortje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Postje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0617003"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7104372"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Postje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Puntzakje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565057"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721631"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Puntzakje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Schuurken",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0630917"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6968161"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Schuurken"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Stamineetje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Salvatorstraat 108"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.067578"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7295611"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Stamineetje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Vosken",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534881"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260838"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Vosken"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Vrijdagsgevoel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569085"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266759"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Vrijdagsgevoel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Wokske",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Overpoortstraat 112"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.039015"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7258745"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Wokske"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 329 83 03"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Zuiden",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568242"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266224"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Zuiden"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20Zwijntje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0355737"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260257"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t Zwijntje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%27t%20geduld",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564568"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209734"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "'t geduld"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%C3%87aliskan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.056856"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7355261"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "??aliskan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%C3%87ukur",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0528671"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7470923"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "??ukur"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%C3%94%20Gand",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Griendijk 17"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0491478"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.695355"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "?? Gand"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%C3%94%20Gand%20City",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Botermarkt 4"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054356"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256914"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "?? Gand City"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 471 81 40 15"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/%E2%80%98t%20Prison",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564558"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212165"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "???t Prison"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/.NU",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521485"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7262662"
  } ],
  "http://schema.org/name" : [ {
    "@value" : ".NU"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/13%3A00%20o%27clock%20Hostel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508381"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7232097"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "13:00 o'clock Hostel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/1856%20Edward%20Anseele%201938",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477916"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7294909"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "1856 Edward Anseele 1938"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/1898%20The%20Post",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Graslei 16"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0541384"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209354"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "1898 The Post"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 391 53 79"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/1914-1918",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0663666"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7291799"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "1914-1918"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/1914-1918%20Anos%20Heros",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503821"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7278481"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "1914-1918 Anos Heros"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/1945-1995%2050%20Jaar%20Vrede",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0432488"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7333367"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "1945-1995 50 Jaar Vrede"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/2%20Bangkok",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572368"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245505"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "2 Bangkok"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 487 26 39 94"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/2de%20handsshop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0650231"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7395585"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "2de handsshop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/3.14",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556806"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224614"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "3.14"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/5%20voor%2012",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 18"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0546979"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215679"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "5 voor 12"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/5th%20G%C3%B6k",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566101"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7251846"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "5th G??k"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/9K",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0664602"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.733118"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "9K"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 474 43 89 26"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/A%20food%20affair",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548744"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7136199"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "A food affair"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/A.M.%20Club",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Schuurkenstraat 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535162"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721504"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "A.M. Club"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/A.S.Adventure",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zonnestraat 6"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0504897"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218544"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "A.S.Adventure"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 03 60"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/ABA-JOUR",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 20"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058065"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7241507"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "ABA-JOUR"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 234 07 29"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/AGK",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0593522"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7395319"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "AGK"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/AMB",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.055256"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7429341"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "AMB"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/AO76",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortedagsteeg 4"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503785"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7261697"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "AO76"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 61 32"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aap",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558453"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7280772"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aap"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Action",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0660866"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332802"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Action"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Adana",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0526929"
  }, {
    "@value" : "51.0531226"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7457224"
  }, {
    "@value" : "3.7471495"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Adana"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Adanaci",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0715819"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7308615"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Adanaci"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Adhemar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559358"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7271533"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Adhemar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Adriatico",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Limburgstraat 22"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523757"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7273165"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Adriatico"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 02 79"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aernoudt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 220"
  }, {
    "@value" : "Recollettenlei 1"
  }, {
    "@value" : "Sportstraat 229"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0386423"
  }, {
    "@value" : "51.0406965"
  }, {
    "@value" : "51.0506077"
  }, {
    "@value" : "51.0556111"
  }, {
    "@value" : "51.0611617"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7040289"
  }, {
    "@value" : "3.7157026"
  }, {
    "@value" : "3.7197271"
  }, {
    "@value" : "3.7223204"
  }, {
    "@value" : "3.7485525"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aernoudt"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 221 22 62"
  }, {
    "@value" : "+32 9 225 02 75"
  }, {
    "@value" : "+32 9 296 33 31"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aernout",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0357968"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260531"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aernout"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/African%20%26%20Asian",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0624124"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6986387"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "African & Asian"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Agenvino",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548246"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722929"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Agenvino"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Agnes%20%26%20Maurice",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Predikherenlei 9"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0529893"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721049"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Agnes & Maurice"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Agrea",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Baafsplein 44"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531142"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256863"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Agrea"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 85 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aida%27s%20sandwichbar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0525357"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7178629"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aida's sandwichbar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aile%20Kasabi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567162"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7355566"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aile Kasabi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Akdeniz",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sluizeken 21"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0598259"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72512"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Akdeniz"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 12 51"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Al%20Castello",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Geldmunt 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569293"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216012"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Al Castello"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 89 01"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Albert%20Heijn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 16"
  }, {
    "@value" : "Kouter 178"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395345"
  }, {
    "@value" : "51.0505958"
  }, {
    "@value" : "51.0541597"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214061"
  }, {
    "@value" : "3.7245725"
  }, {
    "@value" : "3.7262583"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Albert Heijn"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 23 27"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Albert%20Mechelynck",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0493152"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7339623"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Albert Mechelynck"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aldi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0399805"
  }, {
    "@value" : "51.0555688"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6967884"
  }, {
    "@value" : "3.7409026"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aldi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Alfa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Palinghuizen 96"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0669369"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6992957"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Alfa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Alfin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0351309"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7274911"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Alfin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Algemene%20Voeding%20Papatya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Contributiestraat 3"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564445"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7095596"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Algemene Voeding Papatya"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Alice",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0527419"
  }, {
    "@value" : "51.0537752"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7182358"
  }, {
    "@value" : "3.7195842"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Alice"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/All%20Ways",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562972"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72586"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "All Ways"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Allegro%20Moderato",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenlei 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0552703"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201795"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Allegro Moderato"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Alles%20op%20Eten",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Astridlaan 122"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0363998"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7142495"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Alles op Eten"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 222 86 55"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Alltech",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0516427"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7203229"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Alltech"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Alph%27",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0659534"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6987796"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Alph'"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Alphabed%20B%26B",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jan Palfijnstraat 26"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539632"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7298844"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Alphabed B&B"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Alto%20caf%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0349243"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7108847"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Alto caf??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Amadeus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Bagattenstraat 197-199"
  }, {
    "@value" : "Plotersgracht 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477548"
  }, {
    "@value" : "51.0579325"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722468"
  }, {
    "@value" : "3.7269992"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Amadeus"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 497 43 85 71"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Amatsu",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553068"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7238343"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Amatsu"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 47 06"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Amber",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0438794"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7258587"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Amber"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ambiorix",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.051903"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268225"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ambiorix"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/America%20Today",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521436"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722326"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "America Today"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Amfora",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Mageleinstraat 49"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524963"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7249339"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Amfora"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 19 79"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Amour",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Salvatorstraat 18"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0657845"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7294001"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Amour"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 352 05 70"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Amplifon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0491283"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7311375"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Amplifon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Amsterdam%2C%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0682717"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332263"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Amsterdam, Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Amuzzi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0405115"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7308069"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Amuzzi"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 42 88"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Anar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0596751"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245218"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Anar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Andr%C3%A9%20Aperobar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 90"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0589652"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7249104"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Andr?? Aperobar"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 311 80 86"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Andromeda",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Overpoortstraat 48"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0402905"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254478"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Andromeda"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 221 44 44"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aneta",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Prinses Clementinalaan 199"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0357198"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.712488"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aneta"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Angel%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0635538"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6961165"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Angel's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ankara",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 44"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0583004"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7242468"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ankara"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 78 18"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ankietie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0600061"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7113296"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ankietie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ankr",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0469976"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220596"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ankr"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ann-Sofie%20Verbrugge%20illustrator",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Violettestraat 47"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0478025"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7342372"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ann-Sofie Verbrugge illustrator"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 488 87 44 65"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Antichi%20Sapori",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0446123"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263983"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Antichi Sapori"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 33 97"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Antiek%20%26%20Brocante",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0525558"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.750019"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Antiek & Brocante"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 494 99 84 52"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Antwerp%20Fried%20Chicken",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Wondelgemstraat 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0607241"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7104239"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Antwerp Fried Chicken"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 229 33 33"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Apcoa%20Fietsherstelpunt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0371717"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7084695"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Apcoa Fietsherstelpunt"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 473 33 89 11"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aperto%20Chiuso",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sleepstraat 82"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0613228"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.726594"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aperto Chiuso"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 72 64"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aqua%20Azul",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0589837"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243338"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aqua Azul"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Archer%20Street",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556431"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7226978"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Archer Street"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Arif",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0594247"
  }, {
    "@value" : "51.0629983"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7282616"
  }, {
    "@value" : "3.7460565"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Arif"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aroma",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0545912"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7233272"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aroma"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aroy%20Aroy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0586243"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214135"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aroy Aroy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Arpeggio%20Music",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Michielsstraat 17"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0541085"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7175367"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Arpeggio Music"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Art%20of%20Hair",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.066876"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.73271"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Art of Hair"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 477 02 42 77"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/ArtCinema%20OFFoff",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Steenstraat 14"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0589747"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221235"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "ArtCinema OFFoff"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Artikel%20Nr.",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Keizer Karelstraat 117"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0513423"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7331399"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Artikel Nr."
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Asian%20%26%20African%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.061904"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7103285"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Asian & African Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Asian%20Corner",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531027"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7229894"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Asian Corner"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Asian%20Grill",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Maria Hendrikaplein 38"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0374965"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7115138"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Asian Grill"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Asian%20King",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0465816"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222035"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Asian King"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aslan%20Gold",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Wondelgemstraat 4"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.060847"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7106555"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aslan Gold"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 87 53"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Asmin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 326"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0604715"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.747785"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Asmin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Astro%20Boy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0600565"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7302631"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Astro Boy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Athene",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaanderenstraat 83"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0505004"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7300515"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Athene"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 92 26"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Atlas%20%26%20Zanzibar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 19"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0413737"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.718581"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Atlas & Zanzibar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Atlas%20B%26B",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rabotstraat 40"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0580372"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7141842"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Atlas B&B"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Au%20Bon%20Marche",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Martelaarslaan 421"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0486941"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7080535"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Au Bon Marche"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Au%20Bon%20march%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoornstraat 4"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522996"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215173"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Au Bon march??"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 269 02 60"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Au%20nom%20du%20pied",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569703"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7317734"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Au nom du pied"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Augustijntje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0594418"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209653"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Augustijntje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Australian",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0530815"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223323"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Australian"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Authentic%20Canton%20Cuisine",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Drabstraat 34"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553349"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7185516"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Authentic Canton Cuisine"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Auto-Products%20Coppens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brusselsesteenweg 11"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0413201"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7418694"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Auto-Products Coppens"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 231 05 21"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ava",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korte Meer 14-22"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0511856"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722584"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ava"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Avalon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0547804"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7177237"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Avalon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Avance",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0506616"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213975"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Avance"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aveve",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Niklaasstraat 17"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532465"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7232843"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aveve"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Avventura",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Violettestraat 62"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0476312"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7340039"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Avventura"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 37 92"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Axeswar%20Design",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Pietersnieuwstraat 12"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0485389"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7269601"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Axeswar Design"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531512"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7456233"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aya"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ayuno",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korte Meer 22B"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508619"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224217"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ayuno"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 12 41"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Aywa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0479391"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7281563"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Aywa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Azaert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0495014"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7326772"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Azaert"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Azure%20Boutique",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521497"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212545"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Azure Boutique"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/B%C3%98EF",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0659181"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7319396"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "B??EF"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/BE%20O%20Versmarkt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Heilige-Geeststraat 30"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532016"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7237261"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "BE O Versmarkt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/BXL",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0528788"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7470324"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "BXL"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Babu",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0480695"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.727158"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Babu"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bacchus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0402521"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254519"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bacchus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bakkerij%20De%20Brauwer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054305"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7435185"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bakkerij De Brauwer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bakkerij%20Franky",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Holstraat 103"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052658"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7144968"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bakkerij Franky"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bakkerij%20Van%20Hecke%20-%20Molenaarstraat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.059472"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7185747"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bakkerij Van Hecke - Molenaarstraat"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 20 48"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Baklavaland",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0619874"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7274011"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Baklavaland"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Balls%20%26%20Glory",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522978"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7202205"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Balls & Glory"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Bask",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Edward Pynaertkaai 150"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.041611"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7404147"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Bask"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Baudelo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Minnemeers 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0594674"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7286687"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Baudelo"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 493 09 40 08"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Beenhouwer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Annonciadenstraat 4"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0501219"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7168563"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Beenhouwer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Choque%202.0",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0397133"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257922"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Choque 2.0"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Des%20Amis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlasmarkt 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560482"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7284138"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Des Amis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Edward",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Speldenstraat 1-5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0585764"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260724"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Edward"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Lume",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vrijdagmarkt 33"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566963"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.726478"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Lume"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Mirwaar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Burgstraat 59"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562434"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7170051"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Mirwaar"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 478 20 95 50"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Oswald",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0680505"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7282649"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Oswald"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar%20Popular",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568295"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7269145"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar Popular"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bar-bier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0591545"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209055"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bar-bier"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Baravins",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572411"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7305956"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Baravins"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Barberattoo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058346"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7050299"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Barberattoo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Barbier%20Tom",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.040628"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7172387"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Barbier Tom"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Barbiet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0575501"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7261657"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Barbiet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bari",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brabantdam 103"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0499463"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.731136"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bari"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Barista",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hippoliet Lippensplein 25"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0501549"
  }, {
    "@value" : "51.0575703"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245434"
  }, {
    "@value" : "3.7300441"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Barista"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 488 46 98 30"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Barka",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0582636"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.705221"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Barka"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Barrazza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568282"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7231742"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Barrazza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Base",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.05711"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239527"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Base"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Base%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523812"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220672"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Base Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Basic%20Italian",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  }, {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  }, {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0361271"
  }, {
    "@value" : "51.0492872"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7110491"
  }, {
    "@value" : "3.7266145"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Basic Italian"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 475 25 84 89"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Basic-Fit",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 2-3"
  }, {
    "@value" : "Sint-Pietersnieuwstraat 124A"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0472906"
  }, {
    "@value" : "51.0552631"
  }, {
    "@value" : "51.0562157"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221499"
  }, {
    "@value" : "3.7267379"
  }, {
    "@value" : "3.7423748"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Basic-Fit"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Baskuul",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0436424"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7154125"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Baskuul"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 34 64"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Basta",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0492852"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7333925"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Basta"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bavet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0463023"
  }, {
    "@value" : "51.0555812"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215983"
  }, {
    "@value" : "3.7220038"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bavet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bayram",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0620104"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270776"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bayram"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Baziel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0371376"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7119329"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Baziel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Be%20Virtual",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0453111"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7231627"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Be Virtual"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bed%20in%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lucas Munichstraat 18"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553667"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7356613"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bed in Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bedo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0615292"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7105734"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bedo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Beer%20Central",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539661"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254944"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Beer Central"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Beer-corner",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565405"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215739"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Beer-corner"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Begonia",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0609998"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6936585"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Begonia"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Begrafenisonderneming%20Lenssens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Einde Were 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0504196"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7028157"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Begrafenisonderneming Lenssens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Belchicken",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0405047"
  }, {
    "@value" : "51.0522735"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6995244"
  }, {
    "@value" : "3.7257287"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Belchicken"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 486 69 74 24"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Beleg%20Van%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0367853"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7129689"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Beleg Van Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Belfort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557984"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7276144"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Belfort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Belfort%20Stadscaf%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539277"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7242703"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Belfort Stadscaf??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Belfort%20Stadsrestaurant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Emile Braunplein 40"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0538725"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7244599"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Belfort Stadsrestaurant"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bella%20Vista",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534283"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7247059"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bella Vista"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Belle%20%26%20Beau",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koning Albertlaan 139"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0417024"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7100376"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Belle & Beau"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Belle%20Epoque",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0488272"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7210071"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Belle Epoque"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Belleman",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0541322"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254928"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Belleman"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Beluso",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.045883"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222014"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Beluso"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Benny%20%26%20Ingrid",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561757"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7147848"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Benny & Ingrid"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523018"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7235503"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bentos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0607585"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.710679"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bentos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Berbat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0571644"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7319564"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Berbat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bereket",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0581333"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.742461"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bereket"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bernard%20%26%20Marijke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Aaigemstraat 29"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0385621"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7091609"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bernard & Marijke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bershka",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524794"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218924"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bershka"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Best%20Western",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogpoort 75"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0545875"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7262414"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Best Western"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bidon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539429"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7307454"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bidon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bierologie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0415989"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250597"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bierologie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bietini%20Design",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.049699"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7311007"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bietini Design"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bike%20Republic%20Gent%20Rooigem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rooigemlaan 2E"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0545833"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.697382"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bike Republic Gent Rooigem"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 247 04 75"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bike%20Republic%20Gent-Dampoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 184-190"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0588141"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7446982"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bike Republic Gent-Dampoort"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 247 04 90"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Biker",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Steendam 16"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569218"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7291781"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Biker"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 29 03"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Billie%20Rose",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0497641"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7321275"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Billie Rose"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bio-Planet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568605"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6970046"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bio-Planet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Biokapper",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zuidstationstraat 16"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0490052"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7326324"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Biokapper"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bioshop%20Pimpernel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Charles de Kerchovelaan 423"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0387777"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7259543"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bioshop Pimpernel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bistro%20Het%20Lam%20Gods",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0538123"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725531"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bistro Het Lam Gods"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bistro%20Madeleine",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Stoofstraat 6"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508312"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7196336"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bistro Madeleine"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 480 63 22 11"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bizar%20Hair",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0491998"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72667"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bizar Hair"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 234 12 98"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Blade%20beard",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569988"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7088301"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Blade beard"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Blazers%20en%20Blazers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.050972"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7022343"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Blazers en Blazers"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 14 28"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Blend",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0494836"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7298482"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Blend"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bloemen%20Marleentje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Prinses Clementinalaan 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0349301"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7159954"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bloemen Marleentje"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 220 61 40"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bloemen%20Volckaert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564235"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256334"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bloemen Volckaert"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 23 35"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Blokker",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553588"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722199"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Blokker"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bocca",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0505388"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7196943"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bocca"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bodega",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0368663"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7132141"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bodega"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bodo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567714"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7198567"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bodo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bodrum",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565881"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7420342"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bodrum"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Boek",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0429488"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7065071"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Boek"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Boekenruilvensterbank",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0632759"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7120307"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Boekenruilvensterbank"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bon%20Appetit",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0388874"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7106475"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bon Appetit"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bonami",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0517847"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7276234"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bonami"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 09 63"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bonobo%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0361563"
  }, {
    "@value" : "51.048282"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7101059"
  }, {
    "@value" : "3.7297754"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bonobo's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bookz%26Booze",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0551237"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7242219"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bookz&Booze"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Boon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Geldmunt 6"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057089"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215716"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Boon"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 477 77 01 81"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Boonants%20Shoe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 143"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0463798"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222742"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Boonants Shoe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Borluut",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0547139"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223114"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Borluut"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bosporus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535181"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7444723"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bosporus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bostoen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0656911"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7319787"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bostoen"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 468 45 55 17"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Boteco",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0493032"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7443593"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Boteco"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bouwland",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0719155"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7259476"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bouwland"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bouwshop%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.061425"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7035835"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bouwshop Gent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 278 88 87"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Brabantdam",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0498375"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7316748"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Brabantdam"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Brasil",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535192"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7234377"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Brasil"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Brasserie%20de%20Jacob",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0575053"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257626"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Brasserie de Jacob"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Breadfast",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0488028"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7378823"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Breadfast"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 81 89"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Brico",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565365"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253576"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Brico"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Brico%20Ledeberg",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brusselsesteenweg 292"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0403944"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7417299"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Brico Ledeberg"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bridge",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.053455"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7261745"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bridge"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bril%20Concept",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661758"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.732642"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bril Concept"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 277 93 89"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Brocant%20Balthazar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569624"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7269655"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Brocant Balthazar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Broche",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0549252"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220403"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Broche"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Broesse",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0576823"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7264761"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Broesse"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Broodnodig",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0357829"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7262724"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Broodnodig"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Broodpunt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057926"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7277901"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Broodpunt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Brut%20Nature",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.048135"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7342557"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Brut Nature"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bubbles%20at%20Home",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kleine Vismarkt 4"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565454"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218381"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bubbles at Home"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Buffalo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vogelmarkt 24"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.050487"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7252426"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Buffalo"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 35 72"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Burg%20139",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561769"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7148685"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Burg 139"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Burger%20King",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0546338"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215461"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Burger King"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Buurtbibliotheek",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0520396"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7078171"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Buurtbibliotheek"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Buurtcentrum%20De%20Vaart",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0429871"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7433093"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Buurtcentrum De Vaart"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 210 47 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Buurthuis%20Zilverhof",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zilverhof 34B"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0593299"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7171488"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Buurthuis Zilverhof"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Buurtsporthal%20Melopee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kompasplein 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0642823"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7377721"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Buurtsporthal Melopee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Buurtwinkel%20de%20Baere",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Forelstraat 46"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477897"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7414055"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Buurtwinkel de Baere"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Bygone",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Niklaasstraat 12"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532676"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7229879"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Bygone"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/C%26A",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0552004"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221302"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "C&A"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/C%27est%20fou",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0441382"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7126824"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "C'est fou"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/COS",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortedagsteeg 2F"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0504628"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260813"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "COS"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/CRU%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kouter 177;178"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0506475"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7248793"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "CRU Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caermersklooster",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0585842"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223293"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caermersklooster"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Afsnis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569695"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7274134"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Afsnis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Albatros",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vrijdagmarkt 34"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566706"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7264224"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Albatros"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Bornhem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Michielsstraat 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0537374"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7183104"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Bornhem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Cengoo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0529769"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7465904"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Cengoo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Cong%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0617646"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6964782"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Cong??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20De%20Croone",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564448"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255867"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? De Croone"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20De%20Poel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Michielsstraat 33"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543002"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7172974"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? De Poel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20De%20Walrus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Coupure Links 497"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502348"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7101423"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? De Walrus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Gomez",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oude Beestenmarkt 4"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543361"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7310449"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Gomez"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Labath",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543509"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7167503"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Labath"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Oud%20Patershol",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 45"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0589028"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245131"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Oud Patershol"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Parti",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Maria Hendrikaplein 65"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0372939"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.71036"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Parti"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 242 32 91"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Ren%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Gebroeders Vandeveldestraat 2-4"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508001"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7198219"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Ren??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caf%C3%A9%20Th%C3%A9atre",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496595"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215867"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caf?? Th??atre"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cafe%20Des%20Arts",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0498676"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217501"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cafe Des Arts"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cafetaria%20Aula",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0510766"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7235244"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cafetaria Aula"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cafetaria%20Blandijn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0444597"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254542"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cafetaria Blandijn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cafetaria%20Coupure",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532836"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7072957"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cafetaria Coupure"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cafetaria%20De%20Brug",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0458842"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.727219"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cafetaria De Brug"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cafetaria%20Ledeganck",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.036311"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239671"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cafetaria Ledeganck"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Caff%C3%A8%20Rosario",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Emile Braunplein 11"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534878"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7240802"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Caff?? Rosario"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Calzedonia",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522914"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220307"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Calzedonia"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Camille%20Haegeman",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395763"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7117879"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Camille Haegeman"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Camillo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 1"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0375794"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7152698"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Camillo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Canard%20Bizar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Overpoortstraat 94"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0394308"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256688"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Canard Bizar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Capitol",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487481"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7343643"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Capitol"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Capitole",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0481106"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7321395"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Capitole"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Capri",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058327"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7429114"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Capri"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carhartt%20WIP",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0483328"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270645"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carhartt WIP"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 09 93"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carlos%20Quinto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558031"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268487"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carlos Quinto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carlton",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Astridlaan 138"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0364208"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7139965"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carlton"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carmelitana",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Burgstraat 92"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563976"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7162348"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carmelitana"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carpentia",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572271"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7262629"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carpentia"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carpet-Stock",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567935"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7364961"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carpet-Stock"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carrefour",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Burgstraat 103"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562099"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7161214"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carrefour"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carrefour%20Express",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hendrikaplein 7"
  }, {
    "@value" : "Vrijdagmarkt 54"
  }, {
    "@value" : "Zwijnaardsesteenweg 68"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0347978"
  }, {
    "@value" : "51.0370666"
  }, {
    "@value" : "51.041234"
  }, {
    "@value" : "51.0427915"
  }, {
    "@value" : "51.0473754"
  }, {
    "@value" : "51.0487733"
  }, {
    "@value" : "51.0542978"
  }, {
    "@value" : "51.0566899"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7120295"
  }, {
    "@value" : "3.7216897"
  }, {
    "@value" : "3.7250032"
  }, {
    "@value" : "3.7253578"
  }, {
    "@value" : "3.7256754"
  }, {
    "@value" : "3.7305721"
  }, {
    "@value" : "3.7310667"
  }, {
    "@value" : "3.7363232"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carrefour Express"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Carrefour%20Market",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Broederlijke-Weversplein 1"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535894"
  }, {
    "@value" : "51.0568963"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7004163"
  }, {
    "@value" : "3.7427406"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Carrefour Market"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Casa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553058"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221666"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Casa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Casa%20Serenas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vrijdagmarkt 27"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057104"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266786"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Casa Serenas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Casa%20de%20las%20Tapas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0577357"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228966"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Casa de las Tapas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Casa%20del%20Capriccio",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553358"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7288174"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Casa del Capriccio"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cassiers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0592758"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7043813"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cassiers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cassis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572954"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.724915"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cassis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Castelnou%20Aparthotel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0495293"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7391171"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Castelnou Aparthotel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Castor%20%26%20Pollux",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0636518"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7289268"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Castor & Pollux"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Catberry",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0486271"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.734174"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Catberry"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cavatappi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Poel 10"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543306"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.717096"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cavatappi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cece",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0598803"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7025953"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cece"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cemsu",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0631602"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254915"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cemsu"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ch%C3%A9ouc",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0571432"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7317216"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ch??ouc"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Chambelland",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508873"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7277468"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Chambelland"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Champagnekelder",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542569"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7230239"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Champagnekelder"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Chapo%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0541701"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7304379"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Chapo's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Chapter%20one",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0373854"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7107351"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Chapter one"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Charlatan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlasmarkt 6"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.055988"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7284488"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Charlatan"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 24 57"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Charles%20Colyn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0432675"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7204097"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Charles Colyn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Charles%20de%20Kerchove%20de%20Denterghem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0413102"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7203868"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Charles de Kerchove de Denterghem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Chasse%20Patat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "IJzerlaan 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0426294"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7184037"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Chasse Patat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Chef%27s%20Secret",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0442433"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217947"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Chef's Secret"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cheri%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568968"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7358661"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cheri's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Chez%20Olivier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569191"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7293023"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Chez Olivier"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/China%20Paleis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Prinses Clementinalaan 136"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0359143"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7128787"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "China Paleis"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 220 17 52"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Chocolaterie%20Vandenbouhede",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0527184"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246395"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Chocolaterie Vandenbouhede"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 222 17 81"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Chocolatier%20L.%20Van%20Hoorebeke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Baafsplein 15"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0537265"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255853"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Chocolatier L. Van Hoorebeke"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 221 03 81"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Christian",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0632588"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6969896"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Christian"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Circus%20Arena",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661859"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332093"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Circus Arena"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 09 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Claeys%20Bauwens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563926"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7160939"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Claeys Bauwens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Clochard%20de%20luxe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0584502"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72778"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Clochard de luxe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Closed%20Forever%21%21%21",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0687372"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7327775"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Closed Forever!!!"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Clouds%20in%20my%20coffee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 104"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0546829"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7430099"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Clouds in my coffee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Club%201847",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579691"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260968"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Club 1847"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Club%2069",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543718"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7311722"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Club 69"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Club%20Central",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0551416"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7234272"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Club Central"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cochon%20de%20luxe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brabantdam 113"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0498628"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7315607"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cochon de luxe"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 336 16 72"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Coco",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0491392"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7267593"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Coco"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Coconut",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0507218"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332893"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Coconut"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cocteau",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.05413"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7298899"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cocteau"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Coiffeur%20Rasschaert%20%26%20Zoon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0480927"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7278641"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Coiffeur Rasschaert & Zoon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Colle%20Collections",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522997"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7240897"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Colle Collections"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Collin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0513709"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7251782"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Collin"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 01 20"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Comic%20Sans",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542723"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722983"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Comic Sans"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Comilfo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502023"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212981"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Comilfo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Connections",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.050316"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220464"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Connections"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Coolcat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0527577"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220002"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Coolcat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Copain",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Zuid 22"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0577865"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7376442"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Copain"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 468 03 06 56"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Copy%20Cash",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0447851"
  }, {
    "@value" : "51.0487657"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7264376"
  }, {
    "@value" : "3.7341872"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Copy Cash"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Copy%20Center",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0432376"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253313"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Copy Center"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Copyright",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522981"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201045"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Copyright"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cosy%20room",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0631767"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7252892"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cosy room"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Coupe%20Coupe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 13"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578847"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.741871"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Coupe Coupe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Coupe%20Maison",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0591875"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7330288"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Coupe Maison"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cour%20St%20Georges",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0545735"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257844"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cour St Georges"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Craenkindershuys",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566837"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219683"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Craenkindershuys"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cremerie%20G%C3%A9rard",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Limburgstraat 36"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522054"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7275725"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cremerie G??rard"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 336 32 20"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Croqino%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ajuinlei 27"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508684"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.719884"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Croqino's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/CrossFit%20Cargo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0660258"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7324062"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "CrossFit Cargo"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 470 34 86 95"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cuba",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0397875"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255213"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cuba"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cube",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524209"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7196537"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cube"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cuberdon%20B%26B",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Wolterslaan 76"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0484696"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.749411"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cuberdon B&B"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Cyclobility",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kompasplein 16"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0649869"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7372398"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Cyclobility"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 396 42 13"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/D%20couture",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522911"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224631"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "D couture"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/D%27Pedro%20Navaja",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0552408"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.728939"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "D'Pedro Navaja"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/D%C3%BCnya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.06194"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270044"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "D??nya"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/D-nails",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0460028"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7305381"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "D-nails"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/DANSPUNT",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0658077"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7298684"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "DANSPUNT"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/DI%20beauty",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566401"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250927"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "DI beauty"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/DIDI",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0527449"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222523"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "DIDI"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/DJJ",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563773"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7105904"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "DJJ"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Da%20Adriano",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562141"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260126"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Da Adriano"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Da%20Pino",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0512084"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7252708"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Da Pino"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dagit%20Linux%20Solutions",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hubert Fr??re-Orbanlaan 34"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0459549"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7330984"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dagit Linux Solutions"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 478 43 62 99"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dagwinkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562243"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7109971"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dagwinkel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dagwinkel%20Ekkergem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Charles Andrieslaan 9"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487678"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7057822"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dagwinkel Ekkergem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Damass",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.055164"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222123"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Damass"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Damberd",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 19"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054743"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215725"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Damberd"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Damme",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0464692"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222406"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Damme"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dampoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567301"
  }, {
    "@value" : "51.0567571"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7422207"
  }, {
    "@value" : "3.742253"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dampoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Daskalid%C3%A8s%20Pralines",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0514878"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6991984"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Daskalid??s Pralines"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Daskalides",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523125"
  }, {
    "@value" : "51.057614"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72519"
  }, {
    "@value" : "3.7254836"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Daskalides"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/David%20%26%20Goliath",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661135"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7327186"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "David & Goliath"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 324 60 46"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dayi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570576"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7379619"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dayi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Alchemist",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566334"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7206473"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Alchemist"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Appelier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Citadellaan 47"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0386683"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7281423"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Appelier"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 221 67 33"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Barnier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567499"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7230154"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Barnier"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Bassin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0455459"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7475684"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Bassin"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 494 86 66 14"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Biekorf",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0500667"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7136877"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Biekorf"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Blauwe%20Vogels",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524171"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7206542"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Blauwe Vogels"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Boei",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0652219"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7370222"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Boei"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Broodstokerij",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477275"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7342776"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Broodstokerij"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Bruyn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0555656"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255789"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Bruyn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Buck",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zwijnaardsesteenweg 76"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0346242"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256019"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Buck"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Buffel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Gandastraat 19A"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.053786"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.737858"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Buffel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Casserolle",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567696"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7340288"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Casserolle"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Centrale",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0612281"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7342868"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Centrale"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Citadel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0382411"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7289281"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Citadel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Cli%C3%A9nt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.049253"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266418"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Cli??nt"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 329 94 41"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Coster%20Roland",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057389"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250906"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Coster Roland"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Dampoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568574"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7423696"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Dampoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Dulle%20Griet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565707"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725268"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Dulle Griet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Frietketel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Papegaaistraat 89"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0506061"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7115416"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Frietketel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 329 40 22"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Frietschap",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rooigemlaan 185"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569113"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6936877"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Frietschap"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 471 01 82 38"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Geest",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.047289"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217293"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Geest"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Gekroonde%20Hoofden",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567576"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7196432"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Gekroonde Hoofden"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Gentenaar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0504177"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7297649"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Gentenaar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Gentse%20Kookwinkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0669052"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7333621"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Gentse Kookwinkel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 96 36"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Geus%20van%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0414627"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7287884"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Geus van Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Gouden%20Klok",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0381141"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7105229"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Gouden Klok"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Gouden%20Pluim",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0575854"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255667"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Gouden Pluim"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Graslei",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Graslei 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054947"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.720996"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Graslei"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Grauwe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556386"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7076187"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Grauwe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Griek",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.038699"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7264614"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Griek"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Grill",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0540206"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7199849"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Grill"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Groote",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0538553"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.730203"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Groote"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Gulden%20Valk",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0571992"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263339"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Gulden Valk"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Huiszwaluw",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0510408"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7194673"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Huiszwaluw"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Kafaar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0349842"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7272857"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Kafaar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Kaft",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 8"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0485971"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212412"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Kaft"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Karper",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0419106"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7187212"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Karper"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Kastart",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0520143"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7196261"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Kastart"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 36 27"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Kleine%20Kunst",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0475659"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.739394"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Kleine Kunst"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Klok",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0372249"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7095843"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Klok"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Koepuur",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Coupure Links 651"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0526986"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7092506"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Koepuur"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Koer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0599263"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6966103"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Koer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Koningskaars",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568806"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270943"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Koningskaars"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Kringwinkel%20Ateljee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Getouwstraat 5"
  }, {
    "@value" : "Kortrijksepoortstraat 44"
  }, {
    "@value" : "Prinses Clementinalaan 189"
  }, {
    "@value" : "Vlaamsekaai 10"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0355929"
  }, {
    "@value" : "51.044015"
  }, {
    "@value" : "51.0459544"
  }, {
    "@value" : "51.071849"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7128787"
  }, {
    "@value" : "3.7140459"
  }, {
    "@value" : "3.7219245"
  }, {
    "@value" : "3.7415113"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Kringwinkel Ateljee"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 07 15"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Kroon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0421608"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253361"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Kroon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Loge",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Annonciadenstraat 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0499561"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7168939"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Loge"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Maecht%20van%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054807"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223192"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Maecht van Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Mokke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 219"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0608902"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7478941"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Mokke"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 68 56 68 29"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Moraal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0389913"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7164468"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Moraal"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20More",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Salvatorstraat 82"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0673677"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7295365"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De More"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Nachtuil",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0454825"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7229981"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Nachtuil"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Nieuwe%20Onvrije%20Schipper",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0551906"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201778"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Nieuwe Onvrije Schipper"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Nieuwe%20Reinaert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Keizervest 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0419083"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7394721"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Nieuwe Reinaert"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Omgekeerde%20Wereld",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0475502"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7271089"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Omgekeerde Wereld"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 498 62 74 10"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Orchidee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496922"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7307227"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Orchidee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Papegaai",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0500402"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7164564"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Papegaai"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Parkiet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569419"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225031"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Parkiet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Passanten",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0484221"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7288163"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Passanten"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Pauw%20Mulier%20Antiquairs",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522956"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7204799"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Pauw Mulier Antiquairs"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Phoenix",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0576175"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.707019"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Phoenix"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Ploeg",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0482878"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7273256"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Ploeg"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Poort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0465152"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222216"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Poort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Post",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 16"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542094"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213236"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Post"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Postiljon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567997"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72657"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Postiljon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Rechtvaardige%20Rechters",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534302"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7262553"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Rechtvaardige Rechters"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Salon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Zuid 3"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0571749"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7379289"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Salon"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 55 64"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Slegte",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521294"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7237957"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Slegte"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Smul",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Stalhof 11"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.039766"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263879"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Smul"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Spinnekop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Einde Were 44"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508311"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.702435"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Spinnekop"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 00 88"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Stervende%20Gladiator",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0469115"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.731665"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Stervende Gladiator"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Stoffenkamer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Coupure Rechts 122"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477368"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7147635"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Stoffenkamer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Trein%20der%20Traagheid",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 142"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0369603"
  }, {
    "@value" : "51.0370675"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7124435"
  }, {
    "@value" : "3.7125247"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Trein der Traagheid"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Vagant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0403849"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725643"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Vagant"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Velomaker",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rooigemlaan 193"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570655"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6932882"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Velomaker"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 45 95"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Viking",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0382449"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.726496"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Viking"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Wakko%20Kapper",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0509037"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7295312"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Wakko Kapper"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Walpoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0486793"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268451"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Walpoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Wan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0641428"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7289761"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Wan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Waterzooi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564822"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213917"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Waterzooi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Winne",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0547841"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.729526"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Winne"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Witte%20Leeuw",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Graslei 6"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0551301"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212206"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Witte Leeuw"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Zeppos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlasmarkt 13"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558091"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7281342"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Zeppos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Zevende%20Hemel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569082"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7380477"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Zevende Hemel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Zilveren%20Puntzak",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0358334"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7262805"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Zilveren Puntzak"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20Zuidpool",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Tweebruggenstraat 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0472861"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7331057"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De Zuidpool"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20abt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0519556"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256186"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De abt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20brug",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0659247"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7087863"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De brug"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20horizon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0517134"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7367103"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De horizon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20kapperie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0584868"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7496717"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De kapperie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20kuip%20van%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0549867"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216658"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De kuip van Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20muze",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.048626"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7317096"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De muze"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20onzekere%20tijd",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054917"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725001"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De onzekere tijd"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20school%20van%20toen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0554405"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7172867"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De school van toen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20stroppendrager",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0595873"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7151932"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De stroppendrager"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20wereld%20van%20Shan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568633"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216739"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De wereld van Shan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/De%20zus%20van%20Marrit",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0479218"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7275824"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "De zus van Marrit"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 477 75 21 72"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Decoseat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0480474"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216468"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Decoseat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Deduytschaever%20Chocolatier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534176"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246218"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Deduytschaever Chocolatier"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Deep%20Fix",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570494"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7087222"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Deep Fix"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dehaeck",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0577966"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7065491"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dehaeck"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Delhaize",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Noord 7"
  }, {
    "@value" : "Koningin Fabiolalaan 3"
  }, {
    "@value" : "Kouter 158"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0372919"
  }, {
    "@value" : "51.050462"
  }, {
    "@value" : "51.0660997"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7079129"
  }, {
    "@value" : "3.7231695"
  }, {
    "@value" : "3.7334121"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Delhaize"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 11 19"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Deluxe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0639954"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7258097"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Deluxe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Den%20Briel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Abraham Voortmanstraat 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0655991"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218871"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Den Briel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 430 20 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Den%20Buroo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0391975"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7335006"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Den Buroo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Den%20Hoet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0604016"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.710219"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Den Hoet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Den%20T%C3%BCrk",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0649149"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263811"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Den T??rk"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Denis%20Foley%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0550607"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211653"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Denis Foley's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Depos%27it",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570011"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.726924"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Depos'it"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Destyle",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534461"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7439406"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Destyle"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dhillon%20Voeding",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Neermeerskaai 87"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.044297"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7045965"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dhillon Voeding"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 385 96 34"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Diallo%27s%20Take-out",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Denijslaan 155"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0345806"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7110713"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Diallo's Take-out"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dille%20en%20Kamille",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoornstraat 15"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521051"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209836"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dille en Kamille"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 91 12"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dine%20Van%20Hijfte",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0412514"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7413868"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dine Van Hijfte"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Discovery%20store",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0505092"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216241"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Discovery store"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Django",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 330"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0608272"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7481278"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Django"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dobbelaere",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0623891"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250923"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dobbelaere"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dogan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566315"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.741582"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dogan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dogs%20%26%20Drinks",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0431958"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7162827"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dogs & Drinks"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 498 29 63 28"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dok%20Brewing%20Company",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0657736"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7319684"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dok Brewing Company"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dok%20Interiors",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0671614"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7327372"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dok Interiors"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 70 83"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dok%20Koon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kammerstraat 15"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561566"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.726734"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dok Koon"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 279 51 70"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dolfijn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Begijnengracht 34"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562625"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7129508"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dolfijn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Domestica",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0516651"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7197918"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Domestica"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Domino%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Astridlaan 226"
  }, {
    "@value" : "Overpoortstraat 57"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0367231"
  }, {
    "@value" : "51.038895"
  }, {
    "@value" : "51.0572551"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7127722"
  }, {
    "@value" : "3.7262987"
  }, {
    "@value" : "3.7426094"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Domino's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Door%2073",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogstraat 73"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0552314"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7124047"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Door 73"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 277 00 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dossche%20Sport",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 36"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579136"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7425934"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dossche Sport"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 228 22 14"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Downstairs",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054774"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223188"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Downstairs"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Doxtudio",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0666498"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7330144"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Doxtudio"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 486 74 20 36"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Doy%20Doy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0625875"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7101575"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Doy Doy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dragon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568488"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7351131"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dragon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Draperie%20Centrum%20Artevelde",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563404"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257881"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Draperie Centrum Artevelde"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dreamcatchers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0551433"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253584"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dreamcatchers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dreamland",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rooigemlaan 2E"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054568"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6973533"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dreamland"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 236 13 98"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Drinks%2052",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lindenlei 1"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0489071"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7194746"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Drinks 52"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Du%20Progr%C3%A8s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0545869"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222811"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Du Progr??s"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Duchesse",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532319"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254078"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Duchesse"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dulle%20Griet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0573042"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7241156"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dulle Griet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dun%20Huang",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 166"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0397186"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7164735"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dun Huang"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 245 96 48"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dunant%20Print",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Einde Were 23C"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.050974"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7011879"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dunant Print"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dune%20Records",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579461"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209257"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dune Records"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Dunkin%27",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566437"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7234234"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Dunkin'"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eat%20Love%20Lasagna",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Onderbergen 25"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0517748"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.719832"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eat Love Lasagna"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eat%20Love%20Pizza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ajuinlei 10a"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0517255"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7203476"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eat Love Pizza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/EbbenGoud",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564616"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7287437"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "EbbenGoud"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ecco",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0469056"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220961"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ecco"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eco%20Market",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.064761"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7395805"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eco Market"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eco-Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0655834"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.739471"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eco-Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ecohostel%20Andromeda",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Bargiekaai 35"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0592566"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7065254"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ecohostel Andromeda"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 486 67 80 33"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Edel%20Gedacht",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0513417"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254276"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Edel Gedacht"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Edelsmid%20Ingrid%20Adriaenssens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562192"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266227"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Edelsmid Ingrid Adriaenssens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eden",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572802"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7261703"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eden"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Edgar%20Kaasbar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Steendam 62"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570787"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303103"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Edgar Kaasbar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Edis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0622175"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7102449"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Edis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Edmond%20van%20Beveren",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.038292"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254558"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Edmond van Beveren"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eethaven",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.067126"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332495"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eethaven"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 472 33 72 36"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eethuis%20De%20Fobie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brusselsepoortstraat 61"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.044505"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7362854"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eethuis De Fobie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eethuis%20Toreke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0633561"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7117834"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eethuis Toreke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eetkaffee%20Multatuli",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Huidevetterskaai 40"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0610035"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7278472"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eetkaffee Multatuli"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Efsane",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533312"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7450985"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Efsane"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/El%20Amigo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.064317"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7336112"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "El Amigo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/El%20Baraka",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0607714"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7014328"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "El Baraka"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/El-Albaniya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0577096"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7067849"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "El-Albaniya"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Electron",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570829"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7267536"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Electron"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Electrostock",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0663413"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7331542"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Electrostock"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 277 06 77"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Elektro%20Loeters",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nieuwewandeling 127"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524905"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7005171"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Elektro Loeters"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Elite",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569792"
  }, {
    "@value" : "51.0670852"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7295434"
  }, {
    "@value" : "3.7388392"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Elite"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Elixir",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0400919"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254542"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Elixir"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ellis%20Gourmet%20Burger",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544541"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222265"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ellis Gourmet Burger"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Elt%C3%B2n",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Maria Hendrikaplein 36"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0373867"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7116599"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Elt??n"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Emile%20Claus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0365153"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219079"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Emile Claus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Emre",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.062535"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7101576"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Emre"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Erdin%C3%A7",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0643209"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7261818"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Erdin??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ergun",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0641223"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7096824"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ergun"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Erkan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0627685"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7098019"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Erkan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Es%20Es",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0536918"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7438294"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Es Es"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Escape%20Room%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0598002"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7324756"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Escape Room Gent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 494 81 52 42"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Esperanza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.063488"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.696319"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Esperanza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Esprit",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Veldstraat 47"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052029"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219254"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Esprit"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 2 273 64 41"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Esra",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Joriskaai 17"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568936"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7321484"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Esra"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 234 24 11"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Esthetiek%20Ilse%20D",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Lievenslaan 95"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0385726"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7341966"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Esthetiek Ilse D"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Etam",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0528199"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220272"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Etam"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eurotex",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0625567"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6988189"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eurotex"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Eva%27s%20appel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567307"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.735491"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Eva's appel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/EverGreen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0609926"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266528"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "EverGreen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Everest",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0631482"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6966538"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Everest"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Everest%20Gurkha",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 13"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0582011"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239252"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Everest Gurkha"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+31 88 205 0505"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Evin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0590879"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209192"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Evin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Excelsior",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564217"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7307489"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Excelsior"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Extravaganza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0536259"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6999543"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Extravaganza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fabiola",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0435598"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7248426"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fabiola"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Faim%20Fatale",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zuidstationstraat 14"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0490357"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7327338"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Faim Fatale"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 269 04 48"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fair%20Eco%20Fashion",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531665"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246271"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fair Eco Fashion"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fait%20Divers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0549247"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216336"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fait Divers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fatima",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0520751"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7179208"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fatima"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ferrara",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0488169"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7313669"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ferrara"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Festival",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogpoort 58"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543316"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260186"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Festival"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fetch",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0554857"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222711"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fetch"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fethi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0608802"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7337165"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fethi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fewa%20restaurant%20%26%20bar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Maria Hendrikaplein 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.037207"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7118078"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fewa restaurant & bar"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 242 02 93"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fietsatelier%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Pietersnieuwstraat 103"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0445038"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265978"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fietsatelier Gent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 489 74 21 23"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fietsenmaeker",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Amandstraat 19/001"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0432436"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7249442"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fietsenmaeker"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 495 61 03 66"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fietser.be%20velomobielen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Olijfstraat 31"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0634332"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7003727"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fietser.be velomobielen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fietspunt%20Dampoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oktrooiplein 10"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558183"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7396887"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fietspunt Dampoort"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 266 77 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Filiaert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0538374"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7184704"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Filiaert"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Filou%20%26%20Friends",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.05276"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.724778"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Filou & Friends"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/First%20impression",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0369289"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266324"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "First impression"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fitchen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0486145"
  }, {
    "@value" : "51.0554918"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219933"
  }, {
    "@value" : "3.7315388"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fitchen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Flair",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0623871"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6940755"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Flair"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Flordi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0643168"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7289388"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Flordi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Flying%20Tiger%20Copenhagen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0484376"
  }, {
    "@value" : "51.0508033"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211672"
  }, {
    "@value" : "3.7295904"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Flying Tiger Copenhagen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fnac",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Veldstraat 47B"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0518687"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217749"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fnac"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Folklore",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0593734"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223429"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Folklore"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fonduehuis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567362"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265196"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fonduehuis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Foot%20Locker",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0516422"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721365"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Foot Locker"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 234 09 14"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Forza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0657258"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7323472"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Forza"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 311 52 23"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fossil",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523683"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218546"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fossil"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Foto%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544533"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7388689"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Foto Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fotograeve",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566326"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6946661"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fotograeve"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fran%C3%A7oise",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.056966"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7366389"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fran??oise"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frank%20De%20Clercq%20Design",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Jacobsnieuwstraat 91"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054568"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7301597"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frank De Clercq Design"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 475 26 43 32"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Franky",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Violettestraat 7"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0485292"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7342319"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Franky"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Franzgustav",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.06139"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7338536"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Franzgustav"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Freak%20Out",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0468839"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218735"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Freak Out"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frederik%20van%20Pamel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0511218"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7195129"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frederik van Pamel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Friends",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0573333"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250209"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Friends"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/FrietTime",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.048091"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7277839"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "FrietTime"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frietboetiek",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0420137"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7394595"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frietboetiek"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frietcultuur",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0411273"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7276412"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frietcultuur"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frites%20Atelier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Groentenmarkt 20"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559222"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225716"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frites Atelier"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fritk%C3%B4t",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0361968"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7107012"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fritk??t"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Bargie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0575099"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7078978"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Bargie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Bij%20Sint-Jacobs",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568515"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7280115"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Bij Sint-Jacobs"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20De%20Kaai",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Karperstraat 204"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0454968"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7434782"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur De Kaai"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20De%20Kraanlei",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567909"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721975"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur De Kraanlei"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Einde%20Were",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Einde Were 73"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521448"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6996553"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Einde Were"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Ekkergem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antonius Triestlaan 45"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0499375"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7040531"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Ekkergem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Filip",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558592"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217477"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Filip"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Frans%20Hooiaard",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553376"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215853"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Frans Hooiaard"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Jozef",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0573263"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725387"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Jozef"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Tartaar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Heilige-Geeststraat 3"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533304"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239146"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Tartaar"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 467 05 10 02"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Vlasmarkt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559053"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7279834"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Vlasmarkt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frituur%20Zuid",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0492831"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7310325"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frituur Zuid"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Frou%20Frou",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0708067"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.729954"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Frou Frou"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fruitboetiek%20De%20Tant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Voldersstraat 50"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523059"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7236385"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fruitboetiek De Tant"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fry%20Willy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogpoort 3"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556824"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7229223"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fry Willy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fuga",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Corduwaniersstraat 63"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579761"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.723447"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fuga"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 470 80 61 10"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Full%20Circle%20Coffee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0489991"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332985"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Full Circle Coffee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Funke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570503"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7277344"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Funke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Funni",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562138"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7141776"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Funni"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Furkan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0630321"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.697915"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Furkan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Fusilli",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0492037"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7307666"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Fusilli"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Futura%202000",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Schoolstraat 15"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0600368"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7485716"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Futura 2000"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/G%C3%B6k%202",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sleepstraat 65/A"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.060887"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7258389"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "G??k 2"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/G%C3%B6ki%27s%20Barbershop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578192"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7423205"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "G??ki's Barbershop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/G%C3%BCl",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567042"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7414919"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "G??l"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/G%C3%BCnes",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533939"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7312491"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "G??nes"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/G-Star%20Raw",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052143"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225282"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "G-Star Raw"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gado%20Gado",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vrouwebroersstraat 21"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0585776"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217242"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gado Gado"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Galeria%20Inno",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0511869"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211853"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Galeria Inno"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Galerie%20Du%20Bonheur",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 140"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0370146"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7126874"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Galerie Du Bonheur"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Galleria%20Laurenzo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522804"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253972"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Galleria Laurenzo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Galleria%20Laurenzo%20-%20Women%20%26%20Kids",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522929"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246575"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Galleria Laurenzo - Women & Kids"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Game%20Mania",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567001"
  }, {
    "@value" : "51.0642784"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6936412"
  }, {
    "@value" : "3.7351798"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Game Mania"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gandor%20Lingerie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Violettestraat 45"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0478385"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7342362"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gandor Lingerie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gantoinette",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564641"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.719957"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gantoinette"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Garage%20-%20Carrosserie%20De%20Vuyst",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0609156"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7314422"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Garage - Carrosserie De Vuyst"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Garden%20in%20the%20City",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zwijnaardsesteenweg 66"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0348635"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257172"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Garden in the City"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Garderobe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564311"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7199839"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Garderobe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gast",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 15"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058231"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239616"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gast"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gedenkbeeld%20vermiste%20personen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0575938"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7207801"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gedenkbeeld vermiste personen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gedo%27s%20kitchen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Belfortstraat 28"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557651"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7275651"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gedo's kitchen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Geert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544256"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7304272"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Geert"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Geketende%20Slaven",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0384843"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243047"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Geketende Slaven"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gelaude",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogpoort 21"
  }, {
    "@value" : "Normaalschoolstraat 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0380938"
  }, {
    "@value" : "51.0553985"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7235513"
  }, {
    "@value" : "3.7261926"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gelaude"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gent%20Centrum%20Yacht%20Club",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0472755"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.720397"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gent Centrum Yacht Club"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 479 24 63 88"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gent%20Winkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0346162"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7109247"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gent Winkel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gents%20Barbershop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Salvatorstraat 18"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0654441"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7294892"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gents Barbershop"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 473 58 15 72"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gents%20Universiteitsmuseum",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Karel Lodewijk Ledeganckstraat 35"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0359404"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7232481"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gents Universiteitsmuseum"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 264 49 30"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gentse%20Gruut%20Brouwerij",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rembert Dodoensdreef 31a"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0575406"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7302251"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gentse Gruut Brouwerij"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gentse%20Neuzen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557363"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224312"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gentse Neuzen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gerry%20Weber",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0571765"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7240554"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gerry Weber"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gewapende%20Weerstand%201940-1945",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0432658"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7333676"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gewapende Weerstand 1940-1945"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ghent%20River%20Hotel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0581732"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256482"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ghent River Hotel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Giardino%20di%20Roma",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogstraat 3"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543832"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7164316"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Giardino di Roma"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 76 02"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gigi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556025"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7273534"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gigi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gillis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0545126"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.714831"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gillis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ginger",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Niklaasstraat 52"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0525364"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228128"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ginger"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gino%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566977"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7349634"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gino's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Giraf",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558781"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7280305"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Giraf"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Giri",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561522"
  }, {
    "@value" : "51.0561953"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201748"
  }, {
    "@value" : "3.7202105"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Giri"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gitane",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Meerseniersstraat 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057406"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246013"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gitane"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 477 34 01 35"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Giuseppe%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542834"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228914"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Giuseppe's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gloria",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559603"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7278884"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gloria"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Go%C3%BBts%20%26%20Couleurs%20Gand",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Groentenmarkt 15"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561029"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223297"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Go??ts & Couleurs Gand"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 467 01 94 80"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Go.fre",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521348"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217196"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Go.fre"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Godot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hooiaard 8"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0554976"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217254"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Godot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Goesting",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523891"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7210955"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Goesting"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Golden%20Friet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Begijnhoflaan 131"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566615"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7100041"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Golden Friet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Golden%20Gai",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567697"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7341267"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Golden Gai"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Golden%20Ring",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0401617"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7173573"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Golden Ring"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gotron",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Violettestraat 8"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0485216"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7339703"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gotron"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 42 02"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gouden%20Paard",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0529556"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7458892"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gouden Paard"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Graaf",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0605957"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7205543"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Graaf"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/GrandOptical",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0510125"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213978"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "GrandOptical"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Grapes%20of%20glory",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.040666"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7172934"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Grapes of glory"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gravensteen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560219"
  }, {
    "@value" : "51.0564685"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7197092"
  }, {
    "@value" : "3.7197324"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gravensteen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Grill%20Mix",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503088"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7302641"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Grill Mix"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Grimod",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0368925"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7132938"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Grimod"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 222 37 71"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Groenweghe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0391186"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7086029"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Groenweghe"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 222 19 72"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Groenzaal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Boomgaardstraat 114"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0516888"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7319959"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Groenzaal"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Grote%20Sikkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogpoort 64"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0541723"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266959"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Grote Sikkel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gryson%20Concept%20Store",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koning Albertlaan 9"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0376326"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7108568"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gryson Concept Store"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 221 67 82"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Guerrilla%20Street%20Food",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561032"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7287134"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Guerrilla Street Food"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gulzar%20IT",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548926"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7428598"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gulzar IT"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Gustave%20Labens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395747"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7117935"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Gustave Labens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/H%26M",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0484022"
  }, {
    "@value" : "51.0529237"
  }, {
    "@value" : "51.056583"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225366"
  }, {
    "@value" : "3.7236371"
  }, {
    "@value" : "3.7302566"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "H&M"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/H%C3%A9l%C3%A8ne",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0602966"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7474902"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "H??l??ne"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/H%C3%BCnkar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0608081"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7017421"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "H??nkar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/HD",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553908"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7121409"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "HD"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/HD%20400",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542795"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221536"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "HD 400"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/HEMA",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 3"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0482937"
  }, {
    "@value" : "51.0549519"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223202"
  }, {
    "@value" : "3.7295498"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "HEMA"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 267 65 60"
  }, {
    "@value" : "+32 9 269 94 10"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ha%27",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0497771"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7230476"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ha'"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 265 91 81"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hair%20Palace",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502031"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7172942"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hair Palace"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hairtime",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0576727"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7068895"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hairtime"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hairway%20to%20heaven",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0549564"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7296722"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hairway to heaven"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Haktan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0416091"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7296666"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Haktan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Han",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0689263"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7297961"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Han"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Handelsbeurs%20Concertzaal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496035"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7232222"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Handelsbeurs Concertzaal"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hans%20Anders",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 3"
  }, {
    "@value" : "Vlaanderenstraat 72"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502707"
  }, {
    "@value" : "51.0552336"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221408"
  }, {
    "@value" : "3.7299109"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hans Anders"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hasard",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0497644"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7307023"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hasard"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hasta%20Ma%C3%B1ana",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0480977"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7283731"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hasta Ma??ana"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hattis%20Ontbijthuis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0549865"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7128612"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hattis Ontbijthuis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hawaiian%20pok%C3%A9%20bowl",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.049121"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7308308"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hawaiian pok?? bowl"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hawin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566781"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7355978"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hawin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Heilig-Hartbeeld%20van%20J.%20Cornelius",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0493846"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7345067"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Heilig-Hartbeeld van J. Cornelius"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Helan%20Zorgwinkel%20Gent%20Sint-Pieters",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 302"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0373277"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7154752"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Helan Zorgwinkel Gent Sint-Pieters"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Helios",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0648763"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7094543"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Helios"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Herbacos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572171"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246298"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Herbacos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Herdenkingsplek%20Jolien%20Verniers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.067873"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219192"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Herdenkingsplek Jolien Verniers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hero",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0348765"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7150935"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hero"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20Geuzenhuis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kantienberg 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0414328"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7287623"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het Geuzenhuis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20Lepelblad",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052145"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7196275"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het Lepelblad"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20Moment",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566587"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7187501"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het Moment"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20Oorcussen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0573645"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250558"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het Oorcussen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20Restaurant%20Ateljee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaamsekaai 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0439411"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7413213"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het Restaurant Ateljee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20Verzet%201940-1944",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0433326"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.733431"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het Verzet 1940-1944"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20rode%20meisje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533708"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7347864"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het rode meisje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20spijker",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Pensmarkt 3"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0555621"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212431"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het spijker"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Het%20wijnhuis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569903"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7336357"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Het wijnhuis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Heursel%201745",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558126"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7227089"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Heursel 1745"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Heuvelpoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0370373"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266653"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Heuvelpoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hierbas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0372475"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7094468"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hierbas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hilde%20Devolder%20Chocolatier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Burgstraat 43"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562821"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7175709"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hilde Devolder Chocolatier"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Himalaya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532861"
  }, {
    "@value" : "51.0579065"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7238157"
  }, {
    "@value" : "3.7252577"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Himalaya"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Himalaya%20Exotic",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0426218"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7379497"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Himalaya Exotic"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Himalaya%20Market",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brusselsepoortstraat 160;162"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0420635"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7393015"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Himalaya Market"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Himschoot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 112"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.037134"
  }, {
    "@value" : "51.0557129"
  }, {
    "@value" : "51.0660797"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7129816"
  }, {
    "@value" : "3.7224951"
  }, {
    "@value" : "3.7320841"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Himschoot"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 467 04 90 41"
  }, {
    "@value" : "+32 491 52 83 31"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hinkelspel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ferdinand Lousbergskaai 33"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0501065"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7379013"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hinkelspel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 20 96"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hippolyte%20Metdepenningen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0501942"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7206663"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hippolyte Metdepenningen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hoff%20Open%20Air%20Cinema",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0680823"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7226336"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hoff Open Air Cinema"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hola%20Food",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Noord 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0667631"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7327466"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hola Food"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 324 44 44"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Holland%20%26%20Barrett",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Langemunt 48"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568474"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7238862"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Holland & Barrett"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 75 88"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Holy%20Guacamoly",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 4"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0377767"
  }, {
    "@value" : "51.048953"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7149192"
  }, {
    "@value" : "3.7312829"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Holy Guacamoly"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hoogpoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Kwintensberg 34"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.045413"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228521"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hoogpoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hopduvel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0664452"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7329233"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hopduvel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hopper",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0591195"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7454388"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hopper"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 84 42"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Horeca%20Center%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535924"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7425492"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Horeca Center Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Horn%20ok%20please",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Jacobsnieuwstraat 45"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0550396"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7295377"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Horn ok please"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 467 09 39 23"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hot%20Club%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Schuddevisstraatje 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563166"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7226405"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hot Club Gent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 256 71 99"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hot%20Couture",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0515871"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7197657"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hot Couture"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hot%20Falafel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brusselsesteenweg 17A"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  }, {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  }, {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0373003"
  }, {
    "@value" : "51.0411736"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7104171"
  }, {
    "@value" : "3.742148"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hot Falafel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 477 17 62 05"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hot%20Shots",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0399182"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254857"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hot Shots"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hotel%20Castel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0371616"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7118793"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hotel Castel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hotel%20Cathedral",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Jacobsnieuwstraat 87"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0546548"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7300653"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hotel Cathedral"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hotel%20Columbo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Fonteineplein 43"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0621726"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6962172"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hotel Columbo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hotel%20Erasmus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0549446"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7179457"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hotel Erasmus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hotel%20Flandria",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0540805"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7292616"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hotel Flandria"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hotel%20Harmony",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kraanlei 37"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.05713"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7227518"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hotel Harmony"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hotel%20de%20Flandre",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548248"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7181044"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hotel de Flandre"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hotsy%20Totsy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogstraat 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543749"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7165113"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hotsy Totsy"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 20 12"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/House%20of%20Media",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "studio"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "studio"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487285"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7287823"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "House of Media"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/House%20of%20vintage",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568249"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7347976"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "House of vintage"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hubo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 136"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531004"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7431023"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hubo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Huis%20Diegenant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Lievenspoortstraat 228"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0411632"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7363941"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Huis Diegenant"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hulpiau",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522925"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222648"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hulpiau"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Hunkem%C3%B6ller",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531524"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223645"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Hunkem??ller"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Huzaar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0475706"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218358"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Huzaar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/IBtravel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0610553"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7480628"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "IBtravel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/ICI%20PARIS%20XL",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 3"
  }, {
    "@value" : "Veldstraat 84"
  }, {
    "@value" : "Woodrow Wilsonplein 4"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.048741"
  }, {
    "@value" : "51.0513884"
  }, {
    "@value" : "51.0550254"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212712"
  }, {
    "@value" : "3.7221805"
  }, {
    "@value" : "3.7303835"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "ICI PARIS XL"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/IJsster",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rijsenbergstraat 8"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0394632"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.706573"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "IJsster"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 377 59 25"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ibis%20Gent%20Centrum%20Opera",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0484729"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211612"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ibis Gent Centrum Opera"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ibis%20Gent%20Centrum%20St%20Baafs%20Kathedraal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Limburgstraat 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0528387"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7261984"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ibis Gent Centrum St Baafs Kathedraal"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 00 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ichi%20Bites",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0397697"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265944"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ichi Bites"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Il%20Cortile",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kraanlei 53"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572651"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7231206"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Il Cortile"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Il%20Divo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568034"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7344555"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Il Divo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Il%20Faro",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0409037"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243052"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Il Faro"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 351 51 27"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Il%20Folletto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Drabstraat 30"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0554033"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7188157"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Il Folletto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Il%20Mezzogiorno",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Baudelokaai 17"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.059415"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.729933"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Il Mezzogiorno"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Illinois",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0513195"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.719649"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Illinois"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Illyrian",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Fran??ois Laurentplein 8"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0507739"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7277468"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Illyrian"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Im%20Happy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487167"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7375997"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Im Happy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Imparator",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543474"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7431053"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Imparator"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/In%20den%20oven",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0386875"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.727311"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "In den oven"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/In-Choc",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Veerleplein 13"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568958"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721634"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "In-Choc"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 48 56"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Inci%20mode",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0623896"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7102008"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Inci mode"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/India%20Palace",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 11"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0581469"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239455"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "India Palace"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 330 32 83"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Indian%20Curry%20House",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Michielsstraat 8"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539314"
  }, {
    "@value" : "51.0541594"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7174775"
  }, {
    "@value" : "3.718244"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Indian Curry House"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 371 79 41"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Inezdra%20Bouw%20-%20Ramen%20%26%20Deuren",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 305"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0526141"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7493941"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Inezdra Bouw - Ramen & Deuren"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 483 01 98 89"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Infokantoor%20Toerisme%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562954"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212016"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Infokantoor Toerisme Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Iris%20Aper",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0478377"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7313698"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Iris Aper"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Isis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0625565"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6983637"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Isis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Isparta",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Pietersnieuwstraat 106"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.047904"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7271614"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Isparta"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Istanbul",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058063"
  }, {
    "@value" : "51.0624551"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7101722"
  }, {
    "@value" : "3.7447115"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Istanbul"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Italia%20grill",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496724"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.734054"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Italia grill"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Izmir",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.053263"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7448817"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Izmir"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/J.J.S",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0506932"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7189822"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "J.J.S"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/JACQUELINE",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jakobijnenstraat 12"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523006"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7198952"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "JACQUELINE"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 77 65"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/JBC",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0473083"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7091602"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "JBC"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/JC%20Style",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563545"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6943496"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "JC Style"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/JD%20Sport",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0519213"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72155"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "JD Sport"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/JIMS%20Fitness%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rooigemlaan 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0554498"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6963559"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "JIMS Fitness Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/JIMS%20fitness%20Overpoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0393363"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.726307"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "JIMS fitness Overpoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/JNM-Winkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksepoortstraat 192"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0440995"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216954"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "JNM-Winkel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 47 81"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jack%20%26%20Jones",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0512858"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721453"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jack & Jones"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 10 87"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jacob%20van%20Artevelde",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569844"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256398"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jacob van Artevelde"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jacoba%20Vintage%20%26%20Brocante",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521381"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.717926"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jacoba Vintage & Brocante"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jacqlin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533725"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245635"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jacqlin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jacques%20en%20Patrich%20Dutilleul",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0597212"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.727789"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jacques en Patrich Dutilleul"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jacquet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0490772"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7308656"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jacquet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jaffa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558689"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7203218"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jaffa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jake",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521352"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228078"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jake"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jalman",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0599881"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7024322"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jalman"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jan%20Cremer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kramersplein 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0413627"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257513"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jan Cremer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jan%20Frans%20Willems",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533554"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255669"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jan Frans Willems"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jan%20Van%20den%20Bon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0398529"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7187678"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jan Van den Bon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jan%20van%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0498836"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7170535"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jan van Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Japanse%20waterstolp",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0603257"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265754"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Japanse waterstolp"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jaswal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0369864"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266558"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jaswal"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Java",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0489801"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7005729"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Java"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Javana",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521472"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213773"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Javana"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jay%27z",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoornstraat 10"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522914"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7210829"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jay'z"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 22 02"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jelle",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.059071"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7490977"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jelle"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jet%20Cars",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0667668"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7379136"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jet Cars"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jigger%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 16"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579767"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7240997"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jigger's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/JinJiang",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenlei 24"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539582"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7199527"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "JinJiang"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Joallier%20Delfio",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568477"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7271305"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Joallier Delfio"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jodi%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0574359"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7258746"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jodi's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/John%20Dory",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532094"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303623"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "John Dory"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 468 27 56 77"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/John%20Verniers%20%26%20Lydia%20Jossa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0625152"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6984469"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "John Verniers & Lydia Jossa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlasmarkt 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559381"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.728471"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jos%C3%A9%20Rizal%3A%201861%E2%80%931896",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Henegouwenstraat 9"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521856"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260086"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jos?? Rizal: 1861???1896"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Jour%20de%20F%C3%AAte",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Gustaaf Callierlaan 233"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0399187"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7349316"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Jour de F??te"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 66 45"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Juffrouw%20Strik",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559685"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225051"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Juffrouw Strik"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Julie%27s%20House",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 26"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0375854"
  }, {
    "@value" : "51.0567796"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7143789"
  }, {
    "@value" : "3.7218836"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Julie's House"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Julien",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0602847"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7389384"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Julien"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Julius%20Matthys",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.039579"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7117935"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Julius Matthys"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Just%20Hazel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brabantdam 136"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496176"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7320818"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Just Hazel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Juttu",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kouterdreef 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0511174"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250653"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Juttu"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/K%26M",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0634513"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7388301"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "K&M"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/K%C3%B6%C5%9Fe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0622168"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6990034"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "K????e"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/K%C3%BCbra",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0628293"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7283697"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "K??bra"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/K27",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0574126"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7259356"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "K27"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/KAROOT",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Phoenixstraat 77"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058227"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7053466"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "KAROOT"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 490 46 02 68"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/KASK%20caf%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0453772"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7152578"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "KASK caf??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kaba%20Hostel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Filips van Arteveldestraat 35"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503033"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7350839"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kaba Hostel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kadir",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0711892"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7305713"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kadir"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kantien",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kanodreef 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0473197"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7037377"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kantien"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 234 00 29"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kapitein%20Cravate",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 69"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.047518"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218414"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kapitein Cravate"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kapper%20Rooigem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0576728"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6928583"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kapper Rooigem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kapsalon%20Exclusief",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0404085"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7134703"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kapsalon Exclusief"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kapsalon%20Izmir",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0529396"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7458688"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kapsalon Izmir"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Karel%20de%20Stoute",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vrouwebroersstraat 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0581556"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225362"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Karel de Stoute"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Karreaux",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Henleykaai 4"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0427379"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.71675"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Karreaux"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 62 84"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kasteelmarket",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569717"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215632"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kasteelmarket"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kathy%20Van%20Landschoot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563798"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265713"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kathy Van Landschoot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kebab%20Love",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0497515"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.732212"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kebab Love"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kebap%2032",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0526892"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7484918"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kebap 32"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Keizershof",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564758"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255247"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Keizershof"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kelim%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567683"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218102"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kelim Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kenneth",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Coupure Links 499"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502833"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7100102"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kenneth"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kerman%20Kardesler",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0618984"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7269555"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kerman Kardesler"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ketchup",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521497"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216298"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ketchup"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kheder",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brugsepoortstraat 35"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565114"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7098888"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kheder"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 483 65 79 35"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Khorasan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566154"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7100681"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Khorasan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kilroy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0444059"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265614"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kilroy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kingslize",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Willem Wenemaerstraat 62"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0387755"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.730756"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kingslize"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 229 29 10"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kinky%20Star",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlasmarkt 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558889"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7284978"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kinky Star"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 48 45"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Klein%20Spook%20-%20Tante%20Rosa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Parklaan 80"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0347554"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7175574"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Klein Spook - Tante Rosa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kleindok",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kleindokkaai 25"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0594852"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7383906"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kleindok"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Klimzaal%20Stadium%20Coupure",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Coupure Links 625"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0510954"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7089472"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Klimzaal Stadium Coupure"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Klokke%20Roeland",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0540078"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.723669"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Klokke Roeland"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Klub%20XIII",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0401883"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256577"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Klub XIII"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Klusserette",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0529817"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7433805"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Klusserette"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Koedefoedre",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koestraat 21"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0509741"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7259574"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Koedefoedre"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Koffe%C3%AFne",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Kruisstraat 6"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0527084"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257298"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Koffe??ne"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 485 99 91 78"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kokerpark",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578831"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6988174"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kokerpark"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Komkommertijd",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Reep 14"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532692"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7304537"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Komkommertijd"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 485 73 16 17"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Komparto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0474939"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216394"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Komparto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kompass%20Klub",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0681065"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7226294"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kompass Klub"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Koning%20Albert%20I%20park",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0440849"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7324177"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Koning Albert I park"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Koning%20Boudewijn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0367742"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7170484"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Koning Boudewijn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Koningin%20Astridpark",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503774"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7380791"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Koningin Astridpark"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kookpunt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0536052"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228676"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kookpunt"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 30 40"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kopergietery",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Blekerijstraat 50"
  }, {
    "@value" : "Vlotstraat 22"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0595418"
  }, {
    "@value" : "51.0633212"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7118666"
  }, {
    "@value" : "3.7324094"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kopergietery"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Korenlei%202",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556356"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7204839"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Korenlei 2"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Korhan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0586203"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7049087"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Korhan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kr%C3%ABfel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rooigemlaan 2A"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557687"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6961746"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kr??fel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Krantenboetiek%20Dirk",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0436919"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7115834"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Krantenboetiek Dirk"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Krawietelke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0438167"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256449"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Krawietelke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kreatief",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0574826"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.741987"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kreatief"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kreatos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 132"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0464733"
  }, {
    "@value" : "51.0566632"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7094194"
  }, {
    "@value" : "3.7219626"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kreatos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Krokantino",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.055405"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219162"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Krokantino"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Krookcaf%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0493897"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7288161"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Krookcaf??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kruidvat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 112B"
  }, {
    "@value" : "Langemunt 14"
  }, {
    "@value" : "Overpoortstraat 49A"
  }, {
    "@value" : "Veldstraat 76"
  }, {
    "@value" : "Wondelgemstraat 62;64"
  }, {
    "@value" : "Woodrow Wilsonplein 4"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.039259"
  }, {
    "@value" : "51.0483788"
  }, {
    "@value" : "51.0517357"
  }, {
    "@value" : "51.0542242"
  }, {
    "@value" : "51.0560592"
  }, {
    "@value" : "51.0621415"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7102572"
  }, {
    "@value" : "3.7213973"
  }, {
    "@value" : "3.7230097"
  }, {
    "@value" : "3.7263477"
  }, {
    "@value" : "3.7300557"
  }, {
    "@value" : "3.7428792"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kruidvat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kulba%20Kabul",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0608109"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7103615"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kulba Kabul"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kultur%20Bakery",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Voldersstraat 8"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243186"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kultur Bakery"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 430 07 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kumar%20Dagwinkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogstraat 90"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0552099"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7127948"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kumar Dagwinkel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 491 08 64 43"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kunsthal%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Steenstraat 14"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0587825"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217775"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kunsthal Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Kwesto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553652"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214011"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Kwesto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/L%27Art%20Deco",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0383056"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265221"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "L'Art Deco"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/LAURENTPATRICK",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0404999"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7176114"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "LAURENTPATRICK"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/LDC%20De%20Vlaschaard",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jubileumlaan 219"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "social_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "social_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0442037"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7076763"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "LDC De Vlaschaard"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/LIFE",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0513637"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7196792"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "LIFE"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/LKKR",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542097"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255579"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "LKKR"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Bussola",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578448"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7417016"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Bussola"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 330 85 07"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Casa%20del%20Habano%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Limburgstraat 60"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052038"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7277569"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Casa del Habano Gent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 76 46"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Collina",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Kwintensberg 29"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0454297"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7230507"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Collina"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 63 44"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Ducale",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaanderenstraat 54"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0505757"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7295871"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Ducale"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Lanterna",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0552878"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7184469"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Lanterna"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Malcontenta",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0575702"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217227"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Malcontenta"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Pizzeria",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0401843"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7328238"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Pizzeria"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 53 03"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Provence",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0494559"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7355371"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Provence"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Rustica",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0463958"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268344"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Rustica"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 07 08"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20Stazione",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 48"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0375286"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7142189"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La Stazione"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20casa%20del%20Cubano",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0497756"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7320673"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La casa del Cubano"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/La%20viva",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0691898"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7078068"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "La viva"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ladbrokes",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0428589"
  }, {
    "@value" : "51.0524071"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6993376"
  }, {
    "@value" : "3.7169143"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ladbrokes"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lady%20Kapsalon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0607041"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7015226"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lady Kapsalon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Laila",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0371811"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7099864"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Laila"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Laila%20Day%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0376591"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7113494"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Laila Day Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Laila%20Night%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.037636"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7113701"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Laila Night Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lalee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0630319"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6970159"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lalee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lambert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0462522"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7161699"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lambert"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Larabesko",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Bagattenstraat 122"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0474294"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239515"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Larabesko"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Las%20Fiestas%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok Noord 7"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0666681"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7328046"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Las Fiestas Gent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 395 39 99"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Latin%20Quarter",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Overpoortstraat 76-80A"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0397099"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255387"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Latin Quarter"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Le%20Baan%20Thai",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Corduwaniersstraat 57"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578622"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7231959"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Le Baan Thai"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 21 41"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Le%20Bal%20Infernal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561488"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7261543"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Le Bal Infernal"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Le%20Botaniste",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoornstraat 13"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521451"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211327"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Le Botaniste"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Le%20Pain%20Quotidien",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0516213"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253764"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Le Pain Quotidien"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Le%20Petit%20Restaurant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0582763"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7233919"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Le Petit Restaurant"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Le%20pain%20total",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Pietersnieuwstraat 218"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0438721"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260824"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Le pain total"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Le%20piranha",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503564"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7338803"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Le piranha"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Leder%20Reyn%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0468557"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221156"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Leder Reyn??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lekker%20GEC",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0370046"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7121285"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lekker GEC"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Leonidas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534957"
  }, {
    "@value" : "51.0571656"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7236351"
  }, {
    "@value" : "3.7247608"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Leonidas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Les%20D%C3%A9lices%20de%20Mon%20Moulin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0486293"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7308793"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Les D??lices de Mon Moulin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Les%20Tartes%20de%20Fran%C3%A7oise",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0507461"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.728345"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Les Tartes de Fran??oise"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Les%20Tr%C3%A9sors",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lindenlei 1"
  }, {
    "@value" : "Oudburg 55"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.048919"
  }, {
    "@value" : "51.0590418"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7195764"
  }, {
    "@value" : "3.7247198"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Les Tr??sors"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Levi%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.050731"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214082"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Levi's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Libidos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496817"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7299707"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Libidos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lidl",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Frans van Ryhovelaan 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.051501"
  }, {
    "@value" : "51.0660252"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7019339"
  }, {
    "@value" : "3.7091382"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lidl"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Liezge",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0634246"
  }, {
    "@value" : "51.0642351"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6938782"
  }, {
    "@value" : "3.695821"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Liezge"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lijnwinkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0369625"
  }, {
    "@value" : "51.0536045"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7088409"
  }, {
    "@value" : "3.7227995"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lijnwinkel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lime%20Club",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0410158"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253797"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lime Club"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lineos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521877"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260698"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lineos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lingerie%20Aphrodite",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 353"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524843"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.751068"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lingerie Aphrodite"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Little%20Green%20Stories",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Jacobsnieuwstraat 82"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0541087"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.730509"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Little Green Stories"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 473 42 93 57"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lo.Elle%20Coiffure",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Groot-Brittanni??laan 92"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0437548"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7116306"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lo.Elle Coiffure"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lof",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0546954"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7148816"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lof"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Loft",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0520667"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266961"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Loft"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Logos%20Foundation",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Bomastraat 24-28"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0614495"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.731975"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Logos Foundation"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lokaal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496995"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7316202"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lokaal"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/LolaLiza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Langemunt 42"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567051"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7237571"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "LolaLiza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lost%20and%20Found",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0433388"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7208334"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lost and Found"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lotto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557456"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225404"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lotto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lotus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0601142"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7083594"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lotus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Louis%20Delhaize",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0614809"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243697"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Louis Delhaize"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Louis%20Van%20Houtte",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0429316"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7460979"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Louis Van Houtte"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lousbergmarkt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502097"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7382724"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lousbergmarkt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Love%20of%20Scissors",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0466516"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221759"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Love of Scissors"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Luc%20Rogge",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521427"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7226338"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Luc Rogge"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lucy%20Chang",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jakobijnenstraat 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521318"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201368"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lucy Chang"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 58 78"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Lush",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.055971"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7227091"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Lush"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Luv%20l%27oeuf",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0478378"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214986"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Luv l'oeuf"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Luxx",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0396184"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255689"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Luxx"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/M",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0686308"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7075552"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "M"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/M%26M",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0607718"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7017965"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "M&M"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/MANO",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0516902"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213826"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "MANO"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ma%20%26%20ik",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Aannemersstraat 1A"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0498508"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7453762"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ma & ik"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Maaike%20Kleedt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0577913"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239029"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Maaike Kleedt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Madam%20Bakster",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brabantdam 142"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496017"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7322322"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Madam Bakster"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Madonna",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Poel 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0545711"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7178557"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Madonna"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Maenhaut",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 103"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0471057"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220179"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Maenhaut"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Maison%20Elza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jan Breydelstraat 36"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563899"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7200107"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Maison Elza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mala%20Nachtwinkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 266"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524363"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7494455"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mala Nachtwinkel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Malatya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568077"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7423133"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Malatya"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Malem%20Boekenruilkast",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523542"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6937297"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Malem Boekenruilkast"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Man%20Wah",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Wondelgemstraat 181"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0645558"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7092705"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Man Wah"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mana",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksepoortstraat 220"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0436237"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209497"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mana"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mango",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0511084"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214042"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mango"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Manhattn%27s%20Burgers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Graslei 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548019"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209921"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Manhattn's Burgers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mania",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0590033"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7451926"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mania"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Manteca",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0536012"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7229368"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Manteca"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marc%20O%27Polo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Voldersstraat 70"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522937"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7230295"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marc O'Polo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marcel%20Levy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522679"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218107"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marcel Levy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Margueritte%20Bloch",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522679"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218184"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Margueritte Bloch"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mariabeeld%20Begijnhof",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0466349"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7372031"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mariabeeld Begijnhof"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mariama%20Beaut%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Wondelgemstraat 3a"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0606784"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7104344"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mariama Beaut??"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 486 29 26 95"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marijn%20Coertjens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561237"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7144583"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marijn Coertjens"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 48 01"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marimain",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487669"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7273274"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marimain"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marino",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hector Van Wittenberghestraat 62"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.059232"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7127344"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marino"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marleedoran",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568848"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7352775"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marleedoran"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marleentje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.056793"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7366413"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marleentje"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 25 76"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marmalade",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "studio"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "studio"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0672463"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7331704"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marmalade"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 235 40 80"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Marriott%20Ghent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenlei 10"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0551644"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7195449"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Marriott Ghent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 93 93"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Martens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 74"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0589398"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7248056"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Martens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Martha",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0519581"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7198656"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Martha"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Martha%20Geiringer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564086"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.732698"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Martha Geiringer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Martino",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0489037"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7313104"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Martino"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Massimo%20Dutti",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531304"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220942"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Massimo Dutti"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Masters%20Pub",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0414917"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250828"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Masters Pub"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Match",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.048707"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.729782"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Match"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 269 13 60"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Matton",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0466634"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7329275"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Matton"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 95 41"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Maurice%20Wanzele",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395726"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7117889"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Maurice Wanzele"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Max%20%26%20Ine",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korte Meer 27"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0509105"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7227136"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Max & Ine"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Max%20Mara",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0518501"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255602"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Max Mara"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Maxiparts",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0689477"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257265"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Maxiparts"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Maya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557331"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.727518"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Maya"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mayana",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Pietersnieuwstraat 208"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0445338"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263792"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mayana"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Maysa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Voldersstraat 68"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522924"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7231253"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Maysa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/McDonald%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Michielshelling 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0469062"
  }, {
    "@value" : "51.053683"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7106021"
  }, {
    "@value" : "3.7219073"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "McDonald's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Me%20mystic",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548231"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.724298"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Me mystic"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Medo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565948"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7101382"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Medo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Melangoest",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0498524"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214591"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Melangoest"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Memorie%201940-1945",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0432384"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332997"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Memorie 1940-1945"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Merkez",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0641387"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7292526"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Merkez"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mertens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Fran??ois Benardstraat 4"
  }, {
    "@value" : "Muidepoort 33"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0414187"
  }, {
    "@value" : "51.0714305"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7298355"
  }, {
    "@value" : "3.7307486"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mertens"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 470 47 80 02"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Midtown%20Grill",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenlei 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0550092"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7200604"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Midtown Grill"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 269 77 44"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mie%20Vie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Serpentstraat 28"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561662"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7258365"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mie Vie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mieke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Burgstraat 87"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562073"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7163982"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mieke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Miglot%20Fragrance%20Lab",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0499671"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212825"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Miglot Fragrance Lab"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mimi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566369"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7344467"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mimi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Min%20City",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057814"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7416118"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Min City"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mina",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0573315"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7086722"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mina"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Minibieb",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544275"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7072501"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Minibieb"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Minor%20Swing",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ottogracht 56"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0590182"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268878"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Minor Swing"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Minus%20One",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0647034"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.717078"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Minus One"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Miryzaal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539124"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263231"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Miryzaal"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Miss%20Kado",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556087"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7227969"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Miss Kado"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Miss%20Mina",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564003"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7094249"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Miss Mina"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Miss%20Modista",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0620216"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7274859"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Miss Modista"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Miss%20Yu",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0482834"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215717"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Miss Yu"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mission%20Masala",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562204"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7269226"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mission Masala"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mister%20Copy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0402159"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254499"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mister Copy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mister%20Friet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0374669"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7110093"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mister Friet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mistral",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ketelpoort 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0488004"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211521"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mistral"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mix%20Markt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Frans van Ryhovelaan 148"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0707249"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7098625"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mix Markt"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 226 95 31"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mizrap%20vzw",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sluizeken 15"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0596981"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245919"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mizrap vzw"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/MobilCell",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Wondelgemstraat 121"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0632032"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7096646"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "MobilCell"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 488 80 70 40"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mobile%20Dampoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.053007"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7464502"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mobile Dampoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Modista",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0623304"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7274459"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Modista"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mokabon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0547984"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7226313"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mokabon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Molen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565834"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7416275"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Molen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Molotov",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0405721"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265299"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Molotov"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Monasterium%20Poortackere",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524955"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7166961"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Monasterium Poortackere"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mong",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0676626"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7334565"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mong"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Monki",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523049"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218043"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Monki"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mono%20Black%20Tattoos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0479183"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7276909"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mono Black Tattoos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Monopole",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0368401"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.713135"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Monopole"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Montraparnasse",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569149"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7273291"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Montraparnasse"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Monty",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0465808"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7419064"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Monty"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Moochie%20Frozen%20Yogurt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543046"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228021"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Moochie Frozen Yogurt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Moris",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543398"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225081"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Moris"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mornie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0415993"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7391076"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mornie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mortier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dampoortstraat 31"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568407"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7348756"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mortier"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mosquito%20Coast",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogpoort 28"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553132"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7233681"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mosquito Coast"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 37 20"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Motor%20Yacht%20Club%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0431739"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7089667"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Motor Yacht Club Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Movies",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0491631"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270019"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Movies"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mr.%20Wok",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0385522"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7316172"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mr. Wok"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Muchwow",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057547"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216178"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Muchwow"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Muday",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0645403"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7289238"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Muday"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Muide",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0707418"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303286"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Muide"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Muis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 278"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0595922"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7463088"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Muis"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 229 24 25"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Munir%20Supermarkt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0476132"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7241579"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Munir Supermarkt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Murat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0709143"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7304278"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Murat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mus%20in%20een%20plas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Serpentstraat 22"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560551"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257191"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mus in een plas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Musa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0621242"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.724916"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Musa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Museum%20Dr.%20Guislain",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jozef Guislainstraat 43"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0668514"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7033213"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Museum Dr. Guislain"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 398 69 50"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Museum%20voor%20Stenen%20Voorwerpen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0540032"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7365072"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Museum voor Stenen Voorwerpen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mutlu",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0639672"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7097178"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mutlu"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Muurschildering%202%20bijen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0515304"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7432505"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Muurschildering 2 bijen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Muzaffer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0592897"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7036204"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Muzaffer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/My%20Moeke%20is%20better%20than%20yours",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0680525"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7333268"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "My Moeke is better than yours"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/My%20Style",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0644116"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7291895"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "My Style"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Mystic%20Leaves",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0501208"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.723129"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Mystic Leaves"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/N-joy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557345"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.728047"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "N-joy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/NH%20Gent%20Belfort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogpoort 63"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548504"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255649"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "NH Gent Belfort"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 33 31"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/NH%20Gent%20Sint%20Pieters",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0410936"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7099472"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "NH Gent Sint Pieters"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/NMBS-SNCB",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562475"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7401384"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "NMBS-SNCB"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/NTGent%20Minnemeers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0598509"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7287124"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "NTGent Minnemeers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Naaiatelier%20Terzi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553677"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7425244"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Naaiatelier Terzi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nacht%20Winkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0501747"
  }, {
    "@value" : "51.0569816"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6935423"
  }, {
    "@value" : "3.717045"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nacht Winkel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nachtwacht",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0403763"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254462"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nachtwacht"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nachtwinkel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0354961"
  }, {
    "@value" : "51.038853"
  }, {
    "@value" : "51.0400281"
  }, {
    "@value" : "51.0474901"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7259989"
  }, {
    "@value" : "3.7263106"
  }, {
    "@value" : "3.7328774"
  }, {
    "@value" : "3.7407661"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nachtwinkel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 478 29 86 01"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nachtwinkel%20Ekkergem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Charles Andrieslaan 11"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487019"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7057005"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nachtwinkel Ekkergem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nachtwinkel%20NOURY%20Commv",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521852"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7484474"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nachtwinkel NOURY Commv"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nam%20Jai",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kraanlei 81"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578005"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7237319"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nam Jai"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 473 22 80 11"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Namli",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0607297"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7018453"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Namli"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nathalie%20Lacave",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0647245"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7345657"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nathalie Lacave"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Natural%20Wellness",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0663919"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7331317"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Natural Wellness"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 472 31 75 78"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Naturell",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561043"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7202752"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Naturell"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Neapolis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 41"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0587574"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243683"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Neapolis"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 329 95 84"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nederkouter",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0463412"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222863"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nederkouter"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nederlants",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Concrdiastraat 1/001"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0606066"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7116531"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nederlants"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Neptune",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566724"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7208322"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Neptune"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nerdlab",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.062785"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7302285"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nerdlab"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nestor",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0399514"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7322573"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nestor"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Netezon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0415865"
  }, {
    "@value" : "51.0650974"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7267388"
  }, {
    "@value" : "3.7362127"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Netezon"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 473 78 19 08"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Neuhaus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Baafsplein 20"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532642"
  }, {
    "@value" : "51.0560486"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722383"
  }, {
    "@value" : "3.7253214"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Neuhaus"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 43 74"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/New%20York%20Pizza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Einde Were 310"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0525401"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7001051"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "New York Pizza"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 247 40 40"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nezir",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0528329"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7473013"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nezir"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Night%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0387471"
  }, {
    "@value" : "51.0543474"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7102652"
  }, {
    "@value" : "3.7224227"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Night Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Night%20shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570752"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7302138"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Night shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nightshop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565065"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214755"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nightshop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nirvan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0631271"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6967437"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nirvan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Noir",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Onderbergen 48"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0518608"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7195773"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Noir"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 06 84"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Non%20solo%20caff%C3%A8",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535011"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7237413"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Non solo caff??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nonno",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortedagsteeg 22"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0498352"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7264379"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nonno"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Nonno%202",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521524"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72005"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Nonno 2"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Noon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057096"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7331828"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Noon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Noppies",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522998"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7234514"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Noppies"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Novotel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544316"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7237542"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Novotel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Num%C3%A9ro%20A",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0504997"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7296602"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Num??ro A"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 330 05 70"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/O%27Learys",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Noord 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661491"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7328696"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "O'Learys"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 310 30 10"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/O%27Neill%20Store",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508048"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214196"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "O'Neill Store"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/O%27Tacos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535745"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7230453"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "O'Tacos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/O%27yo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brabantdam 82"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.049806"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7309032"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "O'yo"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 468 12 14 26"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/OR%20Coffeebar%20Backstay",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0472421"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270125"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "OR Coffeebar Backstay"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/OR%20Espresso%20Bar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661405"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7324305"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "OR Espresso Bar"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 310 94 59"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oak",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogstraat 167/001"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559677"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7110206"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oak"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 353 90 50"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oats%20Day%20Long",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477704"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217494"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oats Day Long"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Odra%20Supermarket",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Wondelgemstraat 207"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0650321"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7091154"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Odra Supermarket"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ofeljay",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.064738"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7288664"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ofeljay"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Officina%20Raffaelli",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0659023"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7318058"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Officina Raffaelli"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 483 10 83 88"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oguz",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0656916"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7266966"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oguz"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oh%20My%20Pok%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544883"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303315"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oh My Pok??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ohne%20Natuurlijk%20Onverpakt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 22"
  }, {
    "@value" : "Steendam 68"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0376144"
  }, {
    "@value" : "51.0570573"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7144652"
  }, {
    "@value" : "3.730679"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ohne Natuurlijk Onverpakt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oil%20%26%20Vinegar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoornstraat 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522985"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216135"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oil & Vinegar"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 14 04"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oje%20Nutrition",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0488019"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7342845"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oje Nutrition"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Okapi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 210"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0386954"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7157181"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Okapi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Okay",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553823"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270303"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Okay"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Olleke%20Bolleke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoornstraat 8"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522952"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213231"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Olleke Bolleke"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 30 54"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Omar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.060528"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7103829"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Omar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Omnia%20Travel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0483972"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215354"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Omnia Travel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ona",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 71"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0473083"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219704"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ona"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Onderbergen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502095"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7189525"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Onderbergen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Only%20one",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661633"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7086811"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Only one"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oona",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0494456"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7306074"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oona"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oorlogsvrijwilligers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0432686"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7331198"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oorlogsvrijwilligers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Open%20Wok",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.060254"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7479917"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Open Wok"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Openbare%20boekenkast",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0455046"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7363894"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Openbare boekenkast"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Opening%20fiets-%20en%20voetgangersonderdoorgang%20%27Contributiebrug%27",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562472"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7084156"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Opening fiets- en voetgangersonderdoorgang 'Contributiebrug'"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Opera%20Vlaanderen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Schouwburgstraat 3;5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0495326"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219135"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Opera Vlaanderen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Optiek%20Collette",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 76"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0373568"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7137105"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Optiek Collette"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Orange",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0518328"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217192"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Orange"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Orange%20Ini",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543829"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7162596"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Orange Ini"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Orient",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.055993"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224662"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Orient"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Orientali",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0414592"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255488"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Orientali"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Origin%27o",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 148"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0397976"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.716552"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Origin'o"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Osteria%20Delicati",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553467"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7197081"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Osteria Delicati"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oswald%20de%20Kerchove%20de%20Denterghem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0366489"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7176561"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oswald de Kerchove de Denterghem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Otis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 40"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058257"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7242471"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Otis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Otium",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ajuinlei 16"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0510841"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7200203"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Otium"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Otomat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564093"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217145"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Otomat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ottoman",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0611173"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.693245"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ottoman"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oudbar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0583838"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7241286"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oudbar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oude%20Vismijn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Veerleplein 5"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564223"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211249"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oude Vismijn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oude%20Vismijn%20Feestzalen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565088"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.720362"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oude Vismijn Feestzalen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ovchie%20Lempert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0431558"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72023"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ovchie Lempert"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oxfam",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0437725"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7243529"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oxfam"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oxfam%20Shop%20Gent%20Steendam",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Steendam 73"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.05719"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7311228"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oxfam Shop Gent Steendam"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Oxygen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0658835"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7328627"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Oxygen"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 311 77 11"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ozgem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0605589"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256479"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ozgem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/P%C3%ADlot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0631535"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7286391"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "P??lot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/PC%20Heirnis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.046687"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.743982"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "PC Heirnis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/PIET%20Moodshop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Pietersnieuwstraat 94"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0479856"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72716"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "PIET Moodshop"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 278 69 78"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/PLUS%2B",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ajuinlei 14"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0512858"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201528"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "PLUS+"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/PME%20Legend",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.05296"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7220738"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "PME Legend"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/PPP",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Poel 9"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543214"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7171867"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "PPP"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paarl",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0512521"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7193533"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paarl"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pacha%20Mama",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jan-Baptist Guinardstraat 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.047092"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7247265"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pacha Mama"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paelinck",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0396358"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7163993"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paelinck"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pagos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Voldersstraat 72"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522996"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7227905"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pagos"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 16 42"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pain%20%26%20Compagnie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0514353"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255538"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pain & Compagnie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pain%20Perdu",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0490439"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270714"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pain Perdu"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 18 25"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pak%20Asian%20%26%20African%20Food",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566223"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7420825"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pak Asian & African Food"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pala",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0622609"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7273504"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pala"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pallieter",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0398731"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255045"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pallieter"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Palomino",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572363"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7307351"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Palomino"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pampas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Burgstraat 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565795"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7199704"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pampas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pamukkale",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.062614"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6986968"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pamukkale"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Panache",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534984"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239233"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Panache"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pand%2013",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052268"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255303"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pand 13"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Panda",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 89"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0367621"
  }, {
    "@value" : "51.0435277"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7128663"
  }, {
    "@value" : "3.7251711"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Panda"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Panda%20Express",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0582193"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7242161"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Panda Express"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Panos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Pietersnieuwstraat 126A"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.036321"
  }, {
    "@value" : "51.0488908"
  }, {
    "@value" : "51.0556236"
  }, {
    "@value" : "51.0559511"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7099064"
  }, {
    "@value" : "3.7228565"
  }, {
    "@value" : "3.7268505"
  }, {
    "@value" : "3.7405112"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Panos"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 384 70 56"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pantheon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Annonciadenstraat 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0500823"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7170462"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pantheon"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 02 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paparazzi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534489"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245812"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paparazzi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Papatya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567771"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7092966"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Papatya"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Papier%20%26%20Co",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0462687"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223162"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Papier & Co"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paradisio%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0673527"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7324724"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paradisio Gent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 331 60 60"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Parel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0519249"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7267058"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Parel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Parels",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561278"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7294832"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Parels"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paris",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0624387"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6990334"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paris"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paris%20Londres",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Veldstraat 46"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0526894"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219755"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paris Londres"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Parkhotel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nieuwebosstraat 1"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0493736"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7356734"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Parkhotel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Parochiehuis%20Sint-Paulus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Patijntjestraat 27"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0396197"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7083846"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Parochiehuis Sint-Paulus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Passion",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534721"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7242466"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Passion"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pasta%20la%20Vista",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477178"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217716"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pasta la Vista"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Patershof",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vrouwebroersstraat 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0581801"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7226003"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Patershof"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Patisserie%20De%20Smet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sportstraat 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0424606"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7103569"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Patisserie De Smet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Patricia%20Vintage",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521266"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263869"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Patricia Vintage"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 03 01"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Patrick",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0356594"
  }, {
    "@value" : "51.0573896"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7085546"
  }, {
    "@value" : "3.7262692"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Patrick"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Patrick%20Foleys%20Irish%20Bar%20%26%20Restaurant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Recollettenlei 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0500416"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7195835"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Patrick Foleys Irish Bar & Restaurant"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paul",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vrijdagmarkt 60"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564548"
  }, {
    "@value" : "51.0568198"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7176166"
  }, {
    "@value" : "3.7247855"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paul"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 72 32"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paul%27s%20Boutique",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Astridlaan 209"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0362869"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7130515"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paul's Boutique"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Paul%27s%20Boutique%20by%20Bruno%20%26%20Elise",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Amandstraat 48"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0428299"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7247166"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Paul's Boutique by Bruno & Elise"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 477 82 32 62"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Peaberry%20Coffee%20Bar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Limburgstraat 24"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523441"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7273881"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Peaberry Coffee Bar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pearle",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508867"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257952"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pearle"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pecaso",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534696"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.699531"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pecaso"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pedaleur%20de%20Flandres",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Voldersstraat 58"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0414556"
  }, {
    "@value" : "51.0522911"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7186929"
  }, {
    "@value" : "3.7233607"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pedaleur de Flandres"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 485 68 77 82"
  }, {
    "@value" : "+32 9 336 69 95"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pee%20Gee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0685329"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7331378"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pee Gee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Per%20Bacco",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542473"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303182"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Per Bacco"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Perv%C3%A9lo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Rooigemlaan 115"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0554402"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6955575"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Perv??lo"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 475 89 60 61"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Perv%C3%A9lo%20%28de%20vitrine%29",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 73"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0368122"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7130504"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Perv??lo (de vitrine)"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 279 70 97"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Phildar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559191"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228204"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Phildar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pi-nuts",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0435443"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253747"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pi-nuts"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Piano%20Piano",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Henri Van Cleemputteplein 13A"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0573528"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7503701"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Piano Piano"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Picco%20Lini",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569941"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.729639"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Picco Lini"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pick%20Nick",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534084"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7248188"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pick Nick"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pierke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0559448"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7249149"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pierke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pietersbar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0418662"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7267537"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pietersbar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pillows%20Grand%20Hotel%20Reylof",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0546739"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.715102"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pillows Grand Hotel Reylof"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pippa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0463082"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222972"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pippa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pistacchio",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "ice_cream"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487535"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212244"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pistacchio"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pitaya",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jakobijnenstraat 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522887"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7205421"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pitaya"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 470 32 34 42"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pitta%2003",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0386963"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7102807"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pitta 03"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pitta%20Cengoo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531013"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7459974"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pitta Cengoo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pitta%20Pizza%20Jani",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0638012"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7288102"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pitta Pizza Jani"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pitta%20Sena",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.037472"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7140519"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pitta Sena"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pittoresk",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572313"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7248386"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pittoresk"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pizza%20Delta",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0576022"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7070945"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pizza Delta"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pizza%20Factory",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaanderenstraat 11"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0511148"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7292933"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pizza Factory"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 231 41 86"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pizza%20Hut",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 34"
  }, {
    "@value" : "Palinghuizen 80"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0398951"
  }, {
    "@value" : "51.0550878"
  }, {
    "@value" : "51.0663233"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6998514"
  }, {
    "@value" : "3.7217395"
  }, {
    "@value" : "3.7236044"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pizza Hut"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pizza%20Mia",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0417549"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7185649"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pizza Mia"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pizza%20Roma",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogstraat 162"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560987"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7111765"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pizza Roma"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 238 20 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pizza%20Station",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0373892"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7095286"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pizza Station"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 465 49 81 33"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pizzeria%20Da%20Toto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Handbalstraat 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0406255"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.709877"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pizzeria Da Toto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Place2stay",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0582106"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265043"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Place2stay"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Plan%20B",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0464888"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211311"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Plan B"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Planet%20Parfum",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532615"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223765"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Planet Parfum"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Plansjee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0549043"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7252306"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Plansjee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Plantapizza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0582727"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7208713"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Plantapizza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Plum%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 141"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0464217"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222589"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Plum Gent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 44 62"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Polar%20Paint%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0689554"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260352"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Polar Paint Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pols",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0683361"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332314"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pols"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pomodor%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0555994"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7386352"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pomodor??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pomp%20van%20%27t%20Zand",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0440644"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7364131"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pomp van 't Zand"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pompette",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 18"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0377117"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7146689"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pompette"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pont%20%26%20Plas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553824"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7212633"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pont & Plas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ponton",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0460141"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7032951"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ponton"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Portus%20Ganda",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0538948"
  }, {
    "@value" : "51.055753"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7335833"
  }, {
    "@value" : "3.734319"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Portus Ganda"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 266 56 60"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Potatolicious",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Verlorenkost 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0464002"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216667"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Potatolicious"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Potiau",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560153"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7227587"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Potiau"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Poule%20%26%20Poulette",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0545167"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222522"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Poule & Poulette"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Press%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.050587"
  }, {
    "@value" : "51.0561565"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7205485"
  }, {
    "@value" : "3.7229157"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Press Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Priau%20Baroni",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0482587"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7342518"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Priau Baroni"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Primadonna",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0403311"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254413"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Primadonna"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Primark",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569691"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7240447"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Primark"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Primus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0591365"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7449313"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Primus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pro%20Patria",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0580564"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7281323"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pro Patria"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Proof",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jan Breydelstraat 32"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563384"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7200509"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Proof"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Proximus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533936"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224014"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Proximus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Proxy%20Delhaize",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0415865"
  }, {
    "@value" : "51.0548491"
  }, {
    "@value" : "51.0604308"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.717821"
  }, {
    "@value" : "3.7203308"
  }, {
    "@value" : "3.7333936"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Proxy Delhaize"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Proxy%20Delhaize%20Heuvelpoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ottergemsesteenweg 2"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0370865"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268259"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Proxy Delhaize Heuvelpoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Proxy%20Rabot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Wondelgemstraat 91"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0624575"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7098691"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Proxy Rabot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Publiek",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ham 39"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0577781"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7329399"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Publiek"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 330 04 86"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pull%20%26%20Bear",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0532955"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221283"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pull & Bear"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pur%20Sens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0573872"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246824"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pur Sens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Puur",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0549882"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245774"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Puur"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Pycke%20zot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Salvatorstraat 129"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.066378"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7289894"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Pycke zot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Quai%20Des%20Arts",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564784"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7325583"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Quai Des Arts"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Qualifish",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.035938"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7261625"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Qualifish"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Quatre%20Mains",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0546166"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.729631"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Quatre Mains"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Quick",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Korenmarkt 35"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0551595"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217845"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Quick"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/R%C3%98K",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Noord 4"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0656704"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7318347"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "R??K"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/REVUE",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0490221"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213892"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "REVUE"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rabot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.059576"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7111897"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rabot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rabot%20Market",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0620297"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.710296"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rabot Market"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rabotaria",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0587091"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7088286"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rabotaria"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ragnarok",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0511721"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7205586"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ragnarok"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ramen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oudburg 51"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0589922"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246214"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ramen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rasoi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaanderenstraat 49"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0507816"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.729691"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rasoi"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 294 06 71"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ray",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0541859"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225905"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ray"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Recyclette",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koning Albertlaan 166"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0407568"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7103936"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Recyclette"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 474 46 05 83"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Recyclismo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0596245"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253015"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Recyclismo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Red",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0484516"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.731856"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Red"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Relay",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0360377"
  }, {
    "@value" : "51.0361827"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7106602"
  }, {
    "@value" : "3.7110181"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Relay"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Renaissance",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477796"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.73399"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Renaissance"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Resto%201981",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539757"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7165707"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Resto 1981"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Resto%20Gok",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sluizeken 22"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0597507"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725069"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Resto Gok"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 53 56"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rewind%20Women",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0481986"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7271122"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rewind Women"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rhino%20Boulder%20Gym",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kaarderijstraat 69"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548482"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6993572"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rhino Boulder Gym"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Richelieu",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Astridlaan 210"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.03657"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7130586"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Richelieu"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rigoletto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.049848"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215513"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rigoletto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Riot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0551458"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7426868"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Riot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rituals",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.051732"
  }, {
    "@value" : "51.0533214"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223937"
  }, {
    "@value" : "3.7253695"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rituals"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rococo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Corduwaniersstraat 57"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578418"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7231218"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rococo"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 30 35"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Roger%20Lammertyn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395708"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7117948"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Roger Lammertyn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rokko",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Salvatorstraat 3"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0642068"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7289539"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rokko"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Roma",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0574612"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7418686"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Roma"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Romain%20Roquette",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Oktrooiplein 1/001"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  }, {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  }, {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0488234"
  }, {
    "@value" : "51.0574987"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721398"
  }, {
    "@value" : "3.7394919"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Romain Roquette"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rooigem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0656339"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6980883"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rooigem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Room13",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Makelaarsstraat 13"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "studio"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "studio"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0717311"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7298139"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Room13"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Roots",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vrouwebroersstraat 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0582196"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222621"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Roots"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rotonde",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0417041"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7190423"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rotonde"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Royal%20Gym",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0658878"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7322665"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Royal Gym"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 476 51 12 35"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ruba",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477427"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215424"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ruba"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ruilboekenkastje",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523363"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7460627"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ruilboekenkastje"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ruilboekkast%20Bloemekenswijk",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "public_bookcase"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0691059"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7091491"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ruilboekkast Bloemekenswijk"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rumpa%20Cabeza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0410723"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7253796"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rumpa Cabeza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Rustika",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0604401"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7472468"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Rustika"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/S%C3%A3o%20Paulo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0510834"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256128"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "S??o Paulo"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 44 11"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/SAN",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503684"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7285569"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "SAN"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/STAMCaf%C3%A9",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0437228"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7173037"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "STAMCaf??"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sacha",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521425"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722718"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sacha"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Safa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556655"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7120625"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Safa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Safisafi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Reinaertstraat 101"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0589944"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.701189"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Safisafi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sahan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553492"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214811"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sahan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sala%20Thai%203",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553734"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721332"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sala Thai 3"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Salamander",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.039968"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254696"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Salamander"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sali",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0647922"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7091645"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sali"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Salon%20Angel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Forelstraat 107"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487086"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7427444"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Salon Angel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Salon%20Maximum",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Jacobsnieuwstraat 104"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0540488"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7305936"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Salon Maximum"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Salon%20de%20Chocolat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560173"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224313"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Salon de Chocolat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Salt%20%27n%20Pepper",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koning Boudewijnstraat 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0375934"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7094344"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Salt 'n Pepper"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 222 57 38"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Salto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0408404"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254064"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Salto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/San%20Marino",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaanderenstraat 44-46"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0506096"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7294881"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "San Marino"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sanderus%20Antiquariaat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 32"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0477863"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215243"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sanderus Antiquariaat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sangha",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0675858"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6998043"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sangha"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sarabande",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556312"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7205627"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sarabande"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sarar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0601566"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7248834"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sarar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Saray",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0589009"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7046173"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Saray"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sari",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0528172"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7474081"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sari"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Saros",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548554"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7431318"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Saros"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Saunshine",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Amandstraat 40"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0428948"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7247099"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Saunshine"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Savarin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0574673"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7258176"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Savarin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Scala",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg Dendermondsesteenweg 163;165"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535412"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7443113"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Scala"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 228 87 20"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Scalzo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Pietersnieuwstraat 36"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0483792"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270549"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Scalzo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Scar%20Pulla",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0680857"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7332644"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Scar Pulla"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Schleiper",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0514868"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7197476"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Schleiper"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sculpt%20%26%20Victory",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057495"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7141185"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sculpt & Victory"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Seafood%20%40rik%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Forelstraat 139"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0491421"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7435619"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Seafood @rik's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Self%20Wash%20Center",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0445059"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7042494"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Self Wash Center"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Seli%27s%20Noodlebar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Limburgstraat 28"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522682"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7274925"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Seli's Noodlebar"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 58 88"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Selvi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533868"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7443494"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Selvi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sevens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0519963"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263038"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sevens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sexy%20World",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.056428"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7420361"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sexy World"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sezer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0592199"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.70445"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sezer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Shazanna",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572372"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7305167"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Shazanna"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Shevanti",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0478226"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217274"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Shevanti"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Shibui",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0550025"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7060568"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Shibui"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Shoe%20Class",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0482509"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270962"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Shoe Class"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/SiCelia",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ekkergemstraat 92"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0505855"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7033062"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "SiCelia"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Simon%20Says",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sluizeken 8"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.059306"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.724802"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Simon Says"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sint%20Baafshuis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534691"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265432"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sint Baafshuis"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 235 78 44"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sint-Anna",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0490899"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7336042"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sint-Anna"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sint-Pieters",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.037277"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7093497"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sint-Pieters"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sioux",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Platteberg 8"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0488011"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7282869"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sioux"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 473 47 30 01"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sissy-Boy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544606"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213016"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sissy-Boy"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Six",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0536121"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223974"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Six"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sizo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0537049"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.730321"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sizo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sjapoo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sluizeken 29"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0592676"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250379"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sjapoo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Skaters",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0489145"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7469076"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Skaters"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Skins%20Cosmetics",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543911"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213689"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Skins Cosmetics"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Slagerij%20Aula",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Voldersstraat 24"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523059"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239686"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Slagerij Aula"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sleeplife",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0649519"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6966397"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sleeplife"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sliding%20Tiger",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567966"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7367263"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sliding Tiger"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 493 84 85 91"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Slijterij%20de%20Roos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0489397"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7473786"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Slijterij de Roos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Small%20%26%20Tall",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0594314"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7244292"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Small & Tall"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Smartech",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.060911"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7015654"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Smartech"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Snack%20Deniz",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0402209"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256571"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Snack Deniz"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Snack%20Elif",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Prinses Clementinalaan 195"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0356771"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7126205"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Snack Elif"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Snack%20St.%20Anneke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0487003"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.733945"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Snack St. Anneke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Snack%20Tonton",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0415566"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.72556"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Snack Tonton"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Snack%20Tosi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0408198"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254061"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Snack Tosi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Soepbar%20Sordo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Lange Steenstraat 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0584059"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211187"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Soepbar Sordo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sofra",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0621539"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6991711"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sofra"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Somm",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572609"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303436"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Somm"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sophie%20Loeb-Bloch",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522676"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721803"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sophie Loeb-Bloch"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sorelle",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522668"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7196217"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sorelle"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Soul",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0527584"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7320752"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Soul"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Soul%202%20Skin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0485734"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7339569"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Soul 2 Skin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Soup%20Lounge",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0577582"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7240249"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Soup Lounge"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Soup%27r",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Niklaasstraat 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533664"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7232743"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Soup'r"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Spaans%20Huis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553488"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.712241"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Spaans Huis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Spar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksepoortstraat 82"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0403425"
  }, {
    "@value" : "51.045778"
  }, {
    "@value" : "51.05681"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721984"
  }, {
    "@value" : "3.7322441"
  }, {
    "@value" : "3.7336933"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Spar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sparerib%20Caffee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kraanlei 19"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0568211"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221258"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sparerib Caffee"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 30 01"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Spazio24",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0715262"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7264061"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Spazio24"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Speaker%27s%20corner",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0381535"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.726121"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Speaker's corner"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Special%20Exotic",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0618356"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7103436"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Special Exotic"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Spelgezel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0467274"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.730072"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Spelgezel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sphinx",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0537291"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215956"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sphinx"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 60 86"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Spice%20Bazar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Burgstraat 25"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564337"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.718554"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Spice Bazar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Spiers%20Slaap",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563109"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7259155"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Spiers Slaap"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sportzaal",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0587346"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7090844"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sportzaal"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Spring%21",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0399294"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7328004"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Spring!"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Spring%27s",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0486649"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7318602"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Spring's"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Springfield",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0517999"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214507"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Springfield"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/St.%20Hubert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0437211"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211959"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "St. Hubert"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/St.%20John",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562959"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7286305"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "St. John"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/St.%20Pierre",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.03719"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.713215"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "St. Pierre"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/St.-Martinus%20Snooker%2FPool",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Krijgsgasthuisstraat 99"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.051784"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7028934"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "St.-Martinus Snooker/Pool"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stadium%20Coupure",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Coupure Links 625"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0511714"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7092646"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stadium Coupure"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stadius",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Gasmeterlaan 169"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0670419"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7211575"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stadius"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Standaard%20Boekhandel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kouter 31"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0403483"
  }, {
    "@value" : "51.0487861"
  }, {
    "@value" : "51.04972"
  }, {
    "@value" : "51.0665629"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225772"
  }, {
    "@value" : "3.7280586"
  }, {
    "@value" : "3.7297869"
  }, {
    "@value" : "3.7328527"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Standaard Boekhandel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 00 28"
  }, {
    "@value" : "+32 9 224 11 43"
  }, {
    "@value" : "+32 9 225 53 77"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stanleybet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0571235"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7379315"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stanleybet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Star",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0629874"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6979807"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Star"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Starboardshop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0422727"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7191644"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Starboardshop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Starbucks",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0360199"
  }, {
    "@value" : "51.0577077"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.711299"
  }, {
    "@value" : "3.7394092"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Starbucks"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Steen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Onderstraat 55"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557938"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256716"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Steen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Steendam%2066",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057071"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7304321"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Steendam 66"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stefano%27s%20Place",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Overpoortstraat 12"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0409088"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254031"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stefano's Place"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stek",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0466988"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221645"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stek"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stiletto",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052144"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.722156"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stiletto"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stoffen%20en%20zijde%20Janssens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565075"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725433"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stoffen en zijde Janssens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stoffenidee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Burgstraat 38"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564311"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7172504"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stoffenidee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stradivarius",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0519205"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218795"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stradivarius"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Stropke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567513"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7217059"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Stropke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studentencaf%C3%A9%20De%20Hoeve",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0453449"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265267"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studentencaf?? De Hoeve"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studentenrestaurant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0605111"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7077048"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studentenrestaurant"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studentenresto%20Coupure",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.053587"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7071643"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studentenresto Coupure"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studentenresto%20De%20Brug",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0456448"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7273618"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studentenresto De Brug"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studentenresto%20Dunant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0490785"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7048213"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studentenresto Dunant"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studio%20Blanche",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533668"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7330671"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studio Blanche"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 329 65 86"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studio%20Gaga",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556243"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7276894"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studio Gaga"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studio%20Kimbo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 343"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0525336"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7503114"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studio Kimbo"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 492 52 97 17"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Studio%20Skoop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Annaplein 63"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cinema"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0489042"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7337981"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Studio Skoop"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 08 45"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Suan%20Thai",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052328"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.714256"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Suan Thai"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Suburban",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Noord 4C 002"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0658617"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7304506"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Suburban"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 329 84 16"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sucker%20Punch%20Skate%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534117"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7307781"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sucker Punch Skate Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Suite%20Dreams%20Ghent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566348"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.71369"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Suite Dreams Ghent"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 494 18 60 10"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sultan%20Kasabi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543889"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7434116"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sultan Kasabi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/SuperChic",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579696"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6928046"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "SuperChic"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Superette%20Edwin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0454842"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7300126"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Superette Edwin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Supergoods%20Fair%20Fashion",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502111"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7290688"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Supergoods Fair Fashion"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Superkelly",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Drongensesteenweg 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578649"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7017079"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Superkelly"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 329 93 13"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Surtoe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0541744"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255177"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Surtoe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sushi%20Love%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0585048"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7244742"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sushi Love Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sushi%20Point",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 132"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0399643"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7166654"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sushi Point"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sushiplaza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0510795"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7293414"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sushiplaza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Suzuki%20Motorcenter%20Degezelle",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaamsekaai 107"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0457535"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7441204"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Suzuki Motorcenter Degezelle"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Swarovski%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565113"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7232901"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Swarovski Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Switch",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0520107"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216197"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Switch"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Sympa",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560186"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.727361"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Sympa"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tabakshop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0592122"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7037224"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tabakshop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Taco%20Santo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0506531"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7195147"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Taco Santo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Take%20Five",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Grote Huidevettershoek 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0493635"
  }, {
    "@value" : "51.0522991"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7242056"
  }, {
    "@value" : "3.7281483"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Take Five"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Take-off",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534817"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224023"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Take-off"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Talent%20Grid",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0670517"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7326294"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Talent Grid"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 486 15 09 65"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tam-Tam",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395797"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725587"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tam-Tam"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tante%20Paula",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561811"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7284095"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tante Paula"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tantuni",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0528027"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7475113"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tantuni"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tartines",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ekkergemstraat 66"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0508861"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7041469"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tartines"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 32 46"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tashun",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0473912"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270726"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tashun"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 15 79"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Taste%20It",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Bellevue 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0369387"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7366492"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Taste It"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 231 30 32"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tasttoe%20Two",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661003"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.732242"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tasttoe Two"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 352 60 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tasty%20World",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoogpoort 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557013"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228712"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tasty World"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Taverne%20Petrus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0435024"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7248922"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Taverne Petrus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tavontuur",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561778"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.714932"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tavontuur"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tekbir%20market",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0604691"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7016657"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tekbir market"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tekin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058581"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7045693"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tekin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Telenet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zonnestraat 1"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0502528"
  }, {
    "@value" : "51.0535529"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224009"
  }, {
    "@value" : "3.7224023"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Telenet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Telesco%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Groentenmarkt 14"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561604"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222431"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Telesco Shop"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 20 56"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Temmerman",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.057689"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7236571"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Temmerman"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tenderly",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koning Boudewijnstraat 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0375149"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7097807"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tenderly"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 329 07 43"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ter%20Burg",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.056337"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7145389"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ter Burg"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Terrazza",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0491773"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.733563"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Terrazza"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Teskaffee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0570121"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7310775"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Teskaffee"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tevhid",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562626"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7417566"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tevhid"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Thai%20Center",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0379451"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7111441"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Thai Center"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 220 55 70"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Thai%20Thanee",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaanderenstraat 79"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0505551"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7299962"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Thai Thanee"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 73 37"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/That%27s%20Kebab",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Langemunt 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560978"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228515"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "That's Kebab"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Barn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0410245"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7265827"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Barn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Body%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521444"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219671"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Body Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Box",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Palinghuizen 77"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0661998"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6999717"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Box"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 474 63 65 11"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Brain%20that%20wouldnt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0683964"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7356457"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Brain that wouldnt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Celtic%20Towers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Michielshelling 5"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0537928"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721227"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Celtic Towers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Cobbler",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0540908"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7209141"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Cobbler"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Concept",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.039508"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7256346"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Concept"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Corner",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kramersplein 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0413778"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255693"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Corner"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Dixie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0374479"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7115935"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Dixie"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Lord",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.035559"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7130251"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Lord"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Lounge",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0422625"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7190545"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Lounge"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Park%20Playground",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0665337"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7329533"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Park Playground"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 467 09 05 53"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Place",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0400316"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7254602"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Place"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Rambler",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0368813"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7123256"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Rambler"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Ribhouse",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Overpoortstraat 63 A"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0388205"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263721"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Ribhouse"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 279 22 22"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Shop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.050428"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7272775"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Shop"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Showboat%20%2F%20Do%C2%B4Nuts",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Grootkanonplein 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572802"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7244183"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Showboat / Do??Nuts"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20Wizard%20Store",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0557997"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7255796"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The Wizard Store"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/The%20out",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0548479"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7246687"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "The out"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Theater%20de%20WAANzin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.068004"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7169125"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Theater de WAANzin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Theresia",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531516"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7134757"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Theresia"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Thibault%20Joncheere",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0341047"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7158123"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Thibault Joncheere"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Think%20Twice",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nederkouter 118"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0470042"
  }, {
    "@value" : "51.051174"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7200776"
  }, {
    "@value" : "3.7218239"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Think Twice"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Thomas%20Bradley",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0494966"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7305732"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Thomas Bradley"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tierenteyn",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556344"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224189"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tierenteyn"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Time%202%20Sleep",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0668934"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7328847"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Time 2 Sleep"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 50 55"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Timelab%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kogelstraat 34"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0588124"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7414863"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Timelab Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Toba",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0497811"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303197"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Toba"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Toetswiet",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0546429"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223027"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Toetswiet"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Toi%20et%20Moi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Michielsstraat 31"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542464"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7173773"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Toi et Moi"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Toko",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0375047"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7141337"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Toko"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tolhuis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0631707"
  }, {
    "@value" : "51.0646402"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.725263"
  }, {
    "@value" : "3.7262208"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tolhuis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tolpoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0668628"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7269826"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tolpoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tom%20%26%20Co",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 134b"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0529158"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7426457"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tom & Co"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tommy%20Jeans",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koophandelsplein 1"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503677"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213127"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tommy Jeans"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 360 65 90"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Topcopy",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Gebroeders Vandeveldestraat 121"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0499722"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7174019"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Topcopy"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 48 22"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Topcopy%20Green",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0466872"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268948"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Topcopy Green"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Torfs",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560559"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228009"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Torfs"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tornado%20Wash",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0488048"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7429464"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tornado Wash"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Traiteur%20Toulouse",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 41"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0371213"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7139965"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Traiteur Toulouse"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Trans-fair",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Getouwstraat 17"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0709356"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7129415"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Trans-fair"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 311 28 13"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Travel%20Centre",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0361864"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7104846"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Travel Centre"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Travelbase",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0673357"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7325283"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Travelbase"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 296 48 50"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Treckhaak",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0620764"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7024277"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Treckhaak"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Trefpunt",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0561469"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7271175"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Trefpunt"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tresr",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0680961"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7333443"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tresr"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Triado",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553424"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7291241"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Triado"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Trianon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0353481"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7072564"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Trianon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Trollenkelder",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0560854"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7272704"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Trollenkelder"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tuin%20Van%20Eten",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 573"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0351637"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7165101"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tuin Van Eten"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Turkuaz",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0550691"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7427162"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Turkuaz"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Turquoise",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0682406"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7080451"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Turquoise"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Tuub",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Gandastraat 51"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0539851"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7391259"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Tuub"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 485 54 28 19"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Twilight",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0552197"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218113"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Twilight"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Twin-Set",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0503773"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257511"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Twin-Set"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Twinkle%20Star",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0620707"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6993248"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Twinkle Star"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/U%20nas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0634215"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6965216"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "U nas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Uch",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0679655"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7334029"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Uch"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Umamido%20Vooruit",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0486774"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7269775"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Umamido Vooruit"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Uncle%20Babe%27s%20Burger%20Bar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sluizekenstraat 2"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0594342"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7250835"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Uncle Babe's Burger Bar"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 278 89 19"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Undiz",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0524354"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221267"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Undiz"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Uniglobe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0571119"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7333738"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Uniglobe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Union",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0690592"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7294943"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Union"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Unique%20Asia",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Zwijnaardsesteenweg 31"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0362682"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7264383"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Unique Asia"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 252 35 65"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Universal%20Auto%20Spares",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0580666"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263124"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Universal Auto Spares"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Up-Cycling%20fietsatelier%2Fshop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 112A"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542821"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7429348"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Up-Cycling fietsatelier/shop"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 310 45 32"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Uppelink",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Michielsplein 21"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.053965"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7197903"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Uppelink"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Urban%20Care",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0623069"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7026227"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Urban Care"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Urgent.fm",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "studio"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "studio"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0486577"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7287487"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Urgent.fm"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Usman%20Brothers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Salvatorstraat 110"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0676343"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7296111"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Usman Brothers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Uw%20Warme%20Bakkerij%20Filip%20%26%20Sofie",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0579433"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.742048"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Uw Warme Bakkerij Filip & Sofie"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 228 37 17"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/V%C3%A9lo%20Ciraptor",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Louis Schuermanstraat 7A"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0530048"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7489687"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "V??lo Ciraptor"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 486 40 97 48"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/V%C3%A9locien",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Doornzelestraat 106"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0642895"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7334632"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "V??locien"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 41 44"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/V-Box",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Noord 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0665284"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7324123"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "V-Box"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 472 72 56 59"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Valeir",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562207"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7327981"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Valeir"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20Artevelde",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054757"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257016"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van Artevelde"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20Bignoot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522934"
  }, {
    "@value" : "51.0534516"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.724415"
  }, {
    "@value" : "3.7244862"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van Bignoot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20De%20Moer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kasteellaan 1-3"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0493004"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.738538"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van De Moer"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 328 53 78"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20Hecke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Iepenstraat 1"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.049824"
  }, {
    "@value" : "51.0508371"
  }, {
    "@value" : "51.0582487"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7026449"
  }, {
    "@value" : "3.7172862"
  }, {
    "@value" : "3.7258472"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van Hecke"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 335 94 21"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20Hoorebeke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jan Breydelstraat 1"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0555761"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201992"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van Hoorebeke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20Lerberge",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0348421"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7164905"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van Lerberge"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20Marcke",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0527623"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6981006"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van Marcke"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20Meenen%20Inlijstingen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522997"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7200059"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van Meenen Inlijstingen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Van%20de%20Velde%20H.",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0591768"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7107853"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Van de Velde H."
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vanac%20Colors",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0667899"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6979246"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vanac Colors"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vanden%20Borre",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Martelaarslaan 307"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0471706"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.709324"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vanden Borre"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 02 53"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vandenbouhede",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Astridlaan 207"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0362645"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7131134"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vandenbouhede"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vanhoutteghem",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0565639"
  }, {
    "@value" : "51.0567697"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7338309"
  }, {
    "@value" : "3.7340463"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vanhoutteghem"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vanitas%20hairsalon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.053173"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7337104"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vanitas hairsalon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vapers%20World",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558795"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7227696"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vapers World"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vaporshop",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Vlaanderenstraat 119"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0490617"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7312263"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vaporshop"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 3 369 94 08"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vasco",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.064539"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6960399"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vasco"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vatan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0537404"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7437239"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vatan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vaudeville",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0550301"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216946"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vaudeville"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vege-vege",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572519"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7244826"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vege-vege"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Veggi%20en%20Grill",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Belfortstraat 32"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558379"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7276704"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Veggi en Grill"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Velektro",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Noord 7"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0666167"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7329186"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Velektro"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 273 66 73"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ventura",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  }, {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  }, {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0552218"
  }, {
    "@value" : "51.0566432"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263471"
  }, {
    "@value" : "3.7293026"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ventura"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Venus",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0612523"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7006868"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Venus"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Verantwoord%20Speelgoed",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksesteenweg 280"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0379945"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7153732"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Verantwoord Speelgoed"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 221 34 08"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Veritas",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0509592"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7213863"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Veritas"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Veritas%20Gent%20%28Lange%20munt%29",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Langemunt 25;27"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564525"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7232369"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Veritas Gent (Lange munt)"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 88 80"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Verleyen-Sinnaeve",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553672"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7198094"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Verleyen-Sinnaeve"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Verlorenkost",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0462389"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219965"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Verlorenkost"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vero%20Moda",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0512228"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.721435"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vero Moda"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vers",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0412138"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7183814"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vers"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vertical%20Thinking%20V.Z.W.",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0387284"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7027162"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vertical Thinking V.Z.W."
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 499 41 46 26"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vici",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0542903"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7309231"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vici"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Victor%20De%20Paepe",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395737"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.711782"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Victor De Paepe"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Video",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544851"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7314673"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Video"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Villa%20Bardon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sluizeken 10"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0593815"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245851"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Villa Bardon"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 336 17 13"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vinogradoff",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0512256"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201062"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vinogradoff"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vintage%20Factory",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0482105"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215803"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vintage Factory"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vinyl%20Kitchen",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0454721"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7348167"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vinyl Kitchen"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vinylla",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0453464"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7228822"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vinylla"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 223 71 22"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Visitrice",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortrijksepoortstraat 7"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0458239"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7222064"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Visitrice"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 478 19 79 02"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vital%20Market",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523784"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7486854"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vital Market"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vitamientje%20B",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Koningin Elisabethlaan 124"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0370405"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7127645"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vitamientje B"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 475 52 58 68"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vits-Staelens",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0571403"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.727832"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vits-Staelens"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Viva%20La%20Puglia",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sint-Lievenspoortstraat 224"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0412414"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7362947"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Viva La Puglia"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 224 28 06"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vlask",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0562702"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7284374"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vlask"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Voedingswaren%20Geert",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0506319"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7097472"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Voedingswaren Geert"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Volta",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0558671"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.707419"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Volta"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Voormalige%20brouwerij%20Sint-Baafsabdij",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0547129"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7363923"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Voormalige brouwerij Sint-Baafsabdij"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vooruit",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0476615"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7275024"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vooruit"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vrijmoed",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0510458"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7288983"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vrijmoed"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 279 99 77"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vrydag",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0563347"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263876"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vrydag"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vuijle%20Gaz%C3%A8tte",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054071"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7393871"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vuijle Gaz??tte"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Vynckier",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Nieuwevaart 51"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0691183"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7223696"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Vynckier"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/W%C3%BCrst",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Kortemunt 3"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0556703"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224494"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "W??rst"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/WAY",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0657433"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303563"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "WAY"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 494 07 33 22"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/WAY%20Plantbased%20Bakehouse",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Jakobijnenstraat 7"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0521347"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7198981"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "WAY Plantbased Bakehouse"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/WE",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0525899"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7219361"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "WE"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/WED2B",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0670175"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7328202"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "WED2B"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 298 10 03"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wakiita",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Heilige-Geeststraat 30"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531672"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7237299"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wakiita"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wald",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dendermondsesteenweg 39"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.055714"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7426043"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wald"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Walk%20The%20Line",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0495548"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7305303"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Walk The Line"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wallflower",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.048401"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7272778"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wallflower"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 234 37 77"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Walry",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0369876"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.726391"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Walry"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wasbar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523605"
  }, {
    "@value" : "51.0552695"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218495"
  }, {
    "@value" : "3.7251572"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wasbar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wash%26Fold",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0566265"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.735336"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wash&Fold"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wasserij%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0506363"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7466046"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wasserij Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Waterhuis%20aan%20de%20Bierkant",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Groentenmarkt 9"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564222"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7224589"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Waterhuis aan de Bierkant"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 06 80"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wearable",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0572287"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7306742"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wearable"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Welkom%20in%20het%20park%20Halfweg",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522466"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6923222"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Welkom in het park Halfweg"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/West-Site",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0467519"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7221571"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "West-Site"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Westies",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0436818"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260037"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Westies"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/White%20Cat",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Drongenhof 40"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "nightclub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0594106"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7235499"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "White Cat"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wibra%20Dampoort",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Antwerpsesteenweg 44A"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0581742"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7431495"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wibra Dampoort"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Willem%20I",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0531579"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7297221"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Willem I"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wim%27s%20garage",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058987"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7395974"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wim's garage"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wis%C5%82a",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0529081"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7389607"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wis??a"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Woest",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0569906"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7004877"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Woest"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 278 07 78"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wok%20Away",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0362686"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7100742"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wok Away"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wok%20U%20Want",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0537799"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7210714"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wok U Want"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wolf",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522901"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7232803"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wolf"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/World%27s%20end%20comics%20Gent",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ketelvest 51"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.049344"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257783"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "World's end comics Gent"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Wraps%20and%20Soups",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0474506"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7340463"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Wraps and Soups"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Xantyp",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0534448"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7312139"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Xantyp"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Y%26D",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0496543"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7264809"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Y&D"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Y%C3%BCksel%20Travel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0530332"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7463638"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Y??ksel Travel"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Ya%20Baba",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.063531"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6961903"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Ya Baba"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yaki",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0492038"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7310845"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yaki"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yalo%20Hotel",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Brabantdam 33"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0505667"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7284378"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yalo Hotel"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 395 92 00"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yammi%20Yammi",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Overpoortstraat 49a"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0395506"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7263259"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yammi Yammi"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 225 88 07"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yaren",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0590502"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7445962"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yaren"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yasin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0624276"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7278813"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yasin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yavuz",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "fast_food"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522404"
  }, {
    "@value" : "51.06524"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7383919"
  }, {
    "@value" : "3.7483589"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yavuz"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yellow%20Moon",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.056943"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7270152"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yellow Moon"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yilmazlar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0639626"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7288628"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yilmazlar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yo%27s%20Place",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.054864"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216041"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yo's Place"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yoghito",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0360624"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7105412"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yoghito"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/You%20can%20run%20but%20your%20can%27t%20hide%204ever",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.067816"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7334725"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "You can run but your can't hide 4ever"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yugen%20Kombucha",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Speldenstraat 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0513919"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7369059"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yugen Kombucha"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 485 46 24 24"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Yves%20Rocher",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.052149"
  }, {
    "@value" : "51.0573451"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7215461"
  }, {
    "@value" : "3.7243062"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Yves Rocher"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Z%C3%A9non",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0564909"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.720948"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Z??non"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zaal%20Lux",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "events_venue"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "events_venue"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0533862"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7436478"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zaal Lux"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zadig%20%26%20Voltaire",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0520838"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7258083"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zadig & Voltaire"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zafer",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0527028"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7483572"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zafer"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zeeman",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535792"
  }, {
    "@value" : "51.0561997"
  }, {
    "@value" : "51.0613615"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7102166"
  }, {
    "@value" : "3.7229706"
  }, {
    "@value" : "3.7434348"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zeeman"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zest%20Juice%20Bar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.036117"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7110948"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zest Juice Bar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zhar",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0636001"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6959811"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zhar"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zomerbar%20Glasfabriek",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0670417"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7375057"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zomerbar Glasfabriek"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zonneschijn%20Wasserij",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Prinses Clementinalaan 193"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0356511"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7126963"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zonneschijn Wasserij"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 222 13 80"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zoo",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0578477"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7239377"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zoo"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/Zwembad%20GUSB",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0479942"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.701262"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "Zwembad GUSB"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/bij%27%20De%20Vieze%20Gasten",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Haspelstraat 31"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "theatre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0585987"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7013081"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "bij' De Vieze Gasten"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/boshut",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.05175"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7445486"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "boshut"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/chopinchopin",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Beverhoutplein 11"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0574261"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7277123"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "chopinchopin"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/day.",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0520511"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260148"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "day."
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/de%20Ratz",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "bar"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0498596"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7216249"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "de Ratz"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/de%20Robot",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0461063"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7160492"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "de Robot"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/de%20lieve",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.058614"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7207476"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "de lieve"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/den%20Turk",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Botermarkt 3"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0544407"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7257562"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "den Turk"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/dirkdewitte",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0535777"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.6998452"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "dirkdewitte"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/drag%C3%B2n",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0543311"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7225953"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "drag??n"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/eKart",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Dok-Noord 7"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0659052"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7326211"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "eKart"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 310 90 20"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/eyes%20and%20more",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Langemunt 41"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0567808"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7235549"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "eyes and more"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/g%C3%BClhan",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Sleepstraat 70"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0609152"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7260604"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "g??lhan"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/graffiti%20skateboarder",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0478846"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7280999"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "graffiti skateboarder"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/herberg%20Macharius",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Coyendanspark 1"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0529945"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.735856"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "herberg Macharius"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/jodevisscher",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Hoornstraat 6"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0522994"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7214275"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "jodevisscher"
  } ],
  "http://schema.org/telephone" : [ {
    "@value" : "+32 9 233 88 04"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/kapsalon%20Avanti",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.056401"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7170114"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "kapsalon Avanti"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/l%27Ap%C3%A9ro%20d%27Oc",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Ajuinlei 22"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "pub"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0509362"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7199286"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "l'Ap??ro d'Oc"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/la%20dolce%20barista",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Limburgstraat 14"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0525733"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7268963"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "la dolce barista"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/midpoint",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "restaurant"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0476529"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7218023"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "midpoint"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/monument%20Michael%20Lustig",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.047278"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7201839"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "monument Michael Lustig"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/no%20More%20Borders",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0553115"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7245438"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "no More Borders"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/pipoos",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0484501"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7303191"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "pipoos"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/quick%20wash",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0634905"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7095886"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "quick wash"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/studio16",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Stoppelstraat 16"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0497444"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7162731"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "studio16"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/trafiek",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "haspelstraat 37"
  } ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "cafe"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0585597"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7016307"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "trafiek"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/vishandel%20De%20Vis",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/address" : [ {
    "@value" : "Voldersstraat 45"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0523059"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7237386"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "vishandel De Vis"
  } ]
}, {
  "@id" : "http://ThesisLucasVermeulen.be/vzw%20Jong",
  "@type" : [ "http://schema.org/Place" ],
  "http://schema.org/amenityFeature" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/keywords" : [ {
    "@value" : "community_centre"
  } ],
  "http://schema.org/latitude" : [ {
    "@value" : "51.0660281"
  } ],
  "http://schema.org/longitude" : [ {
    "@value" : "3.7149266"
  } ],
  "http://schema.org/name" : [ {
    "@value" : "vzw Jong"
  } ]
} ]
  }
}