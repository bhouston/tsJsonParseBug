Shouldn't this code work?  The typescript typing seems correct.

When I run this code I get this error:

```
% npx tsc

src/lib/index.ts:27:7 - error TS2322: Type '{ nodes: ({ type: string; id: string; parameters?: undefined; } | { type: string; id: string; parameters: { text: { value: string; }; startIndex?: undefined; endIndex?: undefined; }; } | { type: string; id: string; parameters: { ...; }; })[]; }' is not assignable to type 'GraphJSON'.
  Types of property 'nodes' are incompatible.
    Type '({ type: string; id: string; parameters?: undefined; } | { type: string; id: string; parameters: { text: { value: string; }; startIndex?: undefined; endIndex?: undefined; }; } | { type: string; id: string; parameters: { ...; }; })[]' is not assignable to type 'NodeJSON[]'.
      Type '{ type: string; id: string; parameters?: undefined; } | { type: string; id: string; parameters: { text: { value: string; }; startIndex?: undefined; endIndex?: undefined; }; } | { type: string; id: string; parameters: { ...; }; }' is not assignable to type 'NodeJSON'.
        Type '{ type: string; id: string; parameters: { text: { value: string; }; startIndex?: undefined; endIndex?: undefined; }; }' is not assignable to type 'NodeJSON'.
          Types of property 'parameters' are incompatible.
            Type '{ text: { value: string; }; startIndex?: undefined; endIndex?: undefined; }' is not assignable to type 'ParametersJSON'.
              Property '"startIndex"' is incompatible with index signature.
                Type 'undefined' is not assignable to type 'ParameterJSON'.

27 const graph: GraphJSON = rawGraphJSON;
         ~~~~~
```