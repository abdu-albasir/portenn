import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';



function App() {
  const [pizzas, setPizzas] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const url = new URL('https://6367b246edc85dbc84d9ba5d.mockapi.io/products')

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

  }, [])
  console.log(pizzas);
  return (
    <div className="wrapper" >
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas?.map((item) => <PizzaBlock title={item.title} img={item.image} key={item._id} />)
            }


          </div>
        </div>
      </div>
    </div >
  )
}

export default App;