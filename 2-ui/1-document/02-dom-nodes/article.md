libs:
  - d3
  - domtree

---

# Alberatura DOM

La struttura portante di un documento HTML è rappresentata dai tags.

Secondo il Document Object Model (DOM), ogni tag HTML è un oggetto. I tags annidati vengono chiamati "figli" del tag che li racchiude.

Tutti questi oggetti sono accessibili usando JavaScript.

Ad esempio, `document.body` è l'oggetto che rappresenta il tag `<body>`.

## Un esempio di DOM

```js run
document.body.style.background = 'red'; // rende il background rosso

setTimeout(() => document.body.style.background = '', 3000); // reimposta il background
```

Qui abbiamo utilizzato `style.background` per cambiare il colore del background di `document.body`, ma ci sono molte altre proprietà, come:

- `innerHTML` -- il contenuto HTML del nodo.
- `offsetWidth` -- la larghezza del nodo (in pixel)
- ...e molto altro.

Presto vedremo ulteriori modi di manipolare il DOM, ma prima abbiamo bisogno di comprenderne la sua struttura.

## Un esempio di DOM

Iniziamo con un esempio molto semplice di un documento:

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>About elk</title>
</head>
<body>
  The truth about elk.
</body>
</html>
```

Il DOM rappresenta l'HTML sotto forma di alberatura di tag. Così è come appare:

<div class="domtree"></div>

<script>
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]},{"name":"#text","nodeType":3,"content":"\n"}]},{"name":"#text","nodeType":3,"content":"\n"},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n"}]}]}

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>

```online
Nella figura qui sopra è possibile cliccare sui nodi e i rispettivi figli si apriranno/chiuderanno.
```

I tag sono chiamati *nodi elemento* (o semplicemente elementi). I tag annidati diventano figli dei tag che li contengono. Come risultato abbiamo un albero di elementi: `<html>` è alla radice, abbiamo poi `<head>` e `<body>` che sono i suoi figli, etc.

Il testo all'interno degli elementi forma dei *nodi testuali*, etichettati come `#text`. Un nodo di testo contiene solo una stringa. Potrebbe non avere figli ed è sempre una foglia dell'albero.

Per esempio, il tag `<title>` contiene il testo `"About elks"`.

Facciamo caso ai caratteri speciali nei nodi di testo:

- il ritorno a capo: `↵` (conosciuto in JavaScript come `\n`)
- lo spazio: `␣`

Spazi e ritorni a capo sono caratteri assolutamente validi, costituiscono nodi testuali e diventano parte del DOM. Ad esempio, nel caso precedente, il tag `<head>` conteneva alcuni spazi prima del `<title>`, e quel testo diventa un nodo `#text` (contiene un ritorno a capo e alcuni spazi).

Esistono solo due particolari eccezioni:
1. Spazi e ritorni a capo prima del tag `<head>` sono ignorati per ragioni storiche.
2. Se inseriamo qualcosa dopo il tag `</body>` questo viene automaticamente spostato dentro il `body`, nella sua parte finale, dato che la specifica HTML richiede che tutto il contenuto sia dentro il `body`. Ecco perché non ci sono spazi dopo il tag `</body>`.

In tutti gli altri casi è molto semplice, se esistono degli spazi (così come ogni altro carattere) nel documento, allora essi diventano nodi testuali nel DOM, e se li rimuoviamo, non esisteranno più.

Ecco un esempio in cui non esistono nodi testuali contenenti spazi:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>About elk</title></head><body>The truth about elk.</body></html>
```

<div class="domtree"></div>

<script>
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"The truth about elk."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

```smart header="Gli spazi presenti ai bordi e tra i nodi testuali vuoti sono solitamente nascosti"
Gli strumenti del Browser (ne tratteremo a breve) che lavorano con il DOM non mostrano spazi all'inizio e alla fine del testo e dei nodi testuali vuoti tra più tags.
<!-- Browser tools (to be covered soon) that work with DOM usually do not show spaces at the start/end of the text and empty text nodes (line-breaks) between tags. -->

Questo succede perché essi sono solo dedicati ad abbellire l'HTML e non incidono su come questo viene mostrato (nella maggior parte dei casi).
<!-- That's because they are mainly used to decorate HTML, and do not affect how it is shown (in most cases). -->

