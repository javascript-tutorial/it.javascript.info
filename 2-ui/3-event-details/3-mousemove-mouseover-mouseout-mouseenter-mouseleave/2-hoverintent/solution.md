
L'algoritmo è semplice:
1. Impostare dei gestori `onmouseover/out` sull'elemento. Qui si possono anche usare `onmouseenter/leave`,  ma sono meno universali, e non funzionerebbero se introducessimo l'uso della delagation.
2. Quando il puntatore è entrato dentro l'elemento, si comincia a misurare la velocità al `mousemove`.
3. Se la velocità è lenta, eseguire `over`.
4. Quando si esce fuori dall'elemento, ed è stato eseguito `over`, eseguire `out`.

Ma come misurare la velocità?

La prima strategia potrebbe essere: eseguire una funzione ogni `100ms` e misurare la distanza tra le vecchie e nuove coordinate. Se fosse piccola, anche la velocità lo sarebbe.

Sfortunatamente, non c'è modo di ricavare "le coordinate attuali del mouse" in JavaScript. Non esistono funzioni come `getCurrentMouseCoordinates()`.

L'unico modo è di mettersi in ascolto sugli eventi del mouse, come `mousemove`, e prendere le coordinate dall'oggetto evento.

Quindi impostiamo un gestore su `mousemove` per tenere traccia delle coordinate e memorizzarle. Quindi confrontarle una volta ogni `100ms`.

P.S.: Nota bene: i test della soluzione fanno uso di `dispatchEvent` per vedere se il tooltip funziona bene.
