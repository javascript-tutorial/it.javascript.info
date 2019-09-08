

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

I motivi:

1. Ovviamente vale true.
2. Confronto lessico-grafico, quindi false.
3. Nuovamente, confronto lessico-grafico, il primo carattere di `"2"` è maggiore del primo carattere `"1"`.
4. I valori `null` e `undefined` sono uguali solo tra di loro.
5. L'uguaglianza stretta è stretta. I tipi differenti dei due operandi portano ad un risultato false.
6. Vedi `(4)`.
7. Uguaglianza stretta di tipi differenti.
