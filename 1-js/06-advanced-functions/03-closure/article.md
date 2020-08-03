
# Variable scope

<<<<<<< HEAD
JavaScript è un linguaggio fortemente orientato alle funzioni. Fornisce molta libertà. Una funzione può essere creata in qualsiasi momento, copiata su una variabile o passata come argomento ad un'altra funzione e richiamata da qualsiasi punto del codice.

Sappiamo che una funzione può accedere alle variabili esterne, questa caratteristica viene spesso utilizzata.

Cosa accade quando una variabile esterna cambia? La funzione utilizza il valore più recente o quello presente al momento della creazione della funzione?

Inoltre, cosa accade quando una funzione viene spostata in un altro punto del codice e viene richiamata -- avrebbe accesso alle variabile esterne della nuova posizione?

In questa situazione linguaggi diversi si comportano in maniera diversa, in questo capitolo ci occuperemo del comportamento di JavaScript.

## Un paio di domande

Consideriamo due situazioni, di cui studieremo le meccaniche interne pezzo per pezzo, cosi sarete in grado di rispondere autonomamente a queste domande e a molte altre.

1. La funzione `sayHi` utilizza una variabile esterna `name`. Quando la funzione viene eseguita, quale valore viene utilizzato?

    ```js
    let name = "John";

    function sayHi() {
      alert("Hi, " + name);
    }

    name = "Pete";

    *!*
    sayHi(); // what will it show: "John" or "Pete"?
    */!*
    ```

    Queste situazioni sono molto comuni nello sviluppo browser e server-side. Una funzione potrebbe dover essere scritta, ed eseguita in un momento differente, ad esempio a seguito di un azione dell'utente o una richiesta di rete.

    Quindi, la domanda è: la funzione preleva i valori più recenti?


2. La funzione `makeWorker` crea un'altra funzione e la ritorna. Questa nuova funzione può essere chiamata da qualsiasi altro punto del codice. Avrebbe quindi accesso alle variabili esterne del punto in cui è stata creata, o a quelle del punto di invocazione, o entrambe?

    ```js
    function makeWorker() {
      let name = "Pete";

      return function() {
        alert(name);
      };
    }

    let name = "John";

    // create a function
    let work = makeWorker();

    // call it
    *!*
    work(); // what will it show? "Pete" (name where created) or "John" (name where called)?
    */!*
    ```


## Lexical Environment

Per capire in quale contesto ci troviamo, dobbiamo prima discutere di cosa sia realmente una "variabile".

In JavaScript, ogni funzione in esecuzione, blocco di codice, e lo script nella sua interezza possiedono un oggetto associato conosciuto come *Lexical Environment*.

L'oggetto Lexical Environment consiste di due parti:

1. *Environment Record* -- un oggetto che contiene tutte le variabili locali e le relative proprietà (e alcune altre informazioni come il valore di  `this`).
2. Un riferimento al *outer lexical environment* (lexical environment esterno).

**Quindi, una "variabile" è solamente una proprietà di questo speciale oggetto, l'`Environment Record`. "Per ottenere o modificare una variabile" si traduce in "per ottenere o modificare una variabile del Lexical Environment".**

Ad esempio, in questo semplice codice, esiste un solo Lexical Environment:

![lexical environment](lexical-environment-global.svg)

Questo viene anche chiamato global Lexical Environment (Lexical Environment globale), associato all'intero script.

Nella figura sopra, il rettangolo significa Environment Record, mentre la freccia indica il riferimento esterno. Il global Lexical Environment non possiede riferimenti esterni, quindi questo punta a `null`.

Qui vediamo una figura più grande sul funzionamento di `let`:

![lexical environment](lexical-environment-global-2.svg)

I rettangoli dalla parte destra dimostrano come cambia il global Lexical Environment durante l'esecuzione:

1. Quando lo script inizia, il Lexical Environment è vuoto.
2. Appare la definizione `let phrase`. Non gli viene assegnato alcun valore, quindi viene memorizzato `undefined`.
3. Viene assegnato un valor a `phrase`.
4. `phrase` punta ad un nuovo valore.

Finora è tutto piuttosto semplice, giusto?

