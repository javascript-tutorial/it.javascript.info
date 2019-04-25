# Variabili

<<<<<<< HEAD
La maggior parte delle volte, le applicazioni JavaScript necessitano d'informazione per poter lavorare. Vediamo due esempi:
1. Un negozio online -- le informazioni possono riguardare i beni venduti e il carrello.
2. Un applicazione di messaggistica -- le informazioni possono riguardare utenti, messaggi e molto altro.
=======
Most of the time, a JavaScript application needs to work with information. Here are two examples:
1. An online shop -- the information might include goods being sold and a shopping cart.
2. A chat application -- the information might include users, messages, and much more.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Le variabili vengono utilizzate per memorizzare informazioni.

## Variabile

<<<<<<< HEAD
Una variabile [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) è un "memorizzatore con nome" per i dati. Possiamo usare le variabile per memorizzare informazioni extra, visitatori e altri dati.

Per creare una variabile in JavaScript, dobbiamo utilizzare la parola chiave `let`.
=======
A [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) is a "named storage" for data. We can use variables to store goodies, visitors, and other data.

To create a variable in JavaScript, use the `let` keyword.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

L'istruzione sotto crea(in altre parole: *dichiara* o *definisce*) una variabile identificata dal nome "messaggio":

```js
let message;
```

<<<<<<< HEAD
Adesso possiamo inserirci dati utilizzando l'operatore di assegnazione `=`:
=======
Now, we can put some data into it by using the assignment operator `=`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
let message;

*!*
message = 'Hello'; // store the string
*/!*
```

La stringa è adesso salvata nell'area di memoria associata alla variabile. Possiamo accedervi utilizzando il nome della variabile:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // shows the variable content
*/!*
```

<<<<<<< HEAD
Per essere precisi, potremmo unire la dichiarazione e l'assegnazione in una singola riga:
=======
To be concise, we can combine the variable declaration and assignment into a single line:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let message = 'Hello!'; // define the variable and assign the value

alert(message); // Hello!
```

Possiamo anche dichiarare più variabili in una riga:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

<<<<<<< HEAD
Questo potrebbe risultare più breve, ma è sconsigliato. Per mantenere una migliore leggibilità è meglio utilizzare una riga per ogni variabile.
=======
That might seem shorter, but we don't recommend it. For the sake of better readability, please use a single line per variable.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

L'alternativa a più righe è un po più lunga, ma più facile da leggere:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

<<<<<<< HEAD
Alcune persone scrivono variabili multiple in questo modo:
=======
Some people also define multiple variables in this multiline style:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
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

<<<<<<< HEAD
Tecnicamente, tutte queste varianti fanno la stessa cosa. Quindi è una questione di gusto personale ed estetico.

````smart header="`var` piuttosto che `let`"
Nei vecchi script potresti trovare: `var` piuttosto che `let`:
=======
Technically, all these variants do the same thing. So, it's a matter of personal taste and aesthetics.


````smart header="`var` instead of `let`"
In older scripts, you may also find another keyword: `var` instead of `let`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
*!*var*/!* message = 'Hello';
```

<<<<<<< HEAD
La parola chiave `var` è *quasi* la stessa cosa di `let`. Dichiara comunque una variabile, ma in un maniera leggermente diversa, "vecchio stile".

Ci sono delle sottili differenze tra `let` e `var`, ma per ora non hanno importanza. Le copriremo in dettaglio più avanti, nel capitolo <info:var>.
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable, but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter for us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
````

## Un analogia con il mondo reale

Possiamo comprendere meglio il concetto di "variabile" se la immaginiamo come una scatola per i dati, con appiccicata un etichetta univoca.

Per esempio, la variabile `message` può essere immaginata come una scatola con etichetta `"message"` con il valore `"Hello!"` al suo interno:

![](variable.png)

<<<<<<< HEAD
Possiamo inserire qualsiasi valore all'interno della scatola.

Possiamo ance cambiarlo. Il valore può cambiare tutte le volte che ne abbiamo bisogno:
=======
We can put any value in the box.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

We can also change it as many times as we want:
```js run
let message;

message = 'Hello!';

message = 'World!'; // value changed

alert(message);
```

