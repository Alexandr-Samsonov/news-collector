import { connect } from 'react-redux';
import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

const ButtonDropdown = (props) => {
  const options = [
    { key: 1, text: 'По умолчанию', value: 1 },
    { key: 2, text: 'Самые просматриваемые', value: 2 },
    { key: 3, text: 'Менее просматриваемые', value: 3 },
  ];

  const getValue = (e, { value }) => {
    switch(value) {
      case 1:
        return props.changeSortView('default');
      case 2:
        return props.changeSortView('bigView');
      case 3:
        return props.changeSortView('smallView');
    }
  };

  const sortViewText = (sort) => {
    switch(sort) {
      case 'default':
        return 'По умолчанию';
      case 'bigView':
        return 'Самые просматриваемые';
      case 'smallView':
        return 'Менее просматриваемые';
    }
  }

  return (
    <Menu compact>
      <Dropdown onChange={getValue} text={`Сортировка: ${sortViewText(props.sortView.sortView)}`} options={options} simple item />
    </Menu>
  )
}

const mapStateToProps = ({ sortView }) => ({
  sortView,
});

const mapDispatchToProps = dispatch => ({
  changeSortView: (sortView) => dispatch({
    type: 'CHANGE_SORT_VIEW',
    payload: sortView,
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonDropdown);