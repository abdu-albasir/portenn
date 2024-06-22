import Header from '../components/Header';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import sorts from '../data/sort.json'
import { Skeleton } from '../components/PizzaSceleton';


const colors = [
    'green', 'blue', 'orange', 'yellow', 'red'
]
function HomePage() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)
    const [query, setQuery] = useState('')
    const [pizzas, setPizzas] = useState([])
    const [status, setStatus] = useState('idle')
    const [curenCaategory, setCurenCaategory] = useState(1)
    const [curentSorts, setCurentSorts] = useState(1)
    const [color, setColor] = useState('green')
    const [curentColors, setCurentColors] = useState(0)

    const fetchPizzas = async () => {
        setStatus('pending')
        const sort = sorts[curentSorts].value.replace('-', '')
        const oreder = sorts[curentSorts].value.includes('-') ? 'asc' : 'desc'
        const url = new URL(`https://6367b246edc85dbc84d9ba5d.mockapi.io/products`)
        url.searchParams.append('category', curenCaategory)
        url.searchParams.append('sortBy', sort)
        url.searchParams.append('order', oreder)
        url.searchParams.append('title', query)
        try {
            const response = await fetch(url)
            if (!response.ok, response.status === 404) {
                setStatus('error')
                return new Error('ERROR')

            }
            const result = await response.json()
            setPizzas(result)
            setStatus('succses')
        } catch (error) {
            setStatus('error')
            return new Error('ERROR')
        }
    }

    useEffect(() => {
        fetchPizzas()
    }, [curenCaategory, curentSorts, query])

    
    const pizzasComponent = {
        succses:
            pizzas?.map((item) =>
                <PizzaBlock
                    price={item.price}
                    title={item.title}
                    img={item.image}
                    key={item._id} />),
        pending:
            <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </>,
        idle: <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </>,
        error: <>
            <img src="https://web-promo.ua/wp-content/uploads/2023/06/e11044b915dc39afc3004430606bd6d1.jpg" alt="" />
        </>
    }
    return (
        <div
            style={isDarkMode ? { background: colors[curentColors] } : {}}
            className="wrapper"
        >
            <Header setQuery={setQuery} />
            <button onClick={() => setCurentColors(prev => {
                if (prev < colors.length) {
                    return prev + 1
                } else if (prev === colors.length) {
                    return prev = 0
                }
            })} className='button'>color</button>
            <br /><br />
            <button onClick={toggleTheme}>clicl</button>

            {
                colors.map((color) =>
                    <button
                        onClick={() => setColor(color)}
                        style={{ background: color }}>
                        color
                    </button>)
            }
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories curent={curenCaategory} setCurent={setCurenCaategory} />
                        <Sort curent={curentSorts} sorts={sorts} setCurent={setCurentSorts} />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzasComponent[status]}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default HomePage;