Quando il valore viene cambiato, il dato vecchio viene rimosso dalla variabile:
![](variable-change.png)

Possiamo anche dichiarare due variabili e copiare i dati da un all'altra.

```js run
let hello = 'Hello world!';

let message;

*!*
// copy 'Hello world' from hello into message
message = hello;
*/!*

// now two variables hold the same data
alert(hello); // Hello world!
alert(message); // Hello world!
```

<<<<<<< HEAD
```smart header="Linguaggi funzionali"
Può essere interessante sapere che esistono anche linguaggi di programmazione [funzionale](https://en.wikipedia.org/wiki/Functional_programming) che vietano di cambiare il valore di una variabile. Per esempio, [Scala](http://www.scala-lang.org/) o [Erlang](http://www.erlang.org/).
=======
```smart header="Functional languages"
It's interesting to note that [functional](https://en.wikipedia.org/wiki/Functional_programming) programming languages, like [Scala](http://www.scala-lang.org/) or [Erlang](http://www.erlang.org/), forbid changing variable values.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

In questo tipo di linguaggi, una volta che il valore viene memorizzato "dentro la scatola", ci rimane per sempre. Se abbiamo bisogno di memorizzare qualcos altro, il linguaggio ci forza a creare una nuova scatola (dichiarare una nuova variabile). Non possiamo quindi riutilizzare quelle vecchie.

