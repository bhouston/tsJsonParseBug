import * as rawGraphJSON from './graph.json'; 

export type ValueJSON = string | boolean | number;

export type LinkJSON = { nodeId: string; socket: string };

export type ParameterJSON = {
    value?: ValueJSON;
    link?: LinkJSON;
};

export type ParametersJSON = {
    [key: string]: ParameterJSON;
};

export type NodeJSON = {
    type: string;
    id: string;
    parameters?: ParametersJSON;
};

export type GraphJSON = {
   nodes: NodeJSON[];
};

// this fails to compile
const graph: GraphJSON = rawGraphJSON;
console.log( 'graph', graph);

// this works, but I suspect it doesn't actually do any type checking here.
const graph2 = rawGraphJSON as GraphJSON;
console.log( 'graph2', graph);
