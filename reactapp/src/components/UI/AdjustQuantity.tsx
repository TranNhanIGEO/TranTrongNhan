import { FC } from 'react'
import { AdjustQuantityProps } from './types/adjustQuantityTypes'

const AdjustQuantity: FC<AdjustQuantityProps> = ({ id, quantity, onQuantityChange, onDecreaseQuantity, onIncreaseQuantity }) => {
  return (
    <div className='d-flex align-items-center'>
      <button className='border' style={{ width: 32, height: 32 }} onClick={onDecreaseQuantity}>-</button>
      <input className='border text-center' type='number' id={id} value={quantity} style={{ width: 54, height: 32 }} onChange={onQuantityChange} />
      <button className='border' style={{ width: 32, height: 32 }} onClick={onIncreaseQuantity}>+</button>
    </div>
  )
}

export default AdjustQuantity