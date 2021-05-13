# Riferimenti all'indietro (backreference) nei pattern: \N e \k<name>

Possiamo usare il contenuto dei gruppi di acquisizione `pattern:(...)` non soltanto nel risultato o nella stringa di sostituzione, ma anche all'interno del pattern stesso.

## Riferimento all'indietro per numero: \N

Ci si può riferire ad un gruppo nel pattern usando `pattern:\N`, in cui `N` indica il numero del gruppo.

Per comprendere chiaramente perché sia utile, consideriamo l'esercitazione seguente.

Dobbiamo trovare le stringhe tra apici: sia quelli singoli `subject:'...'` sia quelli doppi `subject:"..."`, entrambi devono dare luogo a riscontro.

Come trovarle?

Potremmo mettere i due tipi di apici all'interno di parentesi quadre: `pattern:['"](.*?)['"]`, ma in questo modo troveremmo anche le stringhe con apici misti come `match:"...'` e `match:'..."`. Questo porterebbe a risultati inesatti quando un tipo di apice compare tra due dell'altro tipo, come nella stringa `subject:"She's the one!"`:

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// Il risultato non è quello che vorremmo
alert( str.match(regexp) ); // "She'
```

Come possiamo osservare, il pattern ha trovato un apice di apertura `match:"`, quindi il testo fino al successivo apice `match:'` che chiude la corrispondenza.

Per accertarci che il pattern trovi l'apice di chiusura uguale a quello di apertura, possiamo racchiuderlo in un gruppo di acquisizione e fare riferimento ad esso: `pattern:(['"])(.*?)\1`.

Ecco il codice corretto:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

Ora funziona! The regular expression engine finds the first quote `pattern:(['"])` and memorizes its content. That's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group", exactly the same quote in our case.

Similar to that, `pattern:\2` would mean the contents of the second group, `pattern:\3` - the 3rd group, and so on.

```smart
If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not memorized by the engine.
```

```warn header="Don't mess up: in the pattern `pattern:\1`, in the replacement: `pattern:$1`"
In the replacement string we use a dollar sign: `pattern:$1`, while in the pattern - a backslash `pattern:\1`.
```

## Riferimento all'indietro per nome: `\k<name>`

If a regexp has many parentheses, it's convenient to give them names.

To reference a named group we can use `pattern:\k<name>`.

In the example below the group with quotes is named `pattern:?<quote>`, so the backreference is `pattern:\k<quote>`:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```
