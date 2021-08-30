import React, { useEffect, useState } from 'react';
import '../styles/TreeMap.css';

function DataItems(props) {
  const { items, limit, index } = props;
  console.log('items', items);
  console.log('dataitemRowLimit', limit);
  return (
    <div className="data-row" key={index}>
      {items.map((item, idx) => (
        <DataItem
          name={item.name}
          value={item.value}
          weight={item.weight}
          limit={limit}
          index={idx}
        />
      ))}
    </div>
  );
}

function DataItem(props) {
  const { name, value, weight, limit, index } = props;
  const valueInPercentage = value * 100;
  console.log('weightLimitweightLimit', limit);
  return (
    <div
      id={name}
      className="data-item"
      key={index}
      style={{
        backgroundColor: valueInPercentage < 0 ? '#d21404' : '#85C285',
        maxWidth: `${(weight / limit) * 100}%`,
        width: '100%',
      }}
    >
      <div className="name">{name}</div>
      <div className="value"> {valueInPercentage}</div>
    </div>
  );
}

function TreeMap(props) {
  const { data, row } = props;
  const [weightList, setWeightList] = useState(data);
  //set default weight limit
  const [weightLimit, setWeightLimit] = useState(
    Math.ceil(data?.reduce((sum, item) => sum + item?.weight, 0) / row)
  );

  function printRowItems() {
    let tree = [];
    [...new Array(row).keys()].reduce((pointer, r) => {
      let countLimit = weightLimit;
      let rowItems = [];
      for (let i = pointer; i < weightList.length; i++) {
        console.log('countLimit', countLimit);
        console.log('data[i].weight', weightList[i].weight);
        if (weightList[i].weight <= countLimit && countLimit > 0) {
          rowItems.push(weightList[i]);
          countLimit -= weightList[i].weight;
        }
      }
      console.log('rowItems', rowItems);
      tree.push(rowItems);
      console.log('pointer', pointer);
      return pointer + rowItems.length;
    }, 0);
    return tree;
  }

  useEffect(() => {
    console.log('data', data);
    console.log('weightLimit', weightLimit);
    setWeightLimit(
      Math.ceil(data?.reduce((sum, item) => sum + item?.weight, 0) / row)
    );
    if (data[0]?.weight > weightLimit) setWeightLimit(data[0]?.weight);
  }, [data]);

  return (
    <div className="tree-map-container">
      {printRowItems().map((row, index) => (
        <DataItems items={row} limit={weightLimit} index={index} />
      ))}
    </div>
  );
}

export default TreeMap;
