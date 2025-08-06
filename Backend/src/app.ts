import e from 'express';
import express, {Request, Response} from 'express';
import passport from 'passport';
import authRoutes from './routes/auth.route';
import './config/passport';
import session from 'express-session'
import userRoutes from './routes/user.route'

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default app;