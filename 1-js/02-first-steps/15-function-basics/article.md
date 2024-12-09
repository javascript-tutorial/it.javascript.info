# Funzioni

Molto spesso abbiamo la necessità di eseguire azioni simili in diverse parti dello script.

Ad esempio, vogliamo mostrare un messaggio quando un utente effettua il login/logout o per qualsiasi altro motivo.

Le funzioni sono le "fondamenta" di un programma. Consentono a un codice di essere utilizzato più volte, evitando ripetizioni.

Abbiamo già visto esempi di funzioni integrate nel linguaggio, come `alert(message)`, `prompt(message, default)` e `confirm(question)`. Ma possiamo benissimo anche creare delle nostre funzioni personali.

## Dichiarazione di Funzione

Per creare una funzione dobbiamo utilizzare una *dichiarazione di funzione*.

Che appare cosi:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

La parola chiave `function` va posta all'inizio; viene seguita dal *nome della funzione*, poi c'è una lista di *parametri*, racchiusi tra parentesi (separati da virgola, in questo esempio la lista è vuota, vedremo un esempio più avanti) e infine il codice della funzione, chiamato anche "corpo della funzione", racchiuso tra parentesi graffe.

```js
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

La nostra nuova funzione può essere chiamata tramite il suo nome: `showMessage()`.

Ad esempio:

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

La chiamata `showMessage()` esegue il codice dentro la funzione. Qui vedremo il messaggio due volte.

Questo esempio mostra chiaramente uno dei principali scopi delle funzioni: evitare le ripetizioni di un codice.

Se avremo la necessità di cambiare il messaggio o il modo in cui viene mostrato, sarà sufficiente modificare il codice in un solo punto: la funzione che lo implementa.

## Variabili locali 

Una variabile dichiarata all'interno di una funzione è visibile solamente all'interno di quella funzione.

Ad esempio:

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // variabile locale
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Errore! La variabile è locale alla funzione
```

## Variabili esterne

Una funzione può accedere ad una variabile esterna, ad esempio:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

La funzione ha pieno accesso alla variabile esterna. Può anche modificarla.

Un esempio:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) cambiata la variabile esterna

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* prima della chiamata di funzione

showMessage();

alert( userName ); // *!*Bob*/!*, il valore è stato modificato dalla funzione
```

La variabile esterna viene utilizzata solo se non ce n'è una locale. 

Se una variabile con lo stesso nome viene dichiarata all'interno di una funzione, questa *oscurerà* quella esterna. Ad esempio, nel codice sotto la funzione usa la variabile locale `userName`. Quella esterna viene ignorata:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // dichiara una variabile locale
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// la funzione creerà è utilizzerà un suo 'personale' userName
showMessage();

alert( userName ); // *!*John*/!*, intoccato, la funzione non può accedere alla variabile esterna
```

```smart header="Variabili globali"
Le variabili dichiarate all'esterno di qualsiasi funzione, come `userName` nel codice sopra, vengono chiamate *globali*.

Le variabili globali sono visibili a qualsiasi funzione (se non sono oscurate da quelle locali).

Solitamente, una funzione dichiara internamente tutte le variabili necessarie per svolgere il suo compito. Le variabili locali vengono utilizzate per memorizzare dati relativi alla funzione stessa, quando è importante che queste non siano accessibili in qualsiasi punto del codice. I codici moderni cercano di evitare le variabili globali, sebbene qualche volta possano essere utili per dati 
```

## Parametri

Possiamo passare dei dati arbitrari ad una funzione usando i parametri.

Nell'esempio sotto, la funzione ha due parametri: `from` e `text`.

```js run
function showMessage(*!*from, text*/!*) { // parametri: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Hello!');*/!* // Ann: Hello! (*)
*!*showMessage('Ann', "What's up?");*/!* // Ann: What's up? (**)
```

Quando la funzione viene chiamata nelle righe `(*)` e `(**)`, il valore passato viene copiato nelle variabili locali `from` e `text`, che verranno utilizzate nella chiamata ad `alert`.

