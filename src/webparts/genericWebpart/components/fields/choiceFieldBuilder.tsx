

import * as React from 'react';

import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import styles from '../GenericWebpart.module.scss';

import { IFieldDef } from './fieldDefinitions';

export function createAdvancedContentChoices( selectedKey: string, _onChange){

  let options : IChoiceGroupOption[] = [];
  let choiceSpacer = '\u00A0\u00A0';
  let spacer4x = choiceSpacer + choiceSpacer + choiceSpacer + choiceSpacer;
  let spacer3x = choiceSpacer + choiceSpacer + choiceSpacer;
  options.push(  {key: 'normal', text: 'Normal' + spacer3x });
  options.push(  {key: 'advanced', text: 'Advanced' + spacer3x });
  options.push(  {key: 'crazy', text: 'Crazy' + spacer3x });

  return (
    
    <ChoiceGroup
      // className = "inlineflex" //This didn't do anything
      //className="defaultChoiceGroup" //This came with the example but does not seem to do anything
      //https://github.com/OfficeDev/office-ui-fabric-react/issues/8079#issuecomment-479136073
      styles={{ flexContainer: { display: "flex" , paddingLeft: 30} }}
      selectedKey={ selectedKey }
      options={options}
      onChange={_onChange}
      label='' 
      required={true}
    />
  );
}

/*
Entry Type Choices need to match these:  \src\services\propPane\WebPartSettingsPage.ts

    public defaultTimePickerChoices: IPropertyPaneDropdownOption[] = <IPropertyPaneDropdownOption[]>[
        {   index: 0,   key: 'sinceLast', text: "Since last entry"  },
        {   index: 1,   key: 'slider', text: "Slider - use Now as start or end"  },
        {   index: 2,   key: 'manual', text: "Manual enter start and end"  },
    ];

*/

export function creatEntryTypeChoices(selectedKey: string, _onChange){

  let options : IChoiceGroupOption[] = [];
  let choiceSpacer = '\u00A0\u00A0';
  let spacer4x = choiceSpacer + choiceSpacer + choiceSpacer + choiceSpacer;
  options.push(  {key: 'start', text: 'Start' + spacer4x });
  options.push(  {key: 'sinceLast', text: 'Since last' + spacer4x });
  options.push(  {key: 'slider', text: 'Slider' + spacer4x });
  options.push(  {key: 'manual', text: 'Manual' + choiceSpacer });

  return (
    <ChoiceGroup
      // className = "inlineflex" //This didn't do anything
      //className="defaultChoiceGroup" //This came with the example but does not seem to do anything
      //https://github.com/OfficeDev/office-ui-fabric-react/issues/8079#issuecomment-479136073
      styles={{ flexContainer: { display: "flex" , paddingLeft: 30} }}
      selectedKey={ selectedKey }
      options={options}
      onChange={_onChange}
      label="Time entry mode"
      required={true}
    />
  );
}

export function creatChartChoices( selectedKey: string, _onChange){

  let options : IChoiceGroupOption[] = [];
  let choiceSpacer = '\u00A0\u00A0';
  let spacer4x = choiceSpacer + choiceSpacer + choiceSpacer + choiceSpacer;
  options.push(  {key: 'numbers', text: 'Numbers' + spacer4x });
  options.push(  {key: 'snapShot', text: 'Snapshot' + spacer4x });
  options.push(  {key: 'longTerm', text: 'Long Term' + spacer4x });
  options.push(  {key: 'story', text: 'Story' + spacer4x });
  options.push(  {key: 'usage', text: 'Usage' + choiceSpacer });


  return (
    <ChoiceGroup
      // className = "inlineflex" //This didn't do anything
      //className="defaultChoiceGroup" //This came with the example but does not seem to do anything
      //https://github.com/OfficeDev/office-ui-fabric-react/issues/8079#issuecomment-479136073
      //      styles={{ flexContainer: { display: "flex" , paddingRight: 30} }}
      styles={{ flexContainer: { display: "flex" , paddingRight: 30} }}
      selectedKey={ selectedKey }
      options={options}
      onChange={_onChange}
      label='' 
      required={true}
    />
  );
}



export function creatInfoChoices( selectedKey: string, options : IChoiceGroupOption[], _onChange){

  let choiceSpacer = '\u00A0\u00A0';
  let spacer4x = choiceSpacer + choiceSpacer + choiceSpacer + choiceSpacer;

  let pageContent = null;
  //Add spacer to text
  if ( options.length > 0 ) {

    if ( options[0].text.indexOf( choiceSpacer ) < 0 && options[0].text.indexOf( spacer4x ) < 0 ) {
      options.map( (o, index) => {
        let ending = index < options.length -1 ? spacer4x : "";
        o.text += ending;
      });
    }

    pageContent = <ChoiceGroup
      // className = "inlineflex" //This didn't do anything
      //className="defaultChoiceGroup" //This came with the example but does not seem to do anything
      //https://github.com/OfficeDev/office-ui-fabric-react/issues/8079#issuecomment-479136073
      styles={{ flexContainer: { display: "flex" , paddingLeft: 0} }}
      selectedKey={ selectedKey }
      options={options}
      onChange={_onChange}
      label='' 
      required={true}
    />;

  }

  return pageContent ;
}

/*
function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}
*/