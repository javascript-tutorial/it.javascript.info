
# Closure

<<<<<<< HEAD
JavaScript è un linguaggio fortemente orientato alle funzioni. Fornisce molta libertà. Una funzione può essere creata in qualsiasi momento, copiata su una variabile o passata come argomento ad un'altra funzione e richiamata da qualsiasi punto del codice.

Sappiamo che una funzione può accedere alle variabili esterne, questa caratteristica viene spesso utilizzata.
=======
JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created dynamically,  copied to another variable or passed as an argument to another function and called from a totally different place later.

We know that a function can access variables outside of it, this feature is used quite often.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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

<<<<<<< HEAD
In JavaScript, ogni funzione in esecuzione, blocco di codice, e lo script nella sua interezza possiedono un oggetto associato conosciuto come *Lexical Environment*.
=======
In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the *Lexical Environment*.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

L'oggetto Lexical Environment consiste di due parti:

<<<<<<< HEAD
1. *Environment Record* -- un oggetto che contiene tutte le variabili locali e le relative proprietà (e alcune altre informazioni come il valore di  `this`).
2. Un riferimento al *outer lexical environment* (lexical environment esterno).

**Quindi, una "variabile" è solamente una proprietà di questo speciale oggetto, l'`Environment Record`. "Per ottenere o modificare una variabile" si traduce in "per ottenere o modificare una variabile del Lexical Environment".**
=======
1. *Environment Record* -- an object that stores all local variables as its properties (and some other information like the value of `this`).
2. A reference to the *outer lexical environment*, the one associated with the outer code.

**So, a "variable" is just a property of the special internal object, `Environment Record`. "To get or change a variable" means "to get or change a property of that object".**
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Ad esempio, in questo semplice codice, esiste un solo Lexical Environment:

![lexical environment](lexical-environment-global.png)

<<<<<<< HEAD
Questo viene anche chiamato global Lexical Environment (Lexical Environment globale), associato all'intero script.
=======
This is a so-called global Lexical Environment, associated with the whole script.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Nella figura sopra, il rettangolo significa Environment Record, mentre la freccia indica il riferimento esterno. Il global Lexical Environment non possiede riferimenti esterni, quindi questo punta a `null`.

<<<<<<< HEAD
Qui vediamo una figura più grande sul funzionamento di `let`:
=======
Here's the bigger picture of what happens when a `let` changes:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

![lexical environment](lexical-environment-global-2.png)

I rettangoli dalla parte destra dimostrano come cambia il global Lexical Environment durante l'esecuzione:

<<<<<<< HEAD
1. Quando lo script inizia, il Lexical Environment è vuoto.
2. Appare la definizione `let phrase`. Non gli viene assegnato alcun valore, quindi viene memorizzato `undefined`.
3. Viene assegnato un valor a `phrase`.
4. `phrase` punta ad un nuovo valore.
=======
1. When the script starts, the Lexical Environment is empty.
2. The `let phrase` definition appears. It has been assigned no value, so `undefined` is stored.
3. `phrase` is assigned a value.
4. `phrase` changes value.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Finora è tutto piuttosto semplice, giusto?

Per ricapitolare:

- Una variabile è una proprietà di uno speciale oggetto interno, associata al corrente blocco/funzione/script.
- Lavorare con le variabili è come lavorare con le proprietà di questo oggetto.

### Dichiarazione di funzione

Le dichiarazioni di funzione sono speciali. A differenza di `let` per le variabili, vengono processate non quando il flusso d'esecuzione le incontra, ma quando il Lexical Environment viene creato. Nel caso del global Lexical Environment, significa all'inizio dello script.

Questo è il motivo per cui possiamo chiamare una funzione prima della sua definizione.

Il codice sotto dimostra che il Lexical Environment inizialmente non è vuoto. Contiene `say`, perché è una dichiarazione di funzione. Successivamente verrà inserito anche `phrase`, dichiarato con `let`:

![lexical environment](lexical-environment-global-3.png)


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

<<<<<<< HEAD
![lexical environment](lexical-environment-simple.png)
 
Durante la chiamata di funzione abbiamo due Lexical Environments: quello interno (relativo alla funzione) e quello esterno (globale):
=======
- The inner Lexical Environment corresponds to the current execution of `say`.

    It has a single property: `name`, the function argument. We called `say("John")`, so the value of `name` is `"John"`.
- The outer Lexical Environment is the global Lexical Environment.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

- Il Lexical Environment interno che corrisponde all'esecuzione di `say`. Che possiede una sola variabile: `name`, che è l'unico argomento della funzione. Abbiamo invocato `say("John")`, quindi il valore di name `name` è `"John"`.
- Il Lexical Environment esterno è quello globale.

