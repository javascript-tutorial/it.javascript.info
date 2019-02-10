importance: 4

---

# Perchè 6.35.toFixed(1) == 6.3?

Come da documentazione `Math.round` e `toFixed` arrotondano al numero più vicino: per difetto con decimali da `0..4`, per eccesso con decimali da `5..9`.

Ad esempio:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

Un altro esempio simile, perchè `6.35` viene arrotondato a `6.3`, e non a `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

Come possiamo arrotondare correttamente `6.35`?

