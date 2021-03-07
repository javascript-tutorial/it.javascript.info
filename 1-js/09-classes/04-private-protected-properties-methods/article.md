
# Proprietà e metodi privati e protetti

Uno dei concetti più importanti della programmazione ad oggetti -- l'incapsulamento, ovvero la delimitazione delle interfacce interne da quelle esterne.

Questa pratica è un "must" nello sviluppo di una qualsiasi applicazione che sia più complessa di "hello world" .

Per comprenderla, usciamo dal mondo dello sviluppo e guardiamo al mondo reale.

Solitamente, i dispositivi che utilizziamo sono piuttosto complessi. Poter delimitare la loro interfaccia interna da quella esterna, ci consente di utilizzarli senza grossi problemi.

## Un esempio del mondo reale

Ad esempio, una macchina del caffè. Semplice all'esterno: un bottone, un dispaly, un paio di fori... E, ovviamente, il risultato -- un ottimo caffè! :)

![](coffee.jpg)

Ma internamente... (una rappresentazione dei suoi componenti)

![](coffee-inside.jpg)

Ci sono molti dettagli. Ma riusciamo comunque ad utilizzarla anche senza conoscerli.

Le macchine del caffè sono piuttosto affidabili, giusto? Possono durare per anni, e solamente nel caso in cui qualcosa smetta di funzionare -- le portiamo a riparare.

Il segreto dietro all'affidabilità e alla semplicità di una macchina del caffè -- tutti i dettagli sono ottimizzati e *nascosti*.

Se rimuovessimo la copertura della macchina del caffè, allora il suo utilizzo sarebbe molto più complesso (dove dovremmo premere?), e pericoloso (potremmo prendere la scossa).

Come vedremo in seguito, nella programmazione gli oggetti sono come le macchine del caffè.

Ma per poter nascondere i loro dettagli interni, non utilizzeremo una copertura di sicurezza, ma piuttosto una speciale sintassi del linguaggio ed alcune convenzioni.

## Interfaccia interna ed esterna

Nella programmazione orientata agli oggetti, le proprietà ed i metodi sono divisi in due gruppi:

- *Interfaccia interna* -- metodi e proprietà, accessibili dagli altri metodi della classe, ma non dall'esterno.
- *Interfaccia esterna* -- metodi e proprietà, accessibili dall'esterno della classe.

Continuando con l'analogia della macchina del caffè -- ciò che è nascosto internamente: una pompa, un meccanismo di riscaldamento e così via -- è la sua interfaccia interna.

L'interfaccia interna viene utilizzata per far funzionare l'oggetto, ogni dettaglio viene utilizzato da altri elementi. Ad esempio, la pompa è collegata al meccanismo di riscaldamento.

Ma vista dall'esterno, la macchina del caffe è protetta da una copertura, in modo che nessuno possa accedervi. I dettagli sono nascosti ed inaccesibili. Possiamo sfruttarne le caratteristiche tramite la sua interfaccia esterna.

Quindi, tutto ciò di cui abbiamo bisogno per utilizzare un oggetto è la sua interfaccia esterna. Potremmo essere completamente inconsapevoli del suo funzionamento interno; e ciò andrebbe bene.

Questa era un'introduzione generale.

In JavaScript, esistono due tipi di campi per un oggetto (proprietà e metodi):

- Pubblici: accessibili ovunque. Questi ne definiscono l'interfaccia esterna. Finora abbiamo sempre utilizzato proprietà e metodi pubblici.
- Privati: accessibili solamente dall'interno della classe. Questi ne definiscono l'interfaccia interna.

In molti altri linguaggi di programmazione esiste anche il concetto di campo "protected" (protetto): accessibile solamente dall'interno della classe e da quelle che la estendono (come i campi privati, ma in aggiunta sono accessibili anche dalle classi che ereditano). Questi sono altrettanto utili per la definizione dell'interfaccia interna. Generalmente sono più diffusi dei campi privati, poiché solitamente la nostra intenzione è quella di renderli accessibili anche nelle sotto-classi.

