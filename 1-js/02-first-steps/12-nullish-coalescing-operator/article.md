# Nullish coalescing operator '??'

[recent browser="new"]

Il *nullish coalescing operator* è rappresentato da due punti di domanda `??`.

<<<<<<< HEAD
Siccome trattiamo `null` e `undefined` in modo simile, avremo bisogno di una definizione particolare. In questo articolo, diremo che un'espressione è "definita" quando non è né `null` né `undefined`.
=======
As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. For brevity, we'll say that a value is "defined" when it's neither `null` nor `undefined`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il risultato di `a ?? b` è:
- se `a` è definito, allora `a`,
- se `a` non è definito, allora `b`.

In altre parole, tra due operatori `??` ritorna il primo se questo non è `null/undefined`; altrimenti, ritorna il secondo.

Il nullish coalescing operator non è qualcosa di completamente nuovo. È solo un modo più elegante per recuperare il primo valore "definito" tra due operatori.

Possiamo riscrivere `result = a ?? b` usando gli operatori che già conosciamo, nel seguente modo:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Un caso d'uso comune per l'operatore `??` è quello di fornire un valore di default per una variabile potenzialmente "non definita".

<<<<<<< HEAD
Per esempio, qui mostriamo `Anonymous` se `user` non è definito:
=======
The common use case for `??` is to provide a default value.

For example, here we show `user` if its value isn't `null/undefined`, otherwise `Anonymous`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user is undefined)
```

Ovviamente, se `user` ha un qualsiasi valore eccetto `null/undefined`, allora vedremo quel valore:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user is not null/undefined)
```

Possiamo anche usare una sequenza di `??` per selezionare, da una lista, il primo valore che non sia `null/undefined`.

<<<<<<< HEAD
Per esempio, supponiamo di avere i dati di un utente nelle variabili `firstName`, `lastName` o `nickName`. Tutte queste potrebbero essere non definite, se l'utente dovesse decidere di non inserirne i valori.

Vorremmo visualizzare il nome dell'utente usando una di queste variabili, oppure mostrare "Anonymous" se nessuna di esse è definita.
=======
Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to fill in the corresponding values.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them are `null/undefined`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Usiamo l'operatore `??`:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// mostra il primo valore valido:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Confronti con ||

L'operatore OR `||` può essere usato nello stesso modo dell'operatore `??`, come descritto nel [capitolo precedente](info:logical-operators#or-finds-the-first-truthy-value).

Per esempio, nel codice precedente potremmo rimpiazzare `??` con `||` e ottenere comunque il medesimo risultato:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// mostra il primo valore vero:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
L'operatore OR `||` esiste sin dagli inizi di JavaScript e gli sviluppatori lo hanno usato a tale scopo per molto tempo.
=======
Historically, the OR `||` operator was there first. It's been there since the beginning of JavaScript, so developers were using it for such purposes for a long time.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Il nullish coalescing operator `??`, invece, è stato aggiunto  recentemente. La ragione è che alcuni sviluppatori non erano del tutto contenti dell'operatore `||`.

L'importante differenza tra essi è la seguente:
- `||` ritorna il primo valore *truthy*.
- `??` ritorna il primo valore *definito*.

In altre parole, `||` non distingue tra `false`, `0`, una stringa vuota `""` e `null/undefined`. In contesto booleano sono tutti valori `false`. Se uno di questi è il primo argomento di `||`, verrà ritornato il secondo argomento.

In pratica, però, potremmo voler usare il valore di default solamente quando la variabile è `null/undefined`. Ovvero quando è veramente non definita: una stringa vuota `''` o `0`, ad esempio, potrebbero tornarci utili.

Per esempio, consideriamo il seguente codice:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` controlla se `height` ha un valore falso: così è.
    - il risultato è dunque il secondo argomento, `100`.
- `height ?? 100` controlla se `height` è `null/undefined`: non lo è.
    - quindi il risultato è `height`, ovvero `0`.

Se un'altezza pari a zero è un valore accettabile, questo non dovrebbe essere rimpiazzato con il valore di default (il secondo operatore, nel'esempio sopra `100`); in questo caso il *nullish coalescing operator* `??` è la scelta giusta.

<<<<<<< HEAD
## Precedenza
=======
The precedence of the `??` operator is the same as `||`. They both equal `3` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La precedenza dell'operatore `??` è piuttosto bassa: `5` nella [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). Quindi `??` è valutato prima di `=` e `?`, ma dopo la maggior parte degli altri operatori, come `+` o `*`.

<<<<<<< HEAD
Quindi, se volessimo scegliere un valore tramite l'operatore `??` in un'espressione contenente altri operatori, dovremmo considerare l'utilizzo delle parentesi:
=======
So we may need to add parentheses in expressions like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let height = null;
let width = null;

// importante: utilizzare le parentesi
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Altrimenti, se omettessimo le parentesi, siccome `*` ha una precedenza maggiore rispetto a `??`, sarebbe eseguito prima, portando a risultati scorretti.

```js
// senza parentesi
let area = height ?? 100 * width ?? 50;

<<<<<<< HEAD
// ...funziona allo stesso modo del seguente codice (probabilmente non ciò che vogliamo)
=======
// ...works this way (not what we want):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
let area = height ?? (100 * width) ?? 50;
```

### Usare ?? con && o ||

Per motivi di sicurezza, JavaScript proibisce l'utilizzo di `??` insieme agli operatori `&&` e `||`, a meno che la precedenza non sia esplicitamente specificata tramite l'utilizzo delle parentesi.

Il codice sotto causa un errore di sintassi:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

La limitazione è sicuramente discutibile, ma fu aggiunta alle specifiche del linguaggio -quando le persone hanno iniziato ad utilizzare `??` al posto di `||`- con lo scopo di evitare errori di programmazione.

Per aggirare il problema si possono utilizzare delle parentesi esplicite:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

alert(x); // 2
```

## Riepilogo

- Il nullish coalescing operator `??` fornisce una scorciatoia per la scelta del primo valore "definito" da una lista di valori.

    È usato per assegnare valori di default alle variabili:

    ```js
    //  imposta height = 100 se 'height' è *null* o *undefined*
    height = height ?? 100;
    ```

- L'operatore `??` ha una precedenza molto bassa, solo un po' più alta di `?` e `=`, quindi va considerata l'aggiunta di parentesi quando lo si utilizza all'interno di un'espressione.
- È proibito usarlo con `||` o `&&` senza l'utilizzo di parentesi esplicite.
