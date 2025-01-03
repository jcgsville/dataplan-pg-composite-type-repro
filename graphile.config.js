import { PostGraphileAmberPreset } from 'postgraphile/presets/amber'
import { makeExtendSchemaPlugin } from 'postgraphile/utils'
import { constant, sideEffect, object, access } from 'postgraphile/grafast'
import { gql } from 'postgraphile/utils'
import { makePgService } from '@dataplan/pg/adaptors/pg'

export default {
    extends: [PostGraphileAmberPreset],
    pgServices: [
        makePgService({
            connectionString: 'postgres://localhost:5432/dataplan_pg_composite_type_repro',
        }),
    ],
    grafserv: {
        graphqlPath: '/graphql',
        graphiql: true,
        graphiqlPath: '/',
    },
    plugins: [
        makeExtendSchemaPlugin((build) => {
            const { foo } =
                build.input.pgRegistry.pgResources
        
            return {
                typeDefs: gql`
                    type DoSomethingPayload {
                        foo: Foo
                    }
        
                    extend type Mutation {
                        doSomething: DoSomethingPayload
                    }
                `,
                plans: {
                    Mutation: {
                        doSomething() {
                            const $foo = foo.get({
                                id: constant(1),
                            })
                            sideEffect($foo, async (foo) => {
                                console.log('!!!foo', foo)
                            })
        
                            return object({
                                foo: $foo,
                            })
                        },
                    },
                    DoSomethingPayload: {
                        foo($data) {
                            const $foo = $data.get('foo')
                            const $fooId = access($foo, 'id')
                            return foo.get({ id: $fooId })
                        },
                        query() {
                            return constant(true)
                        }
                    },
                },
            }
        })
    ],
}
