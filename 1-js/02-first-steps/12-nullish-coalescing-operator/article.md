# Nullish coalescing operator '??'

[recent browser="new"]

Qui, in questo articolo, diremo che un'espressione è "definita" quando non è né `null` né `undefined`.

Il nullish coalescing operator è scritto come due punti di domanda `??`.

Il risultato di `a ?? b` è:
- se `a` è definito, allora `a`,
- se `a` non è definito, allora `b`.


In altre parole, `??` ritorna il primo argomento se questo non è `null/undefined`. Altrimenti, ritorna il secondo.

Il nullish coalescing operator non è qualcosa di completamente nuovo. È solo un modo più elegante (una migliore sintassi) per recuperare il primo valore "definito" dei due.

Possiamo riscrivere `result = a ?? b` usando gli operatori che già conosciamo, nel seguente modo:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Un caso d'uso comune per l'operatore `??` è quello di fornire un valore di default per una variabile potenzialmente "non definita".

Per esempio, qui mostriamo `Anonymous` se `user` non è definito:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous
```

Ovviamente, se `user` ha un qualsiasi valore eccetto `null/undefined`, allora vedremo quel valore:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John
```

Possiamo anche usare una sequenza di `??` per selezionare, da una lista, il primo valore che non sia `null/undefined`.

Per esempio, supponiamo di avere dei dati relativi ad un utente nelle variabili `firstName`, `lastName` o `nickName`. Tutte queste potrebbero essere non definite, se l'utente dovesse decidere di non inserirne i valori.

Vorremmo visualizzare il nome dell'utente usando una di queste variabili, oppure mostrare "Anonymous" se tutte queste sono indefinite.

Usiamo l'operatore `??`per questo:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparison with ||

L'operatore OR `||` può essere usato nello stesso modo dell'operatore `??`, come descritto nel [capitolo precedente](info:logical-operators#or-finds-the-first-truthy-value).

Per esempio, nel codice precedente potremmo rimpiazzare `??` con `||` e ottenere comunque il medesimo risultato:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

L'operatore OR `||` esiste sin dagli inizi di JavaScript, quindi gli sviluppatori lo hanno usato a tale scopo per molto tempo.

D'altro canto, il nullish coalescing operator `??` fu aggiunto in JavaScript recentemente, poichè le persone non erano del tutto felici dell'operatore `||`.

L'importante differenza tra essi è la seguente:
- `||` ritorna il primo valore *truthy*.
- `??` ritorna il primo valore *definito*.

In altre parole, `||` non distingue tra `false`, `0`, una stringa vuota `""` e `null/undefined`. Sono tutti, allo stesso modo -- valori "falsy". Se uno tra questi è il primo argomento di `||`, allora otterremo il secondo argomento come risultato.

In pratica, però, potremmo voler usare il valore di default solamente quando la variabile è `null/undefined`. È in questo caso che il valore è davvero sconosciuto/non settato.

Per esempio, consideriamo questo:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` controlla se `height` possiede un valore "falsy", ed effettivamente così è,
    - quindi il risultato è il secondo argomento, `100`.
- `height ?? 100` controlla se `height` è `null/undefined`, ma così non è,
    - quindi il risultato è `height` "così com'è", ovvero `0`.

Se un'altezza pari a zero è un valore accettabile, allora questo non dovrebbe essere rimpiazzato con il valore di default, quindi `??` fa la cosa giusta.

## Precedence

La precedenza dell'operatore `??` è piuttosto bassa: `5` nella [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). Quindi `??` è valutato prima di `=` e `?`, ma dopo la maggior parte degli altri operatori, come `+`, `*`.

Quindi, se volessimo scegliere un valore tramite l'operatore `??` in un'espressione contenente altri operatori, dovremmo considerare l'utilizzo delle parentesi:

```js run
let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Altrimenti, se omettessimo le parentesi, siccome `*` ha una precedenza maggiore rispetto a `??`, sarebbe eseguito prima, portando a risultati scorretti.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Per motivi di sicurezza, JavaScript proibisce l'utilizzo di `??` insieme agli operatori `&&` e `||`, a meno che la precedenza non sia esplicitamente specificata tramite l'utilizzo delle parentesi.

Il codice sottostante causa un errore di sintassi:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

La limitazione è sicuramente discutibile, ma fu aggiunta alle specifiche del linguaggio con lo scopo di evitare errori di programmazione nel momento in cui le persone hanno iniziato ad utilizzare `??` al posto di `||`.

Per aggirare il problema si possono utilizzare delle parentesi esplicite:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

alert(x); // 2
```

## Summary

- Il nullish coalescing operator `??` fornisce una breve strada per la scelta del primo valore "definito" da una lista di valori.

    È usato per assegnare valori di default alle variabili:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- L'operatore `??` ha una precedenza molto bassa, solo un po' più alta di `?` e `=`, quindi considerare l'aggiunta di parentesi quando lo si utilizza all'interno di un'espressione.
- È proibito usarlo con `||` o `&&` senza l'utilizzo di parentesi esplicite.
