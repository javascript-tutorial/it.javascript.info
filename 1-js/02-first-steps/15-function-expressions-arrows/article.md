# Espressioni di funzione e funzioni a freccia

In JavaScript, una funzione non è una "struttura magica del linguaggio", ma un valore speciale.

La sintassi che abbiamo utilizzato prima vien chiamata *Dichiarazione di Funzione*:

```js
function sayHi() {
  alert( "Hello" );
}
```

E' disponibile un'altra sintassi per creare una funzione chiamata *Espressione di Funzione*.

Ed appare cosi:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

Qui la funzione viene creata ed assegnata ad una variabile esplicitamente proprio come qualsiasi altro valore. Non ha importanza come la funzione viene definita, è solo una valor salvato nella variabile `sayHi`.

Il significato di questo esempio è lo stesso di: "creare una funzione e metterla dentro la variabile `sayHi`".

Possiamo anche stamparne il valore usando `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // mostra il codice della funzione
*/!*
```

Da notare che l'ultima riga di codice non esegue la funzione, perchè non ci sono parentesi dopo `sayHi`. Ci sono linguaggi di programmazione in cui la semplice menzione del nome di funzione ne causa l'esecuzione, JavaScript non si comporta cosi.

In JavaScript, una funzione è un valore, quindi possiamo trattarla come un valore. Il codice sopra ne mostra la sua rappresentazione in stringa, cioè il codice contenuto dentro la funzione.

E' chiaramente un valore speciale, poichè possiamo richiamarla con `sayHi()`.

Ma rimane comunque un valore. Quindi possiamo trattarlo come un qualsiasi altro valore.

Possiamo copiare la funzione in un'altra variabile:

```js run no-beautify
function sayHi() {   // (1) creazione
  alert( "Hello" );
}

let func = sayHi;    // (2) copia

func(); // Hello     // (3) esegue la copia (funziona)!
sayHi(); // Hello    //     anche questa continua a funzionare (ed è giusto che sia cosi)
```

Quello che succede nel dettaglio è:

1. La dichiarazione di funzione `(1)` crea la funzione e la inserisce nella variabile denominata `sayHi`.
2. La linea `(2)` la copia nella variabile `func`.

    Ancora una volta: non ci sono parentesi dopo `sayHi`. Se ci fossero state, allora `func = sayHi()` avrebbe scritto *il risultato della chiamata* `sayHi()` in `func`, non *la funzione* `sayHi`.
3. Adesso la funzione può essere richiamata sia con `sayHi()` che con `func()`.

Avremmo anche potuto utilizzare un espressione di funzione per dichiarare `sayHi`, nella prima riga:

```js
let sayHi = function() { ... };

let func = sayHi;
// ...
```

Tutto funzionerebbe ugualmente. Risulta anche più chiaro cosa sta succedendo, giusto?


````smart header="Perchè c'è un punto e virgola alla fine?"
Vi starete chiedendo perchè con l'espressione di funzione bisogna mettere `;` alla fine, mentre con la dichiarazione di funzione non serve:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

La risposta è semplice:
- Non c'è bisogno di `;` alla fine dei blocchi di codice che utilizzano una sintassi del tipo `if { ... }`, `for {  }`, `function f { }` etc.
- Un espressione di funzione viene utilizzata all'interno di un istruzione: `let sayHi = ...;`, come valore. Non è un blocco di codice. Quindi il `;` è consigliato al termine dell'istruzione, indipendentemente dal valore. Quindi il punto e virgola non è collegato all'espressione di funzione, più semplicemente termina un istruzione.
````

## Funzioni richiamate

Diamo un occhiata ad ulteriori esempi di passaggio di funzione come valore e utilizzo di espressioni di funzione.

Scriveremo una funzione `ask(question, yes, no)` con tre parametri:

`question`
: Il testo della domanda

`yes`
: Funzione da eseguire se la risposta è "Yes"

`no`
: Funzione da eseguire se la risposta è "No"

La funzione dovrebbe richiedere la `question` e, in base alla risposta dell'utente, chiamare `yes()` o `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// utilizzo: funzioni showOk, showCancel vengono passate come argomenti ad ask
ask("Do you agree?", showOk, showCancel);
```

Prima abbiamo visto come riscrivere le funzioni in maniera più breve, da notare che nel browser (e in alcuni casi anche lato server) queste funzioni risultano molto popolari. La principale differenza tra un implementazione realistica e gli esempi sopra è solo che le funzioni reali utilizzano modalità più complesse per interagire con l'utente, non un semplice `confirm`. In ambiente browser, queste funzioni spesso mostrano delle interrogazioni molto carine. Ma questo è un altro discorso.

**Gli argomenti della `ask` sono chiamati *funzioni di richiamo* o semplicemente *callbacks*.**

L'idea è che passiamo una funzione e ci aspettiamo di "richiamarla" più tardi se necessario. Nel nostro caso `showOk` diventa la callback per la risposta "yes", e `showCancel` per la risposta "no".

Possiamo utilizzare un espressione di funzione per scrivere la stessa funzione più in breve:s

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```


