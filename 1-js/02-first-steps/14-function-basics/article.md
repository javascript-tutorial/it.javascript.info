# Funzioni

Molto spesso abbiamo la necessità di eseguire azioni simili in diverse parti dello script.

Ad esempio, vogliamo mostrare un messaggio quando un utente effettua il login/logout o per qualsiasi altra azione.

Le funzioni sono le "fondamenta" di un programma. Consentono al codice di essere chiamato più volte, evitando ripetizioni.

Abbiamo già visto esempi di funzioni del linguaggio, come `alert(message)`, `prompt(message, default)` e `confirm(question)`. Possiamo benissimo crearci delle nostre funzioni personali.

## Dichiarazione di Funzione

Per creare una funzione dobbiamo utilizzare una *dichiarazione di funzione*.

Che appare cosi:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

<<<<<<< HEAD
La parola chiave `function` va posta all'inizio, viene seguirà dal *nome della funzione*, poi c'è una lista di *parametri* racchiusi tra le parentesi (in questo esempio la lista è vuota) e infine il codice della funzione, chiamato anche "corpo della funzione", racchiuso tra le parentesi graffe.
=======
The `function` keyword goes first, then goes the *name of the function*, then a list of *parameters* between the parentheses (comma-separated, empty in the example above) and finally the code of the function, also named "the function body", between curly braces.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

```js
function name(parameters) {
  ...body...
}
```

La nostra nuova funzione può essere richiamata tramite il suo nome: `showMessage()`.

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

La chiamata `showMessage()` esegue il codice della funzione. Qui vedremo il messaggio due volte.

Questo esempio mostra chiaramente uno dei principali scopi delle funzioni: evitare ripetizioni di codice.

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

Una funzione può benissimo accedere ad una variabile esterna, ad esempio:

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
  *!*userName*/!* = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* prima della chiamata di funzione

showMessage();

alert( userName ); // *!*Bob*/!*, il valore è stato modificato dalla funzione
```

La variabile esterna viene utilizzata solo se non ce n'è nessuna di locale. 

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

// la funzione creerà è utilizzerà un suo personale userName
showMessage();

alert( userName ); // *!*John*/!*, intoccatto, la funzione non accedere alla variabile esterna
```

```smart header="Variabili globali"
Le variabili dichiarate all'esterno di qualsiasi funzione, come `userName` nel codice sopra, vengono chiamate *globali*.

Le variabili globali sono visibili a qualsiasi funzione (se non sono oscurate da quelle locali).

Solitamente, una funzione dichiara tutte le variabili necessarie per svolgere il compito. Le variabili locali vengono utilizzate per memorizzare dati relativi al progetto, quindi quando è importante che queste siano accessibili in qualsiasi punto del codice. I codici moderni cercano di evitare le variabili globali. La maggior parte delle variabili appartengono quindi a delle specifiche funzioni.
```

## Parametri

Possiamo passare dei dati arbitrari ad una funzione usando i parametri (chiamati anche *argomenti della funzione*).

Nell'esempio sotto, la funzione ha due parametri: `from` e `text`.

```js run
function showMessage(*!*from, text*/!*) { // argomenti: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

Quando la funzione viene chiamata nelle righe `(*)` e `(**)`, il valore passato viene copiato nelle variabili locali `from` e `text`. Successivamente la funzione le utilizza.

Guardiamo un altro esempio: abbiamo una variabile `from` e la passiamo alla funzione. Da notare: la funzione cambia `from`, ma il cambiamento non viene visto all'esterno, perchè la funzione prende sempre una copia del valore:


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

## Valori di default

Se non viene fornito alcun parametro, questa assume il valore `undefined`.

Ad esempio, la funzione menzionata sopra `showMessage(from, text)` può essere chiamata con un solo argomento:

```js
showMessage("Ann");
```

Questo non è un errore. Una chiamata simile stamperà `"Ann: undefined"`.  Non c'è nessun valore `text`, quindi si assume che sia `text === undefined`.

Se volessimo utilizzare un `text` di "default", dovremmo specificarlo dopo `=`:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: nessun text fornito
```

Adesso se il parametro `text` non viene passato, assumerà il valore `"no text given"`

