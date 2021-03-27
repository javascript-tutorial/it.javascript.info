
# Elemento live timer

Abbiamo già un elemento `<time-formatted>` per mostrare un orario formattato.

Create un elemento `<live-timer>` per mostrare l'orario corrente:
1. Internamente dovrebbe usare `<time-formatted>`, senza duplicare la sua funzionalità.
2. Un tick (aggiornamento) ogni secondo.
3. Per ogni tick, deve essere generato un evento personalizzato chiamato `tick`, con la data corrente dentro `event.detail` (guardare il capitolo <info:dispatch-events>).

Uso:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

Demo:

[iframe src="solution" height=40]
