import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';

const sorts = [{
  id: 1,
  value: 'rating',
  name: 'популярности (DESC)'
},
{
  id: 2,
  value: '-rating',
  name: 'популярности (ASC)'
},
{
  id: 3,
  value: 'price',
  name: 'цене (DESC)'
},
{
  id: 4,
  value: '-price',
  name: 'цене (ASC)'
},
{
  id: 5,
  value: 'title',
  name: 'алфавиту (DESC)'
},
{
  id: 6,
  value: '-title',
  name: 'алфавиту (ASC)'
}
]

function App() {
  const [pizzas, setPizzas] = useState(null)
  const [loading, setLoading] = useState(false)
  const [curenCaategory, setCurenCaategory] = useState(1)
  const [curentSorts, setCurentSorts] = useState(1)


  useEffect(() => {

    const sort = sorts[curentSorts].value.replace('-', '')
    const oreder = sorts[curentSorts].value.includes('-') ? 'asc' : 'desc'
    const url = new URL(`https://6367b246edc85dbc84d9ba5d.mockapi.io/products`)
    url.searchParams.append('category', curenCaategory)
    url.searchParams.append('sortBy', sort)
    url.searchParams.append('order', oreder)

    const fetchPizzas = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          new Error('ERROR')
        }
        const result = await response.json()
        setPizzas(result)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetchPizzas()

  }, [curenCaategory, curentSorts])

  return (
    <div className="wrapper" >
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories curent={curenCaategory} setCurent={setCurenCaategory} />
            <Sort curent={curentSorts} sorts={sorts} setCurent={setCurentSorts} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas?.map((item) => <PizzaBlock price={item.price} title={item.title} img={item.image} key={item._id} />)
            }
          </div>
        </div>
      </div>

    </div >
  )
}

export default App;