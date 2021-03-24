importance: 5

---

# Pagina senza fine

Create una pagina senza fine. Quando un visitatore scrolla fino alla fine della pagina, la data attuale deve essere accodata (cosicché il visitatore possa scrollare ancora).

Come in questo esempio:

[iframe src="solution" height=200]

È importante notare due caratteristeiche dello scroll:

1. **Lo scroll è "elastico".** Possiamo scrollare un po' oltre rispetto all'inizio o alla fine del documento in alcuni browser o dispositivi (verrà mostrato uno spazio vuoto, e subito dopo il documento "rimbalzerà indietro" in posizione normale).
2. **Lo scroll è impreciso.** Quando scrolliamo alla fine della pagina, potrebbe di fatto andare da 0 a 50px fuori dal reale bordo inferiore del documento.

Quindi, "scrollare fino alla fine" dovrebbe significare che il visitatore è a non più di 100px dalla fine del documento.

P.S. Nei casi reali, mostreremmo "più informazioni" o "più cose".
