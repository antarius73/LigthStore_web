'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:LstproductsCtrl
 * @description
 * # LstproductsCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('LstproductsCtrl', function ($scope, productService) {


    $scope.ProductsGridOptions = {
      editable:"popup",

      dataSource: {

        transport: {
          read:
            function(e){
              console.log("read attemps");

              productService.GetAllProducts(function (response) {
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

              productService.SetProductInfos(e.data ,function (response) {
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


              productService.CreateProduct(e.data ,function (response) {
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

             productService.DeleteProduct(e.data.Id ,function (response) {
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
              Code: {type: "string", validation: { required: true}},
              GTIN: {type: "string", validation: { required: true}},
              Label: {type: "string", validation: { required: true}},
              Tare: {type: "number", validation: { required: true}},
              Unity: {type: "string", validation: { required: true}},
              Weight: {type: "number", validation: { required: true}},
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

        {field:'Code',title: 'Code' , width:'120px' , type:'string'},
        {field:'GTIN', title: 'GTIN' , width:'120px', type:'string'},
        {field:'Label',title: 'Libellé' , width:'120px' , type:'string'},
        {field:'Tare',title: 'Tare' , width:'120px' , type:'number'},
        {field:'Unity',title: 'Unité' , width:'120px' , type:'string'},
        {field:'Weight',title: 'Poids' , width:'120px' , type:'number'},

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
