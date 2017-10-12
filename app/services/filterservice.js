angular.module('app').service('filterService',['$http','$q', function($http, $q){
    var allNames = [];
    var pageSize = 20;
    return {
        getAllNames : getAllNames,
        getNamesByPage : getNamesByPage,
        getNamesByFilter :getNamesByFilter,
        getNamesByText :getNamesByText,
        getshowMore : getshowMore
    };

    function getAllNames()
     {
         var unwantedData = "var selOpts = ";
         var defer =$q.defer();
         $http({
            url: '../app/datafile/names.txt',
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function(response) {
            if(response.data)
            {
                response.data = response.data.substr(unwantedData.length);
                allNames = eval(response.data);
            } 
            defer.resolve(getNamesByPage(0));
        })
        .catch(function(error) {
            console.log(error.json());
            defer.reject(error);
        });

        return defer.promise;
     }

     function getNamesByPage(pagenumber)
     {
        return {
           result : allNames.slice(pagenumber * pageSize, (pagenumber * pageSize) + pageSize),
           pageNumber : setNextPage(allNames, pagenumber , pageSize) 
        };
     }

     function getNamesByFilter(char,pagenumber)
     {
        var totalfound = allNames.filter(function(element){
            return (element.nm.toLowerCase().indexOf(char.toLowerCase()) == 0)
        });
        var result = totalfound.slice(pagenumber * pageSize,(pagenumber * pageSize) + pageSize);
        return {
            result : result,
            pageNumber : setNextPage(totalfound, pagenumber , pageSize) 
        };
     }

     function getshowMore(char,searchText,pagenumber)
     {
         if(searchText == '')
         {
            return getNamesByFilter(char,pagenumber);
         }
         else if (searchText != '')
         {
            return getNamesByText(searchText,pagenumber);
        }

        return getNamesByPage(pagenumber);
     }

     function getNamesByText(searchText,pagenumber)
     {
        var totalFound = allNames.filter(function(element){
            return (element.nm.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
        });
        var result = totalFound.slice(pagenumber * pageSize,(pagenumber * pageSize) + pageSize);
        return {
            result : result,
            pageNumber : setNextPage(totalFound, pagenumber , pageSize) 
        };
     }

     function setNextPage (result, pagenumber, pageSize)
     {
         var newPageNumber = result.length > (pagenumber * pageSize) ? pagenumber + 1 : -1;
        return newPageNumber;
     }
}]);