# Instructies Demo
_Dit project bevat een andere structuur, hier zijn meer componenten en bestanden bij elkaar geplaatst dan je gewend bent. Kijk hier eens doorheen en probeer dit te doorgronden. We hebben voor deze structuur gekozen om je wat meer verscheidenheid te bieden zodat je je eigen stijlvoorkeur kan ontwikkelen._

## Start
- Start je project met _ionic serve_ <br/>
- Je ziet nu een lege pagina, deze willen we natuurlijk vullen. We starten met een tabs component.
_Merk op dat in de app.component.ts aangegeven staat dat de tabs-pagina de rootpage is. Daarom zien we niets._

## Tabs toevoegen
1. Open de _/pages/tabs/tabs.html_
2. We willen hier 2 tabs toevoegen, 1 voor Assignments en 1 voor List.
3. Voeg in de html de root van de tabs toe (het id is voor als we deze ooit vanuit code willen aanspreken):
```html
<ion-tabs #myTabs>
</ion-tabs>
```
4. Daar tussen gaan we de tabs plaatsen, maar hier willen we eerst componenten voor hebben.
5. Open _/pages/tabs/tabs.ts_ en importeer de 2 benodigde paginas:
```typescript
import { AssignmentsPage } from '../assignments/assignments';
import { ListPage } from '../list/list';
``` 
6. Nu kunnen we 2 fields maken in deze klasse:
```typescript
assignmentsPage = AssignmentsPage;
listPage = ListPage;
```
7. In _/pages/tabs/tabs.html_ kunnen we nu binden op deze properties:
```html
<ion-tab [root]="assignmentsPage" tabTitle="Assignments" tabIcon="phone-portrait"></ion-tab>
<ion-tab [root]="listPage" tabTitle="List" tabIcon="list"></ion-tab>
```  
8. Je tabs werken nu!
9. Kijk op https://ionicframework.com/docs/api/components/tabs/Tabs/ om te zien wat je vanuit je typescript met deze tabs allemaal kan doen.
10. Navigeer naar de lijst in de tab en klik er vervolgens één aan.
11. Navigeer nu naar assignments en weer terug naar list
12. Merk op dat iedere tab dus zijn eigen navigation stack heeft! De history wordt per tab bewaard.

## Eenvoudige navigatie (de list pagina)
1. Zie in de item-details pagina (in je browser) dat onderaan twee knoppen zijn.
2. We willen naar het vorige en volgende item kunnen navigeren. <br />
De back button bovenin willen we altijd naar de lijst terug laten gaan.
3. Open _/pages/list/item-details.ts_ maak hier een methode goToNext en goToPrevious:
```typescript
goToNext() {
  this.navCtrl.push(ItemDetailsPage, { index: ++this.selectedIndex });
}

goToPrevious() {
  this.navCtrl.push(ItemDetailsPage, { index: --this.selectedIndex });
}
``` 
4. Open _/pages/list/item-details.html_ en voeg bij de buttons respectievelijk de next en previous call toe:
```html
(click)="goToPrevious()"
(click)="goToNext()"
```
5. Zie wat er nu gebeurt als je op de knoppen drukt. Deze animatie willen we natuurlijk mooier maken.<br />
Dit kunnen we bereiken door de animatie in te stellen. Dit is de 3e parameter van de push methode. Let er op dat je forward en back bij de juiste methodes zet!
```typescript
{ animate: true, animation: 'transition', duration: 500, direction: 'forward' }
```
6. Nu zien we de transitie netjes overgaan, maar wat gebeurt er als we linksboven op de button klikken? Dan ga je naar de vorige. Dat willen we niet!
7. Om terug naar de lijst te gaan moeten we die button overriden. Hiervoor moeten we de header selecteren en de button aanpassen.
8. Maak in _pages/list/item-details.ts_ een referentie naar je Navbar:
```typescript
@ViewChild(Navbar) navBar: Navbar;
```
9. Nu kunnen we net voordat de pagina geladen is deze methode overriden met onze eigen functie:
```typescript
ionViewDidEnter() {
  this.navBar.backButtonClick = () => this.navCtrl.goToRoot();
}
``` 
10. Je ziet dat we nu weer netjes terug naar de list gaan, ook als we eerder andere navigation items gehad hebben.
11. Om een shortcut te maken en meteen terug te kunnen zonder code kan je dit ook in een attribuut stoppen. <br/>
Open _pages/list/item-details.html_ en voeg de volgende button toe:
```html
<button ion-button navPop>Go Back</button>
```