Guardiamo un altro esempio: abbiamo una variabile `from` e la passiamo a una funzione. Da notare: la funzione cambia `from`, ma il cambiamento non è visibile all'esterno perché la funzione usa sempre una copia del valore passato:

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // rende "from" più carino
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// il valore di "from" è lo stesso, la funzione ne ha modificato una copia locale
alert( from ); // Ann
```

Quando un valore viene passato come parametro di funzione, vine anche chiamato *argomento*.

In altre parole
In other words, per chiarire questi termini:

<<<<<<< HEAD
- Un parametro è la variabile elencata tra parentesi nella dichiarazione della funzione (fa parte della dichiarazione).
- Un argomento è il valore passato alla funzione quando viene chiamata (fa parte della chiamata).
=======
- A parameter is the variable listed inside the parentheses in the function declaration (it's a declaration time term).
- An argument is the value that is passed to the function when it is called (it's a call time term).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Dichiariamo le funzioni elencando i loro parametri, quindi le chiamiamo passando gli argomenti.

Nell'esempio sopra, si potrebbe dire: "la funzione `showMessage` è dichiarata con due parametri, quindi viene chiamata con due argomenti: `from` and `"Hello"`".

## Valori di default

Se non viene fornito alcun parametro, questa assume il valore `undefined`.

Ad esempio, la funzione menzionata sopra `showMessage(from, text)` può essere chiamata con un solo argomento:

```js
showMessage("Ann");
```

Questo non è un errore. Una chiamata simile mostrerà `"*Ann*: undefined"`. Siccome non viene passato nessun valore per `text`, questo è `undefined`.

Possiamo specificare un cosiddetto valore "default" (da usare se l'argomento è omesso) per i parametri nella dichiarazione di funzione, usando `=`:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: nessun text fornito
```

<<<<<<< HEAD
Adesso, se il parametro `text` non viene passato, assumerà il valore `"no text given"`
=======
Now if the `text` parameter is not passed, it will get the value `"no text given"`.

The default value also jumps in if the parameter exists, but strictly equals `undefined`, like this:

```js
showMessage("Ann", undefined); // Ann: no text given
```
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In questo caso `"no text given"` è una stringa, ma potrebbe essere un'espressione più complessa, che viene valutata e assegnata solamente se il parametro non viene fornito. Quindi, è possibile anche:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() viene eseguita solamente se non viene fornito text 
  // il risultato diventa il valore di text
}
```

```smart header="Valutazione dei parametri di default"
In JavaScript, un parametro di default viene valutato ogni volta che viene chiamata una funzione senza i rispettivo argomento. 

Nell'esempio sopra, `anotherFunctions()` non viene chiamata se viene passato il parametro `text`.

Viene invece chiamata ogni volta che il parametro manca.
```

<<<<<<< HEAD
A volte ha senso assegnare valori default ai parametri, non nella dichiarazione della funzione, ma in una fase successiva.
=======
````smart header="Default parameters in old JavaScript code"
Several years ago, JavaScript didn't support the syntax for default parameters. So people used other ways to specify them.

Nowadays, we can come across them in old scripts.

For example, an explicit check for `undefined`:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}
```

...Or using the `||` operator:

```js
function showMessage(from, text) {
  // If the value of text is falsy, assign the default value
  // this assumes that text == "" is the same as no text at all
  text = text || 'no text given';
  ...
}
```
````


### Alternative default parameters

Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Possiamo verificare se il parametro viene passato durante l'esecuzione della funzione, confrontandolo con `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...Oppure utilizzare l'operatore `||`:

```js
function showMessage(from, text) {
  // se text è falso allora text assume il valore di default
  text = text || 'no text given';
  ...
}
```

I moderni motori JavaScript supportano il [nullish coalescing operator](info:nullish-coalescing-operator) `??`, più efficiente quando valori falsi come `0` vengono considerati regolari:

