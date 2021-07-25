import { connection } from "@database/connection";
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

export class Repository {
    constructor(private tableName: string) { }

    async find() {
        const { Items } = await connection.scan({
            TableName: this.tableName
        }
        ).promise()

        return Items
    }

    async findById(id: string) {
        const { Item } = await connection.get({
            TableName: this.tableName,
            Key: { id }
        }
        ).promise()

        return Item
    }

    async create(data: any) {
        await connection.put({
            TableName: this.tableName,
            Item: {
                ...data
            }
        }).promise()

        return data

    }
    async update(id: any, data: any) {
        try {
            const itemKeys = Object.keys(data);

            const params = {
                TableName: this.tableName,
                Key: { id },
                ReturnValues: 'ALL_NEW',
                UpdateExpression:
                    `SET ${itemKeys.map(
                        (k, index) => `#field${index} = :value${index}`
                    )
                        .join(', ')}`,
                ExpressionAttributeNames: itemKeys.reduce((accumulator, k, index) =>
                (
                    { ...accumulator, [`#field${index}`]: k }),
                    {}
                ),

                ExpressionAttributeValues: itemKeys.reduce((accumulator, k, index) => {
                    return ({ ...accumulator, [`:value${index}`]: data[k] })
                }, {})
            }

            const { Attributes } = await connection.update({
                ...params
            }).promise()

            return Attributes
        } catch (error) {
            console.log(error)
            return { error: { message: error.message } }
        }
    }

    async delete(id: string) {
        try {
            await connection.delete({
                TableName: this.tableName,
                Key: { id }
            }).promise()


            return { message: "Employee removed with success" }
        } catch (error) {
            return { error: { message: error.message } }
        }
    }
}