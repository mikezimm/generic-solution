
import { buildMLineDiv } from './stringFormatService';

export function getXMLObjectFromString(str, tag, toText, removeTag = false) {
    // 2020-06-24:  Copied from Views_.aspx of Super Contents
    // Gets tag from an XML string like pulling "Fields" out of a view schema
    // toText will then also convertTagsToHTML for display on a page.

      var fullTag = "";
  
      if (str == null) {
        return "null viewQuery";
      }
  
      var tagLength = tag.length;
      var tag1 = "<" + tag;
      var tag2 = "</" + tag + ">";
      var IndexOf1 = str.indexOf(tag1);
      var IndexOf2 = str.indexOf(tag2);
  
      if (IndexOf1 > -1 && IndexOf1 > -1) {
        fullTag = str.substring(IndexOf1, IndexOf2 + tagLength + 3);
  
      }
  
      if (toText === true) { //Then convert <> to html valid
  
        fullTag = fullTag.replace(/[<]/g, "&lt;");
        fullTag = fullTag.replace(/[>]/g, "&gt;");
  
      }

      if (removeTag === true) { //Then convert <> to html valid
        fullTag = fullTag.slice(tagLength + 2, fullTag.length - (tagLength + 3));
      }

  
  
      return fullTag;
}

export function prettyUpXMLStringAsElements( thisXML : string | any ) {

    let indents = -1;
    let lastTagWasOpen = true;
    let result = thisXML.replace(/></g,'>||<').split('||').map( val => { 
    
        if ( val.indexOf('<') === 0 ) {
            if ( val.indexOf('/') === 1 ) { //This is a closing tag, automatically set next indent -1

                if ( lastTagWasOpen === true ) {
                    lastTagWasOpen = false;
                    indents --; 
                    console.log('This is CLOSING Tag, lastTagWasOpen === true');

                } else { //This is a opening tag && previous one was open, automatically set next indent +1
                    lastTagWasOpen = false;
                    indents --; 
                    console.log('This is CLOSING Tag, lastTagWasOpen === false');
                }
            
            } else { //This is an opening tag

                if ( lastTagWasOpen === true ) {
                    if ( val.indexOf('/>') > -1 ) {  //This tag closes... do not indent
                        lastTagWasOpen = false;
                        indents ++;
                    } else { indents ++; lastTagWasOpen = true; }

                    console.log('This is OPENING Tag, lastTagWasOpen === true');

                } else { //This is a opening tag && previous one was open, automatically set next indent +1

                    if ( val.indexOf('/>') > -1 || val.indexOf('</') > 5 ) {  //This tag closes... do not indent
                        //This also covers situations like this:  <JSLink>clienttemplates.js</JSLink>
                        lastTagWasOpen = false;
                    } else { lastTagWasOpen = true; }

                    console.log('This is OPENING Tag, lastTagWasOpen === false');
                }
                                                        
            }
        } else {
            console.log('val.indexOf('<') !!!!== 0');
        }
        console.log('indents', indents, lastTagWasOpen, val);

        return buildMLineDiv(indents , val);

    });
    
    console.log(result);

    return result;

}
