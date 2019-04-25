# Interazioni: alert, prompt, confirm

Questa parte del tutorial ha l'intenzione di coprire JavaScript cosi per "com'è", senza i ritocchi specifici di ogni ambiente.

<<<<<<< HEAD
Ma continueremo comunque ad utilizzare un browser come ambiente di test. Quindi dovremmo conoscere almeno un paio di funzioni dell'interfaccia utente. In questo capitolo prenderemo familiarità con le funzioni browser `alert`, `prompt` e `confirm`.
=======
But we'll still be using the browser as our demo environment, so we should know at least a few of its user-interface functions. In this chapter, we'll get familiar with the browser functions `alert`, `prompt` and `confirm`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## alert

Sintassi:

```js
alert(message);
```

<<<<<<< HEAD
Questo mostra un messaggio e mette in pausa l'esecuzione dello script finchè l'utente non preme il pulsante "OK".
=======
This shows a message and pauses script execution until the user presses "OK".
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
alert("Hello");
```

<<<<<<< HEAD
La finestra che appare con il messaggio si chiama *modal window*. La parola "modal" significa che l'utente non potrà interagire con il resto della pagina, premere altri bottoni etc, fino a che non avrà interagito con la finestra. In questo esempio -- quando premerà "OK".

## prompt

La funzione `prompt` accetta due argomenti:
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc. until they have dealt with the window. In this case -- until they press "OK".

## prompt

The function `prompt` accepts two arguments:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD
Questo mostrerà una modal window con un messaggio testuale, un campo di input per l'utente ed il bottone OK/CANCEL.

`title`
: Il testo da mostrare all'utente.
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/CANCEL.

`title`
: The text to show the visitor.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

`default`
: Un secondo parametro opzionale, che rappresenta il valore iniziale del campo input.

<<<<<<< HEAD
L'utente potrà scrivere nel campo input del prompt e successivamente premere OK. O in alternativa possono cancellare l'input premendo su CANCEL o la combinazione di tasti `key:Esc`.

La chiamata ad un `prompt` ritorna il testo del campo input o `null` se è stato premuto cancel.
=======
The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing CANCEL or hitting the `key:Esc` key.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ad esempio:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

<<<<<<< HEAD
````warn header="IE: inserisce sempre un valore `default`"
Il secondo parametro è opzionale. Ma se non inseriamo niente, Internet Explorer inserirà il testo `"undefined"` nel prompt.

Provate ad eseguire il seguente codice su Internet Explorer:
=======
````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let test = prompt("Test");
```

<<<<<<< HEAD
Quindi, per farlo funzionare ugualmente su IE, è consigliato fornire sempre il secondo argomento:
=======
So, for prompts to look good in IE, we recommend always providing the second argument:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

```js run
let test = prompt("Test", ''); // <-- for IE
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
The function `confirm` shows a modal window with a `question` and two buttons: OK and CANCEL.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Il risultato è `true` se viene premuto OK altrimenti è `false`.

Ad esempio:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```

## Riepilogo

<<<<<<< HEAD
Abbiamo osservato 3 funzioni specifiche dei browser per interagire con l'utente:
=======
We covered 3 browser-specific functions to interact with visitors:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

`alert`
: mostra un messaggio.

`prompt`
<<<<<<< HEAD
: mostra un messaggio chiedendo all'utente un input testuale. Ritorna il testo o, se viene premuto CANCEL o il tasto `key:Esc`, tutti i browser ritornano `null`.
=======
: shows a message asking the user to input text. It returns the text or, if CANCEL or `key:Esc` is clicked, `null`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

`confirm`
: mostra un messaggio e aspetta che l'utente prema "OK" o "CANCEL". Ritorna `true` se viene premuto OK e `false` per CANCEL/`key:Esc`.

<<<<<<< HEAD
Tutti questi metodi sono dei modal window: quindi interrompono l'esecuzione dello script e non consentono all'utente di interagire con il resto della pagina finchè il messaggio non viene rimosso:
=======
All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Ci sono due limitazioni che sono condivise da tutti i metodi visti sopra:

<<<<<<< HEAD
1. La posizione esatta della modal window viene decisa dal browser. Solitamente sta al centro.
2. Anche la grafica della modal window dipende dal browser. Non possiamo modificarla.
=======
1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

Questo è il prezzo da pagare per la semplicità. Ci sono altri modi di mostrare finestre carine, ricche di informazioni e interazioni con l'utente, ma se non ci interessa fare grandi cose, questi metodi possono essere utili.
