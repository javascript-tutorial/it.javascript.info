importance: 5

---

# Trovate le coordinate del campo relative alla finestra

Nell'iframe sotto potete osservare un documento con un "campo" verde.

Usate JavaScript per trovare le coordinate relative alla finestra degli angoli indicati dalle frecce.

Per comodità è stata implementata una semplice funzionalità nel documento: un click in un punto qualsiasi ne mostra le coordinate.

[iframe border=1 height=360 src="source" link edit]

Il vostro codice dovrebbe usare il DOM per ottenere le coordinate relative alla finestra di:

1. angolo esterno superiore sinistro (è semplice).
2. angolo esterno inferiore destro (semplice anche questo).
3. angolo interno superiore sinistro (un po' più difficile).
4. angolo interno inferiore destro (esistono vari modi, sceglietene uno).

Le coordinate che calcolate dovrebbero essere le stesse di quelle mostrate al click del mouse.

P.S. Il codice dovrebbe funzionare anche se l'elemento ha un'altra dimensione o un altro bordo, non deve dipendere da valori fissi.
