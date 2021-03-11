libs:
  - d3
  - domtree

---


# Percorrere il DOM

Il DOM ci consente di fare qualsiasi cosa con gli elementi ed il loro contenuto, ma prima dobbiamo essere in grado raggiungere l'oggetto DOM corrispondente.

Tutte le operazioni sul DOM iniziano con l'oggetto `document`. Questo è il principale "punto di ingresso" per il DOM, dal quale possiamo accedere a qualsiasi nodo.

Ecco un'immagine dei collegamenti che consentono di muoversi tra i nodi del DOM:

![](dom-links.svg)

Esaminiamoli nel dettaglio.

## In cima: documentElement e body

I nodi in cima all'albero sono disponibili direttamente come proprietà di `document`:

`<html>` = `document.documentElement`
: Il nodo del DOM più in alto è `document.documentElement`, esso corrisponde al tag `<html>`.

`<body>` = `document.body`
: Un altro nodo DOM largamente utilizzato è l'elemento `<body>`, ossia `document.body`.

`<head>` = `document.head`
: Il tag `<head>` è disponibile come `document.head`.

````warn header="C'è un problema: `document.body` può essere `null`"
Uno script non può accedere ad un elemento che non esiste al momento dell'esecuzione.

In particolare, se uno script si trova all'interno di `<head>`, `document.body` non è disponibile, perché il browser non lo ha ancora letto.

Quindi, nell'esempio sottostante, il primo `alert` mostra `null`:

```html run
<html>

<head>
  <script>
*!*
    alert( "Da HEAD: " + document.body ); // null, <body> non esiste ancora
*/!*
  </script>
</head>

<body>

  <script>
    alert( "Da BODY: " + document.body ); // HTMLBodyElement, ora <body> esiste
  </script>

</body>
</html>
```
````

```smart header="Nel mondo del DOM `null` significa \"non esiste\""
Nel DOM, il valore `null` significa "non esiste" o "nessun nodo trovato".
```

## Nodi figli: childNodes, firstChild, lastChild

Ci sono due termini che useremo d'ora in poi:

- **Nodi figli** (children o child node) : elementi che sono figli diretti, ossia che sono annidati al primo livello del nodo specificato. Ad esempio, `<head>` e `<body>` sono figli dell'elemento `<html>`.
- **Discendenti** : Tutti gli elementi che sono annidati a qualsiasi livello nell'elemento specificato. Sono inclusi i figli, i figli dei figli, e così via.

Ad esempio, qui `<body>` ha come figli `<div>` e `<ul>` (ed alcuni nodi di testo vuoti):

```html run
<html>
<body>
  <div>Inizio</div>

  <ul>
    <li>
      <b>Informazione</b>
    </li>
  </ul>
</body>
</html>
```

...E come discendenti di `<body>`, oltre a `<div>` e `<ul>`, abbiamo anche gli elementi annidati più in profondità, come `<li>` (figlio di  `<ul>`) e `<b>` (figlio di `<li>`). In pratica l'intero albero sotto a `<body>`.

**La collection `childNodes` raccoglie tutti i nodi figlio, inclusi quelli di testo**

L'esempio qui sotto mostra i figli di `document.body`:

```html run
<html>
<body>
  <div>Inizio</div>

  <ul>
    <li>Informazione</li>
  </ul>

  <div>Fine</div>

  <script>
*!*
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
    }
*/!*
  </script>
  ...altro...
</body>
</html>
```

Da notare un particolare interessante. Se eseguiamo l'esempio, l'ultimo elemento mostrato è `<script>`. Di fatto l'ultimo elemento sarebbe "...altro...", ma al momento dell'esecuzione dello script esso non è ancora stato letto, quindi non viene visto.

**Le proprietà `firstChild` e `lastChild` permettono un veloce accesso al primo ed all'ultimo figlio.**

