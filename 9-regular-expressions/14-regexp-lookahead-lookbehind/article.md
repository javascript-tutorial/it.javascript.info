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

In other words, such pattern means that we're looking for `pattern:X` followed by `pattern:Y` and `pattern:Z` at the same time.

That's only possible if patterns `pattern:Y` and `pattern:Z` aren't mutually exclusive.

For example, `pattern:\d+(?=\s)(?=.*30)` looks for `pattern:\d+` that is followed by a space `pattern:(?=\s)`, and there's `30` somewhere after it `pattern:(?=.*30)`:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

In our string that exactly matches the number `1`.

## Negative lookahead

Let's say that we want a quantity instead, not a price from the same string. That's a number `pattern:\d+`, NOT followed by `subject:€`.

For that, a negative lookahead can be applied.

The syntax is: `pattern:X(?!Y)`, it means "search `pattern:X`, but only if not followed by `pattern:Y`".

```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (the price is not matched)
```

## Lookbehind

Lookahead allows to add a condition for "what follows".

Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there's something before it.

The syntax is:
- Positive lookbehind: `pattern:(?<=Y)X`, matches `pattern:X`, but only if there's  `pattern:Y` before it.
- Negative lookbehind: `pattern:(?<!Y)X`, matches `pattern:X`, but only if there's no `pattern:Y` before it.

For example, let's change the price to US dollars. The dollar sign is usually before the number, so to look for `$30` we'll use `pattern:(?<=\$)\d+` -- an amount preceded by `subject:$`:

```js run
let str = "1 turkey costs $30";

// the dollar sign is escaped \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)
```

And, if we need the quantity -- a number, not preceded by `subject:$`, then we can use a negative lookbehind `pattern:(?<!\$)\d+`:

```js run
let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (the price is not matched)
```

## Capturing groups

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