Nelle prossime immagini del DOM ometteremo gli spazi quando irrilevanti.
<!-- On further DOM pictures we'll sometimes omit them where they are irrelevant, to keep things short. -->
```

## Autocorrezione

Se il browser riscontra HTML malformato, lo corregge automaticamente in fase di creazione del DOM.

Ad esempio, il tag di livello più alto è sempre `<html>`. Anche se esso non è presente nel documento esisterà nel DOM, perché il browser lo creerà. Lo stesso vale per il `<body>`.

Ipotizziamo che l'HTML sia costituito dalla singola parola `"Hello"`, in questo caso il browser racchiuderà la parola tra il tag `<html>` e `<body>`, aggiungendo inoltre il tag obbligatorio `<head>`, fino a ottenere:

<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

In fase di generazione del DOM, i browser processeranno automaticamente gli errori chiudendo i tags e via procedendo.

Il seguente documento senza tag di chiusura:

```html no-beautify
<p>Hello
<li>Mom
<li>and
<li>Dad
```

... Diventerà un normale DOM non appena il browser leggerà i tags e ripristinerà le parti mancanti:

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Mom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"and"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Dad"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

````warn header="Le tabelle hanno sempre il `<tbody>`"
Un interessante "caso speciale" è quello delle tabelle. Secondo le specifiche DOM le tabelle devono avere il tag `<tbody>`, ma nell'HTML può (ufficialmente) essere omesso. In questo caso il browser creerà il tag `<tbody>` nel DOM automaticamente.

Per il seguente HTML:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

La struttura del DOM sarà così:
<div class="domtree"></div>

<script>
let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);
</script>

Visto? Il `<tbody>` è apparso dal nulla. Per evitare sorprese, dovresti ricordarti di questa cosa in futuro nel momento in cui ti troverai a lavorare con le tabelle.
````

## Altre tipologie di nodo

Aggiungiamo ulteriori tags e commenti alla pagina:

```html
<!DOCTYPE HTML>
<html>
<body>
  The truth about elk.
  <ol>
    <li>An elk is a smart</li>
*!*
    <!-- comment -->
*/!*
    <li>...and cunning animal!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n  "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"An elk is a smart"}]},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...and cunning animal!"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n\n\n"}]}]};

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

Vediamo ora un nuovo tipo di nodo -- *nodo commento*, etichettato come `#comment`.

Potremmo chiederci -- perché il commento viene aggiunto al DOM? Non incide sul risultato grafico finale. Esiste in realtà una regola -- che se qualcosa è nell'HTML, allora deve essere presente anche nell'alberatura del DOM.

**Tutto ciò che è presente nell'HTML, anche i commenti, finisce per essere parte del DOM.**

Anche la direttiva `<!DOCTYPE...>` all'inizio dell'HTML è un nodo del DOM. Nell'alberatura si trova proprio prima del tag `<html>`. Non andremo a toccare quel nodo, non viene nemmeno rappresentato sui diagrammi, ma esiste.

L'oggetto `document` che rappresenta l'intero documento è anch'esso, formalmente, un nodo del DOM.

