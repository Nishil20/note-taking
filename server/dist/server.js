"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = require("./middleware/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Load environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notetaker';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is healthy' });
});
// API Routes
app.use('/api/auth', authRoutes_1.default);
// Future routes
// app.use('/api/notes', noteRoutes);
// app.use('/api/tags', tagRoutes);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map