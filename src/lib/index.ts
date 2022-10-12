import * as rawGraphJSON from './graph.json';

type NodeParameterTypes = string | number | boolean;

type NodeParameters = Record<string, NodeParameterTypes> | undefined;

//*****************************************/
// Simple solution, no run-time checks
//*****************************************/

interface importedJSON {
    nodes: {
        id: string;
        type: string;
        parameters?: Record<string, {
            value: NodeParameterTypes
        } | {
            nodeId: string;
            socket: string;
        } |
            // I would assume this is necessary due to the way the 
            // JSON import derives the types 
            undefined
        >
    }[]
};

const importedGraph: importedJSON = rawGraphJSON;
console.log(importedGraph);


//***********************************************************/
// More complicated with compile-time checks & intellisense
//***********************************************************/
type ToNodeType<
    TTypeName extends string,
    TParameters extends NodeParameters = undefined
> = {
    id: string;
    type: TTypeName;
    parameters: TParameters;
}

type ToJSONType<U extends ToNodeType<string, NodeParameters>> =
    U extends ToNodeType<infer TTypeName, infer TParameters>
    ? TParameters extends undefined
    ? {
        id: string,
        type: TTypeName,
    }
    : {
        id: string,
        type: TTypeName,
        parameters: (
            TParameters extends undefined
            ? undefined
            : {
                [K in keyof TParameters]:
                (
                    {
                        value: TParameters[K]
                    } | {
                        nodeId: string;
                        socket: string;
                    } |
                    (
                        // to allow skipping undefined values
                        TParameters[K] extends undefined
                        ? undefined
                        : never
                    )
                )
            }
        )
    }
    : never;

// define node-type parameters here, optional parameters supported

type NodeType =
    ToNodeType<"lifecycle/start"> |
    ToNodeType<"action/log", { text: string }> |
    ToNodeType<"flow/forLoop", { startIndex?: number, endIndex: number }>;


interface JSONNodes {
    nodes: ToJSONType<NodeType>[];
}

// This has full compile-time validation & Intellisense. 
// (It even supports optional types.)
const compileTimeErrorGraph: JSONNodes = {
    "nodes": [
        {
            "type": "lifecycle/start",
            "id": "0"
        },
        {
            "type": "action/log",
            "id": "1",
            "parameters": {
                "text": {
                    "value": "Starting For Loop..."
                }
            }
        },
        {
            "type": "flow/forLoop",
            "id": "2",
            "parameters": {
                "startIndex": {
                    "value": 0
                },
                "endIndex": {
                    "value": 10
                }
            }
        },
        {
            "type": "action/log",
            "id": "3",
            "parameters": {
                "text": {
                    "value": "Loop Body!"
                }
            }
        },
        {
            "type": "action/log",
            "id": "4",
            "parameters": {
                "text": {
                    "value": "Completed For Loop!"
                }
            }
        }
    ]
};

console.log(compileTimeErrorGraph);






