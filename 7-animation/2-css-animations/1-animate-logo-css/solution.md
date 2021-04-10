
Qui vedete il CSS per animare sia `width` che `height`:
```css
/* classe originale */

#flyjet {
  transition: all 3s;
}

/* JS aggiunge il ridimensionamento */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Notate che `transitionend` si innesca due volte, una per ogni proprietà. Quindi senza definire un controllo adeguato, il messaggio verrà mostrato due volte.
