import * as React from 'react';

//https://stackoverflow.com/a/2970667/4210807
export function camelize(str,firstCap: boolean) {

    if ( str == null ) { return ''; }
    else {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, 
            (word, index) => {
                if ( firstCap ) {   //Use this flavor for CamelCase
                    return index == 0 ? word.toUpperCase() : word.toUpperCase();
                } else {    //Use this flavor for camelCase
                    return index == 0 ? word.toLowerCase() : word.toUpperCase();
                } 
            }).replace(/\s+/g, '');
    }
}

/**
 * SharePoint automatically removes characters from library names
 * 
 * @param str
 */
export function cleanSPListURL( str : string ) {
  return str.replace(/\s\%\&\?\.\+/g, '');

}

//Sample to convert to arrow function
//const sum1 = function(list, prop){ return list.reduce( function(a, b){ return a + b[prop];}, 0);}
//const sum2 = (list,prop) =>  { return list.reduce((a,b) => {return (a+ b[prop])}, 0);}

export function cleanURL(originalURL: String) {

    let newURL = originalURL.toLowerCase();
    if ( newURL.indexOf('/sitepages/') > 0 ) { return newURL.substring(0, newURL.indexOf('/sitepages/') + 1) ; }
    if ( newURL.indexOf('/lists/') > 0 ) { return newURL.substring(0, newURL.indexOf('/lists/') + 1) ; }
    if ( newURL.indexOf('/siteassets/') > 0 ) { return newURL.substring(0, newURL.indexOf('/siteassets/') + 1) ; }
    if ( newURL.indexOf('/_layouts/') > 0 ) { return newURL.substring(0, newURL.indexOf('/_layouts/') + 1) ; }
    if ( newURL.indexOf('/documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/documents/') + 1) ; }
    if ( newURL.indexOf('/shared documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/shared documents/') + 1) ; }
    if ( newURL.indexOf('/shared%20documents/') > 0 ) { return newURL.substring(0, newURL.indexOf('/shared%20documents/') + 1) ; }
    if ( newURL.indexOf('/forms/') > 0 ) { 
      newURL = newURL.substring(0, newURL.indexOf('/forms/'));
      newURL = newURL.substring(0, newURL.indexOf('/') + 1);
      return newURL;
    }
    if ( newURL.indexOf('/pages/') > 0 ) { return newURL.substring(0, newURL.indexOf('/pages/') + 1) ; }
    if ( newURL.substring(newURL.length -1) !== '/' ) { return newURL + '/'; }
    
    return newURL;

  }

/**
 * This is used specifically for making a key value from text that can be in a css ID or classname.
 * Used in Dropdown Fields
 * 
 * @param val 
 */
export function getChoiceKey(val: string) {

    if (val === null) {  
      console.log('getChoiceKey is null');
      return'valueIsNull'; }
    else if (val === undefined) {  
      console.log('getChoiceKey is undefined');
      return'valueIsNull'; }
    else {
      return val.replace(' ','SPACE').replace('.','DOT').replace('~','TILDE').replace('~','COMMA');
    }

}

/**
 * This is the opposite of getChoiceKey..
 * Just converts the key back to the text
 * 
 * @param val 
 */
export function getChoiceText(val: string) {

    if (val === null) {  
      console.log('getChoiceText is null');
      return null; }
    else if (val === undefined) {  
      console.log('getChoiceText is undefined');
      return null; }
    else {
      return val.replace('SPACE',' ').replace('DOT','.').replace('TILDE','~').replace('COMMA','~');
    }

}

export function encodeDecodeString( str : string , doThis: 'encode' | 'decode') {

  //https://abstractspaces.wordpress.com/2008/05/07/sharepoint-column-names-internal-name-mappings-for-non-alphabet/

  let newStr = str + '';
  newStr = newStr.replace(/_x007e_/g,'~');
  newStr = newStr.replace(/_x0021_/g,'!');
  newStr = newStr.replace(/_x0040_/g,'@');
  newStr = newStr.replace(/_x0023_/g,'#');
  newStr = newStr.replace(/_x0024_/g,'$');
  newStr = newStr.replace(/_x0025_/g,'%');
  newStr = newStr.replace(/_x005e_/g,'^');
  newStr = newStr.replace(/_x0026_/g,'&');
  newStr = newStr.replace(/_x002a_/g,'*');
  newStr = newStr.replace(/_x0028_/g,'(');
  newStr = newStr.replace(/_x0029_/g,')');
  newStr = newStr.replace(/_/g,'_');
  newStr = newStr.replace(/_x002b_/g,'+');
  newStr = newStr.replace(/_x002d_/g,'\–');
  newStr = newStr.replace(/_x003d_/g,'=');
  newStr = newStr.replace(/_x007b_/g,'{');
  newStr = newStr.replace(/_x007d_/g,'}');
  newStr = newStr.replace(/_x003a_/g,':');
  newStr = newStr.replace(/_x0022_/g,'\“');
  newStr = newStr.replace(/_x007c_/g,'|');
  newStr = newStr.replace(/_x003b_/g,';');
  newStr = newStr.replace(/_x0027_/g,'\‘');
  newStr = newStr.replace(/_x005c_/g,'\\');
  newStr = newStr.replace(/_x003c_/g,'\<');
  newStr = newStr.replace(/_x003e_/g,'\>');
  newStr = newStr.replace(/_x003f_/g,'?');
  newStr = newStr.replace(/_x002c_/g,',');
  newStr = newStr.replace(/_x002e_/g,'.');
  newStr = newStr.replace(/_x002f_/g,'/');
  newStr = newStr.replace(/_x0060_/g,'`');
  newStr = newStr.replace(/_x0020_/g,'');

  return newStr;

}