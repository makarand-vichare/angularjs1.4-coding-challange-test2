/*global angular, describe, it, jasmine, expect, beforeEach */
"use strict";

describe("filter controller", function() {
    
  beforeEach(function () {
    module("angular.less");
    module("ngAnimate"); 
    module("ui.bootstrap");       
    module("app");
    });
 
    // Create mock service
    var controller, service, httpBackend, qservice ,$log;
    var deferred;
    var result = 'var selOpts = [ ' + 
    '{nm:"Aaberg1",va:"v0"},{nm:"Aaby1",va:"v0"},{nm:"Aadland1",va:"v0"},{nm:"Aagaard1",va:"v0"},{nm:"Aakre1",va:"v0"},' +
    '{nm:"Aaberg2",va:"v0"},{nm:"Aaby2",va:"v0"},{nm:"Aadland2",va:"v0"},{nm:"Aagaard2",va:"v0"},{nm:"Aakre2",va:"v0"},' +  
    '{nm:"Aaberg3",va:"v0"},{nm:"Aaby3",va:"v0"},{nm:"Aadland3",va:"v0"},{nm:"Aagaard3",va:"v0"},{nm:"Aakre3",va:"v0"},' +
    '{nm:"Aaberg4",va:"v0"},{nm:"Aaby4",va:"v0"},{nm:"Aadland4",va:"v0"},{nm:"Aagaard4",va:"v0"},{nm:"Aakre4",va:"v0"},' + 
    '{nm:"Aaberg5",va:"v0"},{nm:"Aaby5",va:"v0"},{nm:"Aadland5",va:"v0"},{nm:"Aagaard5",va:"v0"},{nm:"Aakre5",va:"v0"},' +
    '{nm:"Aaberg6",va:"v0"},{nm:"Aaby6",va:"v0"},{nm:"Aadland6",va:"v0"},{nm:"Aagaard6",va:"v0"},{nm:"Aakre6",va:"v0"},' +  
    '{nm:"Aaberg7",va:"v0"},{nm:"Aaby7",va:"v0"},{nm:"Aadland7",va:"v0"},{nm:"Aagaard7",va:"v0"},{nm:"Aakre7",va:"v0"},' +
    '{nm:"Aaberg8",va:"v0"},{nm:"Aaby8",va:"v0"},{nm:"Aadland8",va:"v0"},{nm:"Aagaard8",va:"v0"},{nm:"Aakre8",va:"v0"}' + 
    ']';
    
    beforeEach(inject(function($injector, $controller, $log, $httpBackend,$q) {
        service = $injector.get('filterService');      
        controller = $controller;
        $log = $log;
        httpBackend = $httpBackend;
        qservice = $q;
        deferred = qservice.defer()
        spyOn(service, 'getAllNames').andReturn(deferred.promise);
        httpBackend.expect('GET', "../app/datafile/names.txt").respond(result);        
        controller = new $controller('filterController', {'filterService': service , '$log' : $log });   
    }));


  it('should have controller defined', function() {
    expect(controller).toBeDefined()
  });
  
  it("get first page data on load", function() {
    controller.getNamesByPage(0);
    spyOn(service,'getNamesByPage');
    expect(service.getNamesByPage).toHaveBeenCalled();
    expect(controller.userProfiles.length).toEqual(20);
    expect(controller.pageNumber).toEqual(1);
    expect(controller.userProfiles[0].nm).toEqual("Aaberg1");
  });
  
  it("get next page data on show more", function() {
    controller.pageNumber = 1;
    controller.getshowMore();
    spyOn(service,'getshowMore');
    expect(service.getshowMore).toHaveBeenCalled();
    expect(controller.userProfiles.length).toEqual(20);
    expect(controller.pageNumber).toEqual(2);
    expect(controller.userProfiles[0].nm).toEqual("Aaberg5");
  });

  it("search name", function() {
    controller.pageNumber = 0;
    controller.searchText = 'Aaberg';
    controller.getNamesByText();
    spyOn(service,'getNamesByText');
    expect(service.getNamesByText).toHaveBeenCalled();
    expect(controller.userProfiles.length).toEqual(8);
    expect(controller.pageNumber).toEqual(-1);
    expect(controller.userProfiles[2].nm).toEqual("Aaberg3");
  });

  it("search by filter", function() {
    controller.pageNumber = 0;
    controller.searchText = '';
    controller.getNamesByFilter('A');
    spyOn(service,'getNamesByFilter');
    expect(service.getNamesByFilter).toHaveBeenCalled();
    expect(controller.userProfiles.length).toEqual(20);
    expect(controller.pageNumber).toEqual(1);
    expect(controller.userProfiles[19].nm).toEqual("Aakre4");
  });

});