Il Lexical Environment interno ha un riferimento a quello esterno, memorizzato su `outer`.

<<<<<<< HEAD
**Quando il codice vuole accedere ad una variabile -- come prima cosa la si cerca nel Lexical Environment interno, successivamente in quello esterno, poi in quello ancora più esterno e cosi via fino a quello più esterno.**
=======
**When the code wants to access a variable -- the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.**
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

 Se una variabile non viene trovata, si ha un errore in strict mode. Senza `use strict`, viene creata una variabile globale, per consentire la retro-compatibilità.

Vediamo come procede la ricerca nel nostro esempio:

- Quando `alert` all'interno di `say` vuole accedere a `name`, trova la variabile immediatamente nel Lexical Environment della funzione.
- Quando vuole accedere a `phrase`, non trova nessun `phrase` localmente, quindi segue il riferimento `outer` e la trova nel Lexical Environment esterno.

![lexical environment lookup](lexical-environment-simple-lookup.png)

Ora possiamo dare una risposta alla prima domanda che ci siamo posti a inizio capitolo.

**Una funzione preleva le variabili esterne per come sono al momento; utilizza quindi il valore più recente.**

Abbiamo descritto il meccanismo. Sappiamo che i vecchi valori di una variabile non sono salvati da nessuna parte. Quindi quando una funzione li richiede, riceve necessariamente il valore corrente, localmente oppure dal Lexical Environment esterno.

Quindi la risposta alla prima domanda è `Pete`:

```js run
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete"; // (*)

*!*
sayHi(); // Pete
*/!*
```


Il flusso d'esecuzione è:

1. Il Lexical Environment globale possiede `name: "John"`.
2. Alla riga `(*)` la variabile globale viene modificata, ora `name: "Pete"`.
3. Quando la funzione `sayHi()` viene eseguita, prende `name` esternamente. In questo caso dal Lexical Environment globale, in cui vale `"Pete"`.


```smart header="Una chiamata -- un Lexical Environment"
Da notare che un viene creato un nuovo Lexical Environment ad ogni esecuzione di una funzione.

Se una funzione viene chiamata più volte, allora ogni invocazione avrà il suo personale Lexical Environment, con variabili locali e parametri specifici per quell'esecuzione.
```

```smart header="Lexical Environment è un oggetto definito dalla specifica"
Il "Lexical Environment" è un oggetto definito sulle specifiche. Non possiamo prenderlo e manipolarlo direttamente. Il motore JavaScript potrebbe ottimizzarlo, scartando variabili inutilizzate per sfruttare al meglio la memoria e ottimizzare le prestazioni, ma il comportamento rimane quello descritto.
```


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

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++; // has access to the outer "count"
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Proseguiamo con l'esempio `makeCounter`. Crea una funzione "contatore" che ritorna il numero successivo ad ogni invocazione. Nonostante sia semplice, delle varianti modificate di questo codice hanno usi pratici, ad esempio, come [generatore di numeri pseudocasuali](https://en.wikipedia.org/wiki/Pseudorandom_number_generator), e molto altro. Quindi l'esempio non è cosi artificiale.

Come funziona il counter internamente?

Quando viene eseguita la funzione esterna , la variabile `count++` viene ricercata dall'interno verso l'esterno. Nell'esempio sopra, l'ordine sarà:

![](lexical-search-order.png)

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

alert( counter1() ); // 0
alert( counter1() ); // 1

