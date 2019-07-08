Il test dimostra una delle tentazion che uno sviluppatore potrebbe incontrare mentre scrive dei test.

Quello che abbiamo qui sono 3 test, ma sono stati scritti come una singola funzione con 3 assunzioni.

Qualche volta può risultare più semplice scrivere in questo modo, ma in caso di errori, risulta molto meno ovvio cosa è andato storto.

<<<<<<< HEAD
Se si genera un errore all'interno di un flusso d'esecuzione complesso, dovremmo controllare ogni dato. Saremmo costretti a *debuggare il test*.
=======
If an error happens in the middle of a complex execution flow, then we'll have to figure out the data at that point. We'll actually have to *debug the test*.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

Una scelta migliore potrebbe essere di rompere i test in più `it` scrivendo chiaramente gli inpute gli output.

Come qui:
```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Rimpiazziamo quindi il singolo `it` con `describe` e creiamo un gruppo di blocchi `it`. Ora se qualche test fallisce saremmo in grado di vedere chiaramente quale.

Possiamo anche isolare un singolo test ed eseguirlo in solitaria scrivendo `it.only` piuttosto di `it`:


```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha will run only this block
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
