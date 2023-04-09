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
    this.turtle += "@prefix ex: <http://example.org/> . \n";
    this.turtle += "@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>.\n";
    let linkData: any[] = [...this.data]
    while (linkData.length != 0) {
      Object.keys(linkData[0]['properties']).forEach(t => sleutels.add(t));
      let idZonderNode: String = String(linkData[0]['id']).replace("node/", "");
      let tripleIdentifier = `<ex/${idZonderNode}>`;
      //amenity
      if (linkData[0]['properties']['amenity']) {
        if (linkData[0]['properties']['amenity'] == "restaurant") {
          this.turtle += `${tripleIdentifier} a schema:Restaurant ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "fast_food") {
          this.turtle += `${tripleIdentifier} a schema:FastFoodRestaurant ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "cafe") {
          this.turtle += `${tripleIdentifier} a schema:CafeOrCoffeeShop ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "bar") {
          this.turtle += `${tripleIdentifier} a schema:BarOrPub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "pub") {
          this.turtle += `${tripleIdentifier} a schema:BarOrPub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "ice_cream") {
          this.turtle += `${tripleIdentifier} a schema:IceCreamShop ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "nightclub") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:nightclub ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "theatre") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:theatre ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "events_venue") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:events_venue ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "community_centre") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:community_centre ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "studio") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:studio ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "cinema") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:cinema ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "fountain") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:fountain ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "public_bookcase") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:public_bookcase ;\n`;
        } else if (linkData[0]['properties']['amenity'] == "social_centre") {
          //todo
          this.turtle += `${tripleIdentifier} a schema:social_centre ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;

        }
        //SHOP
      } else if (linkData[0]['properties']['shop']) {
        if (linkData[0]['properties']['shop'] == "bicycle") {
          this.turtle += `${tripleIdentifier} a schema:BikeStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bakery") {
          this.turtle += `${tripleIdentifier} a schema:Bakery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "convenience") {
          this.turtle += `${tripleIdentifier} a schema:ConvenienceStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "deli") {
          this.turtle += `${tripleIdentifier} a schema:HomeGoodsStore ;\n`;
        } else if (linkData[0]['properties']['shop'] == "tattoo") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:Store ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hairdresser") {
          this.turtle += `${tripleIdentifier} a schema:HairSalon ;\n`;
        } else if (linkData[0]['properties']['shop'] == "medical_supply") {
          this.turtle += `${tripleIdentifier} a schema:medical_supply ;\n`;
        } else if (linkData[0]['properties']['shop'] == "antiques") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:antiques ;\n`;
        } else if (linkData[0]['properties']['shop'] == "window_blind") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:window_blind ;\n`;
        } else if (linkData[0]['properties']['shop'] == "second_hand") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:second_hand ;\n`;
        } else if (linkData[0]['properties']['shop'] == "telecommunication") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:telecommunication ;\n`;
        } else if (linkData[0]['properties']['shop'] == "motorcycle") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:motorcycle ;\n`;
        } else if (linkData[0]['properties']['shop'] == "pet") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:pet ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car_repair") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:car_repair ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hifi") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:hifi ;\n`;
        } else if (linkData[0]['properties']['shop'] == "massage") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:massage ;\n`;
        } else if (linkData[0]['properties']['shop'] == "beverages") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:beverages ;\n`;
        } else if (linkData[0]['properties']['shop'] == "appliance") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:appliance ;\n`;
        } else if (linkData[0]['properties']['shop'] == "photo") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:photo ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bag") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:bag ;\n`;
        } else if (linkData[0]['properties']['shop'] == "party") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:party ;\n`;
        } else if (linkData[0]['properties']['shop'] == "seafood") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:seafood ;\n`;
        } else if (linkData[0]['properties']['shop'] == "craft") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:craft ;\n`;
        } else if (linkData[0]['properties']['shop'] == "kiosk") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:kiosk ;\n`;
        } else if (linkData[0]['properties']['shop'] == "video_games") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:video_games ;\n`;
        } else if (linkData[0]['properties']['shop'] == "toys") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:toys ;\n`;
        } else if (linkData[0]['properties']['shop'] == "mall") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:mall ;\n`;
        } else if (linkData[0]['properties']['shop'] == "ticket") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:ticket ;\n`;
        } else if (linkData[0]['properties']['shop'] == "juice") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:juice ;\n`;
        } else if (linkData[0]['properties']['shop'] == "perfumery") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:perfumery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "computer") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:computer ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hearing_aids") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:hearing_aids ;\n`;
        } else if (linkData[0]['properties']['shop'] == "interior_decoration") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:interior_decoration ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bookmaker") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:bookmaker ;\n`;
        } else if (linkData[0]['properties']['shop'] == "hardware") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:hardware ;\n`;
        } else if (linkData[0]['properties']['shop'] == "florist") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:florist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "art") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:art ;\n`;
        } else if (linkData[0]['properties']['shop'] == "baby_goods") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:baby_goods ;\n`;
        } else if (linkData[0]['properties']['shop'] == "games") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:games ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:car ;\n`;
        } else if (linkData[0]['properties']['shop'] == "variety_store") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:variety_store ;\n`;
        } else if (linkData[0]['properties']['shop'] == "department_store") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:department_store ;\n`;
        } else if (linkData[0]['properties']['shop'] == "confectionery") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:confectionery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "pastry") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:confectionery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "stationery") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:stationery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "clothes") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:clothes ;\n`;
        } else if (linkData[0]['properties']['shop'] == "shoes") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:shoes ;\n`;
        } else if (linkData[0]['properties']['shop'] == "health_food") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:health_food ;\n`;
        } else if (linkData[0]['properties']['shop'] == "supermarket") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:supermarket ;\n`;
        } else if (linkData[0]['properties']['shop'] == "chocolate") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:chocolate ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fashion_accessories") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:fashion_accessories ;\n`;
        } else if (linkData[0]['properties']['shop'] == "herbalist") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:herbalist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "jewelry") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:jewelry ;\n`;
        } else if (linkData[0]['properties']['shop'] == "outdoor") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:outdoor ;\n`;
        } else if (linkData[0]['properties']['shop'] == "furniture") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:furniture ;\n`;
        } else if (linkData[0]['properties']['shop'] == "electronics") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:electronics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "gift") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:gift ;\n`;
        } else if (linkData[0]['properties']['shop'] == "alcohol") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:alcohol ;\n`;
        } else if (linkData[0]['properties']['shop'] == "paint") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:paint ;\n`;
        } else if (linkData[0]['properties']['shop'] == "butcher") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:butcher ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bed") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:bed ;\n`;
        } else if (linkData[0]['properties']['shop'] == "beauty") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:beauty ;\n`;
        } else if (linkData[0]['properties']['shop'] == "cosmetics") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:cosmetics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "tailor") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:tailor ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fabric") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:fabric ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wholesale") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:wholesale ;\n`;
        } else if (linkData[0]['properties']['shop'] == "newsagent") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:newsagent ;\n`;
        } else if (linkData[0]['properties']['shop'] == "leather") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:leather ;\n`;
        } else if (linkData[0]['properties']['shop'] == "car_parts") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:car_parts ;\n`;
        } else if (linkData[0]['properties']['shop'] == "copyshop") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:copyshop ;\n`;
        } else if (linkData[0]['properties']['shop'] == "books") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:books ;\n`;
        } else if (linkData[0]['properties']['shop'] == "charity") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:charity ;\n`;
        } else if (linkData[0]['properties']['shop'] == "radiotechnics") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:radiotechnics ;\n`;
        } else if (linkData[0]['properties']['shop'] == "coffee") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:coffee ;\n`;
        } else if (linkData[0]['properties']['shop'] == "textile_printing") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:textile_printing ;\n`;
        } else if (linkData[0]['properties']['shop'] == "chemist") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:chemist ;\n`;
        } else if (linkData[0]['properties']['shop'] == "spices") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:spices ;\n`;
        } else if (linkData[0]['properties']['shop'] == "musical_instrument") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:musical_instrument ;\n`;
        } else if (linkData[0]['properties']['shop'] == "erotic") {
          //TODO  !!??!!
          this.turtle += `${tripleIdentifier} a schema:erotic ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wine") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:wine ;\n`;
        } else if (linkData[0]['properties']['shop'] == "video") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:video ;\n`;
        } else if (linkData[0]['properties']['shop'] == "mobile_phone") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:mobile_phone ;\n`;
        } else if (linkData[0]['properties']['shop'] == "travel_agency") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:travel_agency ;\n`;
        } else if (linkData[0]['properties']['shop'] == "garden_centre") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:garden_centre ;\n`;
        } else if (linkData[0]['properties']['shop'] == "greengrocer") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:greengrocer ;\n`;
        } else if (linkData[0]['properties']['shop'] == "skate") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:skate ;\n`;
        } else if (linkData[0]['properties']['shop'] == "sports") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:sports ;\n`;
        } else if (linkData[0]['properties']['shop'] == "carpet") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:carpet ;\n`;
        } else if (linkData[0]['properties']['shop'] == "optician") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:optician ;\n`;
        } else if (linkData[0]['properties']['shop'] == "nuts") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:nuts ;\n`;
        } else if (linkData[0]['properties']['shop'] == "laundry") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:laundry ;\n`;
        } else if (linkData[0]['properties']['shop'] == "doityourself") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:doityourself ;\n`;
        } else if (linkData[0]['properties']['shop'] == "brass_instruments") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:brass_instruments ;\n`;
        } else if (linkData[0]['properties']['shop'] == "music") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:music ;\n`;
        } else if (linkData[0]['properties']['shop'] == "lottery") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:lottery ;\n`;
        } else if (linkData[0]['properties']['shop'] == "bathroom_furnishing") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:bathroom_furnishing ;\n`;
        } else if (linkData[0]['properties']['shop'] == "locksmith") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:locksmith ;\n`;
        } else if (linkData[0]['properties']['shop'] == "general") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:general ;\n`;
        } else if (linkData[0]['properties']['shop'] == "funeral_directors") {
          //TODO !!??!!
          this.turtle += `${tripleIdentifier} a schema:funeral_directors ;\n`;
        } else if (linkData[0]['properties']['shop'] == "houseware") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:houseware ;\n`;
        } else if (linkData[0]['properties']['shop'] == "kitchen") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:kitchen ;\n`;
        } else if (linkData[0]['properties']['shop'] == "wine; books") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:wine ;\n`;
        } else if (linkData[0]['properties']['shop'] == "fashion") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:fashion ;\n`;
        } else if (linkData[0]['properties']['shop'] == "e-cigarette") {
          //TODO 
          this.turtle += `${tripleIdentifier} a schema:e-cigarette ;\n`;
        } else if (linkData[0]['properties']['shop'] == "yes") {
          this.turtle += `${tripleIdentifier} a schema:Store ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Store ;\n`;
        }
        //TOURISM
      } else if (linkData[0]['properties']['tourism']) {
        if (linkData[0]['properties']['tourism'] == "hotel") {
          this.turtle += `${tripleIdentifier} a schema:Hotel ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "museum") {
          this.turtle += `${tripleIdentifier} a schema:Museum ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "hostel") {
          this.turtle += `${tripleIdentifier} a schema:hostel ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "gallery") {
          this.turtle += `${tripleIdentifier} a schema:gallery ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "attraction") {
          this.turtle += `${tripleIdentifier} a schema:TouristAttraction ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "artwork") {
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:VisualArtwork ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "guest_house") {
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:Accommodation ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "apartment") {
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:Apartment ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "information") {
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:TouristInformationCenter ;\n`;
        } else if (linkData[0]['properties']['tourism'] == "viewpoint") {
          //OPZOEKEN OP SITE
          this.turtle += `${tripleIdentifier} a schema:viewpoint ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:TouristDestination ;\n`;

        }

        //leisure
      } else if (linkData[0]['properties']['leisure']) {
        if (linkData[0]['properties']['leisure'] == "picnic_table") {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "playground") {
          this.turtle += `${tripleIdentifier} a schema:Playground ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "fitness_centre") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:fitness_centre ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sports_centre") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:sports_centre ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "hackerspace") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:hackerspace ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "dance") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:dance ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "garden") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:garden ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "amusement_arcade") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:amusement_arcade ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "escape_game") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:escape_game ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "pitch") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:pitch ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sports_hall") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:sports_hall ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "sauna") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:sauna ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "marina") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:marina ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "swimming_pool") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:swimming_pool ;\n`;
        } else if (linkData[0]['properties']['leisure'] == "fitness_station") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:fitness_station ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;

        }
        //HISTORIC
      } else if (linkData[0]['properties']['historic']) {
        if (linkData[0]['properties']['historic'] == "building") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:Building ;\n`;
        } else if (linkData[0]['properties']['historic'] == "memorial") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:memorial ;\n`;
        } else if (linkData[0]['properties']['historic'] == "ruins") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:ruins ;\n`;
        } else if (linkData[0]['properties']['historic'] == "wayside_cross") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:wayside_cross ;\n`;
        } else if (linkData[0]['properties']['historic'] == "wayside_shrine") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:"wayside_shrine" ;\n`;
        } else if (linkData[0]['properties']['historic'] == "fort") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:fort ;\n`;
        } else if (linkData[0]['properties']['historic'] == "archaeological_site") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:archaeological_site ;\n`;
        } else if (linkData[0]['properties']['historic'] == "monument") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:monument ;\n`;
        } else if (linkData[0]['properties']['historic'] == "industrial") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:industrial ;\n`;
        } else if (linkData[0]['properties']['historic'] == "monastery") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:monastery ;\n`;
        } else if (linkData[0]['properties']['historic'] == "yes") {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;
        } else {
          this.turtle += `${tripleIdentifier} a schema:Place ;\n`;

        }
        //MEMORIAL
      } else if (linkData[0]['properties']['memorial']) {
        if (linkData[0]['properties']['memorial'] == "plaque") {
          //TODO
          this.turtle += `${tripleIdentifier} a schema:plaque ;\n`;
        } else if (linkData[0]['properties']['memorial'] == "playground") {
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
      if (linkData[0]['geometry']) {
        this.turtle += `\tschema:geo [ 
          \ta geo:Point ;
          \tgeo:lat "${linkData[0]['geometry']['coordinates'][0]}" ;
          \tgeo:long "${linkData[0]['geometry']['coordinates'][1]}" ;
        ] . \n`;
      }

      /*for (let j = 0; j < linkData.length; j++) {
        if (linkData[0]['id'] != linkData[j]['id']) {
          this.turtle += `\t afstand van ${linkData[0]['properties']['name']} naar ${linkData[j]['properties']['name']}:  ${this.calculateBirdFlightDistanceBetween(linkData[0]['geometry']['coordinates'][0], linkData[0]['geometry']['coordinates'][1], linkData[j]['geometry']['coordinates'][0], linkData[j]['geometry']['coordinates'][1])} \n`;
        }
      }*/
      linkData.splice(0, 1);
    }
    console.log(Array.from(sleutels).sort());
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



}
