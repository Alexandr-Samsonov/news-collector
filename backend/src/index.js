import { parsePost, parseLinks, getPosts } from './parsePost';
import fs from 'fs';
import { elems } from './configs';

const saveResult = (json) => {
	fs.writeFile('result.json', json, (err) => {
		if (err) console.log('Not saved');
	});
};

const urlPage = elems.riadagestan.urlLinks;
const selector = elems.riadagestan.selectors;

parseLinks(urlPage, selector , 14)
	.then(links => {
		getPosts(links, elems.riadagestan)
			.then(posts => saveResult(JSON.stringify(posts, 0, 4)))
			.catch(e => console.log(e));
	}).catch(e => console.log(e));
