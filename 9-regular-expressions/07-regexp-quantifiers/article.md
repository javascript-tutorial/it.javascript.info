# Quantificatori +, *, ? and {n}

Se si ha una stringa come la seguente: `+7(903)-123-45-67` e si vogliono trovare tutti i numeri che contiene ma, diversamente da prima, non siamo interessati alle singole cifre bensì agli interi numeri: `7, 903, 123, 45, 67`.

Se definisce numero un sequenza di una o più cifre `\d`, per marcare quanti ne servono si deve aggiungere in coda un *quantificatore*.

## Quantità {n}

Il quantificatore più semplice è un numero tra parentesi graffe `pattern:{n}`.

Un quantificatore si appende a un carattere (o a una classe di caratteri `[...]` un set, ecc..) specificando quante volte questo debba essere ripetuto.
Si riportano alcune forme avanzate, eccone alcuni esempi:

Il conteggio esatto: `{5}`
: `pattern:\d{5}` denota esattamente 5 cifre, identico a `pattern:\d\d\d\d\d`.

    Nell'esempio sottostante si cerca un numero a 5 cifre:
    
    ```js run
    alert( "Ho 12345 anni".match(/\d{5}/) ); //  "12345"
    ```

    Si può aggiungere `\b` per escludere i numeri più lunghi: `pattern:\b\d{5}\b`.

L'intervallo: `{3,5}`, trova da 3 a 5 ripetizioni.
: Per trovare i numeri da 3 a 5 cifre si possono mettere i limiti tra parentesi graffe: `pattern:\d{3,5}`

    ```js run
    alert( "Non ho 12 anni 12, ma 1234".match(/\d{3,5}/) ); // "1234"
    ```

    Si può tralasciare il limite superiore.

    In questo caso la regexp `pattern:\d{3,}` cercherà successioni di cifre lunghe `3` o più:

    ```js run
    alert( "Non ho 12 anni, ma 345678".match(/\d{3,}/) ); // "345678"
    ```

Torniamo alla stringa: `+7(903)-123-45-67`.

Un numero è una sequenza di una o più cifre in successione, dunque l'espressione regolare sarà `pattern:\d{1,}`:

```js run
let str = "+7(903)-123-45-67";

let numeri = str.match(/\d{1,}/g);

alert(numeri); // 7,903,123,45,67
```

## Abbreviazioni 

Sono presenti abbreviazioni per i quantificatori di uso più comune:

`+`
: Significa "uno o più", identico a `{1,}`.

    Ad esempio, `pattern:\d+` cerca i numeri:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`?`
: Significa "zero o uno" identico a `{0,1}`. In altri termini rende il simbolo opzionale.

    Ad esempio, il pattern `pattern:ou?r` cerca `match:o` seguito opzionalmente da `match:u`, quindi da `match:r`.

    Dunque, `pattern:colou?r` trova sia `match:color` che `match:colour`:

    ```js run
    let str = "In Inglese \"colore\" siscrive sia \"color\" che \"colour\"?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`*`
: Significa "zero o più", lo stesso che `{0,}`. Significa che il carattere può esserci, essere ripetuto o mancare.

    Ad esempio, `pattern:\d0*` cerca una cifra seguita da un numero arbitrario di zeri:

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    Confronto con `'+'` (uno o più):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 non compare, poichè 0+ richiede almeno uno 0
    ```

## Altri esempi

I quantificatori si usano spesso; essi costituiscono i blocchi principali per espressioni regolari complesse, si riportano in seguito altri esempi.

Regexp "frazione decimale" (un numero con la virgola): `pattern:\d+,\d+`
: In funzione:
    ```js run
    alert( "0 1 12,345 7890".match(/\d+,\d+/g) ); // 12,345
    ```

Regexp "Apertura di un tag HTML senza attributi" come, ad esempio, `<span>` oppure `<p>`: `pattern:/<[a-z]+>/i`
: In funzione:

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    Cerchiamo il carattere `pattern:'<'` seguito da una o più lettere latine one or more Latin letters, quindi  `pattern:'>'`.

Regexp "Apertura di un tag HTML senza attributi" (migliorato): `pattern:/<[a-z][a-z0-9]*>/i`
: Espressione regolare migliore: secondo lo standard, il nome di un tag HTML può avere cifre in qualsiasi posizione tranne la prima `<h1>`.

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

Regexp "Apertura o chiusura di un tag HTML senza attributi": `pattern:/<\/?[a-z][a-z0-9]*>/i`
: Aggiungiamo una slash opzionale `pattern:/?` prima del nome tag, dobbiamo farne l'escap altrimenti JavaScript penserebbe che sia la fine del pattern.

    ```js run
    alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
    ```

```smart header="Per rendere una espressione regolare più precisa, spesso dobbiamo renderla anche più complessa"
Possiamo vederne una regola comune in questo esempio: più l'espressione regolare è precisa -- più è lunga e complicata.

Ad esempio, per i tag HTML è possibile usare un'espressione regolare più semplice: `pattern:<\w+>`.

...Ma poiché `pattern:\w` intercetta qualsiasi lettera dell'alfabeto latino e il carattere `'_'`, la regexp intercetta anche dei non-tag, come `match:<_>`. Dunque è molto più semplice del pattern `pattern:<[a-z][a-z0-9]*>`, ma anche meno affidabile.

Basta accontentarsi di `pattern:<\w+>` o è necessario `pattern:<[a-z][a-z0-9]*>`?

La risposta è che nella vita reale entrambi sono accettabili; dipende però dal bilanciamento tra l'avere molte corrispondenze "extra" da filtrare in altri modi rispetto all'avere un'erspressione regolare più complessa.
```
