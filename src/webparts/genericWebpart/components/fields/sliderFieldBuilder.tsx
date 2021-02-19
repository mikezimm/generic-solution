

import * as React from 'react';

import {IGenericWebpartState, } from '../IGenericWebpartState';

import { ILink, IUser, } from '@mikezimm/npmfunctions/dist/IReUsableInterfaces';

import { IGenericWebpartProps } from '../IGenericWebpartProps';

import { Slider, ISliderProps } from 'office-ui-fabric-react/lib/Slider';

import styles from '../GenericWebpart.module.scss';


export function createSlider(parentProps:IGenericWebpartProps , parentState: IGenericWebpartState, _onChange){

let parentStatecurrentTimePicker = 'parentState.currentTimePicker';
let parentPropstimeSliderMax = 0; //parentState.timeSliderMax';
let parentStatetimeSliderValue = 0; //'parentState.timeSliderValue';
let parentPropstimeSliderInc = 0; //'parentProp.stimeSliderInc;'
  if ( parentStatecurrentTimePicker !== 'slider') { return ""; }
  let maxTime = parentPropstimeSliderMax;
  return (
    <div style={{minWidth: 400, }}>
      <Slider 
      label={ ((parentStatetimeSliderValue < 0)  ? "Start time is in the past" : "End time is Back to the future" ) }
      min={ -1 * maxTime } 
      max={ maxTime } 
      step={ parentPropstimeSliderInc } 
      defaultValue={ 0 } 
      valueFormat={value => `${value} mins`}
      showValue 
      originFromZero
      onChange={_onChange}
     />

    </div>

  );

}

/*
function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}
*/