# Ricorsione e pila

Torniamo alle funzioni per studiarle più in profondità.

Il nostro primo argomento riguarda la *ricorsione*.

Se non siete nuovi alla programmazione, potete tranquillamente saltare questo capitolo.

La ricorsione è uno modello di programmazione che diventa utile in situazioni in cui la risoluzione di un problema si presta ad essere suddivisa in altri piccoli sotto-problemi dello stesso tipo, ma più semplici. O anche nei casi in cui un problema può essere semplificato ad un semplice problema più una variante simile al problema stesso. O come vedremo presto, per lavorare con alcune strutture dati.

Quando una funzione risolve un problema, durante il processo di risoluzione può chiamare anche altre funzioni. Un caso particolare di questa situazione si ha quando la funzione chiama *se stessa*. Questa è la definizione di *ricorsione*.

## Due modi di pensare

Per iniziare con qualcosa di semplice -- scriviamo una funzione `pow(x, n)` che eleva `x` ad una potenza naturale `n`. In altre parole, moltiplica `x` per se stessa `n` volte.

```js
pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16
```

Ci sono due modi per implementarla.

1. Pensiero iterativo: il ciclo `for`:

    ```js run
    function pow(x, n) {
      let result = 1;

      // multiply result by x n times in the loop
      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

    alert( pow(2, 3) ); // 8
    ```

2. Pensiero ricorsivo: semplificare il problema e richiamare la funzione:

    ```js run
    function pow(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * pow(x, n - 1);
      }
    }

    alert( pow(2, 3) ); // 8
    ```

Da notare come la versione ricorsiva sia completamente differente.

Quando `pow(x, n)` viene chiamata, l'esecuzione si spezza in due rami:

```js
              if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```

1. Se `n == 1`, allora è banale. Viene chiamato il *caso base* della ricorsione, poiché produce immediatamente il risultato ovvio: `pow(x, 1)` uguale a `x`.
2. Altrimenti, possiamo rappresentare `pow(x, n)` come `x * pow(x, n - 1)`. In matematica, si potrebbe scrivere <code>x<sup>n</sup> = x * x<sup>n-1</sup></code>. Questo viene chiamato il *passo ricorsivo*: trasformiamo il problema in un sotto-problema più semplice (moltiplicazione per `x`) e chiamiamo la stessa funzione con il sotto-problema più semplice (`pow` con una minore `n`). Il prossimo passo semplificherà ulteriormente finchè `n` sarà `1`.

Possiamo anche dire che `pow` *chiama ricorsivamente se stessa* finché non vale `n == 1`.

![recursive diagram of pow](recursion-pow.svg)


Ad esempio, per calcolare `pow(2, 4)` la variante ricorsiva esegue:

1. `pow(2, 4) = 2 * pow(2, 3)`
2. `pow(2, 3) = 2 * pow(2, 2)`
3. `pow(2, 2) = 2 * pow(2, 1)`
4. `pow(2, 1) = 2`

Quindi, la ricorsione riduce una chiamata a funzione ad una più semplice, e successivamente -- ad una ancora più semplice, e cosi via, finché il risultato diventa ovvio.

````smart header="La ricorsione è spesso più breve"
Spesso una soluzione ricorsiva risulta più breve di una iterativa.

In questo caso possiamo riscrivere lo stesso codice utilizzando l'operatore ternario `?` piuttosto di un `if` per rendere `pow(x, n)` più breve e leggibile:

```js run
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}
```
````

Il massimo numero di chiamate annidate (inclusa la prima) viene chiamato *profondità di ricorsione*. Nel nostro caso, sarà esattamente `n`.

La massima profondità di ricorsione viene limitata dal motore JavaScript. Possiamo farne all'incirca 10000, alcuni motori ne consentono un numero maggiore, ma 100000 probabilmente è al di fuori del limite di qualsiasi motore. Ci sono delle ottimizzazioni automatiche ("ottimizzazione della chiamate in coda"), ma nono sono ancora supportate da tutti e funzionano solo in casi semplici.

