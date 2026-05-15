import * as ort from 'onnxruntime-web';

const session = await ort.InferenceSession.create('model.onnx', {
  executionProviders: ['webgpu']
});

const results = await session.run({ input: tensor });
