Per inserire qualcosa dopo il tag `<body>` dobbiamo prima trovarlo. A questo scopo possiamo usare l'espressione regolare `pattern:<body.*?>`.

<<<<<<< HEAD
In questa esercitazione non abbiamo bisogno di modificare il tag `<body>`. Dobbiamo solo aggiungere del testo dopo di esso.
=======
In this task, we don't need to modify the `<body>` tag. We only need to add the text after it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ecco come possiamo farlo:

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

Nella stringa di sostituzione `$&` identifica la stessa corrispondenza, in altre parole, la parte della stringa sorgente che trova riscontro con `pattern:<body.*?>`. Essa viene sostituita da se stessa più l'aggiunta di `<h1>Hello</h1>`.

L'uso del lookbehind costituisce un'alternativa:

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

Come potete osservare, c'è solo la parte di lookbehind in questa regexp.

<<<<<<< HEAD
Funziona in questo modo:
- Per ogni posizione nella stringa.
- Verifica se è preceduta da `pattern:<body.*?>`.
- In caso affermativo abbiamo trovato la corrispondenza.

Il tag `pattern:<body.*?>` non verrà restituito. Il risultato di questa regexp è letteralmente una stringa vuota, ma individua le posizioni precedute da `pattern:<body.*?>`.

Quindi sostituisce uno "spazio vuoto" preceduto da `pattern:<body.*?>`, con `<h1>Hello</h1>`. In altre parole effettua un inserimento dopo `<body>`.
=======
It works like this:
- At every position in the text.
- Check if it's preceded by `pattern:<body.*?>`.
- If it's so, then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceded by `pattern:<body.*?>`.

So it replaces the "empty line", preceded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

P.S. I flag `pattern:s` e `pattern:i` potrebbero inoltre risultare utili: `pattern:/<body.*?>/si`. Il flag `pattern:s` fa in modo che il `pattern:.` identifichi anche un carattere di nuova riga, e con il flag `pattern:i` otteniamo che `pattern:<body>` e `match:<BODY>` costituiscano entrambi un riscontro.
