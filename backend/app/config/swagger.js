import swaggerJsdoc from 'swagger-jsdoc'
const options = {
	swaggerDefinition:{
    	openapi: "3.0.3",
        info:{
        	title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        servers:[
        	{
            	url:"http://localhost:3000",
            },
       ],
	},
    apis:['../routes/*.ts']
};

const specs = swaggerJsdoc(options);

module.exports = {
	swaggerUi,
    specs
}