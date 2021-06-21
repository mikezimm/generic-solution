

import * as strings from 'GenericWebpartWebPartStrings';
/**
 * This is separte to prevent infinate loop and is needed to log any errors to a list.
 */

// @param traceString :  Format = webpart|analyticsWeb|analyticsList|result|text1|text2|text3|number1|number2
export const BaseErrorTrace = `Easy Contents|${ strings.analyticsWeb }|${ strings.analyticsListErrors }`;