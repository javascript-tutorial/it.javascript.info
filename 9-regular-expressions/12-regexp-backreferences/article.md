# Riferimenti all'indietro (backreference) nei pattern: \N e \k<name>

Possiamo usare il contenuto dei gruppi di acquisizione `pattern:(...)` non soltanto nel risultato o nella stringa di sostituzione, ma anche all'interno del pattern stesso.

## Riferimento all'indietro per numero: \N

Ci si può riferire ad un gruppo nel pattern usando `pattern:\N`, in cui `N` indica il numero del gruppo.

Per comprendere chiaramente perché sia utile, consideriamo l'esercitazione seguente.

Dobbiamo trovare le stringhe tra apici: sia quelli singoli `subject:'...'` sia quelli doppi `subject:"..."`, entrambi devono dare luogo a riscontro.

Come trovarli?

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

Ora funziona! L'interprete dell'espressione regolare trova il primo apice `pattern:(['"])` e lo memorizza. Questo è il primo gruppo di acquisizione.

Più avanti nel pattern `pattern:\1` significa "trova lo stesso testo del primo gruppo", nel nostro caso esattamente lo stesso apice.

Similmente `pattern:\2` indicherebbe il contenuto del secondo gruppo, `pattern:\3` quello del terzo gruppo, e così via.

```smart
Se nel gruppo usiamo `?:` non sarà possibile riferirsi ad esso. I gruppi esclusi dall'acquisizione `(?:...)` non sono memorizzati dall'interprete.
```

```warn header="Non fare confusione: nel pattern `pattern:\1`, nelle sostituzioni `pattern:$1`"
Nelle sostituzioni di stringa si adopera il segno di dollaro: `pattern:$1`, mentre nel contesto di un pattern il backslash `pattern:\1`.
```

## Riferimento all'indietro per nome: `\k<name>`

Se un'espressione regolare ha tante parentesi, è opportuno dare loro dei nomi.

Per riferirsi ad un gruppo nominato si usa `pattern:\k<name>`.

Nell'esempio sotto il gruppo con gli apici è nominato `pattern:?<quote>`, pertanto il riferimento è `pattern:\k<quote>`:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```