Qui la funzione viene dichiarata dentro alla chiamata di `ask(...)`. Queste non hanno nome, e sono denominate *anonime*. Queste funzioni non sono accessibili dall'esterno di `ask` (perchè non sono assegnate a nessuna variabile), ma è proprio quello che vogliamo in questo caso.

Questo tipo codice apparirà nei nostri script molto naturalmente, è nello spirito del JavaScript.


```smart header="Una funzione è un valore che rappresenta un \"azione\""
I valori regolari come le stringhe o i numeri rappresentano *dati*.

Una funzione può anche essere vista come un *azione*.

Possiamo passarla tra le variabili ed eseguirla quando vogliamo.
```


## Espressione di Funzioni vs Dichiarazione di Funzioni

Cerchiamo di elencare le differenze chiave tra Dichiarazioni ed Espressioni di Funzione.Expressions.

Primo, la sintassi: come capire cosa è cosa nel codice.

- *Dichiarazione di funzione:* una funzione, dichiarata come un istruzione separata, nel flusso principale del programma.

    ```js
    // Dichiarazione di funzione
    function sum(a, b) {
      return a + b;
    }
    ```
- *Espressione di funzione:* una funzione, creata all'interno di un espressione o all'interno di un altro costrutto. Qui, la funzione è creata alla destra dell' "espressione di assegnazione" `=`:
    
    ```js
    // Espressione di funzione
    let sum = function(a, b) {
      return a + b;
    };
    ```

La differenza più subdola è *quando* una funzione viene creata dal motore JavaScript engine.

<<<<<<< HEAD
**Un espressione di funzione viene creata quando l'esecuzione la raggiunge ed è utilizzabile da quel momento in poi.**
=======
**A Function Expression is created when the execution reaches it and is usable only from that moment.**
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

Quando il flusso di esecuzione passa alla destra dell'operatore di assegnazione `let sum = function…` -- , la funzione viene creata e può essere utilizzata (assegnata, chiamata, etc...) a partire da quel momento.

La dichiarazione di funzione si comporta diversamente.

<<<<<<< HEAD
**Una dichiarazione di funzione è utilizzabile nell'intero script/blocco di codice.**

In altre parole, quando JavaScript si *prepara* ad eseguire lo script o un blocco di codice, come prima cosa guarda le dichiarazioni di funzione contenute e le crea. Possiamo pensare a questo processo come uno "stage di inizializzazione".

E dopo che tutte le dichiarazioni di funzione sono state processate, l'esecuzione potrà procedere.

Come risultato, una funzione creata come dichiarazione di funzione può essere richiamata anche prima della sua definizione.
=======
**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

Ad esempio il seguente codice funziona:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

La dichiarazione di funzione `sayHi` viene creata quando JavaScript si sta preparando ad eseguire lo script ed è visibile in qualsiasi punto.

<<<<<<< HEAD
...Se fosse stata un espressione di funzione, non avrebbe funzionato:
=======
...If it were a Function Expression, then it wouldn't work:
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

```js run refresh untrusted
*!*
sayHi("John"); // errore!
*/!*

let sayHi = function(name) {  // (*) nessuna magia
  alert( `Hello, ${name}` );
};
```

Le espressioni di funzione sono create quando l'esecuzione le incontra. In questo esempio avverà solo alla riga `(*)`. Troppo tardi.

<<<<<<< HEAD
**Quando una dichiarazione di funzione viene fatta all'interno di un blocco di codice, sarà visibile ovunque all'interno del blocco, ma non al suo esterno.**

Qualche volta è comodo dichiarare funzioni locali utili in un singolo blocco. Ma questa caratteristica potrebbe causare problemi.
=======
**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

Ad esempio, immaginiamo di aver bisogno di dichiarare una funzione `welcome()` in base ad un parametro `age` che valuteremo a runtime. E abbiamo intenzione di utilizzarlo più avanti.

<<<<<<< HEAD
Il codice sotto non funziona:
=======
If we use Function Declaration, it won't work as intended:
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

```js run
let age = prompt("What is your age?", 18);

// dichiarazione di funzione condizionale
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...utilizzo successivo
*!*
welcome(); // Errore: welcome non è definita
*/!*
```

Questo accade perchè una dichiarazione di funzione è visibile solamente all'interno del blocco di codice in cui è scritta.

Un altro esempio:

```js run
let age = 16; // prendiamo 16 come esempio

if (age < 18) {
*!*
  welcome();               // \   (esegue)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Dichiarazione di funzione disponibile
  }                        //  |  ovunque nel blocco in cui è stata dichiarata
                           //  |
*!*
  welcome();               // /   (esegue)
*/!*

} else {

  function welcome() {     //  per age = 16, "welcome" non verrà mai creata
    alert("Greetings!");
  }
}

// Qui siamo all'esterno delle parentesi graffe, 
// quindi non possiamo vedere le dichiarazioni di funzione fatte al suo interno.

*!*
welcome(); // Errore: welcome non è definita
*/!*
```

Cosa possiamo fare per rendere visibile `welcome` all'esterno del blocco `if`?

