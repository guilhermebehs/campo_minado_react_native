import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';
import {
  createMinedBoard,
  cloneBoard,
  hadExplosion,
  openField,
  wonGame,
  showMines,
  flagsUsed,
  invertFlag,
} from './src/logica';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  createState = () => {
    const rows = params.getRowsAmount();
    const cols = params.getColumnsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    };
  };

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert('Perdeeeu!');
    }
    if (won) {
      Alert.alert('Ganhooou!');
    }

    this.setState({board, lost, won});
  };

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);
    if (won) {
      Alert.alert('Perdeeeu');
    }
    this.setState({board, won});
  };

  onLevelSelected = (level) => {
    params.difficultLevel = level;
    console.log('Selecionado')
    this.setState(this.createState());
  };

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const cols = params.getColumnsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  render() {
    return (
      <View style={styles.container}>
        <LevelSelection
          isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({showLevelSelection: false})}
        />
        <Header
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onFlagPress={() => this.setState({showLevelSelection: true})}
          onNewGame={() => this.setState(this.createState())}
        />
        <View style={styles.board}>
          <MineField
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}
            board={this.state.board}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
