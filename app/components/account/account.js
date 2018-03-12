//Account Controller
catwalkApp.controller('AccountCtrl', ['$scope','Payment','SubscriptionPlan',
    function ($scope,payment,SubscriptionPlan) {
        payment.mysubscriptions(function(subscriptions){
            $scope.subscriptions = [];
            $.each(subscriptions.rows,function(idx,subscription){
                SubscriptionPlan.getByPlanId({'planId':subscription.planId}).$promise.then(function(plan){
                    if(subscription.status === 'ACTIVE'){
                        $scope.subscriptions.push({'subscription':subscription,'plan':plan});
                    }
                });
            });
        });
    }
]);
//  Account Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider,USER_ROLES) {

        $stateProvider
            .state('index.account', {
                url: "/account",
                templateUrl: "components/account/account.html",
                controller: 'AccountCtrl',
                access: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
    }
]);