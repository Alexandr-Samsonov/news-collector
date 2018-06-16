import React, { Component } from 'react';
import Post from './components/Post';
import ButtonDropdown from './components/ButtonDropdown';
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Header, Button, Item, Segment, Input } from 'semantic-ui-react';

class App extends Component {
    constructor(props) {
        super(props);
    }

    fetchPosts() {
        const { setPosts } = this.props;
        axios.get('http://5b1b07606e0fd400146aaedb.mockapi.io/posts').then(({ data }) => {
            //console.info('--- SERVER_DATA', data);
            setPosts(data);
        });
    }

    componentWillMount() {
      this.fetchPosts();
    }

    regionText(s) {
      switch(s) {
        case 'all':
          return 'Все регионы';
        case 'ingush':
          return 'Ингушетия';
        case 'chechnya':
          return 'Чечня';
        case 'dagestan':
          return 'Дагестан';
        default:
          return 'Нет такого региона';
      }
    }

    render() {
        const { posts, isReady } = this.props;
        return (
          <Container>
            <Header as='h2'>Регион: { this.regionText(this.props.regions.category) }</Header>

              <Button.Group basic>
                <Button onClick={this.props.changeRegion.bind(this, 'all')}>Все регионы</Button>
                <Button onClick={this.props.changeRegion.bind(this, 'ingush')}>Ингушетия</Button>
                <Button onClick={this.props.changeRegion.bind(this, 'chechnya')}>Чечня</Button>
                <Button onClick={this.props.changeRegion.bind(this, 'dagestan')}>Дагестан</Button>
              </Button.Group>

              
              <Input placeholder='Поиск...' icon='search' onChange={ e => this.props.setSearchQuery(e.target.value) } value={this.props.search.searchQuery} />

              <ButtonDropdown/>

              <Item.Group divided>
                {
                  !isReady ? (
                      <Segment loading>
                        <br/>
                        <br/>
                        <br/>
                      </Segment>
                    ) : 
                    (
                        posts.map(({ title, text, image, views, category }, key) => (
                            <Post
                                key={key}
                                title={title}
                                text={text}
                                image={image}
                                views={views}
                                category={category}
                            />
                        ))
                    )
                }
              </Item.Group>
          </Container>
        );
    }
}

const state = ({posts, regions, search, sortView}) => {  // передаем редюсеры в виде пропсов в компонент
    const newsSortCategory = (news, category) => {
      switch(category) {
        case 'ingush':
          return news.filter((item) => item.category === 'ingush');
        case 'chechnya':
          return news.filter(
            (item) => item.category === 'chechnya'
          );
        case 'dagestan':
          return news.filter(
            (item) => item.category === 'dagestan'
          );
        case 'all':
          return news;
        default:
          return news;
      }
    };

    const newsSortView = (news, sortView) => {
        switch(sortView) {
            case 'bigView':
                return news.sort((a,b) => b.views - a.views);
            case 'smallView':
                return news.sort((a,b) => a.views - b.views);
            case 'default':
                return news;
            default:
                return news;
        }
    };

    const newsSearch = (news, searchQuery) => 
        news.filter(
            n =>
                n.title.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
                n.text.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0,
        );

    return {
      posts: newsSortView(newsSortCategory(newsSearch(posts.items, search.searchQuery), regions.category), sortView.sortView),
      regions,
      search,
      isReady: posts.isReady,
      sortView
    }
};

const actions = (dispatch) => ({  // передаем методы, которые возвращает диспатчи с экшенами, в компонент в виде пропсов
    setPosts: (data) => dispatch({
        type: 'SET_POSTS',
        payload: data
    }),
    changeRegion: name => dispatch({
        type: 'CHANGE_REGION',
        payload: name
    }),
    setSearchQuery: value => dispatch({
        type: 'SET_QUERY',
        payload: value
    })
});

export default connect(state, actions)(App);
