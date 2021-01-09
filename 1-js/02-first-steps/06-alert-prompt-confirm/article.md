# Interazioni: alert, prompt, confirm

Questa parte del tutorial ha l'intenzione di coprire JavaScript cosi per "com'è", senza le caratteristiche specifiche di ogni ambiente.

Ma continueremo comunque ad utilizzare il browser come ambiente di test. Per farlo, abbiamo bisogno di conoscere un paio di funzioni utili per l'interazione con l'interfaccia utente. In questo capitolo prenderemo familiarità con le funzioni browser `alert`, `prompt` e `confirm`.

## alert

Sintassi:

```js
alert(message);
```

Questo mostra un messaggio e mette in pausa l'esecuzione dello script finché l'utente non preme il pulsante "OK".

Ad esempio:

```js run
alert("Hello");
```

La finestra che appare con il messaggio si chiama *modal window*. La parola "modal" significa che l'utente non potrà interagire con il resto della pagina, premere altri bottoni etc, fino a che non avrà interagito con la finestra. In questo esempio -- quando premerà "OK".

## prompt

La funzione `prompt` accetta due argomenti:

```js no-beautify
result = prompt(title, [default]);
```

Questo mostrerà una modal window con un messaggio testuale, un campo di input ed il bottone OK/CANCEL.

`title`
: Il testo da mostrare all'utente.

`default`
: Un secondo parametro opzionale, che rappresenta il valore iniziale del campo input.

```smart header="Le parentesi quadre nella forma `[...]`"
Le parentesi quadre intorno a `default` indicano che il parametro è opzionale, non richiesto.
```

L'utente potrà scrivere nel campo input del prompt e successivamente premere OK. O in alternativa potrà cancellare l'input premendo su CANCEL o la combinazione di tasti `key:Esc`.

La chiamata ad un `prompt` ritorna il testo del campo input o `null` se è stato premuto cancel.

Ad esempio:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // Tu hai 100 anni!
```

````warn header="IE: inserisce sempre un valore di `default`"
Il secondo parametro è opzionale. Ma se non inseriamo nulla, Internet Explorer inserirà il testo `"undefined"` nel prompt.

Provate ad eseguire il seguente codice su Internet Explorer:

```js run
let test = prompt("Test");
```

Quindi, per farlo funzionare ugualmente su IE, è consigliato fornire sempre il secondo argomento:

```js run
let test = prompt("Test", ''); // <-- per IE
```
````

## confirm

La sintassi:

```js
result = confirm(question);
```

La funzione `confirm` mostra una modal window con un `domanda` e due bottoni: OK e CANCEL.

Il risultato è `true` se viene premuto OK altrimenti è `false`.

Ad esempio:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true se viene premuto OK
```

## Riepilogo

Abbiamo studiato 3 funzioni specifiche dei browser per interagire con l'utente:

`alert`
: mostra un messaggio.

`prompt`
: mostra un messaggio che richiede all'utente di inserire un input. Ritorna il testo inserito, o  in alternativa, se viene premuto Cancel o il tasto `key:Esc`, ritorna `null`.

`confirm`
: mostra un messaggio e attende che l'utente prema "OK" o "Cancel". Ritora `true` nel caso in cui venga premuto "OK", `false` altrimenti.

Tutti questi metodi sono dei modal window: quindi interrompono l'esecuzione dello script e non consentono all'utente di interagire con il resto della pagina finché la modal non viene chiusa.

Ci sono due limitazioni che sono condivise da tutti i metodi visti sopra:

1. La posizione esatta della modal window viene decisa dal browser. Solitamente sta al centro.
2. Anche la grafica della modal window dipende dal browser. Non possiamo modificarla.

Questo è il prezzo da pagare per la semplicità. Ci sono altri modi per mostrare finestre di tipo modal più eleganti, con più informazioni o con maggiori possibilità di interazione con l'utente, ma se non ci interessa fare grandi cose, questi metodi possono essere utili.
