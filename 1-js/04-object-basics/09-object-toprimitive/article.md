
# Conversione da oggetto a primitivi

Cosa accade quando degli oggetti vengono sommati `obj1 + obj2`, sottratti `obj1 - obj2` o mostrati tramite `alert(obj)`?

<<<<<<< HEAD
JavaScript non consente di personalizzare come gli operatori lavorano sugli oggetti. Diversamente da alcuni linguaggi di programmazione, come Ruby o C++, non implementa nessun metodo speciale per gestire l'addizione (o altri operatori).
=======
JavaScript doesn't allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle addition (or other operators).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Nel caso si effettuassero queste operazioni, gli oggetti vengono convertiti automaticamente in primitivi e le operazioni vengo effettuate su questi, restituendo poi un valore anch'esso primitivo.

<<<<<<< HEAD
Questa è un'importante limitazione, in quanto il risultato di `obj1 + obj2` non può essere un altro oggetto!
=======
That's an important limitation: the result of `obj1 + obj2` (or another math operation) can't be another object!
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per esempio. non possiamo creare oggetti che rappresentano vettori o matrici (o archievements o altro), sommarli ed aspettarsi un oggetto "somma" come risultato. Tali architetture non sono contemplate.

<<<<<<< HEAD
Quindi, poiché non possiamo intervenire, non c'è matematica con oggetti in progetti reali. Quando succede, di solito è a causa di un errore di codice.
=======
So, because we can't technically do much here, there's no maths with objects in real projects. When it happens, with rare exceptions, it's because of a coding mistake.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

In questo capitolo tratteremo come un oggetto si converte in primitivo e come personalizzarlo.

Abbiamo due scopi:

1. Ci permetterà di capire cosa succede in caso di errori di programmazione, quando tali operazioni avvengo accidentalmente.
2. Ci sono eccezioni, dove tali operazioni sono possibili e funzionano bene. Per esempio, sottrazione o confronto di date (oggetti `Date`). Come vedremo più tardi.

## Regole per la conversione

Nel capitolo <info:type-conversions> abbiamo visto le regole per le conversioni dei primitivi di tipo numerico, stringa e booleano. Però abbiamo lasciato un vuoto riguardo gli oggetti. Adesso che conosciamo i metodi e i symbol diventa più semplice parlarne.

<<<<<<< HEAD
1. Tutti gli oggetti sono `true` in contesto booleano. Ci sono solamente conversioni numeriche e a stringhe.
2. La conversione numerica avviene quando eseguiamo una sottrazione tra oggetti oppure applichiamo funzioni matematiche. Ad esempio, gli oggetti `Date` (che studieremo nel capitolo <info:date>) possono essere sottratti, ed il risultato di `date1 - date2` è la differenza di tempo tra le due date.
3. Le conversioni a stringa -- solitamente avvengono quando mostriamo un oggetto, come in `alert(obj)` e in altri contesti simili.

Possiamo perfezionare la conversione di stringhe e numeri, utilizzando metodi oggetto speciali.

Esistono tre varianti di conversione del tipo, che si verificano in varie situazioni.

