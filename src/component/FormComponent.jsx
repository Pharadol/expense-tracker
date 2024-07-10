import "../styles/component/form.css"
import {useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'

const Form=(props)=>{
    const [title,setTitle]=useState('')
    const [amount,setAmount]=useState(0)
    const [formValid,setFormValid]=useState(false)

    const inputTitle=(event)=>{
        setTitle(event.target.value)
    }
    const inputAmount=(event)=>{
        setAmount(event.target.value)
    }
    const saveItem =(event)=>{
        event.preventDefault()
        const itemData ={
            id:uuidv4(),
            title:title,
            amount:Number(amount)
        }
        props.onAddItem(itemData) //call props onAddItem then send itemData to onAddItem props for work in onAddNewItem function
        setTitle('') 
        setAmount(0)
    }

    useEffect(()=>{
        const checkData =title.trim().length>0 && amount!==0 
        setFormValid(checkData)
    },[title,amount],)
 
    return(
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>Order</label>
                    <input type="text" placeholder="enter your order" onChange={inputTitle} value={title} className="text-black" />
                </div>
                <div className="form-control">
                    <label>Amount</label>
                    <input type="number" placeholder="enter amount" onChange={inputAmount} value={amount} className="text-black" />
                    <span className="text-xs text-orange-400">negative integer (with a minus sign) for expense</span>
                </div>
                <div>
                    <button type="submit" className="submit" disabled={!formValid}>submit</button>
                </div>
            </form>
        </div>
    )
}
export default Form