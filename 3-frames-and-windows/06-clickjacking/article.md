# L'attacco clickjacking

L'attacco "clickjacking" consente ad una pagina maligna di cliccare su un "sito vittima" *per conto dell'utente*.

Molti siti hanno subito attacchi di questo tipo, inclusi Twitter, Facebook, Paypal e molti altri. Ovviamente, il problema in questi siti è stato risolto.

## L'idea

L'idea è piuttosto semplice.

Il clickjacking nel caso di Facebook funzionava in questo modo:

1. Un visitatore viene attirato da una pagina maligna. Non importa come.
2. La pagina contiene un link all'apparenza innocuo (con scritto ad esempio "diventa ricco ora" oppure "clicca qui, è molto divertente").
3. Sopra quel link la pagina malevola posiziona un `<iframe>` trasparente con `src` proveniente da facebook.com, in questo modo il bottone di "Mi piace" è proprio sopra al link. Solitamente viene fatto utilizzando `z-index`.
4. Nel tentativo di cliccare il link, il visitatore in realtà clicca il bottone.

## La dimostrazione

Qui vediamo come appare la pagina malevola. Per rendere le cose più chiare, l'`<iframe>` è semi-trasparente (nelle pagine reali invece è completamente trasparente):

```html run height=120 no-beautify
<style>
iframe { /* iframe dal sito vittima */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* in realtà sarà opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Click to get rich now:</div>

<!-- L'url del sito vittima -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Click here!</button>
*/!*

<div>...And you're cool (I'm a cool hacker actually)!</div>
```

La dimostrazione completa di come funziona l'attacco:

[codetabs src="clickjacking-visible" height=160]

Qui abbiamo un `<iframe src="facebook.html">` semi-trasparente, e nell'esempio possiamo vederlo andando in hover sul bottone. Un click nel bottone in realtà andrà a cliccare nell'iframe, ma questo non sarà visibile all'utente, perché l'iframe è trasparente.

Come risultato, se l'utente è autenticato su Facebook ("ricordami" solitamente è attivo), allora aggiungerà un "Mi piace". Su twitter potrebbe corrispondere al bottone di "Segui".

Qui vediamo lo stesso esempio, ma più simile a come apparirebbe realmente, con `opacity:0` nell'`<iframe>`:

[codetabs src="clickjacking" height=160]

Tutto ciò di cui abbiamo bisogno per l'attacco, è posizione l'`<iframe>` nella pagina maligna, facendo in modo che il bottone sia proprio sopra il link. Quindi quando l'utente proverà a cliccare il link, in realtà cliccherà il bottone. Tutto questo solitamente è fattibile utilizzando qualche proprietà CSS.

```smart header="Clickjacking funziona con i click, non cattura gli eventi da tastiera"
Questo tipo di attacco colpisce solamente le azioni effettuate con il mouse (o in maniera analoga, il tocco su dispositivi mobile).

Gli input da tastiera sono più difficili da reindirizzare. Tecnicamente, se volessimo attaccare un campo di testo, allora potremmo posizionare un iframe in modo che i campi di testo si sovrappongano. Quindi quando un utente proverà ad andare in focus sull'input che vedono nella pagina, in realtà starà impostando il focus sull'iframe.

Ma in questo caso avremmo un problema. Tutto ciò che l'utente scriverà sarà invisibile, perché anche l'iframe lo è.

Un utente solitamente smette di digitare quando notanche nessun carattere sta apparendo sullo schermo.
```

## Difesa vecchia scuola (debole)

La più vecchia difesa contro questi attacchi consiste in un paio di righe di codice JavaScript che bloccano l'apertura di pagine all'interno degli iframe (cosidetto "framebusting").

Il codice è qualcosa del genere:

```js
if (top != window) {
  top.location = window.location;
}
```

Ovvero: se una finestra non è in cima, allora pone automaticamente se stessa in cima.

Non è una difesa molto affidabile, poiché ci sono diversi modi per aggirarla. Vediamone un paio.

### Bloccare la navigazione della finestra in cima

Possiamo bloccare a transizione causata dal cambio di `top.location` nell'handler [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload).

La pagina in cima (quella che fa da contenitore, ovvero quella appartenente alla pagina maligna) può impostare un gestore di evento per bloccarlo, in questo modo:

```js
window.onbeforeunload = function() {
  return false;
};
```

Quando l'`iframe` proverà a cambiare la `top.location`, l'utente riceverà un messaggio che gli chiederà se ha intenzione di lasciare la pagina.

Nella maggior parte dei casi, l'utente risponderà di no, perché non è a conoscenza dell'iframe, tutto ciò che vede è la pagina in cima, non ha quindi alcun motivo per lasciare la pagina. Quindi `top.location` non cambierà!

In azione:

[codetabs src="top-location"]

### L'attributo sandbox

Una delle cose che vengono limitate dall'attributo `sandbox` è la navigazione. Un iframe con questo attributo, non può cambiare `top.location`.

