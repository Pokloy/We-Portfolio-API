	import express from 'express';
	import mongoose from 'mongoose';
	import cors from 'cors';

	import testRoutes from './routes/test-controller';
	import blogRoutes from './routes/blog-routes';
	import jobRoutes from './routes/job-routes';
	import userRoutes from './routes/user-routes';
	import workRoutes from './routes/work-routes';
	import techstackRoutes from './routes/techStack-routes';
	import toolRoutes from './routes/tools-routes';

	const port = 4000;

	const app = express();

	app.use(express.json());
	app.use(cors());
	app.use(express.urlencoded({extended:true}));


	mongoose.connect('mongodb+srv://admin:admin@my-sandbox-cluster.ry2lk.mongodb.net/PortfolioAPIDatabase')
	.then(() => console.log('Now connected to MongoDB Atlas.'))
	.catch(err => console.error('Connection error:', err));

	mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));
	mongoose.set('debug', true);


	app.use('/test', testRoutes);
	app.use('/blog', blogRoutes);
	app.use('/job', jobRoutes);
	app.use('/user', userRoutes);
	app.use('/work', workRoutes);
	app.use('/techstack', techstackRoutes);
	app.use('/tools', toolRoutes);


	// app.listen(port, () => {
	//   return console.log(`Express is listening at http://localhost:${port}`);
	// });
	if(require.main === module){
		app.listen(process.env.PORT || port, () => {
			console.log(`API is now online on port ${ process.env.PORT || port}`)
		})
	}

	module.exports = {app, mongoose};