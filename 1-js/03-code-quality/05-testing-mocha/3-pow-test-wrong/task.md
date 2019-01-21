importance: 5

---

# Cosa c'è di sbagliato in questo test?

Cosa c'è di sbagliato nel test di `pow`?

```js
it("Raises x to the power n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S. Sintatticamente il test corretto ed esegue senza errori.
