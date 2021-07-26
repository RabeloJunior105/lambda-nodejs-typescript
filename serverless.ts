import type { AWS } from '@serverless/typescript';


import { listAll, create, change, listById, remove } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'aws-crud-ts',
  frameworkVersion: '2',

  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    jest: {

      "name": "my-project",
      "jest": {
        "verbose": true
      }

    }

  },
  plugins: ['serverless-webpack', 'serverless-jest-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    stage: "dev",
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: {
          "Fn::GetAtt": ["EmployeesBTable", "Arn"]
        }
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    region: "us-east-1",
    memorySize: 228,

  },
  resources: {
    Resources: {
      "EmployeesBTable": {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          "AttributeDefinitions": [
            {
              "AttributeName": "id",
              "AttributeType": "S"
            }
          ],
          "KeySchema": [
            {
              "AttributeName": "id",
              "KeyType": "HASH"
            }
          ],
          "BillingMode": "PAY_PER_REQUEST",
          "TableName": "employee"
        }
      }
    }
  },
  // import the function via paths
  functions: {
    listAll,
    create,
    change,
    listById,
    remove
  },
};

module.exports = serverlessConfiguration;
