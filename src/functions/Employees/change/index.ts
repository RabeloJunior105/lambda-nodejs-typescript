import { handlerPath } from '@libs/handlerResolver';


export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'PUT',
        path: '/employee/{id}',
        request: {
          parameters: {
            paths: { "id": true }
          }
        }
      }
    }
  ]
}