```js run
//se non c'è un parametro "count", mostra "unknown"
function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## Ritornare un valore

Una funzione può anche ritornare, come risultato, un valore al codice che ha effettuato la sua chiamata.

Un semplicissimo esempio è una funzione che somma due valori:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

La direttiva `return` può trovarsi in qualsiasi punto della funzione. Quando l'esecuzione incontra questa direttiva, si ferma, e il valore viene ritornato al codice che ha chiamato la funzione (nel codice sopra viene assegnato a `result`).

Ci possono essere più occorrenze di `return` in una singola funzione. Ad esempio:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

E' anche possibile utilizzare `return` senza alcun valore. Questo causerà l'uscita immediata dalla funzione.

Ad esempio:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

Nel codice sopra, se `checkAge(age)` ritorna `false`, allora `showMovie` non procederà fino ad `alert`.

````smart header="Una funzione con un `return` vuoto ritorna `undefined`"
Se una funzione non ritorna alcun valore, è come se ritornasse `undefined`:

```js run
function doNothing() { /* vuoto */ }

alert( doNothing() === undefined ); // true
```

Un `return` vuoto è dunque la stessa cosa di `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Non aggiungere mai una nuova riga tra`return` e il valore"
Per espressioni lunghe dopo la direttiva `return`, si potrebbe essere tentati dal metterle in una nuova riga, come:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
Questo non funziona, perché JavaScript interpreta un punto e virgola dopo `return`. E' come se dopo `return` ci fosse scritto:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```
Quindi, diventerebbe a tutti gli effetti un return vuoto. Dobbiamo quindi posizionare il valore da ritornare nella stessa riga.
````

## Denominare una funzione [#function-naming]

Le funzioni sono azioni. Solitamente, per il loro nome vengono utilizzati verbi. Dovrebbero essere brevi, il più accurati possibili e descrittivi di ciò che la funzione fa. Un estraneo che legge il codice deve essere in grado di capire ciò che fa la funzione.

Una pratica molto diffusa è quella di iniziare il nome con un verbo, come prefisso, che descriva vagamente l'azione. Deve esserci un accordo con il team riguardo il significato dei prefissi.

Ad esempio, le funzioni che iniziano con `"show"` solitamente mostrano qualcosa.

Funzioni che iniziano per...

- `"get…"` -- ritornano un valore,
- `"calc…"` -- calcolano qualcosa,
- `"create…"` -- creano qualcosa,
- `"check…"` --  controllano qualcosa e ritornano un booleano, etc.

Esempi di nomi:

```js no-beautify
showMessage(..)     // mostra un messaggio
getAge(..)          // ritorna l'età (prendendola da qualche parte)
calcSum(..)         // calcola la somma e ritorna il risultato
createForm(..)      // crea un form (e solitamente lo ritorna)
checkPermission(..) // controlla i permessi, ritorna true/false
```

Tramite il prefisso, una semplice occhiata al nome della funzione dovrebbe far capire che tipo di lavoro eseguirà e quale sarà il tipo di valore ritornato.

```smart header="Una funzione -- un'azione"
Una funzione dovrebbe fare esattamente ciò che il suo nome descrive, niente di più.

Due azioni separate solitamente meritano due funzioni diverse, anche se molto spesso vengono chiamate insieme (in questo caso potrebbe essere utile creare una terza funzione che chiama entrambe).

Un paio di esempi che non rispettano queste regole:

- `getAge` -- sarebbe un pessimo nome se mostrasse un `alert` con l'età (dovrebbe solo restituirlo).
- `createForm` -- sarebbe un pessimo nome se modificasse il documento, aggiungendo il form (dovrebbe solo crearlo e restituirlo).
- `checkPermission` -- sarebbe un pessimo nome se mostrasse il messaggio `access granted/denied` (dovrebbe solo eseguire il controllo e ritornare il risultato).

Questi esempi assumono i significati comuni dei prefissi. Il loro significato dipende da voi e dal vostro team. E' normale che il tuo codice abbia caratteristiche diverse, ma è fondamentale avere una 'firma' il cui prefisso sia sensato, che faccia capire cosa un determinato tipo di funzione può o non può fare. Tutte le funzioni che iniziano con lo stesso prefisso dovrebbero seguire determinate regole. E' fondamentale che il team condivida queste informazioni.
```

