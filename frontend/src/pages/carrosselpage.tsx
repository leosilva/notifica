import { CarrosselData } from '../components'
import { useEffect, useState } from 'react'

interface MyInfoProps {
    id: number;
    titulo: string;
    sumario: string;
    link: string | null;
    imagem: string | null;
}


export function Carrossellayout() {
    const [dados, setDados] = useState<MyInfoProps[]>([]);

    useEffect(() => {
        async function handleData() {
            try {
                const response = await fetch("http://localhost:8000/api/carrossel/");
                const data = await response.json();

                console.log(data);

                setDados(data);

            } catch (error) {
                console.log(error);
            }
        }

        handleData();
    }, []);
    
    return (
        <div>
            {dados.length > 0 && <CarrosselData info={dados} />}
        </div>
    )
}
