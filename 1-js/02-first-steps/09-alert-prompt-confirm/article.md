# Interazioni: alert, prompt, confirm

Questa parte del tutorial ha l'intenzione di coprire JavaScript cosi per "com'è", senza i ritocchi specifici di ogni ambiente.

Ma continueremo comunque ad utilizzare un browser come ambiente di test. Quindi dovremmo conoscere almeno un paio di funzioni dell'interfaccia utente. In questo capitolo prenderemo familiarità con le funzioni browser `alert`, `prompt` e `confirm`.

## alert

Sintassi:

```js
alert(message);
```

Questo mostra un messaggio e mette in pausa l'esecuzione dello script finchè l'utente non preme il pulsante "OK".

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

<<<<<<< HEAD
Questo mostrerà una modal window con un messaggio testuale, un campo di input per l'utente ed il bottone OK/CANCEL.
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

`title`
: Il testo da mostrare all'utente.

`default`
: Un secondo parametro opzionale, che rappresenta il valore iniziale del campo input.

<<<<<<< HEAD
L'utente potrà scrivere nel campo input del prompt e successivamente premere OK. O in alternativa possono cancellare l'input premendo su CANCEL o la combinazione di tasti `key:Esc`.
=======
The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

La chiamata ad un `prompt` ritorna il testo del campo input o `null` se è stato premuto cancel.

Ad esempio:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // Tu hai 100 anni!
```

````warn header="IE: inserisce sempre un valore `default`"
Il secondo parametro è opzionale. Ma se non inseriamo niente, Internet Explorer inserirà il testo `"undefined"` nel prompt.

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

<<<<<<< HEAD
La funzione `confirm` mostra una modal window con un `domanda` e due bottoni: OK e CANCEL.
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

Il risultato è `true` se viene premuto OK altrimenti è `false`.

Ad esempio:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true se viene premuto OK
```

## Riepilogo

Abbiamo osservato 3 funzioni specifiche dei browser per interagire con l'utente:

`alert`
: mostra un messaggio.

`prompt`
<<<<<<< HEAD
Tutti questi metodi sono dei modal window: quindi interrompono l'esecuzione dello script e non consentono all'utente di interagire con il resto della pagina finchè il messaggio non viene rimosso.

Ci sono due limitazioni che sono condivise da tutti i metodi visti sopra:
=======
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

1. La posizione esatta della modal window viene decisa dal browser. Solitamente sta al centro.
2. Anche la grafica della modal window dipende dal browser. Non possiamo modificarla.

Questo è il prezzo da pagare per la semplicità. Ci sono altri modi di mostrare finestre carine, ricche di informazioni e interazioni con l'utente, ma se non ci interessa fare grandi cose, questi metodi possono essere utili.
