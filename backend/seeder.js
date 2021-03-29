import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
       await Order.deleteMany();
       await Product.deleteMany();
       await User.deleteMany();

        //array of created users
       const createdUsers = await User.insertMany(users);
        //admin is the first user in the files
       const adminUser = createdUsers[0]._id;
        //add admin to each product
       const sampleProducts = products.map(product => {
           return {... product, user: adminUser}
       });

       await Product.insertMany(sampleProducts);
       console.log('Data imported');
       process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
       await Order.deleteMany();
       await Product.deleteMany();
       await User.deleteMany();

       console.log('Data destroyed!');
       process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

process.argv[2];

if(process.argv[2] === '-d'){
    destroyData();
} else {
    importData();
}