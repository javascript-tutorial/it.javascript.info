# Codice ninja


```quote author="Confucio"
Imparare senza pensare è lavoro sprecata; pensare senza imparare è pericoloso.
```
I programmatori ninja in passato hanno usato queste tecniche per formare le menti dei manutentori del codice.

I guru della revisione dei codici le utilizzano per le attività di test.

I programmatori meno esperti le utilizzano anche meglio dei programmatori ninja.

Leggetele attentamente e cercate di capire a quale categoria appartenete -- ninja, novelli, o forse revisionisti di codice?


```warn header="Allarme ironia"
Molti hanno provato a seguire il percorso dei ninja. Pochi ci sono riusciti.
```


## La brevità è l'anima dell'intelligenza

Rendete il codice più breve possibile. Mostrerà quanto intelligenti siete.

Lasciate che le sottigliezze del linguaggio vi guidino.

Ad esempio, date un'occhiata all'operatore ternario `'?'`:

```js
// preso da una libreria javascript famosa
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Bello vero? Se scrivete cose del genere, uno sviluppatore che prova a leggere queste righe perderà molto tempo nel capire cosa rappresenta il valore `i`. Alla fine verrebbe da voi per cercare una risposta.

Insegnategli che la brevità è sempre la cosa migliore. Iniziatelo al percorso dei ninja.

## Variabili ad una lettera

```quote author="Laozi (Tao Te Ching)"
Il Dao si nasconde nel silenzio. Solo il Dao è completo.
```

<<<<<<< HEAD
Un altro metodo per programmare velocemente è utilizzare nomi di variabili a singola carattere ovunque. Come `a`, `b` o `c`.
=======
Another way to code shorter is to use single-letter variable names everywhere. Like `a`, `b` or `c`.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Una variabile molto breve sparirà nel codice come un vero ninja scompare nella foresta. Nessuno sarà in grado di ritrovarla, nemmeno utilizzando il tasto "cerca". E se qualcuno mai riuscirà a trovarla non "decifrerà" ma il vero significato di `a` o `b`.

...C'è però un'eccezione. Un vero ninja non utilizzerà mai `i` come contatore in un ciclo `"for"`. Ovunque, ma non qui. Si guarderà intorno, ci sono moltissime lettere esotiche. Ad esempio `x` o `y`.

Utilizzare una variabile esotica come contatore di un ciclo è ancora meglio se il corpo è grande 1-2 pagine (o anche di più). Quindi se qualcuno guarderà dentro, nella profondità del ciclo, non sarà in grado di capire che `x` è il contatore del ciclo.

## Variabili abbreviate

Se il regolamento del team vieta di utilizzare nomi vaghi o composti di una sola lettera -- allora accorciateli, inventate abbreviazioni.

Come questi:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

Solo una persona con un'ottima intuizione sarà in grado di capire questi nomi. Provate ad abbreviare tutto. Solo una persona degna sarà capace di sostenere il vostro codice.

## Libratevi in alto. Siate astratti.

```quote author="Laozi (Tao Te Ching)"
I quadrati migliori non hanno spigoli<br>
Le migliori navi sono le ultime complete,<br>
I grandi commenti raramente hanno un suono,<br>
Le migliori immagini non hanno forma.
```

Quando scegliete un nome cercare di utilizzare parole più astratte possibili. Come `obj`, `data`, `value`, `item`, `elem` e molte altre.

- **Il nome ideale per una variabile è `data`.** Usatela il più possibile. Infondo, tutte le variabili contengono *dati* giusto?

    ...Cosa fare se `data` è già stato utilizzato? Provate `value`, anche questo è un nome universale. Dopo tutto una variabile potrebbe avere un *valore*.

- **Denominate le variabili in base al loro tipo: `str`, `num`...**

    Dategli una possibilità. Un giovane iniziato potrebbe pensare -- sono veramente utili ad un ninja questi nomi? Infatti lo sono!

    Certamente il nome della variabile contiene comunque un significato. Infatti informa riguardo cosa è contenuto nella variabile: una stringa, un numero o qualcos'altro. Ma quando un estraneo cercherà di capire il codice, rimarrà sorpreso scoprendo che in realtà non forniscono alcuna informazione! Quindi fallirà nel suo intento di modificare il vostro codice.

    Il tipo del valore è semplice da trovare con un debugger. Ma qual'è il significato della variabile? Quale numero/stringa contiene?

    Non c'è alcun modo per scoprirlo senza un pò di meditazione!

- **...Cosa fare se non sono più disponibili questi nomi?** Aggiungete semplicemente un numero: `data1, item2, elem5`...

## Test di attenzione

Solo un vero programmatore dovrebbe essere in grado di capire il vostro codice. Ma come essere sicuri di questo?

**Una delle possibili strade -- usare nomi di variabili simili, come `date` e `data`.**

Mixateli anche insieme quando possibile.

Una rapida lettura di un codice del genere diventerà impossibile. E quando ci sarà un errore di battitura... Ummm... Avremo un pò di tempo per berci un buon tea.


## Sinonimi intelligenti

```quote author="Confucio"
La cosa più difficile al mondo è trovare un gatto nero in una stanza buia, specialmente se il gatto non c'è.
```

Utilizzare nomi *simili* per la *stessa* cosa rende la vita più interessante e mostra al pubblico la tua creatività.

Ad esempio, consideriamo i prefissi delle funzioni. Se una funzione mostra un messaggio sullo schermo -- potremmo iniziarla con `display…`, ad esempio `displayMessage`. Se poi un'altra funzione mostra sullo schermo qualcos altro, come uno username, potremmo iniziare con `show…` (ad esempio `showName`).

Facendo credere che ci sia una piccola differenza tra le due funzioni, quando invece non c'è.

Mettetevi d'accordo con gli altri ninja del team: se John inizia le funzioni di "showing" con  `display...`, allora Peter potrebbe usare `render..`, e Ann -- `paint...`. Il codice diventerebbe cosi molto misto e interessante.

...E ora il colpo finale!

Per due funzioni con differenze fondamentali -- utilizzate lo stesso prefisso!

Ad esempio la funzione `printPage(page)` che utilizzerà la stampante. E la funzione `printText(text)` che mostrerà un messaggio sullo schermo. Cosi un estraneo dovrà pensare bene ai nomi delle funzioni `printMessage`: "Dove verrà messo il messaggio? Nella stampante o sullo schermo? ". Per rendere il tutto ancora più bello `printMessage(message)` dovrebbe mostrare il messaggio in una nuova pagina!

## Riciclo dei nomi

```quote author="Laozi (Tao Te Ching)"
Quando l'intero è diviso, le parti<br>
necessitano di nomi.<br>
Ci sono già abbastanza nomi.<br>
Uno dovrebbe sapere quando fermarsi.
```

Aggiungere una nuova variabile solo quando è assolutamente necessaria.

Piuttosto utilizzate quelle già presenti. Semplicemente riscrivetele.

In una funzione conviene utilizzare solo variabili passate come parametri.

Questo renderà davvero difficile capire cosa c'è esattamente all'interno della variabile *in questo momento*. E anche da dove proviene. Una persona con una pessima intuizione sarà costretta ad analizzare il codice linea per linea e tracciare tutti i possibili flussi.

**Una variante avanzata è quella di sostituire di nascosto (!) i valori con qualcos'altro di simile nel bel mezzo di una ciclo o di una funzione.**

Ad esempio:

```js
function ninjaFunction(elem) {
  // 20 righe di codice che lavorano su elem

  elem = clone(elem);

  // altre 20 righe, che lavorano sul clone di elem!
}
```

Un programmatore esterno che vorrebbe provare ad interagire con `elem` nella seconda parte della funzione, rimarrà sorpreso... Solamente in fase di debugging , dopo aver esaminato attentamente il codice si renderà conto che stava lavorando con un clone!

Se ripetuto regolarmente nel codice, diventa letale anche contro i ninja più esperti. 

## Underscore per divertimento 

Inserite underscore `_` e `__` prima dei nomi delle variabili. Come `_name` o `__value`. Sarebbe bello sapere che solo tu ne conosci il significato. O meglio, aggiungeteli solo per divertimento, senza scopo. Oppure con differenti significati in posti diversi.

Prendereste due piccioni con una fava. Primo, il codice diventerebbe più lungo e meno leggibile, e secondo, uno sviluppatore poco scaltro ci perderà molto tempo prima di riuscire a metter le mani sul vostro codice.

Un ninja intelligente mette gli underscore in un solo punto del codice e li evita in altri. Questo aumenta la fragilità del codice e aumenta la possibilità di commettere errori.

## Mostrate il vostro amore

Mostrate a tutti quando siano belli i vostri elementi! Nomi come `superElement`, `megaFrame` e `niceItem` sicuramente cattureranno l'animo del lettore.

Infatti, utilizzerete dei bei nomi come: `super..`, `mega..`, `nice..` Ma in ogni caso non fornirete dettagli. Un lettore esterno potrebbe ragionare sui possibili significato perdendo una o due ore.


## Sovrascrittura delle variabili esterne

```quote author="Guan Yin Zi"
Quando sei nella luce, non puoi vedere niente nell'oscurità.<br>
Quando sei nell'oscurità, puoi vedere tutto nella luce.
```

Usare gli stessi nomi per le variabili interne ed esterne. E' semplice. Non sono richiesti ulteriori sforzi.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- un programmatore vorrebbe utilizzare user...
  ...
}
```

