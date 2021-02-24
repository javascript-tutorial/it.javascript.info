# Form: eventi e metodi di submit

L'evento `submit` si scatena quando il form viene inviato, e solitamente viene usato per validare il form prima dell'invio al server o per annullare l'invio e elaborarlo con JavaScript.

Il metodo `form.submit()` ci permette di iniziare l'invio del form da JavaScript. Possiamo usarlo per creare ed inviare i nostri form al server dinamicamente.

Andiamo più nel dettaglio.

## Evento: submit

Ci sono due modi per inviare un form:

1. Il primo -- cliccare `<input type="submit">` o `<input type="image">`.
2. Il secondo -- premere `key:Enter` su un campo di input.

Entrambe le azioni portano all'evento `submit` del form. Il gestore può controllare i dati, ed in caso di errori, può mostrarli e chiamare `event.preventDefault()`, ed a quel punto il form non viene inviato al server.

Nel form seguente:
1. Andare nel campo di testo e premere `key:Enter`.
2. Cliccare `<input type="submit">`.

Entrambe le azioni mostrano un `alert` ed il form non viene inviato da nessuna parte a causa di `return false`:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  Primo: Entrare nel campo di testo <input type="text" value="text"><br>
  Secondo: Clicare "submit": <input type="submit" value="Submit">
</form>
```

````smart header="Relation between `submit` and `click`"
Quando un form viene inviato usando `key:Enter` su un campo di input, un evento `click` viene scaturito sull'elemento `<input type="submit">`.

Ciò è piuttosto divertente, dal momento che non c'è stato nessun click.

Ecco la demo:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Porre il focus qui e premere Invio">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## Metodo: submit

Per eseguire l'invio (submit)  di un form sul server manualmente, possiamo chiamare `form.submit()`.

In questo caso l'evento di `submit` non viene generato. Si assume che il programmatore chiamando `form.submit()`, abbia previsto che nello script siano state considerate tutte le dovute elaborazioni.

Talvolta viene usato per creare ed inviare manualmente un form, come in questo esempio:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// il form deve essere nel documento per poterlo inviare
document.body.append(form);

form.submit();
```
