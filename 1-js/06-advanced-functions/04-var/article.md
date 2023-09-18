
# Il vecchio "var"

```smart header="Questo articolo è utile per la comprensione dei vecchi script"
Le informazioni contenute in questo articolo sono utili per la comprensione dei vecchi script.

Non è il modo corretto di scrive il codice oggi.
```

Nei primi capitoli in cui abbiamo parlato di [variabili](info:variables), abbiamo menzionato tre diversi tipi di dichiarazione:

1. `let`
2. `const`
3. `var`

La dichiarazione `var` è molto simile a `let`.La maggior parte delle volte possiamo sostituire `let` con `var` o vice-versa, e lo script continuerebbe a funzionare senza problemi:

```js run
var message = "Hi";
alert(message); // Hi
```

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

E' però importate capire le differenze durante la migrazione dei vecchi script da `var` a `let`, per evitare errori.

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

Se avessimo utilizzato `let test` invece di `var test`, allora la variabile sarebbe stata visibile solo all'interno dell' `if`.

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

La stessa cosa accade con i cicli, `var` non può essere locale ad un blocco/ciclo:

```js run
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i); // 10, "i" è visibile anche dopo il ciclo, è una variabile globale
alert(one); // 1, "one" è visibile anche dopo il ciclo, è una variabile globale
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
alert(phrase); // Errore: phrase non è definito
```

Come possiamo vedere, `var` passa attraverso `if`, `for` o altri blocchi di codice. Questo accade perché molto tempo fa i blocchi JavaScript non possedevano un Lexical Environments. E `var` ne è un ricordo.

## "var" tollera dichiarazioni multiple

Se proviamo a ri-dichiarare la stessa variabile con `let` nello stesso scope, avremmo un errore:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

Con `var`, possiamo ri-dichiarare una variabile quante volte vogliamo. Se proviamo ad utilizzare `var` con una variabile già dichiarata, esso verrà semplicemente ignorato e la variabile verrà normalmente riassegnata:

```js run
var user = "Pete";

var user = "John"; // qui "var" non fa nulla (già dichiarata)
// ...non emetterà nessun errore

alert(user); // John
```

## Le variabili "var" possono essere dichiarate dopo il loro utilizzo

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

## IIFE

In passato, poiché esisteva solo `var`, che non consentiva di definire variabili con visibilità a livello di blocco, i programmatori hanno inventato un modo per emulare questa situazione. Quello che facevano fu chiamato "immediately-invoked function expressions" (espressioni di funzioni invocate immediatamente,abbreviato come IIFE).

E' qualcosa che dovremmo evitare oggi, ma è possibile trovare questo trucco nei vecchi script.

Una IIFE viene scritta in questo modo:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Qui, un'espressione di funzione viene creata ed immediatamente chiamata. Quindi il codice esegue nel modo giusto, e possiede le sue variabili private.

L'espressione di funzione è avvolta dalle parentesi `(function {...})`, poiché quando JavaScript incontra `"function"` nel flusso principale del codice, lo interpreta come l'inizio di una dichiarazione di funzione. Ma una dichiarazione di funzione deve avere un nome, quindi questo tipo di codice daebbe un errore:

```js run
// Proviamo a dichiarare ed invocare immediatamente una funzione
function() { // <-- Errore di sintassi: La dichiarazione di funzione richiede un nome

  var message = "Hello";

  alert(message); // Hello

}();
```

Anche se dovessimo pensare di aggiungere un nome, questo codice non funzionerebbe, poiché JavaScript non consente di invocare immediatamente le funzioni dichiarate:

```js run
// errore di sintassi a causa delle parentesi ()
function go() {

}(); // <-- non è possibile invocare una dichiarazione di funzione immediatamente
```

Quindi, le parentesi intorno alla funzione sono un trucco per mostrare a JavaScript che la funzione viene creata in un altro contesto, e quindi è un'espressione di funzione: la quale non richiede nome e può essere invocata immediatamente.

Esistono altri modi oltre alle parentesi per dire a JavaScript che intendiamo definire un'espressione di funzione:

```js run
// Altri modi per creare una IIFE

*!*(*/!*function() {
  alert("Parentheses around the function");
}*!*)*/!*();

*!*(*/!*function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In tutti gli esempi illustrati stiamo dichiarando un'espressione di funzione invocandola immediatamente. Lasciatemelo ripetere: al giorno d'oggi non c'è alcun motivo di scrivere codice del genere.

## Riepilogo

Ci sono due principali differenze tra `var` e `let/const`:

1. `var` non hanno uno scope locale al blocco, sono infatti visibili a livello di funzione.
2. La dichiarazione di `var` viene processata all'inizio della funzione.

C'è un ulteriore differenza di minore importanza legata all'oggetto globale, che andremo ad analizzare nel prossimo capitolo.

L'insieme di queste differenze fa si che `var` venga considerato uno svantaggio. Come prima cosa, non possiamo creare delle variabili locali al blocco. Il "sollevamento" genera solamente confusione. Quindi, negli script più recenti `var` viene utilizzato solamente in casi eccezionali.
