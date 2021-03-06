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

function purchaseJson(form) {
    //alert(document.getElementById("purchaseId").value);
    return {
        purchaseId: document.getElementById("purchaseId").value,
        productId: form.querySelector('.productId').value,
        billNumber: form.querySelector('input[name="billNumber"]').value,
        purchaseQuantity: form.querySelector('input[name="purchaseQuantity"]').value,
        purchaseNotes: form.querySelector('textarea[name="purchaseNotes"]').value,
        amountBeforeTax: form.querySelector('input[name="amountBeforeTax"]').value,
        gstAmount: form.querySelector('input[name="gstAmount"]').value,
        discountAmount: form.querySelector('input[name="discountAmount"]').value,
        purchaseDate: form.querySelector('input[name="purchaseDate"]').value
    }
}

/********create/edit Purchase Flow **********/
$(function () {
    $(".amountBeforeTax").change(function () {
        calculatePayableAmount();
    });
    $(".gstAmount").change(function () {
        calculatePayableAmount();
    });
    $(".discountAmount").change(function () {
        calculatePayableAmount();
    });
    $("#cacel_cp").click(function () {
        window.location.href = '/purchases/viewPurchases';
    });
    $("#createPurchase").submit(function (event) {
        event.preventDefault();
        var form = event.currentTarget;
        var purchase = purchaseJson(form);
        $.ajax({
            type: 'post',
            url: '/purchases/api/createPurchase',
            data: JSON.stringify(purchase),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                window.location.href = '/purchases/viewPurchases';
            }
        });
    });
    $("#editPurchase").submit(function (event) {
        event.preventDefault();
        var form = event.currentTarget;
        var purchase = purchaseJson(form);
        $.ajax({
            type: 'put',
            url: '/purchases/api/editPurchase',
            data: JSON.stringify(purchase),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                window.location.href = '/purchases/viewPurchases';
            }
        });
    });
    $("#deletePurBtn").click(function (event) {
        event.preventDefault();
        const purchaseId = document.getElementById("purchaseId").value;
        $.ajax({
            type: 'delete',
            url: '/purchases/api/deletePurchase/' + purchaseId,
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                window.location.href = '/purchases/viewPurchases';
            }
        });
    });
});

/********viewPurchases Flow **********/
$(function () {
    var datatable = $('#tblPurchaseList').DataTable({
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
            { "data": "payableAmount" },
            {
                data: null,
                className: "dt-center editor-edit",
                defaultContent: '<i class="fa fa-edit"/>',
                orderable: false
            }
        ],
        "dom": '<"toolbar">frtip'
    });
    $("div.toolbar").html('<button id="createPur" type="button" class="btn btn-block btn-info" style="width:80px;">Create</button>');
    // Edit record
    $('#tblPurchaseList').on('click', 'td.editor-edit', function (e) {
        e.preventDefault();
        var rowData = datatable.rows(this).data();
        window.location.href = '/purchases/editPurchase/' + rowData[0].purchaseId;
        //console.log('You clicked this' + rowData[0].purchaseId);
        //console.log(rowData[0]);
    });
    $("#createPur").click(function () {
        window.location.href = '/purchases/createPurchase';
    });
});