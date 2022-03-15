// Imports relacionados a estilização da calculadora
import './Calculator.css'
import { Buttons } from "./Components/Buttons"
import Container from "@mui/material/Container"
import { Box } from "@mui/system";
import { Panel } from "./Components/Panel"
// Utilização de state para as constantes da calculadora
import { useState } from 'react';
// Tecnologia utilizada para criação dos popups: SweetAlert 2
import Swal from 'sweetalert2'
// Tecnologia utilizada para a requisição get da API: axios
import axios from 'axios';

export function Calculator() {
  const [oldnum, setOldNum] = useState(0);
  const [newNum, setNewNum] = useState(0)
  const [operator, setOperator] = useState('');
  const [actualSystem, setSystem] = useState(8);
  var system = ""

  // Função para modificar o tipo de sistema numérico apresentado no resultado da calculadora
  function changeNumberSystem(){
    Swal.fire({
      title: 'Select one number system',
      input: 'select',
      inputOptions: {
        2: 'Binary',
        8: 'Octal',
        10: 'Decimal'
      },
      inputPlaceholder: 'Select',
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== '') {
            resolve();
          } else {
            resolve('You need to select a number system');
          }
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        var decimal = parseInt(newNum, actualSystem)
        setNewNum((decimal >>> 0).toString(result.value))
        setSystem(result.value)
        Swal.fire({
          icon: 'success',
          title: 'Number system changed with success' 
        });
      }
    })
  }

  // Função para envio do SMS com a resposta da calculadora que, ao final, envia um popup informando o envio da mensagem
  function SMSClick(){

    Swal.fire({
        title: 'Insert your phone number to receive the final answer',
        icon: 'info',
        text: 'Ex: 5531XXXXX-XXXX',
        input: 'text',
        inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                resolve('You need to insert a phone number');
              }
            });
          }
     }).then((result) => {
        if (result.isConfirmed) {
            axios.get("https://wapi.appclientefiel.com.br/rest/comum/EnviarWhats/"+ result.value +"/Calculadora/" + newNum +"").then((response) => {
                if(response.status == 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Message sent successfully' 
                    });
                }
            });
        }
     });
  }

  // Função que utiliza como base o operador já inserido para realizar os cálculos da calculadora
  function calculate(){
    // Para fazer qualquer cálculo é necessário antes transformar em decimal, realizar o cálculo
    // para então tranformar na base requisitada
    switch(operator){
      case "+":
        var result = parseInt(oldnum, 8) + parseInt(newNum, 8)
        setNewNum(result.toString(8));
        break;
      
      case "-":
        var result = parseInt(oldnum, 8) - parseInt(newNum, 8)
        setNewNum(result.toString(8));
        break;
      
      case "x":
        var result = parseInt(oldnum, 8) * parseInt(newNum, 8)
        setNewNum(result.toString(8));
        break;

      case "÷":
        var result = parseInt(oldnum, 8) / parseInt(newNum, 8)
        result = parseFloat(result.toString(8));
        var resultFixed = result.toFixed(2);
        setNewNum(resultFixed);
        break;
    }
  }

  // Função utilizada para aquisição do botão apertado e realização da função relativa a ele
  const inputNum = (input) => {
    if(actualSystem == 8 || input == "SMS"){
      if(isNaN(input)){
        switch(input){
          case "C":
            setNewNum(0);
            setOldNum(0);
            setOperator('');
            break;
          case "=":
            if(operator != '')
              calculate()
            break;
          case "SMS":
            SMSClick()
            break;
          default:
            setOperator(input);
            setOldNum(newNum);
            setNewNum(0);
        }
      }else{
        if (newNum === 0) {
          setNewNum(parseInt(input));
        } else {
          setNewNum(newNum + input);
        }
      }
    }else{
      // Para realizar qualquer operação é necessário que o usuário volte ao sistema octal
      Swal.fire('Change to the number system Octal', '', 'error')
    }
  }

  if(actualSystem == 2){
    system = "Binary"

  }else if(actualSystem == 8){
    system = "Octal"
  }else{
    system = "Decimal"
  }

  return(
    <div id = "All">
      <div className = "header">
        <Container maxWidth="xs">
          <h1>Octal Calculator <button onClick = {changeNumberSystem} className = 'change'><span className="material-icons">
      autorenew
    </span></button></h1>
        </Container>
      </div>
      <Box m={4} />
      <Container maxWidth="xs">
        <div className = "calc">

          <Panel system = {system} operator = {operator} num1 = {oldnum} num2 = {newNum}/>
          <Buttons getInputNum = {inputNum} num1 = {newNum}/>

        </div> 
      </Container>
    </div>
  )
}
