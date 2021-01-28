
# La sintassi "new Function"

Esiste un ulteriore modo per creare una funzione. E' raramente utilizzato, ma a volte è l'unica alternativa.

## Sintassi

La sintassi per la creazione di una funzione con questo metodo è la seguente:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

La funzione viene creata con gli argomenti `arg1...argN` ed il corpo `functionBody`.

E' più semplice da comprendere guardando un esempio. Nel seguente abbiamo una funzione con due argomenti:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

In quest'altro esempio, invece, non abbiamo argomenti, c'è solo il corpo della funzione:

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

La differenza dalle altre modalità di creazione funzioni che abbiamo visto, è che  qui la funzione viene creata letteralmente da una stringa, che viene passata in fase di esecuzione.

Tutte le dichiarazioni di funzione precedenti richiedevano di scrivere il codice della funzione nello script.

Ma `new Function` ci permette di trasformare qualsiasi stringa in una funzione. Per esempio potremmo ricevere una nuova funzione da un server e quindi eseguirla:

```js
let str = ... riceviamo il codice della funzione dinamicamente, da un server ...

let func = new Function(str);
func();
```

Viene utilizzato in casi molto specifici, come quando riceviamo codice da un server, o per compilare dinamicamente una funzione da un modello, in applicazioni web complesse.

## Closure (chiusura)

Di solito, una funzione memorizza dove è nata nella proprietà speciale `[[Environment]]`. Questa fa riferimento al Lexical Environment da cui è stata creata (lo abbiamo trattato nel capitolo <info:closure>).

Ma quando una funzione viene creata con `new Function`, il suo `[[Environment]]` non fa riferimento all'attuale Lexical Environment, ma a quello globale.

Quindi, tale funzione non ha accesso alle variabili esterne, ma solo a quelle globali.

```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

Confrontiamolo con il normale comportamento:

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, dal Lexical Environment di getFunc
```

Questa caratteristica speciale di `new Function` sembra strana, ma si rivela molto utile nella pratica.

Immaginiamo di dover creare una funzione da una stringa. Il codice di questa funzione è sconosciuto nel momento in cui scriviamo lo script (per questo non usiamo i normali metodi), ma lo conosceremo durante l'esecuzione. Potremmo riceverlo dal server o da un'altra fonte.

La nostra nuova funzione ha bisogno di interagire con lo script principale.

E se potesse accedere alle variabili esterne?

Il problema è che, prima che JavaScript venga messo in produzione, viene spesso compresso utilizzando un *minifier*, ossia un programma speciale che riduce il codice rimuovendo commenti, spazi e, cosa importante, rinominando le variabili locali utilizzando nomi più brevi.

Ad esempio, se una funzione contiene `let userName`, il minifier lo sostituisce con `let a` (o con un'altra lettera se questa è già occupata), e lo fa ovunque. Solitamente è una procedura sicura: poiché la variabile è locale, nulla al di fuori della funzione può accedervi. Mentre all'interno della funzione il minifier sostituisce ogni sua menzione. I minifiers sono intelligenti, analizzano la struttura del codice e non rompono nulla. Non sono degli stupidi trova-e-sostituisci.

Quindi se `new Function` avesse accesso alle variabili esterne, non sarebbe in grado di trovare la variabile `userName` rinominata.

**Se `new Function` avesse accesso alle variabili esterne, ci sarebbero problemi con i minifiers.**

Inoltre, tale codice sarebbe pessimo dal punto di vista architetturale e soggetto ad errori.

Per passare qualcosa a una funzione, creata con `new Function`, dovremmo usare i suoi argomenti.

## Riepilogo

La sintassi:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```
Per ragioni storiche, gli argomenti possono anche essere passati come elenco separato da virgole.

Queste tre dichiarazioni hanno lo stesso significato:

```js
new Function('a', 'b', 'return a + b'); // sintassi base
new Function('a,b', 'return a + b'); // elenco separato da virgola
new Function('a , b', 'return a + b'); // elenco separato da virgola e spazio
```
Nelle funzioni create con `new Function`, `[[Environment]]` fa riferimento al Lexical Environment globale, non a quello esterno. Quindi queste funzioni non possono utilizzare variabili esterne. In realtà ciò è un bene perché ci mette al riparo da errori. Passare i parametri in modo esplicito è un metodo migliore dal punto di vista architetturale e non causa problemi con i minifiers.
