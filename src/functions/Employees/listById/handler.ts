import 'source-map-support/register';


import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Repository } from '@functions/shared/repository/repository'
import schema from './schema';

const listById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (events) => {
  const listById = await new Repository("employee").findById(
    events.pathParameters.id
  )

  return formatJSONResponse({
    item: listById
  });
}

export const main = middyfy(listById);
