import 'source-map-support/register';


import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Repository } from '@functions/shared/repository/repository'
import schema from './schema';

const repository = new Repository("employee")
const listById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (events) => {
  try {
    const listById = await repository.findById(
      events.pathParameters.id
    )

    if (!listById)
      return formatJSONResponse({
        error: { message: "Employee with this id does not exist" }
      }, 404);

    return formatJSONResponse({
      item: listById
    }, 200);
  } catch (error) {
    return formatJSONResponse({
      statusCode: 400,
      error: { message: error.message }
    }, 400);
  }
}

export const main = middyfy(listById);
