# Il Browser come ambiente, specifiche

<<<<<<< HEAD
Il linguaggio JavaScript è stato inizialmente creato per i browser. Da allora, si è evoluto fino a diventare un linguaggio adatto a molte piattaforme e differenti usi.

La piattaforma di utilizzo può essere un browser, un web-server, una lavatrice o un qualunque altro tipo di *host*. Ognuno di essi fornisce delle funzionalità specifiche alla piattaforma stessa. Secondo la specifica JavaScript questa è la definizione di *ambiente host*

Un ambiente host, oltre alle funzionalità core del linguaggio, fornisce oggetti e funzioni specifiche della piattaforma. I browser web, ad esempio, permettono di interagire con le pagine web, mentre Node.JS fornisce funzionalità dedicate al server e così via.
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a "smart" coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Di seguito una panoramica di cosa succede quando JavaScript viene eseguito nel browser:

![](windowObjects.svg)

C'è un oggetto "padre" chiamato `window` che ha due ruoli:

1. Il primo è quello di essere un oggetto globale per JavaScript, come descritto nel capitolo <info:global-object>.
2. Il secondo è quello di rappresentare "la finestra del browser" e fornire metodi per controllarla.

<<<<<<< HEAD
In questo caso lo utilizziamo come oggetto globale:
=======
For instance, we can use it as a global object:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run global
function sayHi() {
  alert("Hello");
}

// le funzioni globali sono metodi dell'oggetto globale:
window.sayHi();
```

<<<<<<< HEAD
E qui invece come finestra del browser, vogliamo visualizzarne l'altezza:
=======
And we can use it as a browser window, to show the window height:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert(window.innerHeight); // altezza interna della finestra
```

<<<<<<< HEAD
Ci sono molte altre funzionalità dell'oggetto `window`, ma le vedremo più avanti.

## DOM (Document Object Model)

L'oggetto `document` dà accesso al contenuto della pagina e ci permette di cambiare o creare qualunque cosa all'interno della stessa.
=======
There are more window-specific methods and properties, which we'll cover later.

## DOM (Document Object Model)

The Document Object Model, or DOM for short, represents all page content as objects that can be modified.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ad esempio:

```js run
// cambiamo il colore di background a red
document.body.style.background = "red";

// lo cambiamo nuovamente dopo 1 secondo-
setTimeout(() => document.body.style.background = "", 1000);
```

<<<<<<< HEAD
In questo caso abbiamo usato `document.body.style`, ma c'è molto di più. Proprietà e metodi sono descritti all'interno della specifica  [DOM Living Standard](https://dom.spec.whatwg.org).
=======
Here, we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```smart header="Il DOM non è solo per i browser"
La specifica del DOM spiega la struttura di un documento e fornisce oggetti per la sua manipolazione. Esistono strumenti al di fuori del browser che usano comunque il DOM.

<<<<<<< HEAD
Per esempio, strumenti lato server che scaricano e processano le pagine HTML sfruttano il DOM. In questo caso però potrebbero supportare solo una parte delle specifiche.
=======
For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

```smart header="CSSOM per lo stile"
Regole CSS e fogli di stile non sono strutturati come l'HTML. Esiste una specifica separata [CSSOM](https://www.w3.org/TR/cssom-1/) che spiega come essi siano rappresentati come oggetti, come leggerli e scriverli.

<<<<<<< HEAD
CSSOM è usato in concomitanza con il DOM quando modifichiamo delle regole di stile per il documento. In pratica però, CSSOM è raramente richiesto poiché di solito le regole CSS sono statiche. Di rado esiste la necessità di aggiungere/rimuovere regole CSS attraverso JavaScript, quindi non tratteremo l'argomento al momento.
=======
The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that's also possible.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## BOM (parte della specifica HTML)

Il Browser Object Model (BOM) rappresenta gli oggetti aggiuntivi forniti dal browser (ambiente host) per interagire con qualunque cosa a eccezione del documento.

Per esempio:

<<<<<<< HEAD
- L'oggetto [navigator](mdn:api/Window/navigator) fornisce informazioni riguardo il browser e il sistema operativo. Ci sono molte proprietà a disposizione, ma quelle largamente conosciute sono: `navigator.userAgent` -- informazioni riguardo il browser corrente, e `navigator.platform` -- informazioni sulla piattaforma (può essere utile differenziare Windows/Linux/Mac etc).
- L'oggetto [location](mdn:api/Window/location) permette di leggere l'URL corrente e reindirizzare il browser verso un altro URL.
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differentiate between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ecco come possiamo usare l'oggetto `location`:

```js run
alert(location.href); // shows current URL
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

<<<<<<< HEAD
Le funzioni `alert/confirm/prompt` fanno anch'esse parte del BOM: non sono direttamente correlate con il documento, ma rappresentano dei semplici metodi del browser per interagire con l'utente.

```smart header="Specifiche HTML"
Il BOM fa parte della [specifica HTML](https://html.spec.whatwg.org).

Sì, avete capito bene. La specifica HTML presente al link <https://html.spec.whatwg.org> non è solo per il "linguaggio HTML" (tags, attributi), ma copre anche una miriade di oggetti, metodi ed estensioni del DOM relative ai browser. Questa è la definizione di "HTML a grandi linee".
=======
The functions `alert/confirm/prompt` are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

```smart header="Specifications"
The BOM is a part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Riepilogo

Ricapitolando gli standard, abbiamo:

<<<<<<< HEAD
Specifica DOM: Descrive la struttura del documento, sua manipolazione ed eventi, vedi <https://dom.spec.whatwg.org>.

Specifica CSSOM: Descrive i fogli e le regole di stile, le loro manipolazioni e il loro legame con i documenti, vedi <https://www.w3.org/TR/cssom-1/>.
=======
DOM specification
: Describes the document structure, manipulations, and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them, and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Specifica HTML: Descrive il linguaggio HTML language (e.g. tags) e il BOM (browser object model) -- varie funzioni del browser: `setTimeout`, `alert`, `location` e così via, vedi <https://html.spec.whatwg.org>. Prende la specifica del DOM e l'arricchisce di ulteriori proprietà e metodi.


<<<<<<< HEAD
Per favore prendi nota dei link indicati in precedenza perché c'è talmente tanto da imparare che è impossibile trattare e ricordare ogni argomento.

Quando avrai voglia di informarti su una proprietà o un metodo, il manuale Mozilla <https://developer.mozilla.org/en-US/search> è sicuramente una buona risorsa, ma leggere la corrispondente specifica potrebbe essere addirittura meglio: è più complessa e lunga da leggere, ma consoliderà e completerà le tue conoscenze.
=======
Please note these links, as there's so much to learn that it's impossible to cover everything and remember it all.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.

To find something, it's often convenient to use an internet search "WHATWG [term]" or "MDN [term]", e.g <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Now, we'll get down to learning the DOM, because the document plays the central role in the UI.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
