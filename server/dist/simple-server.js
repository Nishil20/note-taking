"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
// Load environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is healthy' });
});
// API Routes
app.use('/api/auth', authRoutes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(port, () => {
    console.log(`Simple server running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=simple-server.js.map