alert( counter2() ); // 0 (independent)
```


<<<<<<< HEAD
Dovrebbe esservi abbastanza chiara la situazione delle variabili esterne. In alcune situazioni più complesse potrebbe essere necessaria un'analisi più profonda. Quindi andiamo più in profondità.

## Environment nel dettaglio

Ora che avete una maggiore conoscenza delle closure, possiamo scendere più in profondità.
=======
Hopefully, the situation with outer variables is clear now. For most situations such understanding is enough. There are few details in the specification that we omitted for brevity. So in the next section we cover even more details, not to miss anything.

## Environments in detail

Here's what's going on in the `makeCounter` example step-by-step, follow it to make sure that you know things in the very detail.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Qui analizziamo cosa succede nell'esempio `makeCounter` passo per passo, seguitelo attentamente per essere certi di comprenderne il funzionamento. Da notare un ulteriore proprietà `[[Environment]]` di cui non abbiamo ancora parlato.

1. Quando lo script inizia, si ha solamente il Lexical Environment globale:

    ![](lexenv-nested-makecounter-1.png)

    Inizialmente si ha solamente la funzione `makeCounter`, perché è una dichiarazione di funzione. Non ha ancora eseguito.

    Tutte le funzioni "alla nascita" ricevono una proprietà nascosta `[[Environment]]` con un riferimento al Lexical Environment corrispondente. Non lo avevamo spiegato finora, ma questo è il meccanismo con cui viene collegata la funzione al rispettivo Lexical Environment.

    Qui, `makeCounter` viene creata nel Lexical Environment globale, quindi `[[Environment]]` contiene un riferimento a questo.

    In altre parole, una funzione viene marchiata con un riferimento al Lexical Environment di nascita. Inoltre `[[Environment]]` è una proprietà nascosta della funzione che mantiene questo riferimento.

2. Il codice prosegue nell'esecuzione, viene dichiarata una nuova variabile globale `counter` con valore `makeCounter()`. Nell'immagine vediamo il momento in cui l'esecuzione si trova nella prima riga di `makeCounter()`:

    ![](lexenv-nested-makecounter-2.png)

    Quando viene invocata `makeCounter()`, viene creato un Lexical Environment, che dovrà memorizzare le variabili e gli argomenti.

    Come tutti i Lexical Environment, memorizza due cose:
    1. Un Environment Record con le variabili locali. Nel nostro caso `count` è l'unica variabile locale (che apparirà nel momento in cui verrà eseguita la riga `let count`).
    2. Un riferimento al Lexical Environment esterno, che si trova su `[[Environment]]`. Nel nostro caso `[[Environment]]` di `makeCounter` contiene un riferimento al Lexical Environment globale.

    Quindi, ora abbiamo due Lexical Environment: il primo è quello globale, il secondo è relativo alla chiamata di `makeCounter`, con un riferimento esterno a quello globale.

3. Durante l'esecuzione di `makeCounter()`, viene creata una piccola funzione annidata.

    Non ha importanza se questa viene creata tramite dichiarazione di funzione, piuttosto che tramite espressione di funzione. Tutte le funzioni possiedono la proprietà `[[Environment]]` che fa riferimento al Lexical Environment in cui sono state create. Lo stesso vale anche per la nostra funzione annidata.

    Per la nostra funzione annidata il valore di `[[Environment]]` è il Lexical Environment corrente, quello di `makeCounter()`:

    ![](lexenv-nested-makecounter-3.png)

<<<<<<< HEAD
    Da notare che in questo passaggio la funzione viene solamente creata, non c'è stata ancora nessuna chiamata. Il codice contenuto in `function() { return count++; }` non viene eseguito; su questo ci ritorneremo presto.
=======
    Please note that on this step the inner function was created, but not yet called. The code inside `function() { return count++; }` is not running.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

4. L'esecuzione della funzione prosegue, e la chiamata di `makeCounter()` termina, il risultato (la funzione annidata) viene assegnata alla variabile globale `counter`:

    ![](lexenv-nested-makecounter-4.png)

    La funzione risultante possiede una sola riga di codice: `return count++`, che verrà eseguita solamente quando verrà invocata.

5. Quando viene invocata `counter()`, viene creato un Lexical Environment "vuoto". Non si hanno variabili locali. Solamente la proprietà `[[Environment]]` di `counter` viene utilizzata come riferimento esterno, quindi questa funzione ha accesso alle variabili di `makeCounter()` presenti al momento della creazione:

    ![](lexenv-nested-makecounter-5.png)

    Ora se proviamo ad accedere ad una variabile, questa verrà prima cercata nel Lexical Environment locale (vuoto), successivamente si andrà a controllare il Lexical Environment esterno, quello relativo a `makeCounter()`, infine si guarderà quello globale.

    Mentre è alla ricerca di `count`, trova una corrispondenza nelle variabili di `makeCounter`, nel Lexical Environment esterno.

    Prestate attenzione a come funziona il gestore della memoria in questa situazione. Sebbene la chiama a `makeCounter()` si sia conclusa diverso tempo fa, il suo Lexical Environment è stato mantenuto in memoria, poiché una funzione annidata ne possiede un riferimento nella proprietà `[[Environment]]`.

    Generalmente, un Lexical Environment appartenente ad un oggetto rimane in memoria finché c'è la possibilità che una funzione possa averne bisogno. E solamente quando tutti riferimenti vengono rimossi, allora verrà cancellato.

6. La chiamata a `counter()` non ritorna solamente il valore di `count`, ma provvede anche ad incrementarlo. Da notare che la modifica viene eseguita "sul posto". Il valore di `count` viene modificato esattamente nell'environment in cui è stato trovato.

    ![](lexenv-nested-makecounter-6.png)

    Quindi ritorniamo al passaggio precedente con un solo cambiamento -- il nuovo valore di `count`. Le chiamate successive faranno esattamente lo stesso.

7. La successiva invocazione a `counter()` fa la stessa cosa.

La risposta alla seconda domanda ormai dovrebbe essere ovvia.

La funzione `work()` nel codice sopra utilizza `name` nel posto in cui la trova, seguendo i riferimenti al lexical environment esterno:

![](lexenv-nested-work.png)

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

<!--
    ```js run
    let phrase = "Hello";

    if (true) {
        let user = "John";

        alert(`${phrase}, ${user}`); // Hello, John
    }

    alert(user); // Error, can't see such variable!
    ```-->

![](lexenv-if.png)

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

<<<<<<< HEAD
Ad esempio, in un browser tutti gli script condividono la stessa area globale. Quindi se creiamo una variabile globale in uno script, questa diventa accessibili anche agli altri. Questo potrebbe essere sorgente di conflitti tra due script che utilizzano variabili con gli stessi nomi.
=======
For instance, in a web browser all scripts (except with `type="module"`) share the same global area. So if we create a global variable in one script, it becomes available to others. But that becomes a source of conflicts if two scripts use the same variable name and overwrite each other.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Questa situazione può accadere con nomi di variabili molto diffusi.

Per evitare queste situazioni, possiamo utilizzare un blocco di codice per isolare l'intero script o una sua porzione:

```js run
{
  // do some job with local variables that should not be seen outside

  let message = "Hello";

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

Il codice esterno al blocco (o di un altro script) non può vedere le variabili all'interno del nostro blocco, poiché questo ha il suo Lexical Environment.

### IIFE

Nei vecchi script, si può trovare la cosi detta "immediately-invoked function expressions" (abbreviato come IIFE) utilizzato per questo scopo.

Appare cosi:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Qui un'espressione di funzione viene creata e immediatamente invocata. Cosi il codice esegue con le sue variabili.

L'espressione di funzione viene raccolta tra parentesi `(function {...})`, perché quando JavaScript incontra `"function"` nel flusso principale del codice, la interpreta come dichiarazione di funzione. Ma una dichiarazione di funzione deve avere un nome, quindi ci sarebbe un errore:

```js run
// Error: Unexpected token (
function() { // <-- JavaScript cannot find function name, meets ( and gives error

  let message = "Hello";

  alert(message); // Hello

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

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

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

- ...Ma se contiene una funzione annidata che risulta essere ancora raggiungibile al termine di `f`, allora il riferimento `[[Environment]]` mantiene il Lexical Environment esterno ancora in memoria:

    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

    *!*
      return g;
    */!*
    }

    let g = f(); // g is reachable, and keeps the outer lexical environment in memory
    ```

- Da notare che se `f()` viene invocata più volte, e vengono memorizzate delle funzioni, allora anche i corrispondenti Lexical Environment vengono mantenuti in memoria. E' il caso dell'esempio qui sotto:

    ```js
    function f() {
      let value = Math.random();

<<<<<<< HEAD
      return function() { alert(value); };
    }
=======
// 3 functions in array, every one of them links to Lexical Environment (LE for short)
// from the corresponding f() run
//         LE   LE   LE
let arr = [f(), f(), f()];
```
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

    // 3 functions in array, every one of them links to Lexical Environment
    // from the corresponding f() run
    //         LE   LE   LE
    let arr = [f(), f(), f()];
    ```

- Un oggetto Lexical Environment muore quando diventa irraggiungibile: quando nessuna funzione annidata ne mantiene un riferimento. Nel codice sotto, dopo che `g` diventa irraggiungibile, anche `value` viene rimosso dalla memoria:

    ```js
    function f() {
      let value = 123;

      function g() { alert(value); }

      return g;
    }

    let g = f(); // while g is alive
    // there corresponding Lexical Environment lives

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
    debugger; // in console: type alert( value ); No such variable!
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
    debugger; // in console: type alert( value ); Surprise!
  }

  return g;
}

let g = f();
g();
```

```warn header="Ci incontriamo!"
Questa caratteristica di V8 va tenuta a mente. Se state facendo debugging con Chrome/Opera, presto o tardi vi ci imbatterete.

Questo non è un problema del debugger, ma piuttosto una caratteristica di V8. In futuro potrebbe essere risolta.
Potrete sempre testarlo provando ad eseguire il codice sopra.
```
