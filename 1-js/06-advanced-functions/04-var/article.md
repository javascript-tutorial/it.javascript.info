
# Il vecchio "var"

Nei primi capitoli in cui abbiamo parlato di [variabili](info:variables), abbiamo menzionato tre diversi tipi di dichiarazione:

1. `let`
2. `const`
3. `var`

`let` e `const` si comportano esattamente allo stesso modo in termini di Lexical Environments.

Invece `var` è totalmente diverso, poiché deriva dalle prime versioni del linguaggio. Generalmente negli script più recenti non viene utilizzato, ma appare ancora in quelli più vecchi.

Se non avete intenzione di avere a che fare con gli script più vecchi, potete saltare questo capitolo o studiarlo in futuro, ma molto probabilmente prima o poi vi ci imbatterete.

A prima vista, `var` si comporta in maniera analoga a `let`. Ad esempio:

```js run
function sayHi() {
  var phrase = "Hello"; // variabile locale, "var" piuttosto di "let"

  alert(phrase); // Hello
}

sayHi();

alert(phrase); // Errore, phrase non è definito
```

...Abbiamo trovato una differenza.

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

<<<<<<< HEAD
Se avessimo utilizzato `let test` nella seconda riga, allora non sarebbe stata visibile ad `alert`. Ma `var` ignora i blocchi di codice, quindi `test` risulta essere globale.
=======
`var` ignores code blocks, so we've got a global variable `test`.

If we used `let test` instead of `var test`, then the variable would only be visible inside `if`:

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // Error: test is not defined
*/!*
```
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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
<<<<<<< HEAD
alert(phrase); // Errore: phrase non è definito
=======
alert(phrase); // Error: phrase is not defined (Check the Developer Console)
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
```

Come possiamo vedere, `var` passa attraverso `if`, `for` o altri blocchi di codice. Questo accade perché molto tempo fa i blocchi JavaScript non possedevano un Lexical Environments. E `var` ne è un ricordo.

<<<<<<< HEAD
## "var" viene processata all'inizio della funzione
=======
## "var" declarations are processed at the function start
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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

Lo dimostriamo con un esempio, come quello seguente:

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

## Riepilogo

<<<<<<< HEAD
Ci sono due principali differenze con `var`:

1. Le variabili non hanno uno scope locale al blocco, sono infatti visibili a livello di funzione.
2. La dichiarazione di variabili viene processata all'inizio della funzione.
=======
There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, they are visible minimum at the function level.
2. `var` declarations are processed at function start (script start for globals).
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

C'è un ulteriore differenza di minore importanza legata all'oggetto globale, che andremo ad analizzare nel prossimo capitolo.

<<<<<<< HEAD
L'insieme di queste differenze fa si che `var` venga considerato uno svantaggio. Come prima cosa, non possiamo creare delle variabili locali al blocco. Il "sollevameto" genera solamente confusione. Quindi, negli script più recenti `var` viene utilizzato solamente in casi eccezionali.
=======
These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