Un programmatore che si trova dentro `render` probabilmente non si accorgerà che la variabile locale `user` sta nascondendo quella esterna.

Quindi potrebbe provare a lavorare con `user` pensando erroneamente che sia quella esterna, quella con il risultato di `authenticateUser()`... La trappola è servita! Addio debugger...


## Side-effect ovunque!

Ci sono funzioni che sembrano non avere effetti. Come `isReady()`, `checkPermission()`, `findTags()`... Si presume che eseguano semplici calcoli, trovino e ritornino il dato, senza cambiare nulla all'esterno. In altre parole senza "side-effect".

**Un bellissima sorpresa potrebbe essere quella di aggiungere un azione "utile", oltre a quella principale.**

Un'espressione di stupore apparirà nel volto del vostro collega quando scoprirà che una funzione chiamata `is..`, `check..` o `find...` cambia qualcosa --  allargherete di molto i suoi confini di comprensione.

**Un altro modo per stupire è ritornare risultati non standard.**

Mostrate il vostro pensiero originale! Alla chiamata di `checkPermission`, invece che ritornare `true/false`, ritornate un oggetto complesso contenente il risultato del check.

Quindi degli sviluppatori che proveranno a scrivere `if (checkPermission(..))`, si chiederanno perché non funziona. Rispondete severamente: "Leggete la documentazione".


