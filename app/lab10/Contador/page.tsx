import Contador from '@/app/lab10/components/contador/Contador'

let contado = 0;

export default function ContadorPage(){
    return (
        
        <div>
            <h1 className = 'flex justify-center'>Contador</h1>
            <Contador contador={contado}/>
        </div>
    )
}