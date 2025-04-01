"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
const port = 3001; // Using a different port
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is healthy' });
});
// Auth routes
const authRouter = express_1.default.Router();
// Simple register endpoint
authRouter.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    res.status(200).json({
        success: true,
        message: 'Registration endpoint working',
        data: { username, email }
    });
});
// Simple login endpoint
authRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({
        success: true,
        message: 'Login endpoint working',
        data: { email }
    });
});
// Mount auth router
app.use('/api/auth', authRouter);
// Start server
app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=test-server.js.map