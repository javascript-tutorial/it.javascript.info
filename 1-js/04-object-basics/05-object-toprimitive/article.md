
# Conversione da oggetto a primitiva

Cosa acca de quando degli oggetti vengono sommati `obj1 + obj2`, sottratti `obj1 - obj2` o stampati tramite `alert(obj)`?

<<<<<<< HEAD
Ci sono dei metodi speciali che effettuano la conversione.

Nel capitolo <info:type-conversions> abbiamo visto le regole per quelle di tipo numerico, string e boolean. Però abbiamo lasciato un vuoto riguardo gli oggetti. Adesso che conosciamo i metodi e i symbol diventa più semplice parlarne.

Per gli oggetti, non c'è alcuna conversione a boolean, perché tutti gli oggetti valgono `true` nei contesti in cui è richiesto un valore di tipo boolean. Quindi esistono solo la conversione numerica e a string.

La conversione numerica avviene quando sottraiamo due oggetti o applichiamo delle funzioni matematiche. Ad esempio, gli oggetti `Date` (che studieremo nel capitolo <info:date>) possono essere sottratti, ed il risultato di `date1 - date2` è la differenza di tempo tra le due date.

Per le conversioni a string -- avvengono quando proviamo a stampare un oggetto con `alert(obj)` e altri contesti simili.

## ToPrimitive

Quando un oggetto viene utilizzato in un contesto in cui è richiesto un tipo primitivo, ad esempio, in un `alert` o in un operazione matematica, questo viene convertito ad una primitiva utilizzando l'algoritmo `ToPrimitive` ([specification](https://tc39.github.io/ecma262/#sec-toprimitive)).

Questo algoritmo ci consente di modellare la conversione utilizzando uno speciale metodo dell'oggetto.

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
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Ci sono tre varianti:

`"string"`
<<<<<<< HEAD
: Quando un operazione si aspetta una stringa, per una conversione oggetto-a-stringa, come `alert`:
=======
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    ```js
    // output
    alert(obj);

    // using object as a property key
    anotherObj[obj] = 123;
    ```

`"number"`
<<<<<<< HEAD
: Quando un operazione si aspetta un numero, per una conversione oggetto-a-numero, come nel caso delle operazioni matematiche:
=======
: For an object-to-number conversion, like when we're doing maths:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    ```js
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;
    ```

`"default"`
: Utilizzata in casi rari quando l'operatore "non è sicuro" del tipo necessario.

<<<<<<< HEAD
    Ad esempio, la somma binaria `+` può essere utilizzata sia con le stringhe (per concatenarle) sia con i numeri (per eseguire la somma), quindi sia la conversione a stringa che quella a tipo numerico potrebbero andare bene. Oppure quando un oggetto viene confrontato usando `==` con una stringa, un numero o un symbol.
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. Or when an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

    ```js
    // binary plus
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
  // return a primitive value
  // hint = one of "string", "number", "default"
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

// conversions demo:
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

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
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

## ToPrimitive e ToString/ToNumber
=======
## Return types
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Una cosa importante da sapere riguardo tutte le conversioni primitive è che non devono necessariamente ritornare il tipo "hint" (suggerito).

Non c'è alcun controllo per verificare che `toString()` ritorni esattamente una stringa, o che il metodo `Symbol.toPrimitive` ritorni un numero per un "hint" di tipo "number".

<<<<<<< HEAD
**L'unico obbligo: questi metodi devono ritornare un tipo primitivo.**
=======
The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
```

## Further operations
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

Un operazione che richiede una conversione ottiene quella primitiva, e continua a lavorarci, applicando ulteriori conversioni se necessario.

Ad esempio:

- Operazioni matematiche (ad eccezioni per la somma binaria) eseguono una conversione `ToNumber`:

    ```js run
    let obj = {
      toString() { // toString handles all conversions in the absence of other methods
        return "2";
      }
    };

    alert(obj * 2); // 4, ToPrimitive gives "2", then it becomes 2
    ```

- La somma binaria controlla la primitiva -- se è una stringa, questa viene concatenata, altrimenti esegue `ToNumber` e lavora con i numeri.

    Esempio con string:
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive returned string => concatenation)
    ```

    Esempio numerico:
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive returned boolean, not string => ToNumber)
    ```

<<<<<<< HEAD
```smart header="Note storiche"
Per ragioni storiche, i metodi `toString` o `valueOf` *dovrebbero* ritornare una primitiva: se uno di questi ritorna un oggetto, non ci sarà alcun errore, ma quell'oggetto verrà ignorato (come se il metodo non esistesse).

In maniera differente `Symbol.toPrimitive` *deve* ritornare una primitiva, altrimenti, si verificherà un errore.
```
=======
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

## Riepilogo

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
