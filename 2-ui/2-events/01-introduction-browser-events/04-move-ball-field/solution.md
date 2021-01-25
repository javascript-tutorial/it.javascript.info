
Per prima cosa dobbiamo scegliere un metodo per posizionare la palla.

Non possiamo usare `position:fixed` per questo, perché lo scorrimento della pagina sposterebbe la palla dal campo.

Dobbiamo quindi usare `position:absolute` per la palla, e per rendere il posizionamento stabile, posizionare anche `field` stesso.
(N.d.T.: Per `posizionare` intendiamo l'azione di impostare, per l'elemento, la proprietà CSS "position" in modo differente dal normale flusso della pagina ("static" se non diversamente specificato). 

In questo modo a palla verrà posizionata in relazione al campo:

```css
#field {
  width: 200px;
  height: 150px;
  position: relative;
}

#ball {
  position: absolute;
  left: 0; /* relativo all'antenato più vicino (field) */
  top: 0;
  transition: 1s all; /* Una animazione CSS impostata su left/top fa volare la palla */
}
```

Il prossimo passo sarà quello di assegnare correttamente `ball.style.left/top`, le cui coordinate saranno relazionate alla dimensione del campo.

Osserviamo la figura:

![](move-ball-coords.svg)

`event.clientX/clientY` sono le coordinate del click relative alla window (N.d.T. l'oggetto window).

Per ottenere le coordinate `left` relative al campo, dobbiamo sottrarre il valore del limite sinistro del campo e la sua larghezza:

```js
let left = event.clientX - fieldCoords.left - field.clientLeft;
```

Normalmente, `ball.style.left` significa "limite destro dell'elemento" (la palla). Ma se assegnassimo questo valore di `left`, sotto il puntatore si verrebbe a posizionare, appunto, il limite destro della palla, e non il suo centro.

Per poter centrare la palla, dobbiamo spostarla tenendo conto della metà della sua altezza e metà della sua larghezza.

Quindi il `left` definitivo sarebbe:

```js
let left = event.clientX - fieldCoords.left - field.clientLeft - ball.offsetWidth/2;
```

Le coordinate in verticale vengono calcolate usando la stessa logica. 

Nota bene che larghezza e altezza della palla devono essere note nel momento in cui accediamo a  `ball.offsetWidth`. Dovrebbero essere specificate nell'HTML o nel CSS.
