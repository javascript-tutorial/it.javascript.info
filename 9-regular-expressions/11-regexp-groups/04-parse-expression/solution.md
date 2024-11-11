L'espressione regolare per un numero è: `pattern:-?\d+(\.\d+)?`. L'abbiamo creata nell'esercizione precedente.

Per trovare un operatore usiamo `pattern:[-+*/]`. Il trattino `pattern:-` va posto all'inizio nelle parentesi quadre, in mezzo significherebbe un intervallo di caratteri, mentre noi vogliamo soltanto il carattere `-`.

Dovremmo fare l'escape dello slash `/` dentro una regexp JavaScript `pattern:/.../`, lo faremo dopo.

Abbiamo bisogno di un numero, un operatore, e quindi un altro numero. Tra di essi ci possono essere spazi opzionali.

Ecco l'intera espressione regolare: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

<<<<<<< HEAD
Questa consta di 3 parti, intervallate da `pattern:\s*`:
1. `pattern:-?\d+(\.\d+)?` - il primo numero,
1. `pattern:[-+*/]` - l'operatore,
1. `pattern:-?\d+(\.\d+)?` - il secondo numero.
=======
It has 3 parts, with `pattern:\s*` between them:
1. `pattern:-?\d+(\.\d+)?` - the first number,
2. `pattern:[-+*/]` - the operator,
3. `pattern:-?\d+(\.\d+)?` - the second number.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per rendere ciascuna di queste parti un elemento separato dell'array di risultati le racchiudiamo tra parentesi: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

In azione:

```js run
let regexp = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(regexp) );
```

Il risultato include:

- `result[0] == "1.2 + 12"` (l'intera corrispondenza)
- `result[1] == "1.2"` (il primo gruppo `(-?\d+(\.\d+)?)`, il primo numero compresa la parte decimale)
- `result[2] == ".2"` (il secondo gruppo`(\.\d+)?`, la prima parte decimale)
- `result[3] == "+"` (il terzo gruppo `([-+*\/])`, l'operatore)
- `result[4] == "12"` (il quarto gruppo `(-?\d+(\.\d+)?)`, il secondo numero)
- `result[5] == undefined` (il quinto gruppo `(\.\d+)?`, l'ultima parte decimale è assente, quindi equivale ad undefined)

Il nostro scopo è ottenere i numeri e l'operatore, senza l'intera corrispondenza o le parti decimali, quindi "puliamo" un po' il risultato.

L'intera corrispondenza (il primo elemento dell'array) possiamo rimuoverla con `result.shift()`.

I gruppi che contengono le parti decimali (gli elementi 2 e 4) `pattern:(.\d+)` li escludiamo aggiungendo  `pattern:?:` all'inizio: `pattern:(?:\.\d+)?`.

La soluzione finale:

```js run
function parse(expr) {
  let regexp = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(regexp);

  if (!result) return [];
  result.shift();

  return result;
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
```

As an alternative to using the non-capturing `?:`, we could name the groups, like this:

```js run
function parse(expr) {
	let regexp = /(?<a>-?\d+(?:\.\d+)?)\s*(?<operator>[-+*\/])\s*(?<b>-?\d+(?:\.\d+)?)/;

	let result = expr.match(regexp);

	return [result.groups.a, result.groups.operator, result.groups.b];
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45;
```