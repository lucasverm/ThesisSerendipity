import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OsmService } from '../services/osm.service';

@Component({
  selector: 'app-parse-rml',
  templateUrl: './parse-rml.component.html',
  styleUrls: ['./parse-rml.component.scss']
})
export class ParseRmlComponent {

  public toonDezeDataIsTurtle: boolean = true;
  public toonDezeData: String = "";
  constructor(private http: HttpClient, private osmService: OsmService) { }
  private data: any[];
  turtle: String = "";
  ngOnInit() {
    this.osmService.getJsonData().subscribe(d => {
      this.data = d.features;
      this.jsonToTurtl();
      this.toonDezeData = this.turtle;
    });
  }

  toggle() {
    if (this.toonDezeDataIsTurtle) {
      this.toonDezeData = JSON.stringify(this.data, null, 2);
      this.toonDezeDataIsTurtle = false;
    } else {
      this.toonDezeData = this.turtle;
      this.toonDezeDataIsTurtle = true;
    }
  }

  jsonToTurtl() {
    let sleutels = new Set();
    this.turtle += "@prefix schema: <http://schema.org/> . \n";
    this.turtle += "@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>.\n";
    this.turtle += "@prefix dbp: <https://dbpedia.org/ontology/>.\n";
    this.turtle += "@prefix km4c: <http://www.disit.org/km4city/schema#>.\n";
    this.turtle += "@prefix lgdo: <http://linkedgeodata.org/ontology/>.\n";
    this.turtle += "@prefix ex: <http://example.org/> . \n";

    let linkData: any[] = [...this.data]
    let titles: Set<String> = new Set();
    while (linkData.length != 0) {
      Object.keys(linkData[0]['properties']).forEach(t => sleutels.add(t));
      let idZonderNode: String = String(linkData[0]['id']).replace("node/", "");
      let tripleIdentifier = `<ex/${idZonderNode}>`;
      //AMENITY
      let keywords = [];
      let relevant = true;
      if (linkData[0]['properties']['amenity']) {
        titles.add(`${linkData[0]['properties']['amenity']}`);
        if (linkData[0]['properties']['amenity'] == "restaurant") {
          keywords.push("restaurant");
          this.turtle += `${tripleIdentifier} a schema:Restaurant ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "fast_food") {
          keywords.push("fast food");
          this.turtle += `${tripleIdentifier} a schema:FastFoodRestaurant ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "cafe") {
          keywords.push("cafe");
          this.turtle += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "bar") {
          keywords.push("bar");
          this.turtle += `${tripleIdentifier} a schema:BarOrPub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "pub") {
          keywords.push("pub");
          this.turtle += `${tripleIdentifier} a schema:BarOrPub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "ice_cream") {
          keywords.push("icecream");
          this.turtle += `${tripleIdentifier} a schema:IceCreamShop ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "nightclub") {
          keywords.push("nightclub");
          this.turtle += `${tripleIdentifier} a schema:NightClub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "theatre") {
          keywords.push("theatre");
          this.turtle += `${tripleIdentifier} a dbp:Theatre ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "events_venue") {
          keywords.push("eventsvenue");
          this.turtle += `${tripleIdentifier} a schema:EventVenue ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "community_centre") {
          keywords.push("community centre");
          this.turtle += `${tripleIdentifier} a km4c:Community_centre ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "studio") {
          keywords.push("studio");
          this.turtle += `${tripleIdentifier} a lgdo:Studio ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "cinema") {
          keywords.push("cinema");
          this.turtle += `${tripleIdentifier} a schema:MovieTheater ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "fountain") {
          keywords.push("fountain");
          this.turtle += `${tripleIdentifier} a lgdo:Fountain ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "public_bookcase") {
          keywords.push("public bookcase");
          this.turtle += `${tripleIdentifier} a ex:public_bookcase ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "social_centre") {
          keywords.push("social_centre");
          this.turtle += `${tripleIdentifier} a lgdo:SocialCentre ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        }
        //SHOP
      } else if (linkData[0]['properties']['shop']) {
        titles.add(`${linkData[0]['properties']['shop']}`);
        if (linkData[0]['properties']['shop'] == "bicycle") {
          keywords.push("bicycle");
          this.turtle += `${tripleIdentifier} a schema:BikeStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bakery") {
          keywords.push("bakery");
          this.turtle += `${tripleIdentifier} a schema:Bakery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "convenience") {
          keywords.push("convenience");
          this.turtle += `${tripleIdentifier} a schema:ConvenienceStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "deli") {
          keywords.push("deli");
          this.turtle += `${tripleIdentifier} a schema:HomeGoodsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "tattoo") {
          keywords.push("tattoo");
          this.turtle += `${tripleIdentifier} a lgdo:TattooShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hairdresser") {
          keywords.push("hairdresser");
          this.turtle += `${tripleIdentifier} a schema:HairSalon ;\n`;
        } else if (linkData[0]['properties']['shop'] == "medical_supply") {
          keywords.push("medical_supply");
          this.turtle += `${tripleIdentifier} a schema:medical_supply ;\n`;
        } else if (linkData[0]['properties']['shop'] == "antiques") {
          keywords.push("antiques");
          this.turtle += `${tripleIdentifier} a km4c:Antiques ;\n`;
        } else if (linkData[0]['properties']['shop'] == "window_blind") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "second_hand") {
          keywords.push("second_hand");
          this.turtle += `${tripleIdentifier} a km4c:Second_hand_goods ;\n`;
        } else if (linkData[0]['properties']['shop'] == "telecommunication") {
          keywords.push("telecommunication");
          this.turtle += `${tripleIdentifier} a km4c:Telecommunication ;\n`;
        } else if (linkData[0]['properties']['shop'] == "motorcycle") {
          keywords.push("motorcycle");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:motorcycle ;\n`;
        } else if (linkData[0]['properties']['shop'] == "pet") {
          keywords.push("pet");
          this.turtle += `${tripleIdentifier} a schema:PetStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car_repair") {
          keywords.push("car_repair");
          this.turtle += `${tripleIdentifier} a schema:AutoRepair ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hifi") {
          keywords.push("hifi");
          this.turtle += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "massage") {
          keywords.push("massage");
          this.turtle += `${tripleIdentifier} a schema:DaySpa ;\n`;
        } else if (linkData[0]['properties']['shop'] == "beverages") {
          keywords.push("beverages");
          this.turtle += `${tripleIdentifier} a schema:LiquorStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "appliance") {
          keywords.push("appliance");
          this.turtle += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "photo") {
          keywords.push("photo");
          this.turtle += `${tripleIdentifier} a schema:Photograph ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bag") {
          keywords.push("bag");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:bag ;\n`;
        } else if (linkData[0]['properties']['shop'] == "party") {
          keywords.push("party");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:party ;\n`;
        } else if (linkData[0]['properties']['shop'] == "seafood") {
          keywords.push("seafood");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:seafood ;\n`;
        } else if (linkData[0]['properties']['shop'] == "craft") {
          keywords.push("craft");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:craft ;\n`;
        } else if (linkData[0]['properties']['shop'] == "kiosk") {
          keywords.push("kiosk");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:kiosk ;\n`;
        } else if (linkData[0]['properties']['shop'] == "video_games") {
          keywords.push("videogames");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:video_games ;\n`;
        } else if (linkData[0]['properties']['shop'] == "toys") {
          keywords.push("toys");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:toys ;\n`;
        } else if (linkData[0]['properties']['shop'] == "mall") {
          keywords.push("mall");
          this.turtle += `${tripleIdentifier} a schema:ShoppingCenter ;\n`;
        } else if (linkData[0]['properties']['shop'] == "ticket") {
          keywords.push("ticket");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:ticket ;\n`;
        } else if (linkData[0]['properties']['shop'] == "juice") {
          keywords.push("juice");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:juice ;\n`;
        } else if (linkData[0]['properties']['shop'] == "perfumery") {
          keywords.push("perfumery");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:perfumery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "computer") {
          keywords.push("computer");
          this.turtle += `${tripleIdentifier} a schema:ComputerStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hearing_aids") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "interior_decoration") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "bookmaker") {
          keywords.push("bookmaker");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:bookmaker ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hardware") {
          keywords.push("hardware");
          this.turtle += `${tripleIdentifier} a schema:HardwareStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "florist") {
          keywords.push("florist");
          this.turtle += `${tripleIdentifier} a schema:Florist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "art") {
          keywords.push("art");
          this.turtle += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
        } else if (linkData[0]['properties']['shop'] == "baby_goods") {
          keywords.push("baby goods");
          this.turtle += `${tripleIdentifier} a schema:ChildCare ;\n`;
        } else if (linkData[0]['properties']['shop'] == "games") {
          keywords.push("games");
          this.turtle += `${tripleIdentifier} a schema:games ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car") {
          keywords.push("car");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:car ;\n`;
        } else if (linkData[0]['properties']['shop'] == "variety_store") {
          keywords.push("variety_store");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:variety_store ;\n`;
        } else if (linkData[0]['properties']['shop'] == "department_store") {
          keywords.push("department_store");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:department_store ;\n`;
        } else if (linkData[0]['properties']['shop'] == "confectionery") {
          keywords.push("confectionery");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:confectionery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "pastry") {
          keywords.push("pastry");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:confectionery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "stationery") {
          keywords.push("stationery");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:stationery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "clothes") {
          keywords.push("clothes");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:clothes ;\n`;
        } else if (linkData[0]['properties']['shop'] == "shoes") {
          keywords.push("shoes");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:shoes ;\n`;
        } else if (linkData[0]['properties']['shop'] == "health_food") {
          keywords.push("healthy food");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:health_food ;\n`;
        } else if (linkData[0]['properties']['shop'] == "supermarket") {
          keywords.push("supermarket");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:supermarket ;\n`;
        } else if (linkData[0]['properties']['shop'] == "chocolate") {
          keywords.push("chocolate");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:chocolate ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fashion_accessories") {
          keywords.push("fashion_accessories");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:fashion_accessories ;\n`;
        } else if (linkData[0]['properties']['shop'] == "herbalist") {
          keywords.push("herbalist");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:herbalist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "jewelry") {
          keywords.push("jewelry");
          this.turtle += `${tripleIdentifier} a schema:JewelryStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "outdoor") {
          keywords.push("outdoor");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:outdoor ;\n`;
        } else if (linkData[0]['properties']['shop'] == "furniture") {
          keywords.push("furniture");
          this.turtle += `${tripleIdentifier} a schema:FurnitureStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "electronics") {
          keywords.push("electronics");
          this.turtle += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "gift") {
          keywords.push("gift");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:gift ;\n`;
        } else if (linkData[0]['properties']['shop'] == "alcohol") {
          keywords.push("alcohol");
          this.turtle += `${tripleIdentifier} a schema:LiquorStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "paint") {
          keywords.push("paint");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:paint ;\n`;
        } else if (linkData[0]['properties']['shop'] == "butcher") {
          keywords.push("butcher");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:butcher ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bed") {
          keywords.push("bed");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:bed ;\n`;
        } else if (linkData[0]['properties']['shop'] == "beauty") {
          keywords.push("beauty");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:beauty ;\n`;
        } else if (linkData[0]['properties']['shop'] == "cosmetics") {
          keywords.push("cosmetics");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:cosmetics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "tailor") {
          keywords.push("tailor");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:tailor ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fabric") {
          keywords.push("fabric");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:fabric ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wholesale") {
          keywords.push("wholesale");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:wholesale ;\n`;
        } else if (linkData[0]['properties']['shop'] == "newsagent") {
          keywords.push("newsagent");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:newsagent ;\n`;
        } else if (linkData[0]['properties']['shop'] == "leather") {
          keywords.push("leather");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:leather ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car_parts") {
          keywords.push("car parts");
          keywords.push("AutoPartsStore");
          this.turtle += `${tripleIdentifier} a schema:AutoPartsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "copyshop") {
          keywords.push("copyshop");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:copyshop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "books") {
          keywords.push("book");
          this.turtle += `${tripleIdentifier} a schema:BookStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "charity") {
          keywords.push("charity");
          keywords.push("NGO");
          this.turtle += `${tripleIdentifier} a schema:NGO ;\n`;
        } else if (linkData[0]['properties']['shop'] == "radiotechnics") {
          keywords.push("radiotechnics");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:radiotechnics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "coffee") {
          keywords.push("coffee");
          this.turtle += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "textile_printing") {
          keywords.push("textile_printing");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:textile_printing ;\n`;
        } else if (linkData[0]['properties']['shop'] == "chemist") {
          keywords.push("chemist");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:chemist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "spices") {
          keywords.push("spices");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:spices ;\n`;
        } else if (linkData[0]['properties']['shop'] == "musical_instrument") {
          keywords.push("musical_instrument");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:musical_instrument ;\n`;
        } else if (linkData[0]['properties']['shop'] == "erotic") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "wine") {
          keywords.push("wine");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:wine ;\n`;
        } else if (linkData[0]['properties']['shop'] == "video") {
          keywords.push("video");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:video ;\n`;
        } else if (linkData[0]['properties']['shop'] == "mobile_phone") {
          keywords.push("mobile_phone");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:mobile_phone ;\n`;
        } else if (linkData[0]['properties']['shop'] == "travel_agency") {
          keywords.push("travel agency");
          this.turtle += `${tripleIdentifier} a schema:TravelAgency ;\n`;
        } else if (linkData[0]['properties']['shop'] == "garden_centre") {
          keywords.push("garden_centre");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:garden_centre ;\n`;
        } else if (linkData[0]['properties']['shop'] == "greengrocer") {
          keywords.push("greengrocer");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:greengrocer ;\n`;
        } else if (linkData[0]['properties']['shop'] == "skate") {
          keywords.push("skate");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:skate ;\n`;
        } else if (linkData[0]['properties']['shop'] == "sports") {
          keywords.push("sports");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:sports ;\n`;
        } else if (linkData[0]['properties']['shop'] == "carpet") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "optician") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "nuts") {
          keywords.push("nuts");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:nuts ;\n`;
        } else if (linkData[0]['properties']['shop'] == "laundry") {
          keywords.push("laundry");
          this.turtle += `${tripleIdentifier} a schema:DryCleaningOrLaundry ;\n`;
        } else if (linkData[0]['properties']['shop'] == "doityourself") {
          keywords.push("doityourself");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:doityourself ;\n`;
        } else if (linkData[0]['properties']['shop'] == "brass_instruments") {
          keywords.push("brass_instruments");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:brass_instruments ;\n`;
        } else if (linkData[0]['properties']['shop'] == "music") {
          keywords.push("music");
          this.turtle += `${tripleIdentifier} a schema:MusicStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "lottery") {
          keywords.push("lottery");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:lottery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bathroom_furnishing") {
          keywords.push("bathroom_furnishing");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:bathroom_furnishing ;\n`;
        } else if (linkData[0]['properties']['shop'] == "locksmith") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "general") {
          keywords.push("general");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:general ;\n`;
        } else if (linkData[0]['properties']['shop'] == "funeral_directors") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "houseware") {
          keywords.push("houseware");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:houseware ;\n`;
        } else if (linkData[0]['properties']['shop'] == "kitchen") {
          keywords.push("kitchen");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:kitchen ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wine; books") {
          keywords.push("wine");
          keywords.push("books");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:wine ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fashion") {
          keywords.push("fashion");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:fashion ;\n`;
        } else if (linkData[0]['properties']['shop'] == "e-cigarette") {
          keywords.push("e-cigarette");
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:e-cigarette ;\n`;
        } else if (linkData[0]['properties']['shop'] == "yes") {
          this.turtle += `${tripleIdentifier} a schema:Store ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Store ;\n`;
        }
        //TOURISM
      } else if (linkData[0]['properties']['tourism']) {
        titles.add(`${linkData[0]['properties']['tourism']}`);
        if (linkData[0]['properties']['tourism'] == "hotel") {
          keywords.push("hotel");
          this.turtle += `${tripleIdentifier} a schema:Hotel ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "museum") {
          keywords.push("museum");
          this.turtle += `${tripleIdentifier} a schema:Museum ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "hostel") {
          keywords.push("hostel");
          this.turtle += `${tripleIdentifier} a schema:hostel ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "gallery") {
          keywords.push("gallery");
          this.turtle += `${tripleIdentifier} a schema:gallery ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "attraction") {
          keywords.push("attraction");
          this.turtle += `${tripleIdentifier} a schema:TouristAttraction ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "artwork") {
          keywords.push("artwork");
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "guest_house") {
          keywords.push("guest_house");
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:Accommodation ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "apartment") {
          keywords.push("apartment");
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:Apartment ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "information") {
          keywords.push("information");
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:TouristInformationCenter ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "viewpoint") {
          keywords.push("viewpoint");
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:viewpoint ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:TouristDestination ;\n`;

        }

        //leisure
      } else if (linkData[0]['properties']['leisure']) {
        titles.add(`${linkData[0]['properties']['leisure']}`);
        if (linkData[0]['properties']['leisure'] == "picnic_table") {
          keywords.push("picnic_table");
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "playground") {
          keywords.push("playground");
          this.turtle += `${tripleIdentifier} a schema:Playground ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "fitness_centre") {
          keywords.push("fitness_centre");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:fitness_centre ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sports_centre") {
          keywords.push("sports_centre");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:sports_centre ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "hackerspace") {
          keywords.push("hackerspace");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:hackerspace ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "dance") {
          keywords.push("dance");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:dance ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "garden") {
          keywords.push("garden");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:garden ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "amusement_arcade") {
          keywords.push("amusement_arcade");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:amusement_arcade ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "escape_game") {
          keywords.push("escape_game");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:escape_game ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "pitch") {
          keywords.push("pitch");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:pitch ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sports_hall") {
          keywords.push("sports_hall");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:sports_hall ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sauna") {
          keywords.push("sauna");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:sauna ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "marina") {
          keywords.push("marina");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:marina ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "swimming_pool") {
          keywords.push("swimming_pool");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:swimming_pool ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "fitness_station") {
          keywords.push("fitness_station");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:fitness_station ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;

        }
        //HISTORIC
      } else if (linkData[0]['properties']['historic']) {
        titles.add(`${linkData[0]['properties']['historic']}`);
        if (linkData[0]['properties']['historic'] == "building") {
          keywords.push("building");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:Building ;\n`;
        } else if (linkData[0]['properties']['historic'] == "memorial") {
          keywords.push("memorial");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:memorial ;\n`;
        } else if (linkData[0]['properties']['historic'] == "ruins") {
          keywords.push("ruins");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:ruins ;\n`;
        } else if (linkData[0]['properties']['historic'] == "wayside_cross") {
          keywords.push("wayside_cross");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:wayside_cross ;\n`;
        } else if (linkData[0]['properties']['historic'] == "wayside_shrine") {
          keywords.push("wayside_shrine");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:wayside_shrine ;\n`;
        } else if (linkData[0]['properties']['historic'] == "fort") {
          keywords.push("fort");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:fort ;\n`;
        } else if (linkData[0]['properties']['historic'] == "archaeological_site") {
          keywords.push("archaeological_site");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:archaeological_site ;\n`;
        } else if (linkData[0]['properties']['historic'] == "monument") {
          keywords.push("monument");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:monument ;\n`;
        } else if (linkData[0]['properties']['historic'] == "industrial") {
          keywords.push("industrial");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:industrial ;\n`;
        } else if (linkData[0]['properties']['historic'] == "monastery") {
          keywords.push("monastery");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:monastery ;\n`;
        } else if (linkData[0]['properties']['historic'] == "yes") {
          keywords.push("yes");
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;

        }
        //MEMORIAL
      } else if (linkData[0]['properties']['memorial']) {
        titles.add(`${linkData[0]['properties']['memorial']}`);
        if (linkData[0]['properties']['memorial'] == "plaque") {
          keywords.push("plaque");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:plaque ;\n`;
        } else if (linkData[0]['properties']['memorial'] == "playground") {
          keywords.push("playground");
          //TODO
          this.turtle += `${tripleIdentifier} a schema:Playground ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        }
      }
      //ANDEREN!
      else {
        this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
      }
      if (relevant) {
        if (linkData[0]['properties']['name']) this.turtle += `\tschema:name "${linkData[0]['properties']['name']}" ; \n`;
        if (linkData[0]['properties']['website']) this.turtle += `\tschema:url "${linkData[0]['properties']['website']}" ; \n`;
        if (linkData[0]['properties']['phone']) this.turtle += `\tschema:telephone "${linkData[0]['properties']['phone']}" ; \n`;
        if (linkData[0]['properties']['alt_name']) this.turtle += `\tschema:alternateName "${linkData[0]['properties']['alt_name']}" ; \n`;
        if (linkData[0]['properties']['amenity']) this.turtle += `\tschema:amenityFeature "${linkData[0]['properties']['amenity']}" ; \n`;
        if (linkData[0]['properties']["addr:street"]) {
          this.turtle += `\tschema:PostalAddress [ 
          \ta schema:PostalAddress ;
          \tschema:streetAddress "${linkData[0]['properties']["addr:street"]}" ;\n`;
          if (linkData[0]['properties']["addr:housenumber"]) this.turtle += `\t\tschema:postOfficeBoxNumber "${linkData[0]['properties']["addr:housenumber"]}" ; \n`;
          if (linkData[0]['properties']["addr:postcode"]) this.turtle += `\t\tschema:postalCode "${linkData[0]['properties']["addr:postcode"]}" ; \n`;
          if (linkData[0]['properties']["addr:city"]) this.turtle += `\t\tschema:addressLocality "${linkData[0]['properties']["addr:city"]}" ; \n`;
          if (linkData[0]['properties']["addr:country"]) this.turtle += `\t\tschema:addressCountry "${linkData[0]['properties']["addr:country"]}" ; \n`;
          this.turtle += `\t] ; \n`;
        }
        if (linkData[0]['properties']['cuisine']) {
          for (let item of linkData[0]['properties']['cuisine'].split(';')){
            this.turtle += `\tschema:servesCuisine "${item}" ; \n`;
            this.turtle += `\tschema:keyword "${item}" ; \n`;
          }
        }
        for (let keyword of keywords) {
          this.turtle += `\tschema:keyword "${keyword}" ; \n`;
        }
        if (linkData[0]['geometry']) {
          this.turtle += `\tschema:geo [ 
          \ta geo:Point ;
          \tgeo:lat "${linkData[0]['geometry']['coordinates'][0]}" ;
          \tgeo:long "${linkData[0]['geometry']['coordinates'][1]}" ;
        ] . \n`;
        }
      }

      linkData.splice(0, 1);
    }
    //this.data = Array.from(titles).sort();
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
    selBox.value = this.turtle.toString();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }



}
