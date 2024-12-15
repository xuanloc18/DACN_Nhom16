const Order = require("../../models/order.model");
const totalPriceHelper = require("../../helpers/totalPrice");

// [GET] /admin/orders
module.exports.index = async (req, res) => {
    const orders = await Order.find({
        deleted: false
    });
    
    if (orders) {
        for(const order of orders) {
            await totalPriceHelper(order);
            order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0);
        }
    }
    res.render("admin/pages/orders/index", {
        pageTile: "Đơn hàng",
        orders: orders,
    })
}
// [PATCH] /admin/orders/change-status/:status/:id
module.exports.patchStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;

        await Order.updateOne({_id: id}, {
            status: status
        });

        req.flash('success', 'Cập nhật trạng thái thành công!')
        res.redirect("back");
    } catch (error) {
        res.redirect("back");
    }
}