I campi protetti non sono implementati in JavaScript a livello del linguaggio, ma nella pratica risultano essere molto comodi, per questo vengono spesso emulati.

Ora costruiremo una macchina del caffè in JavaScript, con tutti i tipi di proprietà descritti. Una macchina del caffè è composta da molti dettagli; non la modelleremo per intero, in modo da mantenere l'esempio semplice (anche se potremmo).

## Protecting "waterAmount"

Come prima cosa creiamo una semplice classe per modellare una macchina del caffè:

```js run
class CoffeeMachine {
  waterAmount = 0; // la quantità di acqua contenuta

  constructor(power) {
    this.power = power;
    alert( `Created a coffee-machine, power: ${power}` );
  }

}

// creiamo la macchina del caffè
let coffeeMachine = new CoffeeMachine(100);

// aggiungiamo acqua
coffeeMachine.waterAmount = 200;
```

Attualmente le proprietà `waterAmount` e `power`  sono pubbliche. Possiamo leggerle/modificarle dall'esterno con un qualsiasi valore.

Proviamo a modificare la proprietà `waterAmount` rendendola protetta, in modo da avere un maggior controllo su di essa. Ad esempio, non vorremmo che qualcuno possa impostarla con un valore negativo.

**Le proprietà protette, solitamente, vengono prefissate con un underscore `_`.**

Questa non è una forzatura del linguaggio, ma piuttosto una convenzione diffusa tra i programmatori, che specifica che queste proprietà e metodi non dovrebbero essere accessibili dall'esterno.

Quindi la nostra proprietà diventa `_waterAmount`:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// creiamo la macchina del caffè
let coffeeMachine = new CoffeeMachine(100);

// aggiungiamo acqua
coffeeMachine.waterAmount = -10; // Errore: valore dell'acqua negativo 
```

Ora l'accesso è sotto controllo, quindi non è più possibile impostare la quantità d'acqua ad un valore negativo.

## Read-only "power"

Proviamo a rendere la proprietà `power` come read-only (sola lettura). In alcuni casi, potremmo aver bisogno di definire una proprietà in fase di costruzione, e non volerla più modificare in seguito.

Questo è esattamente il caso per un macchina del caffè: la potenza non può variare.

Per farlo, possiamo semplicemente definire un getter, e nessun setter:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// creiamo la macchina del caffè
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Errore (nessun setter)
```

````smart header="Le funzioni getter/setter"
Qui abbiamo utilizzato la sintassi getter/setter.

Ma nella maggior parte dei casi, le funzioni `get.../set...` si preferisce definirle in questo modo:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

Potrebbe sembrare leggermente più lungo, ma l'utilizzo di funzioni li rende più flessibili. Possono accettare più argomenti (anche se per ora non ne abbiamo bisogno).

D'altra parte però, la sintassi get/set è più breve. In definitiva, non esiste una vera e propria regola, sta a voi decidere.
````

```smart header="I campi protetti vengono ereditati"
Se ereditiamo `class MegaMachine extends CoffeeMachine`, allora nulla ci vieterà di accedere a `this._waterAmount` o `this._power` dai metodi nella nuova classe.

Quindi, i metodi protetti vengono ereditati. A differenza di quelli privati, che vederemo tra poco.
```

## Private "#waterLimit"

[recent browser=none]

Esiste una proposta JavaScript, quasi standard, che fornisce il supporto per le proprietà ed i metodi privati.

I campi privati dovrebbero essere preceduti da `#`. Questi saranno accessibili solamente dall'interno della classe.

Ad esempio, qui abbiamo una proprietà privata `#waterLimit` e un metodo privato per il controllo del livello dell'acqua `#checkWater`:

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// non possiamo accedere ai metodi privati dall'esterno della classe
coffeeMachine.#fixWaterAmount(123); // Errore
coffeeMachine.#waterLimit = 1000; // Errore
*/!*
```

A livello di linguaggio, `#` è un carattere speciale per indicare che quel campo è privato. Non possiamo quindi accedervi dall'esterno o da una sotto-classe.

