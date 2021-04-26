function concat(arrays) {
  // somma delle lunghezze dei singoli array
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);

  // ogni array, lo copiamo in result
  // l'array successivo viene copiato subito dopo quello precedente
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
