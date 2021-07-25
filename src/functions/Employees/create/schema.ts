export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    charge: { type: "string" }
  },
  required: ['name', 'age', 'charge']
} as const;
