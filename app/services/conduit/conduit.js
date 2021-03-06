catwalkApp.factory('conduit', function ($resource,$q) {
    var conduit =  {
        createMongoFlow:function(endpoint,database){
            var context = {
                'template':'mongo_crud.json',
                'databaseName':database,
                'flowName':endpoint,
                'collectionName':endpoint
            };
            var deferred = $q.defer();
            $resource( base_url + 'conduit/flows/template', {}, {}).save(context,function(data){
                deferred.resolve(conduit.collection(endpoint));
            });
            return deferred.promise;
        },
        collection:function(endpoint,context){
            var final = base_url + 'conduit/rest/' + endpoint ;
            if(context){
                final += "/action/" + context;
            }
            return {

                get:function (params) {
                    var deferred = $q.defer();
                    $resource( final, {}, {}).get(params,function(data){
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                },
                getById:function (id) {
                    var deferred = $q.defer();
                    $resource( final + '/' + id , {}, {}).get({id: this.id},function(data){
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                },
                save:function (params) {
                    var deferred = $q.defer();
                    $resource( final, {}, {}).save(params,function(data){
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                },
                remove:function (id) {
                    var deferred = $q.defer();
                    $resource( final +'/'  + id , {}, {}).remove({id: this.id},function(data){
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                }
            }
        }
    };
    return conduit;
});