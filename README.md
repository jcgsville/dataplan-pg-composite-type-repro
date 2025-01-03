Repro what I think is a bug in @dataplan/pg.

When you call `build.input.pgRegistry.pgResources.some_table.get`, it does not return columns that are composite types.

To repro:

1. Create a database `dataplan_pg_composite_type_repro`
2. Run the migration statements in `migration.sql` in `dataplan_pg_composite_type_repro`
3. npm install
4. node index.js
5. execute the following GraphQL mutation:

```gql
mutation MyMutation {
  doSomething {
    foo {
      aa
    }
  }
}
```

See output logs:

```sh
node index.js
(node:89428) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///path-to-repo/dataplan-pg-composite-type-repro/index.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /path-to-repo/dataplan-pg-composite-type-repro/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
The GRAPHILE_ENV environmental variable is not set; Grafast will run in production mode. In your development environments, it's recommended that you set `GRAPHILE_ENV=development` to opt in to additional checks that will provide guidance and help you to catch issues in your code earlier, and other changes such as formatting to improve your development experience.
Server listening at http://localhost:5678
!!!foo [ '1', 0 ]
```
