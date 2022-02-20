import React from "react";
import { useState } from "react";
import { InputDegree } from "./InputDegree";
import configData from "../config.json"

export const ManualControl = () => {
  const encoder = new TextEncoder()

  const [xValue, setXValue] = useState(90);
  const [yValue, setYValue] = useState(90);
  const onXChange = (e) => {
    setXValue(e.target.value);
  }
  const onYChange = (e) => {
    setYValue(e.target.value);
  }

  const [characteristic, setCharacteristic] = useState(null);
  const onPair = async (e) => {
    if (!navigator.bluetooth) {
      alert("This web browser doen't suport web bluetooth!");
      setDevice(null)
    }
    else {
      // https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth
      // https://web.dev/bluetooth/
      const device = await navigator.bluetooth.requestDevice({
        filters: [{name: configData.DEVICE_NAME}],
        acceptAllDevices: false
      })
      await device.gatt.connect();
      const service = await device.gatt.getPrimaryService(configData.SERVICE_UUID);
      const characteristic = await service.getCharacteristic(configData.CHARACTERISTIC_UUID)
      setCharacteristic(characteristic);
    }
  }

  const onSubmit = (e) => {
    if(!characteristic) {
      alert("Bluetooth not paired!");
    }
    else {
      const msg = {
        x: xValue,
        y: yValue,
        priority: 0
      }
      characteristic.writeValue(encoder.encode(JSON.stringify(msg)))
    }
  }

  return (
    <div>
        <InputDegree name="x" value={xValue} onChange={onXChange}/>
        <InputDegree name="y"value={yValue} onChange={onYChange}/>
        <input type="button" value="Pair" onClick={onPair} />
        <input type="button" value="Got to" onClick={onSubmit} />
    </div>
  );
};