In teoria esistono [12 tipologie di nodo](https://dom.spec.whatwg.org/#node), ma solitamente nella pratica si lavora con solo 4 di esse:

1. `document`: il punto d'ingresso del DOM.
2. nodi elemento: tags HTML che rappresentano i blocchi con cui costruiamo l'alberatura.
3. nodi testuali: contengono testo.
4. commenti: qualche volta possiamo aggiungere informazioni, non verranno mostrate, ma JS potrà leggerle dal DOM.

Per vedere la struttura del DOM in real-time, prova [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Inizia a scrivere e vedrai istantaneamente le modifiche aggiunte al DOM.

<<<<<<< HEAD
Un altro modo per esplorare il DOM è usare gli "Strumenti per sviluppatori" del browser. Strumenti che usiamo quando sviluppiamo.
=======
To see the DOM structure in real-time, try [Live DOM Viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/). Just type in the document, and it will show up as a DOM at an instant.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Per procedere in questo modo, apri la pagina web [elks.html](elks.html), apri "Strumenti per sviluppatori" e spostati sulla scheda "Elements".

Dovrebbe apparire così:

![](elk.svg)

Puoi vedere il DOM, clicca sugli elementi e controlla i loro dettagli.

Nota che la struttura del DOM negli strumenti per sviluppatori è semplificata. I nodi testuali vengono mostrati come semplice testo e non ci sono nemmeno nodi testuali contenenti spazi vuoti. Ma va bene così, a noi interessano solo i nodi elemento.

Cliccando sul bottone <span class="devtools" style="background-position:-328px -124px"></span>, nell'angolo in alto a sinistra, avremo la possibilità di scegliere un nodo della pagina utilizzando il puntatore del mouse (o qualunque altro dispositivo a puntatore) e "ispezionarlo" (salteremo direttamente a visualizzare il nodo nella scheda Elements). Questo procedimento è ottimo nel caso in cui avessimo una pagina HTML gigantesca (con relativo DOM) e fossimo interessati a vedere il posizionamento di un particolare elemento.

Un altro metodo sarebbe quello di premere con il tasto destro su uno specifico elemento della pagina e cliccare poi su "Ispeziona" dal menù contestuale.

![](inspect.svg)

Nella parte destra degli strumenti per sviluppatori troviamo le seguenti schede:
- **Styles** -- possiamo vedere i CSS applicati all'elemento corrente, regola per regola, incluse quelle native (in grigio). Quasi tutto può essere modificato direttamente, incluse le dimensioni/margini/padding del box sottostante.
- **Computed** -- possiamo vedere il CSS applicato all'elemento per proprietà: per ognuna di esse possiamo vedere la regola che lo assegna (inclusa l'ereditarietà del CSS).
- **Event Listeners** -- possiamo vedere gli eventi registrati agli elementi del DOM (li tratteremo nella prossima parte del tutorial).
- ...E così via.

Il miglior modo per studiare è curiosare tra le varie schede e opzioni. La maggior parte dei valori è modificabile direttamente sul posto.

## Interazione con la console

Mano a mano che si procede con l'esplorazione del DOM è anche possibile giocare con un po' di JavaScript. Ad esempio: scegli un nodo ed esegui del codice per modificarlo e vederne il risultato. Alcune dritte per spostarsi tra la scheda "Elements" e la console:

- Seleziona il primo `<li>` nella scheda Elements.
- Premi il tasto `key:Esc` -- si aprirà la console proprio sotto la scheda Elements.

Ora l'ultimo elemento selezionato è disponibile come `$0`, quello precedente come `$1` etc.

Ora possiamo eseguire dei comandi. `$0.style.background = 'red'` colora di rosso lo sfondo dell'elemento selezionato della lista, in questo modo:

![](domconsole0.svg)

Al contrario, se ci troviamo nella console a abbiamo una variabile che referenzia un nodo del DOM, possiamo usare il comando `inspect(node)` per mostrarlo nel pannello Elements.

Oppure possiamo semplicemente mostrarlo nella console, come fatto qui sotto per `document.body`:

![](domconsole1.svg)

Questo è ovviamente a scopo di debug. Dal prossimo capitolo accederemo e modificheremo il DOM utilizzando JavaScript.

Gli strumenti per sviluppatori disponibili nel browser rappresentano un grosso aiuto nello sviluppo: possiamo navigare il DOM, sperimentare e vedere cosa non funziona.

## Riepilogo

Un documento HTML/XML è rappresentato nel browser come un'alberatura DOM.

- I tags diventano nodi elemento e formano la struttura.
- Il testo diventa nodo testuale.
- ...etc, qualunque cosa presente nell'HTML ha il suo corrispettivo nel DOM, anche i commenti.

È possibile utilizzare gli strumenti per sviluppatori per ispezionare il DOM e modificarlo manualmente.

Con questo terminiamo i concetti base, le azioni più usate e più importanti con cui iniziare. Al sito <https://developers.google.com/web/tools/chrome-devtools> è disponibile una vasta documentazione riguardo i Chrome Developer Tools. Il miglior modo per imparare questi strumenti è cliccare in giro, sperimentare e leggere: la maggior parte delle opzioni sono autoesplicative. Più avanti, una volta appresi i concetti generali, leggi la documentazione e prosegui con il resto.

I nodi del DOM hanno proprietà e metodi che permettono di navigare tra i nodi stessi, modificarli e spostarli all'interno della pagina. Approfondiremo nei prossimi capitoli.
