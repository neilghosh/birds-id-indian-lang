// Create a new file in lib directory named schema.js
// lib/schema.js
const SchemaType = {
    OBJECT: 'OBJECT',
    STRING: 'STRING',
    ARRAY: 'ARRAY',
};

const responseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        bird_name: {
            type: SchemaType.STRING,
            nullable: false,
        },
        scientific_name: {
            type: SchemaType.STRING,
            nullable: false,
        },
        indian_languages: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    language: { "type": "STRING" },
                    value: { "type": "STRING" },
                }
            }
        },
    },
    required: ["indian_languages", "bird_name", "scientific_name"]
};

module.exports = { schema: responseSchema };
