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
              let keywords = [];
              let relevant = true;
              let prefix = "";
              let category = "";
              if (linkData[0]['properties']['amenity']) {
                if (linkData[0]['properties']['amenity'] == "restaurant") {
                  keywords.push("restaurant");
                  prefix = "schema";
                  category = "Restaurant";
                } else if (linkData[0]['properties']['amenity'] == "fast_food") {
                  keywords.push("fastfood");
                  prefix = "schema";
                  category = "FastFoodRestaurant";
                } else if (linkData[0]['properties']['amenity'] == "cafe") {
                  keywords.push("cafe");
                  prefix = "schema";
                  category = "CafeOrCoffeeShop";
                } else if (linkData[0]['properties']['amenity'] == "bar") {
                  keywords.push("bar");
                  prefix = "schema";
                  category = "BarOrPub";
                } else if (linkData[0]['properties']['amenity'] == "pub") {
                  keywords.push("pub");
                  prefix = "schema";
                  category = "BarOrPub";
                } else if (linkData[0]['properties']['amenity'] == "ice_cream") {
                  keywords.push("icecream");
                  prefix = "schema";
                  category = "IceCreamShop";
                } else if (linkData[0]['properties']['amenity'] == "school") {
                  keywords.push("school");
                  prefix = "schema";
                  category = "School";
                } else if (linkData[0]['properties']['amenity'] == "townhall") {
                  keywords.push("townhall");
                  prefix = "lgdo";
                  category = "TownHall";
                } else if (linkData[0]['properties']['amenity'] == "nightclub") {
                  keywords.push("nightclub");
                  prefix = "schema";
                  category = "NightClub";
                } else if (linkData[0]['properties']['amenity'] == "theatre") {
                  keywords.push("theater");
                  prefix = "dbp";
                  category = "Theatre";
                } else if (linkData[0]['properties']['amenity'] == "events_venue") {
                  keywords.push("event");
                  keywords.push("venue");
                  prefix = "schema";
                  category = "EventVenue";
                } else if (linkData[0]['properties']['amenity'] == "community_centre") {
                  keywords.push("community");
                  prefix = "km4c";
                  category = "Community_centre";
                } else if (linkData[0]['properties']['amenity'] == "food_court") {
                  keywords.push("foodcourt");
                  prefix = "ex";
                  category = "FootCourt";
                } else if (linkData[0]['properties']['amenity'] == "studio") {
                  keywords.push("studio");
                  prefix = "lgdo";
                  category = "Studio";
                } else if (linkData[0]['properties']['amenity'] == "cinema") {
                  keywords.push("cinema");
                  prefix = "schema";
                  category = "MovieTheater";
                } else if (linkData[0]['properties']['amenity'] == "fountain") {
                  keywords.push("fountain");
                  prefix = "lgdo";
                  category = "Fountain";
                } else if (linkData[0]['properties']['amenity'] == "public_bookcase") {
                  keywords.push("public");
                  keywords.push("bookcase");
                  prefix = "ex";
                  category = "public_bookcase";
                } else if (linkData[0]['properties']['amenity'] == "social_centre") {
                  keywords.push("social");
                  prefix = "lgdo";
                  category = "SocialCentre";
                } else if (linkData[0]['properties']['amenity'] == "place_of_worship") {
                  keywords.push("worship");
                  prefix = "schema";
                  category = "PlaceOfWorship";
                } else if (linkData[0]['properties']['amenity'] == "arts_centre") {
                  keywords.push("arts");
                  keywords.push("center");
                  prefix = "lgdo";
                  category = "ArtsCentre";
                } else if (linkData[0]['properties']['amenity'] == "parking") {
                  keywords.push("parking");
                  prefix = "lgdo";
                  category = "Parking";
                } else if (linkData[0]['properties']['amenity'] == "parking_entrance") {
                  keywords.push("parking");
                  prefix = "lgdo";
                  category = "ParkingEntrance";
                } else if (linkData[0]['properties']['amenity'] == "bicycle_parking") {
                  keywords.push("bicycle");
                  keywords.push("parking");
                  prefix = "lgdo";
                  category = "BicycleParking";
                } else if (linkData[0]['properties']['amenity'] == "bicycle_rental") {
                  keywords.push("bicycle");
                  keywords.push("rental");
                  prefix = "lgdo";
                  category = "BicycleRental";
                } else if (linkData[0]['properties']['amenity'] == "university") {
                  keywords.push("university");
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
                  keywords.push("bicycle");
                  prefix = "schema";
                  category = "BikeStore";
                } else if (linkData[0]['properties']['shop'] == "bakery") {
                  keywords.push("bakery");
                  prefix = "schema";
                  category = "Bakery";
                } else if (linkData[0]['properties']['shop'] == "convenience") {
                  keywords.push("convenience");
                  prefix = "schema";
                  category = "ConvenienceStore";
                } else if (linkData[0]['properties']['shop'] == "deli") {
                  keywords.push("deli");
                  prefix = "schema";
                  category = "HomeGoodsStore";
                } else if (linkData[0]['properties']['shop'] == "tattoo") {
                  keywords.push("tattoo");
                  prefix = "lgdo";
                  category = "TattooShop";
                } else if (linkData[0]['properties']['shop'] == "hairdresser") {
                  keywords.push("hairdresser");
                  prefix = "schema";
                  category = "HairSalon";
                } else if (linkData[0]['properties']['shop'] == "medical_supply") {
                  keywords.push("medical");
                  keywords.push("supply");
                  prefix = "schema";
                  category = "medical_supply";
                } else if (linkData[0]['properties']['shop'] == "antiques") {
                  keywords.push("antiques");
                  prefix = "km4c";
                  category = "Antiques";
                } else if (linkData[0]['properties']['shop'] == "window_blind") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "second_hand") {
                  keywords.push("secondhand");
                  prefix = "km4c";
                  category = "Second_hand_goods";
                } else if (linkData[0]['properties']['shop'] == "telecommunication") {
                  keywords.push("telecommunication");
                  prefix = "km4c";
                  category = "Telecommunication";
                } else if (linkData[0]['properties']['shop'] == "motorcycle") {
                  keywords.push("motorcycle");
                  prefix = "lgdo";
                  category = "motorcycle";
                } else if (linkData[0]['properties']['shop'] == "pet") {
                  keywords.push("pet");
                  prefix = "schema";
                  category = "PetStore";
                } else if (linkData[0]['properties']['shop'] == "car_repair") {
                  keywords.push("car");
                  keywords.push("repair");
                  prefix = "schema";
                  category = "AutoRepair";
                } else if (linkData[0]['properties']['shop'] == "hifi") {
                  keywords.push("hifi");
                  prefix = "schema";
                  category = "ElectronicsStore";
                } else if (linkData[0]['properties']['shop'] == "massage") {
                  keywords.push("massage");
                  prefix = "schema";
                  category = "DaySpa";
                } else if (linkData[0]['properties']['shop'] == "beverages") {
                  keywords.push("beverages");
                  prefix = "schema";
                  category = "LiquorStore";
                } else if (linkData[0]['properties']['shop'] == "appliance") {
                  keywords.push("appliance");
                  prefix = "schema";
                  category = "ElectronicsStore";
                } else if (linkData[0]['properties']['shop'] == "photo") {
                  keywords.push("photo");
                  prefix = "schema";
                  category = "Photograph";
                } else if (linkData[0]['properties']['shop'] == "bag") {
                  keywords.push("bag");
                  prefix = "lgdo";
                  category = "bagsShop";
                } else if (linkData[0]['properties']['shop'] == "party") {
                  keywords.push("party");
                  prefix = "ex";
                  category = "partyStore";
                } else if (linkData[0]['properties']['shop'] == "seafood") {
                  keywords.push("seafood");
                  keywords.push("fish");
                  prefix = "km4c";
                  category = "Fish_and_seafood";
                } else if (linkData[0]['properties']['shop'] == "craft") {
                  keywords.push("craft");
                  prefix = "lgdo";
                  category = "craft";
                } else if (linkData[0]['properties']['shop'] == "kiosk") {
                  keywords.push("kiosk");
                  prefix = "lgdo";
                  category = "kiosk";
                } else if (linkData[0]['properties']['shop'] == "video_games") {
                  keywords.push("videogames");
                  prefix = "lgdo";
                  category = "videoGames";
                } else if (linkData[0]['properties']['shop'] == "toys") {
                  keywords.push("toys");
                  prefix = "schema";
                  category = "ToyStore";
                } else if (linkData[0]['properties']['shop'] == "mall") {
                  keywords.push("mall");
                  prefix = "schema";
                  category = "ShoppingCenter";
                } else if (linkData[0]['properties']['shop'] == "ticket") {
                  keywords.push("ticket");
                  prefix = "lgdo";
                  category = "Ticket";
                } else if (linkData[0]['properties']['shop'] == "juice") {
                  keywords.push("juice");
                  prefix = "ex";
                  category = "JuiceStore";
                } else if (linkData[0]['properties']['shop'] == "perfumery") {
                  keywords.push("perfumery");
                  prefix = "km4c";
                  category = "Perfumery_and_cosmetic_articles";
                } else if (linkData[0]['properties']['shop'] == "computer") {
                  keywords.push("computer");
                  prefix = "schema";
                  category = "ComputerStore";
                } else if (linkData[0]['properties']['shop'] == "hearing_aids") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "interior_decoration") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "bookmaker") {
                  keywords.push("bookmaker");
                  prefix = "lgdo";
                  category = "BookmakerShop";
                } else if (linkData[0]['properties']['shop'] == "hardware") {
                  keywords.push("hardware");
                  prefix = "schema";
                  category = "HardwareStore";
                } else if (linkData[0]['properties']['shop'] == "florist") {
                  keywords.push("florist");
                  keywords.push("flower");
                  prefix = "schema";
                  category = "Florist";
                } else if (linkData[0]['properties']['shop'] == "art") {
                  keywords.push("art");
                  prefix = "schema";
                  category = "VisualArtwork";
                } else if (linkData[0]['properties']['shop'] == "baby_goods") {
                  keywords.push("baby");
                  prefix = "schema";
                  category = "ChildCare";
                } else if (linkData[0]['properties']['shop'] == "games") {
                  keywords.push("games");
                  prefix = "schema";
                  category = "games";
                } else if (linkData[0]['properties']['shop'] == "car") {
                  keywords.push("car");
                  prefix = "lgdo";
                  category = "CarShop";
                } else if (linkData[0]['properties']['shop'] == "variety_store") {
                  keywords.push("variety");
                  prefix = "lgdo";
                  category = "variety";
                } else if (linkData[0]['properties']['shop'] == "department_store") {
                  keywords.push("department");
                  prefix = "lgdo";
                  category = "DepartmentStore";
                } else if (linkData[0]['properties']['shop'] == "confectionery") {
                  keywords.push("confectionery");
                  prefix = "lgdo";
                  category = "Confectionery";
                } else if (linkData[0]['properties']['shop'] == "pastry") {
                  keywords.push("pastry");
                  prefix = "km4c";
                  category = "Pastry_shop";
                } else if (linkData[0]['properties']['shop'] == "stationery") {
                  keywords.push("stationery");
                  prefix = "km4c";
                  category = "Newspapers_and_stationery";
                } else if (linkData[0]['properties']['shop'] == "clothes") {
                  keywords.push("clothes");
                  prefix = "lgdo";
                  category = "Clothes";
                } else if (linkData[0]['properties']['shop'] == "shoes") {
                  keywords.push("shoes");
                  prefix = "lgdo";
                  category = "Shoes";
                } else if (linkData[0]['properties']['shop'] == "health_food") {
                  keywords.push("food");
                  keywords.push("healthy");
                  keywords.push("health");
                  prefix = "lgdo";
                  category = "HealthFood";
                } else if (linkData[0]['properties']['shop'] == "supermarket") {
                  keywords.push("supermarket");
                  prefix = "km4c";
                  category = "Supermarket";
                } else if (linkData[0]['properties']['shop'] == "chocolate") {
                  keywords.push("chocolate");
                  prefix = "lgdo";
                  category = "Chocolate";
                } else if (linkData[0]['properties']['shop'] == "fashion_accessories") {
                  keywords.push("fashion");
                  keywords.push("accessories");
                  prefix = "ex";
                  category = "fashionAccessories";
                } else if (linkData[0]['properties']['shop'] == "herbalist") {
                  keywords.push("herbalist");
                  prefix = "km4c";
                  category = "Herbalist_shop";
                } else if (linkData[0]['properties']['shop'] == "jewelry") {
                  keywords.push("jewelry");
                  prefix = "schema";
                  category = "JewelryStore";
                } else if (linkData[0]['properties']['shop'] == "outdoor") {
                  keywords.push("outdoor");
                  prefix = "lgdo";
                  category = "outdoor";
                } else if (linkData[0]['properties']['shop'] == "furniture") {
                  keywords.push("furniture");
                  prefix = "schema";
                  category = "FurnitureStore";
                } else if (linkData[0]['properties']['shop'] == "electronics") {
                  keywords.push("electronics");
                  prefix = "schema";
                  category = "ElectronicsStore";
                } else if (linkData[0]['properties']['shop'] == "gift") {
                  keywords.push("gift");
                  prefix = "lgdo";
                  category = "Gift";
                } else if (linkData[0]['properties']['shop'] == "alcohol") {
                  keywords.push("alcohol");
                  prefix = "schema";
                  category = "LiquorStore";
                } else if (linkData[0]['properties']['shop'] == "paint") {
                  keywords.push("paint");
                  prefix = "lgdo";
                  category = "Paint";
                } else if (linkData[0]['properties']['shop'] == "butcher") {
                  keywords.push("butcher");
                  keywords.push("meat");
                  prefix = "lgdo";
                  category = "Butcher";
                } else if (linkData[0]['properties']['shop'] == "bed") {
                  keywords.push("bed");
                  prefix = "schema";
                  category = "BedStore";
                } else if (linkData[0]['properties']['shop'] == "beauty") {
                  keywords.push("beauty");
                  prefix = "lgdo";
                  category = "BeautyShop";
                } else if (linkData[0]['properties']['shop'] == "cosmetics") {
                  keywords.push("cosmetics");
                  prefix = "lgdo";
                  category = "Cosmetics";
                } else if (linkData[0]['properties']['shop'] == "tailor") {
                  keywords.push("tailor");
                  prefix = "lgdo";
                  category = "Tailor";
                } else if (linkData[0]['properties']['shop'] == "fabric") {
                  keywords.push("fabric");
                  prefix = "lgdo";
                  category = "Fabric";
                } else if (linkData[0]['properties']['shop'] == "wholesale") {
                  keywords.push("wholesale");
                  prefix = "km4c";
                  category = "wholesale";
                } else if (linkData[0]['properties']['shop'] == "newsagent") {
                  keywords.push("newsagent");
                  prefix = "lgdo";
                  category = "Newsagent";
                } else if (linkData[0]['properties']['shop'] == "leather") {
                  keywords.push("leather");
                  prefix = "lgdo";
                  category = "Leather";
                } else if (linkData[0]['properties']['shop'] == "car_parts") {
                  keywords.push("parts");
                  keywords.push("car");
                  prefix = "schema";
                  category = "AutoPartsStore";
                } else if (linkData[0]['properties']['shop'] == "copyshop") {
                  keywords.push("copy");
                  prefix = "lgdo";
                  category = "Copyshop";
                } else if (linkData[0]['properties']['shop'] == "books") {
                  keywords.push("book");
                  prefix = "schema";
                  category = "BookStore";
                } else if (linkData[0]['properties']['shop'] == "charity") {
                  keywords.push("charity");
                  keywords.push("NGO");
                  prefix = "schema";
                  category = "NGO";
                } else if (linkData[0]['properties']['shop'] == "radiotechnics") {
                  keywords.push("radio");
                  keywords.push("technics");
                  prefix = "ex";
                  category = "RadioTechnics";
                } else if (linkData[0]['properties']['shop'] == "coffee") {
                  keywords.push("coffee");
                  prefix = "schema";
                  category = "CafeOrCoffeeShop";
                } else if (linkData[0]['properties']['shop'] == "textile_printing") {
                  keywords.push("textile");
                  keywords.push("printing");
                  prefix = "ex";
                  category = "TextilePrinting";
                } else if (linkData[0]['properties']['shop'] == "chemist") {
                  keywords.push("chemist");
                  keywords.push("chemistry");
                  prefix = "lgdo";
                  category = "chemist";
                } else if (linkData[0]['properties']['shop'] == "spices") {
                  keywords.push("spices");
                  prefix = "ex";
                  category = "Spices";
                } else if (linkData[0]['properties']['shop'] == "musical_instrument") {
                  keywords.push("instrument");
                  keywords.push("musical");
                  keywords.push("music");
                  prefix = "km4c";
                  category = "Musical_instruments_and_scores";
                } else if (linkData[0]['properties']['shop'] == "erotic") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "wine") {
                  keywords.push("wine");
                  prefix = "lgdo";
                  category = "Wine";
                } else if (linkData[0]['properties']['shop'] == "video") {
                  keywords.push("video");
                  prefix = "lgdo";
                  category = "Video";
                } else if (linkData[0]['properties']['shop'] == "mobile_phone") {
                  keywords.push("mobilephone");
                  keywords.push("phone");
                  keywords.push("mobile");
                  prefix = "lgdo";
                  category = "mobilePhone";
                } else if (linkData[0]['properties']['shop'] == "travel_agency") {
                  keywords.push("travel");
                  prefix = "schema";
                  category = "TravelAgency";
                } else if (linkData[0]['properties']['shop'] == "garden_centre") {
                  keywords.push("garden");
                  prefix = "lgdo";
                  category = "GardenCentre";
                } else if (linkData[0]['properties']['shop'] == "greengrocer") {
                  keywords.push("greengrocer");
                  prefix = "lgdo";
                  category = "Greengrocer";
                } else if (linkData[0]['properties']['shop'] == "skate") {
                  keywords.push("skate");
                  prefix = "ex";
                  category = "SkateShop";
                } else if (linkData[0]['properties']['shop'] == "sports") {
                  keywords.push("sport");
                  keywords.push("sports");
                  prefix = "lgdo";
                  category = "Sports";
                } else if (linkData[0]['properties']['shop'] == "carpet") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "optician") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "nuts") {
                  keywords.push("nut");
                  keywords.push("nuts");
                  prefix = "ex";
                  category = "NutsStore";
                } else if (linkData[0]['properties']['shop'] == "laundry") {
                  keywords.push("laundry");
                  prefix = "schema";
                  category = "DryCleaningOrLaundry";
                } else if (linkData[0]['properties']['shop'] == "doityourself") {
                  keywords.push("DIY");
                  prefix = "lgdo";
                  category = "Doityourself";
                } else if (linkData[0]['properties']['shop'] == "brass_instruments") {
                  keywords.push("brass");
                  keywords.push("instruments");
                  prefix = "schema";
                  category = "brass_instruments";
                } else if (linkData[0]['properties']['shop'] == "music") {
                  keywords.push("music");
                  prefix = "schema";
                  category = "MusicStore";
                } else if (linkData[0]['properties']['shop'] == "lottery") {
                  keywords.push("lottery");
                  keywords.push("luck");
                  prefix = "ex";
                  category = "Lottery";
                } else if (linkData[0]['properties']['shop'] == "bathroom_furnishing") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "locksmith") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "general") {
                  keywords.push("general");
                  prefix = "lgdo";
                  category = "General";
                } else if (linkData[0]['properties']['shop'] == "funeral_directors") {
                  // Niet relevant
                  relevant = false;
                } else if (linkData[0]['properties']['shop'] == "houseware") {
                  keywords.push("houseware");
                  keywords.push("housewares");
                  keywords.push("house");
                  prefix = "lgdo";
                  category = "housewares";
                } else if (linkData[0]['properties']['shop'] == "kitchen") {
                  keywords.push("kitchen");
                  prefix = "lgdo";
                  category = "KitchenShop";
                } else if (linkData[0]['properties']['shop'] == "wine; books") {
                  keywords.push("wine");
                  keywords.push("book");
                  prefix = "lgdo";
                  category = "BookShop";
                } else if (linkData[0]['properties']['shop'] == "fashion") {
                  keywords.push("fashion");
                  prefix = "lgdo";
                  category = "Fashion";
                } else if (linkData[0]['properties']['shop'] == "e-cigarette") {
                  keywords.push("cigarette");
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
                  keywords.push("hotel");
                  prefix = "schema";
                  category = "Hotel";
                } else if (linkData[0]['properties']['tourism'] == "museum") {
                  keywords.push("museum");
                  prefix = "schema";
                  category = "Museum";
                } else if (linkData[0]['properties']['tourism'] == "hostel") {
                  keywords.push("hostel");
                  prefix = "schema";
                  category = "hostel";
                } else if (linkData[0]['properties']['tourism'] == "gallery") {
                  keywords.push("gallery");
                  prefix = "schema";
                  category = "gallery";
                } else if (linkData[0]['properties']['tourism'] == "attraction") {
                  keywords.push("attraction");
                  prefix = "schema";
                  category = "TouristAttraction";
                } else if (linkData[0]['properties']['tourism'] == "artwork") {
                  keywords.push("artwork");
                  keywords.push("art");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "VisualArtwork";
                } else if (linkData[0]['properties']['tourism'] == "guest_house") {
                  keywords.push("guesthouse");
                  keywords.push("guest");
                  keywords.push("house");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "Accommodation";
                } else if (linkData[0]['properties']['tourism'] == "apartment") {
                  keywords.push("apartment");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "Apartment";
                } else if (linkData[0]['properties']['tourism'] == "information") {
                  keywords.push("information");
                  //OPZOEKEN OP SITE
                  prefix = "schema";
                  category = "TouristInformationCenter";
                } else if (linkData[0]['properties']['tourism'] == "viewpoint") {
                  keywords.push("viewpoint");
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
                  keywords.push("picnic");
                  keywords.push("table");
                  prefix = "schema";
                  category = "Place";
                } else if (linkData[0]['properties']['leisure'] == "playground") {
                  keywords.push("playground");
                  prefix = "schema";
                  category = "Playground";
                } else if (linkData[0]['properties']['leisure'] == "fitness_centre") {
                  keywords.push("fitness");
                  keywords.push("gym");
                  prefix = "lgdo";
                  category = "Gym";
                } else if (linkData[0]['properties']['leisure'] == "sports_centre") {
                  keywords.push("sport");
                  keywords.push("sports");
                  prefix = "lgdo";
                  category = "SportsCentre";
                } else if (linkData[0]['properties']['leisure'] == "hackerspace") {
                  keywords.push("hackerspace");
                  keywords.push("hacker");
                  keywords.push("hack");
                  prefix = "lgdo";
                  category = "Hackerspace";
                } else if (linkData[0]['properties']['leisure'] == "dance") {
                  keywords.push("dance");
                  keywords.push("dancing");
                  prefix = "lgdo";
                  category = "Dance";
                } else if (linkData[0]['properties']['leisure'] == "garden") {
                  keywords.push("garden");
                  prefix = "lgdo";
                  category = "GardenCentre";
                } else if (linkData[0]['properties']['leisure'] == "amusement_arcade") {
                  keywords.push("arcade");
                  prefix = "schema";
                  category = "AmusementPark";
                } else if (linkData[0]['properties']['leisure'] == "escape_game") {
                  keywords.push("escape");
                  keywords.push("game");
                  prefix = "ex";
                  category = "EscapeGame";
                } else if (linkData[0]['properties']['leisure'] == "pitch") {
                  keywords.push("pitch");
                  prefix = "lgdo";
                  category = "Pitch";
                } else if (linkData[0]['properties']['leisure'] == "sports_hall") {
                  keywords.push("sportshall");
                  prefix = "ex";
                  category = "SportsHall";
                } else if (linkData[0]['properties']['leisure'] == "sauna") {
                  keywords.push("sauna");
                  prefix = "lgdo";
                  category = "Sauna";
                } else if (linkData[0]['properties']['leisure'] == "marina") {
                  keywords.push("marina");
                  keywords.push("boatyard");
                  keywords.push("port");
                  keywords.push("harbor");
                  prefix = "lgdo";
                  category = "Marina";
                } else if (linkData[0]['properties']['leisure'] == "swimming_pool") {
                  keywords.push("swimming");
                  keywords.push("pool");
                  prefix = "lgdo";
                  category = "SwimmingPool";
                } else if (linkData[0]['properties']['leisure'] == "fitness_station") {
                  keywords.push("fitness");
                  keywords.push("gym");
                  prefix = "ex";
                  category = "FitnessStation";
                } else if (linkData[0]['properties']['leisure'] == "park") {
                  keywords.push("park");
                  prefix = "schema";
                  category = "Park";
                } else if (linkData[0]['properties']['leisure'] == "track") {
                  keywords.push("track");
                  prefix = "lgdo";
                  category = "Track";
                } else if (linkData[0]['properties']['leisure'] == "dog_park") {
                  keywords.push("dog");
                  prefix = "lgdo";
                  category = "DogPark";
                } else if (linkData[0]['properties']['leisure'] == "outdoor_seating") {
                  keywords.push("outdoor");
                  keywords.push("seating");
                  prefix = "ex";
                  category = "OutdoorSeating";
                } else if (linkData[0]['properties']['leisure'] == "slipway") {
                  keywords.push("slipway");
                  prefix = "lgdo";
                  category = "Slipway";
                } else if (linkData[0]['properties']['leisure'] == "bandstand") {
                  keywords.push("bandstand");
                  prefix = "lgdo";
                  category = "Bandstand";
                } else if (linkData[0]['properties']['leisure'] == "bleachers") {
                  keywords.push("bleachers");
                  prefix = "ex";
                  category = "Bleachers";
                } else if (linkData[0]['properties']['leisure'] == "nature_reserve") {
                  keywords.push("nature");
                  keywords.push("reserve");
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
                  keywords.push("building");
                  prefix = "lgdo";
                  category = "Building";
                } else if (linkData[0]['properties']['historic'] == "memorial") {
                  keywords.push("memorial");
                  prefix = "lgdo";
                  category = "Memorial";
                } else if (linkData[0]['properties']['historic'] == "ruins") {
                  keywords.push("ruins");
                  keywords.push("ruin");
                  prefix = "lgdo";
                  category = "Ruins";
                } else if (linkData[0]['properties']['historic'] == "wayside_cross") {
                  keywords.push("cross");
                  keywords.push("wayside");
                  prefix = "ex";
                  category = "WaysideCross";
                } else if (linkData[0]['properties']['historic'] == "wayside_shrine") {
                  keywords.push("shrine");
                  prefix = "dbp";
                  category = "Shrine";
                } else if (linkData[0]['properties']['historic'] == "heritage_building") {
                  keywords.push("heritage");
                  keywords.push("building");
                  prefix = "ex";
                  category = "HeritageBuilding";
                } else if (linkData[0]['properties']['historic'] == "fort") {
                  keywords.push("fort");
                  prefix = "lgdo";
                  category = "Fort";
                } else if (linkData[0]['properties']['historic'] == "school") {
                  keywords.push("school");
                  prefix = "schema";
                  category = "School";
                } else if (linkData[0]['properties']['historic'] == "archaeological_site") {
                  keywords.push("archaeological");
                  keywords.push("archeology");
                  prefix = "lgdo";
                  category = "ArchaeologicalSite";
                } else if (linkData[0]['properties']['historic'] == "monument") {
                  keywords.push("monument");
                  prefix = "lgdo";
                  category = "Monument";
                } else if (linkData[0]['properties']['historic'] == "industrial") {
                  keywords.push("industrial");
                  prefix = "lgdo";
                  category = "IndustrialProductionBuilding";
                } else if (linkData[0]['properties']['historic'] == "monastery") {
                  keywords.push("monastery");
                  prefix = "lgdo";
                  category = "Monastery";
                } else if (linkData[0]['properties']['historic'] == "house") {
                  keywords.push("house");
                  prefix = "schema";
                  category = "House";
                } else if (linkData[0]['properties']['historic'] == "bridge") {
                  keywords.push("bridge");
                  prefix = "schema";
                  category = "Bridge";
                } else if (linkData[0]['properties']['historic'] == "chapel") {
                  keywords.push("chapel");
                  prefix = "lgdo";
                  category = "Chapel";
                } else if (linkData[0]['properties']['historic'] == "hospital") {
                  keywords.push("hospital");
                  prefix = "schema";
                  category = "Hospital";
                } else if (linkData[0]['properties']['historic'] == "church") {
                  keywords.push("church");
                  prefix = "schema";
                  category = "Church";
                } else if (linkData[0]['properties']['historic'] == "tower") {
                  keywords.push("tower");
                  prefix = "lgdo";
                  category = "Tower";
                } else if (linkData[0]['properties']['historic'] == "castle_wall") {
                  keywords.push("castle");
                  keywords.push("wall");
                  prefix = "ex";
                  category = "CastleWall";
                } else if (linkData[0]['properties']['historic'] == "castle") {
                  keywords.push("castle");
                  prefix = "lgdo";
                  category = "Castle";
                } else if (linkData[0]['properties']['historic'] == "prison") {
                  keywords.push("prison");
                  prefix = "lgdo";
                  category = "Prison";
                } else if (linkData[0]['properties']['historic'] == "city_gate") {
                  keywords.push("gate");
                  keywords.push("city");
                  prefix = "lgdo";
                  category = "Prison";
                } else if (linkData[0]['properties']['historic'] == "bank") {
                  keywords.push("bank");
                  prefix = "lgdo";
                  category = "Bank";
                } else if (linkData[0]['properties']['historic'] == "cinema") {
                  keywords.push("cinema");
                  prefix = "lgdo";
                  category = "Cinema";
                } else if (linkData[0]['properties']['historic'] == "water_gate") {
                  keywords.push("water");
                  keywords.push("gate");
                  prefix = "ex";
                  category = "WaterGate";
                } else if (linkData[0]['properties']['historic'] == "warehouse") {
                  keywords.push("warehouse");
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
                  keywords.push("plaque");
                  prefix = "ex";
                  category = "Plaque";
                } else if (linkData[0]['properties']['memorial'] == "playground") {
                  keywords.push("playground");
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
                  keywords.push("jogging");
                  prefix = "ex";
                  category = "Jogging";
                } else if (linkData[0]['properties']['sport'] == "climbing") {
                  keywords.push("climbing");
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
                  for (let item of linkData[0]['properties']['cuisine'].split(';')) {
                    turtleOutput += `\tschema:servesCuisine "${item}"; \n`;
                    turtleOutput += `\tschema:keyword "${item}"; \n`;
                    keywords.push(item);
                  }
                }
                for (let keyword of keywords) {
                  turtleOutput += `\tschema:keyword "${keyword}"; \n`;
                }
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