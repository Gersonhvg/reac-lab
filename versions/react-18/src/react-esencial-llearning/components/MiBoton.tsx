import React from 'react'

type MiBotonProps = {
    texto: string;
    texto2?: string; // Opcional si no siempre lo envías
};

const MiBoton = ({texto, texto2}:MiBotonProps) => {

    return (
        <>
            <div>Renderizando desde MiBoton.tsx</div>
            <p>{texto}</p>
            <p>{texto2}</p>
            <button 
                onClick={() => { alert('¡Hola, mundo!')}}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Haz clic aquí
            </button>
        </>
  )
}

export default MiBoton

/*
Existen varias alternativas para recibir propiedades en un componente de React sin necesidad de crear un type explícito en TypeScript:

Usar any como tipo de props
No es recomendable porque pierdes las ventajas del tipado, pero funciona:
const MiBoton = (props: any) => {
  const { texto } = props;
  // ...
}

Usar React.FC (FunctionComponent) y tipado implícito
Puedes omitir el type y dejar que TypeScript infiera los tipos (aunque perderás autocompletado y validación):
const MiBoton: React.FC<any> = (props) => {
  // props.texto
}


No tipar los props (solo en JavaScript o TypeScript con : any)
Si usas JavaScript puro, simplemente recibes el objeto:
const MiBoton = (props) => {
  // props.texto
}


Desestructurar directamente en el argumento sin tipo
const MiBoton = ({ texto }) => {
  // texto
}


Definir la interfaz inline (en el argumento)
const MiBoton = ({ texto }: { texto: string }) => {
    //text
}


Resumen:

Puedes usar any, omitir el tipo, o definir el tipo inline en el argumento.
Sin embargo, definir un type o interface es la forma más clara y segura en TypeScript.
Las alternativas pueden ser útiles para componentes pequeños, prototipos o cuando el tipado estricto no es necesario.
---

La mejor práctica en TypeScript es definir un type o interface para las props del componente. Esto te da autocompletado, validación de tipos y hace tu código más claro y mantenible. Por ejemplo:
type MiBotonProps = {
  texto: string;
  texto2?: string; // Opcional si no siempre lo envías
};

const MiBoton = ({ texto, texto2 }: MiBotonProps) => {
  // ...
}

*/