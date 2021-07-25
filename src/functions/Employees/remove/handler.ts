import 'source-map-support/register';


import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Repository } from '@functions/shared/repository/repository'
import schema from './schema';

const remove: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (events) => {

  const removed = await new Repository("employee").delete(
    events.pathParameters.id
  )
  return formatJSONResponse({
    item: removed
  });
}

export const main = middyfy(remove);
