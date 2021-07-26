import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'DELETE',
        path: 'employee/{id}',
        cors: true,
        request: {
          parameters: {
            paths: { "id": true }
          },
        }
      }
    }
  ]
}
