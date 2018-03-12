catwalkApp.controller('BillingCtrl', ['$scope','Payment','SubscriptionPlan',
    function ($scope,payment,SubscriptionPlan) {
        payment.mytransactions(function(transactions){
            $scope.transactions = [];
            $.each(transactions.rows,function(idx,transaction){
                SubscriptionPlan.getByPlanId({'planId':transaction.planId}).$promise.then(function(plan){
                    $scope.transactions.push({'transaction':transaction,'plan':plan});
                });
            });
        });
    }
]);

//  Billing Route
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider,USER_ROLES) {
        $stateProvider
            .state('index.billing', {
                url: "/billing",
                templateUrl: "components/billing/billing.html",
                controller: 'BillingCtrl',
                access: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
    }
]);