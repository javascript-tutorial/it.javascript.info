# Garbage collection ("Spazzatura")

In JavaScript la gestione della memoria viene eseguita automaticamente ed è invisibile. Noi creiamo primitive, oggetti, funzioni... Tutte queste occupano memoria.

Cosa succede quando qualcosa non è più necessario? Come fa JavaScript a scoprirlo e pulirlo?

## Raggiungibilità

Il principale concetto della gestione della memoria in JavaScript è la *raggiungibilità*.

Semplicemente una valore "raggiungibile" deve essere accessibile o utilizzabile. Questa proprietà ne garantisce la permanenza in memoria.

1. C'è una gruppo di valori che sono intrinsecamente raggiungibili, che non possono essere cancellati per ovvie ragioni.

    Ad esempio:

    - Variabili locali e parametri correnti della funzione.
    - Variabili o parametri di altre funzioni che fanno però parte della catena delle chiamate annidate.
    - Variabili globali.
    - (ce ne sono altre)

    Questi valori sono detti *radici*.

2. Qualsiasi altro valore viene considerato raggiungibile se è possibile ottenerlo per riferimento o per catena di riferimenti.

    Ad esempio, se c'è un oggetto in una variabile locale, e l'oggetto ha una proprietà che si riferisce ad un altro oggetto, quest'ultimo viene considerato raggiungibile. E anche tutti i suoi riferimenti lo saranno. Seguiranno esempi più dettagliati.

C'è un processo che lavora in background nel motore JavaScript, chiamato [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)). Monitora gli oggetti e rimuove quelli che sono diventati irraggiungibili.

## Un semplice esempio

Qui un esempio molto semplice:

```js
// user ha un riferimento all'oggetto
let user = {
  name: "John"
};
```

![](memory-user-john.png)

Qui la freccia indica un riferimento ad un oggetto. La variabile globale `"user"` fa riferimento all'oggetto `{name: "John"}` (lo chiameremo John per brevità). La proprietà `"name"` di John memorizza un tipo primitivo, quindi viene descritto all'interno dell'oggetto.

Se il valore di `user` viene sovrascritto, il riferimento viene perso.

```js
user = null;
```

![](memory-user-john-lost.png)

Ora John diventa irraggiungibie. Non c'è modo per accedervi, nessun riferimento. Il Garbage collector scarterà il dato per liberare la memoria.

## Due riferimenti

Ora proviamo a pensare di aver copiato il riferimento da `user` su `admin`:

