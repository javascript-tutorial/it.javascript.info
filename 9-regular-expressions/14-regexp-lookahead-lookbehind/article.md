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

<<<<<<< HEAD
Lookahead permette di porre una condizione per "quello che segue".
=======
```warn header="Lookbehind browser compatibility"
Please Note: Lookbehind is not supported in non-V8 browsers, such as Safari, Internet Explorer.
```

Lookahead allows to add a condition for "what follows".
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

Generalmente il contenuto dentro le parentesi di lookaround non diventa parte del risultato.

Nel pattern `pattern:\d+(?=€)`, ad esempio, il segno `pattern:€` non viene acquisito nella corrispondenza. È del tutto normale: stiamo cercando il numero `pattern:\d+`, mentre `pattern:(?=€)` è solo un test che indica che il numero dovrebbe essere seguito da `subject:€`.

In alcune situazioni, tuttavia, potremmo voler catturare anche l'espressione del lookaround, o una parte di essa. Questo è possibile: è sufficiente racchiudere la parte desiderata all'interno di parentesi aggiuntive.

Nell'esempio sotto, il segno di valuta `pattern:(€|kr)` viene acquisito insieme all'importo:

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // parentesi addizionali intorno €|kr

alert( str.match(regexp) ); // 30, €
```

Stesso discorso per il lookbehind:

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Riepilogo

Il lookahead e il lookbehind (comunemente denominati con il termine "lookaround") sono utili quando vogliamo trovare qualcosa in base a ciò viene prima o dopo di esso.

Nel caso di espressioni regolari semplici potremmo ottenere lo stesso risultato manualmente. In altre parole: troviamo ogni riscontro, e quindi filtriamo i risultati in base alla posizione nel ciclo iterativo.

Ricordiamoci che `str.match` (senza il flag `pattern:g`) e `str.matchAll` (sempre) restituiscono i risultati in un array con la proprietà `index`, conosciamo pertanto l'esatta posizione della corrispondenza e possiamo stabilirne il contesto.

Generalmente, però, il lookaround è più efficiente.

Tipi di lookaround:

| Pattern            | Tipo             | Riscontri |
|--------------------|------------------|---------|
| `X(?=Y)`   | Lookahead positivo | `pattern:X` se seguito da `pattern:Y` |
| `X(?!Y)`   | Lookahead negativo | `pattern:X` se seguito da `pattern:Y` |
| `(?<=Y)X` |  Lookbehind positivo | `pattern:X` se dopo `pattern:Y` |
| `(?<!Y)X` | Lookbehind negativo | `pattern:X` se dopo `pattern:Y` |
