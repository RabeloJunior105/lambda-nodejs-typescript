import 'source-map-support/register';


import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Repository } from '@functions/shared/repository/repository'

const listAll = async () => {
  try {
    const listAll = await new Repository("employee").find()

    return formatJSONResponse({
      items: listAll
    }, 200);

  } catch (error) {
    return formatJSONResponse({
      error: { message: error.message }
    }, 400);
  }
}

export const main = middyfy(listAll);