Sono chiamate "hints", come descritto in [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
=======
1. There's no conversion to boolean. All objects are `true` in a boolean context, as simple as that. There exist only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object with `alert(obj)` and in similar contexts.

We can implement string and numeric conversion by ourselves, using special object methods.

Now let's get into technical details, because it's the only way to cover the topic in-depth.

## Hints

How does JavaScript decide which conversion to apply?

There are three variants of type conversion, that happen in various situations. They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`"string"`
: Un'operazione di conversione oggetto a stringa, avviene quando un operazione si aspetta una stringa, come `alert`:

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

    Most built-in mathematical functions also include such conversion.

`"default"`
: Utilizzata in casi rari quando l'operatore "non è sicuro" del tipo da aspettarsi.

<<<<<<< HEAD
    Ad esempio, la somma binaria `+` può essere utilizzata sia con le stringhe (per concatenarle) sia con i numeri (per eseguire la somma), quindi sia la conversione a stringa che quella a tipo numerico potrebbero andare bene. Oppure quando un oggetto viene confrontato usando `==` con una stringa, un numero o un symbol.
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

    Also, if an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done, so the `"default"` hint is used.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js
    // somma binaria
    let total = car1 + car2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

<<<<<<< HEAD
    L'operatore maggiore/minore `<>` può funzionare sia con stringhe che con numeri. Ad oggi, per motivi storici, si suppone la conversione a "numero" e non quella di "default".

    Nella pratica, tutti gli oggetti integrati (tranne oggetti `Date`, che studieremo più avanti) implementano la conversione `"default"` nello stesso modo di quella `"number"`. Noi dovremmo quindi fare lo stesso.

Notate -- ci sono solo tre hint. Semplice. Non esiste alcuna conversione al tipo "boolean" (tutti gli oggetti sono `true` nei contesti booleani). Se trattiamo `"default"` e `"number"` allo stesso modo, come la maggior parte degli oggetti integrati, ci sono solo due conversioni.
=======
    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

In practice though, things are a bit simpler.

All built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we probably should do the same.

Still, it's important to know about all 3 hints, soon we'll see why.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

**Per eseguire la conversione JavaScript tenta di chiamare tre metodi dell'oggetto:**

<<<<<<< HEAD
1. Chiama `obj[Symbol.toPrimitive](hint)` se il metodo esiste,
2. Altrimenti, se "hint" è di tipo `"string"`
    - prova `obj.toString()` e `obj.valueOf()`, sempre se esistono.
3. Altrimenti se "hint" è di tipo `"number"` o `"default"`
    - prova `obj.valueOf()` and `obj.toString()`, sempre se esistono.
=======
1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Symbol.toPrimitive

Iniziamo dal primo metodo. C'è un symbol integrato denominato `Symbol.toPrimitive` che dovrebbe essere utilizzato per etichettare il metodo che esegue la conversione, come nell'esempio:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // qui il codice per convertire questo oggetto a primitivo
  // deve ritornare un valore primitivo
  // hint = uno fra "string", "number", "default"
};
```

Se il metodo `Symbol.toPrimitive` esiste, viene utilizzato per tutti gli hint, e non sono necessari altri metodi.

Ad esempio, qui l'oggetto `user` lo implementa:

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

<<<<<<< HEAD
Come possiamo vedere nel codice, `user` diventa una stringa auto-descrittiva o una quantità di soldi, in base al tipo di conversione. Il semplice metodo `user[Symbol.toPrimitive]` gestisce tutte le conversioni.

=======
As we can see from the code, `user` becomes a self-descriptive string or a money amount, depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## toString/valueOf

Non esiste alcun `Symbol.toPrimitive` quindi JavaScript prova a trovare i metodi `toString` e `valueOf`:

<<<<<<< HEAD
- Per "string" hint: `toString`, e se non esiste, `valueOf` (quindi `toString` ha la priorità per la conversione di stringhe).
- Per altri hints: `valueOf`, e se non esiste, `toString` (quindi `valueOf` ha la priorità per le operazioni matematiche).
=======
- For the `"string"` hint: call `toString` method, and if it doesn't exist or if it returns an object instead of a primitive value, then call `valueOf` (so `toString` has the priority for string conversions).
- For other hints: call `valueOf`, and if it doesn't exist or if it returns an object instead of a primitive value, then call `toString` (so `valueOf` has the priority for maths).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Mi metodi `toString` arrivano `valueOf` da molto lontano. Non sono symbols (i symbols non esistevano tempo fa), ma piuttosto "normali" metodi. Forniscono un modo alternativo "vecchio stile" per implementare la conversione.

Questi metodi devono restituire un valore primitivo. Se `toString` o `valueOf` ritornano un oggetto, vengono ignorati (come se non ci fosse il metodo).

Per impostazione predefinita, un oggetto semplice ha i seguenti metodi `toString` e `valueOf`:

- Il metodo `toString` ritorna una stringa `"[object Object]"`.
- Il metodo `valueOf` ritorna l'oggetto stesso.

Ecco una dimostrazione:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Quindi, se proviamo a usare un oggetto come stringa, ad esempio in un `alert`, per impostazione predefinita vedremo `[object Object]`.

Il predefinito `valueOf` è menzionato qui solo per completezza, per evitare qualsiasi confusione. Come puoi vedere, restituisce l'oggetto stesso e quindi viene ignorato. Non chiedetemi perché, è per ragioni storiche. Quindi possiamo fare come se non esista.

Implementiamo questi metodi per personalizzare la conversione.

Ad esempio, qui `user` fa la stessa cosa vista sopra, utilizzando una combinazione di `toString` e `valueOf` invece di `Symbol.toPrimitive`:

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

## Una conversione può restituire qualsiasi tipo primitivo

Una cosa importante da sapere riguardo le conversioni primitive è che non devono necessariamente ritornare il tipo "hint" (suggerito).

<<<<<<< HEAD
Non c'è controllo riguardo al ritorno; ad esempio se `toString` ritorna effettivamente una stringa, o se `Symbol.toPrimitive` ritorna un numero per una *hint* `"number"`
=======
There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for the hint `"number"`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

L'unico obbligo: questi metodi devono ritornare un tipo primitivo, non un oggetto.

```smart header="Note storiche"
Per ragioni storiche, se `toString` o `valueOf` ritornassero un oggetto, non ci sarebbero errori, ma il risultato sarebbe ignorato (come se il metodo non esistesse). Questo accade perché inizialmente in JavaScript non c'era il concetto di "errore".