In questo caso `"no text given"` è una stringa, ma potrebbe essere un espressione più complessa, che viene valutata e assegnata solamente se il parametro non vine fornito. Quindi, è possibile anche una cosa simile:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() viene eseguita solamente se non viene fornito text 
  // il risultato diventa il valore di text
}
```

<<<<<<< HEAD
```smart header="Valutazione dei parametri di default"
In JavaScript, un parametro di default viene valutato ogni volta che viene chiamata una funzione senza i rispettivi parametri. Nell'esempio sopra, `anotherFunctions()` viene richiamata ogni volta che `someMessage()` viene richiamata senza il parametro `text`. Questo è in contrasto con altri linguaggi come Python, dove ogni parametro di default viene valutato solo durante la fase di interpretazione.
```


````smart header="Parametri di default vecchio stile"
Le vecchie edizioni di JavaScript non supportavano i parametri di default. Quindi c'è una maniera alternativa per utilizzarli, che potreste trovare di frequente nei vecchi script.
=======
```smart header="Evaluation of default parameters"
In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.

In the example above, `anotherFunction()` is called every time `showMessage()` is called without the `text` parameter.
```

````smart header="Default parameters old-style"
Old editions of JavaScript did not support default parameters. So there are alternative ways to support them, that you can find mostly in the old scripts.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Ad esempio, un controllo esplicito per `undefined`:

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

...Oppure l'operatore `||`:

```js
function showMessage(from, text) {
  // se text è falso allora text assume il valore di default
  text = text || 'no text given';
  ...
}
```


````


## Ritornare un valore

Una funzione può anche ritornare un valore alla parte di codice che ha effettuato la chiamata.

Un semplicissimo esempio è una funzione che somma due valori:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

La direttiva `return` può essere in qualsiasi punto della funzione. Quando l'esecuzione incontra questa direttiva, si ferma, e il valore viene ritornato al chiamante (nel codice sopra viene assegnato a `result`).

Ci possono essere più occorrenze di `return` in una singola funzione. Ad esempio:

```js run
function checkAge(age) {
  if (age > 18) {
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

Anche un `return` vuoto è la stessa cosa di `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Non aggiungere mai una nuova riga tra`return` e il valore"
Per espressioni lunghe nella direttiva `return`, si potrebbe essere tentati dal metterle in una riga separata, come:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
Questo non funziona, perchè JavaScript interpreta un punto e virgola dopo `return`. E' come se ci fosse scritto:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```
<<<<<<< HEAD
Quindi, diventerebbe a tutti gli effetti un return vuoto. Dobbiamo quindi posizionare il valore da ritornare nella stessa riga.
=======

So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
````

## Denominare una funzione [#function-naming]

Le funzioni sono azioni. Quindi solitamente per il loro nome vengono utilizzati verbi. Dovrebbero essere brevi, il più accurati possibili e descrittivi di ciò che la funzione fa, quindi un estraneo che legge il codice deve essere in grado di capire ciò che fa la funzione.

Una pratica molto diffusa è quella di iniziare con un verbo come prefisso che descriva vagamente l'azione. Ci deve necessariamente essere un accordo con il team riguardo il significato dei prefissi.

Ad esempio, le funzioni che iniziano con `"show"` solitamente mostrano qualcosa.

Funzioni che iniziano per...

- `"get…"` -- ritornano un valore,
- `"calc…"` -- calcolano qualcosa,
- `"create…"` -- creano qualcosa,
- `"check…"` --  controllano qualcosa e ritornano un booleano, etc.

Esempi di nomi:

```js no-beautify
showMessage(..)     // mostra un messaggio
getAge(..)          // ritonra l'età (prendendola da qualche parte)
calcSum(..)         // calcola la somma e ritorna il risultato
createForm(..)      // crea un form (e solitamente lo ritorna)
checkPermission(..) // controlla i permessi, ritorna true/false
```

Con il prefisso, una semplice occhiata al nome della funzione dovrebbe far capire che tipo di lavoro eseguirà e quale sarà il tipo di valore ritornato.

```smart header="Una funzione -- un'azione"
Una funzione dovrebbe fare esattamente ciò che il suo nome descrive, niente di più.

Due azioni separate solitamente meritano due funzioni diverse, anche se molto spesso vengono chiamate insieme (in questo caso potrebbe essere utile creare una terza funzione che chiama entrambe).

Un paio di esempi che non rispettano queste regole:

- `getAge` -- sarebbe un pessimo nome se mostrasse un `alert` con l'età (dovrebbe solo restituirlo).
- `createForm` -- sarebbe un pessimo nome se modificasse il documento, aggiungendo il form (infatti dovrebbe solo crearlo e restituirlo).
- `checkPermission` -- sarebbe un pessimo nome se mostrasse il messaggio `access granted/denied` (dovrebbe solo eseguire il controllo e ritornare il risultato).

Questi esempi assumono i significati comuni dei prefissi. Il loro significato dipende da voi e dal vostro team. E' comunque normale che il tuo codice abbia caratteristiche diverse. Ma è fondamentale avere una firma il cui prefisso sia sensato, che faccia capire cosa un determinato tipo di funzione può o non può fare. Tutte le funzione che iniziano con lo stesso prefisso dovrebbero seguire determinate regole. E' fondamentale che il team condivida queste informazioni.
```

```smart header="Nomi di funzioni ultra-corti"
Funzioni che vengono utilizzate *molto spesso* potrebbero avere nomi molto corti.

Ad esempio il framework [jQuery](http://jquery.com) definisce una funzione con `$`. La libreria [Lodash](http://lodash.com/) ha nel core una funzione denominata `_`.

Queste sono eccezioni. Generalmente i nomi delle funzioni sono precisi e descrittivi.
```

## Funzioni == Commenti

Le funzioni dovrebbero essere brevi ed eseguire un solo compito. Se invece risultano essere grandi, forse varrebbe la pena spezzarla in funzioni più piccole. Qualche volta può non essere semplice spezzare una funzione, anche se sarebbe la cosa migliore.

Una funzione separata non è semplice da testare e debuggare -- la miglior cosa è utilizzare un commento!

Ad esempio, osserviamo le due funzioni sotto `showPrimes(n)`. Entrambe forniscono in output i [numeri primi](https://en.wikipedia.org/wiki/Prime_number) fino a `n`.

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

La seconda variante è più semplice da capire, non vi pare? Piuttosto che un pezzo di codice vediamo il nome dell'azione (`isPrime`). Talvolta le persone si riferiscono a questo tipo di codice come *auto descrittivo*.

Quindi, le funzioni possono essere create anche se non abbiamo intenzione di riutilizzarle. Infatti forniscono una struttura migliore al codice e lo rendono più leggibile.

## Riepilogo

La dichiarazione di una funzione assomiglia a:

```js
function name(parameters, delimited, by, comma) {
  /* codice */
}
```

- Valori passati ad una funzione come parametri vengono copiati su variabili locali.
- Una funzione può avere accesso alle variabili esterne. Questo meccanismo funziona solo dall'interno verso l'esterno. Il codice esterno non può vedere le variabili locali ad una funzione.
- Una funzione può ritornare un valore. Se non lo fa esplicitamente, questo sarà `undefined`.

Per rendere il codice pulito e più facile da leggere, è consigliabile utilizzare principalmente variabili locali e parametri di funzione, non servirsi quindi di variabili esterne.

E' sempre più facile capire una funzione che prende parametri, li lavora e ritorna un valore piuttosto di una funzione che non richiede parametri, ma modifica le variabili esterne come effetto collaterale.

Denominare le funzioni:

- Un nome dovrebbe descrivere chiaramente ciò che una funzione fa. Quando vediamo la chiamata di una funzione nel codice, se questa ha un buon nome ci farà immediatamente capire il suo comportamento e cosa ritornerà.
- Una funzione è un azione, quindi i nomi delle funzioni utilizzano molto spesso dei verbi.
- Esistono molti prefissi molto comuni come `create…`, `show…`, `get…`, `check…` e molti altri. Utilizzateli per capire il comportamento di una funzione.

Le funzioni sono il principale blocco di un codice. Ora che abbiamo studiato le basi possiamo iniziare a crearle e utilizzarle. Anche se siamo ancora agli inizi. Ci ritorneremo molto spesso, andando molto in profondità per capirne bene le caratteristiche.
