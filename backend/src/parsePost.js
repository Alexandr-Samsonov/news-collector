import unirest from 'unirest';  // библиотека для отправки запросов (backend)
import cheerio from 'cheerio';  // библиотека для парсинга в виде Jquery (backend)

const log = (i, count, ms) => {
    return new Promise(r =>
        setTimeout(() => {
            console.log(`
                Индекс: ${i};
                Всего записей: ${count}
            `);
            r();
        }, ms),
    );
};

function parsePost(url, elems) {  // Сама функция ассинхронная. Парсинг статьи из определенного ресурса
    return new Promise((resolve, reject) => {

        unirest.get(url).end(({ body, error }) => {  // Но все должно подождать пока выполнится данное действие
            if (error) reject(error);

            const $ = cheerio.load(body);

            const domain = url.match(/\/\/(.*?)\//)[1]; // записываем адресс домена из текущего урла
            const title = $(elems.title).text().trim();
            let image = $(elems.image).attr('src');
            image = image.indexOf('http') >= 0 ? image : `http://${domain}${image}`;
            const text = $(elems.text).text().trim();
            const views = $(elems.views).text().trim();

            const post = {
                title: title,
                image: image,
                text: text,
                views: views,
                category: elems.category
            };

            resolve(post);
        });
    });
}

function parseLinks(url, className, maxLinks = 5) {  // Поиск (парсер) ссылок статей на определенном ресурсе
    return new Promise((resolve, reject) => {
        let links = [];

        unirest.get(url).end(({ body, error }) => {
            if (error) reject(error);

            const $ = cheerio.load(body);
            const domain = url.match(/\/\/(.*?)\//)[1]; // записываем адресс домена из текущего урла

            $(className).each((i, e) => {
                if (i + 1 <= maxLinks) links.push((domain.indexOf('http') ? ('http://' + domain) : '') + $(e).attr('href')); // ??? условие
            });

            resolve(links);
            if (!links.length) reject({ error: 'empty links' });
        });
    });
}

async function getPosts(links, elems) {  // Перебор всех ссылок статей, для дальнейшего их отображения
    let posts = [];
    let count = links.length;
    console.log(count);

    for (let i = 0; i < count; i++) {
        const post = await parsePost(links[i], elems).then(post => post);

        posts.push(post);
        await log(i + 1, count, 2000);
    }

    return new Promise((resolve, reject) => {
        if (!posts.length) reject({ error: 'empty posts' });
        resolve(posts);
    });
}

export { parsePost, parseLinks, getPosts };