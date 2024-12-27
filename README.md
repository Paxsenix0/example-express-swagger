# example-express-swagger
A Bboilerplate for creating express.js APIs with Swagger documentation setup. this project makes it easy to document and test your API endpoints while providing a clean project structure and customization options.

# features

- express.js: lightweight and flexible framework for building web APIs.

- swagger-ui: auto-generated and interactive API documentation.

- organized structure: routes and configuration neatly organized for scalability.


project structure
```
example-express-swagger/  
├── routes/  
│   ├── chat.route.js        # handles 'chat' related API endpoints  
│   └── index.js             # main entry point for all routes  
├── public/  
│   ├── favicon-32x32.png    # 32x32 favicon for swagger-ui  
│   └── favicon-16x16.png    # 16x16 favicon for swagger-ui  
├── app.js                   # main app initialization  
├── swagger.js               # swagger configuration file  
├── package.json             # npm dependencies and scripts  
└── README.md                # project documentation (you’re here)
```
# installation

1. Clone the repo:
```
git clone https://github.com/Paxsenix0/example-express-swagger.git  
cd example-express-swagger
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm start
```

4. Open Swagger UI:
go to http://localhost:3000/docs in your browser to view your API documentation.



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