Per ricapitolare:

- Una variabile è una proprietà di uno speciale oggetto interno, associata al corrente blocco/funzione/script.
- Lavorare con le variabili è come lavorare con le proprietà di questo oggetto.

### Dichiarazione di funzione

Le dichiarazioni di funzione sono speciali. A differenza di `let` per le variabili, vengono processate non quando il flusso d'esecuzione le incontra, ma quando il Lexical Environment viene creato. Nel caso del global Lexical Environment, significa all'inizio dello script.

Questo è il motivo per cui possiamo chiamare una funzione prima della sua definizione.

Il codice sotto dimostra che il Lexical Environment inizialmente non è vuoto. Contiene `say`, perché è una dichiarazione di funzione. Successivamente verrà inserito anche `phrase`, dichiarato con `let`:

![lexical environment](lexical-environment-global-3.svg)


### Lexical Environment interno ed esterno

Durante la sua esecuzione, `say()` utilizza una variabile esterna, quindi proviamo ad analizzare più in dettaglio cosa sta succedendo.

Inizialmente, quando una funzione viene eseguita, viene creato un nuovo Lexical Environment per la funzione. Questa è una regola generale valida per tutte le funzioni. Questo Lexical Environment viene utilizzato per memorizzare le variabili locali e i parametri.

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

In questa figura vediamo il contenuto del Lexical Environments quando il flusso d'esecuzione si trova all0interno di `say("John")`, nella riga etichettata con la freccia:

![lexical environment](lexical-environment-simple.svg)
 
Durante la chiamata di funzione abbiamo due Lexical Environments: quello interno (relativo alla funzione) e quello esterno (globale):

- Il Lexical Environment interno che corrisponde all'esecuzione di `say`. Che possiede una sola variabile: `name`, che è l'unico argomento della funzione. Abbiamo invocato `say("John")`, quindi il valore di name `name` è `"John"`.
- Il Lexical Environment esterno è quello globale.

Il Lexical Environment interno ha un riferimento a quello esterno, memorizzato su `outer`.

**Quando il codice vuole accedere ad una variabile -- come prima cosa la si cerca nel Lexical Environment interno, successivamente in quello esterno, poi in quello ancora più esterno e cosi via fino a quello più esterno.**

 Se una variabile non viene trovata, si ha un errore in strict mode. Senza `use strict`, viene creata una variabile globale, per consentire la retro-compatibilità.

Vediamo come procede la ricerca nel nostro esempio:

- Quando `alert` all'interno di `say` vuole accedere a `name`, trova la variabile immediatamente nel Lexical Environment della funzione.
- Quando vuole accedere a `phrase`, non trova nessun `phrase` localmente, quindi segue il riferimento `outer` e la trova nel Lexical Environment esterno.
=======
JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created dynamically, passed as an argument to another function and called from a totally different place of code later.

We already know that a function can access variables outside of it.

Now let's expand our knowledge to include more complex scenarios.

```smart header="We'll talk about `let/const` variables here"
In JavaScript, there are 3 ways to declare a variable: `let`, `const` (the modern ones), and `var` (the remnant of the past).

- In this article we'll use `let` variables in examples.
- Variables, declared with `const`, behave the same, so this article is about `const` too.
- The old `var` has some notable differences, they will be covered in the article <info:var>.
```

## Code blocks

If a variable is declared inside a code block `{...}`, it's only visible inside that block.

For example:

```js run
{
  // do some job with local variables that should not be seen outside

  let message = "Hello"; // only visible in this block

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

We can use this to isolate a piece of code that does its own task, with variables that only belong to it:

```js run
{
  // show message
  let message = "Hello";
  alert(message);
}
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

{
  // show another message
  let message = "Goodbye";
  alert(message);
}
```

<<<<<<< HEAD
Ora possiamo dare una risposta alla prima domanda che ci siamo posti a inizio capitolo.

**Una funzione preleva le variabili esterne per come sono al momento; utilizza quindi il valore più recente.**

Abbiamo descritto il meccanismo. Sappiamo che i vecchi valori di una variabile non sono salvati da nessuna parte. Quindi quando una funzione li richiede, riceve necessariamente il valore corrente, localmente oppure dal Lexical Environment esterno.

Quindi la risposta alla prima domanda è `Pete`:
=======
````smart header="There'd be an error without blocks"
Please note, without separate blocks there would be an error, if we use `let` with the existing variable name:

```js run
// show message
let message = "Hello";
alert(message);

