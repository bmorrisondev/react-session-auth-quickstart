"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const prisma_1 = require("../db/prisma");
const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.session;
        if (!token) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }
        const session = await prisma_1.prisma.session.findUnique({
            where: { token },
            include: { user: true }
        });
        if (!session) {
            res.clearCookie('session');
            res.status(401).json({ error: 'Invalid session' });
            return;
        }
        if (session.expiresAt < new Date()) {
            await prisma_1.prisma.session.delete({ where: { id: session.id } });
            res.clearCookie('session');
            res.status(401).json({ error: 'Session expired' });
            return;
        }
        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name
        };
        req.session = {
            id: session.id,
            token: session.token
        };
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.requireAuth = requireAuth;
