import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';

const App = () => {
  const [turn, setTurn] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('');
  const [scoreless, setScoreless] = useState(false);
  let [countX, setCountX] = useState(0);
  let [countO, setCountO] = useState(0);



  
  const handleClick = (num) => {
    let squares = [...cells];    

    if (winner !== '' || scoreless) {
      
      return;

    } else {

      if (cells[num] !== "") {
        alert("This box has been used");
        return;
      }
      
      if (turn === 'X') {
        squares[num] = 'X';
        setTurn('O');
      } else if (turn === 'O') {
        squares[num] = 'O';
        setTurn('X');
      }

      setCells(squares); 
      
      if (winner !== '') {
        return;
      } else {
        checkForScoreless(squares);
      }

    }

    checkForWinner(squares);
    
  }

  
  const checkForWinner = (squares) => {

    let combos = {

      across: [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8']
      ],

      down: [
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8']
      ],

      diagnol: [
        ['0', '4', '8'],
        ['2', '4', '6']
      ]
    };




    for (let combo in combos) {
      combos[combo].forEach((pattern) => {


        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''
        ) {


        }

        else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {

          setWinner(squares[pattern[0]]);
          alert('The winner is ' + squares[pattern[0]])


          if (squares[pattern[0]] === 'X') {
            setCountX(Number(countX) + 1);
          } else {
            setCountO(Number(countO) + 1)
          };
        }
      }
      )
    };
  }

  const checkForScoreless = (e) => {
    if (e.indexOf('') === -1) {
      setScoreless(true);
      alert('The game is scoreless'); 
      return; 
    }
  }

  const handleRestart = () => {
    setWinner('');
    setCells(Array(9).fill(''));
    setTurn('X');
    setScoreless(false);
  }

  const Cell = ({ num }) => {

    return (
      <Pressable
        onPress={() => {
          handleClick(num);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#B91646' : '#105652'
          },

          styles.cells
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {cells[num]}
          </Text>
        )}
      </Pressable>
    )
  }

  return (

    <View style={styles.container}>

      <View style={[{ flex: 1 }]}>
        <Text style={[{ color: 'black', fontSize: 40 }]}>
          Turn : {turn}
        </Text>
      </View>

      <View style={[{ flex: 5 }]}>

        <View style={[{ flex: 1, flexDirection: 'row' }]}>
          <Cell id="0" num={0} />
          <Cell id="1" num={1} />
          <Cell id="2" num={2} />
        </View>
        <View style={[{ flex: 1, flexDirection: 'row' }]}>
          <Cell id="3" num={3} />
          <Cell id="4" num={4} />
          <Cell id="5" num={5} />
        </View>
        <View style={[{ flex: 1, flexDirection: 'row' }]}>
          <Cell id="6" num={6} />
          <Cell id="7" num={7} />
          <Cell id="8" num={8} />
        </View>
      </View>

      <View style={[{ flex: 1 }]}>
        <Text style={[{ color: 'black', textAlign: 'center', fontSize: 30 }]}>
          Points</Text>
        <Text style={[{ color: 'black', textAlign: 'center', fontSize: 25 }]}>
          X : {countX}      O : {countO}
        </Text>

      </View>

      <View style={[{ flex: 1, flexDirection: 'row' }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleRestart();
            setCountX(0);
            setCountO(0);
          }}
        >
          <Text style={[{
            color: '#DFD8CA', fontSize: 20, textAlign: 'center', fontFamily: 'Arial, Helvetica, sans-serif',
          }]}>Reset Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleRestart();
          }}
        >
          <Text style={[{
            color: '#DFD8CA', fontSize: 20, textAlign: 'center', fontFamily: 'Arial, Helvetica, sans-serif',
          }]}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    backgroundColor: '#DFD8CA'
  },

  text: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: '700',
    color: '#DFD8CA',
    fontFamily: 'Arial, Helvetica, sans-serif'
  },

  cells: {
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    height: 100,
    width: 100,
    fontFamily: 'Arial, Helvetica, sans-serif'
  },

  button: {
    margin: 20,
    backgroundColor: '#105652',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 5,
    height: '80%',
    width: '40%',
    fontFamily: 'Arial, Helvetica, sans-serif'
  }

});

export default App;