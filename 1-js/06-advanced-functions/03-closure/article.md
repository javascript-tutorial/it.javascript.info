
# Variable scope, closure

JavaScript è un linguaggio fortemente orientato alle funzioni. Fornisce molta libertà. Una funzione può essere creata in qualsiasi momento, copiata su una variabile o passata come argomento ad un'altra funzione e richiamata da qualsiasi punto del codice.

Sappiamo che una funzione può accedere alle variabili esterne, questa caratteristica viene spesso utilizzata.

Cosa accade quando una variabile esterna cambia? La funzione utilizza il valore più recente o quello presente al momento della creazione della funzione?

<<<<<<< HEAD
Inoltre, cosa accade quando una funzione viene spostata in un altro punto del codice e viene richiamata -- avrebbe accesso alle variabile esterne della nuova posizione?
=======
And what if a function is passed along as an argument and called from another place of code, will it get access to outer variables at the new place?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In questa situazione linguaggi diversi si comportano in maniera diversa, in questo capitolo ci occuperemo del comportamento di JavaScript.

```smart header="Qui parleremo delle variabili `let/const`"
In JavaScript, ci esistono 3 modi per dichiarare una variabile: `let`, `const` (metodologie più moderne), e `var` (metodo utilizzato in passato).

- In questo articolo utilizzeremo `let`.
- Variabili, dichiarate tramite `const`, quindi in questo articolo parleremo anche di `const`.
- Il vecchio `var` ha alcune differenze importanti, di cui parleremo nell'articolo <info:var>.
```

## Blocchi di codice

Se una variabile viene dichiarata all'interno di un blocco di codice `{...}`, questa sarà visibile solamente all'interno di quel blocco di codice.

Ad esempio:

```js run
{
  // facciamo alcune operazioni con variabili locali che non dovrebbero essere visibili all'esterno

  let message = "Hello"; // visibile solamente all'interno di questo blocco

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

Possiamo utilizzare i blocchi di codice per isolare pezzi di codice, definendo delle variabili che gli appartengono:

```js run
{
  // mostra message
  let message = "Hello";
  alert(message);
}

{
  // show another messa ge
  let message = "Goodbye";
  alert(message);
}
```

````smart header="Ci sarebbe un errore senza blocchi"
Da notare, senza blocchi separati ci sarebbe un errore, nel caso in cui usassimo `let` con un nome di variabile già esistente:

```js run
// mostra message
let message = "Hello";
alert(message);

// mostra un altro message
*!*
let message = "Goodbye"; // Error: variable already declared
*/!*
alert(message);
```
````

Per `if`, `for`, `while` e cosi via, le variabili dichiarate all'interno di `{...}` sono visibili solo al suo interno:

```js run
if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Error, no such variable!
```

Qui, quando termina `if`, l'espressione `alert` non avrà accesso a `phrase`, quindi verrà emesso un errore.

Questo è ottimo, poiché ci consente di creare variabili locali al blocco di codice, specifiche per un branch di `if`.

The similar thing holds true for `for` and `while` loops:

```js run
for (let i = 0; i < 3; i++) {
  // la variabile i è visibile solamente all'interno del for
  alert(i); // 0, then 1, then 2
}

alert(i); // Error, no such variable
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

Qui la funzione *annidata*  `getFullName()` è stata creata per comodità. Può accedere alle variabili esterne quindi può ritornarne il nome completo. Le funzioni annidate sono abbastanza comuni in JavaScript.

Un'altra cosa interessante, una funzione annidata può essere ritornata: sia come proprietà di un nuovo oggetto (se la funzione esterna crea un oggetto con dei metodi) o come risultato stesso. Può essere salvata e utilizzata da qualsiasi altra parte. Non ha importanza dove, avrà comunque accesso alle stesse variabili esterne.

Nell'esempio sotto, `makeCounter` crea una funzione "contatore" che ritorna il numero successivo ad ogni invocazione:

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

Nonostante siano semplici, varianti leggermente modificate di questo codice hanno usi pratici, ad esempio, come [generatore di numeri casuali](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) per generare valori casuali per tests automatici. Quindi l'esempio non è cosi.

Come funziona? Se creiamo contatori multipli, saranno indipendenti? Come vengono gestite le variabili?

Conoscere queste cose è ottimo per una conoscenza generale di JavaScript è può essere utile nella gestione di scenari più complessi. Quindi proviamo ad entrare più nel dettaglio.

## Lexical Environment

```warn header="Here be dragons!"
The in-depth technical explanation lies ahead.

As far as I'd like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.
```

For clarity, the explanation is split into multiple steps.

