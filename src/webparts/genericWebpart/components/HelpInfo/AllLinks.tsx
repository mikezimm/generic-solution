import * as React from 'react';

import * as strings from 'GenericWebpartWebPartStrings';

import { createLink, createRepoLinks, IRepoLinks } from '@mikezimm/npmfunctions/dist/HelpInfo/Links/CreateLinks';


export const baseDevDocs = 'https://developer.microsoft.com/en-us/fabric#/controls/web/';

/**
 *  This should be moved to npmFunctions (HelpInfo/Links/LinksDevDocs)
 */

export const JSONEditor = createLink( 'https://codebeautify.org/jsonviewer', '_blank', 'Edit JSON here: CodeBeautify.org');
export const JSONEditorShort = createLink( 'https://codebeautify.org/jsonviewer', '_blank', 'Edit JSON here');
