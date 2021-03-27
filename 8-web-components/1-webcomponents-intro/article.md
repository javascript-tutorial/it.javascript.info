# Da altezze orbitali

Questa sezione descrive un set di standar moderni per i "web components".

Ad oggi, questi standards sono in fase di sviluppo. Alcune funzionalità sono ben supportate ed integrate nel standard attuale HTML/DOM, mentre altre sono ancora allo stadio draft. Potremmo provare gli esempi in qualunque browser, ma Google Chrome è probabilmente il più aggiornato con queste funzionalità. Come è facile indovinare, ciò è dato dal fatto che dietro a molti dei concetti relativi a queste specifiche ci siano le organizzazioni di Google.

## Cosa c'è in comune tra...

L'idea generale del componente non è nulla di nuovo. Viene usato dappertutto in molti frameworks.

Prima di spostarci nei dettagli di implementazione, diamo un'occhiata a questa grandiosa conquista dell'umanità:

![](satellite.jpg)

Questa è la Stazione Spaziale Internazionale (ISS).

E csoì è come è fatta dentro (approssimativamente):

![](satellite-expanded.jpg)

La Stazione Spaziale Internazionale:
- Consta di molti componenti.
- Ogni componente, a sua volta, contiene all'interno tanti piccoli dettagli ancora più piccoli.
- I componenti sono molto complessi, molto più complicati della maggior parte dei siti web.
- I componenti vengono sviluppati a livello internazionale, da team di paesi differenti, che parlando lingue differenti.

...E questa cosa vola, mantenendo delle persone in vita nello spazio!

Come vengono creati dei dispositivi così complessi?

Quali principi possiamo prendere in prestito per rendere il nostro sviluppo affidabile e scalabile allo stesso livello? O almeno, per quanto possibile, avvicinarci ad essa.

## Architettura di un componente

La ben nota regola per sviluppare del software complesso è: non sviluppare software complesso.

Se qualcosa diventa complesso, dividerlo in parti più semplici e connetterli nel modo più ovvio.

**Un buon architetto è colui che può rendere cose complesse, semplici.**

Possiamo dividere l'interfaccia utente in componenti visuali: ognuno di essi ha la propria posizione nella pagina, può "fare" un compito ben preciso, ed è separato dagli altri.

Guardiamo un sito web, per esempio Twitter.

Si divide in componenti abbastanza naturalmente:

![](web-components-twitter.svg)

1. Barra di navigazione superiore.
2. Informazioni utente.
3. Suggerimenti di follow.
4. From di invio.
5. (e inoltre 6, 7) -- messaggi.

I componenti possono avere sottocomponenti, per esempio i messaggi possono essere parte di un componente "lista di messaggi" di livello superiore. Una immagine utente può essere essa stessa un componente, e così via.

Come possiamo decidere, cosa sia un componente? Ciò arriva dall'intuizione, l'esperienza ed il senso comune. Solitamente è una entità separata a livello visivo che possiamo descrivere in termini di cosa fa e di come interagisce con la pagina. Nell'esempio precedente, la pagina ha dei blocchi, ognuno dei quali gioca un ruolo, ed è logico farne dei componenti.

A component has:
- Its own JavaScript class.
- DOM structure, managed solely by its class, outside code doesn't access it ("encapsulation" principle).
- CSS styles, applied to the component.
- API: events, class methods etc, to interact with other components.

Once again, the whole "component" thing is nothing special.

There exist many frameworks and development methodologies to build them, each with its own bells and whistles. Usually, special CSS classes and conventions are used to provide "component feel" -- CSS scoping and DOM encapsulation.

"Web components" provide built-in browser capabilities for that, so we don't have to emulate them any more.

- [Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) -- to define custom HTML elements.
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees) -- to create an internal DOM for the component, hidden from the others.
- [CSS Scoping](https://drafts.csswg.org/css-scoping/) -- to declare styles that only apply inside the Shadow DOM of the component.
- [Event retargeting](https://dom.spec.whatwg.org/#retarget) and other minor stuff to make custom components better fit the development.

In the next chapter we'll go into details of "Custom Elements" -- the fundamental and well-supported feature of web components, good on its own.
