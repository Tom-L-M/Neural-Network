const { vID } = require('cellium').string;

class Neuron {
    constructor (bias) {
        this.id = vID();
        this.bias = bias == undefined ? Neuron.RandomBias() : bias;
        this.incoming = { targets: {}, weights: {} }
        this.outgoing = { targets: {}, weights: {} }
        this.outputDelta; this.outputAlpha; 
        this.error; this._error; 

        this.activationFunctionAlpha;
        this.activationFunctionDelta = function (x) {
            return (this.activationFunctionAlpha(x) * 
                (1 - this.activationFunctionAlpha(x))); 
        }
    }
    static RandomBias = () => Math.random() * 2 - 1;
    connect = function (neuron, weight) {
        this.outgoing.targets[neuron.id] = neuron;
        neuron.incoming.targets[this.id] = this;
        this.outgoing.weights[neuron.id] = 
            neuron.incoming.weights[this.id] = 
                weight == undefined ? Neuron.RandomBias() : weight;
    }
    activate = function (input) {
        const self = this;
        
        if (input != undefined) {
            this.outputDelta = 1; 
            this.outputAlpha = input; 
        } else {
            const sum = Object.keys(this.incoming.targets).reduce(function(total, target, index) {
                return total += self.incoming.targets[target].outputAlpha * self.incoming.weights[target];
            }, this.bias);
            
            this.outputDelta = this.activationFunctionDelta(sum);
            this.outputAlpha = this.activationFunctionAlpha(sum); 
        }

        return this.outputAlpha;
    }
    propagate = function(target, rate = 0.3) {
        const self = this;
        
        const sum = target == undefined ? Object.keys(this.outgoing.targets).reduce(function(total, target, index) {
            self.outgoing.targets[target].incoming.weights[self.id] = 
                self.outgoing.weights[target] -= 
                    rate * 
                    self.outgoing.targets[target].error * 
                    self.outputAlpha;
            
            return total += 
                self.outgoing.targets[target].error * 
                self.outgoing.weights[target];
        }, 0) : this.outputAlpha - target;
        
        this.error = sum * this.outputDelta;
        this.bias -= rate * this.error;
        return this.error;
    }
}

class SigmoidNeuron extends Neuron {
    constructor (bias) {
        super(bias);
        this.activationFunctionAlpha = function (x) { return (1 / (1 + Math.exp(-x))); }
        // Sigmoid activation function
    }
}

class SoftplusNeuron extends Neuron {
    constructor (bias) {
        super(bias);
        this.activationFunctionAlpha = function (x) { return Math.log(1 + Math.exp(x)); }
        // Softplus activation function    
    }
}

class HyperbolicTangentNeuron extends Neuron {
    constructor (bias) {
        super(bias);
        this.activationFunctionAlpha = function (x) { return Math.tanh(x); }
        // Hyperbolic Tangent activation function
    }
}

module.exports = { 
    SigmoidNeuron, 
    SoftplusNeuron, 
    HyperbolicTangentNeuron 
};

// LOGIC:
//  O número de neurons da inputLayer é igual ao número de itens no input. 
//   Então um input de [x,y,z] exige 3 neurons de input.
//  O número de neurons da output layer é igual ao número de itens no output do conjunto de treino.
//   Então um output de [x,y], exige 2 neurons de output.
//  Quanto maior o número de neurons da layer do meio, maior a precisão.
//  Quanto maior o número de vezes iterations de treino, maior a precisão.

// Using 'predict' outputs the proper result. But it is possible to use 'activate', to output the non-aproximated value, to keep an eye on the precision.