Sono delle semplici scorciatoie. Se sono presenti dei nodi figlio, allora le seguenti espressioni sono sempre vere :
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```

Esiste anche la funzione speciale `elem.hasChildNodes()`, per verificare se sono presenti nodi figlio.

### DOM collections

Come possiamo vedere, `childNodes` sembra un array. Ma in realtà non è un array, ma piuttosto una *collection*: uno speciale oggetto iterabile, simile ad un array.

Questo comporta due importanti conseguenze:

1. Possiamo usare `for..of` per iterare:
  ```js
  for (let node of document.body.childNodes) {
    alert(node); // mostra tutti i nodi della collection
  }
  ```
  Questo perché è iterabile (ha la proprietà `Symbol.iterator` che contraddistingue gli iterabili).

2. I metodi degli array non funzionano, perché non è un array:
  ```js run
  alert(document.body.childNodes.filter); // undefined (il metodo filter non c'è!)
  ```

Il primo punto è ottimo, il secondo è tollerabile. Infatti nel caso avessimo bisogno dei metodi degli array possiamo usare `Array.from` e creare un "vero" array a partire dalla collection:

  ```js run
  alert( Array.from(document.body.childNodes).filter ); // function
  ```

```warn header="Le DOM collections funzionano in sola lettura"
Le DOM collections, ed in generale *tutte* le proprietà utili alla navigazione elencate in questo capitolo, funzionano in sola lettura.

Non possiamo sostituire un nodo figlio con qualcos'altro con l'assegnazione `childNodes[i] = ...`.

Modificare il DOM richiede l'utilizzo di altri metodi, che vedremo nel prossimo capitolo.
```

```warn header="Le DOM collections sono vive"
Salvo poche eccezioni, tutte le DOM collections sono *vive*. In altre parole, riflettono lo stato corrente del DOM.

Se prendiamo come riferimento `elem.childNodes`, ed aggiungiamo o rimuoviamo nodi dal DOM, essi appariranno o scompariranno automaticamente dalla collection.
```

````warn header="Non usare `for..in` per eseguire cicli sulle collections"
Le collections sono iterabili usando `for..of`, ma a volte qualcuno prova ad usare `for..in`.

Per favore non farlo. I cicli `for..in` iterano su tutte le proprietà enumerabili, e le collections possiedono alcune proprietà "extra", che vengono usare raramente, e che in genere non vorremmo ci fossero restituite dal ciclo:

```html run
<body>
<script>
  // mostra 0, 1, length, item, values ed altro.
  for (let prop in document.body.childNodes) alert(prop);
</script>
</body>
````

## I fratelli (*siblings*) ed il genitore (*parent*)

I fratelli sono nodi figli dello stesso genitore.

Ad esempio, qui `<head>` e `<body>` sono fratelli:

```html
<html>
  <head>...</head><body>...</body>
</html>
```

- `<body>` è chiamato fratello "successivo" o "a destra" di `<head>`,
- `<head>` è chiamato fratello "precedente" o "a sinistra" di `<body>`.

Il fratello successivo è nella proprietà `nextSibling`, quello precedente in `previousSibling`.

Il genitore è disponibile come `parentNode`.

Ad esempio

```js run
// il genitore di <body> e' <html>
alert( document.body.parentNode === document.documentElement ); // true

// dopo di <head> c'è <body>
alert( document.head.nextSibling ); // HTMLBodyElement

// prima di <body> c'è <head>
alert( document.body.previousSibling ); // HTMLHeadElement
```

## Navigazione solo tra elementi

Le proprietà di navigazione viste finora fanno riferimento a *tutti* i nodi. Ad esempio, in `childNodes` possiamo trovare: nodi elemento, nodi di testo, ed anche nodi commento se ce ne sono.

Ma per alcuni compiti non vogliamo nodi di testo o di commento. Vogliamo solo manipolare nodi che rappresentano i tags e che costituiscono la struttura della pagina.

Quindi vediamo altri collegamenti di navigazione che prendono in considerazione solo *nodi elemento*:

![](dom-links-elements.svg)

I collegamenti sono simili a quelli visti prima, ma con l'aggiunta della parola `Element`:

- `children` -- solo i figli che sono nodi elemento.
- `firstElementChild`, `lastElementChild` -- il primo e l'ultimo elemento figlio.
- `previousElementSibling`, `nextElementSibling` -- gli elementi vicini.
- `parentElement` -- l'elemento genitore.