<<<<<<< HEAD
Invece, `Symbol.toPrimitive` *deve* ritornare un tipo primitivo, altrimenti ci sarebbe un errore.
=======
In contrast, `Symbol.toPrimitive` is stricter, it *must* return a primitive, otherwise there will be an error.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Ulteriori conversioni

Come già sappiamo, molti operatori eseguono una conversione dei tipi, per esempio l'operatore `*`, che converte gli operandi a numeri.

<<<<<<< HEAD
Se passiamo un oggetto come argomento, ci sono due passaggi:
1. L'oggetto è convertito a primitivo (secondo le regole spiegate sopra).
2. Se il risultato primitivo non è del tipo giusto, viene convertito.
=======
If we pass an object as an argument, then there are two stages of calculations:
1. The object is converted to a primitive (using the rules described above).
2. If necessary for further calculations, the resulting primitive is also converted.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:

```js run
let obj = {
  // toString gestisce tutte le conversioni nel caso manchino gli altri metodi
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, l'oggetto viene convertito al primitivo "2", successivamente la moltiplicazione lo converte a numero
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

<<<<<<< HEAD
alert(obj + 2); // 22 ("2" + 2), la conversione a primitivo ha restituito una stringa => concatenazione
=======
alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string => concatenation
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Riepilogo

La conversione di un oggetto a primitivo viene automaticamente effettuata da molte funzioni integrate e da operatori che si aspettano un primitivo come valore.
Ce ne sono tre tipi (hint):
- `"string"` (per `alert` e altre conversioni al tipo string)
- `"number"` (per operazioni matematiche)
- `"default"` (alcuni operatori)

<<<<<<< HEAD

Le specifiche descrivono esplicitamente quali operatori utilizzano quali hint. Ci sono veramente pochi operatori che "non sanno quali utilizzare" e quindi scelgono quello di `"default"`. Solitamente per gli oggetti integrati l'hint `"default"` si comporta nello stesso modo di quello di tipo `"number"`, quindi nella pratica questi ultimi due sono spesso uniti.
=======
There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, usually objects implement it the same way as `"number"`)

The specification describes explicitly which operator uses which hint.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

L'algoritmo di conversione segue questi passi:

<<<<<<< HEAD
1. Chiama `obj[Symbol.toPrimitive](hint)` se il metodo esiste,
2. Altrimenti se "hint" è di tipo `"string"`
    - prova `obj.toString()` e `obj.valueOf()`, sempre se esiste.
3. Altrimenti se "hint" è di tipo `"number"` o `"default"`
    - prova `obj.valueOf()` and `obj.toString()`, sempre se esiste.

Nella pratica, spesso è sufficiente implementare solo `obj.toString()` come metodo che "cattura tutte" le conversioni e ritorna una rappresentazione dell'oggetto "interpretabile dall'uomo", per mostrarlo o per il debugging.

Per quanto riguarda le operazioni matematiche, JavaScript non fornisce un modo per "sovrascriverle" utilizzando i metodi, quindi vengono raramente utilizzate sugli oggetti.
=======
1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

All these methods must return a primitive to work (if defined).

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
