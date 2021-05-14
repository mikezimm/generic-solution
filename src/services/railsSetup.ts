
export const StatusIcons: IStatusIcons = { plan: 'Edit', process: 'Gear', complete: 'Checkmark', error: 'Warning' };
export const StatusColors: IStatusIcons = { plan: 'black', process: 'blue', complete: 'green', error: 'red' };
export type IStatusIcon = 'Edit'| 'Gear'| 'Checkmark'| 'Warning';
export type IStepPC = 'Plan' | 'Process' | 'Complete' | '' | '';
export type IStepKey = 'plan' | 'process' | 'complete' | 'error' | '';

export interface IStatusIcons {
  plan: string;
  process: string;
  complete: string;
  error: string;
}

export interface IProcessStatus {
  // label: IStepPC;
  key: IStepKey; //should be lower case label IStep
  info: any;
  order?: number;
  result: string;
  success: boolean;
  error?: string;
}

export interface IProcessStep {
  label: string;
  required: boolean;
  stepNo: number;
  dependsOn: string; //Step this step depends on
  value?: string | boolean;
  plan?: IProcessStatus;
  process?: IProcessStatus;
  complete?: IProcessStatus;
  error?: IProcessStatus;
  current: IProcessStatus;
  value1: any; //List Title
  value2: any; //Group Title
  value3: any; //TBD
  value4: any; //TBD 

}


export function shouldDoThisStepBasedOnDependant( currentStep: IProcessStep, newSteps: any ) {

  let doThisStep = true;
  let keyDependsOnThis =  currentStep.dependsOn;
  let dependsOn = keyDependsOnThis && keyDependsOnThis.length > 0 ? true : false ;

  if ( dependsOn === true && newSteps[ keyDependsOnThis ].required !== true ) {
    doThisStep = false;
  }

  return doThisStep;

 }

export function createStep( label: string, planInfo: string , processInfo: string , completeInfo: string , errorInfo: string, required: boolean, stepNo: number, dependsOn: string, value1: any, value2: any, value3: any, value?: string | boolean ) {

  const Step : IProcessStep = {
    label: label,
    required: required,
    stepNo: stepNo,
    dependsOn: dependsOn,
    value: value,
    plan:  {
      key: 'plan',
      info: planInfo,
      order: 0, result: '', success: false, error: '',
    },
    process:  {
      key: 'process',
      info: processInfo,
      order: 1, result: '', success: false, error: '',
    },
    complete:  {
      key: 'complete',
      info: completeInfo,
      order: 2, result: '', success: false, error: '',
    },
    error:  {
      key: 'error',
      info: errorInfo,
      order: 3, result: '', success: false, error: '',
    },
    current:  {
      key: 'plan',
      info: planInfo,
      order: 0, result: '', success: false, error: '',
    },
    value1: value1 ? value1 : '', //List Title
    value2: value2 ? value2 : '', //Group Title
    value3: value3 ? value3 : '', //Group ID
    value4: '', //ParentGroupID
  };
  return Step;

} 