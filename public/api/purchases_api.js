function calculatePayableAmount() {

    var payableAmount = 0;
    var amountBeforeTax = $('#amountBeforeTax').val();
    var gstAmount = $('#gstAmount').val();
    var discountAmount = $('#discountAmount').val();

    if (!amountBeforeTax.trim() == false && !isNaN(amountBeforeTax))
        payableAmount = payableAmount + parseFloat(amountBeforeTax);
    if (!gstAmount.trim() == false && !isNaN(gstAmount))
        payableAmount = payableAmount + parseFloat(gstAmount);
    if (!discountAmount.trim() == false && !isNaN(discountAmount))
        payableAmount = payableAmount - parseFloat(discountAmount);

    $('#payableAmount').val(payableAmount);
}
$(".amountBeforeTax").change(function () {
    calculatePayableAmount();
});
$(".gstAmount").change(function () {
    calculatePayableAmount();
});
$(".discountAmount").change(function () {
    calculatePayableAmount();
});

$("#createPurchase").submit(function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var purchase = {
        productId: form.querySelector('.productId').value,
        billNumber: form.querySelector('input[name="billNumber"]').value,
        purchaseQuantity: form.querySelector('input[name="purchaseQuantity"]').value,
        purchaseNotes: form.querySelector('textarea[name="purchaseNotes"]').value,
        amountBeforeTax: form.querySelector('input[name="amountBeforeTax"]').value,
        gstAmount: form.querySelector('input[name="gstAmount"]').value,
        discountAmount: form.querySelector('input[name="discountAmount"]').value,
        purchaseDate: form.querySelector('input[name="purchaseDate"]').value
    }
    $.ajax({
        type: 'post',
        url: '/purchases/createPurchase',
        data: JSON.stringify(purchase),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            alert("Handler for .submit() called.");
        }
    });
});

$(function () {
    $('#tblPurchaseList').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        "ajax": {
            "url": "/purchases/api/purchaseRecords",
            "dataSrc": ""
        },
        "columns": [
            { "data": "purchaseId" },
            { "data": "productName" },
            { "data": "billNumber" },
            { "data": "purchaseQuantity" },
            { "data": "amountBeforeTax" },
            { "data": "gstAmount" },
            { "data": "discountAmount" },
            { "data": "payableAmount" }
        ]
    });
});