import React from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {useSelector} from "react-redux";
import {selectCartItemById} from "../redux/cart/selectors";
import {getAppVersion} from "../LocalStorage/GetAppVersion";
import {CartItem} from "../redux/cart/types";
import {addItem} from "../redux/cart/slice";
import {useAppDispatch} from "../redux/store";

const typeNames = ['тонкое', 'традиционное'];

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
  }>();

  const dispatch = useAppDispatch();
  const appVersion = getAppVersion();
  const {id} = useParams();
  const cartItem = useSelector(selectCartItemById(id as string));
  const navigate = useNavigate();

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    if (!pizza || !id) {
      return
    }

    const item: CartItem = {
      id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[0],
      size: pizza.sizes[0],
      count: 0,
    };

    dispatch(addItem(item));
  };

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://pizza.nikitalieonov.repl.co/item/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza || !id) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
      {
        false ? <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button> : null
      }
    </div>
  );
};

export default FullPizza;