<<<<<<< HEAD
Anche se potrebbero sembrare un pò strano a prima vista, questi linguaggi sono veramente capaci di sviluppare grandi cose. Inoltre, ci sono certe situazioni come calcoli paralleli in cui questi limiti portano dei benefici. Studiare un linguaggio di questo tipo (anche se non abbiamo intenzione di utilizzarlo a breve) è consigliato per allargare le proprie conoscenze.
=======
Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits. Studying such a language (even if you're not planning to use it soon) is recommended to broaden the mind.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```

## Nomi delle variabili [#variable-naming]

<<<<<<< HEAD
In JavaScript ci sono solo due limitazioni per il nome delle variabili:

1. Il nome deve contenere solo lettere, numeri, simboli `$` e `_`.
2. Il primo carattere non può essere un numero.

Esempi di nomi validi:
=======
There are two limitations on variable names in JavaScript:

1. The name must contain only letters, digits, or the symbols `$` and `_`.
2. The first character must not be a digit.

Examples of valid names:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
let userName;
let test123;
```

<<<<<<< HEAD
Quando il nome contiene più parole, viene utilizzato il [camelCase](https://en.wikipedia.org/wiki/CamelCase). La logica è: le parole vanno una dopo l'altra, ogni parola inizia con lettere maiuscola: `myVeryLongName`.
=======
When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word starting with a capital letter: `myVeryLongName`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Una cosa interessante è che -- il simbolo del dollaro `'$'` e l'underscore `'_'` possono essere utilizzati nei nomi. Sono dei semplici simboli, come le lettere, senza alcun significato speciale.

Ad esempio questi nomi sono validi:

```js run untrusted
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
```

Questi invece non lo sono:

```js no-beautify
let 1a; // cannot start with a digit

let my-name; // hyphens '-' aren't allowed in the name
```

<<<<<<< HEAD
```smart header="La questione delle lettere"
Le variabili `apple` ed `AppLE` -- sono due variabili distinte.
=======
```smart header="Case matters"
Variables named `apple` and `AppLE` are two different variables.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```

````smart header="Le lettere non inglesi sono permesse, ma sono sconsigliate"
E' possibile utilizzare qualsiasi alfabeto, compreso quello cirillico o addirittura i geroglifici:

```js
let имя = '...';
let 我 = '...';
```

Tecnicamente, non ci sono errori, questo tipo di nomi sono permessi, ma la tradizione internazionale è di utilizzare l'alfabeto inglese per il nome delle variabili. Anche se stiamo scrivendo un piccolo script, potrebbe infatti avere una lunga vita. Persone di altre nazionalità potrebbero aver bisogno di leggerlo.
````

<<<<<<< HEAD
````warn header="Nomi riservati"
C'e una [lista di parole riservate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), che non possono essere utilizzare come nomi di variabili, perchè vengono utilizzate dal linguaggio stesso.

Per esempio, le parole `let`, `class`, `return`, `function` sono riservate.
=======
````warn header="Reserved names"
There is a [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), which cannot be used as variable names because they are used by the language itself.

For example: `let`, `class`, `return`, and `function` are reserved.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Questo codice provocherà un errore di sintassi:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```
````

````warn header="Un assegnazione senza `use strict`"

<<<<<<< HEAD
Normalmente, abbiamo bisogno di definire variabili prima di utilizzarle. Ma una volta, era possibile definire una variabile semplicemente assegnandogli un valore, senza `let`. Questo è ancora possibile se non utilizziamo `use strict`. E' necessario per mantenere la compatibilità con i vecchi script.
=======
Normally, we need to define a variable before using it. But in the old times, it was technically possible to create a variable by a mere assignment of the value without using `let`. This still works now if we don't put `use strict` in our scripts to maintain compatibility with old scripts.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run no-strict
// note: no "use strict" in this example

num = 5; // the variable "num" is created if it didn't exist

alert(num); // 5
```

<<<<<<< HEAD
Però è una pessima pratica, se inseriamo "use script" provocherà un errore:
=======
This is a bad practice and would cause an error in strict mode:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```
````

## Constanti

<<<<<<< HEAD
Per dichiarare una variabile costante(immutabile), dobbiamo utilizzare `const` invece di `let`:
=======
To declare a constant (unchanging) variable, use `const` instead of `let`:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js
const myBirthday = '18.04.1982';
```

<<<<<<< HEAD
Le variabili dichiarate con `const` vengono chiamate "costanti". Non possono cambiare valore. Se tentassimo di farlo verrebbe sollevato un errore:
=======
Variables declared using `const` are called "constants". They cannot be changed. An attempt to do so would cause an error:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```
Quando il programmatore è sicuro che il valore della variabile non cambierà mai, può utilizzare `const` per soddisfare questa esigenza, e metterlo anche in mostra a tutti gli altri.

<<<<<<< HEAD
### Le costanti maiuscole
=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and clearly communicate that fact to everyone.

>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Una pratica molto diffusa è di utilizzare le variabili costanti come alias di valori difficili da ricordare, e che sono noti prima dell'esecuzione.

Questo tipo di costanti vengono identificate con lettere maiuscole e underscore.

Come in questo esempio:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Benefici:

<<<<<<< HEAD
- `COLOR_ORANGE` è più facile da ricordare di `"#FF7F00"`.
- E' più facile commettere errori scrivendo `"#FF7F00"` piuttosto che `COLOR_ORANGE`.
- Quando leggiamo il codice, `COLOR_ORANGE` è molto più significativo di `#FF7F00`.

Quando dovremmo utilizzare lettere maiuscole per una costante, e quando invece trattarle come normali variabili? Facciamo un pò di chiarezza.

Essere una "costante" significa che il valore non potrà mai cambiare. Ci sono costanti che sono note prima dell'esecuzione (come la codifia esadecimale del colore rosso), e ci sono quelle che vengono *calcolate* durante l'esecuzione, ma non cambieranno più dopo che gli sarà stato assegnato un valore.
=======
- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype `"#FF7F00"` than `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant and when should we name it normally? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red) and there are constants that are *calculated* in run-time, during the execution, but do not change after their initial assignment.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Per esempio:
```js
const pageLoadTime = /* time taken by a webpage to load */;
```
Il valore di `pageLoadTime` non è noto prima del caricamento della pagina, quindi viene trattato come una normale variabile. Ma rimane comunque una costante, perchè non potrà più cambiare dopo che gli sarà stato assegnato un valore.

<<<<<<< HEAD
In altre parole, i nomi delle costanti in maiuscolo vengono utilizzati con variabili dal valore noto prima dell'esecuzione.
=======
The value of `pageLoadTime` is not known prior to the page load, so it's named normally. But it's still a constant because it doesn't change after assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.  
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## Dare i giusti nomi alle cose

Parlando di variabili, c'è un'altra cosa estremamente importante.

<<<<<<< HEAD
Per favore, utilizzate i nomi delle variabili con sensibilità. Prendetevi del tempo per pensare se necessario.

Dare i giusti nomi alle variabili è una delle abilità più importanti (e difficili) nella programmazione. 
Una rapida occhiata ai nomi delle variabili può rivelare se il codice è stato scritto da un beginner o da uno sviluppatore esperto.

In un progetto reale, la maggior parte del tempo lo si perde a modificare ed estendere del codice già esistente, piuttosto che riscriverne uno nuovo. E quando ritorneremo sul codice, dopo aver fatto qualcos'altro, sarà molto pù facile trovare informazioni se sono ben descritte. In altre parole, quando le variabili utilizzano dei nomi efficaci.

Quindi è utile spendere del tempo a pensare il giusto nome per una variabile, prima di dichiararla. Questo approccio vi ripagherà.
=======
Please name your variables sensibly. Take time to think about this.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Alcune regole da seguire:

<<<<<<< HEAD
- Utilizzare nomi leggibili da persone, come `userName` o `shoppingCart`.
- Evitate abbreviazioni o nomi brevi come `a`, `b`, `c`, senza che abbiano veramente senso.
- Rendete il nome il più descrittivo e preciso possibile. Esempi di pessimi nomi sono `data` e `value`. Questo tipo di nomi non dicono niente. Si possono utilizzare eccezionalmente se il contesto rende esplicito il significato.
- Definire delle regole personali o con il team. Se il visitatore del sito viene chiamato "user" allora dovremmo chiamare la relativa variabile come `currentUser` o `newUser`, non `currentVisitor` o `newManInTown`.

Sembra facile? Infatti lo è, ma trovare dei buoni nomi che siano precisi e descrittivi nella pratica non è sempre cosi semplice.

```smart header="Nuovo o Riciclo?"
Come ultima cosa. Ci sono alcuni programmatori un pò pigri, che invece di dichiarare nuove variabili tendono a riutilizzare quelle già esistenti.

Il risultato che si ottiene, è che le variabili sono come delle scatole in cui si possono mettere varie cose, senza cambiare l'etichetta. Cosa ci sarà dentro in un dato momento? Chi lo sa... Siamo costretti a controllare manualmente.

Questi programmatori risparmiano qualche bit nella dichiarazione delle variabili ma perdono dieci volte il tempo risparmiato per fare debugging del codice.
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.

```smart header="Reuse or create?"
And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones.

As a result, their variables are like boxes into which people throw different things without changing their stickers. What's inside the box now? Who knows? We need to come closer and check.

Such programmers save a little bit on variable declaration but lose ten times more on debugging.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Una variable in più va bene, non sono il diavolo.

<<<<<<< HEAD
I browser moderni e JavaScript minimizzano ed ottimizzano il codice abbastanza bene, quindi non ci saranno problemi di performance. Usare variabili differenti, per valori differenti può addirittura aiutare il motore JavaScript nell'ottimizzazione.
=======
Modern JavaScript minifiers and browsers optimize code well enough, so it won't create performance issues. Using different variables for different values can even help the engine optimize your code.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```

## Riepilogo

<<<<<<< HEAD
Possiamo dichiarare variabili per memorizzare dati. Possono essere dichiarate con `var`,`let` o `const`.
=======
We can declare variables to store data by using the `var`, `let`, or `const` keywords.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

- `let` -- è una dichiarazione delle variabili più moderna. Il codice deve essere in modalità strict per utilizzare `let` in Chrome (V8).
- `var` -- è una dichiarazione delle variabili più vecchia-scuola. Normalmente non si dovrebbe utilizzare, spiegheremo le sottili differenze da `let` nel capitolo <info:var>, giusto per esserne a conoscenza.
- `const` -- è simile a `let`, ma non consente di cambiare il valore della variabile.

<<<<<<< HEAD
Le variabili dovrebbero avere dei nomi che ci consentono di capire facilmente cosa c'è dentro.
=======
Variables should be named in a way that allows us to easily understand what's inside them.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