## Popover (de assignment pagina)
1. We willen graag een kleine popover met de functies om assignments te kunnen toevoegen of verwijderen. Hier heeft Ionic al mooie implementaties voor.
2. Rechtsboven in de assignments pagina zien we al 3 mooie bolletjes klaarstaan. Deze roepen de functie presentPopover($event) aan.
3. Bekijk _/pages/assignments/assignments.ts_ en vind de //TODO.
4. In deze functie willen we een popover tonen, daarvoor importeren we eerst de PopoverController:
```typescript
// Of voeg deze toe aan de al geïmporteerde controllers.
import { PopoverController } from 'ionic-angular';
```
5. We laten deze natuurlijk injecteren in de constructor:
```typescript
constructor(
/* other injections, */
public popoverCtrl: PopoverController
)
```
6. We kunnen nu de popover met onze 'pagina' tonen in de todo:<br/>
Let er op dat je je event goed meegeeft, dit zorgt er voor dat hij op de juiste positie komt.
```typescript
let popover = this.popoverCtrl.create(PopoverPage /* , optional: data */);
popover.present({ ev: $event });
```
7. Je zal zien dat de popover nu al werkt, je kan een hardcoded item toevoegen en geselecteerde items verwijderen.
8. Om hem weer te sluiten moet je naar _/pages/assignments/popover.ts_, importeer daar de ViewController, laat hem injecteren en zorg er voor dat hij je popover dismisst:
```typescript
import { ..., ViewController } from 'ionic-angular';

constructor(public viewCtrl: ViewController, ...){ }

addAssignment() {
  ...
  this.viewCtrl.dismiss();
}

removeAllSelected() {
  ...
  this.viewCtrl.dismiss();
}
``` 
9. Om meer over de PopoverController te bekijken zie https://ionicframework.com/docs/api/components/popover/PopoverController/

## Alerts
We gaan het toevoegen van een assignment dynamisch maken en we gaan een 'weet u het zeker' maken voor het verwijderen van assignments.

1. Open _/pages/assignments/popover.ts_ en importeer de AlertController:
```typescript
import { ..., AlertController } from 'ionic-angular';

constructor(public alertCtrl: AlertController, ...){ }
```
2. Maak in _removeAllSelected_ een alert aan met een mooie titel en buttons:<br/>
Let er op dat je hem present() en dat je niet vergeet om je viewCtrl nog steeds te dismissen.<br />
Nu krijg je een mooie alert, maar er gebeurt niets meer... 
```typescript
removeAllSelected() {
  let alert = this.alertCtrl.create({
    title: 'Remove all checked?',
    message: 'Remove all checked assignments? This cannot be undone.',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      { text: 'Delete', role: 'delete' }
    ]
  });
  alert.present();
  this.viewCtrl.dismiss();
}
```
3. Daarom gaan we nu een handler aan de delete button hangen en hij werkt weer!
```typescript
// Voeg toe aan het object van de Delete button:
handler: () => { 
  this.assignmentsProvider.removeUncheckedAssignments();
}
```
4. Voor de _addAssignment_ doen we iets soortgelijks:
```typescript
let alert = this.alertCtrl.create({
  title: 'Add assignment',
  buttons: [
    { text: 'Cancel', role: 'cancel' },
    {
      text: 'Add', handler: data => {
        // TODO: Je actie uitvoeren
      }
    }
  ]
});
alert.present();
this.viewCtrl.dismiss();
```
5. Echter hebben we nu ook input nodig, voeg daarom voor de buttons toe:
```typescript
inputs: [
  { name: 'title', placeholder: 'Title' },
  { name: 'content', placeholder: 'Content' }
]
```
6. We kunnen nu de juiste aanroep naar de provider doen, we krijgen het binnen via het data object:
```typescript
{
  text: 'Add', handler: data => {
    this.assignmentsProvider.addAssignment(data.title, data.content);
  }
}
```
7. Om meer over de AlertController te bekijken zie https://ionicframework.com/docs/api/components/alert/AlertController/

# Meer weten?
Er zijn natuurlijk nog veel meer navigational items.<br/>
Kijk op https://ionicframework.com/docs/components/ voor de UI-componenten.  
Kijk op https://ionicframework.com/docs/api/ voor de programmeerbare componenten.
