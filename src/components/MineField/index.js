/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Campo from '../Campo';

export default (props) => {
  const rows = props.board.map((row, r) => {
    const columns = row.map((field, f) => {
      return (
        <Campo
          {...field}
          onOpen={() => props.onOpenField(r, f)}
          onSelect={() => props.onSelectField(r, f)}
          key={f}
        />
      );
    });
    return (
      <View style={{flexDirection: 'row'}} key={r}>
        {columns}
      </View>
    );
  });

  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
  },
});
