import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { filterProducts, sortProducts } from '../redux/actions/productActions'

const Filter = () => {
   const {items,size,sort,filteredItems} = useSelector(state => state.products)
   const dispatch = useDispatch()
    return (
        <div className='filter'>
            <div className='filter-result'>{items.length} Products</div>
            <div className='filter-sort'>
                Order {" "}
                <select value={sort} onChange={e => dispatch(sortProducts(filteredItems, e.target.value))}>
                    <option value='latest'>Latest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                </select>
            </div>
            <div className='filter-size'>
                Filter {" "}
                <select value={size} onChange={(e) => dispatch(filterProducts(items,e.target.value))}>
                    <option value=''>ALL</option>
                    <option value='XS'>XS</option>
                    <option value='S'>S</option>
                    <option value='M'>M</option>
                    <option value='L'>L</option>
                    <option value='XL'>XL</option>
                    <option value='XXL'>XXL</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