```js
// user ha un riferimento all'oggetto
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.png)

Ora se facciamo:
```js
user = null;
```

...L'oggetto rimane raggiungibile tramite `admin`, quindi è in memoria. Se sovrascriviamo anche `admin`, allora verrà rimosso.

## Oggetti interconnessi

Ora vediamo un esempio più complesso. La famiglia:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

La funzione `marry` "sposa" due oggetti facendo in modo di fornire un riferimento l'uno per l'altro, e ritorna un oggetto che li contiene entrambi.

La struttura della memoria risultante:

![](family.png)

Per ora tutti gli oggetti sono raggiungibili.

Ora proviamo a rimuovere due riferimenti:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.png)

Non è sufficiente cancellare solo uno dei due riferimenti, perché l'oggetto rimarrebbe comunque raggiungibile.

Ma se li cancelliamo entrambi, allora John non ha più modo di essere raggiunto:

![](family-no-father.png)

I riferimenti in uscita non contano. Solo quelli in entrata possono rendere l'oggetto raggiungibile. Quindi, John risulta ora irragiungibile e verrà quindi rimosso dalla memoria, come tutti i suoi dati visto che sono inaccessibili.

Dopo la pulizia del Garabage collector:

![](family-no-father-2.png)

## Isola irraggiungibile

E' possibile che l'intera isola degli oggetti collegati a vicenda diventi inaccessibile e venga quindi rimossa dalla memoria.

L'oggetto sorgente è lo stesso di quello sopra. Poi:

```js
family = null;
```

La memoria ora risulta cosi:

![](family-no-family.png)

Questo esempio dimostra quanto sia importante il concetto della raggiungibilità.

E' ovvio che John e Ann siano ancora collegati, ma questo non è sufficiente.

L'oggetto che li conteneva `"family"` è stato rimosso dalla radicem non esistono quindi dei rierimenti, l'isola diventa irraggiungibile e verrà cancellata.

## Algoritmi interni

L'algoritmo basico utilizzato dal garbage collector viene chiamato "mark-and-sweep" (segna e pulisci).

Vengono seguiti questi step per eseguire un processo di "garbage collection":

- Il garbage collector "marchia" (ricorda) le radici.
- Successivamente visita e "marchia" tutti i riferimenti contenuti.
- Successivamente visita gli oggetti marcati e marca i vari riferimenti. Tutti gli oggetti visitati vengono ricordati, cosi da non ricontrollarli nuovamente in futuro.
- ...E cosi via fino ad aver controllato tutti i riferimenti (raggiungibili dalle radici).
- Tutti gli oggetti tranne quelli marcati vengono rimossi.

Ad esempio, rende la struttura del nostro oggetto del tipo:

![](garbage-collection-1.png)

Possiamo chiaramente vedere un "isola irraggiungibile" nella parte desta. Ora vediamo come la gestisce l'algoritmo "mark-and-sweep".

Il primo step sta nel marcare le radici:

![](garbage-collection-2.png)

Poi vengono marcari i loro riferimenti:

![](garbage-collection-3.png)

...E i loro riferimenti, finchè non si esauriscono:

![](garbage-collection-4.png)

Ora gli oggetti che non sono stati visitati vengono considerati irraggiungibili e verranno rimossi:

![](garbage-collection-5.png)

Questo è il concetto che sta dietro il funzionamento del Garbage collector.

JavaScript applica diverse ottimizzazioni per renderlo più rapido.

Alcune delle ottimizzazioni:

- **Raggruppamento generazionale** -- gli oggetti vengono divisi in due gruppi: "nuovi" e "vecchi". Molti oggetti vengono costruiti, eseguono il proprio lavoro e muoiono, quindi possono essere rimossi rapidamente. Quelli che vivono abbastanza al lungo vengono considerati come "vecchi" e verranno controllati con minore intensità
- **Raggruppamento incrementale** -- se ci sono molti oggetti, e ci mettessimo a controllare interi gruppi per marcarli, si perderebbe molto tempo, questo ritardo diventerebbe visibile durante l'esecuzione. Quindi i motori JavaScript tentano di dividere il processo in diverse parti. Questi pezzi vengono controllati uno per uno, separatamente. E' richiesto l'utilizzo di un registro per tenere traccia dei cambiamenti, in cambio avremmo tanti piccoli ritardi piuttosto che uno singolo ma enorme.
- **Raggruppamento per inattività** -- il garbage collector cerca di eseguire i suoi processi solo nei momenti in cui la CPU è inattiva, per ridurre al minimo possibile i ritardi durante l'esecuzione.

Ci sono altre ottimizzazioni per ottimizzare i processi del Garbage collector. Anche se mi piacerebbe poterli spiegare in dettaglio, sono costretto a fermarmi, poiché le varia ottimizzazioni dipendono dai motori che vengono utilizzati. Inoltre, i motori cambiano, si aggiornano e diventano sempre più "avanzati". Quindi se siete realmente interessati, vi lascio qualche link sotto.

## Riepilogo

Le principali cose da conoscere:

- Il processo di Garbage collection viene eseguito automaticamente. Non possiamo forzarlo o bloccarlo.
- Gli oggetti vengono mantenuti in memoria solo finché risultano raggiungibili.
- Essere riferimento di qualunque altro oggetto non significa essere raggiungibili (dalla radice): un gruppo di oggetti possono diventare irraggiungibili in un solo colpo.

I motori moderni applicano algoritmi avanzati di garbage collection.

Un buon libro "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jones et al) che descrive alcuni degli algoritmi.
 
Se conoscete la programmazione a basso livello, informazioni più dettagliate riguardo il Garbage collector V8 sono disponibili nell'articolo [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

[V8 blog](http://v8project.blogspot.com/) pubblica articoli riguardo i cambiamenti nella gestione della memoria. Ovviamente per apprendere il processo di garbage collection, è fortemente consigliato imparare il funzionamento del garbage collector V8 leggendo il blog [Vyacheslav Egorov](http://mrale.ph) che ha lavorato come ingegnere per lo sviluppo del V8. Vi dico "V8" perché è quello più utilizzato e maggiormente spiegato su internet. Per gli altri motori, gli approcci sono simili, ci sono alcune sottili differenze.

<<<<<<< HEAD
Le conoscenze profonde dei motori sono importanti quando necessitate di ottimizzazioni a basso livello. Potrebbe essere un buon traguardo dopo essere diventati familiari con il linguaggio.
=======
[V8 blog](https://v8.dev/) also publishes articles about changes in memory management from time to time. Naturally, to learn the garbage collection, you'd better prepare by learning about V8 internals in general and read the blog of [Vyacheslav Egorov](http://mrale.ph) who worked as one of V8 engineers. I'm saying: "V8", because it is best covered with articles in the internet. For other engines, many approaches are similar, but garbage collection differs in many aspects.

In-depth knowledge of engines is good when you need low-level optimizations. It would be wise to plan that as the next step after you're familiar with the language.  
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
