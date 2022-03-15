// O único import necessário no painel foi o seu próprio CSS para estilização
import "./Panel.css"

// Componente panel
export function Panel(props){
    // Retornando os componentes utilizados no painel da calculadora
    return(
        <div>
            <h1 className = "system">{props.system}</h1>
            <h1 className = "oldNumbers">{props.num1} {props.operator}</h1>
            <h1 className="resultPanel">{props.num2}</h1>    
        </div>

    );
}