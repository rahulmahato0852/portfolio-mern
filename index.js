"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
require("dotenv").config({ path: "./.env" });
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'CustomError';
        return _this;
    }
    return CustomError;
}(Error));
mongoose.connect(process.env.MONGO);
var app = express();
app.use(express.json());
app.use(cors());
app.use("/api/portfolio", require("./routes/userRoute"));
app.use("*", function (req, res) {
    res.status(404).json({ message: "No Resource Found" });
});
app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
});
mongoose.connection.once("open", function () {
    console.log("Mongoose connected");
    app.listen(process.env.PORT, console.log("server running"));
});
