# Interazioni: alert, prompt, confirm

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Questa parte del tutorial ha l'intenzione di coprire JavaScript cosi per "com'è", senza i ritocchi specifici di ogni ambiente.

Ma continueremo comunque ad utilizzare un browser come ambiente di test. Quindi dovremmo conoscere almeno un paio di funzioni dell'interfaccia utente. In questo capitolo prenderemo familiarità con le funzioni browser `alert`, `prompt` e `confirm`.

## alert

Sintassi:

```js
alert(message);
```

Questo mostra un messaggio e mette in pausa l'esecuzione dello script finchè l'utente non preme il pulsante "OK".
=======
As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to presses "OK".
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Ad esempio:

```js run
alert("Hello");
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
La finestra che appare con il messaggio si chiama *modal window*. La parola "modal" significa che l'utente non potrà interagire con il resto della pagina, premere altri bottoni etc, fino a che non avrà interagito con la finestra. In questo esempio -- quando premerà "OK".
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6:1-js/02-first-steps/06-alert-prompt-confirm/article.md

## prompt

La funzione `prompt` accetta due argomenti:

```js no-beautify
result = prompt(title, [default]);
```

Questo mostrerà una modal window con un messaggio testuale, un campo di input per l'utente ed il bottone OK/CANCEL.

`title`
: Il testo da mostrare all'utente.

`default`
: Un secondo parametro opzionale, che rappresenta il valore iniziale del campo input.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
L'utente potrà scrivere nel campo input del prompt e successivamente premere OK. O in alternativa possono cancellare l'input premendo su CANCEL o la combinazione di tasti `key:Esc`.
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter as optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6:1-js/02-first-steps/06-alert-prompt-confirm/article.md

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

La funzione `confirm` mostra una modal window con un `domanda` e due bottoni: OK e CANCEL.

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
Tutti questi metodi sono dei modal window: quindi interrompono l'esecuzione dello script e non consentono all'utente di interagire con il resto della pagina finchè il messaggio non viene rimosso.

Ci sono due limitazioni che sono condivise da tutti i metodi visti sopra:

1. La posizione esatta della modal window viene decisa dal browser. Solitamente sta al centro.
2. Anche la grafica della modal window dipende dal browser. Non possiamo modificarla.

Questo è il prezzo da pagare per la semplicità. Ci sono altri modi di mostrare finestre carine, ricche di informazioni e interazioni con l'utente, ma se non ci interessa fare grandi cose, questi metodi possono essere utili.
