const sigmoid = v => 1 / (1 + Math.exp(-Math.max(-18, Math.min(18, v))));

// Rede: entrada(2) → oculta(4 neurônios sigmoid) → saída(1 sigmoid)
const forward = (w, x, y) => {
  const h = w.hb.map((b, j) => sigmoid(b + w.hx[j]*x + w.hy[j]*y));
  const z = w.ob + h.reduce((s, hj, j) => s + w.ow[j]*hj, 0);
  return sigmoid(z);
};

const trainEpoch = (w, dataset, lr) => {
  const g = { hb:[0,0,0,0], hx:[0,0,0,0], hy:[0,0,0,0], ob:0, ow:[0,0,0,0] };

  dataset.forEach(({ x, y, label }) => {
    const h = w.hb.map((b, j) => sigmoid(b + w.hx[j]*x + w.hy[j]*y));
    const out = sigmoid(w.ob + h.reduce((s,hj,j) => s + w.ow[j]*hj, 0));

    const dOut = 2*(out-label)*out*(1-out);
    g.ob += dOut;
    h.forEach((hj, j) => {
      g.ow[j] += dOut * hj;
      const dh = dOut * w.ow[j] * hj * (1-hj);
      g.hb[j] += dh; g.hx[j] += dh*x; g.hy[j] += dh*y;
    });
  });

  const n = dataset.length;
  return {
    hb: w.hb.map((v,j) => v - lr*g.hb[j]/n),
    hx: w.hx.map((v,j) => v - lr*g.hx[j]/n),
    hy: w.hy.map((v,j) => v - lr*g.hy[j]/n),
    ob: w.ob - lr*g.ob/n,
    ow: w.ow.map((v,j) => v - lr*g.ow[j]/n),
  };
};
