import 'source-map-support/register';


import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Repository } from '@functions/shared/repository/repository'
import schema from './schema';

const change: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const employeeChange = await new Repository("employee").update(
    event.pathParameters.id,
    event.body
  )
  return formatJSONResponse({
    item: employeeChange
  });
}

export const main = middyfy(change);
