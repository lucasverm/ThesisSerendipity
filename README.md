# Serendipitous route planning in Ghent: a proof-of-concept using Linked Data
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/) [![Npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://https://npmjs.com/) [![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)


Met de voortdurende technologische evolutie en de groeiende beschikbaarheid van data wordt routeplanning voortdurend verbeterd en geoptimaliseerd. Traditionele routeplanningssystemen richten zich doorgaans op efficiëntie, waarbij de snelste of kortste route wordt berekend op basis van vooraf bepaalde criteria zoals afstand of reistijd. Er is echter een groeiende interesse in het verkennen van nieuwe benaderingen die verder gaan dan de conventionele optimalisatieprincipes. Serendipiteit is een concept dat verwijst naar het ontdekken van waardevolle of interessante zaken zonder specifieke intentie, maar met een open blik van de eindgebruiker. Door serendipiteit te integreren in routeplanning kan er een meerwaarde worden gecreëerd, waarbij het uitstippelen van routes de eindgebruiker in staat stelt om spontaan nieuwe plekken te ontdekken en mogelijk serendipiteit te ervaren. De combinatie van routeplanning en serendipiteit biedt een interessant perspectief om de reiservaring te verbeteren.

Dit onderzoek beoogt een proof-of-concept te ontwerpen voor een routeplanner gericht op serendipiteit, waarbij alternatieve routes worden voorgesteld aan eindgebruikers op basis van verzamelde linked data over locaties op het web. Linked data biedt een gestandaardiseerde manier om informatie met elkaar te verbinden op het web. Door linked data te integreren in een routeplanningssysteem kunnen verschillende relevante informatiebronnen worden geraadpleegd. Op deze manier kan een alternatieve route worden geconstrueerd die locaties omvat die mogelijk interessant zijn voor de eindgebruiker, gebaseerd op de gekozen eindbestemming. Het uiteindelijke doel van het onderzoek is het bevorderen van serendipiteit bij eindgebruikers tijdens het ontdekken van de voorgestelde locaties. De centrale onderzoeksvraag die wordt beantwoord luidt als volgt: 

> Kan er een applicatie worden gebouwd voor serendipiteit waarbij, aan de hand van linked data, aan routeplanning wordt gedaan?

## Getting Started: Angular
- npm install
- npm start
- http://localhost:4200/

## Demo
Laatste versie van de mastre branch wordt automatisch gepubliceerd op 
> https://lucas-vermeulen.netlify.app/

## Hergebruik applicatie
Dit platform kan worden hergebruikt om serendipiteit toe te voegen aan routeplanning. De methode om een route te berekenen en andere locaties te suggereren is op een zodanige manier geprogrammeerd dat ze gemakkelijk kan worden vervangen door een andere methode. De methode die in een aparte webworker wordt uitgevoerd, accepteert de graaf, een startpunt en een eindpunt als invoer en geeft een route als uitvoer. Elk algoritme dat in staat is om deze taak uit te voeren, kan als alternatief worden gebruikt en worden getest binnen deze applicatie. Bovendien kan de lijst van categorie correlatie gegevens worden gewijzigd in een andere lijst met aangepaste categorie correlaties, wat van invloed is op het vinden van het kortste pad. Tevens kan de volledige lijst van linked data van locaties worden vervangen om de applicatie te laten werken met andere locaties. Op deze manier kunnen de correlaties tussen categorieën worden aangepast en kan het aangepaste algoritme van Dijkstra gemakkelijk worden vervangen door een ander algoritme voor het vinden van de kortste route. De gecreëerde graaf kan ook worden hergebruikt. Het concept, de graaf en de beschreven vocabulaire zijn eenvoudig aanpasbaar en uitbreidbaar. 

## License 
Deze applicatie werd ontwikkeld als onderdeel van de masterproef van Lucas Vermeulen. Het is gelicentieerd onder de MIT-licentie. De data is afkomstig van © OpenStreetMap en beschikbaar gesteld onder de Open Database License.