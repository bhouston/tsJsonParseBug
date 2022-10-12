import * as rawGraphJSON from './graph.json'; 

export type ValueJSON = { value: string | boolean | number };

export type LinkJSON = { link: { nodeId: string; socket: string } };

export type ParametersJSON = { [key: string]: ValueJSON | LinkJSON | undefined };

export type NodeJSON = {
    type: string;
    id: string;
    parameters?: ParametersJSON;
};

export type GraphJSON = {
   nodes: NodeJSON[];
};

// this will no longer throw any errors, and doesn't cast anything which would mask problems in the json file
const graph: GraphJSON = rawGraphJSON;
console.log( 'graph', graph);
