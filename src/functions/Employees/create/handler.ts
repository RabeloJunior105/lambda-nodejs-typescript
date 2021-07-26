import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import createSchema from './schema';
import { v4 } from 'uuid'
import { Repository } from '@functions/shared/repository/repository'

const create: ValidatedEventAPIGatewayProxyEvent<typeof createSchema> = async (event) => {
  try {
    const createEmployer = await new Repository("employee").create({
      id: v4(),
      name: event.body.name,
      age: event.body.age,
      charge: event.body.charge,
    })

    return formatJSONResponse({
      item: createEmployer
    }, 200);
  } catch (error) {
    return formatJSONResponse({
      statusCode: 400,
      error: { message: error.message }
    }, 400);
  }
}

export const main = middyfy(create);
