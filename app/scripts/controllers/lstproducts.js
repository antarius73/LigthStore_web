'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:LstproductsCtrl
 * @description
 * # LstproductsCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('LstproductsCtrl', function ($scope,$window, productService, packagingService) {

    $scope.Quit = function(){
      $window.close();
    }

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
        {field:'Label',title: 'Libellé' , width:'240px' , type:'string'},
        {field:'Tare',title: 'Tare' , width:'100px' , type:'number'},
        {field:'Unity',title: 'Unité' , width:'100px' , type:'string'},
        {field:'Weight',title: 'Poids' , width:'100px' , type:'number'},

        {command:[{name:"edit",text:""},{name:"destroy",text:""}],title:"&nbsp;", width:"200px"}],

      detailInit: detailInit,

      sortable: true,
      pageable:{

        pageSizes:[10,20,100,500],
        buttonCount:5


      },
      dataBound: function(){
        this.expandRow(this.tbody.find("tr.k-master-row").first());
      },
      scrollable:true,
      toolbar:["create"],
      filterable:true
    };


    function detailInit(e){

      var dataItem = e;

      $("<div/>").appendTo(e.detailCell).kendoGrid({
        editable:"popup",

        dataSource: {

          transport: {
            read:
              function(e){

                console.log("read attemps");

                packagingService.GetProductPackaging(dataItem.data.Id, dataItem.data.Unity, function (response) {
                  if (response.success) {

                    console.log("ok read");
                    e.success(response.packaging);

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
              },
            create:
              function(e){
                console.log("create attemps");
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
                FromId: {type: "number", editable:false},
                FromLbl: {type: "string", validation: { required: false}},
                Une: {type: "string", validation: { required: false}},
                Unity: {type: "string", validation: { required: true}},
                Quantity: {type: "number", validation: { required: true}},
                BaseUnitQ: {type: "number", validation: { required: true}},
                BaseUnitTotal: {type: "number", validation: { required: true}, editable:false},
              }
            }
          },
          group :{
            field : "BaseUnitQ"

          },

          batch:false,
          serverPaging: false,
          serverFiltering: false,
          serverSorting: false
        },

        edit: function (e)  {
          //======================================================
          // Code to look for `hideMe` attribute on a column.
          //======================================================
          e.sender.columns.forEach(function (element, index /*, array */) {
            if (element.hideMe) {
              e.container.find(".k-edit-label:eq(" + index + "), "
                + ".k-edit-field:eq( " + index + ")"
              ).hide();
            }
          });
          //======================================================
          // End column hiding code
          //======================================================
        },

        columns: [
          //{field:'Id',title: 'Id' , width:'120px' , type:'number'},
          //{field:'FromId',title: 'FromId' , width:'120px' , type:'number'},
          {template:"#= '1 '+ Unity + ' = '+  Quantity +' '+ FromLbl #", title: '' , width:'200px', type:'string', hideMe:true},
          {field:'Unity', title: 'Unité' , width:'120px', type:'string', hidden: true},
          {field:'Quantity',title: 'Quantité' , width:'120px' , type:'number', hidden: true},
          {field:'FromLbl',title: 'Unité de base' , width:'120px' , type:'string', hidden: true},
          {field:'BaseUnitQ',title: 'PCB' , width:'120px' , type:'number', hidden: true, hideMe:true},
          {field:'BaseUnitTotal',title: 'Eq. unité base' , width:'120px' , type:'number', hideMe:true},
          {command:[{name:"edit",text:""},{name:"destroy",text:""}],title:"&nbsp;", width:"200px"}],

        sortable: true,
        scrollable:true,
        toolbar:["create"],
        filterable:false
      });


    }

/*
    $scope.PackagingSubGridOptions = {
      editable:"popup",

      dataSource: {

        transport: {
          read:
            function(e){
              console.log("read attemps");
            },
          update:
            function(e){
              console.log("update attemps");
            },
          create:
            function(e){
              console.log("create attemps");
            },
          destroy: function (e) {
            console.log("destroy");
          },


        },
        schema: {
          model: {
            id:"ProductId",
            fields: {
              ProductId: {type: "number"},
              Unity: {type: "string", validation: { required: true}},
              Quantity: {type: "number", validation: { required: true}}

            }
          }
        },

        batch:false,
        serverPaging: false,
        serverFiltering: false,
        serverSorting: false
      },
      columns: [

        {field:'ProductId',title: 'ProductId' , width:'120px' , type:'number'},
        {field:'Unity', title: 'Unity' , width:'120px', type:'string'},
        {field:'Quantity',title: 'Quantity' , width:'120px' , type:'number'},
        {command:[{name:"edit",text:""},{name:"destroy",text:""}],title:"&nbsp;", width:"200px"}],

      sortable: true,
      scrollable:true,
      toolbar:["create"],
      filterable:false
    };
*/

  });
