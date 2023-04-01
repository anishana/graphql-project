import { buildSchema } from 'graphql';

const schema = buildSchema(`

    enum Soldout{
        SOLDOUT
        ONSALE
    }

    type Product {
        id: ID
        name: String
        description: String
        price: Float
        soldout: Soldout
        inventory: Int
        stores: [Store]!
    }

    type Store {
        store: String
    }
    
    type Query {
        getProduct(id: ID): Product,
        getCategories: [Categories]
        getAllProducts: [Product]
    }

    input StoreInput {
        store: String
    }

    input ProductInput {
        id: ID
        name: String
        description: String
        price: Float
        soldout: Soldout
        inventory: Int
        stores: [StoreInput]!
    }


    type Mutation {
        createProduct(input: ProductInput): Product
        updateProduct(input: ProductInput): Product
        deleteProduct(id: ID!): String
    }

    type Categories{
        id: ID
        category: String
        description: String
        createdAt: String
        updatedAt: String
    }

    input CategoryInput{
        id: ID
        category: String
        description: String
        createdAt: String
        updatedAt: String
    }
`)

export default schema;