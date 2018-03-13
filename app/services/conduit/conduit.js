catwalkApp.factory('conduit', function ($resource,$q) {
    return {
        listFlowTemplates:function(){

        },
        loadTemplate:function(templateName, defaults){

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
    }

});