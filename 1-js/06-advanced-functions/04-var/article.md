
# Il vecchio "var"

<<<<<<< HEAD
Nei primi capitoli in cui abbiamo parlato di [variabili](info:variables), abbiamo menzionato tre diversi tipi di dichiarazione:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
`let` e `const` si comportano esattamente allo stesso modo in termini di Lexical Environments.

Invece `var` è totalmente diverso, poiché deriva dalle prime versioni del linguaggio. Generalmente negli script più recenti non viene utilizzato, ma appare ancora in quelli più vecchi.

Se non avete intenzione di avere a che fare con gli script più vecchi, potete saltare questo capitolo o studiarlo in futuro, ma molto probabilmente prima o poi vi ci imbatterete.

A prima vista, `var` si comporta in maniera analoga a `let`. Ad esempio:

```js run
function sayHi() {
  var phrase = "Hello"; // variabile locale, "var" piuttosto di "let"
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

<<<<<<< HEAD
alert(phrase); // Errore, phrase non è definito
```

...Abbiamo trovato una differenza.
=======
On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## "var" non ha uno scope di blocco

Le variabili dichiarate tramite `var` possono essere: locali alla funzione oppure globali.

Ad esempio:

```js run
if (true) {
  var test = true; // utilizziamo "var" piuttosto di "let"
}

*!*
alert(test); // vero, la variabile vive dopo if
*/!*
```

Se avessimo utilizzato `let test` nella seconda riga, allora non sarebbe stata visibile ad `alert`. Ma `var` ignora i blocchi di codice, quindi `test` risulta essere globale.

La stessa cosa accade con i cicli: `var` non può essere locale ad un blocco/ciclo:

```js
for (var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10, "i" è visibile anche dopo il ciclo, è una variabile globale
*/!*
```

Se un blocco di codice si trova all'interno di una funzione, allora `var` diventa una variabile a livello di funzione:

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // funziona
}

sayHi();
alert(phrase); // Errore: phrase non è definito (Provate a controllare la console)
```

Come possiamo vedere, `var` passa attraverso `if`, `for` o altri blocchi di codice. Questo accade perché molto tempo fa i blocchi JavaScript non possedevano un Lexical Environments. E `var` ne è un ricordo.

<<<<<<< HEAD
## "var" viene processata all'inizio della funzione
=======
## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Le dichiarazioni con `var` vengono processata quando la funzione inizia (o lo script, nel caso delle variabili globali).

In altre parole, le variabili `var` sono definite dall'inizio della funzione, non ha importanza dove vengano definite (ovviamente non vale nel caso di funzioni annidate).

Guardate questo esempio:

```js run
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...E' tecnicamente la stessa cosa di (spostando `var phrase`):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

...O anche di questa (ricordate, i blocchi di codice vengono attraversati dallo scope della variabile):

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Questo comportamento viene chiamato "sollevamento", perché tutte `var` vengono "sollevate" fino all'inizio della funzione.

Quindi nell'esempio sopra, `if (false)` il ramo non eseguirà mai, ma non ha importanza. La `var` all'interno viene processata all'inizio della funzione, quindi quando ci troviamo in `(*)` la variabile esiste.

**Le dichiarazioni vengono sollevate, le assegnazioni no.**

<<<<<<< HEAD
Lo dimostriamo con un esempio, come quello seguente:
=======
That's best demonstrated with an example:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

La riga `var phrase = "Hello"` può essere suddivisa in due:

1. Dichiarazione della variabile `var`
2. Assegnazione della variabile con `=`.

La dichiarazione viene processata all'inizio della funzione ("sollevata"), l'assegnazione invece ha luogo sempre nel posto in cui appare. Quindi il codice funziona in questo modo:

```js run
function sayHi() {
*!*
  var phrase; // la dichiarazione viene processata...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...assegnazione - quando viene raggiunta dal flusso d'esecuzione.
*/!*
}

sayHi();
```

Il fatto che la dichiarazione di `var` venga processata all'inizio della funzione, ci consente di farne riferimento in qualsiasi punto. Ma la variabile rimane `undefined` fino all'assegnazione.

In entrambi gli esempi sopra `alert` esegue senza errori, poiché la variabile `phrase` esiste. Il suo valore però non gli è ancora stato assegnato, quindi viene mostrato `undefined`.

<<<<<<< HEAD
## Riepilogo
=======
### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Function statements require a function name

  let message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.

## Summary
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Ci sono due principali differenze tra `var` e `let/const`:

1. `var` non hanno uno scope locale al blocco, sono infatti visibili a livello di funzione.
2. La dichiarazione di `var` viene processata all'inizio della funzione.

<<<<<<< HEAD
C'è un ulteriore differenza di minore importanza legata all'oggetto globale, che andremo ad analizzare nel prossimo capitolo.
=======
There's one more very minor difference related to the global object, that we'll cover in the next chapter.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

L'insieme di queste differenze fa si che `var` venga considerato uno svantaggio. Come prima cosa, non possiamo creare delle variabili locali al blocco. Il "sollevameto" genera solamente confusione. Quindi, negli script più recenti `var` viene utilizzato solamente in casi eccezionali.
