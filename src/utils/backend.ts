
const pizzaData = [
  {
    "id": 0,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg",
    "title": "Пепперони Фреш с перцем",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 803,
    "category": 0,
    "rating": 4
  },
  {
    "id": 1,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
    "title": "Сырная",
    "types": [0],
    "sizes": [26, 40],
    "price": 245,
    "category": 0,
    "rating": 6
  },
  {
    "id": 2,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
    "title": "Цыпленок барбекю",
    "types": [0],
    "sizes": [26, 40],
    "price": 295,
    "category": 1,
    "rating": 4
  },
  {
    "id": 3,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg",
    "title": "Кисло-сладкий цыпленок",
    "types": [1],
    "sizes": [26, 30, 40],
    "price": 275,
    "category": 2,
    "rating": 2
  },
  {
    "id": 4,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    "title": "Чизбургер-пицца",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 415,
    "category": 3,
    "rating": 8
  },
  {
    "id": 5,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg",
    "title": "Крэйзи пепперони",
    "types": [0],
    "sizes": [30, 40],
    "price": 580,
    "category": 2,
    "rating": 2
  },
  {
    "id": 6,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
    "title": "Пепперони",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 675,
    "category": 1,
    "rating": 9
  },
  {
    "id": 7,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
    "title": "Маргарита",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 450,
    "category": 4,
    "rating": 10
  },
  {
    "id": 8,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
    "title": "Четыре сезона",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 395,
    "category": 5,
    "rating": 10
  },
  {
    "id": 9,
    "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/30367198-f3bd-44ed-9314-6f717960da07.jpg",
    "title": "Овощи и грибы 🌱",
    "types": [0, 1],
    "sizes": [26, 30, 40],
    "price": 285,
    "category": 5,
    "rating": 7
  }
];

// Роут для получения данных с учетом параметров запроса
export const getPizzas = (query: any) => {
  const { page, limit, category, sortBy, order, search } = query;

  // Примените фильтрацию и сортировку данных с учетом параметров
  let filteredPizzas = [...pizzaData];

  // Фильтрация по категории
  if (category) {
    filteredPizzas = filteredPizzas.filter(pizza => pizza.category === parseInt(category));
  }

  // Фильтрация по поиску
  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filteredPizzas = filteredPizzas.filter(pizza => searchRegex.test(pizza.title));
  }

  // Сортировка
  if (sortBy && order) {
    // @ts-ignore
    filteredPizzas.sort((a, b) => {
            // @ts-ignore

      const aValue = a[sortBy];
    // @ts-ignore

      const bValue = b[sortBy];
      if (order === 'asc') {
        return aValue - bValue;
      } else if (order === 'desc') {
        return bValue - aValue;
      }
    });
  }

  // Пагинация
  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    filteredPizzas = filteredPizzas.slice(startIndex, endIndex);
  }

  return(filteredPizzas);
}

export const getPizza = (id: any) => {
  const itemId = parseInt(id); // Получаем id из параметра запроса

  // Находим элемент в массиве по id
  const item = pizzaData.find(pizza => pizza.id === itemId);

  if (!item) {
    // Если элемент не найден, отправляем статус 404 (Не найдено)
    return ;
  }

  // Если элемент найден, отправляем его в ответе
  return item;
};
