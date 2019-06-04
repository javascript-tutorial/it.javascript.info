
# Conversione da oggetto a primitiva

Cosa acca de quando degli oggetti vengono sommati `obj1 + obj2`, sottratti `obj1 - obj2` o stampati tramite `alert(obj)`?

<<<<<<< HEAD
In questo caso gli oggetti vengono auto convertiti a primitivi, e successivamente viene gestita l'operazione.

Nel capitolo <info:type-conversions> abbiamo visto le regole per quelle di tipo numerico, string e boolean. Però abbiamo lasciato un vuoto riguardo gli oggetti. Adesso che conosciamo i metodi e i symbol diventa più semplice parlarne.

1. Tutti gli oggetti sono `true` in un contesto booleano. Ci sono solamente conversioni numeriche e a stringhe.
2. La conversione numerica avviene quando eseguiamo una sottrazione tra oggetti oppure applichiamo funzioni matematiche. Ad esempio, gli oggetti `Date` (che studieremo nel capitolo <info:date>) possono essere sottratti, ed il risultato di `date1 - date2` è la differenza di tempo tra le due date.
3. Le conversioni a stringa -- solitamente accadono quando stampiamo un oggetto come `alert(obj)` e in altri contesti simili.

## ToPrimitive

Possiamo gestire la conversione numerica o a stringa, utilizzando dei metodi speciali dell'oggetto.

Quando un oggetto viene utilizzato in un contesto in cui è richiesto un tipo primitivo, ad esempio, in un `alert` o in un operazione matematica, questo viene convertito ad una primitiva utilizzando l'algoritmo `ToPrimitive` ([specification](https://tc39.github.io/ecma262/#sec-toprimitive)).

In base al contesto, la conversione viene definita "hint" ("suggerimento").
=======
In that case objects are auto-converted to primitives, and then the operation is carried out.

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

1. All objects are `true` in a boolean context. There are only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object like `alert(obj)` and in similar contexts.

## ToPrimitive

We can fine-tune string and numeric conversion, using special object methods.

The conversion algorithm is called `ToPrimitive` in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive). It's called with a "hint" that specifies the conversion type.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Ci sono tre varianti:

`"string"`
<<<<<<< HEAD
: Un operazione di conversione oggetto a stringa, avviene quando un operazione si apetta una stringa, come `alert`:
=======
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

    ```js
    // output
    alert(obj);

    // utilizziamo un oggetto come chiave di una proprietà
    anotherObj[obj] = 123;
    ```

`"number"`
<<<<<<< HEAD
: Un operazione di conversione oggetto a numero, come nel caso delle operazioni matematiche:
=======
: For an object-to-number conversion, like when we're doing maths:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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
: Utilizzata in casi rari quando l'operatore "non è sicuro" del tipo necessario.

<<<<<<< HEAD
    Ad esempio, la somma binaria `+` può essere utilizzata sia con le stringhe (per concatenarle) sia con i numeri (per eseguire la somma), quindi sia la conversione a stringa che quella a tipo numerico potrebbero andare bene. Oppure quando un oggetto viene confrontato usando `==` con una stringa, un numero o un symbol.
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. Or when an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

    ```js
    // somma binaria
    let total = car1 + car2;

    // obj == string/number/symbol
    if (user == 1) { ... };
    ```

    L'operatore maggiore/minore `<>` può funzionare sia con stringhe che con numeri. Ad oggi, per motivi storici, si suppone la conversione a "numero" e non quella di "default".

    Nella pratica, tutti gli oggetti integrati (tranne oggetti `Date`, che studieremo più avanti) implementano la conversione `"default"` nello stesso modo di quella `"number"`. Noi dovremmo quindi fare lo stesso.

Notate -- ci sono solo tre hint. Semplice. Non esiste alcuna conversione al tipo "boolean" (tutti gli oggetti sono `true` nei contesti booleani). Se trattiamo `"default"` e `"number"` allo stesso modo, come la maggior parte degli oggetti integrati, ci sono solo due conversioni.

**Per eseguire la conversione JavaScript tenta di chiamare tre metodi dell'oggetto:**

1. Chiama `obj[Symbol.toPrimitive](hint)` se il metodo esiste,
2. Altrimenti se "hint" è di tipo `"string"`
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

Come possiamo vedere dal codice, `user` diventa una stringa auto-descrittiva o una quantità di soldi, in base al tipo di conversione. Il semplice metodo `user[Symbol.toPrimitive]` gestisce tutte le conversioni.


## toString/valueOf

I metodi `toString` e `valueOf` sono molto vecchi. Non sono symbol (i symbol sono stati introdotti recentemente), ma dei metodi "classici". Forniscono un alternativa "old-style" per implementare le conversioni.

Se non è presente `Symbol.toPrimitive` allora JavaScript prova a richiamare questi due metodi nell'ordine:

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

<<<<<<< HEAD

## Tipi di ritorno
=======
## Return types
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

Una cosa importante da sapere riguardo tutte le conversioni primitive è che non devono necessariamente ritornare il tipo "hint" (suggerito).

Non c'è alcun controllo per verificare che `toString()` ritorni esattamente una stringa, o che il metodo `Symbol.toPrimitive` ritorni un numero per un "hint" di tipo "number".

<<<<<<< HEAD
L'unico obbligo: questi metodi devono ritornare un tipo primitivo, non un oggetto.
=======
The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
```

## Further operations
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```smart header="Note storiche"
Per ragioni storiche, se `toString` o `valueOf` ritornasse un oggetto, non ci sarebbero errori, ma sarebbe semplicemente ignorato(come se il metodo non esistesse). Questo accade perché inzialmente in JavaScript non c'era il concetto di "errore".

Invece, `Symbol.toPrimitive` *deve* ritornare un tipo primitivo, altrimenti ci sarebbe un errore.
```

## Ulteriori operazioni

Un operazione che richiede una conversione ottiene quella primitiva, e continua a lavorarci, applicando ulteriori conversioni se necessario.

Ad esempio:

- Operazioni matematiche (ad eccezioni per la somma binaria) eseguono una conversione `ToNumber`:

    ```js run
    let obj = {
      toString() { // toString gestisce tutte le conversione in assenza di altri metodi
        return "2";
      }
    };

    alert(obj * 2); // 4, ToPrimitive ritorna "2", che successivamente diventa 2
    ```

- La somma binaria controlla la primitiva -- se è una stringa, questa viene concatenata, altrimenti esegue `ToNumber` e lavora con i numeri.

    Esempio con string:
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive ha ritornato string => concatenazione)
    ```

    Esempio numerico:
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive ha ritornato boolean, no string => ToNumber)
    ```

<<<<<<< HEAD

## Riepilogo
=======
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

La conversione oggetto-a-primitiva viene chiamata automaticamente da molte funzioni integrate e operatori che si aspettano valori primitivi.

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

Nella pratica, spesso è sufficiente implementare solo `obj.toString()` come metodo che "cattura tutte" le conversioni, e ritorna una rappresentazione dell'oggetto "interpretabile dall'uomo".  
