"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var axios_1 = __importDefault(require("axios"));
var form_data_1 = __importDefault(require("form-data"));
var fs_1 = __importDefault(require("fs"));
var callApi = /** @class */ (function () {
    function callApi(store, jwt, app, mainWindow) {
        var _this = this;
        this.run = function () {
            electron_1.ipcMain.handle("getdata", function (e, args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            }); });
            electron_1.ipcMain.handle("uploadimages", function (e, args) { return __awaiter(_this, void 0, void 0, function () {
                var url, headers, filepath, file, properties, formData, i, res, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = args.url, headers = args.headers;
                            headers.headers["Authorization"] = "Bearer ".concat(this.store.get(this.jwt));
                            filepath = undefined;
                            if (process.platform !== 'darwin') {
                                properties = {
                                    properties: ['openFile', 'multiSelections']
                                };
                            }
                            else {
                                properties = {
                                    properties: ['openFile', 'openDirectory', 'multiSelections']
                                };
                            }
                            return [4 /*yield*/, electron_1.dialog.showOpenDialog({
                                    title: 'Select the File to be uploaded',
                                    buttonLabel: 'Upload',
                                    // Restricting the user to only Text Files.
                                    filters: [
                                        {
                                            name: 'Image Files',
                                            extensions: ['jpg', 'png', 'gif', 'jpeg']
                                        },
                                    ],
                                    // Specifying the File Selector Property
                                    properties: properties.properties
                                })];
                        case 1:
                            // Resolves to a Promise<Object>
                            file = _a.sent();
                            if (!!file.canceled) return [3 /*break*/, 5];
                            // Updating the GLOBAL filepath variable 
                            // to user-selected file.
                            filepath = file.filePaths;
                            formData = new form_data_1.default();
                            if (!(filepath.length > 0)) return [3 /*break*/, 5];
                            for (i = 0; i < filepath.length; i++) {
                                formData.append("file[]", fs_1.default.createReadStream(filepath[i]));
                            }
                            headers.headers["Content-Type"] = "multipart/form-data; boundary=".concat(formData._boundary);
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, axios_1.default.post(url, formData, headers)];
                        case 3:
                            res = _a.sent();
                            if (res.status === 200) {
                                return [2 /*return*/, {
                                        status: res.data
                                    }];
                            }
                            else {
                                return [2 /*return*/, {
                                        status: false,
                                        message: res.data.message
                                    }];
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _a.sent();
                            return [2 /*return*/, err_1];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
        };
        this.store = store;
        this.jwt = jwt;
        this.app = app;
        this.mainWindow = mainWindow;
        this.run();
    }
    return callApi;
}());
exports.default = callApi;
