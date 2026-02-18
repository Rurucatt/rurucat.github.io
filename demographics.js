define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;

    API.addPagesSet('demographicsPage', {
        noSubmit: false,
        header: 'Demographics',
        decline: true,
        declineText: isTouch ? 'Decline' : 'Decline to Answer',
        autoFocus: true,
        progressBar: 'Page <%= pagesMeta.number %> out of 1'
    });

    API.addQuestionsSet('demographicsQ', {
        decline: 'true',
        required: true,
        autoSubmit: false,
        errorMsg: {
            required: isTouch
                ? 'Please answer the question, or click \'Decline\''
                : 'Please answer the question, or click \'Decline to Answer\''
        }
    });

    API.addQuestionsSet('age', {
        inherit: 'demographicsQ',
        type: 'text',
        name: 'age',
        stem: 'What is your age?'
    });

    API.addQuestionsSet('gender', {
        inherit: 'demographicsQ',
        type: 'dropdown',
        name: 'gender',
        stem: 'Gender',
        answers: [
            {text: 'Female', value: 'F'},
            {text: 'Male', value: 'M'},
            {text: 'Non-binary', value: 'NB'},
            {text: 'Prefer not to say', value: 'NA'}
        ]
    });

    API.addQuestionsSet('major', {
        inherit: 'demographicsQ',
        type: 'text',
        name: 'major',
        stem: 'What is your major?'
    });

    API.addSequence([
        {
            inherit: 'demographicsPage',
            questions: [
                {inherit: 'age'},
                {inherit: 'gender'},
                {inherit: 'major'}
            ]
        }
    ]);

    return API.script;
});
