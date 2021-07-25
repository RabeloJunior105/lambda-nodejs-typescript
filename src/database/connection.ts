import { DynamoDB } from 'aws-sdk'

export const connection = new DynamoDB.DocumentClient()