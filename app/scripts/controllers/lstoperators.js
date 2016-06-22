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

      },
      dataSource: {

        transport: {
          read:
            function(e){
              console.log("read");

              operatorService.GetAllOperators(function (response) {
                if (response.success) {

                  console.log("ok");
                  e.success(response.operators);

                } else {
                  console.log("ko");
                  $scope.error = response.message;
                  $scope.dataLoading = false;
                }
              });

            },
          update:
            function(e){
              console.log("update");


            },
          create:
            function(e){
              console.log("create");




            },
          destroy: function (e) {
            console.log("destroy");


          },


        },
        schema: {
          model: {
            id:"Id",
            fields: {
              Id: {type: "number", editable:false},
              Login: {type: "string", editable:false},
              FirstName: {type: "string"},
              LastName: {type: "string"},
              Email: {type: "string"}
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
        {
          field:'Id',
          title: 'Id',
          width:'70px'

        },
        {field:'Login',title: 'Login' , width:'120px' , type:'string'},
        {
          field:'FirstName',
          title: 'firstname' ,
          width:'120px',
          type:'string',
          filterable:{
            cell:{operator:"contains"}
          }
        },

        {field:'LastName',title: 'LastName' , width:'120px' , type:'string'},

        {field:'Email',title: 'Email' , width:'120px' , type:'string'},

        {command:[{name:"edit",text:""},{name:"destroy",text:""}],title:"&nbsp;", width:"200px"}],

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
