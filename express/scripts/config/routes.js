
exports.init = function(app) {

    // Process Properties
    app.get('/rest/studio/processes/version/:versionGuid/properties', function(req, res){
        var dataMock = {
            0: {
                Status: 'Successful',
                Result: {
                    ProcessProperties: {
                        ProcessId: 1,
                        Name: 'process1',
                        DisplayName: 'Process 1',
                        Description: 'The process 1',
                        HelpText: 'Help Text',
                        HelpUrl: 'htt://test.test.com',
                        CategoryId: 1,
                        Order: '123',
                        AccessType: 'Process',
                        UseGlobalForm: true,
                        GlobalFormId: 1,
                        UseSummaryForm: false,
                        SummaryFormId: 1,
                        UseParentCaseNumber: 123
                    },
                    ProcessVersionId: 1,
                    Version:'V01',
                    HasMobileAccess: true,
                    IsActive: true,
                    CaseSecurity : 'Private',
                    EstimatedDuration : {
                        Days: 1,
                        Hours : 1,
                        Minutes : 1
                    },
                    LowerLimit : {
                        Days: 1,
                        Hours : 1,
                        Minutes : 1
                    },
                    UpperLimit : {
                        Days: 1,
                        Hours : 1,
                        Minutes : 1
                    },
                    RiskTime: {
                        Hours : 3,
                        Minutes: 3
                    }
                },
                ErrorReason: ''},
            1:{
                Status: 'Failed',
                Result: {
                },
                ErrorReason: ''
            }
        }
        return res.jsonp(dataMock[req.params.versionGuid] || {});
    });
    app.put('/rest/studio/processes/version/:versionGuid/properties', function(req, res){
        return res.jsonp({
            Status: 'Successful',
            Result:{
                Success: true,
                ErrorMessage:'Success!!!'
            }

        });
    });
//rest/studio/processes/version/0/close
    app.put('/rest/studio/processes/version/:versionGuid/close', function(req, res){
        return res.jsonp({
            Status: 'Successful',
            Result: {
                Success: true,
                ErrorMessage: 'Closed!!!'
            }
        });
    });

//Category
    app.get('/rest/studio/processes/categories/:categoryGuid/header', function(req, res){

        var dataMock =  {Status: 'Successful',
            Result: {
                Id: 1,
                Name: 'Category 1'
            }
        };
        return res.jsonp(dataMock);
    });
    app.get('/rest/studio/processes/categories/:versionGuid/headers', function(req, res) {
        var dataMock = {
            Status: 'Successful',
            Result:{
                Items: [
                    {
                        Id: 1,
                        Name: 'Category 1'
                    },
                    {
                        Id: 2,
                        Name: 'Category 2'
                    },
                    {
                        Id: 3,
                        Name: 'Category 3'
                    }
                ]
            }
        };
        return res.jsonp(dataMock);
    });

// Process Forms
    app.get('/rest/studio/processes/formHeader/:formGuid', function(req, res){
        var dataMock =

        {
            Status: 'Successful',
            Result: {
                Id: 0,
                DisplayName: 'The form 0',
                Version: '1',
                Process: 1
            }
        };


        return res.jsonp(dataMock);
    });
    //Summary Forms
    app.get('/rest/studio/processes/version/:versionGuid/summaryForms/formHeaderList', function(req, res){
        var dataMock = {
            Status: 'Successful',
            Result: {
                Items: [
                    {
                        Id: 1,
                        DisplayName: 'The summary form 1',
                        Version: '1'
                    },
                    {
                        Id: 2,
                        DisplayName: 'The summary form 2',
                        Version: '1'
                    },
                    {
                        Id: 3,
                        DisplayName: 'The summary form 3',
                        Version: '1'
                    },
                    {
                        Id: 4,
                        DisplayName: 'The sumary form 4',
                        Version: '1'
                    }
                ]
            }
        };

        return res.jsonp(dataMock);
    });
    //Global Forms
    app.get('/rest/studio/processes/version/:versionGuid/globalForms/formHeaderList', function(req, res){
        var dataMock = {
            Status: 'Successful',
            Result: {
                Items: [

                    {
                        id: 0,
                        DisplayName: 'The global form  0',
                        version: '1',
                        process: 1
                    },
                    {
                        Id: 1,
                        DisplayName: 'The global form  1',
                        Version: '1'
                    },
                    {
                        Id: 2,
                        DisplayName: 'The global form  2',
                        Version: '1'
                    },
                    {
                        Id: 3,
                        DisplayName: 'The global form  3',
                        Version: '1'
                    },
                    {
                        Id: 4,
                        DisplayName: 'The global form  4',
                        Version: '1'
                    }
                ]
            }
        };

        return res.jsonp(dataMock);
    });
};
