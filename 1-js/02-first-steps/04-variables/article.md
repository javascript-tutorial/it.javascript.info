# Variabili

La maggior parte delle volte, le applicazioni JavaScript necessitano d'informazione per poter lavorare. Vediamo due esempi:
1. Un negozio online -- le informazioni possono riguardare i beni venduti e il carrello.
2. Un applicazione di messaggistica -- le informazioni possono riguardare utenti, messaggi e molto altro.

Le variabili vengono utilizzate per memorizzare informazioni.

## Variabile

Una variabile [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) è un "memorizzatore con nome" per i dati. Possiamo usare le variabile per memorizzare informazioni extra, visitatori e altri dati.

Per creare una variabile in JavaScript, dobbiamo utilizzare la parola chiave `let`.

L'istruzione sotto crea(in altre parole: *dichiara* o *definisce*) una variabile identificata dal nome "messaggio":

```js
let message;
```

Adesso possiamo inserirci dati utilizzando l'operatore di assegnazione `=`:

```js
let message;

*!*
message = 'Hello'; // memorizzazione della stringa
*/!*
```

La stringa è adesso salvata nell'area di memoria associata alla variabile. Possiamo accedervi utilizzando il nome della variabile:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // mostra il contenuto della variabile
*/!*
```

Per essere precisi, potremmo unire la dichiarazione e l'assegnazione in una singola riga:

```js run
let message = 'Hello!'; // definisce la variabile e gli assegna il valore

alert(message); // Hello!
```

Possiamo anche dichiarare più variabili in una riga:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Questo potrebbe risultare più breve, ma è sconsigliato. Per mantenere una migliore leggibilità è meglio utilizzare una riga per ogni variabile.

L'alternativa a più righe è un po più lunga, ma più facile da leggere:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Alcune persone scrivono variabili multiple in questo modo:
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...O anche con la virgola nella nuova riga:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Tecnicamente, tutte queste varianti fanno la stessa cosa. Quindi è una questione di gusto personale ed estetico.

````smart header="`var` piuttosto che `let`"
Nei vecchi script potresti trovare: `var` piuttosto che `let`:

```js
*!*var*/!* message = 'Hello';
```

La parola chiave `var` è *quasi* la stessa cosa di `let`. Dichiara comunque una variabile, ma in un maniera leggermente diversa, "vecchio stile".

Ci sono delle sottili differenze tra `let` e `var`, ma per ora non hanno importanza. Le copriremo in dettaglio più avanti, nel capitolo <info:var>.
````

## Un analogia con il mondo reale

Possiamo comprendere meglio il concetto di "variabile" se la immaginiamo come una scatola per i dati, con appiccicata un etichetta univoca.

Per esempio, la variabile `message` può essere immaginata come una scatola con etichetta `"message"` con il valore `"Hello!"` al suo interno:

![](variable.svg)

<<<<<<< HEAD
Possiamo inserire qualsiasi valore all'interno della scatola.
=======
![](variable.svg)
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Possiamo anche cambiarlo. Il valore può cambiare tutte le volte che ne abbiamo bisogno:

```js run
let message;

message = 'Hello!';

message = 'World!'; // il valore è cambiato

alert(message);
```

<<<<<<< HEAD
Quando il valore viene cambiato, il dato vecchio viene rimosso dalla variabile:
=======
When the value is changed, the old data is removed from the variable:

>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
![](variable-change.svg)

Possiamo anche dichiarare due variabili e copiare i dati da un all'altra.

```js run
let hello = 'Hello world!';

let message;

*!*
// copia 'Hello world' da hello in message
message = hello;
*/!*

