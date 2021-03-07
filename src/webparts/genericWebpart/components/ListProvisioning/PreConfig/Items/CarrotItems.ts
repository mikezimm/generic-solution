

export const CarrotItems = [
    {   //TMT
        //listDefinition: '',
        //webPartScenario: { results: ['Dev','Team','Corp']},
        Title: "CarrotSearch",
        showEarlyAccess:true,
        parentListTitle: 'TrackMyTime',
        parentListWeb: '/sites/Templates/Tmt/',

        carrotCats: 'Story,Chapter',

        dateColumn:'StartTime',
        dropDownColumns:'+Story,+>Chapter,+User/Title',
        searchColumns:'',
        metaColumns: '',
        valueColumn:'Hours',
        valueOperator:'Sum',
        valueType:'Number',

        carrotProps:'',
        carrotStyles:'',
        enableSearch:true,
        fetchCount:2000,
        fetchCountMobile:2000,
        minDataDownload:true,
        restFilter:'',
    }
];