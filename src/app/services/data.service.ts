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
  public sigmaUser: Sigma;
  public allKeywords: Set<string> = new Set();
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

  public getNodeJsonData$(): Observable<any> {
    return this.http.get<any>('./assets/data/node_data.json');
  }

  public getWayJsonData$(): Observable<any> {
    return this.http.get<any>('./assets/data/way_data.json');
  }

  public getRelationJsonData$(): Observable<any> {
    return this.http.get<any>('./assets/data/relation_data.json');
  }

  private getCSVData$(): Observable<string> {
    return this.http.get('./assets/data/categorical_similarities.csv', { responseType: 'text' });
  }

  public getWikidataImage$(url: string): Observable<any> {
    let wikidataId = url.split("/")[url.split("/").length - 1]
    let query = `SELECT ?image { wd:${wikidataId} wdt:P18 ?image } LIMIT 1`;
    return this.http.get(`https://query.wikidata.org/bigdata/namespace/wdq/sparql?query=${query}`);
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
    let categoricalTurtle = "";
    categoricalTurtle += "@prefix sim: <http://purl.org/ontology/similarity/> .\n";
    Object.keys(obj).forEach(key => {
      Object.keys(obj[key]).forEach(subKey => {
        if (key && subKey && obj[key][subKey]) {
          categoricalTurtle += `<ex/${teller}> a sim:Association ;\n`;
          categoricalTurtle += `\tsim:subject "${key}" ; \n`;
          categoricalTurtle += `\tsim:object "${subKey}" ; \n`;
          categoricalTurtle += `\tsim:weight ${obj[key][subKey]} . \n`;
        }
      });
    });
    return categoricalTurtle;
  }

  public getTurtleOfData$(data: Observable<any>): Observable<String> {
    return data
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        map(
          (data: any): String => {
            let sleutels = new Set();
            let turtleOutput = "";
            turtleOutput += "@prefix schema: <http://schema.org/> . \n";
            turtleOutput += "@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .\n";
            turtleOutput += "@prefix dbp: <https://dbpedia.org/ontology/> .\n";
            turtleOutput += "@prefix km4c: <http://www.disit.org/km4city/schema#> .\n";
            turtleOutput += "@prefix lgdo: <http://linkedgeodata.org/ontology/> .\n";
            turtleOutput += "@prefix ex: <http://example.org/> . \n\n";

            let linkData: any[] = [...data['features']]
            while (linkData.length != 0) {
              let printPlace = true;
              Object.keys(linkData[0]['properties']).forEach(t => sleutels.add(t));
              // let idWithoutNode: String = String(linkData[0]['id']).replace("node/", "");
              let id: String = String(linkData[0]['id']);
              let tripleIdentifier = `<${id}>`;
              //AMENITY
              let keywords: Set<string> = new Set();
              let relevant = true;
              let prefix = "";
              let category = "";
              if (linkData[0]['properties']['amenity']) {
                if (linkData[0]['properties']['amenity'] == "restaurant") {
                  keywords.add("restaurant");
                  prefix = "schema";
                  category = "Restaurant";
                } else if (linkData[0]['properties']['amenity'] == "fast_food") {
                  keywords.add("fastfood");
                  prefix = "schema";
                  category = "FastFoodRestaurant";
                } else if (linkData[0]['properties']['amenity'] == "cafe") {
                  keywords.add("cafe");
                  prefix = "schema";
                  category = "CafeOrCoffeeShop";
                } else if (linkData[0]['properties']['amenity'] == "bar") {
                  keywords.add("bar");
                  prefix = "schema";
                  category = "BarOrPub";
                } else if (linkData[0]['properties']['amenity'] == "pub") {
                  keywords.add("pub");
                  prefix = "schema";
                  category = "BarOrPub";
                } else if (linkData[0]['properties']['amenity'] == "ice_cream") {
                  keywords.add("icecream");
                  prefix = "schema";
                  category = "IceCreamShop";
                } else if (linkData[0]['properties']['amenity'] == "school") {
                  keywords.add("school");
                  prefix = "schema";
                  category = "School";
                } else if (linkData[0]['properties']['amenity'] == "townhall") {
                  keywords.add("townhall");
                  prefix = "lgdo";
                  category = "TownHall";
                } else if (linkData[0]['properties']['amenity'] == "nightclub") {
                  keywords.add("nightclub");
                  prefix = "schema";
                  category = "NightClub";
                } else if (linkData[0]['properties']['amenity'] == "theatre") {
                  keywords.add("theater");
                  prefix = "dbp";
                  category = "Theatre";
                } else if (linkData[0]['properties']['amenity'] == "events_venue") {
                  keywords.add("event");
                  keywords.add("venue");
                  prefix = "schema";
                  category = "EventVenue";
                } else if (linkData[0]['properties']['amenity'] == "community_centre") {
                  keywords.add("community");
                  prefix = "km4c";
                  category = "Community_centre";
                } else if (linkData[0]['properties']['amenity'] == "food_court") {
                  keywords.add("foodcourt");
                  prefix = "ex";
                  category = "FootCourt";
                } else if (linkData[0]['properties']['amenity'] == "studio") {
                  keywords.add("studio");
                  prefix = "lgdo";
                  category = "Studio";
                } else if (linkData[0]['properties']['amenity'] == "cinema") {
                  keywords.add("cinema");
                  prefix = "schema";
                  category = "MovieTheater";
                } else if (linkData[0]['properties']['amenity'] == "fountain") {
                  keywords.add("fountain");
                  prefix = "lgdo";
                  category = "Fountain";
                } else if (linkData[0]['properties']['amenity'] == "public_bookcase") {
                  keywords.add("public");
                  keywords.add("bookcase");
                  prefix = "ex";
                  category = "public_bookcase";
                } else if (linkData[0]['properties']['amenity'] == "social_centre") {
                  keywords.add("social");
                  prefix = "lgdo";
                  category = "SocialCentre";
                } else if (linkData[0]['properties']['amenity'] == "place_of_worship") {
                  keywords.add("worship");
                  prefix = "schema";
                  category = "PlaceOfWorship";
                } else if (linkData[0]['properties']['amenity'] == "arts_centre") {
                  keywords.add("arts");
                  keywords.add("center");
                  prefix = "lgdo";
                  category = "ArtsCentre";
                } else if (linkData[0]['properties']['amenity'] == "parking") {
                  keywords.add("parking");
                  prefix = "lgdo";
                  category = "Parking";
                } else if (linkData[0]['properties']['amenity'] == "parking_entrance") {
                  keywords.add("parking");
                  prefix = "lgdo";
                  category = "ParkingEntrance";
                } else if (linkData[0]['properties']['amenity'] == "bicycle_parking") {
                  keywords.add("bicycle");
                  keywords.add("parking");
                  prefix = "lgdo";
                  category = "BicycleParking";
                } else if (linkData[0]['properties']['amenity'] == "bicycle_rental") {
                  keywords.add("bicycle");
                  keywords.add("rental");
                  prefix = "lgdo";
                  category = "BicycleRental";
                } else if (linkData[0]['properties']['amenity'] == "university") {
                  keywords.add("university");
                  prefix = "lgdo";
                  category = "University";
                } else {
                  prefix = "schema";
                  category = "Place";
                  console.log(linkData[0]['properties']);
                }
                //SHOP
              } else if (linkData[0]['properties']['shop']) {
                if (linkData[0]['properties']['shop'] == "bicycle") {
                  keywords.add("bicycle");
                  prefix = "schema";
                  category = "BikeStore";
                } else if (linkData[0]['properties']['shop'] == "bakery") {
                  keywords.add("bakery");
                  prefix = "schema";
                  category = "Bakery";
                } else if (linkData[0]['properties']['shop'] == "convenience") {
                  keywords.add("convenience");
                  prefix = "schema";
                  category = "ConvenienceStore";
                } else if (linkData[0]['properties']['shop'] == "deli") {
                  keywords.add("deli");
                  prefix = "schema";
                  category = "HomeGoodsStore";
                } else if (linkData[0]['properties']['shop'] == "tattoo") {
                  keywords.add("tattoo");
                  prefix = "lgdo";
                  category = "TattooShop";
                } else if (linkData[0]['properties']['shop'] == "hairdresser") {
                  keywords.add("hairdresser");
                  prefix = "schema";
                  category = "HairSalon";
                } else if (linkData[0]['properties']['shop'] == "medical_supply") {
                  keywords.add("medical");
                  keywords.add("supply");
                  prefix = "schema";
                  category = "medical_supply";
                } else if (linkData[0]['properties']['shop'] == "antiques") {
                  keywords.add("antiques");
                  prefix = "km4c";
                  category = "Antiques";
                } else if (linkData[0]['properties']['shop'] == "window_blind") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "second_hand") {
                  keywords.add("secondhand");
                  prefix = "km4c";
                  category = "Second_hand_goods";
                } else if (linkData[0]['properties']['shop'] == "telecommunication") {
                  keywords.add("telecommunication");
                  prefix = "km4c";
                  category = "Telecommunication";
                } else if (linkData[0]['properties']['shop'] == "motorcycle") {
                  keywords.add("motorcycle");
                  prefix = "lgdo";
                  category = "motorcycle";
                } else if (linkData[0]['properties']['shop'] == "pet") {
                  keywords.add("pet");
                  prefix = "schema";
                  category = "PetStore";
                } else if (linkData[0]['properties']['shop'] == "car_repair") {
                  keywords.add("car");
                  keywords.add("repair");
                  prefix = "schema";
                  category = "AutoRepair";
                } else if (linkData[0]['properties']['shop'] == "hifi") {
                  keywords.add("hifi");
                  prefix = "schema";
                  category = "ElectronicsStore";
                } else if (linkData[0]['properties']['shop'] == "massage") {
                  keywords.add("massage");
                  prefix = "schema";
                  category = "DaySpa";
                } else if (linkData[0]['properties']['shop'] == "beverages") {
                  keywords.add("beverages");
                  prefix = "schema";
                  category = "LiquorStore";
                } else if (linkData[0]['properties']['shop'] == "appliance") {
                  keywords.add("appliance");
                  prefix = "schema";
                  category = "ElectronicsStore";
                } else if (linkData[0]['properties']['shop'] == "photo") {
                  keywords.add("photo");
                  prefix = "schema";
                  category = "Photograph";
                } else if (linkData[0]['properties']['shop'] == "bag") {
                  keywords.add("bag");
                  prefix = "lgdo";
                  category = "bagsShop";
                } else if (linkData[0]['properties']['shop'] == "party") {
                  keywords.add("party");
                  prefix = "ex";
                  category = "partyStore";
                } else if (linkData[0]['properties']['shop'] == "seafood") {
                  keywords.add("seafood");
                  keywords.add("fish");
                  prefix = "km4c";
                  category = "Fish_and_seafood";
                } else if (linkData[0]['properties']['shop'] == "craft") {
                  keywords.add("craft");
                  prefix = "lgdo";
                  category = "craft";
                } else if (linkData[0]['properties']['shop'] == "kiosk") {
                  keywords.add("kiosk");
                  prefix = "lgdo";
                  category = "kiosk";
                } else if (linkData[0]['properties']['shop'] == "video_games") {
                  keywords.add("videogames");
                  prefix = "lgdo";
                  category = "videoGames";
                } else if (linkData[0]['properties']['shop'] == "toys") {
                  keywords.add("toys");
                  prefix = "schema";
                  category = "ToyStore";
                } else if (linkData[0]['properties']['shop'] == "mall") {
                  keywords.add("mall");
                  prefix = "schema";
                  category = "ShoppingCenter";
                } else if (linkData[0]['properties']['shop'] == "ticket") {
                  keywords.add("ticket");
                  prefix = "lgdo";
                  category = "Ticket";
                } else if (linkData[0]['properties']['shop'] == "juice") {
                  keywords.add("juice");
                  prefix = "ex";
                  category = "JuiceStore";
                } else if (linkData[0]['properties']['shop'] == "perfumery") {
                  keywords.add("perfumery");
                  prefix = "km4c";
                  category = "Perfumery_and_cosmetic_articles";
                } else if (linkData[0]['properties']['shop'] == "computer") {
                  keywords.add("computer");
                  prefix = "schema";
                  category = "ComputerStore";
                } else if (linkData[0]['properties']['shop'] == "hearing_aids") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "interior_decoration") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "bookmaker") {
                  keywords.add("bookmaker");
                  prefix = "lgdo";
                  category = "BookmakerShop";
                } else if (linkData[0]['properties']['shop'] == "hardware") {
                  keywords.add("hardware");
                  prefix = "schema";
                  category = "HardwareStore";
                } else if (linkData[0]['properties']['shop'] == "florist") {
                  keywords.add("florist");
                  keywords.add("flower");
                  prefix = "schema";
                  category = "Florist";
                } else if (linkData[0]['properties']['shop'] == "art") {
                  keywords.add("art");
                  prefix = "schema";
                  category = "VisualArtwork";
                } else if (linkData[0]['properties']['shop'] == "baby_goods") {
                  keywords.add("baby");
                  prefix = "schema";
                  category = "ChildCare";
                } else if (linkData[0]['properties']['shop'] == "games") {
                  keywords.add("games");
                  prefix = "schema";
                  category = "games";
                } else if (linkData[0]['properties']['shop'] == "car") {
                  keywords.add("car");
                  prefix = "lgdo";
                  category = "CarShop";
                } else if (linkData[0]['properties']['shop'] == "variety_store") {
                  keywords.add("variety");
                  prefix = "lgdo";
                  category = "variety";
                } else if (linkData[0]['properties']['shop'] == "department_store") {
                  keywords.add("department");
                  prefix = "lgdo";
                  category = "DepartmentStore";
                } else if (linkData[0]['properties']['shop'] == "confectionery") {
                  keywords.add("confectionery");
                  prefix = "lgdo";
                  category = "Confectionery";
                } else if (linkData[0]['properties']['shop'] == "pastry") {
                  keywords.add("pastry");
                  prefix = "km4c";
                  category = "Pastry_shop";
                } else if (linkData[0]['properties']['shop'] == "stationery") {
                  keywords.add("stationery");
                  prefix = "km4c";
                  category = "Newspapers_and_stationery";
                } else if (linkData[0]['properties']['shop'] == "clothes") {
                  keywords.add("clothes");
                  prefix = "lgdo";
                  category = "Clothes";
                } else if (linkData[0]['properties']['shop'] == "shoes") {
                  keywords.add("shoes");
                  prefix = "lgdo";
                  category = "Shoes";
                } else if (linkData[0]['properties']['shop'] == "health_food") {
                  keywords.add("food");
                  keywords.add("healthy");
                  keywords.add("health");
                  prefix = "lgdo";
                  category = "HealthFood";
                } else if (linkData[0]['properties']['shop'] == "supermarket") {
                  keywords.add("supermarket");
                  prefix = "km4c";
                  category = "Supermarket";
                } else if (linkData[0]['properties']['shop'] == "chocolate") {
                  keywords.add("chocolate");
                  prefix = "lgdo";
                  category = "Chocolate";
                } else if (linkData[0]['properties']['shop'] == "fashion_accessories") {
                  keywords.add("fashion");
                  keywords.add("accessories");
                  prefix = "ex";
                  category = "fashionAccessories";
                } else if (linkData[0]['properties']['shop'] == "herbalist") {
                  keywords.add("herbalist");
                  prefix = "km4c";
                  category = "Herbalist_shop";
                } else if (linkData[0]['properties']['shop'] == "jewelry") {
                  keywords.add("jewelry");
                  prefix = "schema";
                  category = "JewelryStore";
                } else if (linkData[0]['properties']['shop'] == "outdoor") {
                  keywords.add("outdoor");
                  prefix = "lgdo";
                  category = "outdoor";
                } else if (linkData[0]['properties']['shop'] == "furniture") {
                  keywords.add("furniture");
                  prefix = "schema";
                  category = "FurnitureStore";
                } else if (linkData[0]['properties']['shop'] == "electronics") {
                  keywords.add("electronics");
                  prefix = "schema";
                  category = "ElectronicsStore";
                } else if (linkData[0]['properties']['shop'] == "gift") {
                  keywords.add("gift");
                  prefix = "lgdo";
                  category = "Gift";
                } else if (linkData[0]['properties']['shop'] == "alcohol") {
                  keywords.add("alcohol");
                  prefix = "schema";
                  category = "LiquorStore";
                } else if (linkData[0]['properties']['shop'] == "paint") {
                  keywords.add("paint");
                  prefix = "lgdo";
                  category = "Paint";
                } else if (linkData[0]['properties']['shop'] == "butcher") {
                  keywords.add("butcher");
                  keywords.add("meat");
                  prefix = "lgdo";
                  category = "Butcher";
                } else if (linkData[0]['properties']['shop'] == "bed") {
                  keywords.add("bed");
                  prefix = "schema";
                  category = "BedStore";
                } else if (linkData[0]['properties']['shop'] == "beauty") {
                  keywords.add("beauty");
                  prefix = "lgdo";
                  category = "BeautyShop";
                } else if (linkData[0]['properties']['shop'] == "cosmetics") {
                  keywords.add("cosmetics");
                  prefix = "lgdo";
                  category = "Cosmetics";
                } else if (linkData[0]['properties']['shop'] == "tailor") {
                  keywords.add("tailor");
                  prefix = "lgdo";
                  category = "Tailor";
                } else if (linkData[0]['properties']['shop'] == "fabric") {
                  keywords.add("fabric");
                  prefix = "lgdo";
                  category = "Fabric";
                } else if (linkData[0]['properties']['shop'] == "wholesale") {
                  keywords.add("wholesale");
                  prefix = "km4c";
                  category = "wholesale";
                } else if (linkData[0]['properties']['shop'] == "newsagent") {
                  keywords.add("newsagent");
                  prefix = "lgdo";
                  category = "Newsagent";
                } else if (linkData[0]['properties']['shop'] == "leather") {
                  keywords.add("leather");
                  prefix = "lgdo";
                  category = "Leather";
                } else if (linkData[0]['properties']['shop'] == "car_parts") {
                  keywords.add("parts");
                  keywords.add("car");
                  prefix = "schema";
                  category = "AutoPartsStore";
                } else if (linkData[0]['properties']['shop'] == "copyshop") {
                  keywords.add("copy");
                  prefix = "lgdo";
                  category = "Copyshop";
                } else if (linkData[0]['properties']['shop'] == "books") {
                  keywords.add("book");
                  prefix = "schema";
                  category = "BookStore";
                } else if (linkData[0]['properties']['shop'] == "charity") {
                  keywords.add("charity");
                  keywords.add("NGO");
                  prefix = "schema";
                  category = "NGO";
                } else if (linkData[0]['properties']['shop'] == "radiotechnics") {
                  keywords.add("radio");
                  keywords.add("technics");
                  prefix = "ex";
                  category = "RadioTechnics";
                } else if (linkData[0]['properties']['shop'] == "coffee") {
                  keywords.add("coffee");
                  prefix = "schema";
                  category = "CafeOrCoffeeShop";
                } else if (linkData[0]['properties']['shop'] == "textile_printing") {
                  keywords.add("textile");
                  keywords.add("printing");
                  prefix = "ex";
                  category = "TextilePrinting";
                } else if (linkData[0]['properties']['shop'] == "chemist") {
                  keywords.add("chemist");
                  keywords.add("chemistry");
                  prefix = "lgdo";
                  category = "chemist";
                } else if (linkData[0]['properties']['shop'] == "spices") {
                  keywords.add("spices");
                  prefix = "ex";
                  category = "Spices";
                } else if (linkData[0]['properties']['shop'] == "musical_instrument") {
                  keywords.add("instrument");
                  keywords.add("musical");
                  keywords.add("music");
                  prefix = "km4c";
                  category = "Musical_instruments_and_scores";
                } else if (linkData[0]['properties']['shop'] == "erotic") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "wine") {
                  keywords.add("wine");
                  prefix = "lgdo";
                  category = "Wine";
                } else if (linkData[0]['properties']['shop'] == "video") {
                  keywords.add("video");
                  prefix = "lgdo";
                  category = "Video";
                } else if (linkData[0]['properties']['shop'] == "mobile_phone") {
                  keywords.add("mobilephone");
                  keywords.add("phone");
                  keywords.add("mobile");
                  prefix = "lgdo";
                  category = "mobilePhone";
                } else if (linkData[0]['properties']['shop'] == "travel_agency") {
                  keywords.add("travel");
                  prefix = "schema";
                  category = "TravelAgency";
                } else if (linkData[0]['properties']['shop'] == "garden_centre") {
                  keywords.add("garden");
                  prefix = "lgdo";
                  category = "GardenCentre";
                } else if (linkData[0]['properties']['shop'] == "greengrocer") {
                  keywords.add("greengrocer");
                  prefix = "lgdo";
                  category = "Greengrocer";
                } else if (linkData[0]['properties']['shop'] == "skate") {
                  keywords.add("skate");
                  prefix = "ex";
                  category = "SkateShop";
                } else if (linkData[0]['properties']['shop'] == "sports") {
                  keywords.add("sport");
                  keywords.add("sports");
                  prefix = "lgdo";
                  category = "Sports";
                } else if (linkData[0]['properties']['shop'] == "carpet") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "optician") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "nuts") {
                  keywords.add("nut");
                  keywords.add("nuts");
                  prefix = "ex";
                  category = "NutsStore";
                } else if (linkData[0]['properties']['shop'] == "laundry") {
                  keywords.add("laundry");
                  prefix = "schema";
                  category = "DryCleaningOrLaundry";
                } else if (linkData[0]['properties']['shop'] == "doityourself") {
                  keywords.add("DIY");
                  prefix = "lgdo";
                  category = "Doityourself";
                } else if (linkData[0]['properties']['shop'] == "brass_instruments") {
                  keywords.add("brass");
                  keywords.add("instruments");
                  prefix = "schema";
                  category = "brass_instruments";
                } else if (linkData[0]['properties']['shop'] == "music") {
                  keywords.add("music");
                  prefix = "schema";
                  category = "MusicStore";
                } else if (linkData[0]['properties']['shop'] == "lottery") {
                  keywords.add("lottery");
                  keywords.add("luck");
                  prefix = "ex";
                  category = "Lottery";
                } else if (linkData[0]['properties']['shop'] == "bathroom_furnishing") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "locksmith") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "general") {
                  keywords.add("general");
                  prefix = "lgdo";
                  category = "General";
                } else if (linkData[0]['properties']['shop'] == "funeral_directors") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "houseware") {
                  keywords.add("houseware");
                  keywords.add("housewares");
                  keywords.add("house");
                  prefix = "lgdo";
                  category = "housewares";
                } else if (linkData[0]['properties']['shop'] == "kitchen") {
                  keywords.add("kitchen");
                  prefix = "lgdo";
                  category = "KitchenShop";
                } else if (linkData[0]['properties']['shop'] == "wine; books") {
                  keywords.add("wine");
                  keywords.add("book");
                  prefix = "lgdo";
                  category = "BookShop";
                } else if (linkData[0]['properties']['shop'] == "fashion") {
                  keywords.add("fashion");
                  prefix = "lgdo";
                  category = "Fashion";
                } else if (linkData[0]['properties']['shop'] == "e-cigarette") {
                  keywords.add("cigarette");
                  prefix = "ex";
                  category = "E-cigarette;";
                } else if (linkData[0]['properties']['shop'] == "yes") {
                  prefix = "schema";
                  category = "Store";
                } else {
                  prefix = "schema";
                  category = "Store";
                }
                //TOURISM
              } else if (linkData[0]['properties']['tourism']) {
                if (linkData[0]['properties']['tourism'] == "hotel") {
                  keywords.add("hotel");
                  prefix = "schema";
                  category = "Hotel";
                } else if (linkData[0]['properties']['tourism'] == "museum") {
                  keywords.add("museum");
                  prefix = "schema";
                  category = "Museum";
                } else if (linkData[0]['properties']['tourism'] == "hostel") {
                  keywords.add("hostel");
                  prefix = "schema";
                  category = "hostel";
                } else if (linkData[0]['properties']['tourism'] == "gallery") {
                  keywords.add("gallery");
                  prefix = "schema";
                  category = "gallery";
                } else if (linkData[0]['properties']['tourism'] == "attraction") {
                  keywords.add("attraction");
                  prefix = "schema";
                  category = "TouristAttraction";
                } else if (linkData[0]['properties']['tourism'] == "artwork") {
                  keywords.add("artwork");
                  keywords.add("art");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "VisualArtwork";
                } else if (linkData[0]['properties']['tourism'] == "guest_house") {
                  keywords.add("guesthouse");
                  keywords.add("guest");
                  keywords.add("house");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "Accommodation";
                } else if (linkData[0]['properties']['tourism'] == "apartment") {
                  keywords.add("apartment");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "Apartment";
                } else if (linkData[0]['properties']['tourism'] == "information") {
                  keywords.add("information");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "TouristInformationCenter";
                } else if (linkData[0]['properties']['tourism'] == "viewpoint") {
                  keywords.add("viewpoint");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "viewpoint";
                } else {
                  prefix = "schema";
                  category = "TouristDestination";

                }

                //leisure
              } else if (linkData[0]['properties']['leisure']) {
                if (linkData[0]['properties']['leisure'] == "picnic_table") {
                  keywords.add("picnic");
                  keywords.add("table");
                  prefix = "schema";
                  category = "Place";
                } else if (linkData[0]['properties']['leisure'] == "playground") {
                  keywords.add("playground");
                  prefix = "schema";
                  category = "Playground";
                } else if (linkData[0]['properties']['leisure'] == "fitness_centre") {
                  keywords.add("fitness");
                  keywords.add("gym");
                  prefix = "lgdo";
                  category = "Gym";
                } else if (linkData[0]['properties']['leisure'] == "sports_centre") {
                  keywords.add("sport");
                  keywords.add("sports");
                  prefix = "lgdo";
                  category = "SportsCentre";
                } else if (linkData[0]['properties']['leisure'] == "hackerspace") {
                  keywords.add("hackerspace");
                  keywords.add("hacker");
                  keywords.add("hack");
                  prefix = "lgdo";
                  category = "Hackerspace";
                } else if (linkData[0]['properties']['leisure'] == "dance") {
                  keywords.add("dance");
                  keywords.add("dancing");
                  prefix = "lgdo";
                  category = "Dance";
                } else if (linkData[0]['properties']['leisure'] == "garden") {
                  keywords.add("garden");
                  prefix = "lgdo";
                  category = "GardenCentre";
                } else if (linkData[0]['properties']['leisure'] == "amusement_arcade") {
                  keywords.add("arcade");
                  prefix = "schema";
                  category = "AmusementPark";
                } else if (linkData[0]['properties']['leisure'] == "escape_game") {
                  keywords.add("escape");
                  keywords.add("game");
                  prefix = "ex";
                  category = "EscapeGame";
                } else if (linkData[0]['properties']['leisure'] == "pitch") {
                  keywords.add("pitch");
                  prefix = "lgdo";
                  category = "Pitch";
                } else if (linkData[0]['properties']['leisure'] == "sports_hall") {
                  keywords.add("sportshall");
                  prefix = "ex";
                  category = "SportsHall";
                } else if (linkData[0]['properties']['leisure'] == "sauna") {
                  keywords.add("sauna");
                  prefix = "lgdo";
                  category = "Sauna";
                } else if (linkData[0]['properties']['leisure'] == "marina") {
                  keywords.add("marina");
                  keywords.add("boatyard");
                  keywords.add("port");
                  keywords.add("harbor");
                  prefix = "lgdo";
                  category = "Marina";
                } else if (linkData[0]['properties']['leisure'] == "swimming_pool") {
                  keywords.add("swimming");
                  keywords.add("pool");
                  prefix = "lgdo";
                  category = "SwimmingPool";
                } else if (linkData[0]['properties']['leisure'] == "fitness_station") {
                  keywords.add("fitness");
                  keywords.add("gym");
                  prefix = "ex";
                  category = "FitnessStation";
                } else if (linkData[0]['properties']['leisure'] == "park") {
                  keywords.add("park");
                  prefix = "schema";
                  category = "Park";
                } else if (linkData[0]['properties']['leisure'] == "track") {
                  keywords.add("track");
                  prefix = "lgdo";
                  category = "Track";
                } else if (linkData[0]['properties']['leisure'] == "dog_park") {
                  keywords.add("dog");
                  prefix = "lgdo";
                  category = "DogPark";
                } else if (linkData[0]['properties']['leisure'] == "outdoor_seating") {
                  keywords.add("outdoor");
                  keywords.add("seating");
                  prefix = "ex";
                  category = "OutdoorSeating";
                } else if (linkData[0]['properties']['leisure'] == "slipway") {
                  keywords.add("slipway");
                  prefix = "lgdo";
                  category = "Slipway";
                } else if (linkData[0]['properties']['leisure'] == "bandstand") {
                  keywords.add("bandstand");
                  prefix = "lgdo";
                  category = "Bandstand";
                } else if (linkData[0]['properties']['leisure'] == "bleachers") {
                  keywords.add("bleachers");
                  prefix = "ex";
                  category = "Bleachers";
                } else if (linkData[0]['properties']['leisure'] == "nature_reserve") {
                  keywords.add("nature");
                  keywords.add("reserve");
                  prefix = "lgdo";
                  category = "NatureReserve";
                } else {
                  prefix = "schema";
                  category = "Place";
                  console.log(linkData[0]['properties']);
                }
                //HISTORIC
              } else if (linkData[0]['properties']['historic']) {
                if (linkData[0]['properties']['historic'] == "building") {
                  keywords.add("building");
                  prefix = "lgdo";
                  category = "Building";
                } else if (linkData[0]['properties']['historic'] == "memorial") {
                  keywords.add("memorial");
                  prefix = "lgdo";
                  category = "Memorial";
                } else if (linkData[0]['properties']['historic'] == "ruins") {
                  keywords.add("ruins");
                  keywords.add("ruin");
                  prefix = "lgdo";
                  category = "Ruins";
                } else if (linkData[0]['properties']['historic'] == "wayside_cross") {
                  keywords.add("cross");
                  keywords.add("wayside");
                  prefix = "ex";
                  category = "WaysideCross";
                } else if (linkData[0]['properties']['historic'] == "wayside_shrine") {
                  keywords.add("shrine");
                  prefix = "dbp";
                  category = "Shrine";
                } else if (linkData[0]['properties']['historic'] == "heritage_building") {
                  keywords.add("heritage");
                  keywords.add("building");
                  prefix = "ex";
                  category = "HeritageBuilding";
                } else if (linkData[0]['properties']['historic'] == "fort") {
                  keywords.add("fort");
                  prefix = "lgdo";
                  category = "Fort";
                } else if (linkData[0]['properties']['historic'] == "school") {
                  keywords.add("school");
                  prefix = "schema";
                  category = "School";
                } else if (linkData[0]['properties']['historic'] == "archaeological_site") {
                  keywords.add("archaeological");
                  keywords.add("archeology");
                  prefix = "lgdo";
                  category = "ArchaeologicalSite";
                } else if (linkData[0]['properties']['historic'] == "monument") {
                  keywords.add("monument");
                  prefix = "lgdo";
                  category = "Monument";
                } else if (linkData[0]['properties']['historic'] == "industrial") {
                  keywords.add("industrial");
                  prefix = "lgdo";
                  category = "IndustrialProductionBuilding";
                } else if (linkData[0]['properties']['historic'] == "monastery") {
                  keywords.add("monastery");
                  prefix = "lgdo";
                  category = "Monastery";
                } else if (linkData[0]['properties']['historic'] == "house") {
                  keywords.add("house");
                  prefix = "schema";
                  category = "House";
                } else if (linkData[0]['properties']['historic'] == "bridge") {
                  keywords.add("bridge");
                  prefix = "schema";
                  category = "Bridge";
                } else if (linkData[0]['properties']['historic'] == "chapel") {
                  keywords.add("chapel");
                  prefix = "lgdo";
                  category = "Chapel";
                } else if (linkData[0]['properties']['historic'] == "hospital") {
                  keywords.add("hospital");
                  prefix = "schema";
                  category = "Hospital";
                } else if (linkData[0]['properties']['historic'] == "church") {
                  keywords.add("church");
                  prefix = "schema";
                  category = "Church";
                } else if (linkData[0]['properties']['historic'] == "tower") {
                  keywords.add("tower");
                  prefix = "lgdo";
                  category = "Tower";
                } else if (linkData[0]['properties']['historic'] == "castle_wall") {
                  keywords.add("castle");
                  keywords.add("wall");
                  prefix = "ex";
                  category = "CastleWall";
                } else if (linkData[0]['properties']['historic'] == "castle") {
                  keywords.add("castle");
                  prefix = "lgdo";
                  category = "Castle";
                } else if (linkData[0]['properties']['historic'] == "prison") {
                  keywords.add("prison");
                  prefix = "lgdo";
                  category = "Prison";
                } else if (linkData[0]['properties']['historic'] == "city_gate") {
                  keywords.add("gate");
                  keywords.add("city");
                  prefix = "lgdo";
                  category = "Prison";
                } else if (linkData[0]['properties']['historic'] == "bank") {
                  keywords.add("bank");
                  prefix = "lgdo";
                  category = "Bank";
                } else if (linkData[0]['properties']['historic'] == "cinema") {
                  keywords.add("cinema");
                  prefix = "lgdo";
                  category = "Cinema";
                } else if (linkData[0]['properties']['historic'] == "water_gate") {
                  keywords.add("water");
                  keywords.add("gate");
                  prefix = "ex";
                  category = "WaterGate";
                } else if (linkData[0]['properties']['historic'] == "warehouse") {
                  keywords.add("warehouse");
                  prefix = "ex";
                  category = "Warehouse";
                } else if (linkData[0]['properties']['historic'] == "yes") {
                  prefix = "schema";
                  category = "Place";
                } else {
                  prefix = "schema";
                  category = "Place";
                  console.log(linkData[0]['properties']);
                }
                //MEMORIAL
              } else if (linkData[0]['properties']['memorial']) {
                if (linkData[0]['properties']['memorial'] == "plaque") {
                  keywords.add("plaque");
                  prefix = "ex";
                  category = "Plaque";
                } else if (linkData[0]['properties']['memorial'] == "playground") {
                  keywords.add("playground");
                  prefix = "schema";
                  category = "Playground";
                } else {
                  prefix = "schema";
                  category = "Place";
                  console.log(linkData[0]['properties']);
                }
                //sport
              } else if (linkData[0]['properties']['sport']) {
                if (linkData[0]['properties']['sport'] == "jogging") {
                  keywords.add("jogging");
                  prefix = "ex";
                  category = "Jogging";
                } else if (linkData[0]['properties']['sport'] == "climbing") {
                  keywords.add("climbing");
                  prefix = "km4c";
                  category = "Climbing";
                } else {
                  prefix = "schema";
                  category = "Place";
                  console.log(linkData[0]['properties']);
                }
              }
              //ANDEREN!
              else {
                printPlace = false;
                //prefix = "schema";
                category = "Place";
                //console.log(linkData[0]['properties']);
              }
              if (relevant && printPlace) {
                turtleOutput += `${tripleIdentifier} a ${prefix}:${category} ;\n`;
                if (linkData[0]['properties']['name']) {
                  turtleOutput += `\tschema:name "${linkData[0]['properties']['name']}" ; \n`;
                }
                else {
                  if (linkData[0]['properties']["addr:street"]) {
                    turtleOutput += `\tschema:name "${category} in ${linkData[0]['properties']["addr:street"]}" ; \n`;
                  } else {
                    turtleOutput += `\tschema:name "${category}" ; \n`;
                  }
                }

                if (linkData[0]['properties']['name:nl'] && linkData[0]['properties']['name:nl'] != linkData[0]['properties']['name']) turtleOutput += `\tschema:name "${linkData[0]['properties']['name:nl']}"; \n`;
                if (linkData[0]['properties']['website']) turtleOutput += `\tschema:url "${linkData[0]['properties']['website']}"; \n`;
                if (linkData[0]['properties']['phone']) turtleOutput += `\tschema:telephone "${linkData[0]['properties']['phone']}"; \n`;
                if (linkData[0]['properties']['alt_name']) turtleOutput += `\tschema:alternateName "${linkData[0]['properties']['alt_name']}"; \n`;
                if (linkData[0]['properties']['amenity']) turtleOutput += `\tschema:amenityFeature "${linkData[0]['properties']['amenity']}"; \n`;
                if (linkData[0]['properties']['wikidata']) turtleOutput += `\tschema:sameAs "https://www.wikidata.org/entity/${linkData[0]['properties']['wikidata']}" ; \n`;
                if (linkData[0]['properties']["addr:street"]) {
                  turtleOutput += `\tschema:PostalAddress [\n\t\ta schema:PostalAddress ;\n\t\tschema:streetAddress "${linkData[0]['properties']["addr:street"]}"; \n`;
                  if (linkData[0]['properties']["addr:housenumber"]) turtleOutput += `\t\tschema:postOfficeBoxNumber "${linkData[0]['properties']["addr:housenumber"]}"; \n`;
                  if (linkData[0]['properties']["addr:postcode"]) turtleOutput += `\t\tschema:postalCode "${linkData[0]['properties']["addr:postcode"]}"; \n`;
                  if (linkData[0]['properties']["addr:city"]) turtleOutput += `\t\tschema:addressLocality "${linkData[0]['properties']["addr:city"]}"; \n`;
                  if (linkData[0]['properties']["addr:country"]) turtleOutput += `\t\tschema:addressCountry "${linkData[0]['properties']["addr:country"]}"; \n`;
                  turtleOutput += `\t] ; \n`;
                }
                if (linkData[0]['properties']['cuisine']) {
                  if (linkData[0]['properties']['cuisine'].toString().includes(';')) {
                    for (let item of linkData[0]['properties']['cuisine'].split(';')) {
                      turtleOutput += `\tschema:servesCuisine "${item}"; \n`;
                      keywords.add(item);
                    }
                  } else if (linkData[0]['properties']['cuisine'].toString().includes(',')) {
                    for (let item of linkData[0]['properties']['cuisine'].split(',')) {
                      turtleOutput += `\tschema:servesCuisine "${item}"; \n`;
                      keywords.add(item);
                    }
                  }

                }
                turtleOutput += `\tschema:keyword ('${Array.from(keywords).toString().replaceAll(",", "' '")}') ; \n`;
                if (linkData[0]['geometry']['type'] == "Point") {
                  turtleOutput += `\tschema:geo [
                  \ta geo:Point ;
                  \tgeo:lat "${linkData[0]['geometry']['coordinates'][0]}";
                  \tgeo:long "${linkData[0]['geometry']['coordinates'][1]}";
                  ] .\n`;
                } else if (linkData[0]['geometry']['type'] == "Polygon") {
                  turtleOutput += `\tschema:geo [
                  \ta geo:Point;
                  \tgeo:lat "${linkData[0]['geometry']['coordinates'][0][0][0]}";
                  \tgeo:long "${linkData[0]['geometry']['coordinates'][0][0][1]}";
                  ] .\n`;

                } else if (linkData[0]['geometry']['type'] == "LineString") {
                  turtleOutput += `\tschema:geo [
                  \ta geo:Point;
                  \tgeo:lat "${linkData[0]['geometry']['coordinates'][0][0]}";
                  \tgeo:long "${linkData[0]['geometry']['coordinates'][0][1]}";
                  ] .\n`;
                } else if (linkData[0]['geometry']['type'] == "MultiPolygon") {
                  turtleOutput += `\tschema:geo [
                  \ta geo:Point;
                  \tgeo:lat "${linkData[0]['geometry']['coordinates'][0][0][0][0]}";
                  \tgeo:long "${linkData[0]['geometry']['coordinates'][0][0][0][1]}";
                  ] .\n`;
                }
              }
              keywords.forEach(t => this.allKeywords.add(t));
              linkData.splice(0, 1);
            }
            return turtleOutput;
          }
        )
      );
  }

}