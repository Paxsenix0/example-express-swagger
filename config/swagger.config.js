const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Example-Rest-API',
      version: '1.0.0',
      description: "your description!",
      contact: {
        name: "PaxSenix0",
        url: "https://api.paxsenix.biz.id",
        email: "alex24dzn@proton.me"
      },
      license: {
        name: "MIT LICENSE",
        url: "https://github.com/Paxsenix0/example-express-swagger/blob/initial/LICENSE"
      }
    },
    servers: [
      { 
        url: 'https://example-express-swagger.vercel.app', 
        description: 'BASE URL API' 
      }
    ],
    tags: [
      { name: "AI" }
    ]
  },
  apis: ['./routes/*.js']
};

module.exports = options;
