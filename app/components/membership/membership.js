catwalkApp.controller('MembershipCtrl', ['$scope','Payment','SubscriptionPlan',
    function ($scope,payment,SubscriptionPlan) {
        $scope.listSubscriptions = function(){
            payment.mysubscriptions(function(subscriptions){
                $scope.subscriptions = [];
                $.each(subscriptions.rows,function(idx,subscription){
                    SubscriptionPlan.getByPlanId({'planId':subscription.planId}).$promise.then(function(plan){
                        $scope.subscriptions.push({'subscription':subscription,'plan':plan});
                    });
                });
            });
        };
        $scope.cancel= function(subscriptionId){
            payment.cancel_subscription({'subscriptionId':subscriptionId},function(){
                $scope.listSubscriptions();
            });
        };
        $scope.listSubscriptions();
    }
]);


//  Home Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider,USER_ROLES) {




        $stateProvider
            .state('index.membership', {
                url: "/membership",
                templateUrl: "components/membership/membership.html",
                controller: 'MembershipCtrl',
                access: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
    }
]);