// show another message
*!*
let message = "Goodbye"; // Error: variable already declared
*/!*
alert(message);
```
````

For `if`, `for`, `while` and so on, variables declared in `{...}` are also only visible inside:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Error, no such variable!
```

Here, after `if` finishes, the `alert` below won't see the `phrase`, hence the error.

<<<<<<< HEAD
Il flusso d'esecuzione è:

1. Il Lexical Environment globale possiede `name: "John"`.
2. Alla riga `(*)` la variabile globale viene modificata, ora `name: "Pete"`.
3. Quando la funzione `sayHi()` viene eseguita, prende `name` esternamente. In questo caso dal Lexical Environment globale, in cui vale `"Pete"`.
=======
That's great, as it allows us to create block-local variables, specific to an `if` branch.

The similar thing holds true for `for` and `while` loops:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
for (let i = 0; i < 3; i++) {
  // the variable i is only visible inside this for
  alert(i); // 0, then 1, then 2
}

<<<<<<< HEAD
```smart header="Una chiamata -- un Lexical Environment"
Da notare che un viene creato un nuovo Lexical Environment ad ogni esecuzione di una funzione.

Se una funzione viene chiamata più volte, allora ogni invocazione avrà il suo personale Lexical Environment, con variabili locali e parametri specifici per quell'esecuzione.
```

```smart header="Lexical Environment è un oggetto definito dalla specifica"
Il "Lexical Environment" è un oggetto definito sulle specifiche. Non possiamo prenderlo e manipolarlo direttamente. Il motore JavaScript potrebbe ottimizzarlo, scartando variabili inutilizzate per sfruttare al meglio la memoria e ottimizzare le prestazioni, ma il comportamento rimane quello descritto.
=======
alert(i); // Error, no such variable
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
```

Visually, `let i` is outside of `{...}`. But the `for` construct is special here: the variable, declared inside it, is considered a part of the block.

## Funzioni annidate

Una funzione si definisce "annidata" quando viene creata all'interno di un'altra funzione.

E' molto semplice farlo in JavaScript.

Possiamo utilizzare questo concetto per organizzare il codice, come in questo esempio:

```js
function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```

Qui la funzione *annidata*  `getFullName()` è stata creata per comodità. Può accedere alle variabili esterne quindi può ritornarne il nome completo.

<<<<<<< HEAD
Un'altra cosa interessante, una funzione annidata può essere ritornata: sia come proprietà di un nuovo oggetto(se la funzione esterna crea un oggetto con dei metodi) o come risultato stesso. Può essere salvata e utilizzata da qualsiasi altra parte. Non ha importanza dove, avrà comunque accesso alle stesse variabili esterne.

Un esempio con il costruttore (vedere il capitolo <info:constructor-new>):

```js run
// constructor function returns a new object
function User(name) {

  // the object method is created as a nested function
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // the method code has access to the outer "name"
```

Un esempio con ritorno di funzione:
=======
What's much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.

Below, `makeCounter` creates the "counter" function that returns the next number on each invocation:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

<<<<<<< HEAD
Proseguiamo con l'esempio `makeCounter`. Crea una funzione "contatore" che ritorna il numero successivo ad ogni invocazione. Nonostante sia semplice, delle varianti modificate di questo codice hanno usi pratici, ad esempio, come [generatore di numeri pseudocasuali](https://en.wikipedia.org/wiki/Pseudorandom_number_generator), e molto altro. Quindi l'esempio non è cosi artificiale.

Come funziona il counter internamente?