````smart header="Why `parentElement`? Può un genitore *non* essere un elemento?"
La proprietà `parentElement` restituisce l' "elemento" genitore, mentre `parentNode` restituisce "qualsiasi nodo" genitore. Queste proprietà in genere coincidono: entrambe restituiscono lo stesso genitore.

Con l'unica eccezione di `document.documentElement`:

```js run
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
```

La ragione è che il nodo radice `document.documentElement` (`<html>`) ha `document` come genitore, ma document non è un nodo elemento, quindi `parentNode` lo restituisce, mentre `parentElement` no. 

Questo dettaglio può essere utile quando volgiamo risalire da un elemento arbitrario `elem` verso `<html>`, ma senza arrivare a `document`: 
```js
while(elem = elem.parentElement) { // su, fino a <html>
  alert( elem );
}
```
````

Modifichiamo uno degli esempi sopra, sostituendo `childNodes` con` children`. Ora vengono mostrati solo gli elementi:

```html run
<html>
<body>
  <div>Inizio</div>

  <ul>
    <li>Informazione</li>
  </ul>

  <div>Fine</div>

  <script>
*!*
    for (let elem of document.body.children) {
      alert(elem); // DIV, UL, DIV, SCRIPT
    }
*/!*
  </script>
  ...
</body>
</html>
```

## Ulteriori collegamenti: tabelle [#dom-navigation-tables]

Finora abbiamo descritto le proprietà base per la navigazione.

Alcuni tipi di elemento DOM possono fornire proprietà aggiuntive, specifiche per il loro tipo.

Le tabelle ne sono un esempio, e rappresentano un caso particolarmente importante:

**L'elemento `<table>`** supporta (in aggiunta a quelle trattate sinora) le seguenti proprietà:
- `table.rows` -- la collection degli elementi `<tr>` della tabella.
- `table.caption/tHead/tFoot` -- riferimenti agli elementi `<caption>`, `<thead>`, `<tfoot>`.
- `table.tBodies` -- la collection degli elementi `<tbody>` (secondo lo standard possono essere molti, ma ce ne sarà sempre almeno uno. Anche se non è nell' HTML di origine, il browser lo inserirà automaticamente nel DOM).

**Gli elementi `<thead>`, `<tfoot>`, `<tbody>`** hanno la proprietà `rows`:
- `tbody.rows` -- la collection degli elementi `<tr>` contenuti.

**`<tr>`:**
- `tr.cells` -- la collection delle celle `<td>` e `<th>` contenute nel `<tr>` specificato.
- `tr.sectionRowIndex` -- la posizione (index) di un dato `<tr>` incluso in `<thead>/<tbody>/<tfoot>`.
- `tr.rowIndex` -- il numero di `<tr>` nella tabella nel suo insieme (include tutte le righe della tabella).

**`<td>` e `<th>`:**
- `td.cellIndex` -- il numero della celle all'interno del contenitore `<tr>`.

Un esempio di utilizzo:

```html run height=100
<table id="table">
  <tr>
    <td>uno</td><td>due</td>
  </tr>
  <tr>
    <td>tre</td><td>quattro</td>
  </tr>
</table>

<script>
  // estrai td con "two" (prima riga, seconda colonna)
  let td = table.*!*rows[0].cells[1]*/!*;
  td.style.backgroundColor = "red"; // evidenzialo
</script>
```

La specifica: [tabular data](https://html.spec.whatwg.org/multipage/tables.html).

Proprietà di navigazione aggiuntive, sono anche disponibili per i moduli HTML. Li esamineremo più avanti, quando inizieremo a lavorare con i moduli.

## Riepilogo

Dato un nodo DOM, possiamo puntare ai suoi vicini usando le proprietà di navigazione.

Ne esistono di due tipi principali:

- Per tutti i nodi: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- Solo per i nodi elemento: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

Alcuni tipi di elemento DOM, es. le tabelle, 
Some types of DOM elements, e.g. tables, forniscono proprietà e collections aggiuntive per accedere al loro contenuto.
