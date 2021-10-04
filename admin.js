// ============================================
// Database
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: Number,

});

const Order = mongoose.model("Order", OrderSchema);

const ProfessionalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    balance: Number,
    birthday: Date,
    created_at: { type: Date, default: Date.now },
    RG: {
        type: String,
        required: true,
    },
});

const Professional = mongoose.model("Professional", ProfessionalSchema);

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    balance: Number,
    birthday: Date,
    created_at: { type: Date, default: Date.now },
});

const Client = mongoose.model("Client", ClientSchema);
// ============================================
// Admin Bro
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose);
// config
const adminBroOptions = new AdminBro({
    resources: [
        {
            resource: Client,
            options: {
                properties: {
                    description: { type: "richtext" },
                    created_at: {
                        isVisible: { edit: false, list: true, show: true, filter: true },
                    },
                },
            },
        },
        {
            resource: Professional,
            options: {
                properties: {
                    description: { type: "richtext" },
                    created_at: {
                        isVisible: { edit: false, list: true, show: true, filter: true },
                    },
                },
            },
        },
        {
        resource: Order,
            options: {
                properties: {
                    description: { type: "richtext" },
                    created_at: {
                        isVisible: { edit: false, list: true, show: true, filter: true },
                    },
                },
            },
        },
    ],
    locale: {
        translations: {
            labels: {
                Project: "My Projects",
            },
        },
    },
    rootPath: "/admin",
});
const router = AdminBroExpress.buildRouter(adminBroOptions);
// ============================================
// Server
const express = require("express");
const server = express();
server.use(adminBroOptions.options.rootPath, router);
// =============================================
// Run App

const run = async () => {
    await mongoose.connect("mongodb://adminteste:JVh2so402@cluster0-shard-00-00.13e3k.mongodb.net:27017,cluster0-shard-00-01.13e3k.mongodb.net:27017,cluster0-shard-00-02.13e3k.mongodb.net:27017/cluster0?ssl=true&replicaSet=atlas-11baim-shard-0&authSource=admin&retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await server.listen(5500, () => console.log("Server started"));
};
run();