import React, {  useState } from 'react';
import '../styles/Form.css';
import TreeMap from './TreeMap';

function Form() {
  //data to display:
  const [data, setData] = useState('');
  //data to sumbit
  const [dataToSubmit, setDataToSubmit] = useState('');
  const [numOfRow, setNumOfRow] = useState(1);
  const [dataErr, setDataErr] = useState('');
  const [rowErr, setRowErr] = useState('');
  const [rowToSubmit, setRowToSubmit] = useState({});

  //Data limits
  const ROW_MIN = 1;
  const DATA_LENGTH_MIN = 50;
  const NAME_LENGTH_MIN = 50;

  //Array of Function

  function validateData() {
    let validData;
    if (data) {
      validData = checkValidJson(data);
    }
    if (validData) {
      //check all data attributes' requirement
      if (checkDataAttr(validData)) {
        setDataToSubmit(validData.sort((a, b) => {
          if (a.weight > b.weight) return -1;
          if (a.weight < b.weight) return 1;
          return 0;
        }));
        setDataErr('');
      }
    } else {
      setDataErr('Data should be valid json');
    }
  }

  function checkDataAttr(validData) {
    //check arrayLength
    if (validData.length > DATA_LENGTH_MIN) {
      setDataErr(`Data array should <= ${DATA_LENGTH_MIN}`);
      return false;
    }
    //check data weight is integer
    console.log(validData);
    if (validData.find((_data) => !Number.isInteger(_data.weight))) {
      setDataErr('Weight should be an integer');
      return false;
    }
    //check data less than 50 char
    if (validData.find((_data) => _data.name.length > NAME_LENGTH_MIN)) {
      setDataErr(`Name should <= ${NAME_LENGTH_MIN} char`);
      return false;
    }
    return true;
  }

  function checkValidJson(data) {
    try {
      const parsedData = JSON.parse(data);
      //only accept object type (json)
      return typeof parsedData === 'object' ? parsedData : false;
    } catch (err) {
      console.log('err', err);
      // setDataErr('Data should be valid json');
      return false;
    }
  }

  function validateNumOfRow() {
    if (numOfRow < ROW_MIN) setRowErr('Number of row must >= 1');
    else if (dataToSubmit && numOfRow > dataToSubmit.length) {
      setRowErr('Number of row must < size of array');
    } else {
      setRowToSubmit(numOfRow);
      setRowErr('');
    }
  }

  function buildTreeMap(e) {
    e.preventDefault();
    validateData();
    validateNumOfRow();
  }

 

  return (
    <form className="input-form" onSubmit={buildTreeMap}>
      <p className="description">
        Welcome to BuildATree. You can try to build a TreeMap by providing the
        "Data" and "Row" below.
      </p>
      <div className="input-group">
        <label htmlFor="data">Data</label>
        <textarea
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Data"
        />
        <span className="error">{dataErr || ' '}</span>
      </div>
      <div className="input-group">
        <label htmlFor="numOfRow">Row</label>
        <input
          id="numOfRow"
          type="number"
          value={numOfRow}
          min={ROW_MIN}
          onChange={(e) => setNumOfRow(Number(e.target.value))}
          placeholder="Row"
        />
        <span className="error"> {rowErr || ' '}</span>
      </div>
      <button className="build">Build Now</button>
      {dataToSubmit && !dataErr && !rowErr ? (
        <TreeMap data={dataToSubmit} row={rowToSubmit} />
      ) : (
        ''
      )}
    </form>
  );
}

export default Form;