Quando viene eseguita la funzione esterna , la variabile `count++` viene ricercata dall'interno verso l'esterno. Nell'esempio sopra, l'ordine sarà:
=======
Despite being simple, slightly modified variants of that code have practical uses, for instance, as a [random number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to generate random values for automated tests.

How does this work? If we create multiple counters, will they be independent? What's going on with the variables here?
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Undestanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let's go a bit in-depth.

<<<<<<< HEAD
1. Variabili locali della funzione annidata...
2. Variabili della funzione esterna...
3. E cosi via fino ad arrivare alle variabili globali.

In questo esempio `count` viene trovata nel caso `2`. Quando una variabile esterna viene modificata, il valore cambia nel contesto in cui è stata trovata. Quindi `count++` trova la variabile all'esterno e la incrementa nel Lexical Environment a cui appartiene. Come se avessimo `let count = 1`.

Ci sono due considerazioni da fare:

1. Possiamo in qualche modo resettare la variabile `counter` da una parte di codice che non appartiene a `makeCounter`? Ad esempio dopo la chiamata ad `alert`.
2. Se chiamiamo `makeCounter()` più volte -- ritorna più funzioni `counter`. Sono indipendenti tra loro oppure condividono il valore `count`?

Prima di continuare provate a rispondere.

...

Fatto?

Okay, allora vediamo le risposte.

1. No non c'è alcun modo di farlo. La variabile `counter` è locale alla funzione, non possiamo accedervi dall'esterno.
2. Per ogni chiamata a `makeCounter()` viene creato un nuovo Lexical Environment, con i suoi `counter`. Quindi le funzioni `counter` sono indipendenti.

Vediamo un esempio di quanto detto:

```js run
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();
=======
## Lexical Environment
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```warn header="Here be dragons!"
The in-depth technical explanation lies ahead.

As far as I'd like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.
```

For clarity, the explanation is split into multiple steps.

<<<<<<< HEAD
Dovrebbe esservi abbastanza chiara la situazione delle variabili esterne. In alcune situazioni più complesse potrebbe essere necessaria un'analisi più profonda. Quindi andiamo più in profondità.

## Environment nel dettaglio

Ora che avete una maggiore conoscenza delle closure, possiamo scendere più in profondità.

Qui analizziamo cosa succede nell'esempio `makeCounter` passo per passo, seguitelo attentamente per essere certi di comprenderne il funzionamento. Da notare un ulteriore proprietà `[[Environment]]` di cui non abbiamo ancora parlato.

1. Quando lo script inizia, si ha solamente il Lexical Environment globale:

    ![](lexenv-nested-makecounter-1.svg)

    Inizialmente si ha solamente la funzione `makeCounter`, perché è una dichiarazione di funzione. Non ha ancora eseguito.

    **Tutte le funzioni "alla nascita" ricevono una proprietà nascosta `[[Environment]]` con un riferimento al Lexical Environment corrispondente.**
    Non lo avevamo spiegato finora, ma questo è il meccanismo con cui viene collegata la funzione al rispettivo Lexical Environment.

    Qui, `makeCounter` viene creata nel Lexical Environment globale, quindi `[[Environment]]` contiene un riferimento a questo.

    In altre parole, una funzione viene marchiata con un riferimento al Lexical Environment di nascita. Inoltre `[[Environment]]` è una proprietà nascosta della funzione che mantiene questo riferimento.

2. Il codice prosegue nell'esecuzione, viene dichiarata una nuova variabile globale `counter` con valore `makeCounter()`. Nell'immagine vediamo il momento in cui l'esecuzione si trova nella prima riga di `makeCounter()`:

    ![](lexenv-nested-makecounter-2.svg)

    Quando viene invocata `makeCounter()`, viene creato un Lexical Environment, che dovrà memorizzare le variabili e gli argomenti.

    Come tutti i Lexical Environment, memorizza due cose:
    1. Un Environment Record con le variabili locali. Nel nostro caso `count` è l'unica variabile locale (che apparirà nel momento in cui verrà eseguita la riga `let count`).
    2. Un riferimento al Lexical Environment esterno, che si trova su `[[Environment]]`. Nel nostro caso `[[Environment]]` di `makeCounter` contiene un riferimento al Lexical Environment globale.

    Quindi, ora abbiamo due Lexical Environment: il primo è quello globale, il secondo è relativo alla chiamata di `makeCounter`, con un riferimento esterno a quello globale.

3. Durante l'esecuzione di `makeCounter()`, viene creata una piccola funzione annidata.

    Non ha importanza se questa viene creata tramite dichiarazione di funzione, piuttosto che tramite espressione di funzione. Tutte le funzioni possiedono la proprietà `[[Environment]]` che fa riferimento al Lexical Environment in cui sono state create. Lo stesso vale anche per la nostra funzione annidata.

    Per la nostra funzione annidata il valore di `[[Environment]]` è il Lexical Environment corrente, quello di `makeCounter()`:
=======
### Step 1. Variables

In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the *Lexical Environment*.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

The Lexical Environment object consists of two parts:

<<<<<<< HEAD
    Da notare che in questo passaggio la funzione viene solamente creata, non c'è stata ancora nessuna chiamata. Il codice contenuto in `function() { return count++; }` non viene eseguito; su questo ci ritorneremo presto.

4. L'esecuzione della funzione prosegue, e la chiamata di `makeCounter()` termina, il risultato (la funzione annidata) viene assegnata alla variabile globale `counter`:
=======
1. *Environment Record* -- an object that stores all local variables as its properties (and some other information like the value of `this`).
2. A reference to the *outer lexical environment*, the one associated with the outer code.

**A "variable" is just a property of the special internal object, `Environment Record`. "To get or change a variable" means "to get or change a property of that object".**
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

In this simple code without functions, there is only one Lexical Environment:

<<<<<<< HEAD
    La funzione risultante possiede una sola riga di codice: `return count++`, che verrà eseguita solamente quando verrà invocata.

5. Quando viene invocata `counter()`, viene creato un Lexical Environment "vuoto". Non si hanno variabili locali. Solamente la proprietà `[[Environment]]` di `counter` viene utilizzata come riferimento esterno, quindi questa funzione ha accesso alle variabili di `makeCounter()` presenti al momento della creazione:
=======
![lexical environment](lexical-environment-global.svg)

This is the so-called *global* Lexical Environment, associated with the whole script.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that's why the arrow points to `null`.

<<<<<<< HEAD
    Ora se proviamo ad accedere ad una variabile, questa verrà prima cercata nel Lexical Environment locale (vuoto), successivamente si andrà a controllare il Lexical Environment esterno, quello relativo a `makeCounter()`, infine si guarderà quello globale.

    Mentre è alla ricerca di `count`, trova una corrispondenza nelle variabili di `makeCounter`, nel Lexical Environment esterno.

    Prestate attenzione a come funziona il gestore della memoria in questa situazione. Sebbene la chiama a `makeCounter()` si sia conclusa diverso tempo fa, il suo Lexical Environment è stato mantenuto in memoria, poiché una funzione annidata ne possiede un riferimento nella proprietà `[[Environment]]`.

    Generalmente, un Lexical Environment appartenente ad un oggetto rimane in memoria finché c'è la possibilità che una funzione possa averne bisogno. E solamente quando tutti riferimenti vengono rimossi, allora verrà cancellato.

6. La chiamata a `counter()` non ritorna solamente il valore di `count`, ma provvede anche ad incrementarlo. Da notare che la modifica viene eseguita "sul posto". Il valore di `count` viene modificato esattamente nell'environment in cui è stato trovato.
=======
As the code starts executing and goes on, the Lexical Environment changes.

Here's a little bit longer code:

![lexical environment](closure-variable-phrase.svg)

Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
    - Initially, they are in the "Uninitialized" state. That's a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with `let`. It's almost the same as if the variable didn't exist.
2. Then `let phrase` definition appears. There's no assignment yet, so its value is `undefined`. We can use the variable from this point forward.
3. `phrase` is assigned a value.
4. `phrase` changes the value.

<<<<<<< HEAD
    Quindi ritorniamo al passaggio precedente con un solo cambiamento -- il nuovo valore di `count`. Le chiamate successive faranno esattamente lo stesso.

7. La successiva invocazione a `counter()` fa la stessa cosa.

La risposta alla seconda domanda ormai dovrebbe essere ovvia.

La funzione `work()` nel codice sopra utilizza `name` nel posto in cui la trova, seguendo i riferimenti al lexical environment esterno:
=======
Everything looks simple for now, right?

- A variable is a property of a special internal object, associated with the currently executing block/function/script.
- Working with variables is actually working with the properties of that object.

```smart header="Lexical Environment is a specification object"
"Lexical Environment" is a specification object: it only exists "theoretically" in the [language specification](https://tc39.es/ecma262/#sec-lexical-environments) to describe how things work. We can't get this object in our code and manipulate it directly.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.
```

<<<<<<< HEAD
Quindi, il risultato è `"Pete"`.

Ma se non ci fosse `let name` in `makeWorker()`, allora la ricerca proseguirebbe all'esterno, in cui avrebbe accesso alle variabili globali. In questo caso sarebbe `"John"`.

```smart header="Closure"
Esiste un termine generico nella programmazione, "closure", che gli sviluppatori dovrebbero conoscere.

Una [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) è una funzione che memorizza le variabili esterne e vi può accedere. In alcuni linguaggi non è consentito, oppure bisogna scrivere una funzione in un determinato modo per ottenere questo risultato. Ma come spiegato sopra, in JavaScript, tutte le funzioni sono per natura closure (esiste solamente un eccezione, che studieremo nel capitolo <info:new-function>).

Cioè: loro automaticamente ricordano dove sono state create, sfruttando una proprietà nascosta `[[Environment]]`, che gli consente di accedere alle variabili esterne.

Durante un'intervista ad un frontend developer, si potrebbe porre la domanda: "cos'è una closure?", una risposta valida sarebbe una definizione di closure seguita dalla precisazione che tutte le funzioni in JavaScript sono delle closure, e magari qualche altro dettaglio tecnico: la proprietà `[[Environment]]` e il funzionamento del Lexical Environment.
```

## Blocchi di codice e cicli, IIFE

Gli esempi sopra si sono concentrati sulle funzioni. Ma i Lexical Environment esistono anche per i blocchi di codice `{...}`.

Vengono creati quando un blocco di codice viene eseguito e contiene le variabili locali. Vediamo un paio di esempi.

## If

In questo esempio, quando l'esecuzione arriva dentro il blocco `if`, viene creato un Lexical Environment relativo a "if":
=======
### Step 2. Function Declarations

A function is also a value, like a variable.

**The difference is that a Function Declaration is instantly fully initialized.**

When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike `let`, that is unusable till the declaration).

That's why we can use a function, declared as Function Declaration, even before the declaration itself.

For example, here's the initial state of the global Lexical Environment when we add a function:

![](closure-function-declaration.svg)

Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as `let say = function(name)...`.

### Step 3. Inner and outer Lexical Environment

When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.

For instance, for `say("John")`, it looks like this (the execution is at the line, labelled with an arrow):
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

<<<<<<< HEAD
![](lexenv-if.svg)

Il nuovo Lexical Environment ottiene un riferimento a quello esterno, quindi `phrase` è accessibile. Invece tutte le variabili e funzioni create all'interno del blocco `if` appartengono al Lexical Environment interno e non sono quindi accessibili dall'esterno.

Ad esempio, quando `if` termina, la chiamata `alert` sotto non potrebbe accedere a `user`.

## For, while

Per un ciclo, ogni iterazione possiede un Lexical Environment separato. Se una variabile viene dichiarata in un ciclo `for`, allora questa è locale solamente a quel Lexical Environment:

```js run
for (let i = 0; i < 10; i++) {
  // Each loop has its own Lexical Environment
  // {i: value}
}

alert(i); // Error, no such variable
```

In realtà c'è un eccezione, poichè `let i` è visibilmente all'esterno di `{...}`. In realtà ogni esecuzione del ciclo ha il suo Lexical Environment personale, in cui è contenuta anche la variabile `i`.

Al termine del ciclo, `i` non sarà più visibile.

### Blocchi di codice

Possiamo anche utilizzare un blocco di codice "puro" con lo scopo di isolare delle variabili in uno "scope locale".

Ad esempio, in un browser tutti gli script condividono la stessa area globale. Quindi se creiamo una variabile globale in uno script, questa diventa accessibili anche agli altri. Questo potrebbe essere sorgente di conflitti tra due script che utilizzano variabili con gli stessi nomi.

Questa situazione può accadere con nomi di variabili molto diffusi.

Per evitare queste situazioni, possiamo utilizzare un blocco di codice per isolare l'intero script o una sua porzione:
=======
![](lexical-environment-simple.svg)

During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

- The inner Lexical Environment corresponds to the current execution of `say`. It has a single property: `name`, the function argument. We called `say("John")`, so the value of the `name` is `"John"`.
- The outer Lexical Environment is the global Lexical Environment. It has the `phrase` variable and the function itself.

The inner Lexical Environment has a reference to the `outer` one.

**When the code wants to access a variable -- the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.**

If a variable is not found anywhere, that's an error in strict mode (without `use strict`, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).

In this example the search proceeds as follows:

- For the `name` variable, the `alert` inside `say` finds it immediately in the inner Lexical Environment.
- When it wants to access `phrase`, then there is no `phrase` locally, so it follows the reference to the outer Lexical Environment and finds it there.

![lexical environment lookup](lexical-environment-simple-lookup.svg)


### Step 4. Returning a function
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Let's return to the `makeCounter` example.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

<<<<<<< HEAD
Il codice esterno al blocco (o di un altro script) non può vedere le variabili all'interno del nostro blocco, poiché questo ha il suo Lexical Environment.
=======
At the beginning of each `makeCounter()` call, a new Lexical Environment object is created, to store variables for this `makeCounter` run.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

So we have two nested Lexical Environments, just like in the example above:

<<<<<<< HEAD
Nei vecchi script, si può trovare la cosi detta "immediately-invoked function expressions" (abbreviato come IIFE) utilizzato per questo scopo.

Appare cosi:
=======
![](closure-makecounter.svg)

What's different is that, during the execution of `makeCounter()`, a tiny nested function is created of only one line: `return count++`. We don't run it yet, only create.

All functions remember the Lexical Environment in which they were made. Technically, there's no magic here: all functions have the hidden property named `[[Environment]]`, that keeps the reference to the Lexical Environment where the function was created:

![](closure-makecounter-environment.svg)
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

So, `counter.[[Environment]]` has the reference to `{count: 0}` Lexical Environment. That's how the function remembers where it was created, no matter where it's called. The `[[Environment]]` reference is set once and forever at function creation time.

Later, when `counter()` is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where it finds and changes it.

<<<<<<< HEAD
Qui un'espressione di funzione viene creata e immediatamente invocata. Cosi il codice esegue con le sue variabili.

L'espressione di funzione viene raccolta tra parentesi `(function {...})`, perché quando JavaScript incontra `"function"` nel flusso principale del codice, la interpreta come dichiarazione di funzione. Ma una dichiarazione di funzione deve avere un nome, quindi ci sarebbe un errore:

```js run
// Error: Unexpected token (
function() { // <-- JavaScript cannot find function name, meets ( and gives error
=======
**A variable is updated in the Lexical Environment where it lives.**

Here's the state after the execution:

![](closure-makecounter-nested-call-2.svg)
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

If we call `counter()` multiple times, the `count` variable will be increased to `2`, `3` and so on, at the same place.

<<<<<<< HEAD
}();
```

Potremmo dire "okay, rendiamola una dichiarazione di funzione, aggiungiamo un nome", ma non funzionerebbe. JavaScript non consente di invocare immediatamente una dichiarazione di funzione:

```js run
// syntax error because of brackets below
function go() {

}(); // <-- can't call Function Declaration immediately
```

Quindi, le parentesi tonde sono necessario per indicare a JavaScript che la funzione viene creata nel contesto di un'altra espressione, e quindi è un espressione di funzione. Non c'è quindi bisogno di darle un nome e può essere invocata immediatamente.

Ci sono anche altri modi per far capire a JavaScript che intendiamo utilizzare un espressione di funzione:

```js run
// Ways to create IIFE

(function() {
  alert("Brackets around the function");
}*!*)*/!*();

(function() {
  alert("Brackets around the whole thing");
}()*!*)*/!*;
=======
```smart header="Closure"
There is a general programming term "closure", that developers generally should know.

A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in <info:new-function>).
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about "what's a closure?", a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.
```

<<<<<<< HEAD
In tutti i casi sopra noi dichiariamo un espressione di funzione e la invochiamo immediatamente.

## Garbage collection

Gli oggetti Lexical Environment di cui abbiamo parlato fino ad ora sono soggetti alle stesse regole di gestione della memoria.

- Solitamente, un Lexical Environment viene rimosso dalla memoria quando la funzione termina la sua esecuzione. Ad esempio:

    ```js
    function f() {
      let value1 = 123;
      let value2 = 456;
    }

    f();
    ```

    Qui i due valori sono tecnicamente le proprietà dell'oggetto Lexical Environment. Al termine di `f()` il Lexical Environment diventa irraggiungibile, quindi viene rimosso dalla memoria.
=======
## Garbage collection

Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That's because there are no references to it. As any JavaScript object, it's only kept in memory while it's reachable.

...But if there's a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment.

In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.

For example:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

- ...Ma se contiene una funzione annidata che risulta essere ancora raggiungibile al termine di `f`, allora il riferimento `[[Environment]]` mantiene il Lexical Environment esterno ancora in memoria:

<<<<<<< HEAD
    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

    *!*
      return g;
    */!*
    }
=======
  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
```
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

    let g = f(); // g is reachable, and keeps the outer lexical environment in memory
    ```

- Da notare che se `f()` viene invocata più volte, e vengono memorizzate delle funzioni, allora anche i corrispondenti Lexical Environment vengono mantenuti in memoria. E' il caso dell'esempio qui sotto:

    ```js
    function f() {
      let value = Math.random();

      return function() { alert(value); };
    }

    // 3 functions in array, every one of them links to Lexical Environment
    // from the corresponding f() run
    //         LE   LE   LE
    let arr = [f(), f(), f()];
    ```

<<<<<<< HEAD
- Un oggetto Lexical Environment muore quando diventa irraggiungibile: quando nessuna funzione annidata ne mantiene un riferimento. Nel codice sotto, dopo che `g` diventa irraggiungibile, anche `value` viene rimosso dalla memoria:
=======
In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the `value`) is cleaned from memory:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

    ```js
    function f() {
      let value = 123;

<<<<<<< HEAD
      function g() { alert(value); }

      return g;
    }

    let g = f(); // while g is alive
    // there corresponding Lexical Environment lives
=======
  return function() {
    alert(value);
  }
}

let g = f(); // while g function exists, the value stays in memory
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

    g = null; // ...and now the memory is cleaned up
    ```

