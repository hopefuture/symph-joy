import React, {Component} from 'react';
import PropTypes from "prop-types";
import styles from './IndexPage.less';
import Controller from 'symphony-joy/controller'
import ImageView from '../components/image-view'


@Controller((state) => ({
  me: state.user.me,
  products: state.product.products
}))
export default class IndexPage extends Component {

  constructor() {
    console.log('>>>>===== IndexPage constructor');
    super(...arguments);
  }

  componentPrepare() {
    let dispatch = this.props.dispatch;
    console.log('>>>>===== prepare');
    console.log('>>>>>> IndexPage start dispatch action ');
    dispatch({
      type: 'user/fetchMyInfo'
    }).then((result) => {
      console.log('>>>>>>  effectResult:' + result);
      return result;
    });
    dispatch({
      type: 'product/fetchProducts'
    });
  }

  componentWillMount() {
    console.log('>>>>>> IndexPage componentWillMount');

  }

  componentDidMount() {
    console.log('>>>>>> componentDidMount');
    this.props.dispatch({
      type: 'product/fetchHots'
    })
  }

  addProduct = () => {
    console.log('>>>>>> start addProduct');
    let reducerResult = this.props.dispatch({
      type: 'product/addProduct',
      product: {
        id: 2,
        name: 'iphone 8 plus',
        price: 6999,
      }
    });
    console.log('>>>>>> end addProduct:' + reducerResult);
    console.dir(reducerResult);
    console.log('>>>>>> new state, products.length:' + this.props.products.length);
  };

  render() {
    let {products = []} = this.props;
    return (
      <div className={styles.root}>
        <style jsx>{`
      .user-name {
        font-weight: bold;
      }
    `}</style>
        <ImageView/>
        <div className={'user-name'}>用户名：{this.props.me ? this.props.me.name : '未登录'}</div>
        <div>产品列表</div>
        <button onClick={this.addProduct}>添加产品</button>
        <div>
          {products.map((p, i) => {
            return <div key={i}>{p.name}</div>
          })}
        </div>
      </div>
    );
  }
}


// export default controller((state) => ({
//   me: state.user.me,
//   products: state.product.products
// }))(IndexPage)

// export default Connected;



