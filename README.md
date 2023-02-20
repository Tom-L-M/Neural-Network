# Neural-Network-JS

This is a simple implementation of a neural network in JavaScript. 
Implements 3 types of Neurons: Sigmoid, SoftPlus, and Hyperbolic Tangent (TANH).

The `./src/datasets.js` file includes some very very simple datasets for training a 
sigmoid-based neural network for predicting logic gates.

Usage:

```
const { SigmoidNeuralNetwork } = require('./network');
const { XORdataset } = require('./datasets');

let N = new SigmoidNeuralNetwork(2, 3, 1);
    N.train(XORdataset, 10000);

    console.log(N.activate([0,0])); // ~0
    console.log(N.activate([0,1])); // ~1
    console.log(N.activate([1,0])); // ~1
    console.log(N.activate([1,1])); // ~0
```
