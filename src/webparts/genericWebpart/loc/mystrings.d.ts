declare interface IGenericWebpartWebPartStrings {

  // 0 - Context
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  PropertyPaneAbout: string;

  // 0 - Context
  DefaultParentListTitle: string; // DO NOT CHANGE THIS IN DIFFERENT LANGUAGES
  DefaultChildListTitle: string; // DO NOT CHANGE THIS IN DIFFERENT LANGUAGES

  // 1 - Analytics options
  analyticsWeb: string;
  analyticsList: string;
  minClickWeb: string;

  // 2 - Source and destination list information

  FieldLabel_ParentListTitle: string;
  FieldLabel_ParentListWeb: string;

  FieldLabel_ChildListTitle: string;
  FieldLabel_ChildListWeb: string;

  // 3 - General how accurate do you want this to be

  // 4 - Info Options

  // 5 - UI Defaults

  // 6 - User Feedback:

  // 7 - Slider Options
  PropPaneGroupLabel_SliderOptions: string; 
  FieldLabel_ShowTimeSlider: string; //
  FieldLabel_TimeSliderInc: string; //
  FieldLabel_TimeSliderMax: string; //

  // 9 - Other web part options
  FieldLabel_ToggleTextOff: string;
  FieldLabel_ToggleTextOn: string;

  FieldLabel_PivSize: string;
  FieldLabel_PivFormat: string;
  FieldLabel_PivOptions: string;

}

declare module 'GenericWebpartWebPartStrings' {
  const strings: IGenericWebpartWebPartStrings;
  export = strings;
}
