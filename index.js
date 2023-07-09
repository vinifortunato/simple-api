import express from 'express';

const port = process.env.PORT || '8080';
const server = express();

server.get('/', (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	console.log('Request received', 'root', ip);

	const rawDate = new Date();
	const year = rawDate.getFullYear();
	const month = ('0' + (rawDate.getMonth() + 1)).slice(-2);
	const date = ('0' + rawDate.getDate()).slice(-2);
	const hours = ('0' + rawDate.getHours()).slice(-2);
	const minutes = ('0' + rawDate.getMinutes()).slice(-2);
	const seconds = ('0' + rawDate.getSeconds()).slice(-2);
	const formatedDate = `${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`;

	const data = {
		success: true,
		date: formatedDate
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
