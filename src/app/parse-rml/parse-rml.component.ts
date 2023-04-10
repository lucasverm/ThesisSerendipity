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
  public toonDezeData: String;
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
    this.turtle += "@prefix ex: <http://example.org/> . \n\n";

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
          this.turtle += `${tripleIdentifier} a schema:Restaurant ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "fast_food") {
          keywords.push("fastfood");
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
          keywords.push("theater");
          this.turtle += `${tripleIdentifier} a dbp:Theatre ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "events_venue") {
          keywords.push("event");
          keywords.push("venue");
          this.turtle += `${tripleIdentifier} a schema:EventVenue ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "community_centre") {
          keywords.push("community");
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
          keywords.push("public");
          keywords.push("bookcase");
          this.turtle += `${tripleIdentifier} a ex:public_bookcase ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "social_centre") {
          keywords.push("social");
          this.turtle += `${tripleIdentifier} a lgdo:SocialCentre ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        }
        //SHOP
      } else if (linkData[0]['properties']['shop']) {
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
          keywords.push("medical");
          keywords.push("supply");
          this.turtle += `${tripleIdentifier} a schema:medical_supply ;\n`;
        } else if (linkData[0]['properties']['shop'] == "antiques") {
          keywords.push("antiques");
          this.turtle += `${tripleIdentifier} a km4c:Antiques ;\n`;
        } else if (linkData[0]['properties']['shop'] == "window_blind") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "second_hand") {
          keywords.push("secondhand");
          this.turtle += `${tripleIdentifier} a km4c:Second_hand_goods ;\n`;
        } else if (linkData[0]['properties']['shop'] == "telecommunication") {
          keywords.push("telecommunication");
          this.turtle += `${tripleIdentifier} a km4c:Telecommunication ;\n`;
        } else if (linkData[0]['properties']['shop'] == "motorcycle") {
          keywords.push("motorcycle");
          this.turtle += `${tripleIdentifier} a lgdo:motorcycle ;\n`;
        } else if (linkData[0]['properties']['shop'] == "pet") {
          keywords.push("pet");
          this.turtle += `${tripleIdentifier} a schema:PetStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car_repair") {
          keywords.push("car");
          keywords.push("repair");
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
          this.turtle += `${tripleIdentifier} a lgdo:bagsShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "party") {
          keywords.push("party");
          this.turtle += `${tripleIdentifier} a ex:partyStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "seafood") {
          keywords.push("seafood");
          keywords.push("fish");
          this.turtle += `${tripleIdentifier} a km4c:Fish_and_seafood ;\n`;
        } else if (linkData[0]['properties']['shop'] == "craft") {
          keywords.push("craft");
          this.turtle += `${tripleIdentifier} a lgdo:craft ;\n`;
        } else if (linkData[0]['properties']['shop'] == "kiosk") {
          keywords.push("kiosk");
          this.turtle += `${tripleIdentifier} a lgdo:kiosk ;\n`;
        } else if (linkData[0]['properties']['shop'] == "video_games") {
          keywords.push("videogames");
          this.turtle += `${tripleIdentifier} a lgdo:videoGames ;\n`;
        } else if (linkData[0]['properties']['shop'] == "toys") {
          keywords.push("toys");
          this.turtle += `${tripleIdentifier} a schema:ToyStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "mall") {
          keywords.push("mall");
          this.turtle += `${tripleIdentifier} a schema:ShoppingCenter ;\n`;
        } else if (linkData[0]['properties']['shop'] == "ticket") {
          keywords.push("ticket");
          this.turtle += `${tripleIdentifier} a lgdo:Ticket ;\n`;
        } else if (linkData[0]['properties']['shop'] == "juice") {
          keywords.push("juice");
          this.turtle += `${tripleIdentifier} a ex:JuiceStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "perfumery") {
          keywords.push("perfumery");
          this.turtle += `${tripleIdentifier} a km4c:Perfumery_and_cosmetic_articles ;\n`;
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
          this.turtle += `${tripleIdentifier} a lgdo:BookmakerShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hardware") {
          keywords.push("hardware");
          this.turtle += `${tripleIdentifier} a schema:HardwareStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "florist") {
          keywords.push("florist");
          keywords.push("flower");
          this.turtle += `${tripleIdentifier} a schema:Florist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "art") {
          keywords.push("art");
          this.turtle += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
        } else if (linkData[0]['properties']['shop'] == "baby_goods") {
          keywords.push("baby");
          this.turtle += `${tripleIdentifier} a schema:ChildCare ;\n`;
        } else if (linkData[0]['properties']['shop'] == "games") {
          keywords.push("games");
          this.turtle += `${tripleIdentifier} a schema:games ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car") {
          keywords.push("car");
          this.turtle += `${tripleIdentifier} a lgdo:CarShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "variety_store") {
          keywords.push("variety");
          this.turtle += `${tripleIdentifier} a lgdo:variety ;\n`;
        } else if (linkData[0]['properties']['shop'] == "department_store") {
          keywords.push("department");
          this.turtle += `${tripleIdentifier} a lgdo:DepartmentStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "confectionery") {
          keywords.push("confectionery");
          this.turtle += `${tripleIdentifier} a lgdo:Confectionery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "pastry") {
          keywords.push("pastry");
          this.turtle += `${tripleIdentifier} a km4c:Pastry_shop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "stationery") {
          keywords.push("stationery");
          this.turtle += `${tripleIdentifier} a km4c:Newspapers_and_stationery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "clothes") {
          keywords.push("clothes");
          this.turtle += `${tripleIdentifier} a lgdo:Clothes ;\n`;
        } else if (linkData[0]['properties']['shop'] == "shoes") {
          keywords.push("shoes");
          this.turtle += `${tripleIdentifier} a lgdo:Shoes ;\n`;
        } else if (linkData[0]['properties']['shop'] == "health_food") {
          keywords.push("food");
          keywords.push("healthy");
          keywords.push("health");
          this.turtle += `${tripleIdentifier} a lgdo:HealthFood ;\n`;
        } else if (linkData[0]['properties']['shop'] == "supermarket") {
          keywords.push("supermarket");
          this.turtle += `${tripleIdentifier} a km4c:Supermarket ;\n`;
        } else if (linkData[0]['properties']['shop'] == "chocolate") {
          keywords.push("chocolate");
          this.turtle += `${tripleIdentifier} a lgdo:Chocolate ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fashion_accessories") {
          keywords.push("fashion");
          keywords.push("accessories");
          this.turtle += `${tripleIdentifier} a ex:fashionAccessories ;\n`;
        } else if (linkData[0]['properties']['shop'] == "herbalist") {
          keywords.push("herbalist");
          this.turtle += `${tripleIdentifier} a km4c:Herbalist_shop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "jewelry") {
          keywords.push("jewelry");
          this.turtle += `${tripleIdentifier} a schema:JewelryStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "outdoor") {
          keywords.push("outdoor");
          this.turtle += `${tripleIdentifier} a lgdo:outdoor ;\n`;
        } else if (linkData[0]['properties']['shop'] == "furniture") {
          keywords.push("furniture");
          this.turtle += `${tripleIdentifier} a schema:FurnitureStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "electronics") {
          keywords.push("electronics");
          this.turtle += `${tripleIdentifier} a schema:ElectronicsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "gift") {
          keywords.push("gift");
          this.turtle += `${tripleIdentifier} a lgdo:Gift ;\n`;
        } else if (linkData[0]['properties']['shop'] == "alcohol") {
          keywords.push("alcohol");
          this.turtle += `${tripleIdentifier} a schema:LiquorStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "paint") {
          keywords.push("paint");
          this.turtle += `${tripleIdentifier} a lgdo:Paint ;\n`;
        } else if (linkData[0]['properties']['shop'] == "butcher") {
          keywords.push("butcher");
          keywords.push("meat");
          this.turtle += `${tripleIdentifier} a lgdo:Butcher ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bed") {
          keywords.push("bed");
          this.turtle += `${tripleIdentifier} a schema:BedStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "beauty") {
          keywords.push("beauty");
          this.turtle += `${tripleIdentifier} a lgdo:BeautyShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "cosmetics") {
          keywords.push("cosmetics");
          this.turtle += `${tripleIdentifier} a lgdo:Cosmetics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "tailor") {
          keywords.push("tailor");
          this.turtle += `${tripleIdentifier} a lgdo:Tailor ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fabric") {
          keywords.push("fabric");
          this.turtle += `${tripleIdentifier} a lgdo:Fabric ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wholesale") {
          keywords.push("wholesale");
          this.turtle += `${tripleIdentifier} a km4c:wholesale ;\n`;
        } else if (linkData[0]['properties']['shop'] == "newsagent") {
          keywords.push("newsagent");
          this.turtle += `${tripleIdentifier} a lgdo:Newsagent ;\n`;
        } else if (linkData[0]['properties']['shop'] == "leather") {
          keywords.push("leather");
          this.turtle += `${tripleIdentifier} a lgdo:Leather ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car_parts") {
          keywords.push("parts");
          keywords.push("car");
          this.turtle += `${tripleIdentifier} a schema:AutoPartsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "copyshop") {
          keywords.push("copy");
          this.turtle += `${tripleIdentifier} a lgdo:Copyshop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "books") {
          keywords.push("book");
          this.turtle += `${tripleIdentifier} a schema:BookStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "charity") {
          keywords.push("charity");
          keywords.push("NGO");
          this.turtle += `${tripleIdentifier} a schema:NGO ;\n`;
        } else if (linkData[0]['properties']['shop'] == "radiotechnics") {
          keywords.push("radio");
          keywords.push("technics");
          this.turtle += `${tripleIdentifier} a ex:RadioTechnics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "coffee") {
          keywords.push("coffee");
          this.turtle += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "textile_printing") {
          keywords.push("textile");
          keywords.push("printing");
          this.turtle += `${tripleIdentifier} a ex:TextilePrinting ;\n`;
        } else if (linkData[0]['properties']['shop'] == "chemist") {
          keywords.push("chemist");
          keywords.push("chemistry");
          this.turtle += `${tripleIdentifier} a lgdo:chemist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "spices") {
          keywords.push("spices");
          this.turtle += `${tripleIdentifier} a ex:Spices ;\n`;
        } else if (linkData[0]['properties']['shop'] == "musical_instrument") {
          keywords.push("instrument");
          keywords.push("musical");
          keywords.push("music");
          this.turtle += `${tripleIdentifier} a km4c:Musical_instruments_and_scores ;\n`;
        } else if (linkData[0]['properties']['shop'] == "erotic") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "wine") {
          keywords.push("wine");
          this.turtle += `${tripleIdentifier} a lgdo:Wine ;\n`;
        } else if (linkData[0]['properties']['shop'] == "video") {
          keywords.push("video");
          this.turtle += `${tripleIdentifier} a lgdo:Video ;\n`;
        } else if (linkData[0]['properties']['shop'] == "mobile_phone") {
          keywords.push("mobilephone");
          keywords.push("phone");
          keywords.push("mobile");
          this.turtle += `${tripleIdentifier} a lgdo:mobilePhone ;\n`;
        } else if (linkData[0]['properties']['shop'] == "travel_agency") {
          keywords.push("travel");
          this.turtle += `${tripleIdentifier} a schema:TravelAgency ;\n`;
        } else if (linkData[0]['properties']['shop'] == "garden_centre") {
          keywords.push("garden");
          this.turtle += `${tripleIdentifier} a lgdo:GardenCentre ;\n`;
        } else if (linkData[0]['properties']['shop'] == "greengrocer") {
          keywords.push("greengrocer");
          this.turtle += `${tripleIdentifier} a lgdo:Greengrocer ;\n`;
        } else if (linkData[0]['properties']['shop'] == "skate") {
          keywords.push("skate");
          this.turtle += `${tripleIdentifier} a ex:SkateShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "sports") {
          keywords.push("sport");
          keywords.push("sports");
          this.turtle += `${tripleIdentifier} a lgdo:Sports ;\n`;
        } else if (linkData[0]['properties']['shop'] == "carpet") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "optician") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "nuts") {
          keywords.push("nut");
          keywords.push("nuts");
          this.turtle += `${tripleIdentifier} a ex:NutsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "laundry") {
          keywords.push("laundry");
          this.turtle += `${tripleIdentifier} a schema:DryCleaningOrLaundry ;\n`;
        } else if (linkData[0]['properties']['shop'] == "doityourself") {
          keywords.push("DIY");
          this.turtle += `${tripleIdentifier} a lgdo:Doityourself ;\n`;
        } else if (linkData[0]['properties']['shop'] == "brass_instruments") {
          keywords.push("brass");
          keywords.push("instruments");
          this.turtle += `${tripleIdentifier} a schema:brass_instruments ;\n`;
        } else if (linkData[0]['properties']['shop'] == "music") {
          keywords.push("music");
          this.turtle += `${tripleIdentifier} a schema:MusicStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "lottery") {
          keywords.push("lottery");
          keywords.push("luck");
          this.turtle += `${tripleIdentifier} a ex:Lottery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bathroom_furnishing") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "locksmith") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "general") {
          keywords.push("general");
          this.turtle += `${tripleIdentifier} a lgdo:General ;\n`;
        } else if (linkData[0]['properties']['shop'] == "funeral_directors") {
          // Niet relevant
          relevant = false;
        } else if (linkData[0]['properties']['shop'] == "houseware") {
          keywords.push("houseware");
          keywords.push("housewares");
          keywords.push("house");
          this.turtle += `${tripleIdentifier} a lgdo:housewares ;\n`;
        } else if (linkData[0]['properties']['shop'] == "kitchen") {
          keywords.push("kitchen");
          this.turtle += `${tripleIdentifier} a lgdo:KitchenShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wine; books") {
          keywords.push("wine");
          keywords.push("book");
          this.turtle += `${tripleIdentifier} a lgdo:BookShop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fashion") {
          keywords.push("fashion");
          this.turtle += `${tripleIdentifier} a lgdo:Fashion ;\n`;
        } else if (linkData[0]['properties']['shop'] == "e-cigarette") {
          keywords.push("cigarette");
          this.turtle += `${tripleIdentifier} a ex:E-Cigarette ;\n`;
        } else if (linkData[0]['properties']['shop'] == "yes") {
          this.turtle += `${tripleIdentifier} a schema:Store ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Store ;\n`;
        }
        //TOURISM
      } else if (linkData[0]['properties']['tourism']) {
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
          keywords.push("art");
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "guest_house") {
          keywords.push("guesthouse");
          keywords.push("guest");
          keywords.push("house");
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
        if (linkData[0]['properties']['leisure'] == "picnic_table") {
          keywords.push("picnic");
          keywords.push("table");
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "playground") {
          keywords.push("playground");
          this.turtle += `${tripleIdentifier} a schema:Playground ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "fitness_centre") {
          keywords.push("fitness");
          keywords.push("gym");
          this.turtle += `${tripleIdentifier} a lgdo:Gym ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sports_centre") {
          keywords.push("sport");
          keywords.push("sports");
          this.turtle += `${tripleIdentifier} a lgdo:SportsCentre ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "hackerspace") {
          keywords.push("hackerspace");
          keywords.push("hacker");
          keywords.push("hack");
          this.turtle += `${tripleIdentifier} a lgdo:Hackerspace ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "dance") {
          keywords.push("dance");
          keywords.push("dancing");
          this.turtle += `${tripleIdentifier} a lgdo:Dance ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "garden") {
          keywords.push("garden");
          this.turtle += `${tripleIdentifier} a lgdo:GardenCentre ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "amusement_arcade") {
          keywords.push("arcade");
          this.turtle += `${tripleIdentifier} a schema:AmusementPark ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "escape_game") {
          keywords.push("escape");
          keywords.push("game");
          this.turtle += `${tripleIdentifier} a ex:EscapeGame ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "pitch") {
          keywords.push("pitch");
          this.turtle += `${tripleIdentifier} a lgdo:Pitch ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sports_hall") {
          keywords.push("sportshall");
          this.turtle += `${tripleIdentifier} a ex:SportsHall ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sauna") {
          keywords.push("sauna");
          this.turtle += `${tripleIdentifier} a lgdo:Sauna ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "marina") {
          keywords.push("marina");
          keywords.push("boatyard");
          keywords.push("port");
          keywords.push("harbor");
          this.turtle += `${tripleIdentifier} a lgdo:Marina ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "swimming_pool") {
          keywords.push("swimming");
          keywords.push("pool");
          this.turtle += `${tripleIdentifier} a lgdo:SwimmingPool ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "fitness_station") {
          keywords.push("fitness");
          keywords.push("gym");
          this.turtle += `${tripleIdentifier} a ex:FitnessStation ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;

        }
        //HISTORIC
      } else if (linkData[0]['properties']['historic']) {
        if (linkData[0]['properties']['historic'] == "building") {
          keywords.push("building");
          this.turtle += `${tripleIdentifier} a lgdo:Building ;\n`;
        } else if (linkData[0]['properties']['historic'] == "memorial") {
          keywords.push("memorial");
          this.turtle += `${tripleIdentifier} a lgdo:Memorial ;\n`;
        } else if (linkData[0]['properties']['historic'] == "ruins") {
          keywords.push("ruins");
          keywords.push("ruin");
          this.turtle += `${tripleIdentifier} a lgdo:Ruins ;\n`;
        } else if (linkData[0]['properties']['historic'] == "wayside_cross") {
          keywords.push("cross");
          keywords.push("wayside");
          this.turtle += `${tripleIdentifier} a ex:WaysideCross ;\n`;
        } else if (linkData[0]['properties']['historic'] == "wayside_shrine") {
          keywords.push("shrine");
          this.turtle += `${tripleIdentifier} a dbp:Shrine ;\n`;
        } else if (linkData[0]['properties']['historic'] == "fort") {
          keywords.push("fort");
          this.turtle += `${tripleIdentifier} a lgdo:Fort ;\n`;
        } else if (linkData[0]['properties']['historic'] == "archaeological_site") {
          keywords.push("archaeological");
          keywords.push("archeology");
          this.turtle += `${tripleIdentifier} a lgdo:ArchaeologicalSite ;\n`;
        } else if (linkData[0]['properties']['historic'] == "monument") {
          keywords.push("monument");
          this.turtle += `${tripleIdentifier} a lgdo:Monument ;\n`;
        } else if (linkData[0]['properties']['historic'] == "industrial") {
          keywords.push("industrial");
          this.turtle += `${tripleIdentifier} a lgdo:IndustrialProductionBuilding ;\n`;
        } else if (linkData[0]['properties']['historic'] == "monastery") {
          keywords.push("monastery");
          this.turtle += `${tripleIdentifier} a lgdo:Monastery ;\n`;
        } else if (linkData[0]['properties']['historic'] == "yes") {
          this.turtle += `${tripleIdentifier} a lgdo:Place ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a lgdo:Place ;\n`;

        }
        //MEMORIAL
      } else if (linkData[0]['properties']['memorial']) {
        if (linkData[0]['properties']['memorial'] == "plaque") {
          keywords.push("plaque");
          this.turtle += `${tripleIdentifier} a ex:Plaque ;\n`;
        } else if (linkData[0]['properties']['memorial'] == "playground") {
          keywords.push("playground");
          this.turtle += `${tripleIdentifier} a schema:Playground ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a lgdo:Place ;\n`;
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
          for (let item of linkData[0]['properties']['cuisine'].split(';')) {
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
      keywords.forEach(t => keywordsSet.add(t));
      linkData.splice(0, 1);
    }
    this.data = Array.from(keywordsSet).sort();
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
