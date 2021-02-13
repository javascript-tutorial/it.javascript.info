
# Conversione da oggetto a primitivi

Cosa accade quando degli oggetti vengono sommati `obj1 + obj2`, sottratti `obj1 - obj2` o mostrati tramite `alert(obj)`?

In questo caso gli oggetti vengono auto convertiti a primitivi; successivamente viene gestita l'operazione.

Nel capitolo <info:type-conversions> abbiamo visto le regole per le conversioni dei primitivi di tipo numerico, stringa e booleano. Però abbiamo lasciato un vuoto riguardo gli oggetti. Adesso che conosciamo i metodi e i symbol diventa più semplice parlarne.

1. Tutti gli oggetti sono `true` in contesto booleano. Ci sono solamente conversioni numeriche e a stringhe.
2. La conversione numerica avviene quando eseguiamo una sottrazione tra oggetti oppure applichiamo funzioni matematiche. Ad esempio, gli oggetti `Date` (che studieremo nel capitolo <info:date>) possono essere sottratti, ed il risultato di `date1 - date2` è la differenza di tempo tra le due date.
3. Le conversioni a stringa -- solitamente avvengono quando mostriamo un oggetto, come in `alert(obj)` e in altri contesti simili.

## ToPrimitive

Possiamo gestire la conversione numerica o a stringa, utilizzando dei metodi speciali dell'oggetto.

L'algoritmo di conversione si chiama `ToPrimitive`. In base al contesto, la conversione viene definita "hint" ("suggerimento"), ed è descritta nella ([specification](https://tc39.github.io/ecma262/#sec-toprimitive)).

Ci sono tre varianti:

`"string"`
: Un'operazione di conversione oggetto a stringa, avviene quando un operazione si apetta una stringa, come `alert`:

    ```js
    // output
    alert(obj);

    // utilizziamo un oggetto come chiave di una proprietà
    anotherObj[obj] = 123;
    ```

`"number"`
: Un operazione di conversione oggetto a numero, come nel caso delle operazioni matematiche:

    ```js
    // conversione esplicita
    let num = Number(obj);

    // conversione matematica (ad eccezione per la somma binaria)
    let n = +obj; // somma unaria
    let delta = date1 - date2;

    // confronto maggiore/minore
    let greater = user1 > user2;
    ```

`"default"`
: Utilizzata in casi rari quando l'operatore "non è sicuro" del tipo da aspettarsi.

    Ad esempio, la somma binaria `+` può essere utilizzata sia con le stringhe (per concatenarle) sia con i numeri (per eseguire la somma), quindi sia la conversione a stringa che quella a tipo numerico potrebbero andare bene. Oppure quando un oggetto viene confrontato usando `==` con una stringa, un numero o un symbol.

    ```js
    // somma binaria
    let total = car1 + car2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    L'operatore maggiore/minore `<>` può funzionare sia con stringhe che con numeri. Ad oggi, per motivi storici, si suppone la conversione a "numero" e non quella di "default".

    Nella pratica, tutti gli oggetti integrati (tranne oggetti `Date`, che studieremo più avanti) implementano la conversione `"default"` nello stesso modo di quella `"number"`. Noi dovremmo quindi fare lo stesso.

Notate -- ci sono solo tre hint. Semplice. Non esiste alcuna conversione al tipo "boolean" (tutti gli oggetti sono `true` nei contesti booleani). Se trattiamo `"default"` e `"number"` allo stesso modo, come la maggior parte degli oggetti integrati, ci sono solo due conversioni.

**Per eseguire la conversione JavaScript tenta di chiamare tre metodi dell'oggetto:**

1. Chiama `obj[Symbol.toPrimitive](hint)` se il metodo esiste,
2. Altrimenti, se "hint" è di tipo `"string"`
    - prova `obj.toString()` e `obj.valueOf()`, sempre se esistono.
3. Altrimenti se "hint" è di tipo `"number"` o `"default"`
    - prova `obj.valueOf()` and `obj.toString()`, sempre se esistono.

## Symbol.toPrimitive

Iniziamo dal primo metodo. C'è un symbol integrato denominato `Symbol.toPrimitive` che dovrebbe essere utilizzato per etichettare il metodo che esegue la conversione, come nell'esempio:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // ritorna un valore primitivo
  // hint = uno fra "string", "number", "default"
}
```

