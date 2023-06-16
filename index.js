import express from 'express';

const port = process.env.PORT || '8080';
const server = express();

server.get('/', (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	console.log('Request received', 'root', ip);
	const data = {
		success: true
	};
  return res.json(data);
});

server.get('/sleep', async (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	console.log('Request received', 'sleep', ip);
	const time = 5000;
	const data = {
		success: true,
		slept: time
	};
	await sleep(time);
	console.log('Response sent');
  return res.json(data);
});

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
