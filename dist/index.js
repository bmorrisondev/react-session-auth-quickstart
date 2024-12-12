"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_proxy_middleware_1 = require("http-proxy-middleware");
const auth_1 = __importDefault(require("./routes/auth"));
// import { requireAuth } from './middleware/auth';
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const VITE_PORT = process.env.VITE_PORT || 5173;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:5173',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// API routes
app.use('/api', (req, res, next) => {
    console.log(`API Request: ${req.method} ${req.url}`);
    next();
});
// Public routes
app.use('/api/auth', auth_1.default);
// Protected routes
// Example: app.use('/api/articles', requireAuth, articlesRouter);
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Development: Proxy all non-API requests to Vite dev server
if (process.env.NODE_ENV !== 'production') {
    app.use('/', (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: `http://localhost:${VITE_PORT}`,
        changeOrigin: true,
        ws: true,
        // Don't proxy /api requests
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        filter: (pathname) => !pathname.startsWith('/api'),
    }));
}
else {
    // Production: Serve static files
    app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
    // Handle React routing in production
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path_1.default.join(__dirname, './public/index.html'));
        }
    });
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Proxying non-API requests to http://localhost:${VITE_PORT}`);
    }
});
