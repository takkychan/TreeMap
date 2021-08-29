import React, { useEffect, useState } from 'react';
import '../styles/TreeMap.css';

function DataItems(weightList, row, index) {
  //set default weight limit
  let weightLimit = weightList.reduce((sum, item) => sum + item.weight) / row;
  if (weightLimit > weightList[0].weight) weightLimit = weightList[0].weight;

  return (
    <div className="data-row" key={index}>
      {weightList.map((item, idx) =>
        DataItem(item.name, item.value, item.weight, idx)
      )}
    </div>
  );
}

function DataItem(name, value, weight, index) {
  return (
    <div id={name} className="data-item" key={index}>
      <div className="name">{name}</div>
      <div className="value"> {value * 100}</div>
    </div>
  );
}

function TreeMap(props) {
  const { data, row } = props;
  const [weightList, setWeightList] = useState('');
  useEffect(() => {
    //initially, make up a sorted list by weight
    setWeightList(
      data.sort((a, b) => {
        if (a.weight > b.weight) return -1;
        if (a.weight < b.weight) return 1;
        return 0;
      })
    );
  }, []);
  return (
    <div className="tree-map-container">
      {[...new Array(row).keys()].map((r, index) => (
        <span>{weightList ? DataItems(weightList, row, index) : ''}</span>
      ))}
    </div>
  );
}

export default TreeMap;
