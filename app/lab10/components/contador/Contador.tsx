"use client";

import { useState } from "react";

type ContadorProps = {
  contador: number;
}

export default function Contador({contador}: ContadorProps){
    const [valor, setValor] = useState(contador);

   return( <div className='bg-blue-300 p-14 m-14 rounded-xl '>
    <h2 className = 'text-white flex justify-center font-bold text-xl'>{valor}</h2>
     <div className='text-xl flex justify-center font-bold'>
     <button onClick={() => setValor(valor + 1)}>+</button>
     </div>
     <div className='text-xl flex justify-center font-bold'>
     <button onClick={() => setValor(valor - 1)}>-</button>
     </div>
     <div className='text-xl flex justify-center font-bold'>
     <button onClick={() => setValor(0)}>reset</button>
     </div>
    </div>
   )
}