// ora le due variabili contengono gli stessi dati
alert(hello); // Hello world!
alert(message); // Hello world!
```

```smart header="Linguaggi funzionali"
Può essere interessante sapere che esistono anche linguaggi di programmazione [funzionale](https://en.wikipedia.org/wiki/Functional_programming) che vietano di cambiare il valore di una variabile. Per esempio, [Scala](http://www.scala-lang.org/) o [Erlang](http://www.erlang.org/).

In questo tipo di linguaggi, una volta che il valore viene memorizzato "dentro la scatola", ci rimane per sempre. Se abbiamo bisogno di memorizzare qualcos altro, il linguaggio ci forza a creare una nuova scatola (dichiarare una nuova variabile). Non possiamo quindi riutilizzare quelle vecchie.

Anche se potrebbero sembrare un pò strano a prima vista, questi linguaggi sono veramente capaci di sviluppare grandi cose. Inoltre, ci sono certe situazioni come calcoli paralleli in cui questi limiti portano dei benefici. Studiare un linguaggio di questo tipo (anche se non abbiamo intenzione di utilizzarlo a breve) è consigliato per allargare le proprie conoscenze.
```

## Nomi delle variabili [#variable-naming]

In JavaScript ci sono solo due limitazioni per il nome delle variabili:

1. Il nome deve contenere solo lettere, numeri, simboli `$` e `_`.
2. Il primo carattere non può essere un numero.

Esempi di nomi validi:

```js
let userName;
let test123;
```

Quando il nome contiene più parole, viene utilizzato il [camelCase](https://en.wikipedia.org/wiki/CamelCase). La logica è: le parole vanno una dopo l'altra, ogni parola inizia con lettere maiuscola: `myVeryLongName`.

Una cosa interessante è che -- il simbolo del dollaro `'$'` e l'underscore `'_'` possono essere utilizzati nei nomi. Sono dei semplici simboli, come le lettere, senza alcun significato speciale.

Ad esempio questi nomi sono validi:

```js run untrusted
let $ = 1; // dichiarata una variabile con nome "$"
let _ = 2; // qui una variabile con nome "_"

alert($ + _); // 3
```

Questi invece non lo sono:

```js no-beautify
let 1a; // non può cominciare con una stringa

let my-name; // '-' non è consentito nei nomi
```

```smart header="La questione delle lettere"
Le variabili `apple` ed `AppLE` sono distinte.
```

````smart header="Le lettere non latine sono permesse, ma sono sconsigliate"
E' possibile utilizzare qualsiasi alfabeto, compreso quello cirillico o addirittura i geroglifici:

```js
let имя = '...';
let 我 = '...';
```

Tecnicamente, non ci sono errori, questo tipo di nomi sono permessi, ma la tradizione internazionale è di utilizzare l'alfabeto inglese per il nome delle variabili. Anche se stiamo scrivendo un piccolo script, potrebbe infatti avere una lunga vita. Persone di altre nazionalità potrebbero aver bisogno di leggerlo.
````

````warn header="Nomi riservati"
C'e una [lista di parole riservate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), che non possono essere utilizzare come nomi di variabili, perchè vengono utilizzate dal linguaggio stesso.

Per esempio, le parole `let`, `class`, `return`, `function` sono riservate.

Questo codice provocherà un errore di sintassi:

```js run no-beautify
let let = 5; // non è possibile chiamare una variabile "let", errore!
let return = 5; // nemmeno "return", errore!
```
````

````warn header="Un assegnazione senza `use strict`"

Normalmente, abbiamo bisogno di definire variabili prima di utilizzarle. Ma una volta, era possibile definire una variabile semplicemente assegnandogli un valore, senza `let`. Questo è ancora possibile se non utilizziamo `use strict`. E' necessario per mantenere la compatibilità con i vecchi script.

```js run no-strict
// da notare: no si utilizza "use strict" in questo esempio

num = 5; // la variabile "num" se non esiste già

alert(num); // 5
```

Questa però è una pessima pratica, che causerebbe un errore in strict mode:

```js
"use strict";

*!*
num = 5; // errore: num non è definita
*/!*
```
````

## Constanti

Per dichiarare una variabile costante (immutabile), dobbiamo utilizzare `const` invece di `let`:

```js
const myBirthday = '18.04.1982';
```

Le variabili dichiarate con `const` vengono chiamate "costanti". Non possono cambiare valore. Se tentassimo di farlo verrebbe sollevato un errore:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // errore, non è possibile riassegnare la costante!
```
Quando il programmatore è sicuro che il valore della variabile non cambierà mai, può utilizzare `const` per soddisfare questa esigenza, e metterlo anche in mostra a tutti gli altri.

### Le costanti maiuscole

Una pratica molto diffusa è di utilizzare le variabili costanti come alias di valori difficili da ricordare, e che sono noti prima dell'esecuzione.

Questo tipo di costanti vengono identificate con lettere maiuscole e underscore.

Come in questo esempio, creiamo delle costanti nel cosidetto formato "web" (esadecimale):

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...quando abbiamo bisogno di prelevare un colore
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Benefici:

- `COLOR_ORANGE` è più facile da ricordare di `"#FF7F00"`.
- E' più facile commettere errori scrivendo `"#FF7F00"` piuttosto che `COLOR_ORANGE`.
- Quando leggiamo il codice, `COLOR_ORANGE` è molto più significativo di `#FF7F00`.

Quando dovremmo utilizzare lettere maiuscole per una costante, e quando invece trattarle come normali variabili? Facciamo un pò di chiarezza.

Essere una "costante" significa che il valore non potrà mai cambiare. Ci sono costanti che sono note prima dell'esecuzione (come la codifia esadecimale del colore rosso), e ci sono quelle che vengono *calcolate* durante l'esecuzione, ma non cambieranno più dopo che gli sarà stato assegnato un valore.

Per esempio:
```js
const pageLoadTime = /* tempo necessario da una pagina web per caricare */;
```
Il valore di `pageLoadTime` non è noto prima del caricamento della pagina, quindi viene trattato come una normale variabile. Ma rimane comunque una costante, perchè non potrà più cambiare dopo che gli sarà stato assegnato un valore.

In altre parole, i nomi delle costanti in maiuscolo vengono utilizzati con variabili dal valore noto prima dell'esecuzione.

## Dare i giusti nomi alle cose

Parlando di variabili, c'è un'altra cosa estremamente importante.

Per favore, utilizzate i nomi delle variabili con sensibilità. Prendetevi del tempo per pensare se necessario.

Dare i giusti nomi alle variabili è una delle abilità più importanti (e difficili) nella programmazione. 
Una rapida occhiata ai nomi delle variabili può rivelare se il codice è stato scritto da un beginner o da uno sviluppatore esperto.

In un progetto reale, la maggior parte del tempo lo si perde a modificare ed estendere del codice già esistente, piuttosto che riscriverne uno nuovo. E quando ritorneremo sul codice, dopo aver fatto qualcos'altro, sarà molto pù facile trovare informazioni se sono ben descritte. In altre parole, quando le variabili utilizzano dei nomi efficaci.

Quindi è utile spendere del tempo a pensare il giusto nome per una variabile, prima di dichiararla. Questo approccio vi ripagherà.

Alcune regole da seguire:

- Utilizzare nomi leggibili da persone, come `userName` o `shoppingCart`.
- Evitate abbreviazioni o nomi brevi come `a`, `b`, `c`, senza che abbiano veramente senso.
- Rendete il nome il più descrittivo e preciso possibile. Esempi di pessimi nomi sono `data` e `value`. Questo tipo di nomi non dicono niente. Si possono utilizzare eccezionalmente se il contesto rende esplicito il significato.
- Definire delle regole personali o con il team. Se il visitatore del sito viene chiamato "user" allora dovremmo chiamare la relativa variabile come `currentUser` o `newUser`, non `currentVisitor` o `newManInTown`.

Sembra facile? Infatti lo è, ma trovare dei buoni nomi che siano precisi e descrittivi nella pratica non è sempre cosi semplice.

```smart header="Nuovo o Riciclo?"
Come ultima cosa. Ci sono alcuni programmatori un pò pigri, che invece di dichiarare nuove variabili tendono a riutilizzare quelle già esistenti.

Il risultato che si ottiene, è che le variabili sono come delle scatole in cui si possono mettere varie cose, senza cambiare l'etichetta. Cosa ci sarà dentro in un dato momento? Chi lo sa... Siamo costretti a controllare manualmente.

Questo genere di programmatori risparmiano qualche bit nella dichiarazione delle variabili ma perdono dieci volte il tempo risparmiato per fare debugging del codice.

Una variable in più va bene, non sono il diavolo.

I browser moderni e JavaScript minimizzano ed ottimizzano il codice abbastanza bene, quindi non ci saranno problemi di performance. Usare variabili differenti, per valori differenti può addirittura aiutare il motore JavaScript nell'ottimizzazione.
```

## Riepilogo

Possiamo dichiarare variabili per memorizzare dati. Possono essere dichiarate con `var`,`let` o `const`.

<<<<<<< HEAD
- `let` -- è una dichiarazione delle variabili più moderna. Il codice deve essere in modalità strict per utilizzare `let` in Chrome (V8).
- `var` -- è una dichiarazione delle variabili più vecchia-scuola. Normalmente non si dovrebbe utilizzare, spiegheremo le sottili differenze da `let` nel capitolo <info:var>, giusto per esserne a conoscenza.
- `const` -- è simile a `let`, ma non consente di cambiare il valore della variabile.
=======
- `let` -- is a modern variable declaration.
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Le variabili dovrebbero avere dei nomi che ci consentono di capire facilmente cosa c'è dentro.
