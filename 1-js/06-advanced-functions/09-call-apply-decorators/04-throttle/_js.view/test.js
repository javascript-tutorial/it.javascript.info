describe("throttle(f, 1000)", function () {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function () {
    this.clock = sinon.useFakeTimers();
    f1000 = throttle(f, 1000);
  });

  it("la prima chiamata viene eseguita ora", function () {
    f1000(1); // runs now
    assert.equal(log, "1");
  });

  it("quindi tutte le chiamate vengono ignorate fino allo scadere di 1000ms dall'ultima", function () {
    f1000(2); // (throttling - meno di 1000ms dall'ultima esecuzione)
    f1000(3); // (throttling - meno di 1000ms dall'ultima esecuzione)
    // dopo 1000 ms la chiamata f(3) viene pianificata

    assert.equal(log, "1"); // in questo momento solo la prima chiamata è stata fatta

    this.clock.tick(1000); // dopo 1000ms...
    assert.equal(log, "13"); // log==13, viene fatta la chiamata a f1000(3)
  });

  it("la terza chiamata attende 1000ms dopo la seconda", function () {
    this.clock.tick(100);
    f1000(4); // (throttling - meno di 1000ms dall'ultima esecuzione)
    this.clock.tick(100);
    f1000(5); // (throttling - meno di 1000ms dall'ultima esecuzione)
    this.clock.tick(700);
    f1000(6); // (throttling - meno di 1000ms dall'ultima esecuzione)

    this.clock.tick(100); // ora 100 + 100 + 700 + 100 = 1000ms sono passati

    assert.equal(log, "136"); // l'ultima chiamata f(6)
  });

  after(function () {
    this.clock.restore();
  });

});

describe('throttle', () => {

  it('esegue un unico inoltro di chiamata', done => {
    let log = '';
    const f = str => log += str;
    const f10 = throttle(f, 10);
    f10('una volta');

    setTimeout(() => {
      assert.equal(log, 'una volta');
      done();
    }, 20);
  });

});