Quindi possiamo aggiungere l'iframe con `sandbox="allow-scripts allow-forms"`. In questo modo disattiveremo le restrizioni, permettendo l'esecuzione di script e form. Ma lasciando attivo `allow-top-navigation` in questo modo `top.location` non potrà cambiare.

Vediamo il codice:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

Ci sono altri modi per aggirare questa protezione.

## X-Frame-Options

L'header server-side `X-Frame-Options` consente di definire se permettere o meno l'apertura di una pagina all'interno di un iframe.

Deve essere inviato come HTTP-header: il browser lo ignorerà se provate ad inserirlo tarmite il tag `<meta>`. Quindi, `<meta http-equiv="X-Frame-Options"...>` non avrà alcun effetto.

L'header può assumere 3 valori:


`DENY`
: Non mostrare mai la pagina dentro un iframe.

`SAMEORIGIN`
: Consenti di mostrare la pagina dentro un iframe, se appartiene alla stessa origine.

`ALLOW-FROM domain`
: Consenti di mostrare la pagina dentro un iframe se il documento genitore appartiene al `domain` fornito.

Ad esempio, Twitter utilizza `X-Frame-Options: SAMEORIGIN`.

````online
Qui vediamo il risultato:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless va in timeout con questo iframe -->
<iframe src="https://twitter.com"></iframe>

In base al browser che state utilizzando, l'`iframe` definito sopra potrebbe o essere vuoto oppure avvertirvi che il browser non permette alla pagina questo tipo di navigazione.
````

## Visualizzazione con funzionalità limitate

<<<<<<< HEAD
L'utilizzo dell'header `X-Frame-Options` causa un side-effect. Le altre pagine non saranno in grado di mostrare la nostra pagina in un iframe, anche se queste non avessero scopi malevoli.
=======
The `X-Frame-Options` header has a side effect. Other sites won't be able to show our page in a frame, even if they have good reasons to do so.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Quindi ci sono altre soluzioni... Ad esempio, possiamo "racchiudere" la pagina con un `<div>` e impostargli come stile `height: 100%; width: 100%;`, in questo modo intercetterà tutti i click. Andremo poi a rimuovere quel `<div>` nel caso in cui `window == top` o se ci rendiamo conto di non avere bisogno di questa protezione.

In questo modo:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Go to the site</a>
</div>

<script>
  // verrà generato un errore se la finestra in cima appartiene ad un'origin differente
  // ma in questo caso ci va bene
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

La dimostrazione:

[codetabs src="protector"]

## L'attributo samesite dei cookie

Anche l'attributo `samesite` dei cookie aiuta a prevenire attacchi di tipo clickjacking.

Un cookie con questo attributo viene inoltrato al sito solamente se questo viene aperto direttamente, senza passare per un iframe, o qualche altra via. Potete trovare maggiori informazioni nell'articolo <info:cookie#samesite>.

Se il sito, ad esempio Facebook, nei suoi cookie di autenticazione ha impostato l'attributo `samesite`, come nell'esempio:

```
Set-Cookie: authorization=secret; samesite
```

...Allora questo cookie non verrà inviato se Facebook viene aperto in un iframe da un altro sito. Quindi l'attacco fallirà.

L'attributo `samesite` dei cookie non ha alcun effetto nel caso in cui questi non vengano utilizzati. Questo consente ad altre pagine di mostrare i contenuti pubblici, e che non richiedono autenticazione negli iframe.

Per questo, gli attacchi di tipo clickjacking sono comunque possibili in alcuni casi limite. Ad esempio, un sito di sondaggi anonimi che evita la duplicazione dei voti controllando gli indirizzi IP, sarebbe ancora vulnerabili agli attacchi clickjacking, poiché non hanno alcun processo di autenticazione tramite cookie.

## Riepilogo

Il clickjacking è un modo per "ingannare" gli utenti facendoli cliccare in un sito vittima, senza che questi ne siano consapevoli. Questo attacco può risultare particolarmente pericoloso nel caso in cui vengano effettuate azioni importanti.

Un hacker può condividere un link nella sua pagina malevola, attirare gli utenti sulla sua pagina con una scusa qualsiasi. Esistono diversi modi per farlo.

Da un certo punto di vista, l'attacco non è così complesso: ciò che deve fare l'hacker è semplicemente intercettare un click. Però, se l'hacker è a conoscenza di ciò che apparirà dopo il click, allora potrà utilizzare dei messaggi astuti per convincere l'utente a cliccare anche sui successivi controlli.

L'attacco può essere piuttosto pericoloso, perché quando implementiamo la UI (interfaccia utente), solitamente non prendiamo in considerazione il fatto che un hacker potrebbe effettuare un click al posto di un utente. Quindi possiamo trovare vulnerabilità nei posti più inaspettati.

- E' sempre consigliato utilizzare `X-Frame-Options: SAMEORIGIN` nelle pagine (o anche nell'intero sito) che non abbiamo intenzione vengano mostrare all'interno degli iframe.
- Possiamo utilizzare un `<div>` "contenitore" se vogliamo consentire alle nostre pagine di essere mostrare negli iframe, ma rimanere comunque protetti.