## Funzioni potenti!

```quote author="Laozi (Tao Te Ching)"
Il grande Tao fluisce ovunque,<br>
sia a sinistra che a destra.
```

Non limitate le funzioni a ciò che il loro nome esprime. Siate elastici.

Ad esempio, una funzione `validateEmail(email)` dovrebbe (dopo averne controllato la correttezza) mostrare un errore e chiedervi di reinserire la mail.

Azioni supplementari non dovrebbero risultare ovvie dal nome della funzione. Un vero programmatore ninja cerca di renderle il meno ovvie possibile.

**Unire più azioni in una protegge il vostro codice dal riutilizzo.**

Immaginate, un altro sviluppatore vuole solo verificare le email, e non mostrare alcun messaggio. La vostra funzione `validateEmail(email)` che svolge entrambi i compiti non fa al caso suo. Quindi non dovrà infastidirvi facendo domande, visto che non utilizzerà il vostro codice.

## Riepilogo

Tutti i "consigli" forniti sopra provengono da codici reali... Qualche volta scritti da programmatori con esperienza. Forse con più esperienza di voi ;)

- Seguite alcuni di questi consigli, e il vostro codice sarà pieno di sorprese.
- Seguitene molti, e il vostro codice diventerà veramente vostro, nessuno vorrà utilizzarlo.
- Seguitele tutte, ed il vostro codice sarà una guida spirituali per i giovani sviluppatori in cerca della luce.
