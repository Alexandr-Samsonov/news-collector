const elems = {
    /*dp: {
        category: 'piter',
        title: '.b-article__heading',
        image: '.b-article-stretched__image',
        text: '.b-article-grid-layout-left-column__inner.b-article__content p',
        views: '',
        selectors: '.b-article-list__item .b-inline-article__photo-outer',
        urlLinks: 'https://www.dp.ru/tag/%D0%9E%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE'
    }*/
    /*mosnews: {  // Кодировка сайта плохая - 1251
        category: 'moscow',
        title: '.article h1',
        image: '.article a img',
        text: '.detail_text_container',
        views: '.news-views span',
        selectors: '.news-list.news-list-two-column .news-name a',
        urlLinks: 'http://mos.news/news/sport/'
    }*/
    /*sgpress: {  // Странно парсит текст и заголовки
        category: 'samara',
        title: '.page_center_content h1',
        image: '.article_image',
        text: '.article_actual.text_block',
        views: '.author_line .views_count',
        selectors: '.articles_with_header_block a.image_cont',
        urlLinks: 'http://sgpress.ru/Sport_v_Samare/'
    },*/
    riadagestan: {  // Просмотры на сайте странно генерируются
        category: 'chechnya', // dagestan
        title: '.itemTitle',
        image: '.preview_picture',
        text: '#qaz',
        views: '.itemHits b',
        selectors: '.b-mid-col__layout li a',
        urlLinks: 'https://www.riadagestan.ru/news/economy/'
    },
    /*groznyinform: {  // Кодировка сайта плохая - 1251
        category: 'chechnya',
        title: '.news h1',
        image: '.imgA img',
        text: '.news p',
        views: '.news p.views',
        selectors: '.partition_news p a',
        urlLinks: 'http://grozny-inform.ru/news/health/'
    },*/
    /*magastimes: {  
        title: '.td-post-title .entry-title',
        image: '.td-backstretch',
        text: '.td-post-content p',
        views: '.td-post-views span'
    }*/
};

export { elems };
