# RestfulAPI
Restful API using ExpressJS, MongoDB, Mongoose

Steps to run project

Step 1 : npm install

Step 2 : node index.js

Step 3 : Run Postman Application

Create User : http://localhost:3000/api/user/createUser
              
              Method - Post
              
              Enter values in body x-www-form-urlencoded
              
              Username : "    "
              
              Password : "    "
              
              Email : "     "


Find User : http://localhost:3000/api/user/find/:email -> enter email to find in url email parameter
            
            Method - Get
            
Update User : http://localhost:3000/api/user/update/:email -> enter email to update in url email parameter
              
              Method - Put
              
Delete User : http://localhost:3000/api/user/delete/:email -> enter email to delete in url email parameter
              
              Method - Delete
