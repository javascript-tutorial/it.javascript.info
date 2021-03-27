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

Come possiamo decidere, cosa sia un componente? Ciò arriva dall'intuizione, l'esperienza ed il senso comune. Solitamente è una entità separata a livello visivo che possiamo descrivere in termini di cosa fa e di come interagisce con la pagina. Nell'esempio precedente, la pagina è divisa in blocchi, ognuno dei quali gioca un ruolo, quindi è logico farne dei componenti.

Un componente ha:
- Una propria classe JavaScript
- Una struttura DOM, gestito esclusivamente dalla sua classe, il codice esterno no può accedervi (principio di "incapsulamento").
- Stili CSS, applicati al componente.
- API: eventi, metodi della classe etc, per poter interagire con altri componenti.

Ancora una volta, il concetto di "componente" nen è niente di speciale.

Ci sono una serie di frameworks e metodi di sviluppo per costruirli, ognuno con le proprie "fantastiche e super attraenti" caratteristiche. Solitamente, vengono usate classi CSS e convenzioni specifiche per trasmettere la "sensazione di framework", scoping CSS ed incapsulamento del DOM.

I "Web components" forniscono capacità built-in nel browser per questo, quindi non abbiamo più bisogno di emularli.

- [Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) -- per definire elementi HTML personalizzati.
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees) -- per creare un DOM interno e visibile al componente stesso ed invisibile per gli altri.
- [CSS Scoping](https://drafts.csswg.org/css-scoping/) -- per dichiarare stili da applicare solo dentro lo Shadow DOM del componente.
- [Event retargeting](https://dom.spec.whatwg.org/#retarget) ed altre funzionalità minori per rendere i componenti personalizzati più adatti allo sviluppo.

Nel prossimo capitolo entreremo nei dettagli dei "Custom Elements", una funzionalità fondamentale e ben supportata dei web component, già ottima anche anche usata da sola.
