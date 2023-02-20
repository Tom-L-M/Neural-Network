const { filledList } = require('cellium').array;
const Neuron = require('./neuron');

class NeuralNetwork {
    constructor (inputLayerSize, hiddenLayerSize, outputLayerSize, SelectedNeuron) {
        this.inputs = filledList(inputLayerSize, () => new SelectedNeuron());
        this.hiddens = filledList(hiddenLayerSize, () => new SelectedNeuron());
        this.outputs = filledList(outputLayerSize, () => new SelectedNeuron());
        for (let i = 0; i < this.inputs.length; i++) {
            for (let j = 0; j < this.hiddens.length; j++) {
                this.inputs[i].connect(this.hiddens[j]);
            }
        }
        for (let i = 0; i < this.hiddens.length; i++) {
            for (let j = 0; j < this.outputs.length; j++) {
                this.hiddens[i].connect(this.outputs[j]);
            }
        }
    }
    activate (input) {
        this.inputs.forEach((neuron, i) => neuron.activate(input[i]));
        this.hiddens.forEach(neuron => neuron.activate());
        return this.outputs.map(neuron => neuron.activate());
    }
    propagate (target) {
        this.outputs.forEach((neuron, t) => neuron.propagate(target[t]));
        this.hiddens.forEach(neuron => neuron.propagate());
        return this.inputs.forEach(neuron => neuron.propagate());
    }
    train (dataset, iterations = 1) {
        while (iterations > 0) {
            dataset.map(datum => {
                this.activate(datum.in);
                this.propagate(datum.out);
            });
            iterations--;
        }
    }
}

class SigmoidNeuralNetwork extends NeuralNetwork {
    constructor (inputLayerSize, hiddenLayerSize, outputLayerSize) {
        super(inputLayerSize, hiddenLayerSize, outputLayerSize, Neuron.SigmoidNeuron);
    }
}

class SoftplusNeuralNetwork extends NeuralNetwork {
    constructor (inputLayerSize, hiddenLayerSize, outputLayerSize) {
        super(inputLayerSize, hiddenLayerSize, outputLayerSize, Neuron.SoftplusNeuron);
    }
}

class HyperbolicTangentNeuralNetwork extends NeuralNetwork {
    constructor (inputLayerSize, hiddenLayerSize, outputLayerSize) {
        super(inputLayerSize, hiddenLayerSize, outputLayerSize, Neuron.HyperbolicTangentNeuron);
    }
}

module.exports = { 
    SigmoidNeuralNetwork, 
    SoftplusNeuralNetwork, 
    HyperbolicTangentNeuralNetwork 
};