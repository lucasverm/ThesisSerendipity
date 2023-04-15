import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import Sigma from 'sigma';
import { environment } from 'src/environments/environment';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router, private http: HttpClient) { }
  public sigma: Sigma;
  public allKeywords: any[];
  public getOSMData$(lat: Number = 51.05349346, lon: Number = 3.71974349, around: Number = 2200): Observable<any> {
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

  public parsteTtlToJsonLd(turtle: String): any {
    const ttl2jsonld = require('@frogcat/ttl2jsonld').parse;
    return ttl2jsonld(turtle);
  }

  public getPoiJsonData$(): Observable<any> {
    return this.http.get<any>('./assets/data/data.json');
  }

  private getCSVData$(): Observable<string> {
    return this.http.get('./assets/data/categorical_similarities.csv', { responseType: 'text' });
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

  private doubleArrayToObject(arr: any[][]): any {
    this.getCSVData$
    const obj: any = {};
    const keys = arr[0].slice(1); // extract the keys from the first row
    for (let i = 1; i < arr.length; i++) {
      const row: any[] = arr[i];
      const rowKey: string = row[0];
      obj[rowKey] = {};
      for (let j = 1; j < row.length; j++) {
        obj[rowKey][keys[j - 1]] = Number(row[j]);
      }
    }
    return obj;
  }

  public getCategoricalSimilaritiesTurtle$(): Observable<String> {
    return this.getCSVData$()
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        map(
          (d: any): String => {
            const lijst: any[] = d.split('\n');
            let arr: any[][] = new Array(lijst.length);
            for (let i = 0; i < arr.length; i++) {
              arr[i] = new Array(lijst.length);
              const waarden: any[] = lijst[i].split(';');
              for (let j = 0; j < arr.length; j++) {
                arr[i][j] = waarden.at(j);
              }
            }
            return this.categoriesToTurtle(this.doubleArrayToObject(arr));
          }
        )
      );
  }

  public getCategoricalSimilaritiesObject$(): Observable<any> {
    return this.getCSVData$()
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        map(
          (d: any): any => {
            const lijst: any[] = d.split('\n');
            let arr: any[][] = new Array(lijst.length);
            for (let i = 0; i < arr.length; i++) {
              arr[i] = new Array(lijst.length);
              const waarden: any[] = lijst[i].split(';');
              for (let j = 0; j < arr.length; j++) {
                arr[i][j] = waarden.at(j);
              }
            }
            return this.doubleArrayToObject(arr);
          }
        )
      );
  }

  private categoriesToTurtle(obj: any): string {
    let teller: number = 1;
    let categoricalTurtle = "";
    categoricalTurtle += "@prefix sim: <http://purl.org/ontology/similarity/> .\n";
    Object.keys(obj).forEach(key => {
      Object.keys(obj[key]).forEach(subKey => {
        if (key && subKey && obj[key][subKey]) {
          categoricalTurtle += `<ex/${teller}> a sim:Association ;\n`;
          categoricalTurtle += `\tsim:subject "${key}" ; \n`;
          categoricalTurtle += `\tsim:object "${subKey}" ; \n`;
          categoricalTurtle += `\tsim:weight ${obj[key][subKey]} . \n`;
          teller += 1;
        }
      });
    });
    return categoricalTurtle;
  }

  public getPoiTurtle$(): Observable<String> {
    return this.getPoiJsonData$()
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        map(
          (data: any): String => {
            let sleutels = new Set();
            let turtleOutput = "";
            turtleOutput += "@prefix schema: <http://schema.org/> . \n";
            turtleOutput += "@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>.\n";
            turtleOutput += "@prefix dbp: <https://dbpedia.org/ontology/>.\n";
            turtleOutput += "@prefix km4c: <http://www.disit.org/km4city/schema#>.\n";
            turtleOutput += "@prefix lgdo: <http://linkedgeodata.org/ontology/>.\n";
            turtleOutput += "@prefix ex: <http://example.org/> . \n\n";

            let linkData: any[] = [...data['features']]
            let keywordsSet: Set<string> = new Set();
            while (linkData.length != 0) {
              Object.keys(linkData[0]['properties']).forEach(t => sleutels.add(t));
              let idZonderNode: String = String(linkData[0]['id']).replace("node/", "");
              let tripleIdentifier = `<ex/${idZonderNode}>`;
              //AMENITY
              let keywords = [];
              let relevant = true;
              if (linkData[0]['properties']['amenity']) {
                if (linkData[0]['properties']['amenity'] == "restaurant") {
                  keywords.push("restaurant");
                  turtleOutput += `${tripleIdentifier} a schema:Restaurant ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "fast_food") {
                  keywords.push("fastfood");
                  turtleOutput += `${tripleIdentifier} a schema:FastFoodRestaurant ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "cafe") {
                  keywords.push("cafe");
                  turtleOutput += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "bar") {
                  keywords.push("bar");
                  turtleOutput += `${tripleIdentifier} a schema:BarOrPub ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "pub") {
                  keywords.push("pub");
                  turtleOutput += `${tripleIdentifier} a schema:BarOrPub ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "ice_cream") {
                  keywords.push("icecream");
                  turtleOutput += `${tripleIdentifier} a schema:IceCreamShop ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "nightclub") {
                  keywords.push("nightclub");
                  turtleOutput += `${tripleIdentifier} a schema:NightClub ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "theatre") {
                  keywords.push("theater");
                  turtleOutput += `${tripleIdentifier} a dbp:Theatre ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "events_venue") {
                  keywords.push("event");
                  keywords.push("venue");
                  turtleOutput += `${tripleIdentifier} a schema:EventVenue ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "community_centre") {
                  keywords.push("community");
                  turtleOutput += `${tripleIdentifier} a km4c:Community_centre ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "studio") {
                  keywords.push("studio");
                  turtleOutput += `${tripleIdentifier} a lgdo:Studio ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "cinema") {
                  keywords.push("cinema");
                  turtleOutput += `${tripleIdentifier} a schema:MovieTheater ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "fountain") {
                  keywords.push("fountain");
                  turtleOutput += `${tripleIdentifier} a lgdo:Fountain ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "public_bookcase") {
                  keywords.push("public");
                  keywords.push("bookcase");
                  turtleOutput += `${tripleIdentifier} a ex:public_bookcase ;\n`;
                } else if (linkData[0]['properties']['amenity'] == "social_centre") {
                  keywords.push("social");
                  turtleOutput += `${tripleIdentifier} a lgdo:SocialCentre ;\n`;
                } else {
                  turtleOutput += `${tripleIdentifier} a schema:Place ;\n`;
                }
                //SHOP
              } else if (linkData[0]['properties']['shop']) {
                if (linkData[0]['properties']['shop'] == "bicycle") {
                  keywords.push("bicycle");
                  turtleOutput += `${tripleIdentifier} a schema:BikeStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "bakery") {
                  keywords.push("bakery");
                  turtleOutput += `${tripleIdentifier} a schema:Bakery ;\n`;
                } else if (linkData[0]['properties']['shop'] == "convenience") {
                  keywords.push("convenience");
                  turtleOutput += `${tripleIdentifier} a schema:ConvenienceStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "deli") {
                  keywords.push("deli");
                  turtleOutput += `${tripleIdentifier} a schema:HomeGoodsStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "tattoo") {
                  keywords.push("tattoo");
                  turtleOutput += `${tripleIdentifier} a lgdo:TattooShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "hairdresser") {
                  keywords.push("hairdresser");
                  turtleOutput += `${tripleIdentifier} a schema:HairSalon ;\n`;
                } else if (linkData[0]['properties']['shop'] == "medical_supply") {
                  keywords.push("medical");
                  keywords.push("supply");
                  turtleOutput += `${tripleIdentifier} a schema:medical_supply ;\n`;
                } else if (linkData[0]['properties']['shop'] == "antiques") {
                  keywords.push("antiques");
                  turtleOutput += `${tripleIdentifier} a km4c:Antiques ;\n`;
                } else if (linkData[0]['properties']['shop'] == "window_blind") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "second_hand") {
                  keywords.push("secondhand");
                  turtleOutput += `${tripleIdentifier} a km4c:Second_hand_goods ;\n`;
                } else if (linkData[0]['properties']['shop'] == "telecommunication") {
                  keywords.push("telecommunication");
                  turtleOutput += `${tripleIdentifier} a km4c:Telecommunication ;\n`;
                } else if (linkData[0]['properties']['shop'] == "motorcycle") {
                  keywords.push("motorcycle");
                  turtleOutput += `${tripleIdentifier} a lgdo:motorcycle ;\n`;
                } else if (linkData[0]['properties']['shop'] == "pet") {
                  keywords.push("pet");
                  turtleOutput += `${tripleIdentifier} a schema:PetStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "car_repair") {
                  keywords.push("car");
                  keywords.push("repair");
                  turtleOutput += `${tripleIdentifier} a schema:AutoRepair ;\n`;
                } else if (linkData[0]['properties']['shop'] == "hifi") {
                  keywords.push("hifi");
                  turtleOutput += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "massage") {
                  keywords.push("massage");
                  turtleOutput += `${tripleIdentifier} a schema:DaySpa ;\n`;
                } else if (linkData[0]['properties']['shop'] == "beverages") {
                  keywords.push("beverages");
                  turtleOutput += `${tripleIdentifier} a schema:LiquorStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "appliance") {
                  keywords.push("appliance");
                  turtleOutput += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "photo") {
                  keywords.push("photo");
                  turtleOutput += `${tripleIdentifier} a schema:Photograph ;\n`;
                } else if (linkData[0]['properties']['shop'] == "bag") {
                  keywords.push("bag");
                  turtleOutput += `${tripleIdentifier} a lgdo:bagsShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "party") {
                  keywords.push("party");
                  turtleOutput += `${tripleIdentifier} a ex:partyStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "seafood") {
                  keywords.push("seafood");
                  keywords.push("fish");
                  turtleOutput += `${tripleIdentifier} a km4c:Fish_and_seafood ;\n`;
                } else if (linkData[0]['properties']['shop'] == "craft") {
                  keywords.push("craft");
                  turtleOutput += `${tripleIdentifier} a lgdo:craft ;\n`;
                } else if (linkData[0]['properties']['shop'] == "kiosk") {
                  keywords.push("kiosk");
                  turtleOutput += `${tripleIdentifier} a lgdo:kiosk ;\n`;
                } else if (linkData[0]['properties']['shop'] == "video_games") {
                  keywords.push("videogames");
                  turtleOutput += `${tripleIdentifier} a lgdo:videoGames ;\n`;
                } else if (linkData[0]['properties']['shop'] == "toys") {
                  keywords.push("toys");
                  turtleOutput += `${tripleIdentifier} a schema:ToyStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "mall") {
                  keywords.push("mall");
                  turtleOutput += `${tripleIdentifier} a schema:ShoppingCenter ;\n`;
                } else if (linkData[0]['properties']['shop'] == "ticket") {
                  keywords.push("ticket");
                  turtleOutput += `${tripleIdentifier} a lgdo:Ticket ;\n`;
                } else if (linkData[0]['properties']['shop'] == "juice") {
                  keywords.push("juice");
                  turtleOutput += `${tripleIdentifier} a ex:JuiceStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "perfumery") {
                  keywords.push("perfumery");
                  turtleOutput += `${tripleIdentifier} a km4c:Perfumery_and_cosmetic_articles ;\n`;
                } else if (linkData[0]['properties']['shop'] == "computer") {
                  keywords.push("computer");
                  turtleOutput += `${tripleIdentifier} a schema:ComputerStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "hearing_aids") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "interior_decoration") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "bookmaker") {
                  keywords.push("bookmaker");
                  turtleOutput += `${tripleIdentifier} a lgdo:BookmakerShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "hardware") {
                  keywords.push("hardware");
                  turtleOutput += `${tripleIdentifier} a schema:HardwareStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "florist") {
                  keywords.push("florist");
                  keywords.push("flower");
                  turtleOutput += `${tripleIdentifier} a schema:Florist ;\n`;
                } else if (linkData[0]['properties']['shop'] == "art") {
                  keywords.push("art");
                  turtleOutput += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
                } else if (linkData[0]['properties']['shop'] == "baby_goods") {
                  keywords.push("baby");
                  turtleOutput += `${tripleIdentifier} a schema:ChildCare ;\n`;
                } else if (linkData[0]['properties']['shop'] == "games") {
                  keywords.push("games");
                  turtleOutput += `${tripleIdentifier} a schema:games ;\n`;
                } else if (linkData[0]['properties']['shop'] == "car") {
                  keywords.push("car");
                  turtleOutput += `${tripleIdentifier} a lgdo:CarShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "variety_store") {
                  keywords.push("variety");
                  turtleOutput += `${tripleIdentifier} a lgdo:variety ;\n`;
                } else if (linkData[0]['properties']['shop'] == "department_store") {
                  keywords.push("department");
                  turtleOutput += `${tripleIdentifier} a lgdo:DepartmentStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "confectionery") {
                  keywords.push("confectionery");
                  turtleOutput += `${tripleIdentifier} a lgdo:Confectionery ;\n`;
                } else if (linkData[0]['properties']['shop'] == "pastry") {
                  keywords.push("pastry");
                  turtleOutput += `${tripleIdentifier} a km4c:Pastry_shop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "stationery") {
                  keywords.push("stationery");
                  turtleOutput += `${tripleIdentifier} a km4c:Newspapers_and_stationery ;\n`;
                } else if (linkData[0]['properties']['shop'] == "clothes") {
                  keywords.push("clothes");
                  turtleOutput += `${tripleIdentifier} a lgdo:Clothes ;\n`;
                } else if (linkData[0]['properties']['shop'] == "shoes") {
                  keywords.push("shoes");
                  turtleOutput += `${tripleIdentifier} a lgdo:Shoes ;\n`;
                } else if (linkData[0]['properties']['shop'] == "health_food") {
                  keywords.push("food");
                  keywords.push("healthy");
                  keywords.push("health");
                  turtleOutput += `${tripleIdentifier} a lgdo:HealthFood ;\n`;
                } else if (linkData[0]['properties']['shop'] == "supermarket") {
                  keywords.push("supermarket");
                  turtleOutput += `${tripleIdentifier} a km4c:Supermarket ;\n`;
                } else if (linkData[0]['properties']['shop'] == "chocolate") {
                  keywords.push("chocolate");
                  turtleOutput += `${tripleIdentifier} a lgdo:Chocolate ;\n`;
                } else if (linkData[0]['properties']['shop'] == "fashion_accessories") {
                  keywords.push("fashion");
                  keywords.push("accessories");
                  turtleOutput += `${tripleIdentifier} a ex:fashionAccessories ;\n`;
                } else if (linkData[0]['properties']['shop'] == "herbalist") {
                  keywords.push("herbalist");
                  turtleOutput += `${tripleIdentifier} a km4c:Herbalist_shop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "jewelry") {
                  keywords.push("jewelry");
                  turtleOutput += `${tripleIdentifier} a schema:JewelryStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "outdoor") {
                  keywords.push("outdoor");
                  turtleOutput += `${tripleIdentifier} a lgdo:outdoor ;\n`;
                } else if (linkData[0]['properties']['shop'] == "furniture") {
                  keywords.push("furniture");
                  turtleOutput += `${tripleIdentifier} a schema:FurnitureStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "electronics") {
                  keywords.push("electronics");
                  turtleOutput += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "gift") {
                  keywords.push("gift");
                  turtleOutput += `${tripleIdentifier} a lgdo:Gift ;\n`;
                } else if (linkData[0]['properties']['shop'] == "alcohol") {
                  keywords.push("alcohol");
                  turtleOutput += `${tripleIdentifier} a schema:LiquorStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "paint") {
                  keywords.push("paint");
                  turtleOutput += `${tripleIdentifier} a lgdo:Paint ;\n`;
                } else if (linkData[0]['properties']['shop'] == "butcher") {
                  keywords.push("butcher");
                  keywords.push("meat");
                  turtleOutput += `${tripleIdentifier} a lgdo:Butcher ;\n`;
                } else if (linkData[0]['properties']['shop'] == "bed") {
                  keywords.push("bed");
                  turtleOutput += `${tripleIdentifier} a schema:BedStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "beauty") {
                  keywords.push("beauty");
                  turtleOutput += `${tripleIdentifier} a lgdo:BeautyShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "cosmetics") {
                  keywords.push("cosmetics");
                  turtleOutput += `${tripleIdentifier} a lgdo:Cosmetics ;\n`;
                } else if (linkData[0]['properties']['shop'] == "tailor") {
                  keywords.push("tailor");
                  turtleOutput += `${tripleIdentifier} a lgdo:Tailor ;\n`;
                } else if (linkData[0]['properties']['shop'] == "fabric") {
                  keywords.push("fabric");
                  turtleOutput += `${tripleIdentifier} a lgdo:Fabric ;\n`;
                } else if (linkData[0]['properties']['shop'] == "wholesale") {
                  keywords.push("wholesale");
                  turtleOutput += `${tripleIdentifier} a km4c:wholesale ;\n`;
                } else if (linkData[0]['properties']['shop'] == "newsagent") {
                  keywords.push("newsagent");
                  turtleOutput += `${tripleIdentifier} a lgdo:Newsagent ;\n`;
                } else if (linkData[0]['properties']['shop'] == "leather") {
                  keywords.push("leather");
                  turtleOutput += `${tripleIdentifier} a lgdo:Leather ;\n`;
                } else if (linkData[0]['properties']['shop'] == "car_parts") {
                  keywords.push("parts");
                  keywords.push("car");
                  turtleOutput += `${tripleIdentifier} a schema:AutoPartsStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "copyshop") {
                  keywords.push("copy");
                  turtleOutput += `${tripleIdentifier} a lgdo:Copyshop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "books") {
                  keywords.push("book");
                  turtleOutput += `${tripleIdentifier} a schema:BookStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "charity") {
                  keywords.push("charity");
                  keywords.push("NGO");
                  turtleOutput += `${tripleIdentifier} a schema:NGO ;\n`;
                } else if (linkData[0]['properties']['shop'] == "radiotechnics") {
                  keywords.push("radio");
                  keywords.push("technics");
                  turtleOutput += `${tripleIdentifier} a ex:RadioTechnics ;\n`;
                } else if (linkData[0]['properties']['shop'] == "coffee") {
                  keywords.push("coffee");
                  turtleOutput += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "textile_printing") {
                  keywords.push("textile");
                  keywords.push("printing");
                  turtleOutput += `${tripleIdentifier} a ex:TextilePrinting ;\n`;
                } else if (linkData[0]['properties']['shop'] == "chemist") {
                  keywords.push("chemist");
                  keywords.push("chemistry");
                  turtleOutput += `${tripleIdentifier} a lgdo:chemist ;\n`;
                } else if (linkData[0]['properties']['shop'] == "spices") {
                  keywords.push("spices");
                  turtleOutput += `${tripleIdentifier} a ex:Spices ;\n`;
                } else if (linkData[0]['properties']['shop'] == "musical_instrument") {
                  keywords.push("instrument");
                  keywords.push("musical");
                  keywords.push("music");
                  turtleOutput += `${tripleIdentifier} a km4c:Musical_instruments_and_scores ;\n`;
                } else if (linkData[0]['properties']['shop'] == "erotic") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "wine") {
                  keywords.push("wine");
                  turtleOutput += `${tripleIdentifier} a lgdo:Wine ;\n`;
                } else if (linkData[0]['properties']['shop'] == "video") {
                  keywords.push("video");
                  turtleOutput += `${tripleIdentifier} a lgdo:Video ;\n`;
                } else if (linkData[0]['properties']['shop'] == "mobile_phone") {
                  keywords.push("mobilephone");
                  keywords.push("phone");
                  keywords.push("mobile");
                  turtleOutput += `${tripleIdentifier} a lgdo:mobilePhone ;\n`;
                } else if (linkData[0]['properties']['shop'] == "travel_agency") {
                  keywords.push("travel");
                  turtleOutput += `${tripleIdentifier} a schema:TravelAgency ;\n`;
                } else if (linkData[0]['properties']['shop'] == "garden_centre") {
                  keywords.push("garden");
                  turtleOutput += `${tripleIdentifier} a lgdo:GardenCentre ;\n`;
                } else if (linkData[0]['properties']['shop'] == "greengrocer") {
                  keywords.push("greengrocer");
                  turtleOutput += `${tripleIdentifier} a lgdo:Greengrocer ;\n`;
                } else if (linkData[0]['properties']['shop'] == "skate") {
                  keywords.push("skate");
                  turtleOutput += `${tripleIdentifier} a ex:SkateShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "sports") {
                  keywords.push("sport");
                  keywords.push("sports");
                  turtleOutput += `${tripleIdentifier} a lgdo:Sports ;\n`;
                } else if (linkData[0]['properties']['shop'] == "carpet") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "optician") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "nuts") {
                  keywords.push("nut");
                  keywords.push("nuts");
                  turtleOutput += `${tripleIdentifier} a ex:NutsStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "laundry") {
                  keywords.push("laundry");
                  turtleOutput += `${tripleIdentifier} a schema:DryCleaningOrLaundry ;\n`;
                } else if (linkData[0]['properties']['shop'] == "doityourself") {
                  keywords.push("DIY");
                  turtleOutput += `${tripleIdentifier} a lgdo:Doityourself ;\n`;
                } else if (linkData[0]['properties']['shop'] == "brass_instruments") {
                  keywords.push("brass");
                  keywords.push("instruments");
                  turtleOutput += `${tripleIdentifier} a schema:brass_instruments ;\n`;
                } else if (linkData[0]['properties']['shop'] == "music") {
                  keywords.push("music");
                  turtleOutput += `${tripleIdentifier} a schema:MusicStore ;\n`;
                } else if (linkData[0]['properties']['shop'] == "lottery") {
                  keywords.push("lottery");
                  keywords.push("luck");
                  turtleOutput += `${tripleIdentifier} a ex:Lottery ;\n`;
                } else if (linkData[0]['properties']['shop'] == "bathroom_furnishing") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "locksmith") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "general") {
                  keywords.push("general");
                  turtleOutput += `${tripleIdentifier} a lgdo:General ;\n`;
                } else if (linkData[0]['properties']['shop'] == "funeral_directors") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "houseware") {
                  keywords.push("houseware");
                  keywords.push("housewares");
                  keywords.push("house");
                  turtleOutput += `${tripleIdentifier} a lgdo:housewares ;\n`;
                } else if (linkData[0]['properties']['shop'] == "kitchen") {
                  keywords.push("kitchen");
                  turtleOutput += `${tripleIdentifier} a lgdo:KitchenShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "wine; books") {
                  keywords.push("wine");
                  keywords.push("book");
                  turtleOutput += `${tripleIdentifier} a lgdo:BookShop ;\n`;
                } else if (linkData[0]['properties']['shop'] == "fashion") {
                  keywords.push("fashion");
                  turtleOutput += `${tripleIdentifier} a lgdo:Fashion ;\n`;
                } else if (linkData[0]['properties']['shop'] == "e-cigarette") {
                  keywords.push("cigarette");
                  turtleOutput += `${tripleIdentifier} a ex:E-Cigarette ;\n`;
                } else if (linkData[0]['properties']['shop'] == "yes") {
                  turtleOutput += `${tripleIdentifier} a schema:Store ;\n`;
                } else {
                  turtleOutput += `${tripleIdentifier} a schema:Store ;\n`;
                }
                //TOURISM
              } else if (linkData[0]['properties']['tourism']) {
                if (linkData[0]['properties']['tourism'] == "hotel") {
                  keywords.push("hotel");
                  turtleOutput += `${tripleIdentifier} a schema:Hotel ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "museum") {
                  keywords.push("museum");
                  turtleOutput += `${tripleIdentifier} a schema:Museum ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "hostel") {
                  keywords.push("hostel");
                  turtleOutput += `${tripleIdentifier} a schema:hostel ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "gallery") {
                  keywords.push("gallery");
                  turtleOutput += `${tripleIdentifier} a schema:gallery ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "attraction") {
                  keywords.push("attraction");
                  turtleOutput += `${tripleIdentifier} a schema:TouristAttraction ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "artwork") {
                  keywords.push("artwork");
                  keywords.push("art");
                  //OPZOEKEN OP SITE
                  turtleOutput += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "guest_house") {
                  keywords.push("guesthouse");
                  keywords.push("guest");
                  keywords.push("house");
                  //OPZOEKEN OP SITE
                  turtleOutput += `${tripleIdentifier} a schema:Accommodation ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "apartment") {
                  keywords.push("apartment");
                  //OPZOEKEN OP SITE
                  turtleOutput += `${tripleIdentifier} a schema:Apartment ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "information") {
                  keywords.push("information");
                  //OPZOEKEN OP SITE
                  turtleOutput += `${tripleIdentifier} a schema:TouristInformationCenter ;\n`;
                } else if (linkData[0]['properties']['tourism'] == "viewpoint") {
                  keywords.push("viewpoint");
                  //OPZOEKEN OP SITE
                  turtleOutput += `${tripleIdentifier} a schema:viewpoint ;\n`;
                } else {
                  turtleOutput += `${tripleIdentifier} a schema:TouristDestination ;\n`;

                }

                //leisure
              } else if (linkData[0]['properties']['leisure']) {
                if (linkData[0]['properties']['leisure'] == "picnic_table") {
                  keywords.push("picnic");
                  keywords.push("table");
                  turtleOutput += `${tripleIdentifier} a schema:Place ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "playground") {
                  keywords.push("playground");
                  turtleOutput += `${tripleIdentifier} a schema:Playground ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "fitness_centre") {
                  keywords.push("fitness");
                  keywords.push("gym");
                  turtleOutput += `${tripleIdentifier} a lgdo:Gym ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "sports_centre") {
                  keywords.push("sport");
                  keywords.push("sports");
                  turtleOutput += `${tripleIdentifier} a lgdo:SportsCentre ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "hackerspace") {
                  keywords.push("hackerspace");
                  keywords.push("hacker");
                  keywords.push("hack");
                  turtleOutput += `${tripleIdentifier} a lgdo:Hackerspace ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "dance") {
                  keywords.push("dance");
                  keywords.push("dancing");
                  turtleOutput += `${tripleIdentifier} a lgdo:Dance ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "garden") {
                  keywords.push("garden");
                  turtleOutput += `${tripleIdentifier} a lgdo:GardenCentre ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "amusement_arcade") {
                  keywords.push("arcade");
                  turtleOutput += `${tripleIdentifier} a schema:AmusementPark ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "escape_game") {
                  keywords.push("escape");
                  keywords.push("game");
                  turtleOutput += `${tripleIdentifier} a ex:EscapeGame ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "pitch") {
                  keywords.push("pitch");
                  turtleOutput += `${tripleIdentifier} a lgdo:Pitch ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "sports_hall") {
                  keywords.push("sportshall");
                  turtleOutput += `${tripleIdentifier} a ex:SportsHall ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "sauna") {
                  keywords.push("sauna");
                  turtleOutput += `${tripleIdentifier} a lgdo:Sauna ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "marina") {
                  keywords.push("marina");
                  keywords.push("boatyard");
                  keywords.push("port");
                  keywords.push("harbor");
                  turtleOutput += `${tripleIdentifier} a lgdo:Marina ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "swimming_pool") {
                  keywords.push("swimming");
                  keywords.push("pool");
                  turtleOutput += `${tripleIdentifier} a lgdo:SwimmingPool ;\n`;
                } else if (linkData[0]['properties']['leisure'] == "fitness_station") {
                  keywords.push("fitness");
                  keywords.push("gym");
                  turtleOutput += `${tripleIdentifier} a ex:FitnessStation ;\n`;
                } else {
                  turtleOutput += `${tripleIdentifier} a schema:Place ;\n`;

                }
                //HISTORIC
              } else if (linkData[0]['properties']['historic']) {
                if (linkData[0]['properties']['historic'] == "building") {
                  keywords.push("building");
                  turtleOutput += `${tripleIdentifier} a lgdo:Building ;\n`;
                } else if (linkData[0]['properties']['historic'] == "memorial") {
                  keywords.push("memorial");
                  turtleOutput += `${tripleIdentifier} a lgdo:Memorial ;\n`;
                } else if (linkData[0]['properties']['historic'] == "ruins") {
                  keywords.push("ruins");
                  keywords.push("ruin");
                  turtleOutput += `${tripleIdentifier} a lgdo:Ruins ;\n`;
                } else if (linkData[0]['properties']['historic'] == "wayside_cross") {
                  keywords.push("cross");
                  keywords.push("wayside");
                  turtleOutput += `${tripleIdentifier} a ex:WaysideCross ;\n`;
                } else if (linkData[0]['properties']['historic'] == "wayside_shrine") {
                  keywords.push("shrine");
                  turtleOutput += `${tripleIdentifier} a dbp:Shrine ;\n`;
                } else if (linkData[0]['properties']['historic'] == "fort") {
                  keywords.push("fort");
                  turtleOutput += `${tripleIdentifier} a lgdo:Fort ;\n`;
                } else if (linkData[0]['properties']['historic'] == "archaeological_site") {
                  keywords.push("archaeological");
                  keywords.push("archeology");
                  turtleOutput += `${tripleIdentifier} a lgdo:ArchaeologicalSite ;\n`;
                } else if (linkData[0]['properties']['historic'] == "monument") {
                  keywords.push("monument");
                  turtleOutput += `${tripleIdentifier} a lgdo:Monument ;\n`;
                } else if (linkData[0]['properties']['historic'] == "industrial") {
                  keywords.push("industrial");
                  turtleOutput += `${tripleIdentifier} a lgdo:IndustrialProductionBuilding ;\n`;
                } else if (linkData[0]['properties']['historic'] == "monastery") {
                  keywords.push("monastery");
                  turtleOutput += `${tripleIdentifier} a lgdo:Monastery ;\n`;
                } else if (linkData[0]['properties']['historic'] == "yes") {
                  turtleOutput += `${tripleIdentifier} a lgdo:Place ;\n`;
                } else {
                  turtleOutput += `${tripleIdentifier} a lgdo:Place ;\n`;

                }
                //MEMORIAL
              } else if (linkData[0]['properties']['memorial']) {
                if (linkData[0]['properties']['memorial'] == "plaque") {
                  keywords.push("plaque");
                  turtleOutput += `${tripleIdentifier} a ex:Plaque ;\n`;
                } else if (linkData[0]['properties']['memorial'] == "playground") {
                  keywords.push("playground");
                  turtleOutput += `${tripleIdentifier} a schema:Playground ;\n`;
                } else {
                  turtleOutput += `${tripleIdentifier} a lgdo:Place ;\n`;
                }
              }
              //ANDEREN!
              else {
                turtleOutput += `${tripleIdentifier} a schema:Place ;\n`;
              }
              if (relevant) {
                if (linkData[0]['properties']['name']) turtleOutput += `\tschema:name "${linkData[0]['properties']['name']}" ; \n`;
                if (linkData[0]['properties']['name:nl'] && linkData[0]['properties']['name:nl'] != linkData[0]['properties']['name']) turtleOutput += `\tschema:name "${linkData[0]['properties']['name:nl']}" ; \n`;
                if (linkData[0]['properties']['website']) turtleOutput += `\tschema:url "${linkData[0]['properties']['website']}" ; \n`;
                if (linkData[0]['properties']['phone']) turtleOutput += `\tschema:telephone "${linkData[0]['properties']['phone']}" ; \n`;
                if (linkData[0]['properties']['alt_name']) turtleOutput += `\tschema:alternateName "${linkData[0]['properties']['alt_name']}" ; \n`;
                if (linkData[0]['properties']['amenity']) turtleOutput += `\tschema:amenityFeature "${linkData[0]['properties']['amenity']}" ; \n`;
                if (linkData[0]['properties']["addr:street"]) {
                  turtleOutput += `\tschema:PostalAddress [ 
          \ta schema:PostalAddress ;
          \tschema:streetAddress "${linkData[0]['properties']["addr:street"]}" ;\n`;
                  if (linkData[0]['properties']["addr:housenumber"]) turtleOutput += `\t\tschema:postOfficeBoxNumber "${linkData[0]['properties']["addr:housenumber"]}" ; \n`;
                  if (linkData[0]['properties']["addr:postcode"]) turtleOutput += `\t\tschema:postalCode "${linkData[0]['properties']["addr:postcode"]}" ; \n`;
                  if (linkData[0]['properties']["addr:city"]) turtleOutput += `\t\tschema:addressLocality "${linkData[0]['properties']["addr:city"]}" ; \n`;
                  if (linkData[0]['properties']["addr:country"]) turtleOutput += `\t\tschema:addressCountry "${linkData[0]['properties']["addr:country"]}" ; \n`;
                  turtleOutput += `\t] ; \n`;
                }
                if (linkData[0]['properties']['cuisine']) {
                  for (let item of linkData[0]['properties']['cuisine'].split(';')) {
                    turtleOutput += `\tschema:servesCuisine "${item}" ; \n`;
                    turtleOutput += `\tschema:keyword "${item}" ; \n`;
                    keywords.push(item);
                  }
                }
                for (let keyword of keywords) {
                  turtleOutput += `\tschema:keyword "${keyword}" ; \n`;
                }
                if (linkData[0]['geometry']) {
                  turtleOutput += `\tschema:geo [ 
                    \ta geo:Point ;
                    \tgeo:lat "${linkData[0]['geometry']['coordinates'][0]}" ;
                    \tgeo:long "${linkData[0]['geometry']['coordinates'][1]}" ;
                  ] . \n`;
                }
              }
              keywords.forEach(t => keywordsSet.add(t));
              linkData.splice(0, 1);
            }
            this.allKeywords = Array.from(keywordsSet).sort();
            return turtleOutput;
          }
        )
      );
  }

}