Questo fattore limita le possibili applicazioni della ricorsione, che rimangono comunque molte. Ci sono molte attività che possono essere semplificati tramite la ricorsione, rendendo i programmi più mantenibili.

## Il contesto e la pila d'esecuzione

Ora vediamo come funzionano le chiamate ricorsive. Per farlo analizzeremo bene le funzioni.

L'informazione riguardo una funzione in esecuzione viene memorizzata nel suo *contesto di esecuzione*.

Il [contesto di esecuzione](https://tc39.github.io/ecma262/#sec-execution-contexts) è una struttura dati interna che contiene i dettagli riguardo l'esecuzione di una funzione: dove si trova il flusso, le variabili, il valore di `this` (che non useremo in questo caso) e un paio di altri dettagli.

Una chiamata a funzione possiede esattamente un contesto di esecuzione associato.

Quando una funzione chiama una funzione annidata, succede quanto segue:

- La funzione attuale viene messa in pausa.
- Il contesto di esecuzione associato viene spostato in una struttura dati chiamata *pila dei contesti di esecuzione*.
- Viene eseguita la chiamata annidata.
- Al termine, viene ripristinato il vecchio contesto di esecuzione prelevandolo dalla pila, e la funzione esterna riprende da dove si era interrotta.

Vediamo cosa accade durante la chiamata `pow(2, 3)` .

### pow(2, 3)

Inizialmente con la chiamata `pow(2, 3)` il contesto d'esecuzione memorizza le variabili: `x = 2, n = 3`, mentre il flusso si trova alla riga `1` della funzione.

Che possiamo abbozzare:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Quello è ciò che accade quando la funzione inizia ad eseguire. La condizione `n == 1` è false, quindi il flusso continua nel secondo ramo della condizione `if`:

```js run
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
*!*
    return x * pow(x, n - 1);
*/!*
  }
}

alert( pow(2, 3) );
```

Le variabili sono le stesse, ma cambia la riga, quindi il contesto ora vale:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Per calcolare `x * pow(x, n - 1)`, dobbiamo eseguire una sotto-chiamata di `pow` con nuovi argomenti `pow(2, 2)`.

### pow(2, 2)
Per eseguire chiamate annidate, JavaScript memorizza il contesto di esecuzione nella *pila dei contesti d'esecuzione*.

Eseguiamo la chiamata della stessa funzione `pow`, ma non ha importanza. Il processo è lo stesso per tutte le funzioni:

1. Il contesto d'esecuzione viene "memorizzato" in cima alla pila.
2. Un nuovo contesto viene generato per la sotto-chiamata.
3. Quando la sotto-chiamata è conclusa -- il precedente contesto viene ripristinato e rimosso dalla pila, e l'esecuzione procede.

Questo è il contesto d'esecuzione quando entriamo nella sotto-chiamata `pow(2, 2)`:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Il nuovo contesto d'esecuzione è in cima (in grassetto), e quelli precedenti sono sotto.

Quando abbiamo terminato la sotto-chiamata -- è facile ripristinare il precedente contesto, poiché questo tiene traccia del punto d'arresto e delle variabili al momento dell'interruzione. 

### pow(2, 1)

Il processo si ripete: una nuova sotto-chiamata viene eseguita alla riga `5`, con gli argomenti `x=2`, `n=1`.

Un nuovo contesto d'esecuzione viene creato, quello precedente viene posto in cima alla pila:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 1, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 1)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Ora ci sono 2 vecchi contesti d'esecuzione e 1 in che sta eseguendo `pow(2, 1)`.

### L'uscita

Durante l'esecuzione di `pow(2, 1)`, a differenza delle precedenti esecuzioni, la condizione `n == 1` è vera, quindi viene preso il primo ramo `if`:

```js
function pow(x, n) {
  if (n == 1) {
*!*
    return x;
*/!*
  } else {
    return x * pow(x, n - 1);
  }
}
```

Non ci sono ulteriori chiamata annidate, quindi la funzione si conclude, ritornando `2`.

Quando la funzione ha terminato, il suo contesto d'esecuzione non è più necessario, quindi viene rimosso dalla memoria. Viene ripristinato quello precedente, prelevandolo dalla cima della pila:


<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

L'esecuzione di `pow(2, 2)` viene ripristinata. Ora però possiede il risultato ricevuto dalla chiamata `pow(2, 1)`, quindi può concludere il calcolo  `x * pow(x, n - 1)`, ritornando `4`.

Successivamente il precedente contesto viene ripristinato:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Quando si conclude, abbiamo il risultato di `pow(2, 3) = 8`.

La profondità d'esecuzione in questo caso è: **3**.

Dalle figure viste sopra, possiamo notare che la profondità di ricorsione è uguale al massimo numero di contesti nella pila.

Da notare i requisiti di memoria. I contesti sfruttano la memoria. Nel nostro caso, la crescita della potenza `n` richiede un numero `n` di contesti.

Un algoritmo basato sui cicli risparmia più memoria:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

La forma iterativa di `pow` utilizza un solo contesto d'esecuzione, modificando `i` e `result` durante il calcolo. I suoi requisiti di memoria sono inferiori, fissati e non dipendono da `n`.

**Qualsiasi ricorsione può essere riscritta come un ciclo. La variante che utilizza un ciclo spesso può essere più efficace.**

<<<<<<< HEAD
...Qualche volta la traduzione potrebbe non essere banale, specialmente quando la funzione utilizza diverse sotto-chiamate ricorsive in base al verificarsi di certe condizioni, fonde i risultati delle diverse sotto-chiamate oppure quando le diramazioni diventano più complesse. In questi casi l'ottimizzazione potrebbe non essere necessaria o non valerne lo sforzo.
=======
...But sometimes the rewrite is non-trivial, especially when a function uses different recursive subcalls depending on conditions and merges their results or when the branching is more intricate. And the optimization may be unneeded and totally not worth the efforts.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

La ricorsione fornisce un codice più breve, più facile da capire e dimostrare. L'ottimizzazione non è sempre richiesta, spesso è meglio avere un buon codice, per questo viene molto utilizzata la ricorsione.

## Ricorsione trasversale

Un'altra grande applicazione della ricorsione è la ricorsione trasversale.

Immaginiamo di avere un'azienda. La struttura dello staff può essere rappresentata tramite un oggetto:

```js
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};
```

In altre parole, un'azienda ha dei dipartimenti.

- Un dipartimento può avere un array di staff. Ad esempio il dipartimento `sales` ("vendite") ha due impiegati: John e Alice.
- Oppure un dipartimento può essere suddiviso in due sotto-dipartimenti, come `development` che ha due rami: `sites` e `internals`. Ognuno di questi ha il proprio staff.
- E' anche possibile che un sotto-dipartimento cresca, dividendosi in sotto-sotto-dipartimenti (o team).

    Ad esempio, il dipartimento `sites` in futuro potrebbe dividersi in due team dedicati a `siteA` e `siteB`. E questi, potenzialmente, potrebbero dividersi ulteriormente. Anche se nel nostro esempio non è cosi, va comunque tenuta in mente come possibilità.

Ora ipotizziamo di volere una funzione per ottenere la somma di tutti i salari. Come possiamo farlo?

Un approccio iterativo potrebbe non essere cosi semplice, poiché la struttura stessa non è semplice. La prima idea potrebbe essere quella di utilizzare un ciclo `for` su `company` con un sotto-ciclo annidato sul primo livello annidato dei dipartimenti. Ma ora abbiamo bisogno di ulteriori sotto-cicli annidati per poter iterare su un livello ulteriormente inferiore di staff, come ad esempio `sites`. ...E poi un ulteriore sotto-ciclo per il successivo livello di annidamento che potrebbe potenzialmente apparire in futuro. Potrebbero però esserci ulteriori livelli di annidamento, quindi inserire una serie di cicli annidati darebbe come risultato un pessimo codice.

Proviamo con la ricorsione.

Come possiamo vedere, quando la nostra funzione richiede la somma dei salari di un dipartimento, ci sono due casi possibili:

1. Siamo in caso "semplice" in cui il dipartimento contiene solamente *array di persone* -- allora possiamo semplicemente sommare i salari con un ciclo.
2. Siao nel caso *un oggetto con `N` sotto-dipartimenti* -- allora possiamo eseguire `N` chiamate ricorsive per ottenere la somma dei vari sotto-dipartimenti e combinarle per ottenere il risultato finale.

Il caso base è (1), è banale.

Il passo ricorsivo è (2). Un problema complesso può essere diviso in sotto-problemi composti da dipartimenti. Questi potrebbero essere ulteriormente divisi, ma prima o poi ci troveremo nel caso base (1).

L'algoritmo probabilmente è più intuibile leggendone il codice:


```js run
let company = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// The function to do the job
*!*
function sumSalaries(department) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else { // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}
*/!*

alert(sumSalaries(company)); // 7700
```

Il codice è più breve e facile da capire. Questo è il potere della ricorsione. Questa funzione continuerebbe a funzionare con qualsiasi livello di sotto-dipartimento.

Vediamo un diagramma delle chiamate:

![recursive salaries](recursive-salaries.svg)

Possiamo vedere il principio di base: per un oggetto `{...}` vengono effettuate le sotto-chiamate, mentre un array `[...]` fornisce direttamente un risultato.

Da notare che il codice utilizza alcune caratteristiche interessanti che abbiamo già studiato:

- Il metodo `arr.reduce` spiegato nel capitolo <info:array-methods> per ottenere la somma dell'array.
- Il ciclo `for(val of Object.values(obj))` per iterare sui valori di un oggetto: `Object.values` che ritorna un array che li contiene.


## Strutture ricorsive

Una struttura ricorsiva (definita ricorsivamente) è una struttura che replica una parte di se stessa.

Abbiamo appena visto un esempio di una possibile strutturazione di un'azienda.

Un *dipartimento* di un'azienda è:
- o un array di persone.
- oppure un oggetto con *dipartimenti*.

Per gli sviluppatori web ci sono degli esempi molto più comuni: i documenti HTML e XML.

Nei documenti HTML, un *tag HTML* può contenere una lista di:
- Testo.
- Commenti HTML.
- Altri *tag HTML* (che a loro volta possono contenere testo/commenti oppure altri tag).

Questa è una definizione ricorsiva.

Per capire meglio questo concetto, studieremo una struttura dati ricorsiva chiamata "Linked list", che in alcuni casi si rivela essere un'ottima sostituta agli array.

### Linked list

Immaginiamo di voler memorizzare una lista ordinata di oggetti.

La scelta naturale potrebbe ricadere su un array:

```js
let arr = [obj1, obj2, obj3];
```

...Ma sorge un problema con gli array. Le operazioni di "delete" e "insert" (rispettivamente "cancellazione" e "inserimento") sono costose. Ad esempio, `arr.unshift(obj)` deve rinumerare tutti gli elementi per creare spazio al nuovo `obj`, e se l'array fosse grande, potrebbe volerci del tempo. Lo stesso vale per `arr.shift()`.

Le uniche operazioni sulla struttura di un array che non richiedono una renumerazione di massa, sono quelle eseguite in coda all'array: `arr.push/pop`. Quindi un array può risultare piuttosto lento per certe operazioni.

In alternativa, se la situazione richiede rapidità nelle operazioni di inserimento/rimozione, possiamo optare per una struttura dati chiamata [linked list](https://en.wikipedia.org/wiki/Linked_list).

Gli *elementi della linked list* vengono definiti ricorsivamente come un oggetto con:
- `value`.
- `next` proprietà che contiene un riferimento al prossimo *elemento della linked list* oppure `null` se siamo alla fine.

Ad esempio:

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

La rappresentazione grafica della linked list:

![linked list](linked-list.svg)

Un codice alternativo per la creazione:

```js no-beautify
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
```

Qui possiamo vedere ancora più chiaramente che ci sono più oggetti, ognuno possiede gli attributi `value` e `next` che fa riferimento al vicino. La variabile `list` contiene il primo elemento della lista, segue il puntatore `next` tramite cui possiamo accedere a qualsiasi elemento.

La lista può essere divisa in più parti e ricomposta più avanti:

```js
let secondList = list.next.next;
list.next.next = null;
```

![linked list split](linked-list-split.svg)

Per ricomporre la lista:

```js
list.next.next = secondList;
```

E ovviamente possiamo inserire o rimuovere elementi in qualsiasi posizione.

Ad esempio, per inserire un elemento all'inizio, è sufficiente aggiornare la testa della lista:

```js
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

*!*
// prepend the new value to the list
list = { value: "new item", next: list };
*/!*
```

![linked list](linked-list-0.svg)

Per rimuovere un elemento al centro, modifichiamo il campo `next` di quello precedente:

```js
list.next = list.next.next;
```

![linked list](linked-list-remove-1.svg)

Abbiamo modificato `list.next` da `1` a `2`. Il valore `1` è ora escluso dalla lista. Se non è stato memorizzato in nessun'altra parte del codice, questo verrà automaticamente rimosso dalla memoria.

A differenza degli array, non c'è alcuna renumerazione di massa, possiamo riorganizzare gli elementi molto rapidamente.

Naturalmente, le liste non sono sempre la scelta migliore. Altrimenti verrebbero utilizzate solamente liste.

Il principale difetto è l'impossibilità di accedere direttamente ad un elemento tramite il numero. In un array è semplice: `arr[n]` è un riferimento diretto. Nelle liste è necessario partire dal primo elemento e scorrere `next` `N` volte per arrivare all'n-esimo elemento.

...Non sempre abbiamo bisogno di queste operazioni. Ad esempio, potremmo utilizzare una queue oppure una [deque](https://en.wikipedia.org/wiki/Double-ended_queue) -- una struttura dati ordinata che consente operazioni di inserimento/rimozione molto rapide sia in testa che in coda.

Talvolta vale la pena aggiungere un ulteriore variabile denominata `tail` per tenere traccia dell'ultimo elemento della lista (e aggiornarla ad ogni inserimento/rimozione in coda). Per grandi insiemi di elementi la differenza di velocità in confronto agli array è grande.

## Riepilogo

Terminologia:
- *Ricorsione* è un termine della programmazione che rappresenta una funzione che esegue "chiamate a se stessa". Queste funzioni possono essere utilizzate per una risoluzione più elegante di determinati problemi.

    Quando una funzione chiama se stessa, si indica questa azione come *passo ricorsivo*. La *base* della ricorsione sono degli argomenti che rendono la risoluzione del problema banale e immediata.

- Una struttura dati [definita ricorsivamente](https://en.wikipedia.org/wiki/Recursive_data_type) è una struttura che si definisce utilizzando se stessa.

    Ad esempio, la linked list può essere definita come una struttura dati che consiste di un valore e un puntatore al successivo nodo (oppure null).

    ```js
    list = { value, next -> list }
    ```

<<<<<<< HEAD
    Gli elementi HTML o la definizione di dipartimento sono definizioni ricorsive: ogni ramo può avere altri rami.
=======
    Trees like HTML elements tree or the department tree from this chapter are also naturally recursive: they have branches and every branch can have other branches.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    Si possono utilizzare funzioni ricorsive per attraversare questo tipo di oggetti, come abbiamo visto nell'esempio `sumSalary`.

Qualsiasi funzione ricorsiva può essere riscritta come iterativa. A volte è richiesta questa conversione, per ottimizzare le prestazioni. Ma molti problemi sono più semplici da risolvere tramite la ricorsione.
