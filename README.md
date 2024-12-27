# example-express-swagger
A Bboilerplate for creating express.js APIs with Swagger documentation setup. this project makes it easy to document and test your API endpoints while providing a clean project structure and customization options.

# Features

- **express.js**: lightweight and flexible framework for building web APIs.

- **swagger-ui**: auto-generated and interactive API documentation.

- **mongodb support**: easily integrate with a mongodb database using DB_URI.

- **vercel deployment**: one-click deployment to vercel for instant hosting.

- **organized structure**: routes and configuration neatly organized for scalability.


# Project structure
```
example-express-swagger/
├── config/  
│   └── db.config.js         # connect mongodb
├── middlewares/  
│   └── rateLimit.middleware.js    # do checking ip address
├── models/  
│   └── ip.model.js          # Mongodb ip address scheme
├── plugins/  
│   ├── nova-ai.js           # examples of data
│   └── index.js             # main entry point to handles data
├── routes/  
│   └── chat.route.js        # handles 'chat' related API endpoints
├── services/  
│   └── ip.service.js        # all functions to insert, check usage of ip address for rate limit.
├── index.js                 # main app initialization  
├── swagger.js               # swagger ui file  
├── package.json             # npm dependencies and scripts  
└── README.md                # project documentation (you’re here)
```
# Installation

1. Clone the repo:
```bash
git clone https://github.com/Paxsenix0/example-express-swagger.git  
cd example-express-swagger
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment variables:
create a .env file in the root directory and add your mongodb uri:
```bash
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

4. Start the server:
```bash
npm start
```

5. Open Swagger UI:
go to http://localhost:3000/docs in your browser to view your API documentation.


# Vercel Deployment
To deploy this project to vercel:
## 1-Click-Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPaxsenix0%2Fexample-express-swagger&env=DB_URI&envDescription=DB_URI%20is%20needed%20for%20this%20for%20mongodb%20to%20be%20working%20fine&envLink=https%3A%2F%2Fwww.mongodb.com%2F&project-name=example-express-swagger&repository-name=example-express-swagger&redirect-url=https%3A%2F%2Fgithub.com%2FPaxsenix0%2Fexample-express-swagger)


# Swagger Configuration

Swagger Options are defined in index.js. Here's an overview of the configuration:
```javascript
const swaggerOptions = {  
  definition: {  
    openapi: '3.0.0',  
    info: {  
      title: 'example-rest-api',  
      version: '1.0.0',  
      description: 'your description!',  
      contact: {  
        name: 'PaxSenix0',  
        url: 'https://api.paxsenix.biz.id',  
        email: 'alex24dzn@proton.me'  
      },  
      license: {  
        name: 'MIT LICENSE',  
        url: 'https://github.com/Paxsenix0/example-express-swagger/blob/initial/LICENSE'  
      }  
    },  
    servers: [  
      {  
        url: 'https://example-express-swagger.vercel.app',  
        description: 'BASE URL API'  
      }  
    ],  
    tags: [  
      { name: 'AI' }  
    ]  
  },  
  apis: ['./routes/*.route.js'] // adjust based on route file naming  
};
```

# License

This project is licensed under the MIT license. see [LICENSE](https://github.com/Paxsenix0/example-express-swagger/blob/initial/LICENSE) for details.

# Contact

Telegram: [@paxsenix0](https://t.me/paxsenix0)

Email: alex24dzn@proton.me

My Rest-API website: https://api.paxsenix.biz.id