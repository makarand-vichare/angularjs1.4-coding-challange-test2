/*global angular, describe, it, jasmine, expect, beforeEach, spyOn */
"use strict";

describe('filter service', function () {


    beforeEach(function () {
        module("angular.less");
        module("ngAnimate"); 
        module("ui.bootstrap");       
        module("app");
    });

    describe("filter services", function () {

        var service, $httpBackend, $q;

        beforeEach(inject(function ($injector) {
            service = $injector.get('filterService');
            $httpBackend = $injector.get('$httpBackend');
            $q = $injector.get('$q');
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
            $httpBackend.when('GET', "../app/datafile/names.txt").respond(result);
        }));

        it('should have service defined', function() {
            expect(service).toBeDefined()
          });

        it('getAllNames', function () {
            service.getAllNames().then(function (response) {
                expect(response.result.length).toEqual(20);
            });
            $httpBackend.flush();                
            
        });

        it('getNamesByPage for first page', function () {
            service.getAllNames().then(function (response) {
                expect(response.result.length).toEqual(20);
                var returnedValue = service.getNamesByPage(0);
                expect(returnedValue.result.length).toEqual(20);
                expect(returnedValue.result[0].nm).toEqual('Aaberg1');    
            });
            $httpBackend.flush();                            
        });

        it('getNamesByPage for next page', function () {
            service.getAllNames().then(function (response) {
                expect(response.result.length).toEqual(20);
                var returnedValue = service.getNamesByPage(1);
                expect(returnedValue.result.length).toEqual(20);
                expect(returnedValue.result[0].nm).toEqual('Aaberg5');    
            });
            $httpBackend.flush();            
        });

        it('getNamesByPage for next page for no records', function () {
            service.getAllNames().then(function (response) {
                expect(response.result.length).toEqual(20);
                var returnedValue = service.getNamesByPage(2);
                expect(returnedValue.result.length).toEqual(0);
            });
            $httpBackend.flush();                        
        });
    });
});