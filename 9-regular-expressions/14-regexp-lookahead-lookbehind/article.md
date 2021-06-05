# Lookahead e lookbehind

Talvolta abbiamo bisogno di trovare soltanto quei riscontri per un pattern che sono seguiti o preceduti da un altro pattern.

Esiste a questo scopo una sintassi speciale denominata "lookahead" e "lookbehind", indicata complessivamente con il termine "lookaround".

Per cominciare troviamo il prezzo in una stringa come `subject:1 turkey costs 30€`. In parole semplici: un numero seguito dal simbolo di valuta `subject:€`.

## Lookahead

La sintassi è: `pattern:X(?=Y)`, che significa "cerca `pattern:X`, ma trova la corrispondenza solo se seguita da `pattern:Y`". Possiamo sostituire `pattern:X` e `pattern:Y` con un pattern qualsiasi.

Per un numero intero seguito da `subject:€`, la regexp sarà `pattern:\d+(?=€)`:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=€)/) ); // 30, viene ignorato il numero 1 in quanto non seguito da €
```

Si noti che la parte lookahead è solo un test e pertanto il contenuto tra parentesi `pattern:(?=...)` non è incluso nel risultato `match:30`.

Quando cerchiamo `pattern:X(?=Y)` l'interprete dell'espressione regolare trova `pattern:X` e successivamente verifica anche la presenza di `pattern:Y` subito dopo di esso. In caso contrario la corrispondenza potenziale viene scartata e la ricerca prosegue.

Sono possibili test più complessi, ad esempio `pattern:X(?=Y)(?=Z)` significa:

1. Trova `pattern:X`.
2. Verifica se `pattern:Y` sia subito dopo `pattern:X` (non proseguire in caso contrario).
3. Verifica se `pattern:Z` sia anch'esso dopo `pattern:X` (non proseguire in caso contrario).
4. Se entrambi i test trovano riscontro considera `pattern:X` una corrispondenza, diversamente continua la ricerca.

In altre parole, questo pattern significa che stiamo cercando `pattern:X` seguito sia da `pattern:Y` sia da `pattern:Z`.

Il che è possibile solo se i pattern `pattern:Y` e `pattern:Z` non si escludono a vicenda.

Per esempio, `pattern:\d+(?=\s)(?=.*30)` cerca `pattern:\d+` seguito da uno spazio `pattern:(?=\s)`, e poi c'è `30` da qualche parte dopo di esso `pattern:(?=.*30)`:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

Nella nostra stringa trova esatta corrispondenza nel numero `1`.

## Lookahead negativo

Supponiamo invece di volere nella stessa stringa solo la quantità, non il prezzo. Quindi il numero `pattern:\d+`, NON seguito da `subject:€`.

A questo scopo può essere applicato un lookahead negativo.

La sintassi è: `pattern:X(?!Y)`, significa "cerca `pattern:X`, ma solo se non seguito da `pattern:Y`".

```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (il prezzo non costituisce corrispondenza)
```

## Lookbehind

Lookahead permette di porre una condizione per "quello che segue".

Lookbehind è simile, ma cerca quello che precede. Consente quindi di trovare una corrispondenza per un pattern solo se c'è qualcosa prima di esso.

La sintassi è:
- Lookbehind positivo: `pattern:(?<=Y)X`, trova `pattern:X`, ma solo se c'è `pattern:Y` prima di esso.
- Lookbehind negativo: `pattern:(?<!Y)X`, trova `pattern:X`, ma solo se non c'è alcun `pattern:Y` prima di esso.

Cambiamo, ad esempio, il prezzo in dollari USA. Il segno del dollaro è posto di solito prima del numero, per cercare pertanto `$30` useremo `pattern:(?<=\$)\d+` un importo preceduto da `subject:$`:

```js run
let str = "1 turkey costs $30";

// facciamo l'escape al segno del dollaro \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (salta il numero senza segno di valuta)
```

Se abbiamo bisogno della quantità, il numero, non preceduto da `subject:$`, allora possiamo usare il lookbehind negativo `pattern:(?<!\$)\d+`:

```js run
let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (il risultato non include il prezzo)
```

## Gruppi di acquisizione

Generally, the contents inside lookaround parentheses does not become a part of the result.

E.g. in the pattern `pattern:\d+(?=€)`, the `pattern:€` sign doesn't get captured as a part of the match. That's natural: we look for a number `pattern:\d+`, while `pattern:(?=€)` is just a test that it should be followed by `subject:€`.

But in some situations we might want to capture the lookaround expression as well, or a part of it. That's possible. Just wrap that part into additional parentheses.

In the example below the currency sign `pattern:(€|kr)` is captured, along with the amount:

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert( str.match(regexp) ); // 30, €
```

And here's the same for lookbehind:

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Riepilogo

Lookahead and lookbehind (commonly referred to as "lookaround") are useful when we'd like to match something depending on the context before/after it.

For simple regexps we can do the similar thing manually. That is: match everything, in any context, and then filter by context in the loop.

Remember, `str.match` (without flag `pattern:g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.

But generally lookaround is more convenient.

Lookaround types:

| Pattern            | type             | matches |
|--------------------|------------------|---------|
| `X(?=Y)`   | Positive lookahead | `pattern:X` if followed by `pattern:Y` |
| `X(?!Y)`   | Negative lookahead | `pattern:X` if not followed by `pattern:Y` |
| `(?<=Y)X` |  Positive lookbehind | `pattern:X` if after `pattern:Y` |
| `(?<!Y)X` | Negative lookbehind | `pattern:X` if not after `pattern:Y` |
