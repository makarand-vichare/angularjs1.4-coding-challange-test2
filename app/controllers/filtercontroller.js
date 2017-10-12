angular.module('app').controller('filterController', ['filterService','$log',function(filterService,$log){
    var vm = this;

    vm.searchText ='';
    vm.selectedChar = '';
    vm.userProfiles = [];
    vm.pageNumber = 0;
    vm.errorMessage = '';
    vm.selectedName = '';
    vm.searchOpen = false;
    initialize = function()
    {
        filterService.getAllNames().then(function(data) {
            updateModel(data);
        });
    }

    vm.openSearchSection = function()
    {
        vm.searchOpen = !vm.searchOpen;
    }

    vm.selectedPhoto = function(nm)
    {
        vm.selectedName = nm;
    }

    vm.getFilterChars = function()
    {
        var chars = [];

        for(index=65; index<91; index++)
        {
            chars.push(String.fromCharCode(index))
        }

        return chars;
    }

    vm.getNamesByFilter = function(char)
    {
        vm.pageNumber = 1;
        vm.selectedChar = char;
        var data = filterService.getNamesByFilter(char,vm.pageNumber);
        updateModel(data);        
    }

    vm.getNamesByText = function()
    {
        vm.pageNumber = 1;
        var data = filterService.getNamesByText(vm.searchText,vm.pageNumber);
        updateModel(data);
    }

    vm.getNamesByPage = function(pageNumber)
    {
        var data = filterService.getNamesByPage(pageNumber)
        updateModel(data);
    }

    vm.getshowMore = function()
    {
        var data = filterService.getshowMore(vm.selectedChar,vm.searchText,vm.pageNumber)
        updateModel(data);
    }

    function setExtraProperties(data)
    {
        data.forEach(function(element) {
            element.email = element.nm + element.va + "@" + element.nm + ".com";
            element.photo = 'photo.png';
            element.selected = false;
        }, this);

        return data;
    }

    function checkRecordValidity (data)
    {
        vm.errorMessage = '';
        if(data.result == null || data.result.length <= 0)
        {
            vm.errorMessage = "No record found";
        }
    }

    function updateModel(data)
    {
        vm.userProfiles = setExtraProperties(data.result);
        vm.pageNumber = data.pageNumber;
        checkRecordValidity(data);
    }

    initialize();

}]);