"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/jwt/dist");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const unauthorized_exception_1 = require("@nestjs/common/exceptions/unauthorized.exception");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { firstname, lastname, city, country, phonenumber, email, password } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            firstname,
            lastname,
            city,
            country,
            phonenumber,
            email,
            password: hashedPassword,
        });
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new unauthorized_exception_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new unauthorized_exception_1.UnauthorizedException('Invalid email or password');
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
    async getall() {
        return await this.userModel.find({}, { "_id": 0, "__v": 0, "password": 0, "securityquestion": 0 });
    }
    async create(userObject) {
        const new_user = new this.userModel(userObject);
        const temp = await this.userModel.findOne({ email: userObject.email });
        if (!temp) {
            await new_user.save();
            return new_user;
        }
        else {
            return new Error("Someone already registered with this email!!!");
        }
    }
    async delete(id) {
        return await this.userModel.findByIdAndDelete({ _id: id });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model, dist_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map