### Step 1. Variabili

In JavaScript, ogni funzione in esecuzione, blocco di codice `{...}`, e lo script nella sua interezza possiedono un oggetto interno associato (nascosto), anche conosciuto come *Lexical Environment*.

The Lexical Environment object consists of two parts:

1. *Environment Record (Registro d'Ambiente)* -- un oggetto che memorizza tutte le variabili locali e le sue proprietà (ed altre informazioni utili come il valore di `this`).
2. Un riferimento al *lexical environment esterno*, quello associato al codice esterno.

**Una variabile è solamente una proprietà di uno speciale oggetto interno, `Environment Record`. "Ottenere o modificare una variabile" significa "ottenere o modificare una proprietà di questo oggetto".**

In questo semplice esempio senza funzioni, esiste solamente un Lexical Environment:

![lexical environment](lexical-environment-global.svg)

Questo è quello che viene chiamato Lexical Environment *globale*, associato all'interno script.

On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that's why the arrow points to `null`.

Mentre il codice inizia la sua esecuzione e procede, il Lexical Environment cambia.

Qui un codice leggermente più complesso:

![lexical environment](closure-variable-phrase.svg)

I rettangoli nella parte destra dimostrano come il Lexical Enviroment globale cambia durante l'esecuzione:
Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:

1. Quando il codice inizia la sua esecuzione, il Lexical Environment viene popolato con tutte le variabili dichiarate.
    - Inizialmente, queste sono in uno stato "non inizializzato". Questo è uno speciale stato interno, significa che JavaScript è a conoscenza dell'esistenza della variabile, ma ci si può fare riferimento fino a quando questa non viene dichiarata con `let`. E' equivalente a dire che la variabile non esiste.
2. Successivamente appare la dichiarazione `let phrase`. Non si ha ancora nessuna assegnazione, quindi il suo valore è `undefined`. Da questo momento in poi possiamo utilizzare la variabile.
3. A `phrase` viene assegnato un valore.
4. Il valore di `phrase` viene modificato.

Per ora tutto sembra semplice, vero?

- Una variabile è una proprietà di uno speciale oggetto interno, associato al blocco/funzione/script in esecuzione.
- Lavorare con le variabili significa concretamente lavorare con le proprietà di un oggetto.

```smart header="Lexical Environment è un oggetto definito dalla specifica"
"Lexical Environment" è un oggetto definito dalla specifica: esiste solamente in forma "teorica" nella [specifica di linguaggio](https://tc39.es/ecma262/#sec-lexical-environments) per descrivere come le cose funzionano. Non abbiamo modo di ottenere questo oggetto nel nostro codice e manipolarlo direttamente.

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.
```

### Step 2. Dichiarazione di funzioni

Anche una funzione è un valore, come una variabile.

**La differenza è che la dichiarazione di funzione viene inizializzata istantaneamente.**

Quando viene creato il Lexical Environment, un dichiarazione di funzione diventa immediatamente una funzione pronta per essere utilizzata (a differenza di `let`, che rimane inutilizzabile fino alla sua dichiarazione).

Questo è il motivo per cui possiamo utilizzare una funzione, ancora prima della sua dichiarazione.

Ad esempio, qui vediamo lo stato iniziale del Lexical Environment globale, quando aggiungiamo una funzione:

![](closure-function-declaration.svg)

Naturalmente, questo comportamento si applica solamente alle dichiarazioni di funzione, non vale per le espressioni di funzione, dove assegniamo una funzione ad una variabile, come ad esempio `let say = function(name)...`.

### Step 3. Lexical Environment interno ed esterno

Quando una funzione sta eseguendo, all'inizio della chiamata, viene creato un nuovo Lexical Environment per memorizzare le variabili locali e i parametri della chiamata.

Ad esempio, per `say("John")`, funzionerebbe in questo modo:

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![](lexical-environment-simple.svg)

Durante l'esecuzione della funzione abbiamo due Lexical Environments: quello interno (utilizzato dalla funzione) e quello esterno (globale):

- Il Lexical Environment interno corrisponde all'esecuzione di `say`. Possiede una sola proprietà: `name`, l'argomento della funzione. Abbiamo invocato `say("John")`, quindi il valore di `name` è `"John"`.
- Il Lexical Environment esterno è quello globale. Possiede la variabile `phrase` e la funzione stessa.


**Quando il codice vuole accedere ad una variabile -- questa viene ricercata prima nel Lexical Environment interno, poi in quello esterno, poi quello ancora più esterno e cosi via fino ad arrivare a quello globale.**

Se una variabile non viene trovata, allora verrà lanciato un errore in strict mode (senza `use strict`, un assegnazione ad una variabile non esistente creerà una nuova variabile globale).

In questo esempio la ricerca procede:

- La variabile `name`, utilizzata da `alert` all'interno di `say`, viene trovata immediatamente nel Lexical Environment interno.
- Quando vuole accedere a `phrase`, non sarà in grado di trovare alcuna variabile `phrase` localmente, quindi seguirà il riferimento verso il Lexical Environment esterno.

![lexical environment lookup](lexical-environment-simple-lookup.svg)


### Step 4. Ritornare una funzione

Torniamo all'esempio di `makeCounter`.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

All'inizio di ogni chiamata a `makeCounter()`, viene creato un nuovo Lexical Environment, dove memorizzare le variabili necessarie all'esecuzione di `makeCounter`.

![](closure-makecounter.svg)

La differenza è che durante l'esecuzione di `makeCounter()`, viene creata una piccola funzione annidata: `return count++`. Non viene eseguita subito, viene solamente creata.

Tutte le funzioni ricordano il Lexical Environment in cui vengono create. Tecnicamente, non c'è nulla di magico: tutte le funzione possiedono la proprietà nascosta `[[Environment]]`, che memorizza il riferimento al Lexical Environment in cui la funzione è stata creata:

![](closure-makecounter-environment.svg)

Quindi, `counter.[[Environment]]` possiede il riferimento al Lexical Environment `{count: 0}`. Questo è il modo in cui le funzioni memorizzano il contesto in cui sono state create, non ha importanza il posto in cui verranno chiamate. Il riferimento `[[Environment]]` viene impostato a tempo di creazione della funzione e non viene più modificato.

Più tardi, quando viene chiamato `counter()`, verrà creato un nuovo Lexical Environment locale, in cui verrà memorizzato il riferimento al Lexical Environment esterno `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

Quindi, quando il codice all'interno di `counter()` cercherà la variabile `count` nel suo Lexical Environment (vuoto, poiché non possiede variabili locali), poi cercherà nel Lexical Environment esterno, quindi quello della chiamata `makeCounter()`, dove riuscirà a trovare la variabili e potrà modificarla.

**Una variabile viene aggiornata nel Lexical Environment in cui si trova.**

Qui vediamo lo stato dopo l'esecuzione:

![](closure-makecounter-nested-call-2.svg)

If we call `counter()` multiple times, the `count` variable will be increased to `2`, `3` and so on, at the same place.

```smart header="Closure"
Esiste un termine generale in programmazione, "closure", che gli sviluppatori dovrebbero conoscere.

Una [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) è una funzione che ricorda le sue variabili esterne ed è in grado di accedervi. In alcuni linguaggi questo non è possibile, oppure è richiesto che la funzione venga scritta in un determinato modo. Ma come spiegato sopra, in JavaScript, tutte le funzioni sono closure di natura (esiste una sola eccezione, che verrà tratta nel capitolo <info:new-function>).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about "what's a closure?", a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.
```

## Garbage collection

Solitamente, un Lexical Environment viene rimosso dalla memoria insieme a tutte le sue variabili dopo che la funzione ha completato la sua esecuzione. Questo avviene perché non si hanno più riferimenti ad essa. Come ogni altro oggetto in JavaScript, viene mantenuto in memoria solamente finché risulta essere raggiungibile.

Tuttavia, se una funzione annidata risulta essere ancora raggiungibile, allora avremmo una proprietà `[[Environment]]` che fa riferimento al Lexical Environment.

In questo caso il Lexical Environment risulta essere ancora raggiungibile dopo aver completato l'esecuzione, quindi rimane in memoria.

Ad esempio:
  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] memorizza un riferimento al Lexical Environment
// della corrispondente chiamata a f()
```

Da notare che se `f()` viene chiamata più volte, e la funzione risultata viene memorizzata, allora tutti i relativi Lexical Environment verranno mantenuti in memoria. Nel codice sotto, tutti e 3:

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

Nel codice sotto, dopo aver rimosso la funzione annidata, il Lexical Environment interno (e anche `value`) viene rimosso dalla memoria:

    ```js
    function f() {
      let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // finché g esiste, il valore rimane in memoria

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

```warn header="Ci incontriamo!"
Questa caratteristica di V8 va tenuta a mente. Se state facendo debugging con Chrome/Opera, presto o tardi vi ci imbatterete.

Questo non è un problema del debugger, ma piuttosto una caratteristica di V8. In futuro potrebbe essere risolta.
Potrete sempre testarlo provando ad eseguire il codice sopra.
```
