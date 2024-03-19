# EVM block indexer subgraph.

Every block is handled by one mapping ```handleBlock```

> The contract `ConverterRegistryContract` found in ABIs and subgraph.yaml is just a dummy contract used to pass formatting checks. Each block is handled automatically regardless of the logic in this contract. 

### References

* [AssemblyScript API](https://thegraph.com/docs/en/developing/assemblyscript-api/)
* [GraphQL API](https://thegraph.com/docs/en/querying/graphql-api/)
* [The Graph networks support](https://thegraph.com/docs/en/developing/supported-networks/)


## Development

### Install Dependencies

```bash
npm install
```

### Code Generation

```bash
npm run codegen -- --chain-id 1
```

### Build Subgraph

```bash
npm run build
```

### Deploy

> :warning: *For deployment the subgraph to hosted service you need the access token (deployment key).*
> See: [Store the Access Token](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/#store-the-access-token)

```bash
npm run deploy -- --name <subgraph-name> --token 5ec79a32a3d2cdc497eddfdcdac5ad44
```

or

```bash
npm run deploy -- -n <subgraph-name> -t 5ec79a32a3d2cdc497eddfdcdac5ad44
```

Token ```5ec79a32a3d2cdc497eddfdcdac5ad44``` is example, you need insert your access token for hosted service or studio.

### Clean

You can delete all generated files with the command:

```bash
npm run clean
```

Also, the cleanup is started before each code generation.

----

## Enjoy yourself, you best developer!

