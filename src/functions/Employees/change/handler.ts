import 'source-map-support/register';


import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Repository } from '@functions/shared/repository/repository'
import schema from './schema';
const repository = new Repository("employee")
const change: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const employeeExists = await repository.findById(
      event.pathParameters.id
    )

    if (!employeeExists)
      return formatJSONResponse({
        error: { message: "Employee not exists" }
      }, 404);

    const employeeChange = await repository.update(
      event.pathParameters.id,
      event.body
    )
    return formatJSONResponse({
      item: employeeChange
    }, 200);

  } catch (error) {
    return formatJSONResponse({
      statusCode: 400,
      error: { message: error.message }
    }, 200);
  }
}

export const main = middyfy(change);