### Ottimizzazioni nel mondo reale

Come abbiamo visto, in teoria fino a che una funzione rimane viva, anche tutte le variabili esterne vengono mantenute in memoria.

Ma nella pratica, i motori JavaScript cercano di ottimizzare questa situazione. Monitorano l'utilizzo delle variabili, e se si rendono conto che una variabile esterna non verrà mai utilizzata, allora la rimuovono.

**Un importante effetto collaterale in V8 (Chrome, Opera) è che queste variabili non sono disponibili durante il debugging.**

Provate ad eseguire il codice d'esempio qui sotto in Chrome con aperta la finestra degli strumenti da sviluppatore.

Quando si arresta, scrivete nella console `alert(value)`.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g = f();
g();
```

Come avrete notato -- non esiste questa variabile! In teoria, dovrebbe essere accessibile, ma il motore la ha rimossa.

Questo può portare a divertenti (soprattutto se avete poco tempo a disposizione) problemi in fase di debugging. Uno di questi -- potremmo visualizzare una variabile esterne che ha lo stesso nome, piuttosto di quella desiderata:

```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

<<<<<<< HEAD
```warn header="Ci incontriamo!"
Questa caratteristica di V8 va tenuta a mente. Se state facendo debugging con Chrome/Opera, presto o tardi vi ci imbatterete.

Questo non è un problema del debugger, ma piuttosto una caratteristica di V8. In futuro potrebbe essere risolta.
Potrete sempre testarlo provando ad eseguire il codice sopra.
```
=======
This feature of V8 is good to know. If you are debugging with Chrome/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You always can check for it by running the examples on this page.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
