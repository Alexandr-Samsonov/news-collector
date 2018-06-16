import React, { Component } from 'react';
import { Item, Label, Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

class Post extends Component {
  constructor(props) {
    super(props)
    this.setText = this.setText.bind(this)
    this.regionText = this.regionText.bind(this)
  }

  setText(s) {
    return (s.length >= 300 ? s.substr(0, 300) + ' ...' : s);
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
    return (
      <Item>
        <Item.Image src={this.props.image} />
        <Item.Content>
          <Item.Header>{this.props.title}</Item.Header>
          <Item.Description>{this.setText(this.props.text)}</Item.Description>
          <Item.Extra>
            <Label icon='eye' content={`Просмотров: ${this.props.views}`} />
          </Item.Extra>
          <Item.Extra>
            <Label content={this.regionText(this.props.category)} />
          </Item.Extra>
        </Item.Content>

        <Modal trigger={<Button>Читать</Button>} closeIcon size='small'>
          <Modal.Header>{this.props.title}</Modal.Header>
          <Modal.Content scrolling>
            <Image size='medium' src={this.props.image} centered />
            <Modal.Description>
              {this.props.text}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Item.Content>
              <Item.Extra>
                <Label icon='eye' content={`Просмотров: ${this.props.views}`} />
              </Item.Extra>
              <Item.Extra>
                <Label content={this.regionText(this.props.category)} />
              </Item.Extra>
            </Item.Content>
          </Modal.Actions>
        </Modal>

      </Item>
    )
  }
}

export default Post