Il giusto approccio è quello di utilizzare un espressione di funzione ed assegnarla ad una variabile `welcome` che viene dichiarata all'esterno di `if` ed ha quindi la corretta visibilità.

Ora funziona:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ora funziona
*/!*
```

Oppure possiamo semplificarla con l'utilizzo dell'operatore `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ora funziona
*/!*
```


<<<<<<< HEAD
```smart header="Quando conviene scegliere un dichiarazione di funzione vs espressione di funzione?"
Come regola fondamentale, quando abbiamo la necessita di dichiarare una funzione, la prima opzione da considerare è la dichiarazione di funzione. Fornisce maggiore libertà sul come organizzare il codice, poichè possiamo utilizzare quella funzione anche prima della sua dichiarazione.

Risulta anche più facile vedere `function f(…) {…}` nel codice, piuttosto che `let f = function(…) {…}`. La dichiarazione di funzione è più facile da "notare".

...Ma se per qualche ragione la dichiarazione di funzione non si applica bene al caso in questione (abbiamo visto degli esempi sopra), allora l'espressione di funzione può essere utilizzata.
=======
```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…}`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
```


## Funzioni freccia [#arrow-functions]

C'è anche un ulteriore modo molto semplice e breve per creare funzioni, questo a volte è anche meglio delle espressioni di funzione. Vengono chiamate "funzioni freccia" perchè si scrivono in questo modo:


```js
let func = (arg1, arg2, ...argN) => expression
```

...Questa riga di codice crea una funzione `func` che ha come argomenti `arg1..argN`, valuta `expression` sulla destra e ritorna il risultato.

In altre parole, è quasi la stessa cosa di:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

...Ma più breve.

Vediamo un esempio:

```js run
let sum = (a, b) => a + b;

/* La funzione a freccia è una forma più breve di:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

Se abbiamo un solo argomento, le parentesi possono essere omesse, rendendo il tutto ancora più breve:

```js run
// lo stesso vale per 
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

Se non ci sono argomenti, le parentesi possono essere vuote (ma devono comunque esserci):

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

Le funzioni a freccia possono essere utilizzate allo stesso modo delle espressioni di funzione.

Ad esempio, qui proviamo a riscrivere l'esempio `welcome()`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ora funziona
```

Le funzioni freccia potrebbero sembrare poco familiari e non molto leggibili al primo sguardo, ma vi ci abituerete molto velocemente.

Sono molto convenienti per azioni di una singola riga, soprattutto quando siamo pigri e vogliamo risparmiare parole.

```smart header="Funzioni freccia a più righe"

L'esempio sopra prende gli argomenti dalla sinistra del simbolo `=>` e valuta la parte destra dell'espressione.

Qualche voltra potremmo aver bisogno di qualcosa di molto più complesso, come espressioni multiple o più istruzioni. E' possibile farlo con le funzioni freccia, ma dovremmo racchiudere il corpo all'interno delle parentesi graffe. Ed utilizzare il `return`.

Come in questo esempio:

```js run
let sum = (a, b) => {  // la parentesi graffa apre una funzione multiriga
  let result = a + b;
*!*
  return result; // se utilizziamo le parentesi graffe, dobbiamo utilizzare esplicitamente return per ritornare il risultato
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="C'è dell'altro"
Fini qui ho lodato le funzioni a freccia per brevità. Ma non è tutto! Le funzioni a freccia hanno altre caratteristiche interessanti. Ci ritorneremo più avanti nel capitolo <info:arrow-functions>.

Per ora possiamo comunque utilizzarle per azioni a singola riga e callback.
```

## Riepilogo

- Le funzioni sono valori. Possono essere assegnate, copiate o dichiarate in ogni punto del codice.
- Se la funzione viene dichiarata come istruzione a sè nel flusso principale, questa viene chiamata "Dichiarazione di Funzione".
- Se al funzione viene creata come parte di un espressione, viene detta un "Espressione di Funzione".
- Dichiarazioni di funzione vengono processate prima dell'esecuzione del blocco. Sono visibili ovunque nel blocco.
- Espressioni di funzione create quando il flusso di esecuzione le incontra.


Nella maggior parte dei casi quando abbiamo bisogno di dichiarare una funzione, una dichiarazione di funzione è preferibile, poichè è visibile anche prima della riga di dichiarazione. Questo ci fornisce più flessibilità nell'organizzazione del codice, e solitamente risulta più leggibile.

Quindi dovremmo utilizzare un espressione di funzione solo quando una dichiarazione di funzione non è adatta al caso specifico. Abbiamo visto un paio di esempi in questo capitolo, e ne vederemo altri in futuro.

Le funzioni a freccia sono comode per funzioni composte da una singola riga. Forniscono dei vantaggi:

1. Possono essere omesse le parentesi graffe: `(...args) => expression` -- la parte destra è un'espressione: la funzione la valuta e ritorna il risultato.
2. Con parentesi graffe: `(...args) => { body }` -- le parentesi ci consento di scrivere più istruzioni all'interno della funzione, ma è necessario un `return` esplicito per ritornare qualcosa.
