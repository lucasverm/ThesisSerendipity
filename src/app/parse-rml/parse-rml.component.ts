import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OsmService } from '../services/osm.service';

@Component({
  selector: 'app-parse-rml',
  templateUrl: './parse-rml.component.html',
  styleUrls: ['./parse-rml.component.scss']
})
export class ParseRmlComponent {
  public toonDezeData: String;
  constructor(private http: HttpClient, private osmService: OsmService) { }
  private data: any[];
  PoiTurtle: String = "";
  CategoricalTurtle: String = "";
  ngOnInit() {
    this.osmService.getJsonData().subscribe(d => {
      this.data = d.features;
      this.jsonToTurtl();
      this.toonDezeData = this.PoiTurtle;
    });
    this.osmService.getCSVData().subscribe(d => {
      const lijst: any[] = d.split('\n');
      let arr: any[][] = new Array(lijst.length);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(lijst.length);
        const waarden: any[] = lijst[i].split(';');
        for (let j = 0; j < arr.length; j++) {
          arr[i][j] = waarden.at(j);
        }
      }
      this.categoriesToTurtle(this.doubleArrayToObject(arr));
    });
  }

  doubleArrayToObject(arr: any[][]): any {
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


  toggle(what: string) {
    if (what == "POI") {
      this.toonDezeData = this.PoiTurtle;
    } else if (what == "categorical_similarities") {
      this.toonDezeData = this.CategoricalTurtle;
    } else if (what == "osm") {
      this.toonDezeData = JSON.stringify(this.data, null, 2)
    }
  }

  categoriesToTurtle(obj: any) {
    let teller: number = 1;
    this.CategoricalTurtle += "@prefix sim: <http://purl.org/ontology/similarity/> .\n";
    Object.keys(obj).forEach(key => {
      Object.keys(obj[key]).forEach(subKey => {
        if (key && subKey && obj[key][subKey]) {
          this.CategoricalTurtle += `<ex/${teller}> a sim:Association ;\n`;
          this.CategoricalTurtle += `\tsim:subject "${key}" ; \n`;
          this.CategoricalTurtle += `\tsim:object "${subKey}" ; \n`;
          this.CategoricalTurtle += `\tsim:weight ${obj[key][subKey]} . \n`;
          teller += 1;
        }
      });
    });

  }

  jsonToTurtl() {
    let sleutels = new Set();
    this.PoiTurtle += "@prefix schema: <http://schema.org/> . \n";
    this.PoiTurtle += "@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>.\n";
    this.PoiTurtle += "@prefix dbp: <https://dbpedia.org/ontology/>.\n";
    this.PoiTurtle += "@prefix km4c: <http://www.disit.org/km4city/schema#>.\n";
    this.PoiTurtle += "@prefix lgdo: <http://linkedgeodata.org/ontology/>.\n";
    this.PoiTurtle += "@prefix ex: <http://example.org/> . \n\n";

    let linkData: any[] = [...this.data]
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
          this.PoiTurtle += `${tripleIdentifier} a schema:Restaurant ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "fast_food") {
          keywords.push("fastfood");
          this.PoiTurtle += `${tripleIdentifier} a schema:FastFoodRestaurant ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "cafe") {
          keywords.push("cafe");
          this.PoiTurtle += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "bar") {
          keywords.push("bar");
          this.PoiTurtle += `${tripleIdentifier} a schema:BarOrPub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "pub") {
          keywords.push("pub");
          this.PoiTurtle += `${tripleIdentifier} a schema:BarOrPub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "ice_cream") {
          keywords.push("icecream");
          this.PoiTurtle += `${tripleIdentifier} a schema:IceCreamShop ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "nightclub") {
          keywords.push("nightclub");
          this.PoiTurtle += `${tripleIdentifier} a schema:NightClub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "theatre") {
          keywords.push("theater");
          this.PoiTurtle += `${tripleIdentifier} a dbp:Theatre ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "events_venue") {
          keywords.push("event");
          keywords.push("venue");
          this.PoiTurtle += `${tripleIdentifier} a schema:EventVenue ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "community_centre") {
          keywords.push("community");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Community_centre ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "studio") {
          keywords.push("studio");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Studio ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "cinema") {
          keywords.push("cinema");
          this.PoiTurtle += `${tripleIdentifier} a schema:MovieTheater ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "fountain") {
          keywords.push("fountain");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Fountain ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "public_bookcase") {
          keywords.push("public");
          keywords.push("bookcase");
          this.PoiTurtle += `${tripleIdentifier} a ex:public_bookcase ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "social_centre") {
          keywords.push("social");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:SocialCentre ;\n`;
        } else {
          this.PoiTurtle += `${tripleIdentifier} a schema:Place ;\n`;
        }
        //SHOP
      } else if (linkData[0]['properties']['shop']) {
        if (linkData[0]['properties']['shop'] == "bicycle") {
          keywords.push("bicycle");
          this.PoiTurtle += `${tripleIdentifier} a schema:BikeStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bakery") {
          keywords.push("bakery");
          this.PoiTurtle += `${tripleIdentifier} a schema:Bakery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "convenience") {
          keywords.push("convenience");
          this.PoiTurtle += `${tripleIdentifier} a schema:ConvenienceStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "deli") {
          keywords.push("deli");
          this.PoiTurtle += `${tripleIdentifier} a schema:HomeGoodsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "tattoo") {
          keywords.push("tattoo");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:TattooShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hairdresser") {
          keywords.push("hairdresser");
          this.PoiTurtle += `${tripleIdentifier} a schema:HairSalon ;\n`;
        } else if (linkData[0]['properties']['shop'] == "medical_supply") {
          keywords.push("medical");
          keywords.push("supply");
          this.PoiTurtle += `${tripleIdentifier} a schema:medical_supply ;\n`;
        } else if (linkData[0]['properties']['shop'] == "antiques") {
          keywords.push("antiques");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Antiques ;\n`;
        } else if (linkData[0]['properties']['shop'] == "window_blind") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "second_hand") {
          keywords.push("secondhand");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Second_hand_goods ;\n`;
        } else if (linkData[0]['properties']['shop'] == "telecommunication") {
          keywords.push("telecommunication");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Telecommunication ;\n`;
        } else if (linkData[0]['properties']['shop'] == "motorcycle") {
          keywords.push("motorcycle");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:motorcycle ;\n`;
        } else if (linkData[0]['properties']['shop'] == "pet") {
          keywords.push("pet");
          this.PoiTurtle += `${tripleIdentifier} a schema:PetStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car_repair") {
          keywords.push("car");
          keywords.push("repair");
          this.PoiTurtle += `${tripleIdentifier} a schema:AutoRepair ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hifi") {
          keywords.push("hifi");
          this.PoiTurtle += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "massage") {
          keywords.push("massage");
          this.PoiTurtle += `${tripleIdentifier} a schema:DaySpa ;\n`;
        } else if (linkData[0]['properties']['shop'] == "beverages") {
          keywords.push("beverages");
          this.PoiTurtle += `${tripleIdentifier} a schema:LiquorStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "appliance") {
          keywords.push("appliance");
          this.PoiTurtle += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "photo") {
          keywords.push("photo");
          this.PoiTurtle += `${tripleIdentifier} a schema:Photograph ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bag") {
          keywords.push("bag");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:bagsShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "party") {
          keywords.push("party");
          this.PoiTurtle += `${tripleIdentifier} a ex:partyStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "seafood") {
          keywords.push("seafood");
          keywords.push("fish");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Fish_and_seafood ;\n`;
        } else if (linkData[0]['properties']['shop'] == "craft") {
          keywords.push("craft");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:craft ;\n`;
        } else if (linkData[0]['properties']['shop'] == "kiosk") {
          keywords.push("kiosk");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:kiosk ;\n`;
        } else if (linkData[0]['properties']['shop'] == "video_games") {
          keywords.push("videogames");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:videoGames ;\n`;
        } else if (linkData[0]['properties']['shop'] == "toys") {
          keywords.push("toys");
          this.PoiTurtle += `${tripleIdentifier} a schema:ToyStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "mall") {
          keywords.push("mall");
          this.PoiTurtle += `${tripleIdentifier} a schema:ShoppingCenter ;\n`;
        } else if (linkData[0]['properties']['shop'] == "ticket") {
          keywords.push("ticket");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Ticket ;\n`;
        } else if (linkData[0]['properties']['shop'] == "juice") {
          keywords.push("juice");
          this.PoiTurtle += `${tripleIdentifier} a ex:JuiceStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "perfumery") {
          keywords.push("perfumery");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Perfumery_and_cosmetic_articles ;\n`;
        } else if (linkData[0]['properties']['shop'] == "computer") {
          keywords.push("computer");
          this.PoiTurtle += `${tripleIdentifier} a schema:ComputerStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hearing_aids") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "interior_decoration") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "bookmaker") {
          keywords.push("bookmaker");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:BookmakerShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hardware") {
          keywords.push("hardware");
          this.PoiTurtle += `${tripleIdentifier} a schema:HardwareStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "florist") {
          keywords.push("florist");
          keywords.push("flower");
          this.PoiTurtle += `${tripleIdentifier} a schema:Florist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "art") {
          keywords.push("art");
          this.PoiTurtle += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
        } else if (linkData[0]['properties']['shop'] == "baby_goods") {
          keywords.push("baby");
          this.PoiTurtle += `${tripleIdentifier} a schema:ChildCare ;\n`;
        } else if (linkData[0]['properties']['shop'] == "games") {
          keywords.push("games");
          this.PoiTurtle += `${tripleIdentifier} a schema:games ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car") {
          keywords.push("car");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:CarShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "variety_store") {
          keywords.push("variety");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:variety ;\n`;
        } else if (linkData[0]['properties']['shop'] == "department_store") {
          keywords.push("department");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:DepartmentStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "confectionery") {
          keywords.push("confectionery");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Confectionery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "pastry") {
          keywords.push("pastry");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Pastry_shop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "stationery") {
          keywords.push("stationery");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Newspapers_and_stationery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "clothes") {
          keywords.push("clothes");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Clothes ;\n`;
        } else if (linkData[0]['properties']['shop'] == "shoes") {
          keywords.push("shoes");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Shoes ;\n`;
        } else if (linkData[0]['properties']['shop'] == "health_food") {
          keywords.push("food");
          keywords.push("healthy");
          keywords.push("health");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:HealthFood ;\n`;
        } else if (linkData[0]['properties']['shop'] == "supermarket") {
          keywords.push("supermarket");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Supermarket ;\n`;
        } else if (linkData[0]['properties']['shop'] == "chocolate") {
          keywords.push("chocolate");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Chocolate ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fashion_accessories") {
          keywords.push("fashion");
          keywords.push("accessories");
          this.PoiTurtle += `${tripleIdentifier} a ex:fashionAccessories ;\n`;
        } else if (linkData[0]['properties']['shop'] == "herbalist") {
          keywords.push("herbalist");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Herbalist_shop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "jewelry") {
          keywords.push("jewelry");
          this.PoiTurtle += `${tripleIdentifier} a schema:JewelryStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "outdoor") {
          keywords.push("outdoor");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:outdoor ;\n`;
        } else if (linkData[0]['properties']['shop'] == "furniture") {
          keywords.push("furniture");
          this.PoiTurtle += `${tripleIdentifier} a schema:FurnitureStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "electronics") {
          keywords.push("electronics");
          this.PoiTurtle += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "gift") {
          keywords.push("gift");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Gift ;\n`;
        } else if (linkData[0]['properties']['shop'] == "alcohol") {
          keywords.push("alcohol");
          this.PoiTurtle += `${tripleIdentifier} a schema:LiquorStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "paint") {
          keywords.push("paint");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Paint ;\n`;
        } else if (linkData[0]['properties']['shop'] == "butcher") {
          keywords.push("butcher");
          keywords.push("meat");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Butcher ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bed") {
          keywords.push("bed");
          this.PoiTurtle += `${tripleIdentifier} a schema:BedStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "beauty") {
          keywords.push("beauty");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:BeautyShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "cosmetics") {
          keywords.push("cosmetics");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Cosmetics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "tailor") {
          keywords.push("tailor");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Tailor ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fabric") {
          keywords.push("fabric");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Fabric ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wholesale") {
          keywords.push("wholesale");
          this.PoiTurtle += `${tripleIdentifier} a km4c:wholesale ;\n`;
        } else if (linkData[0]['properties']['shop'] == "newsagent") {
          keywords.push("newsagent");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Newsagent ;\n`;
        } else if (linkData[0]['properties']['shop'] == "leather") {
          keywords.push("leather");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Leather ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car_parts") {
          keywords.push("parts");
          keywords.push("car");
          this.PoiTurtle += `${tripleIdentifier} a schema:AutoPartsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "copyshop") {
          keywords.push("copy");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Copyshop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "books") {
          keywords.push("book");
          this.PoiTurtle += `${tripleIdentifier} a schema:BookStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "charity") {
          keywords.push("charity");
          keywords.push("NGO");
          this.PoiTurtle += `${tripleIdentifier} a schema:NGO ;\n`;
        } else if (linkData[0]['properties']['shop'] == "radiotechnics") {
          keywords.push("radio");
          keywords.push("technics");
          this.PoiTurtle += `${tripleIdentifier} a ex:RadioTechnics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "coffee") {
          keywords.push("coffee");
          this.PoiTurtle += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "textile_printing") {
          keywords.push("textile");
          keywords.push("printing");
          this.PoiTurtle += `${tripleIdentifier} a ex:TextilePrinting ;\n`;
        } else if (linkData[0]['properties']['shop'] == "chemist") {
          keywords.push("chemist");
          keywords.push("chemistry");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:chemist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "spices") {
          keywords.push("spices");
          this.PoiTurtle += `${tripleIdentifier} a ex:Spices ;\n`;
        } else if (linkData[0]['properties']['shop'] == "musical_instrument") {
          keywords.push("instrument");
          keywords.push("musical");
          keywords.push("music");
          this.PoiTurtle += `${tripleIdentifier} a km4c:Musical_instruments_and_scores ;\n`;
        } else if (linkData[0]['properties']['shop'] == "erotic") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "wine") {
          keywords.push("wine");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Wine ;\n`;
        } else if (linkData[0]['properties']['shop'] == "video") {
          keywords.push("video");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Video ;\n`;
        } else if (linkData[0]['properties']['shop'] == "mobile_phone") {
          keywords.push("mobilephone");
          keywords.push("phone");
          keywords.push("mobile");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:mobilePhone ;\n`;
        } else if (linkData[0]['properties']['shop'] == "travel_agency") {
          keywords.push("travel");
          this.PoiTurtle += `${tripleIdentifier} a schema:TravelAgency ;\n`;
        } else if (linkData[0]['properties']['shop'] == "garden_centre") {
          keywords.push("garden");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:GardenCentre ;\n`;
        } else if (linkData[0]['properties']['shop'] == "greengrocer") {
          keywords.push("greengrocer");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Greengrocer ;\n`;
        } else if (linkData[0]['properties']['shop'] == "skate") {
          keywords.push("skate");
          this.PoiTurtle += `${tripleIdentifier} a ex:SkateShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "sports") {
          keywords.push("sport");
          keywords.push("sports");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Sports ;\n`;
        } else if (linkData[0]['properties']['shop'] == "carpet") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "optician") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "nuts") {
          keywords.push("nut");
          keywords.push("nuts");
          this.PoiTurtle += `${tripleIdentifier} a ex:NutsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "laundry") {
          keywords.push("laundry");
          this.PoiTurtle += `${tripleIdentifier} a schema:DryCleaningOrLaundry ;\n`;
        } else if (linkData[0]['properties']['shop'] == "doityourself") {
          keywords.push("DIY");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Doityourself ;\n`;
        } else if (linkData[0]['properties']['shop'] == "brass_instruments") {
          keywords.push("brass");
          keywords.push("instruments");
          this.PoiTurtle += `${tripleIdentifier} a schema:brass_instruments ;\n`;
        } else if (linkData[0]['properties']['shop'] == "music") {
          keywords.push("music");
          this.PoiTurtle += `${tripleIdentifier} a schema:MusicStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "lottery") {
          keywords.push("lottery");
          keywords.push("luck");
          this.PoiTurtle += `${tripleIdentifier} a ex:Lottery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bathroom_furnishing") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "locksmith") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "general") {
          keywords.push("general");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:General ;\n`;
        } else if (linkData[0]['properties']['shop'] == "funeral_directors") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "houseware") {
          keywords.push("houseware");
          keywords.push("housewares");
          keywords.push("house");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:housewares ;\n`;
        } else if (linkData[0]['properties']['shop'] == "kitchen") {
          keywords.push("kitchen");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:KitchenShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wine; books") {
          keywords.push("wine");
          keywords.push("book");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:BookShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fashion") {
          keywords.push("fashion");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Fashion ;\n`;
        } else if (linkData[0]['properties']['shop'] == "e-cigarette") {
          keywords.push("cigarette");
          this.PoiTurtle += `${tripleIdentifier} a ex:E-Cigarette ;\n`;
        } else if (linkData[0]['properties']['shop'] == "yes") {
          this.PoiTurtle += `${tripleIdentifier} a schema:Store ;\n`;
        } else {
          this.PoiTurtle += `${tripleIdentifier} a schema:Store ;\n`;
        }
        //TOURISM
      } else if (linkData[0]['properties']['tourism']) {
        if (linkData[0]['properties']['tourism'] == "hotel") {
          keywords.push("hotel");
          this.PoiTurtle += `${tripleIdentifier} a schema:Hotel ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "museum") {
          keywords.push("museum");
          this.PoiTurtle += `${tripleIdentifier} a schema:Museum ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "hostel") {
          keywords.push("hostel");
          this.PoiTurtle += `${tripleIdentifier} a schema:hostel ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "gallery") {
          keywords.push("gallery");
          this.PoiTurtle += `${tripleIdentifier} a schema:gallery ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "attraction") {
          keywords.push("attraction");
          this.PoiTurtle += `${tripleIdentifier} a schema:TouristAttraction ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "artwork") {
          keywords.push("artwork");
          keywords.push("art");
          //OPZOEKEN OP SITE
          this.PoiTurtle += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "guest_house") {
          keywords.push("guesthouse");
          keywords.push("guest");
          keywords.push("house");
          //OPZOEKEN OP SITE
          this.PoiTurtle += `${tripleIdentifier} a schema:Accommodation ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "apartment") {
          keywords.push("apartment");
          //OPZOEKEN OP SITE
          this.PoiTurtle += `${tripleIdentifier} a schema:Apartment ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "information") {
          keywords.push("information");
          //OPZOEKEN OP SITE
          this.PoiTurtle += `${tripleIdentifier} a schema:TouristInformationCenter ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "viewpoint") {
          keywords.push("viewpoint");
          //OPZOEKEN OP SITE
          this.PoiTurtle += `${tripleIdentifier} a schema:viewpoint ;\n`;
        } else {
          this.PoiTurtle += `${tripleIdentifier} a schema:TouristDestination ;\n`;

        }

        //leisure
      } else if (linkData[0]['properties']['leisure']) {
        if (linkData[0]['properties']['leisure'] == "picnic_table") {
          keywords.push("picnic");
          keywords.push("table");
          this.PoiTurtle += `${tripleIdentifier} a schema:Place ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "playground") {
          keywords.push("playground");
          this.PoiTurtle += `${tripleIdentifier} a schema:Playground ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "fitness_centre") {
          keywords.push("fitness");
          keywords.push("gym");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Gym ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sports_centre") {
          keywords.push("sport");
          keywords.push("sports");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:SportsCentre ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "hackerspace") {
          keywords.push("hackerspace");
          keywords.push("hacker");
          keywords.push("hack");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Hackerspace ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "dance") {
          keywords.push("dance");
          keywords.push("dancing");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Dance ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "garden") {
          keywords.push("garden");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:GardenCentre ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "amusement_arcade") {
          keywords.push("arcade");
          this.PoiTurtle += `${tripleIdentifier} a schema:AmusementPark ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "escape_game") {
          keywords.push("escape");
          keywords.push("game");
          this.PoiTurtle += `${tripleIdentifier} a ex:EscapeGame ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "pitch") {
          keywords.push("pitch");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Pitch ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sports_hall") {
          keywords.push("sportshall");
          this.PoiTurtle += `${tripleIdentifier} a ex:SportsHall ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sauna") {
          keywords.push("sauna");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Sauna ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "marina") {
          keywords.push("marina");
          keywords.push("boatyard");
          keywords.push("port");
          keywords.push("harbor");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Marina ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "swimming_pool") {
          keywords.push("swimming");
          keywords.push("pool");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:SwimmingPool ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "fitness_station") {
          keywords.push("fitness");
          keywords.push("gym");
          this.PoiTurtle += `${tripleIdentifier} a ex:FitnessStation ;\n`;
        } else {
          this.PoiTurtle += `${tripleIdentifier} a schema:Place ;\n`;

        }
        //HISTORIC
      } else if (linkData[0]['properties']['historic']) {
        if (linkData[0]['properties']['historic'] == "building") {
          keywords.push("building");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Building ;\n`;
        } else if (linkData[0]['properties']['historic'] == "memorial") {
          keywords.push("memorial");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Memorial ;\n`;
        } else if (linkData[0]['properties']['historic'] == "ruins") {
          keywords.push("ruins");
          keywords.push("ruin");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Ruins ;\n`;
        } else if (linkData[0]['properties']['historic'] == "wayside_cross") {
          keywords.push("cross");
          keywords.push("wayside");
          this.PoiTurtle += `${tripleIdentifier} a ex:WaysideCross ;\n`;
        } else if (linkData[0]['properties']['historic'] == "wayside_shrine") {
          keywords.push("shrine");
          this.PoiTurtle += `${tripleIdentifier} a dbp:Shrine ;\n`;
        } else if (linkData[0]['properties']['historic'] == "fort") {
          keywords.push("fort");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Fort ;\n`;
        } else if (linkData[0]['properties']['historic'] == "archaeological_site") {
          keywords.push("archaeological");
          keywords.push("archeology");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:ArchaeologicalSite ;\n`;
        } else if (linkData[0]['properties']['historic'] == "monument") {
          keywords.push("monument");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Monument ;\n`;
        } else if (linkData[0]['properties']['historic'] == "industrial") {
          keywords.push("industrial");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:IndustrialProductionBuilding ;\n`;
        } else if (linkData[0]['properties']['historic'] == "monastery") {
          keywords.push("monastery");
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Monastery ;\n`;
        } else if (linkData[0]['properties']['historic'] == "yes") {
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Place ;\n`;
        } else {
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Place ;\n`;

        }
        //MEMORIAL
      } else if (linkData[0]['properties']['memorial']) {
        if (linkData[0]['properties']['memorial'] == "plaque") {
          keywords.push("plaque");
          this.PoiTurtle += `${tripleIdentifier} a ex:Plaque ;\n`;
        } else if (linkData[0]['properties']['memorial'] == "playground") {
          keywords.push("playground");
          this.PoiTurtle += `${tripleIdentifier} a schema:Playground ;\n`;
        } else {
          this.PoiTurtle += `${tripleIdentifier} a lgdo:Place ;\n`;
        }
      }
      //ANDEREN!
      else {
        this.PoiTurtle += `${tripleIdentifier} a schema:Place ;\n`;
      }
      if (relevant) {
        if (linkData[0]['properties']['name']) this.PoiTurtle += `\tschema:name "${linkData[0]['properties']['name']}" ; \n`;
        if (linkData[0]['properties']['website']) this.PoiTurtle += `\tschema:url "${linkData[0]['properties']['website']}" ; \n`;
        if (linkData[0]['properties']['phone']) this.PoiTurtle += `\tschema:telephone "${linkData[0]['properties']['phone']}" ; \n`;
        if (linkData[0]['properties']['alt_name']) this.PoiTurtle += `\tschema:alternateName "${linkData[0]['properties']['alt_name']}" ; \n`;
        if (linkData[0]['properties']['amenity']) this.PoiTurtle += `\tschema:amenityFeature "${linkData[0]['properties']['amenity']}" ; \n`;
        if (linkData[0]['properties']["addr:street"]) {
          this.PoiTurtle += `\tschema:PostalAddress [ 
          \ta schema:PostalAddress ;
          \tschema:streetAddress "${linkData[0]['properties']["addr:street"]}" ;\n`;
          if (linkData[0]['properties']["addr:housenumber"]) this.PoiTurtle += `\t\tschema:postOfficeBoxNumber "${linkData[0]['properties']["addr:housenumber"]}" ; \n`;
          if (linkData[0]['properties']["addr:postcode"]) this.PoiTurtle += `\t\tschema:postalCode "${linkData[0]['properties']["addr:postcode"]}" ; \n`;
          if (linkData[0]['properties']["addr:city"]) this.PoiTurtle += `\t\tschema:addressLocality "${linkData[0]['properties']["addr:city"]}" ; \n`;
          if (linkData[0]['properties']["addr:country"]) this.PoiTurtle += `\t\tschema:addressCountry "${linkData[0]['properties']["addr:country"]}" ; \n`;
          this.PoiTurtle += `\t] ; \n`;
        }
        if (linkData[0]['properties']['cuisine']) {
          for (let item of linkData[0]['properties']['cuisine'].split(';')) {
            this.PoiTurtle += `\tschema:servesCuisine "${item}" ; \n`;
            this.PoiTurtle += `\tschema:keyword "${item}" ; \n`;
          }
        }
        for (let keyword of keywords) {
          this.PoiTurtle += `\tschema:keyword "${keyword}" ; \n`;
        }
        if (linkData[0]['geometry']) {
          this.PoiTurtle += `\tschema:geo [ 
          \ta geo:Point ;
          \tgeo:lat "${linkData[0]['geometry']['coordinates'][0]}" ;
          \tgeo:long "${linkData[0]['geometry']['coordinates'][1]}" ;
        ] . \n`;
        }
      }
      keywords.forEach(t => keywordsSet.add(t));
      linkData.splice(0, 1);
    }
    //this.data = Array.from(keywordsSet).sort();
  }

  calculateBirdFlightDistanceBetween(lat1: number, lon1: number, lat2: number, lon2: number): number {
    let R = 6371;
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c * 1000;
    return Math.round(distance * 100) / 100
  }

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.toonDezeData.toString()
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
