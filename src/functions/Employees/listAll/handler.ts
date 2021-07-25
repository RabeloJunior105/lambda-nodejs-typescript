import 'source-map-support/register';


import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Repository } from '@functions/shared/repository/repository'

const listAll = async () => {
  const listAll = await new Repository("employee").find()

  return formatJSONResponse({
    items: listAll
  });
}

export const main = middyfy(listAll);
