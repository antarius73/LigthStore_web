'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:LstoperatorsCtrl
 * @description
 * # LstoperatorsCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('LstoperatorsCtrl', function ($scope, operatorService) {





    $scope.OperatorsGridOptions = {
      editable:"popup",
      edit: function (e) {
        console.log("edit");
        // neutraliser l'edition du login en dehor du cas de creation
        var loginInput = e.container.find("input[name=Login]");

        if(loginInput.val() != ""){
          loginInput.prop('disabled', true).addClass("k-state-disabled");
        }

      },
      dataSource: {

        transport: {
          read:
            function(e){
              console.log("read attemps");

              operatorService.GetAllOperators(function (response) {
                if (response.success) {

                  console.log("ok read");
                  e.success(response.operators);

                } else {
                  console.log("ko read");
                  $scope.error = response.message;
                  $scope.dataLoading = false;
                }
              });

            },
          update:
            function(e){
              console.log("update attemps");

              operatorService.SetOperatorInfos(e.data ,function (response) {
                if (response.success) {
                  console.log("ok update");
                  e.success();
                } else {
                  console.log("ko update");
                  $scope.error = response.message;
                  $scope.dataLoading = false;
                }
              });


            },
          create:
            function(e){
              console.log("create attemps");


              operatorService.CreateOperator(e.data ,function (response) {
                if (response.success) {
                  console.log("ok create");
                  e.success();
                } else {
                  console.log("ko create");
                  $scope.error = response.message;
                  $scope.dataLoading = false;
                }
              });

            },
          destroy: function (e) {
            console.log("destroy");

            operatorService.DeleteOperator(e.data.Id ,function (response) {
              if (response.success) {
                console.log("ok destroy");
                e.success();
              } else {
                console.log("ko destroy");
                $scope.error = response.message;
                $scope.dataLoading = false;
              }
            });

          },


        },
        schema: {
          model: {
            id:"Id",
            fields: {
              Id: {type: "number"},
              Login: {type: "string", validation: { required: true}},
              FirstName: {type: "string", validation: { required: true}},
              LastName: {type: "string", validation: { required: true}},
              Email: {type: "email", validation: { required: true}}
            }
          }
        },
        pageSize: 20,
        batch:false,
        serverPaging: false,
        serverFiltering: false,
        serverSorting: false
      },
      columns: [

        {field:'Login',title: 'Login'  , type:'string', width:"20%"},
        {
          field:'FirstName',
          title: 'Prénom' ,
          width:"20%",
          type:'string',
          minScreenWidth:468,
          filterable:{
            cell:{operator:"contains"}
          }
        },

        {field:'LastName',title: 'Nom'  , type:'string', minScreenWidth:568, width:"20%"},

        {field:'Email',title: 'Email' , type:'string', minScreenWidth:668, width:"20%"},

        {command:[
          {name:"edit",text:""},
          {name:"Delete", imageClass :"k-icon k-i-close", text:"",click: function(e){  //add a click event listener on the delete button


            var windowTemplate = kendo.template($("#windowTemplate").html());
            var operatorsGrid = $("#operatorsGrid").data('kendoGrid');


            e.preventDefault(); //prevent page scroll reset
            var tr = $(e.target).closest("tr"); //get the row for deletion
            var data = this.dataItem(tr); //get the row data so it can be referred later
            var delWindowConf = $scope.window;
            delWindowConf.title("Confirmez vous ?");
            delWindowConf.content(windowTemplate(data)); //send the row data object to the template and render it
            delWindowConf.center().open();

            $("#yesButton").click(function(){
              operatorsGrid.dataSource.remove(data)  //prepare a "destroy" request
              operatorsGrid.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
              delWindowConf.close();
            })
            $("#noButton").click(function(){
              delWindowConf.close();
            })
          }        }],
          title:"&nbsp;", width:"20%"}],


      sortable: true,
      pageable:{

        pageSizes:[10,20,100,500],
        buttonCount:5


      },
      scrollable:true,
      toolbar:["create"],
      filterable:true
    };

  });
