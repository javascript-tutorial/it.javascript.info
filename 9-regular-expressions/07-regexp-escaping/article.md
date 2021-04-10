
# Escaping, caratteri speciali

Come abbiamo visto, un backslash `pattern:\` viene utilizzato per indicare classi di caratteri, e.g. `pattern:\d`. Quindi nelle regexps è un carattere speciale (proprio come nelle stringhe).

Esistono anche altri caratteri speciali, che hanno un significato speciale nelle regexp. Vengono utilizzati per ricerche più avanzate. Qui vediamo la lista completa di questi parametri: `pattern:[ \ ^ $ . | ? * + ( )`.

Non provate ad imparare a memoria la lista, presto inizieremo ad utilizzarli e sarete in grado di ricordarli automaticamente.

## Escaping

Ipotizziamo di voler trovare un punto (il carattere "."). Non "qualsiasi carattere", semplicemente un punto.

Per poter utilizzare un carattere speciale come se fosse uno normale, è sufficienti farlo precedere da un backslash: `pattern:\.`.

Questo è detto "escaping di un carattere".

Ad esempio:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (trovato!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (cercanod un punto \.)
```

Anche le parentesi sono dei caratteri speciali, quindi se volessimo utilizzarle, dovremmo utilizzare `pattern:\(`. L'esmpio sotto cerca la stringa `"g()"`:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

Se stiamo cercando un backslash `\`, il quale è un carattere speciale, come nelle stringhe anche nelle regexp dovremmo inserirne due.

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

## Uno slash

Il simbolo di slash `'/'` non è un carattere speciale, ma in JavaScript viene utilizzato per aprire e chiudere le regexp: `pattern:/...pattern.../`, quindi dovremo fare l'escape anche di questo carattere.

Così è come appare una regexp `'/'` che cerca uno slash:

```js run
alert( "/".match(/\//) ); // '/'
```

In alternativa, se non utilizziamo `pattern:/.../`, ma creiamo una regexp utilizzando `new RegExp`, allora non avremmo bisogno dell'escape:

```js run
alert( "/".match(new RegExp("/")) ); // trovato /
```

## new RegExp

Se stiamo creando un'espressione regolare con `new RegExp`, allora non sarà necessario l'escape di `/`, ma dovremmo fare altri escape.

Ad esempio, consideriamo il seguente esempio:

```js run
let regexp = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(regexp) ); // null
```

Un ricerca simile, in uno degli esempi precedenti, funzionava con `pattern:/\d\.\d/`, ma `new RegExp("\d\.\d")` non funziona, perché?

Il motivo è che i backslash vengono "consumati" dalla stringa. Ricordate, le stringhe "normali" hanno i loro caratteri speciali, come `\n`, e un backslash viene utilizzato per fare escaping.

Così è come "\d\.\d" viene percepita:

```js run
alert("\d\.\d"); // d.d
```

Gli apici della stringa "consumano" i backslash e li interpreta come a se stanti, ad esempio:

- `\n`, diventa un carattere nuova riga,
- `\u1234`, diventa il carattere Unicode con quel codice,
- ...Ed in qualsiasi caso in cui c'è un significato speciale: come `pattern:\d` o `\z`, allora i backslash verranno semplicemente rimossi.

Quindi `new RegExp` ottiene la stringa senza i backslash. Questo è il motivo per cui la ricerca non funziona!

Per sistemarla, dobbiamo inserire i backslash doppi, poiché gli apici della stringa trasformeranno `\\` in `\`:

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (ora funziona correttamente)

let regexp = new RegExp(regStr);

alert( "Chapter 5.1".match(regexp) ); // 5.1
```

## Riepilogo

- Per cercare un carattere speciale `pattern:[ \ ^ $ . | ? * + ( )`, dobbiamo farlo precedere da un backslash `\` (farne l'"escape").
- Dobbiamo anche fare l'escape di `/` se ci troviamo all'interno di `pattern:/.../` (ma non dovremmo farlo dentro a `new RegExp`).
- Quando passiamo una stringa a `new RegExp`, dobbiamo utilizzare il doppio backslash `\\`, poiché gli apici della stringa ne "consumerà" uno dei due.