Inoltre i campi privati non entrano in conflitto con quelli pubblici. Possiamo avere sia un campo privato `#waterAmount` che uno pubblico `waterAmount`.

Ad esempio, facciamo sì che `waterAmount` sia una proprietà per accedere a `#waterAmount`:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Errore
```

A differenza di quelli protetti, i campi privati sono forzati dal linguaggio stesso. E questa è una buona cosa.

Nel caso in cui stessimo ereditando da `CoffeeMachine`, allora non avremmo accesso diretto a `#waterAmount`. Dovremmo affidarci al getter/setter `waterAmount`:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Errore: è possibile accedervi solamente da CoffeeMachine
*/!*
  }
}
```

In molti casi, una limitazione del genere è troppo severa. Se estendiamo una `CoffeeMachine`, potremmo giustamente voler accedere ai suoi campi interni. Questo è il motivo per cui i campi protetti vengono usati più spesso, anche se non sono realmente supportati dalla sintassi del  linguaggio.

````warn header="I campi privati non sono accessibili come this[name]"
I campi privati sono speciali.

Come sappiamo, solitamente possiamo accedere ai campi utilizzando `this[name]`:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

Con i campi privati questo è impossibile: `this['#name']` non funzionerebbe. Questa è una limitazione sintattica per garantire la privacy.
````

## Riepilogo

In termini di OOP (Programmazione Orientata agli Oggetti), la delimitazione dell'interfaccia interna da quella esterna si chiama [incapsulamento](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).

Fornisce diversi vantaggi:

Protezione per gli utenti, in modo che questi non possano spararsi ai piedi
: Immaginiamo un team di sviluppatori che utilizzano una macchina del caffè costruita dall'azienda "Best CoffeeMachine", che funziona correttamente, ma la cui protezione viene rimossa. In questo modo, la sua interfaccia interna viene esposta.

    Tutti gli sviluppatori sono civilizzati -- utilizzano la macchina del caffè come previsto. Ma uno di loro, John, che crede di essere il più intelligente, effettua alcune modifiche alla macchina. Che si rompe due giorni dopo.

    Questa non è sicuramente colpa di John, ma piuttosto della persona che ha rimosso la protezione e ha permesso a John di manometterla.

    Lo stesso vale nella programmazione. Se un utente prova a cambiare campi che non dovrebbero essere modificati dall'esterno -- le conseguenze sono imprevedibili.

Sostenibile
: La situazione, nella programmazione, è più complessa rispetto ad una macchina del caffe, poiché non la compriamo solamente una volta. Il codice è costantemente sotto sviluppo e miglioramenti.

    **Se limitiamo l'accesso all'interfaccia interna, allora lo sviluppatore della classe ha la possibilità di modificarla, anche senza dover informare gli utenti.**

    Se sei lo sviluppatore di una classe di questo tipo, è ottimo sapere che i metodi privati possono essere rinominati in totale sicurezza; i parametri possono essere modificati, o addirittura rimossi, poiché nessun codice esterno dipende da questi.

    Per gli utenti, quando esce una nuova versione, questa potrebbe essere cambiata completamente al suo interno, ma l'aggiornamento rimane comunque un'operazione semplice se la sua interfaccia esterna è rimasta la stessa.

Nasconde la complessità
: Le persone adorano utilizzare cose semplici. Almeno esternamente. Ciò che è interno è una questione diversa.

    I programmatori non fanno eccezione.

    **E' sempre molto conveniente quando i dettagli dell'implementazione sono nascosti. Una semplice documentazione dell'interfaccia esterna è molto più comoda.**

Per nasconde i componenti interni di un interfaccia posiamo utilizzare le proprietà protette o private:

- I campi protetti vengono preceduti da `_`. Questa è una convenzione piuttosto diffusa, non forzata a livello di linguaggio. I programmatori dovrebbero sempre accedere ai campi preceduti da `_` solamente dalla classe o dalle sue sotto-clasi.
- I campi privati vengono preceduti da `#`. JavaScript si assicura che questi siano accessibili solamente dalla loro classe.

Attualmente, i campi privati non sono completamente supportati dai browser, ma esistono dei polyfill.
