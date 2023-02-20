const data = {};

data._datasetmodel = [
    { in: [], out: [] }
]

data.ANDdataset = [ // for AND logic gate. Returns true only if both inputs are true;
    { in: [0,0], out: [0] },
    { in: [0,1], out: [0] },
    { in: [1,0], out: [0] },
    { in: [1,1], out: [1] }
];

data.ORdataset = [ // for OR logic gate. Returns true if one or both inputs are true;
    { in: [0,0], out: [0] },
    { in: [0,1], out: [1] },
    { in: [1,0], out: [1] },
    { in: [1,1], out: [1] }
];

data.XORdataset = [ // for XOR logic gate. Returns true only if one of the inputs is true;
    { in: [0,0], out: [0] },
    { in: [0,1], out: [1] },
    { in: [1,0], out: [1] },
    { in: [1,1], out: [0] }
];

data.TRIdataset = [ // for custom logic gate. Returns true only if at least two inputs are true;
    { in: [0,0,0], out: [0] },
    { in: [0,0,1], out: [0] },
    { in: [0,1,0], out: [0] },
    { in: [0,1,1], out: [1] },
    { in: [1,0,0], out: [0] },
    { in: [1,0,1], out: [1] },
    { in: [1,1,0], out: [1] },
    { in: [1,1,1], out: [1] }
];



module.exports = data;