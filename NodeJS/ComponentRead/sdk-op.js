'use strict';
const oDestinationName = "DMC_OAuth"; 
function getComponents(id,res,OrderListApi){
    let orders = OrderListApi.getOrdersList({
        plant:'PP01',
        order: id
    }).execute({destinationName:oDestinationName});
    orders.then(function(data){
        console.log(data);
        res.status(200).json(data);
        return data;
    })
    .catch(function(error) {
        res.status(500);
        res.end('Error accessing API: ' + JSON.stringify(error));
        console.log(error);
    });
}

module.exports = {
    getComponents: getComponents
}