Ad esempio, qui `user` lo implementa:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// esempi di conversione:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

Come possiamo vedere nel codice, `user` diventa una stringa auto-descrittiva o una quantità di soldi, in base al tipo di conversione. Il semplice metodo `user[Symbol.toPrimitive]` gestisce tutte le conversioni.


## toString/valueOf

I metodi `toString` e `valueOf` sono molto vecchi. Non sono symbol (i symbol sono stati introdotti recentemente), ma dei metodi "classici". Forniscono un alternativa "old-style" per implementare le conversioni.

Se non è presente `Symbol.toPrimitive`, JavaScript prova a richiamare questi due metodi nell'ordine:

- `toString -> valueOf` per hint di tipo "string".
- `valueOf -> toString` altrimenti.

Ad esempio, qui `user` fa la stessa cosa vista sopra, utilizzando una combinazione di `toString` e `valueOf`:

```js run
let user = {
  name: "John",
  money: 1000,

  // per hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // per hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Spesso vogliamo un unico blocco che "catturi tutte" le conversioni a primitive. In questo caso possiamo implementare solamente `toString`:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

In assenza di `Symbol.toPrimitive` e `valueOf`, `toString` gestirà tutte le conversioni a primitive.

## Tipi di ritorno

Una cosa importante da sapere riguardo le conversioni primitive è che non devono necessariamente ritornare il tipo "hint" (suggerito).

Non c'è controllo riguardo al ritorno; ad esempio se `toString` ritorna effettivamente una stringa, o se `Symbol.toPrimitive` ritorna un numero per una *hint* `"number"`

L'unico obbligo: questi metodi devono ritornare un tipo primitivo, non un oggetto.

```smart header="Note storiche"
Per ragioni storiche, se `toString` o `valueOf` ritornassero un oggetto, non ci sarebbero errori, ma il risultato sarebbe ignorato (come se il metodo non esistesse). Questo accade perché inzialmente in JavaScript non c'era il concetto di "errore".

Invece, `Symbol.toPrimitive` *deve* ritornare un tipo primitivo, altrimenti ci sarebbe un errore.
```

## Ulteriori conversioni

Come già sappiamo, molti operatori eseguono una conversione dei tipi, per esempio l'operatore `*`, che converte gli operandi a numeri.

Se passiamo un oggetto come argomento, ci sono due passaggi:
1. L'oggetto è convertito a primitivo (secondo le regole spiegate sopra).
2. Se il risultato primitivo non è del tipo giusto, viene convertito.

Ad esempio:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. La moltiplicazione `obj * 2` prima converte l'oggetto a primitivo (è una stringa, `"2"`).
2. Quindi `"2" * 2` diventa `2 * 2` (la stringa è convertita a numero).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:
L'operatorio binario `+` concatenerebbe delle stringhe nella stessa situazione:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```

## Riepilogo

La conversione di un oggetto a primitivo viene automaticamene effettuata da molte funzioni integrate e da operatori che si aspettano un primitivo come valore.
Ce ne sono tre tipi (hint):
- `"string"` (per `alert` e altre conversioni al tipo string)
- `"number"` (per operazioni matematiche)
- `"default"` (alcuni operatori)


Le specifiche descrivono esplicitamente quali operatori utilizzano quali hint. Ci sono veramente pochi operatori che "non sanno quali utilizzare" e quindi scelgono quello di `"default"`. Solitamente per gli oggetti integrati l'hint `"default"` si comporta nello stesso modo di quello di tipo `"number"`, quindi nella pratica questi ultimi due sono spesso uniti.

L'algoritmo di conversione segue questi passi:

1. Chiama `obj[Symbol.toPrimitive](hint)` se il metodo esiste,
2. Altrimenti se "hint" è di tipo `"string"`
    - prova `obj.toString()` e `obj.valueOf()`, sempre se esiste.
3. Altrimenti se "hint" è di tipo `"number"` o `"default"`
    - prova `obj.valueOf()` and `obj.toString()`, sempre se esiste.

Nella pratica, spesso è sufficiente implementare solo `obj.toString()` come metodo che "cattura tutte" le conversioni e ritorna una rappresentazione dell'oggetto "interpretabile dall'uomo", per mostrarlo o per il debugging.  
