# Modo multilinea, flag "m"
Il modo multilinea si abilita col flag `pattern:/.../m`.

Esso modifica il comportamento dei soli `pattern:^` e `pattern:$`.

In modalità multilinea essi non trovano corrispondenza solo con l'inizio e la fine della stringa ma anche con gli inizi e fine di linea.

## Inizio linea ^

Nell'esempio sotto riportato il testo è distribuito su più linee. Il pattern `pattern:/^\d+/gm` prende un numero dall'inizio di ogni riga:

```js run
let str = `1o posto: Winnie
2o posto: Piglet
33o posto: Eeyore`;

*!*
<<<<<<< HEAD
alert( str.match(/^\d+/gm) ); // 1, 2, 33
=======
console.log( str.match(/^\d/gm) ); // 1, 2, 3
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6
*/!*
```

Il motore di regex si sposta sul testo alla ricerca di un inizio riga `pattern:^`, quando lo trova -- continua a trovare la corrispondenza col resto del pattern `pattern:\d+`.
Mentre senza il flag  `pattern:/.../m` troverebbe corrispondenza solo col primo numero:

```js run
let str = `1o posto: Winnie
2o posto: Piglet
33o posto: Eeyore`;

*!*
<<<<<<< HEAD
alert( str.match(/^\d+/g) ); // 1
=======
console.log( str.match(/^\d/g) ); // 1
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6
*/!*
```

Questo accade perché il comportamento default del caret `pattern:^` trova corrispondenza solo con l'inizio del testo, mentre in modalità multilinea trova all'inizio di ogni riga.

```smart
"Inizio di linea" formalmente significa "immediatamente dopo un'interruzione di linea": il test `pattern:^` in modalità multilinea trova tutte le posizioni precedute dal carattere di nuova linea `\n`.

And at the text start.
```

## Fine linea $

Il simbolo di dollaro `pattern:$` si comporta in modo simile.

L'espressione regolare `pattern:\w+$` trova l'ultima parola in ogni stringa.

```js run
let str = `1o posto: Winnie
2o posto: Piglet
33o posto: Eeyore`;

<<<<<<< HEAD
alert( str.match(/\w+$/gim) ); // Winnie,Piglet,Eeyore
=======
console.log( str.match(/\d$/gm) ); // 1,2,3
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6
```

Senza il flag `pattern:/.../m` il dollaro `pattern:$` troverebbe corrispondenza solo con la fine dell'intera stringa, dunque risulterebbe solo l'ultima parola dell'intero testo.

## Ancore ^$ rispetto \n (a-capo)

Per trovare un fine linea è possibile usare non solo `pattern:^` e `pattern:$`, ma anche il carattere a-capo `\n`.

La prima differenza è che, contrariamente alle ancore, il carattere `\n` "consuma" il carattere a-capo aggiungendolo al risultato.

Ad esempio qui lo usiamo al posto di `pattern:$`:

```js run
<<<<<<< HEAD
let str = `1o posto: Winnie
2o posto: Piglet
33o posto: Eeyore`;
alert( str.match(/\w+\n/gim) ); // Winnie\n,Piglet\n
=======
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d\n/g) ); // 1\n,2\n
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6
```

Qui ogni corrispondenza è una parola più il carattere a-capo.

Un'altra differenza -- l' a-capo `\n` non trova corrispondenza a fine stringa. Questo è il motivo per cui `Eeyore` non è trovato nell'esempio sopra.

Pertanto le ancore sono migliori: sono più vicine a ciò che si vuole estrarre.

