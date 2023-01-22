import React, { useState } from 'react';
import Income from './Income';
import './Incomes.scss';

const Incomes = props => {

    return (
        <>
            <h1 className="incomes-header">Incomes</h1>
            <div className="incomes-total">Total: {props.total}</div>
            <div className='incomes'>
                {props.items.map((income) => (
                    <Income
                        key={income.id}
                        id={income.id}
                        type={income.type}
                        date={income.date}
                        amount={income.amount}
                        onRemove={props.onRemove}
                    />
                ))}        
            </div>
        </>
    );
}
export default Incomes;