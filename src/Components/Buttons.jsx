// Imports utilizados para os botões: apenas o CSS dos mesmos
import "./Buttons.css"

// Componente dos botões da calculadora
export function Buttons({getInputNum}){

    // Constante utilizada para criar os botões de forma dinâmica
    const buttons = ["+", "-", "x", "÷", "7", "6", "5", "4", "3", "2", "1", "0", "=", "C"]

    return(
        <div>
            {
                buttons.map(button => {
                return <button key={button} value={button} onClick = {() => getInputNum(button)} className = "button"> {button} </button>
            })}
            {/* Botão criado de forma diferente por conta de sua estilização */}
            <button id = "SMS" className = "SMS" onClick = {() => getInputNum("SMS")}> Send SMS </button>
        </div>
    );
}