```smart header="Nomi di funzioni ultra-corti"
Funzioni che vengono utilizzate *molto spesso* potrebbero avere nomi molto corti.

<<<<<<< HEAD
Ad esempio il framework [jQuery](http://jquery.com) definisce una funzione con `$`. La libreria [Lodash](http://lodash.com/) ha nel *core* una funzione denominata `_`.
=======
For example, the [jQuery](https://jquery.com/) framework defines a function with `$`. The [Lodash](https://lodash.com/) library has its core function named `_`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Queste sono eccezioni. Generalmente i nomi delle funzioni dovrebbero essere concisi e descrittivi.
```

## Funzioni == Commenti

Le funzioni dovrebbero essere brevi ed eseguire un solo compito. Se invece risultano lunghe, forse varrebbe la pena spezzarle in funzioni più piccole. Qualche volta può non essere semplice seguire questa regola, anche se sarebbe la cosa migliore.

Una funzione separata non è solo semplice da testare e correggere -- la sua stessa esistenza è un commento!

Ad esempio, osserviamo le due funzioni `showPrimes(n)` sotto . Entrambe ritornano i [numeri primi](https://en.wikipedia.org/wiki/Prime_number) fino a `n`.

La prima versione utilizza le etichette:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // un primo
  }
}
```

La seconda variante utilizza un funzione addizionale `isPrime(n)` per testare se un numero rispetta la condizione di essere primo:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // un primo
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

La seconda variante è più semplice da capire, non vi pare? Invece di un pezzo di codice vediamo il nome dell'azione (`isPrime`). Talvolta le persone si riferiscono a questo tipo di codice come *auto descrittivo*.

Quindi, le funzioni possono essere create anche se non abbiamo intenzione di riutilizzarle. Infatti forniscono una struttura migliore al codice e lo rendono più leggibile.

## Riepilogo

La dichiarazione di una funzione si scrive così:

```js
function name(parameters, delimited, by, comma) {
  /* codice */
}
```

- Valori passati ad una funzione come parametri vengono copiati in variabili locali.
- Una funzione può avere accesso alle variabili esterne. Questo meccanismo funziona solo dall'interno verso l'esterno. Il codice esterno non può vedere le variabili locali ad una funzione.
- Una funzione può ritornare un valore. Se non lo fa esplicitamente, questo sarà `undefined`.

Per rendere il codice pulito e più facile da leggere, è consigliabile utilizzare principalmente variabili locali e parametri di funzione, non variabili esterne.

<<<<<<< HEAD
E' sempre più facile capire una funzione che accetta parametri, li lavora e ritorna un valore piuttosto di una funzione che non richiede parametri ma, come effetto collaterale, modifica variabili esterne.
=======
It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Denominare le funzioni:

- Un nome dovrebbe descrivere chiaramente ciò che una funzione fa. Quando vediamo la chiamata di una funzione nel codice, se questa ha un buon nome ci farà immediatamente capire il suo comportamento e cosa ritornerà.
- Una funzione è un azione, quindi i nomi delle funzioni utilizzano molto spesso dei verbi.
- Esistono molti prefissi comuni come `create…`, `show…`, `get…`, `check…` e molti altri. Utilizzateli per descrivere il comportamento di una funzione.

Le funzioni sono il principale blocco di un codice. Ora che abbiamo studiato le basi possiamo iniziare a crearle e utilizzarle. Ma questo è solo l'inizio. Ci ritorneremo molto spesso, andando molto in profondità, per capirne bene le caratteristiche.
