const sigmoid = value => 1 / (1 + Math.exp(-Math.max(-18, Math.min(18, value))));

const predictRaw = (model, sample) => model.w0 + model.w1 * sample.x + model.w2 * sample.y;
const predictProbability = (model, sample) => sigmoid(predictRaw(model, sample));

const trainEpoch = (model, dataset, learningRate) => {
  let gradW0 = 0;
  let gradW1 = 0;
  let gradW2 = 0;

  dataset.forEach(sample => {
    const prediction = predictProbability(model, sample);
    const error = prediction - sample.label;
    const factor = 2 * error * prediction * (1 - prediction);

    gradW0 += factor;
    gradW1 += factor * sample.x;
    gradW2 += factor * sample.y;
  });

  const n = dataset.length;
  return {
    w0: model.w0 - learningRate * (gradW0 / n),
    w1: model.w1 - learningRate * (gradW1 / n),
    w2: model.w2 - learningRate * (gradW2 / n),
  };
};
